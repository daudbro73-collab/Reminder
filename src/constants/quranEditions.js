/** King Fahd Complex (Madinah) Uthmani Arabic + accredited translations via alquran.cloud */

export const QURAN_ARABIC_EDITION = 'quran-uthmani';

export const QURAN_TRANSLATIONS = [
  {
    id: 'ru.kuliev',
    lang: 'ru',
    labelKey: 'quranTrRu',
    flag: '🇷🇺',
    credit: 'Эльмир Кулиев',
  },
  {
    id: 'en.hilali',
    lang: 'en',
    labelKey: 'quranTrEn',
    flag: '🇬🇧',
    credit: 'Hilali & Khan (King Fahd Complex)',
  },
  {
    id: 'fr.hamidullah',
    lang: 'fr',
    labelKey: 'quranTrFr',
    flag: '🇫🇷',
    credit: 'Muhammad Hamidullah',
  },
  {
    id: 'es.garcia',
    lang: 'es',
    labelKey: 'quranTrEs',
    flag: '🇪🇸',
    credit: 'Isa García',
  },
  {
    id: 'ko.korean',
    lang: 'ko',
    labelKey: 'quranTrKo',
    flag: '🇰🇷',
    credit: 'Korean',
  },
  {
    id: 'ja.japanese',
    lang: 'ja',
    labelKey: 'quranTrJa',
    flag: '🇯🇵',
    credit: 'Japanese',
  },
  {
    id: 'zh.jian',
    lang: 'zh',
    labelKey: 'quranTrZh',
    flag: '🇨🇳',
    credit: 'Ma Jian (马坚)',
  },
];

export const QURAN_EDITION_IDS = [
  QURAN_ARABIC_EDITION,
  ...QURAN_TRANSLATIONS.map((t) => t.id),
].join(',');

const UI_LANG_TO_TRANSLATION = {
  ru: 'ru.kuliev',
  en: 'en.hilali',
  es: 'es.garcia',
  ar: 'en.hilali',
};

export function defaultTranslationId(uiLang) {
  return UI_LANG_TO_TRANSLATION[uiLang] || 'en.hilali';
}

function stripLeadingBismillah(text) {
  if (!text.startsWith('بِسْمِ') && !text.startsWith('بسم')) return text;
  const markers = ['ٱلرَّحِيمِ', 'ٱلرَّحِيمِ', 'الرَّحِيمِ', "الرَّحِيمِ"];
  for (const marker of markers) {
    const idx = text.indexOf(marker);
    if (idx !== -1) {
      return text.slice(idx + marker.length).trim();
    }
  }
  return text;
}

/** Strip BOM and Madinah mushaf bismillah prepended to ayah 1 (except Al-Fatiha). */
export function cleanUthmaniAyahText(text, surahNumber, ayahNumberInSurah) {
  let cleaned = String(text || '').replace(/^\uFEFF/, '').trim();
  if (surahNumber !== 1 && ayahNumberInSurah === 1) {
    cleaned = stripLeadingBismillah(cleaned);
  }
  return cleaned;
}

export const MUSHAF_BISMILLAH = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ';
