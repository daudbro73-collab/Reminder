import { useLanguage } from '../../i18n/LanguageContext';
import { getHabitProgress, getTodayStatus } from '../../utils/habitProgress';
import { getHabitDisplayTitle } from '../../utils/displayLabels';
import { toDateKey } from '../../utils/dateUtils';
import HabitIcon from '../icons/HabitIcon';
import HabitDayGrid from './HabitDayGrid';

function ProgressRing({ percent, size = 64, habitId }) {
  const gradId = `habitGrad-${habitId}`;
  const stroke = 5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="habit-ring-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c1121f" />
            <stop offset="100%" stopColor="#e85d04" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--border)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="progress-ring-fill"
        />
      </svg>
      <div className="habit-ring-center">
        <span className="habit-ring-value">{percent}%</span>
      </div>
    </div>
  );
}

export default function HabitCard({ habit, periodDays, onLogToday, onDelete }) {
  const { t } = useLanguage();
  const progress = getHabitProgress(habit, periodDays);
  const todayStatus = getTodayStatus(habit);
  const todayKey = toDateKey();

  return (
    <article className="habit-card">
      <div className="habit-card-header">
        <div className="habit-card-title-row">
          <span className="habit-card-icon-wrap">
            <HabitIcon name="shield" size={22} />
          </span>
          <div>
            <h3 className="habit-card-title">{getHabitDisplayTitle(habit, t)}</h3>
            {habit.note && <p className="habit-card-note">{habit.note}</p>}
          </div>
        </div>
        <button type="button" className="habit-delete" onClick={() => onDelete(habit.id)} aria-label={t('delete')}>
          ×
        </button>
      </div>

      {habit.fields?.length > 0 && (
        <div className="habit-custom-fields">
          {habit.fields.map((field) => (
            <div key={field.id} className="habit-field">
              <span className="habit-field-label">{field.label}</span>
              <span className="habit-field-value">{field.value}</span>
            </div>
          ))}
        </div>
      )}

      <div className="habit-stats-row">
        <ProgressRing percent={progress.periodProgress} habitId={habit.id} />
        <div className="habit-stats">
          <div className="habit-stat">
            <span className="habit-stat-value">{progress.currentStreak}</span>
            <span className="habit-stat-label">{t('currentStreak')}</span>
          </div>
          <div className="habit-stat">
            <span className="habit-stat-value">{progress.bestStreak}</span>
            <span className="habit-stat-label">{t('bestStreak')}</span>
          </div>
          <div className="habit-stat">
            <span className="habit-stat-value">{progress.successRate}%</span>
            <span className="habit-stat-label">{t('successRate')}</span>
          </div>
        </div>
      </div>

      <div className="habit-today-actions">
        <span className="habit-today-label">{t('todayMark')}</span>
        <div className="habit-action-btns">
          <button
            type="button"
            className={`habit-action-btn clean ${todayStatus === 'clean' ? 'active' : ''}`}
            onClick={() => onLogToday(habit.id, todayStatus === 'clean' ? null : 'clean')}
          >
            <HabitIcon name="clean" size={16} />
            {t('markClean')}
          </button>
          <button
            type="button"
            className={`habit-action-btn relapse ${todayStatus === 'relapse' ? 'active' : ''}`}
            onClick={() => onLogToday(habit.id, todayStatus === 'relapse' ? null : 'relapse')}
          >
            <HabitIcon name="relapse" size={16} />
            {t('markRelapse')}
          </button>
        </div>
      </div>

      <HabitDayGrid days={progress.days} periodDays={periodDays} />

      <p className="habit-period-summary">
        {t('habitPeriodSummary', {
          clean: progress.clean,
          total: periodDays,
          days: progress.totalSinceStart,
        })}
      </p>
    </article>
  );
}
