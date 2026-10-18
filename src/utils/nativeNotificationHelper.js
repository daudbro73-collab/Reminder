import { isNativeApp } from '../native.js';

export const NOTIFICATION_CHANNEL_ID = 'muzakkir';

export const NATIVE_NOTIF_OPTS = {
  smallIcon: 'ic_stat_icon',
  iconColor: '#1b4332',
  channelId: NOTIFICATION_CHANNEL_ID,
  autoCancel: true,
};

let channelReady = false;
let listenersReady = false;

/** Daily at hour:minute — Capacitor cron; do NOT use `every: 'day'`. */
export function buildDailyOnSchedule(hour, minute) {
  return {
    on: { hour, minute, second: 0 },
    allowWhileIdle: true,
  };
}

export function buildAtSchedule(date) {
  const at = date instanceof Date ? date : new Date(date);
  return {
    at: at.toISOString(),
    allowWhileIdle: true,
  };
}

export async function ensureNotificationChannel() {
  if (!isNativeApp() || channelReady) return;
  try {
    const { Capacitor } = await import('@capacitor/core');
    if (Capacitor.getPlatform() !== 'android') {
      channelReady = true;
      return;
    }
    const { LocalNotifications } = await import('@capacitor/local-notifications');
    await LocalNotifications.createChannel({
      id: NOTIFICATION_CHANNEL_ID,
      name: 'Muzakkir',
      description: 'Напоминания Музаккира',
      importance: 5,
      visibility: 1,
      sound: 'default',
      vibration: true,
    });
    channelReady = true;
  } catch (err) {
    console.warn('Notification channel:', err);
  }
}

export async function ensureExactAlarmPermission() {
  if (!isNativeApp()) return true;
  try {
    const { Capacitor } = await import('@capacitor/core');
    if (Capacitor.getPlatform() !== 'android') return true;
    const { LocalNotifications } = await import('@capacitor/local-notifications');
    const status = await LocalNotifications.checkExactNotificationSetting();
    return status.exactAlarm === 'granted';
  } catch {
    return true;
  }
}

export async function ensureExactAlarmForSchedule() {
  if (!isNativeApp()) return true;
  try {
    const { Capacitor } = await import('@capacitor/core');
    if (Capacitor.getPlatform() !== 'android') return true;
    const { LocalNotifications } = await import('@capacitor/local-notifications');
    const before = await LocalNotifications.checkExactNotificationSetting();
    if (before.exactAlarm === 'granted') return true;
    await LocalNotifications.changeExactNotificationSetting();
    const after = await LocalNotifications.checkExactNotificationSetting();
    return after.exactAlarm === 'granted';
  } catch {
    return true;
  }
}

export async function openExactAlarmSettings() {
  if (!isNativeApp()) return;
  try {
    const { Capacitor } = await import('@capacitor/core');
    if (Capacitor.getPlatform() !== 'android') return;
    const { LocalNotifications } = await import('@capacitor/local-notifications');
    await LocalNotifications.changeExactNotificationSetting();
  } catch {
    // ignore
  }
}

export async function ensureLocalNotificationPermission() {
  if (!isNativeApp()) return false;
  try {
    await ensureNotificationChannel();
    const { LocalNotifications } = await import('@capacitor/local-notifications');
    const current = await LocalNotifications.checkPermissions();
    if (current.display !== 'granted') {
      const requested = await LocalNotifications.requestPermissions();
      if (requested.display !== 'granted') return false;
    }
    return true;
  } catch {
    return false;
  }
}

export async function cancelLocalNotifications(ids) {
  if (!isNativeApp() || !ids?.length) return;
  try {
    const { LocalNotifications } = await import('@capacitor/local-notifications');
    await LocalNotifications.cancel({
      notifications: ids.map((id) => ({ id })),
    });
  } catch (err) {
    console.warn('Cancel local notifications:', err);
  }
}

export async function scheduleLocalNotifications(notifications) {
  if (!isNativeApp() || !notifications?.length) return false;
  try {
    await ensureNotificationChannel();
    const granted = await ensureLocalNotificationPermission();
    if (!granted) return false;

    await ensureExactAlarmForSchedule();

    const { LocalNotifications } = await import('@capacitor/local-notifications');
    await LocalNotifications.schedule({ notifications });
    return true;
  } catch (err) {
    console.warn('Schedule local notifications:', err);
    return false;
  }
}

export function parseTime(timeStr) {
  const [h, m] = (timeStr || '07:00').split(':').map(Number);
  return { hour: h || 0, minute: m || 0 };
}

let resyncTimer = null;

export function setupNativeNotificationListeners(onResync) {
  if (!isNativeApp() || listenersReady || typeof onResync !== 'function') return;

  listenersReady = true;

  import('@capacitor/local-notifications').then(({ LocalNotifications }) => {
    const handleFire = () => {
      import('./muzakkirChime.js').then(({ playMuzakkirChime }) => playMuzakkirChime());
      clearTimeout(resyncTimer);
      resyncTimer = setTimeout(onResync, 800);
    };

    LocalNotifications.addListener('localNotificationReceived', handleFire);
    LocalNotifications.addListener('localNotificationActionPerformed', handleFire);
  });
}
