import { useState, useMemo } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useHabits } from '../hooks/useHabits';
import { getDailyActivity, getTodayStats, resolvePeriodDays } from '../utils/trackerStats';
import { getHabitProgress } from '../utils/habitProgress';
import { getHabitDisplayTitle } from '../utils/displayLabels';
import { toDateKey } from '../utils/dateUtils';
import TrackerTaskChecklist from './TrackerTaskChecklist';
import PeriodSelector from './habits/PeriodSelector';
import EmojiIcon from './icons/EmojiIcon';

function ActivityBar({ days, locale }) {
  const maxScore = Math.max(...days.map((d) => d.score), 1);

  return (
    <div className="tracker-activity">
      <div className="tracker-activity-bars">
        {days.map((day) => {
          const height = Math.max((day.score / maxScore) * 100, day.score > 0 ? 8 : 4);
          const label = new Date(day.date + 'T00:00:00').toLocaleDateString(locale, {
            weekday: 'short',
            day: 'numeric',
          });
          const isToday = day.date === toDateKey();

          return (
            <div key={day.date} className={`tracker-activity-col ${isToday ? 'today' : ''}`}>
              <div className="tracker-activity-bar-wrap">
                <div
                  className="tracker-activity-bar"
                  style={{ height: `${height}%` }}
                  title={`${day.tasksDone} tasks · ${day.habitClean} clean`}
                />
              </div>
              <span className="tracker-activity-label">{label}</span>
              {day.score > 0 && (
                <span className="tracker-activity-score">{day.score}</span>
              )}
            </div>
          );
        })}
      </div>
      <div className="tracker-activity-legend">
        <span>📋 {days.reduce((s, d) => s + d.tasksDone, 0)}</span>
        <span>✅ {days.reduce((s, d) => s + d.habitClean, 0)}</span>
        <span>❌ {days.reduce((s, d) => s + d.habitRelapse, 0)}</span>
      </div>
    </div>
  );
}

export default function TrackerView({ tasks, userId, onToggleTask }) {
  const { t, locale } = useLanguage();
  const { habits } = useHabits(userId);
  const [periodType, setPeriodType] = useState('7');
  const [customDays, setCustomDays] = useState(60);

  const periodDays = useMemo(
    () => resolvePeriodDays(periodType, customDays),
    [periodType, customDays]
  );

  const today = getTodayStats(tasks, habits, periodDays);
  const activity = getDailyActivity(tasks, habits, periodDays);

  return (
    <div className="tracker-view">
      <section className="tracker-hero">
        <EmojiIcon name="tracker" size={40} className="tracker-hero-icon" />
        <div>
          <h2 className="tracker-hero-title">{t('trackerTitle')}</h2>
          <p className="tracker-hero-desc">{t('trackerSubtitle')}</p>
        </div>
        <div className="tracker-hero-score">
          <span className="tracker-hero-percent">{today.combined}%</span>
          <span className="tracker-hero-label">{t('overallBalance')}</span>
        </div>
      </section>

      <PeriodSelector
        value={periodType}
        customDays={customDays}
        onChange={setPeriodType}
        onCustomChange={setCustomDays}
      />

      <section className="tracker-today">
        <h3 className="tracker-section-title">{t('todayProgress')}</h3>
        <div className="tracker-today-grid">
          <div className="tracker-stat-card">
            <span className="tracker-stat-emoji">📋</span>
            <div className="tracker-stat-body">
              <span className="tracker-stat-value">{today.tasksDoneToday}</span>
              <span className="tracker-stat-label">{t('tasksDoneToday')}</span>
              <span className="tracker-stat-sub">
                {today.tasksDoneTotal}/{today.tasksTotal}
              </span>
            </div>
          </div>
          <div className="tracker-stat-card">
            <span className="tracker-stat-emoji">✅</span>
            <div className="tracker-stat-body">
              <span className="tracker-stat-value">{today.habitsCleanToday}</span>
              <span className="tracker-stat-label">{t('habitsCleanToday')}</span>
              <span className="tracker-stat-sub">
                {today.habitsTracked} {t('habitsTotal')}
              </span>
            </div>
          </div>
          <div className="tracker-stat-card">
            <span className="tracker-stat-emoji">🔥</span>
            <div className="tracker-stat-body">
              <span className="tracker-stat-value">
                {habits.length > 0
                  ? Math.max(...habits.map((h) => getHabitProgress(h, periodDays).currentStreak), 0)
                  : 0}
              </span>
              <span className="tracker-stat-label">{t('bestStreak')}</span>
            </div>
          </div>
        </div>
      </section>

      <TrackerTaskChecklist tasks={tasks} onToggle={onToggleTask} />

      <section className="tracker-activity-section">
        <h3 className="tracker-section-title">{t('activityChart')}</h3>
        <ActivityBar days={activity} locale={locale} />
      </section>

      {habits.length > 0 && (
        <section className="tracker-habits-section">
          <h3 className="tracker-section-title">{t('habitsProgress')}</h3>
          <div className="tracker-habits-list">
            {habits.map((habit) => {
              const p = getHabitProgress(habit, periodDays);
              return (
                <div key={habit.id} className="tracker-habit-row">
                  <span className="tracker-habit-name">{getHabitDisplayTitle(habit, t)}</span>
                  <div className="tracker-habit-bar-track">
                    <div
                      className="tracker-habit-bar-fill"
                      style={{ width: `${p.successRate}%` }}
                    />
                  </div>
                  <span className="tracker-habit-pct">{p.successRate}%</span>
                  <span className="tracker-habit-streak">🔥 {p.currentStreak}</span>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
