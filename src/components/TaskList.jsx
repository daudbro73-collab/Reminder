import { useLanguage } from '../i18n/LanguageContext';
import { useCategoryMap } from '../hooks/useCategories';
import { getTaskStatus } from '../hooks/useTasks';
import { getPresetIcon } from '../utils/presetUtils';
import { getTaskDisplayTitle } from '../utils/displayLabels';
import CategoryIcon from './icons/CategoryIcon';
import PresetIcon from './icons/PresetIcon';

function TaskItem({ task, onToggle, onDelete, showDelete = true, showCheckbox = true, simple = false }) {
  const { t, locale } = useLanguage();
  const categories = useCategoryMap();
  const cat = categories[task.category] || categories.spiritual;
  const status = getTaskStatus(task);
  const presetIcon = !simple && task.presetId ? getPresetIcon(task.category, task.presetId) : null;

  function formatDeadline(dateStr) {
    if (!dateStr) return null;
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'short',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
    });
  }

  function statusLabel(s) {
    switch (s) {
      case 'overdue': return t('overdue');
      case 'today': return t('today');
      case 'completed': return t('completedStatus');
      default: return null;
    }
  }

  return (
    <li className={`task-item ${status} ${task.completed ? 'done' : ''} ${!showCheckbox ? 'no-checkbox' : ''} ${simple ? 'task-item-simple' : ''}`}>
      {showCheckbox && (
        <button
          className="task-checkbox"
          onClick={() => onToggle(task.id)}
          aria-label={task.completed ? t('uncheck') : t('markDone')}
          style={{ '--check-color': simple ? 'var(--accent, #2d6a4f)' : cat.color }}
        >
          {task.completed && (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </button>
      )}

      {!simple && (
        presetIcon ? (
          <span className="task-preset-icon" style={{ color: cat.color, background: cat.lightColor }}>
            <PresetIcon name={presetIcon} size={20} />
          </span>
        ) : (
          <span className="task-preset-icon" style={{ color: cat.color, background: cat.lightColor }}>
            <CategoryIcon name={task.category} size={20} />
          </span>
        )
      )}

      <div className="task-body">
        <div className="task-header">
          <span className="task-title">{getTaskDisplayTitle(task, t)}</span>
          {!simple && (
            <span className="task-category-badge" style={{ background: cat.lightColor, color: cat.color }}>
              <CategoryIcon name={task.category} size={12} />
              {cat.label}
            </span>
          )}
        </div>
        {task.note && <p className="task-note">{task.note}</p>}
        {!simple && (
          <div className="task-meta">
            {task.deadline && (
              <span className={`task-deadline ${status}`}>
                <PresetIcon name="calendar" size={14} />
                {formatDeadline(task.deadline)}
                {statusLabel(status) && (
                  <span className="status-tag">{statusLabel(status)}</span>
                )}
              </span>
            )}
          </div>
        )}
      </div>
      {showDelete && (
        <button
          className="task-delete"
          onClick={() => onDelete(task.id)}
          aria-label={t('delete')}
        >
          ×
        </button>
      )}
    </li>
  );
}

export { TaskItem };

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  activeCategory,
  showCheckbox = false,
  simple = false,
}) {
  const { t } = useLanguage();
  const categories = useCategoryMap();

  const active = tasks.filter((task) => !task.completed);
  const done = tasks.filter((task) => task.completed);

  if (tasks.length === 0) {
    const cat = !simple && activeCategory && activeCategory !== 'all'
      ? categories[activeCategory]
      : null;
    return (
      <div className="empty-state">
        <span className="empty-icon">
          {cat ? <CategoryIcon name={cat.id} size={48} /> : <CategoryIcon name="spiritual" size={48} />}
        </span>
        <h3>{t('noReminders')}</h3>
        <p>
          {cat
            ? t('addFirstInCategory', { category: cat.label })
            : t('pressToAdd')}
        </p>
      </div>
    );
  }

  return (
    <div className={`task-list ${simple ? 'task-list-simple' : ''}`}>
      {active.length > 0 && (
        <section>
          {!simple && <h3 className="task-section-title">{t('active')} ({active.length})</h3>}
          <ul className="tasks">
            {active.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                showCheckbox={showCheckbox}
                simple={simple}
              />
            ))}
          </ul>
        </section>
      )}
      {done.length > 0 && (
        <section>
          <h3 className="task-section-title">{t('done')} ({done.length})</h3>
          <ul className="tasks">
            {done.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                showCheckbox={showCheckbox}
                simple={simple}
              />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
