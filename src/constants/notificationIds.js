export const MUZAKKIR_NOTIFICATION_IDS = {
  morning: 101,
  noon: 102,
  evening: 103,
};

export const PRAYER_NOTIFICATION_IDS = {
  Fajr: 201,
  Dhuhr: 202,
  Asr: 203,
  Maghrib: 204,
  Isha: 205,
};

export const TASK_NOTIF_BASE = 301;
export const TASK_NOTIF_MAX = 999;

export const ALL_MUZAKKIR_IDS = Object.values(MUZAKKIR_NOTIFICATION_IDS);
export const ALL_PRAYER_IDS = Object.values(PRAYER_NOTIFICATION_IDS);
export const ALL_TASK_IDS = Array.from(
  { length: TASK_NOTIF_MAX - TASK_NOTIF_BASE + 1 },
  (_, i) => TASK_NOTIF_BASE + i
);

export function taskNotificationId(taskId) {
  let h = 0;
  for (let i = 0; i < taskId.length; i++) {
    h = (Math.imul(31, h) + taskId.charCodeAt(i)) | 0;
  }
  return TASK_NOTIF_BASE + (Math.abs(h) % (TASK_NOTIF_MAX - TASK_NOTIF_BASE + 1));
}
