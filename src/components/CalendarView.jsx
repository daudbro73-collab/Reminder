import { useState, useMemo } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useHabits } from '../hooks/useHabits';
import { useCategories } from '../hooks/useCategories';
import { toDateKey, getMonthGrid } from '../utils/dateUtils';
import {
  getTasksForDate,
  getHabitsForDate,
  getDaySummary,
} from '../utils/dailyChecklist';
import { getTaskStatus } from '../hooks/useTasks';
import { getTaskDisplayTitle, getHabitDisplayTitle } from '../utils/displayLabels';
import MuzakkirPanel from './MuzakkirPanel';
import CategoryIcon from './icons/CategoryIcon';
import EmojiIcon from './icons/EmojiIcon';

const WEEKDAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

function DayChecklist({ dateKey, tasks, habits, onToggleTask, onLogHabit }) {
  const { t } = useLanguage();
  const categories = useCategories();
  const today = toDateKey();
  const isToday = dateKey === today;

  const dayTasks = getTasksForDate(tasks, dateKey);
  const active = dayTasks.filter((task) => !task.completed);
  const done = dayTasks.filter((task) => task.completed);
  const habitEntries = getHabitsForDate(habits, dateKey);

  const catMap = Object.fromEntries(categories.map((c) => [c.id, c]));

  if (dayTasks.length === 0 && habitEntries.length === 0) {
    return (
      <div className="calendar-day-empty">
        <EmojiIcon name="calendar" size={32} />
        <p>{t('noTasksThisDay')}</p>
      </div>
    );
  }

  return (
    <div className="day-checklist">
      {active.length > 0 && (
        <section>
          <h4 className="checklist-section-title">
            {isToday ? t('todayChecklist') : t('active')} ({active.length})
          </h4>
          <ul className="checklist-items">
            {active.map((task) => {
              const cat = catMap[task.category];
              const status = getTaskStatus(task);
              return (
                <li key={task.id} className={`checklist-item ${status}`}>
                  {isToday && (
                    <button
                      type="button"
                      className="checklist-check"
                      onClick={() => onToggleTask(task.id)}
                      aria-label={t('markDone')}
                    />
                  )}
                  <span className="checklist-item-text">{getTaskDisplayTitle(task, t)}</span>
                  <span className="checklist-item-cat" style={{ color: cat?.color }}>
                    {cat && <CategoryIcon name={cat.id} size={14} />}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {habitEntries.length > 0 && isToday && (
        <section>
          <h4 className="checklist-section-title">{t('checklistHabits')}</h4>
          <ul className="checklist-items">
            {habitEntries.map(({ habit, status }) => (
              <li key={habit.id} className={`checklist-item habit ${status || 'pending'}`}>
                <button
                  type="button"
                  className={`checklist-check habit-check ${status === 'clean' ? 'done' : ''}`}
                  onClick={() => onLogHabit(habit.id, status === 'clean' ? null : 'clean')}
                />
                <span className="checklist-item-text">{getHabitDisplayTitle(habit, t)}</span>
                {status === 'relapse' && (
                  <span className="checklist-badge relapse">{t('relapseDay')}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {done.length > 0 && (
        <section>
          <h4 className="checklist-section-title">{t('done')} ({done.length})</h4>
          <ul className="checklist-items done-list">
            {done.map((task) => (
              <li key={task.id} className="checklist-item done">
                <span className="checklist-check done">✓</span>
                <span className="checklist-item-text">{getTaskDisplayTitle(task, t)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default function CalendarView({ tasks, settings, updateSettings, onToggleTask, userId }) {
  const { t, locale } = useLanguage();
  const { habits, logToday } = useHabits(userId);
  const now = new Date();
  const [viewDate, setViewDate] = useState({ year: now.getFullYear(), month: now.getMonth() });
  const [selectedDate, setSelectedDate] = useState(toDateKey());

  const cells = useMemo(
    () => getMonthGrid(viewDate.year, viewDate.month),
    [viewDate.year, viewDate.month]
  );

  const monthLabel = new Date(viewDate.year, viewDate.month, 1).toLocaleDateString(locale, {
    month: 'long',
    year: 'numeric',
  });

  const prevMonth = () => {
    setViewDate((d) => {
      const m = d.month - 1;
      return m < 0 ? { year: d.year - 1, month: 11 } : { year: d.year, month: m };
    });
  };

  const nextMonth = () => {
    setViewDate((d) => {
      const m = d.month + 1;
      return m > 11 ? { year: d.year + 1, month: 0 } : { year: d.year, month: m };
    });
  };

  return (
    <div className="calendar-view">
      <MuzakkirPanel
        settings={settings}
        updateSettings={updateSettings}
        tasks={tasks}
        habits={habits}
        userId={userId}
      />

      <section className="calendar-section">
        <div className="calendar-header">
          <button type="button" className="calendar-nav-btn" onClick={prevMonth} aria-label={t('prevMonth')}>
            ‹
          </button>
          <h2 className="calendar-month">{monthLabel}</h2>
          <button type="button" className="calendar-nav-btn" onClick={nextMonth} aria-label={t('nextMonth')}>
            ›
          </button>
        </div>

        <div className="calendar-weekdays">
          {WEEKDAYS.map((wd) => (
            <span key={wd} className="calendar-weekday">{t(`weekday_${wd}`)}</span>
          ))}
        </div>

        <div className="calendar-grid">
          {cells.map((cell, i) => {
            if (!cell) return <div key={`empty-${i}`} className="calendar-cell empty" />;
            const summary = getDaySummary(tasks, habits, cell.dateKey);
            const isToday = cell.dateKey === toDateKey();
            const isSelected = cell.dateKey === selectedDate;

            return (
              <button
                key={cell.dateKey}
                type="button"
                className={`calendar-cell ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${summary.hasActivity ? 'has-data' : ''}`}
                onClick={() => setSelectedDate(cell.dateKey)}
              >
                <span className="calendar-day-num">{cell.day}</span>
                {summary.hasActivity && (
                  <span className="calendar-dots">
                    {summary.tasksActive > 0 && <span className="dot active" />}
                    {summary.tasksDone > 0 && <span className="dot done" />}
                    {summary.habitsClean > 0 && <span className="dot habit" />}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <section className="calendar-day-panel">
        <h3 className="calendar-day-title">
          {new Date(selectedDate + 'T00:00:00').toLocaleDateString(locale, {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
        </h3>
        <DayChecklist
          dateKey={selectedDate}
          tasks={tasks}
          habits={habits}
          onToggleTask={onToggleTask}
          onLogHabit={logToday}
        />
      </section>
    </div>
  );
}
