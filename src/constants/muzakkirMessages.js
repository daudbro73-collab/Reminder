const L = (ru, en, ar, es) => ({ ru, en, ar, es });

/** Always shown first in push/local notifications (Arabic). */
export const SALAM_AR = 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ';

export const TASLIM = L(
  'Ас-саляму алейкум ва рахматуллахи ва баракятух',
  'As-salamu alaykum wa rahmatullahi wa barakatuh',
  'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ',
  'As-salamu alaykum wa rahmatullahi wa barakatuh'
);

const SLOT_WISH = {
  morning: L(
    'Желаю вам благословенного и светлого дня. Пусть Аллах облегчит вам все дела и наполнит сердце спокойствием.',
    'May Allah bless your day with peace, barakah, and ease in every matter.',
    'أتمنى لكم يوماً مباركاً مليئاً بالخير والبركة. يسّر الله أموركم واملأ قلوبكم طمأنينة.',
    'Que Alá bendiga tu día con paz, barakah y facilidad en todos tus asuntos.'
  ),
  noon: L(
    'Пусть продолжение дня будет плодотворным. Сохраняйте поминание Аллаха — оно укрепляет душу и даёт силы.',
    'May the rest of your day be productive. Keep Allah in your heart — dhikr strengthens the soul.',
    'أتمنى لكم استمراراً مثمراً ليومكم. ثبّتوا ذكر الله في قلوبكم — فإنه يقوّي النفس ويزيد من الطاقة.',
    'Que el resto de tu día sea productivo. Mantén a Alá en tu corazón — el dhikr fortalece el alma.'
  ),
  evening: L(
    'Проанализируйте свой день с искренностью: что удалось, а что стоит исправить. Завершите день покаянием и благодарностью Аллаху — ведь Он любит кающихся.',
    'Reflect on your day with sincerity: what went well and what to improve. End it with repentance and gratitude to Allah — He loves those who turn back to Him.',
    'راجعوا يومكم بصدق: ما أحسنتموه وما يحتاج إلى تحسين. اختمُوا يومكم بتوبة وشكر لله — إنه يحب التوابين.',
    'Analiza tu día con sinceridad: qué salió bien y qué mejorar. Ciérralo con arrepentimiento y gratitud a Alá — Él ama a quienes se vuelven a Él.'
  ),
};

const SLOT_TITLE = {
  morning: L('🌅 Музаккир — утро', '🌅 Muzakkir — morning', '🌅 مُذَكِّر — الصباح', '🌅 Muzakkir — mañana'),
  noon: L('☀️ Музаккир — полдень', '☀️ Muzakkir — noon', '☀️ مُذَكِّر — الظهر', '☀️ Muzakkir — mediodía'),
  evening: L('🌙 Музаккир — вечер', '🌙 Muzakkir — evening', '🌙 مُذَكِّر — المساء', '🌙 Muzakkir — tarde'),
};

export const MUZAKKIR_SLOTS = ['morning', 'noon', 'evening'];

export const MUZAKKIR_DEFAULT_TIMES = {
  morning: '07:00',
  noon: '13:00',
  evening: '19:00',
};

export const MUZAKKIR_DEFAULT_SLOTS = {
  morning: true,
  noon: true,
  evening: true,
};

export function getActiveMuzakkirSlots(settings) {
  const slots = { ...MUZAKKIR_DEFAULT_SLOTS, ...settings?.muzakkirSlots };
  return MUZAKKIR_SLOTS.filter((slot) => slots[slot] !== false);
}

export function getMuzakkirNotification(lang, slot, extraBody = '') {
  const wish = SLOT_WISH[slot]?.[lang] || SLOT_WISH[slot]?.en || '';
  const title = SLOT_TITLE[slot]?.[lang] || SLOT_TITLE[slot]?.en || 'Muzakkir';
  const body = extraBody
    ? `${SALAM_AR}\n\n${wish}\n\n${extraBody}`
    : `${SALAM_AR}\n\n${wish}`;
  return { title, body, taslim: SALAM_AR };
}
