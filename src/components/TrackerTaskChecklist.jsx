import { useLanguage } from '../i18n/LanguageContext';
import { useCategoryMap } from '../hooks/useCategories';
import { CATEGORY_IDS } from '../constants/categories';
import { getTasksForDate } from '../utils/dailyChecklist';
import { getOverallProgress } from '../hooks/useTasks';
import { toDateKey } from '../utils/dateUtils';
import { TaskItem } from './TaskList';
import CategoryIcon from './icons/CategoryIcon';

export default function TrackerTaskChecklist({ tasks, onToggle }) {
  const { t } = useLanguage();
  const categories = useCategoryMap();
  const today = toDateKey();
  const todayTasks = getTasksForDate(tasks, today);
  const active = todayTasks.filter((task) => !task.completed);
  const done = todayTasks.filter((task) => task.completed);
  const overall = getOverallProgress(tasks);
  const todayOverall = getOverallProgress(todayTasks);

  if (tasks.length === 0) {
    return (
      <section className="tracker-tasks-checklist">
        <h3 className="tracker-section-title">{t('trackerTasksTitle')}</h3>
        <p className="tracker-tasks-empty">{t('trackerTasksEmpty')}</p>
      </section>
    );
  }

  return (
    <section className="tracker-tasks-checklist">
      <div className="tracker-tasks-header">
        <h3 className="tracker-section-title">{t('trackerTasksTitle')}</h3>
        <span className="tracker-tasks-progress">
          {t('tasksCount', { completed: todayOverall.completed, total: todayOverall.total })}
          {todayTasks.length < tasks.length && (
            <span className="tracker-tasks-all">
              {' '}· {t('tasksCount', { completed: overall.completed, total: overall.total })} {t('trackerTasksAll')}
            </span>
          )}
        </span>
      </div>

      {active.length > 0 && (
        <div className="tracker-tasks-group">
          <h4 className="tracker-tasks-subtitle">{t('active')} ({active.length})</h4>
          <ul className="tasks tracker-tasks-list">
            {active.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={onToggle} showDelete={false} />
            ))}
          </ul>
        </div>
      )}

      {done.length > 0 && (
        <div className="tracker-tasks-group">
          <h4 className="tracker-tasks-subtitle">{t('done')} ({done.length})</h4>
          <ul className="tasks tracker-tasks-list">
            {done.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={onToggle} showDelete={false} />
            ))}
          </ul>
        </div>
      )}

      {todayTasks.length === 0 && (
        <p className="tracker-tasks-empty">{t('noTasksThisDay')}</p>
      )}

      <div className="tracker-sphere-mini">
        {CATEGORY_IDS.map((id) => {
          const cat = categories[id];
          const catTasks = todayTasks.filter((task) => task.category === id);
          if (catTasks.length === 0) return null;
          const completed = catTasks.filter((task) => task.completed).length;
          const percent = Math.round((completed / catTasks.length) * 100);
          return (
            <div key={id} className="tracker-sphere-mini-row" style={{ '--cat-color': cat.color }}>
              <CategoryIcon name={id} size={16} />
              <span className="tracker-sphere-mini-label">{cat.label}</span>
              <div className="tracker-sphere-mini-bar">
                <div className="tracker-sphere-mini-fill" style={{ width: `${percent}%` }} />
              </div>
              <span className="tracker-sphere-mini-pct">{percent}%</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
