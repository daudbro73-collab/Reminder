import { isNativeApp } from '../native.js';
import {
  ensureLocalNotificationPermission,
  ensureNotificationChannel,
  ensureExactAlarmPermission,
} from './nativeNotificationHelper.js';

const EXACT_ALARM_PROMPT_KEY = 'muzakkir_exact_alarm_prompted';

/**
 * Request notification permission without opening Android exact-alarm settings.
 * Does not block UI — returns current status after a single OS prompt if needed.
 */
export async function requestAppNotificationPermission() {
  if (isNativeApp()) {
    try {
      await ensureNotificationChannel();
      const { LocalNotifications } = await import('@capacitor/local-notifications');
      const current = await LocalNotifications.checkPermissions();
      if (current.display !== 'granted') {
        const requested = await LocalNotifications.requestPermissions();
        if (requested.display !== 'granted') return 'denied';
      }
      return 'granted';
    } catch {
      return 'unsupported';
    }
  }

  if (!('Notification' in window)) return 'unsupported';
  if (Notification.permission === 'granted') return 'granted';
  if (Notification.permission === 'denied') return 'denied';
  return Notification.requestPermission();
}

/** Optional: open exact-alarm settings once (user can skip). Never called automatically on enable. */
export async function promptExactAlarmOnceIfNeeded() {
  if (!isNativeApp()) return true;
  try {
    const already = localStorage.getItem(EXACT_ALARM_PROMPT_KEY);
    const granted = await ensureExactAlarmPermission();
    if (granted || already === '1') return true;

    const { Capacitor } = await import('@capacitor/core');
    if (Capacitor.getPlatform() !== 'android') return true;

    const { LocalNotifications } = await import('@capacitor/local-notifications');
    localStorage.setItem(EXACT_ALARM_PROMPT_KEY, '1');
    await LocalNotifications.changeExactNotificationSetting();
    return ensureExactAlarmPermission();
  } catch {
    return true;
  }
}

export async function ensureNotificationPermissionSilent() {
  if (isNativeApp()) {
    await ensureNotificationChannel();
    return ensureLocalNotificationPermission();
  }
  if (!('Notification' in window)) return false;
  return Notification.permission === 'granted';
}
