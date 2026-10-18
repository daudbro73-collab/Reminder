import { useLanguage } from '../i18n/LanguageContext';
import { getOverallProgress } from '../hooks/useTasks';
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';
import HijriDateBar from './HijriDateBar';

export default function TasksView({
  tasks,
  onAdd,
  onToggle,
  onDelete,
  showForm,
  onShowForm,
  onCloseForm,
}) {
  const { t } = useLanguage();
  const overall = getOverallProgress(tasks);

  return (
    <main className="main tasks-view">
      <HijriDateBar />

      <div className="tasks-simple-header">
        <h2>{t('myTasks')}</h2>
        {tasks.length > 0 && (
          <span className="tasks-simple-badge">
            {t('tasksCount', { completed: overall.completed, total: overall.total })}
          </span>
        )}
      </div>

      <TaskList
        tasks={tasks}
        onToggle={onToggle}
        onDelete={onDelete}
        showCheckbox
        simple
      />

      <button
        className="fab"
        onClick={() => onShowForm(true)}
        aria-label={t('addCustomTask')}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>

      {showForm && (
        <AddTaskForm onSubmit={onAdd} onClose={onCloseForm} />
      )}
    </main>
  );
}
