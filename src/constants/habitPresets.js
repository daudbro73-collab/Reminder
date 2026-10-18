export const HABIT_PRESETS = {
  physical: [
    { id: 'smoking', icon: 'smoking' },
    { id: 'junk_food', icon: 'food_bad' },
    { id: 'sedentary', icon: 'clock' },
    { id: 'late_sleep', icon: 'sleep' },
    { id: 'skip_exercise', icon: 'exercise' },
    { id: 'no_water', icon: 'water' },
  ],
  intellectual: [
    { id: 'social_media', icon: 'phone' },
    { id: 'gossip', icon: 'gossip' },
    { id: 'wasting_time', icon: 'clock' },
    { id: 'pointless_debates', icon: 'gossip' },
    { id: 'procrastination', icon: 'clock' },
  ],
  spiritual: [
    { id: 'miss_fajr', icon: 'fajr' },
    { id: 'miss_prayer', icon: 'isha' },
    { id: 'neglect_quran', icon: 'quran' },
    { id: 'skip_dhikr', icon: 'dhikr_morning' },
    { id: 'anger', icon: 'anger' },
    { id: 'backbiting', icon: 'gossip' },
  ],
  financial: [
    { id: 'impulse_buy', icon: 'budget' },
    { id: 'overspending', icon: 'save' },
    { id: 'riba_debt', icon: 'zakat' },
    { id: 'neglect_zakat', icon: 'zakat' },
    { id: 'hide_income', icon: 'save' },
    { id: 'waste_money', icon: 'budget' },
  ],
};

export const HABIT_SPHERE_ORDER = ['physical', 'intellectual', 'spiritual', 'financial'];
