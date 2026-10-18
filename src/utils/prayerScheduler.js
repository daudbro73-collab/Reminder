import { isNativeApp } from '../native.js';
import { PRAYER_NOTIFICATION_IDS, ALL_PRAYER_IDS } from '../constants/notificationIds.js';
import {
  buildDailyOnSchedule,
  cancelLocalNotifications,
  ensureLocalNotificationPermission,
  NATIVE_NOTIF_OPTS,
  parseTime,
  scheduleLocalNotifications,
} from './nativeNotificationHelper.js';

export async function syncPrayerSchedule(settings, prayerList, t) {
  if (!isNativeApp()) return false;

  await cancelLocalNotifications(ALL_PRAYER_IDS);

  if (!settings.prayerNotifications || !prayerList?.length) return true;

  const granted = await ensureLocalNotificationPermission();
  if (!granted) return false;

  const notifications = prayerList.map((prayer) => {
    const { hour, minute } = parseTime(prayer.time);
    return {
      id: PRAYER_NOTIFICATION_IDS[prayer.key],
      title: t('prayerNotifTitle'),
      body: t('prayerNotifBody', {
        prayer: t(`prayers.${prayer.labelKey}`),
        time: prayer.time,
      }),
      schedule: buildDailyOnSchedule(hour, minute),
      ...NATIVE_NOTIF_OPTS,
    };
  });

  if (!notifications.length) return true;
  return scheduleLocalNotifications(notifications);
}
