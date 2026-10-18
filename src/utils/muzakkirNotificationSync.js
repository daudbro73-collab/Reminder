import { buildMorningChecklistText } from './dailyChecklist.js';
import { syncMuzakkirSchedule } from './muzakkirScheduler.js';

export const MUZAKKIR_RESYNC_EVENT = 'muzakkir:resync-notifications';
export const NATIVE_NOTIFICATION_SYNC_EVENT = 'native:sync-notifications';

export function requestMuzakkirResync() {
  requestNativeNotificationSync();
}

export function requestNativeNotificationSync() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(NATIVE_NOTIFICATION_SYNC_EVENT));
    window.dispatchEvent(new CustomEvent(MUZAKKIR_RESYNC_EVENT));
  }
}

export function buildMuzakkirMorningExtra(settings, tasks, habits, t) {
  if (!settings.muzakkirMorningChecklist) return '';
  return buildMorningChecklistText(tasks, habits, t);
}

export async function syncMuzakkirNotifications({ settings, lang, tasks = [], habits = [], t }) {
  const getMorningExtra = () => buildMuzakkirMorningExtra(settings, tasks, habits, t);
  return syncMuzakkirSchedule(settings, lang, getMorningExtra);
}
