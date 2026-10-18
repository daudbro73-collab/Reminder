export const EMOJIS = {
  // Categories
  physical: '💪',
  intellectual: '🧠',
  spiritual: '❤️',
  financial: '👛',
  all: '✨',

  // Nav
  tasks: '✅',
  habits: '🛡️',
  tracker: '📊',
  calendar: '📅',
  sunrise: '🌅',
  bell: '🔔',
  sun: '☀️',
  moon: '🌙',

  // Prayers & spiritual
  fajr: '🌅',
  dhuhr: '☀️',
  asr: '🌤️',
  maghrib: '🌇',
  isha: '🌙',
  quran: '📖',
  dhikr_morning: '🌄',
  dhikr_evening: '🌆',
  tahajjud: '✨',
  duha: '🌞',

  // Physical
  exercise: '🏋️',
  water: '💧',
  walk: '🚶',
  sleep: '😴',
  food: '🥗',
  ice_bath: '🧊',
  strength: '🏋️',
  cardio: '🏃',
  fast: '🌙',
  full_moon: '🌕',

  // Intellectual
  book: '📚',
  learn: '🎓',
  lecture: '🎬',
  memorize: '🏆',

  // Financial
  save: '💰',
  sadaqah: '💝',
  budget: '📊',
  investing: '📈',
  diversification: '🎯',
  zakat: '🪙',

  // Habits
  smoking: '🚬',
  phone: '📱',
  gossip: '🗣️',
  anger: '😤',
  food_bad: '🍔',
  clock: '⏰',
  shield: '🛡️',
  relapse: '❌',
  clean: '✅',
  field: '✏️',
  calendar: '📅',
};

export function getEmoji(name, fallback = '✨') {
  return EMOJIS[name] ?? fallback;
}
