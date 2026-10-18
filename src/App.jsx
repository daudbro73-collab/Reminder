import { useState } from 'react';
import { useTasks, getOverallProgress } from './hooks/useTasks';
import { useHabits } from './hooks/useHabits';
import { useSettings } from './hooks/useSettings';
import { useNotifications } from './hooks/useNotifications';
import { useAuth } from './hooks/useAuth';
import { useLanguage } from './i18n/LanguageContext';
import Header from './components/Header';
import MainNav from './components/MainNav';
import TasksView from './components/TasksView';
import TrackerView from './components/TrackerView';
import CalendarView from './components/CalendarView';
import QuranView from './components/QuranView';
import ProfileView from './components/ProfileView';
import LoginScreen from './components/LoginScreen';

export default function App() {
  const { user, logout } = useAuth();

  if (!user) {
    return <LoginScreen />;
  }

  return <AppContent user={user} onLogout={logout} />;
}

function AppContent({ user, onLogout }) {
  const { t, lang } = useLanguage();
  const { tasks, addTask, toggleTask, deleteTask } = useTasks(user.id);
  const { habits } = useHabits(user.id);
  const { settings, updateSettings, markNotified } = useSettings(user.id);
  const [mainView, setMainView] = useState('tasks');
  const [showForm, setShowForm] = useState(false);

  useNotifications(settings, updateSettings, t, tasks, habits, lang, user.id, markNotified);

  const overall = getOverallProgress(tasks);

  const handleAdd = (data) => {
    addTask(data);
    setShowForm(false);
  };

  const showHeaderStat = mainView === 'tasks' || mainView === 'tracker';

  return (
    <div className="app">
      <Header overall={overall} showStat={showHeaderStat} />

      <div className="app-content">
        {mainView === 'tasks' && (
          <TasksView
            tasks={tasks}
            onAdd={handleAdd}
            onToggle={toggleTask}
            onDelete={deleteTask}
            showForm={showForm}
            onShowForm={setShowForm}
            onCloseForm={() => setShowForm(false)}
          />
        )}

        {mainView === 'tracker' && (
          <main className="main">
            <TrackerView tasks={tasks} userId={user.id} onToggleTask={toggleTask} />
          </main>
        )}

        {mainView === 'calendar' && (
          <main className="main">
            <CalendarView
              tasks={tasks}
              settings={settings}
              updateSettings={updateSettings}
              onToggleTask={toggleTask}
              userId={user.id}
            />
          </main>
        )}

        {mainView === 'quran' && (
          <main className="main">
            <QuranView />
          </main>
        )}

        {mainView === 'profile' && (
          <ProfileView userName={user.name} onLogout={onLogout} />
        )}
      </div>

      <MainNav active={mainView} onChange={setMainView} />
    </div>
  );
}
