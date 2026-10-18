import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../hooks/useAuth';
import LanguageSwitcher from './LanguageSwitcher';
import PrivacyPolicyModal from './PrivacyPolicyModal';
import NavIcon from './icons/NavIcon';

export default function ProfileView({ userName, onLogout }) {
  const { t } = useLanguage();
  const { deleteAccount } = useAuth();
  const [showPrivacy, setShowPrivacy] = useState(false);

  const handleDeleteProfile = () => {
    if (window.confirm(t('deleteProfileConfirm'))) {
      deleteAccount();
    }
  };

  return (
    <main className="main profile-view">
      <header className="profile-header">
        <NavIcon name="profile" size={32} />
        <div>
          <h2>{t('navProfile')}</h2>
          <p>{t('profileDesc')}</p>
        </div>
      </header>

      <section className="profile-card">
        <h3>{t('profileAccount')}</h3>
        {userName && <p className="profile-user-name">{userName}</p>}
        <div className="profile-actions">
          {onLogout && (
            <button type="button" className="profile-btn" onClick={onLogout}>
              {t('logout')}
            </button>
          )}
          <button type="button" className="profile-btn danger" onClick={handleDeleteProfile}>
            {t('deleteProfile')}
          </button>
        </div>
      </section>

      <section className="profile-card">
        <h3>{t('language')}</h3>
        <LanguageSwitcher />
      </section>

      <section className="profile-card">
        <h3>{t('privacyPolicy')}</h3>
        <button type="button" className="profile-btn" onClick={() => setShowPrivacy(true)}>
          {t('privacyPolicy')}
        </button>
      </section>

      <PrivacyPolicyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
    </main>
  );
}
