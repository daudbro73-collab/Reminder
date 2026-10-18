import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../hooks/useAuth';
import LanguageSwitcher from './LanguageSwitcher';
import PrivacyPolicyModal from './PrivacyPolicyModal';

export default function LoginScreen() {
  const { t } = useLanguage();
  const { login, loginAsGuest } = useAuth();
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError(t('authNameRequired'));
      return;
    }
    if (!/^\d{4,6}$/.test(pin)) {
      setError(t('authPinInvalid'));
      return;
    }

    setLoading(true);
    try {
      await login(name, pin);
    } catch (err) {
      const key = err.message;
      if (key === 'pin_wrong') setError(t('authPinWrong'));
      else if (key === 'pin_invalid') setError(t('authPinInvalid'));
      else setError(t('authError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-top">
          <LanguageSwitcher />
        </div>
        <p className="bismillah login-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
        <h1 className="login-title">{t('appTitle')}</h1>
        <p className="login-subtitle">{t('authSubtitle')}</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-field">
            <span>{t('authNameLabel')}</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('authNamePlaceholder')}
              autoComplete="username"
              maxLength={40}
            />
          </label>

          <label className="login-field">
            <span>{t('authPinLabel')}</span>
            <input
              type="password"
              inputMode="numeric"
              pattern="\d{4,6}"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="••••"
              autoComplete="current-password"
              maxLength={6}
            />
          </label>

          <p className="login-hint">{t('authHint')}</p>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? '...' : t('authEnter')}
          </button>

          <div style={{ margin: '0.75rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9ca3af', fontSize: '0.75rem' }}>
            <span style={{ flex: 1, height: '1px', background: 'currentColor', opacity: 0.3 }}></span>
            <span>или</span>
            <span style={{ flex: 1, height: '1px', background: 'currentColor', opacity: 0.3 }}></span>
          </div>

          <button
            type="button"
            className="login-guest-btn"
            style={{
              width: '100%',
              padding: '0.7rem',
              borderRadius: '8px',
              border: '1px solid rgba(27, 67, 50, 0.25)',
              background: 'rgba(27, 67, 50, 0.05)',
              color: '#1b4332',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.88rem',
            }}
            onClick={() => loginAsGuest(t('authGuestName'))}
          >
            {t('authGuest')}
          </button>
        </form>

        <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
          <button
            type="button"
            onClick={() => setShowPrivacy(true)}
            style={{
              background: 'none',
              border: 'none',
              color: '#6b7280',
              fontSize: '0.75rem',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            {t('privacyPolicy')}
          </button>
        </div>
      </div>

      <PrivacyPolicyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
    </div>
  );
}
