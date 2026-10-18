import { useLanguage } from '../i18n/LanguageContext';
import NavIcon from './icons/NavIcon';

export default function MainNav({ active, onChange }) {
  const { t } = useLanguage();

  const tabs = [
    { id: 'tasks', label: t('navTasks'), icon: 'tasks' },
    { id: 'quran', label: t('navQuran'), icon: 'quran' },
    { id: 'tracker', label: t('navTracker'), icon: 'tracker' },
    { id: 'calendar', label: t('navCalendar'), icon: 'calendar' },
    { id: 'profile', label: t('navProfile'), icon: 'profile' },
  ];

  return (
    <footer className="app-footer">
      <nav className="main-nav main-nav-five" aria-label="Main">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`main-nav-btn ${active === tab.id ? 'active' : ''}`}
            onClick={() => onChange(tab.id)}
            aria-current={active === tab.id ? 'page' : undefined}
          >
            <NavIcon name={tab.icon} size={22} />
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </footer>
  );
}
