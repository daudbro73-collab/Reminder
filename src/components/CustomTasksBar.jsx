import { useLanguage } from '../i18n/LanguageContext';

export default function CustomTasksBar({ onAdd }) {
  const { t } = useLanguage();

  return (
    <section className="custom-tasks-bar">
      <div className="custom-tasks-text">
        <h3 className="custom-tasks-title">{t('myTasks')}</h3>
        <p className="custom-tasks-hint">{t('myTasksHint')}</p>
      </div>
      <button type="button" className="custom-tasks-btn" onClick={onAdd}>
        <span className="custom-tasks-btn-icon">+</span>
        {t('addCustomTask')}
      </button>
    </section>
  );
}
