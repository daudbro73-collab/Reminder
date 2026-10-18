import { getPresetTranslations, getHabitPresetTranslations } from '../i18n/presetStrings.js';

const LANGS = ['ru', 'en', 'ar', 'es'];

export function findTaskPreset(task) {
  if (task.presetId && task.category) {
    return { category: task.category, presetId: task.presetId };
  }
  if (!task.title) return null;

  for (const lang of LANGS) {
    const presets = getPresetTranslations(lang);
    for (const [category, items] of Object.entries(presets)) {
      if (!items) continue;
      for (const [presetId, title] of Object.entries(items)) {
        if (title === task.title) return { category, presetId };
      }
    }
  }
  return null;
}

export function findHabitPreset(habit) {
  if (habit.presetId && habit.sphere) {
    return { sphere: habit.sphere, presetId: habit.presetId };
  }
  if (!habit.title) return null;

  for (const lang of LANGS) {
    const presets = getHabitPresetTranslations(lang);
    for (const [sphere, items] of Object.entries(presets)) {
      if (!items) continue;
      for (const [presetId, title] of Object.entries(items)) {
        if (title === habit.title) return { sphere, presetId };
      }
    }
  }
  return null;
}

export function getHabitPresetKey(habit) {
  const match = findHabitPreset(habit);
  return match ? `${match.sphere}:${match.presetId}` : null;
}

export function getTaskDisplayTitle(task, t) {
  const match = findTaskPreset(task);
  if (match) {
    return t(`presets.${match.category}.${match.presetId}`);
  }
  return task.title;
}

export function getHabitDisplayTitle(habit, t) {
  const match = findHabitPreset(habit);
  if (match) {
    return t(`habitPresets.${match.sphere}.${match.presetId}`);
  }
  return habit.title;
}
