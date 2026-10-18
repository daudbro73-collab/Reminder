import { useLanguage } from '../i18n/LanguageContext';
import { requestNotificationPermission } from '../hooks/useNotifications';
import EmojiIcon from './icons/EmojiIcon';

export default function TaskNotificationsPanel({ settings, updateSettings }) {
  const { t } = useLanguage();

  const handleEnable = async () => {
    await requestNotificationPermission();
    updateSettings({ taskNotifications: true });
  };

  const handleDisable = () => {
    updateSettings({ taskNotifications: false });
  };

  return (
    <section className="task-notif-card morning-reminder-card">
      <div className="morning-reminder-header">
        <EmojiIcon name="bell" size={24} />
        <div>
          <h3>{t('taskNotifSectionTitle')}</h3>
          <p>{t('taskNotifSectionDesc')}</p>
        </div>
      </div>

      <div className="morning-reminder-controls">
        {settings.taskNotifications ? (
          <>
            <p className="morning-active">✓ {t('taskNotifActive')}</p>
            <button type="button" className="muzakkir-disable-btn" onClick={handleDisable}>
              {t('taskNotifDisable')}
            </button>
          </>
        ) : (
          <button type="button" className="morning-enable-btn" onClick={handleEnable}>
            {t('enableTaskNotif')}
          </button>
        )}
      </div>
    </section>
  );
}
