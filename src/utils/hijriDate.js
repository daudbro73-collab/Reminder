const HIJRI_LOCALE = {
  ru: 'ru-RU-u-ca-islamic',
  en: 'en-US-u-ca-islamic',
  ar: 'ar-SA-u-ca-islamic',
  es: 'es-ES-u-ca-islamic',
};

const GREG_LOCALE = {
  ru: 'ru-RU',
  en: 'en-US',
  ar: 'ar-SA',
  es: 'es-ES',
};

export function formatHijriDate(date = new Date(), lang = 'ru') {
  const hijriLocale = HIJRI_LOCALE[lang] || HIJRI_LOCALE.en;
  try {
    return new Intl.DateTimeFormat(hijriLocale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch {
    return new Intl.DateTimeFormat(HIJRI_LOCALE.en, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  }
}

export function formatGregorianDate(date = new Date(), lang = 'ru', options = {}) {
  const locale = GREG_LOCALE[lang] || GREG_LOCALE.en;
  const withWeekday = options.withWeekday !== false;
  return new Intl.DateTimeFormat(locale, {
    ...(withWeekday ? { weekday: 'long' } : {}),
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function getHijriDayMonth(date = new Date(), lang = 'ru') {
  const hijriLocale = HIJRI_LOCALE[lang] || HIJRI_LOCALE.en;
  try {
    const parts = new Intl.DateTimeFormat(hijriLocale, {
      day: 'numeric',
      month: 'long',
    }).formatToParts(date);
    const day = parts.find((p) => p.type === 'day')?.value || '';
    const month = parts.find((p) => p.type === 'month')?.value || '';
    return { day, month };
  } catch {
    return { day: '', month: '' };
  }
}
