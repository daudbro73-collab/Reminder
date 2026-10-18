import { toDateKey, getDateRange } from './dateUtils';
import { getOverallProgress, getCategoryProgress } from '../hooks/useTasks';
import { getHabitProgress, PERIOD_OPTIONS, resolvePeriodDays } from './habitProgress';

export const TRACKER_PERIODS = PERIOD_OPTIONS;
export { resolvePeriodDays };

export function getTasksCompletedOnDate(tasks, dateKey) {
  return tasks.filter((task) => {
    if (!task.completed || !task.completedAt) return false;
    return toDateKey(new Date(task.completedAt)) === dateKey;
  }).length;
}

export function getDailyActivity(tasks, habits, periodDays) {
  const today = toDateKey();
  return getDateRange(today, periodDays).map((date) => {
    const tasksDone = getTasksCompletedOnDate(tasks, date);
    const habitClean = habits.filter((h) => h.logs?.[date] === 'clean').length;
    const habitRelapse = habits.filter((h) => h.logs?.[date] === 'relapse').length;
    const maxScore = Math.max(tasks.length, 1) + habits.length;
    const score = tasksDone + habitClean;
    const intensity = maxScore > 0 ? Math.min(score / maxScore, 1) : 0;

    return { date, tasksDone, habitClean, habitRelapse, score, intensity };
  });
}

export function getTodayStats(tasks, habits, periodDays = 30) {
  const today = toDateKey();
  const tasksTotal = tasks.length;
  const tasksDoneToday = tasks.filter(
    (t) => t.completed && t.completedAt && toDateKey(new Date(t.completedAt)) === today
  ).length;
  const tasksDoneTotal = tasks.filter((t) => t.completed).length;

  const habitsCleanToday = habits.filter((h) => h.logs?.[today] === 'clean').length;
  const habitsTracked = habits.length;

  let habitsAvgSuccess = 0;
  if (habits.length > 0) {
    const sum = habits.reduce((acc, h) => acc + getHabitProgress(h, periodDays).successRate, 0);
    habitsAvgSuccess = Math.round(sum / habits.length);
  }

  const taskProgress = getOverallProgress(tasks);
  const combined =
    tasks.length === 0 && habits.length === 0
      ? 0
      : tasks.length === 0
        ? habitsAvgSuccess
        : habits.length === 0
          ? taskProgress.percent
          : Math.round((taskProgress.percent + habitsAvgSuccess) / 2);

  return {
    tasksTotal,
    tasksDoneToday,
    tasksDoneTotal,
    habitsTracked,
    habitsCleanToday,
    habitsAvgSuccess,
    taskProgress,
    combined,
  };
}

export function getCategoryTrackerStats(tasks, categoryId) {
  return getCategoryProgress(tasks, categoryId);
}
