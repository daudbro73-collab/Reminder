import { isNativeApp } from '../native.js';
import {
  MUZAKKIR_SLOTS,
  getActiveMuzakkirSlots,
  getMuzakkirNotification,
} from '../constants/muzakkirMessages.js';
import { ALL_MUZAKKIR_IDS, MUZAKKIR_NOTIFICATION_IDS } from '../constants/notificationIds.js';
import {
  buildDailyOnSchedule,
  cancelLocalNotifications,
  ensureLocalNotificationPermission,
  NATIVE_NOTIF_OPTS,
  parseTime,
  scheduleLocalNotifications,
} from './nativeNotificationHelper.js';

function buildMuzakkirLocalNotification(slot, settings, lang, getExtraBody) {
  const times = settings.muzakkirTimes || {};
  const { hour, minute } = parseTime(times[slot]);
  const extra =
    slot === 'morning' && settings.muzakkirMorningChecklist && getExtraBody
      ? getExtraBody()
      : '';
  const { title, body } = getMuzakkirNotification(lang, slot, extra);
  const preview = body.length > 180 ? `${body.slice(0, 177)}…` : body;

  return {
    id: MUZAKKIR_NOTIFICATION_IDS[slot],
    title,
    body: preview,
    largeBody: body,
    schedule: buildDailyOnSchedule(hour, minute),
    ...NATIVE_NOTIF_OPTS,
  };
}

export async function syncMuzakkirSchedule(settings, lang, getExtraBody) {
  if (!isNativeApp()) return false;

  await cancelLocalNotifications(ALL_MUZAKKIR_IDS);

  if (!settings.muzakkirEnabled) return true;

  const granted = await ensureLocalNotificationPermission();
  if (!granted) return false;

  const activeSlots = getActiveMuzakkirSlots(settings);
  const times = settings.muzakkirTimes || {};
  const notifications = activeSlots
    .filter((slot) => times[slot])
    .map((slot) => buildMuzakkirLocalNotification(slot, settings, lang, getExtraBody));

  if (!notifications.length) return true;
  return scheduleLocalNotifications(notifications);
}

export { MUZAKKIR_SLOTS };
