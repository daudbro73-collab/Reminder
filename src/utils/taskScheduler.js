import { toDateKey } from './dateUtils.js';
import { getTaskDisplayTitle } from './displayLabels.js';
import { isNativeApp } from '../native.js';
import {
  ALL_TASK_IDS,
  taskNotificationId,
} from '../constants/notificationIds.js';
import {
  buildAtSchedule,
  cancelLocalNotifications,
  ensureLocalNotificationPermission,
  NATIVE_NOTIF_OPTS,
  scheduleLocalNotifications,
} from './nativeNotificationHelper.js';

const TASK_REMINDER_HOUR = 9;
const MAX_SCHEDULED_TASKS = 50;

export function getTasksForNotification(tasks, today = toDateKey()) {
  return tasks
    .filter((task) => !task.completed && task.deadline && task.deadline >= today)
    .sort((a, b) => a.deadline.localeCompare(b.deadline))
    .slice(0, MAX_SCHEDULED_TASKS);
}

export function getTaskNotifyAt(deadlineKey) {
  const at = new Date(`${deadlineKey}T${String(TASK_REMINDER_HOUR).padStart(2, '0')}:00:00`);
  const now = new Date();
  return at > now ? at : null;
}

export async function syncTaskSchedule(settings, tasks, t) {
  if (!isNativeApp()) return false;

  await cancelLocalNotifications(ALL_TASK_IDS);

  if (!settings.taskNotifications) return true;

  const granted = await ensureLocalNotificationPermission();
  if (!granted) return false;

  const today = toDateKey();
  const pending = getTasksForNotification(tasks, today);
  const notifications = [];

  for (const task of pending) {
    const at = getTaskNotifyAt(task.deadline);
    if (!at) continue;

    notifications.push({
      id: taskNotificationId(task.id),
      title: t('taskNotifTitle'),
      body: t('taskNotifBody', { title: getTaskDisplayTitle(task, t) }),
      schedule: buildAtSchedule(at),
      ...NATIVE_NOTIF_OPTS,
    });
  }

  if (!notifications.length) return true;
  return scheduleLocalNotifications(notifications);
}
