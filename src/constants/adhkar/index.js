import { MORNING_ADHKAR } from './morning.js';
import { EVENING_ADHKAR } from './evening.js';
import { PRAYER_ADHKAR, SLEEP_ADHKAR, WAKING_ADHKAR } from './prayer-sleep.js';
import {
  WUDU_ADHKAR,
  HOME_ADHKAR,
  MOSQUE_ADHKAR,
  FOOD_ADHKAR,
} from './daily-life.js';
import {
  TRAVEL_ADHKAR,
  DISTRESS_ADHKAR,
  FORGIVENESS_ADHKAR,
  PRAISE_ADHKAR,
  PROTECTION_ADHKAR,
  SICKNESS_ADHKAR,
  MISC_ADHKAR,
} from './situations.js';
import { ADHKAR_MEANINGS } from './meanings/index.js';

const RAW_CATEGORIES = [
  MORNING_ADHKAR,
  EVENING_ADHKAR,
  WAKING_ADHKAR,
  PRAYER_ADHKAR,
  SLEEP_ADHKAR,
  WUDU_ADHKAR,
  HOME_ADHKAR,
  MOSQUE_ADHKAR,
  FOOD_ADHKAR,
  TRAVEL_ADHKAR,
  DISTRESS_ADHKAR,
  FORGIVENESS_ADHKAR,
  PRAISE_ADHKAR,
  PROTECTION_ADHKAR,
  SICKNESS_ADHKAR,
  MISC_ADHKAR,
];

function enrichItem(entry) {
  const meta = ADHKAR_MEANINGS[entry.id];
  if (!meta) return entry;
  return {
    ...entry,
    translation: meta.translation,
    transliteration: meta.transliteration,
  };
}

export const ADHKAR_CATEGORIES = RAW_CATEGORIES.map((category) => ({
  ...category,
  items: category.items.map(enrichItem),
}));

export const ADHKAR_COUNT = ADHKAR_CATEGORIES.reduce((n, c) => n + c.items.length, 0);
