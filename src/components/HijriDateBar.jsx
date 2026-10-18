import { useLanguage } from '../i18n/LanguageContext';
import { formatGregorianDate, formatHijriDate } from '../utils/hijriDate';

export default function HijriDateBar() {
  const { t, lang } = useLanguage();
  const now = new Date();
  const hijri = formatHijriDate(now, lang);
  const gregorian = formatGregorianDate(now, lang, { withWeekday: false });

  return (
    <section className="hijri-date-bar" aria-label={t('hijriCalendar')}>
      <p className="hijri-date-main" dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang === 'ar' ? 'ar' : undefined}>
        {hijri}
        <span className="hijri-date-sep" aria-hidden="true"> · </span>
        <span className="hijri-date-gregorian-inline">{gregorian}</span>
      </p>
    </section>
  );
}
