import { useLanguage } from '../i18n/LanguageContext';
import { useCategories } from '../hooks/useCategories';
import CategoryIcon from './icons/CategoryIcon';

export default function CategoryTabs({ active, onChange, tasks }) {
  const { t } = useLanguage();
  const categories = useCategories();

  const tabs = [
    { id: 'all', label: t('all') },
    ...categories,
  ];

  return (
    <nav className="category-tabs">
      {tabs.map((tab) => {
        const count =
          tab.id === 'all'
            ? tasks.filter((task) => !task.completed).length
            : tasks.filter((task) => task.category === tab.id && !task.completed).length;
        const isActive = active === tab.id;
        const color = tab.color || 'var(--primary)';

        return (
          <button
            key={tab.id}
            className={`category-tab ${isActive ? 'active' : ''}`}
            onClick={() => onChange(tab.id)}
            style={isActive ? { '--tab-color': color, '--tab-bg': tab.lightColor } : undefined}
          >
            <span className="tab-icon">
              <CategoryIcon name={tab.id} size={18} />
            </span>
            <span className="tab-label">{tab.label}</span>
            {count > 0 && <span className="tab-badge">{count}</span>}
          </button>
        );
      })}
    </nav>
  );
}
