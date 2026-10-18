import { toDateKey } from './dateUtils';
import { getTaskDisplayTitle, getHabitDisplayTitle } from './displayLabels';

export function getTasksForDate(tasks, dateKey) {
  const today = toDateKey();
  const isToday = dateKey === today;
  const isFuture = dateKey > today;

  return tasks.filter((task) => {
    if (task.completed) {
      return task.completedAt && toDateKey(new Date(task.completedAt)) === dateKey;
    }
    if (isFuture) {
      return task.deadline === dateKey;
    }
    if (!task.deadline) return isToday;
    return task.deadline <= dateKey;
  });
}

export function getActiveTasksForToday(tasks) {
  const today = toDateKey();
  return tasks
    .filter((task) => !task.completed)
    .filter((task) => {
      if (!task.deadline) return true;
      return task.deadline <= today;
    })
    .sort((a, b) => {
      if (a.deadline && !b.deadline) return -1;
      if (!a.deadline && b.deadline) return 1;
      if (a.deadline && b.deadline) return a.deadline.localeCompare(b.deadline);
      return 0;
    });
}

export function getHabitsForDate(habits, dateKey) {
  const today = toDateKey();
  if (dateKey > today) return [];
  return habits.map((habit) => ({
    habit,
    status: habit.logs?.[dateKey] ?? null,
  }));
}

export function getDaySummary(tasks, habits, dateKey) {
  const dayTasks = getTasksForDate(tasks, dateKey);
  const active = dayTasks.filter((t) => !t.completed);
  const done = dayTasks.filter((t) => t.completed);
  const habitEntries = getHabitsForDate(habits, dateKey);
  const habitsClean = habitEntries.filter((e) => e.status === 'clean').length;
  const habitsPending = habitEntries.filter((e) => e.status === null).length;

  return {
    total: active.length + done.length + habitEntries.length,
    tasksActive: active.length,
    tasksDone: done.length,
    habitsClean,
    habitsPending,
    hasActivity: dayTasks.length > 0 || habitEntries.length > 0,
  };
}

export function buildMorningChecklistText(tasks, habits, t) {
  const activeTasks = getActiveTasksForToday(tasks);
  const today = toDateKey();
  const pendingHabits = habits.filter((h) => !h.logs?.[today]);

  const lines = [];
  if (activeTasks.length > 0) {
    lines.push(`${t('checklistTasks')} (${activeTasks.length}):`);
    activeTasks.slice(0, 12).forEach((task) => {
      lines.push(`• ${getTaskDisplayTitle(task, t)}`);
    });
    if (activeTasks.length > 12) {
      lines.push(`… +${activeTasks.length - 12}`);
    }
  }

  if (pendingHabits.length > 0) {
    if (lines.length) lines.push('');
    lines.push(`${t('checklistHabits')} (${pendingHabits.length}):`);
    pendingHabits.slice(0, 6).forEach((h) => {
      lines.push(`• ${getHabitDisplayTitle(h, t)}`);
    });
    if (pendingHabits.length > 6) {
      lines.push(`… +${pendingHabits.length - 6}`);
    }
  }

  if (lines.length === 0) {
    return t('checklistEmpty');
  }

  return lines.join('\n');
}
