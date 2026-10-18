import { useEffect, useRef, useMemo } from 'react';
import { usePrayerTimes, isPrayerTimeNow } from './usePrayerTimes';
import { toDateKey, isTimeMatch } from '../utils/dateUtils';
import { buildMorningChecklistText } from '../utils/dailyChecklist';
import { getActiveMuzakkirSlots, getMuzakkirNotification } from '../constants/muzakkirMessages.js';
import { playMuzakkirChime } from '../utils/muzakkirChime.js';
import { syncAllNotifications } from '../utils/syncAllNotifications.js';
import {
  MUZAKKIR_RESYNC_EVENT,
  NATIVE_NOTIFICATION_SYNC_EVENT,
  buildMuzakkirMorningExtra,
  requestMuzakkirResync,
} from '../utils/muzakkirNotificationSync.js';
import { getTasksForNotification, getTaskNotifyAt } from '../utils/taskScheduler.js';
import { isNativeApp } from '../native.js';
import { requestAppNotificationPermission } from '../utils/requestAppNotifications.js';
import { syncWebPushProfile } from '../utils/webPushSubscribe.js';
import { getTaskDisplayTitle } from '../utils/displayLabels.js';
import { NATIVE_NOTIF_OPTS } from '../utils/nativeNotificationHelper.js';

const POLL_MS = 15000;
const MUZAKKIR_MATCH_MIN = 2;
const NATIVE_SYNC_DEBOUNCE_MS = 500;

function wasNotifiedToday(settings, key) {
  const today = toDateKey();
  return (settings.notifiedToday?.[today] || []).includes(key);
}

function webNotificationsAvailable() {
  return typeof window !== 'undefined' && 'Notification' in window;
}

export function useNotifications(
  settings,
  updateSettings,
  t,
  tasks = [],
  habits = [],
  lang = 'ru',
  userId = null,
  markNotified = null
) {
  const { prayerList } = usePrayerTimes(settings);
  const nativeScheduledRef = useRef({ muzakkir: false, prayer: false, task: false });
  const syncTimerRef = useRef(null);

  const prayerTimesKey = useMemo(() => {
    if (!settings.prayerNotifications) return '';
    return prayerList.map((p) => `${p.key}:${p.time}`).join('|');
  }, [settings.prayerNotifications, prayerList]);

  const morningChecklistKey = useMemo(() => {
    if (
      !settings.muzakkirEnabled ||
      settings.muzakkirSlots?.morning === false ||
      settings.muzakkirMorningChecklist === false
    ) {
      return '';
    }
    const today = toDateKey();
    const openTasks = tasks.filter((task) => !task.completed && task.deadline === today).length;
    return `${openTasks}:${habits.length}`;
  }, [
    settings.muzakkirEnabled,
    settings.muzakkirSlots?.morning,
    settings.muzakkirMorningChecklist,
    tasks,
    habits,
  ]);

  useEffect(() => {
    const getMorningExtra = () =>
      buildMuzakkirMorningExtra(settings, tasks, habits, t);

    const runSync = () => {
      syncAllNotifications({
        settings,
        lang,
        t,
        tasks,
        habits,
        prayerList,
        getMorningExtra,
      }).then((result) => {
        nativeScheduledRef.current = result;
      });
    };

    const scheduleSync = () => {
      clearTimeout(syncTimerRef.current);
      const delay = isNativeApp() ? NATIVE_SYNC_DEBOUNCE_MS : 0;
      syncTimerRef.current = setTimeout(runSync, delay);
    };

    scheduleSync();

    const onResync = () => scheduleSync();
    window.addEventListener(MUZAKKIR_RESYNC_EVENT, onResync);
    window.addEventListener(NATIVE_NOTIFICATION_SYNC_EVENT, onResync);
    return () => {
      clearTimeout(syncTimerRef.current);
      window.removeEventListener(MUZAKKIR_RESYNC_EVENT, onResync);
      window.removeEventListener(NATIVE_NOTIFICATION_SYNC_EVENT, onResync);
    };
  }, [
    settings.muzakkirEnabled,
    settings.muzakkirTimes,
    settings.muzakkirSlots,
    settings.muzakkirMorningChecklist,
    settings.prayerNotifications,
    settings.taskNotifications,
    settings.prayerOffsets,
    settings.city,
    settings.country,
    settings.latitude,
    settings.longitude,
    settings.prayerMethod,
    lang,
    prayerTimesKey,
    morningChecklistKey,
  ]);

  useEffect(() => {
    if (isNativeApp() || !userId || !webNotificationsAvailable()) return;

    const needsAny =
      settings.prayerNotifications ||
      settings.muzakkirEnabled ||
      settings.taskNotifications;
    if (!needsAny || Notification.permission !== 'granted') return;

    syncWebPushProfile({ userId, settings, tasks, habits, prayerList, lang });
  }, [
    userId,
    settings.prayerNotifications,
    settings.muzakkirEnabled,
    settings.taskNotifications,
    settings.muzakkirTimes,
    settings.muzakkirSlots,
    settings.muzakkirMorningChecklist,
    settings.city,
    settings.country,
    settings.latitude,
    settings.longitude,
    settings.prayerOffsets,
    settings.prayerMethod,
    tasks,
    habits,
    prayerList,
    lang,
  ]);

  useEffect(() => {
    const needsPrayer = settings.prayerNotifications;
    const needsMuzakkir = settings.muzakkirEnabled;
    const needsTasks = settings.taskNotifications;
    if (!needsPrayer && !needsMuzakkir && !needsTasks) return;

    const native = isNativeApp();
    const webNotif = webNotificationsAvailable() && !native;

    const notifyWeb = (key, title, body, options = {}) => {
      if (!webNotif || Notification.permission !== 'granted') return;
      if (wasNotifiedToday(settings, key)) return;
      markNotified?.(key);
      try {
        new Notification(title, { body, tag: key, ...options });
      } catch {
        // unsupported
      }
    };

    const fireMuzakkir = async (slot) => {
      const key = `muzakkir-${toDateKey()}-${slot}`;
      if (wasNotifiedToday(settings, key)) return;
      const extra =
        slot === 'morning' && settings.muzakkirMorningChecklist
          ? buildMorningChecklistText(tasks, habits, t)
          : '';
      const { title, body } = getMuzakkirNotification(lang, slot, extra);
      playMuzakkirChime();
      markNotified?.(key);

      if (native) {
        try {
          const { LocalNotifications } = await import('@capacitor/local-notifications');
          await LocalNotifications.schedule({
            notifications: [
              {
                id: (Date.now() % 90000) + 10000,
                title,
                body: body.length > 180 ? `${body.slice(0, 177)}…` : body,
                largeBody: body,
                ...NATIVE_NOTIF_OPTS,
              },
            ],
          });
        } catch {
          // alarm may have already fired
        }
        if (!nativeScheduledRef.current.muzakkir) {
          requestMuzakkirResync();
        }
        return;
      }

      notifyWeb(key, title, body, { requireInteraction: true });
    };

    const scheduled = nativeScheduledRef.current;

    const check = () => {
      const today = toDateKey();

      if (needsMuzakkir) {
        const times = settings.muzakkirTimes || {};
        for (const slot of getActiveMuzakkirSlots(settings)) {
          const time = times[slot];
          if (time && isTimeMatch(time, MUZAKKIR_MATCH_MIN)) {
            fireMuzakkir(slot);
          }
        }
      }

      if (native) return;

      if (!webNotif || Notification.permission !== 'granted') return;

      if (needsPrayer && prayerList.length && !scheduled.prayer) {
        for (const prayer of prayerList) {
          const key = `prayer-${today}-${prayer.key}`;
          if (isPrayerTimeNow(prayer.time, 1)) {
            notifyWeb(
              key,
              t('prayerNotifTitle'),
              t('prayerNotifBody', {
                prayer: t(`prayers.${prayer.labelKey}`),
                time: prayer.time,
              })
            );
          }
        }
      }

      if (needsTasks && !scheduled.task) {
        const now = new Date();
        for (const task of getTasksForNotification(tasks, today)) {
          const at = getTaskNotifyAt(task.deadline);
          if (!at) continue;
          const key = `task-${today}-${task.id}`;
          if (Math.abs(now - at) / 60000 <= 2) {
            notifyWeb(
              key,
              t('taskNotifTitle'),
              t('taskNotifBody', { title: getTaskDisplayTitle(task, t) })
            );
          }
        }
      }
    };

    const interval = setInterval(check, POLL_MS);
    check();

    const onVisible = () => {
      if (document.visibilityState === 'visible') check();
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [
    settings.prayerNotifications,
    settings.muzakkirEnabled,
    settings.taskNotifications,
    settings.muzakkirTimes,
    settings.muzakkirSlots,
    settings.muzakkirMorningChecklist,
    settings.notifiedToday,
    prayerList,
    tasks,
    habits,
    t,
    lang,
    markNotified,
  ]);
}

export async function requestNotificationPermission() {
  return requestAppNotificationPermission();
}
