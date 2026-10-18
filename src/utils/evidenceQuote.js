const ARABIC_RE = /[\u0600-\u06FF\u0750-\u077F]/;

export function isArabicText(str) {
  return ARABIC_RE.test(str || '');
}

/** Нормализует аят или хадис к { textAr, translation: { ru, en, es } } */
export function normalizeQuote(item) {
  if (item.textAr && item.translation) {
    return { textAr: item.textAr, translation: item.translation };
  }

  if (item.text) {
    const { ru, en, ar, es } = item.text;
    return {
      textAr: ar,
      translation: {
        ru: isArabicText(ru) ? en : ru,
        en,
        es,
      },
    };
  }

  return { textAr: '', translation: { ru: '', en: '', es: '' } };
}

/** Текст на выбранном языке из объекта { ru, en, ar, es } */
export function pickLocalized(fields, lang) {
  if (!fields) return '';
  return fields[lang] || fields.en || fields.ru || fields.es || '';
}

/** Перевод хадиса/аята: для арабского UI не дублируем — оригинал уже на арабском */
export function pickTranslation(translation, lang) {
  if (!translation || lang === 'ar') return null;
  return translation[lang] || translation.en || translation.ru || translation.es || null;
}
