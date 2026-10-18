import { useLanguage } from '../i18n/LanguageContext';

export default function Header({ overall, showStat = true }) {
  const { t } = useLanguage();

  return (
    <header className="header header-compact">
      <div className="header-content">
        <div className="header-text">
          <h1>{t('appTitle')}</h1>
          <p className="subtitle">{t('subtitle')}</p>
        </div>
        {showStat && overall.total > 0 && (
          <div className="header-stat">
            <span className="header-stat-value">{overall.percent}%</span>
            <span className="header-stat-label">{t('completed')}</span>
          </div>
        )}
      </div>
    </header>
  );
}
