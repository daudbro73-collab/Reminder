import { toDateKey, getDateRange, daysBetween } from './dateUtils';

export const PERIOD_OPTIONS = [7, 30, 90];

export function resolvePeriodDays(periodType, customDays) {
  if (periodType === 'custom') {
    return Math.max(1, Math.min(999, Number(customDays) || 30));
  }
  return Number(periodType) || 30;
}

export function getHabitPeriodDays(habit, globalPeriod) {
  if (habit.periodType === 'custom' && habit.customPeriodDays > 0) {
    return habit.customPeriodDays;
  }
  if (PERIOD_OPTIONS.includes(habit.periodDays)) {
    return habit.periodDays;
  }
  return globalPeriod;
}

export function getHabitProgress(habit, periodDays, todayKey = toDateKey()) {
  const startKey = habit.startDate || toDateKey(habit.createdAt);
  const rangeEnd = todayKey;
  const rangeStart = getDateRange(rangeEnd, periodDays)[0];
  const effectiveStart = rangeStart < startKey ? startKey : rangeStart;

  const days = getDateRange(rangeEnd, periodDays).filter((d) => d >= effectiveStart && d <= rangeEnd);

  let clean = 0;
  let relapse = 0;
  let unlogged = 0;

  const dayStatuses = days.map((date) => {
    const status = habit.logs?.[date] ?? null;
    if (status === 'clean') clean++;
    else if (status === 'relapse') relapse++;
    else unlogged++;
    return { date, status };
  });

  const logged = clean + relapse;
  const successRate = logged > 0 ? Math.round((clean / logged) * 100) : 0;
  const periodProgress = Math.round((clean / periodDays) * 100);

  let currentStreak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i] > todayKey) continue;
    const s = habit.logs?.[days[i]];
    if (s === 'clean') currentStreak++;
    else if (s === 'relapse') break;
    else if (days[i] === todayKey) continue;
    else break;
  }

  let bestStreak = 0;
  let streak = 0;
  for (const { status } of dayStatuses) {
    if (status === 'clean') {
      streak++;
      bestStreak = Math.max(bestStreak, streak);
    } else if (status === 'relapse') {
      streak = 0;
    }
  }

  const totalSinceStart = daysBetween(startKey, todayKey) + 1;

  return {
    days: dayStatuses,
    clean,
    relapse,
    unlogged,
    logged,
    successRate,
    periodProgress: Math.min(periodProgress, 100),
    currentStreak,
    bestStreak,
    totalSinceStart,
    goalReached: currentStreak >= periodDays,
  };
}

export function getTodayStatus(habit, todayKey = toDateKey()) {
  return habit.logs?.[todayKey] ?? null;
}
