import { useLanguage } from '../../i18n/LanguageContext';

export default function HabitDayGrid({ days, periodDays }) {
  const { t } = useLanguage();

  const cols = periodDays <= 7 ? 7 : periodDays <= 30 ? 10 : periodDays <= 90 ? 15 : 18;

  return (
    <div className="habit-day-grid-wrap">
      <div className="habit-grid-legend">
        <span className="legend-item clean"><span className="dot" />{t('cleanDay')}</span>
        <span className="legend-item relapse"><span className="dot" />{t('relapseDay')}</span>
        <span className="legend-item empty"><span className="dot" />{t('noData')}</span>
      </div>
      <div
        className="habit-day-grid"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {days.map(({ date, status }) => (
          <div
            key={date}
            className={`habit-day-cell ${status || 'empty'}`}
            title={date}
          />
        ))}
      </div>
    </div>
  );
}
