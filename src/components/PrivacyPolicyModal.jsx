import { useLanguage } from '../i18n/LanguageContext';

export default function PrivacyPolicyModal({ isOpen, onClose }) {
  const { t, lang } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal privacy-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-modal-title"
      >
        <div className="modal-header">
          <h2 id="privacy-modal-title" className="modal-title">
            {t('privacyPolicyTitle') || 'Политика конфиденциальности'}
          </h2>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label={t('close') || 'Закрыть'}
          >
            ×
          </button>
        </div>

        <div className="modal-body privacy-body" style={{ maxHeight: '70vh', overflowY: 'auto', fontSize: '0.9rem', lineHeight: '1.6' }}>
          {lang === 'en' ? (
            <div>
              <p><strong>Last updated: September 2026</strong></p>
              <p>Muzakkir (&quot;the App&quot;) respects your privacy and is committed to protecting your personal data.</p>
              
              <h3>1. Data Storage and Processing</h3>
              <p>All your tasks, habits, tracker history, and preferences are stored strictly locally on your device. We do not operate remote databases that store your personal records.</p>
              
              <h3>2. Location Data</h3>
              <p>The App requests access to your location solely to calculate accurate local prayer times and Qibla direction. Your location is never logged, tracked, or shared with third parties.</p>

              <h3>3. Third-Party Services</h3>
              <p>The App does not include third-party advertising SDKs, analytics tracking (IDFA/ATT), or data brokers.</p>

              <h3>4. Account and Data Deletion</h3>
              <p>You have full control over your data. You can delete your profile and all associated local data at any time via the &quot;Delete Profile&quot; button in the app header.</p>
            </div>
          ) : (
            <div>
              <p><strong>Дата обновления: Сентябрь 2026 г.</strong></p>
              <p>Приложение <strong>Muzakkir</strong> с уважением относится к вашей конфиденциальности и защите личных данных.</p>
              
              <h3 style={{ marginTop: '1rem', color: '#1b4332' }}>1. Хранение и обработка данных</h3>
              <p>Все ваши задачи, привычки, настройки и заметки хранятся <strong>исключительно локально на вашем устройстве</strong>. Приложение не передаёт личные данные на внешние серверы.</p>
              
              <h3 style={{ marginTop: '1rem', color: '#1b4332' }}>2. Данные о местоположении</h3>
              <p>Геолокация запрашивается исключительно для автоматического определения координат и точного расчёта времени намаза. Данные о местоположении не передаются третьим лицам и не сохраняются на сторонних серверах.</p>

              <h3 style={{ marginTop: '1rem', color: '#1b4332' }}>3. Отсутствие трекинга и рекламы</h3>
              <p>В приложении полностью отсутствует сторонняя реклама, рекламные трекеры и межсайтовое отслеживание (ATT / IDFA).</p>

              <h3 style={{ marginTop: '1rem', color: '#1b4332' }}>4. Удаление аккаунта и данных</h3>
              <p>Вы можете в любой момент полностью удалить свой профиль и все сохранённые данные через кнопку «Удалить профиль» в верхней панели приложения.</p>
            </div>
          )}
        </div>

        <div className="modal-footer" style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="button" className="btn btn-primary" onClick={onClose}>
            {t('close') || 'Понятно'}
          </button>
        </div>
      </div>
    </div>
  );
}
