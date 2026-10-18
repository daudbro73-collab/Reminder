import { useLanguage } from '../i18n/LanguageContext';
import { useCategories } from '../hooks/useCategories';
import { getCategoryProgress, getOverallProgress } from '../hooks/useTasks';
import CategoryIcon from './icons/CategoryIcon';

function ProgressRing({ percent, color, gradientId, size = 72, children }) {
  const stroke = 5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="progress-ring-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="progress-ring">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="progress-ring-fill"
        />
      </svg>
      <div className="progress-ring-center">
        {children ?? (
          <span className="progress-ring-percent" style={{ color }}>
            {percent}%
          </span>
        )}
      </div>
    </div>
  );
}

export default function ProgressOverview({ tasks }) {
  const { t } = useLanguage();
  const categories = useCategories();
  const overall = getOverallProgress(tasks);

  return (
    <section className="progress-overview">
      <div className="overall-card">
        <div className="overall-info">
          <span className="section-title">{t('overallBalance')}</span>
          <span className="overall-percent">{overall.percent}%</span>
          <span className="overall-detail">
            {t('tasksCount', { completed: overall.completed, total: overall.total })}
          </span>
        </div>
        <div className="overall-bars">
          {categories.map((cat) => {
            const { percent } = getCategoryProgress(tasks, cat.id);
            return (
              <div key={cat.id} className="overall-bar-row">
                <CategoryIcon name={cat.id} size={16} className="overall-bar-icon" />
                <div className="overall-bar-track">
                  <div
                    className="overall-bar-fill"
                    style={{ width: `${percent}%`, background: cat.color }}
                  />
                </div>
                <span className="overall-bar-value" style={{ color: cat.color }}>
                  {percent}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <h2 className="section-title">{t('yourProgress')}</h2>
      <div className="progress-grid">
        {categories.map((cat) => {
          const { total, completed, percent } = getCategoryProgress(tasks, cat.id);
          return (
            <div
              key={cat.id}
              className="progress-card"
              style={{
                '--cat-color': cat.color,
                '--cat-bg': cat.lightColor,
              }}
            >
              <ProgressRing
                percent={percent}
                color={cat.color}
                gradientId={`grad-${cat.id}`}
              >
                <CategoryIcon name={cat.id} size={28} className="progress-card-svg-icon" />
              </ProgressRing>
              <div className="progress-card-info">
                <span className="progress-card-label">{cat.label}</span>
                <span className="progress-card-count">
                  {t('tasksCount', { completed, total })}
                </span>
                <div className="progress-mini-bar">
                  <div
                    className="progress-mini-fill"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
