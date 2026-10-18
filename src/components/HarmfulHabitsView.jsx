import { useState, useMemo } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useHabits } from '../hooks/useHabits';
import { resolvePeriodDays } from '../utils/habitProgress';
import PeriodSelector from './habits/PeriodSelector';
import HabitCard from './habits/HabitCard';
import AddHabitForm from './habits/AddHabitForm';
import HabitIcon from './icons/HabitIcon';

export default function HarmfulHabitsView({ userId }) {
  const { t } = useLanguage();
  const { habits, addHabit, deleteHabit, logToday } = useHabits(userId);
  const [periodType, setPeriodType] = useState('7');
  const [customDays, setCustomDays] = useState(60);
  const [showForm, setShowForm] = useState(false);

  const periodDays = useMemo(
    () => resolvePeriodDays(periodType, customDays),
    [periodType, customDays]
  );

  const handleAdd = (data) => {
    addHabit(data);
    setShowForm(false);
  };

  return (
    <div className="habits-view">
      <section className="habits-intro">
        <HabitIcon name="habits" size={32} className="habits-intro-icon" />
        <div>
          <h2 className="habits-intro-title">{t('habitsTitle')}</h2>
          <p className="habits-intro-desc">{t('habitsDescription')}</p>
        </div>
      </section>

      <PeriodSelector
        value={periodType}
        customDays={customDays}
        onChange={setPeriodType}
        onCustomChange={setCustomDays}
      />

      {habits.length === 0 ? (
        <div className="empty-state habits-empty">
          <HabitIcon name="shield" size={48} />
          <h3>{t('noHabits')}</h3>
          <p>{t('noHabitsHint')}</p>
          <button type="button" className="habits-add-btn" onClick={() => setShowForm(true)}>
            {t('addHabit')}
          </button>
        </div>
      ) : (
        <div className="habits-list">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              periodDays={periodDays}
              onLogToday={logToday}
              onDelete={deleteHabit}
            />
          ))}
        </div>
      )}

      <button
        type="button"
        className="fab habit-fab"
        onClick={() => setShowForm(true)}
        aria-label={t('addHabit')}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>

      {showForm && (
        <AddHabitForm
          onSubmit={handleAdd}
          onClose={() => setShowForm(false)}
          defaultPeriod={periodType}
        />
      )}
    </div>
  );
}
