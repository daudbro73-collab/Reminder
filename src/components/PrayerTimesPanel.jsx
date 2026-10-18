import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import { requestNotificationPermission } from '../hooks/useNotifications';
import { formatCountdown } from '../utils/prayerFormat';
import { PRAYER_KEYS } from '../hooks/usePrayerTimes';
import { LOCATION_ERROR, requestCurrentPosition } from '../utils/geolocation';
import PresetIcon from './icons/PresetIcon';

const PRAYER_ICONS = {
  fajr: 'fajr',
  dhuhr: 'dhuhr',
  asr: 'asr',
  maghrib: 'maghrib',
  isha: 'isha',
};

const DEFAULT_OFFSETS = {
  Fajr: 0,
  Dhuhr: 0,
  Asr: 0,
  Maghrib: 0,
  Isha: 0,
};

function OffsetControl({ prayerKey, value, rawTime, adjustedTime, onChange, label }) {
  const step = (delta) => {
    const next = Math.max(-30, Math.min(30, (value || 0) + delta));
    onChange(prayerKey, next);
  };

  return (
    <div className="offset-row">
      <span className="offset-label">{label}</span>
      <span className="offset-raw">{rawTime}</span>
      <div className="offset-controls">
        <button type="button" className="offset-btn" onClick={() => step(-1)}>−</button>
        <span className="offset-value">{value > 0 ? `+${value}` : value}</span>
        <button type="button" className="offset-btn" onClick={() => step(1)}>+</button>
      </div>
      <span className="offset-result">{adjustedTime}</span>
    </div>
  );
}

export default function PrayerTimesPanel({ settings, updateSettings }) {
  const { t } = useLanguage();
  const { prayerList, next, countdown, meta, rawTimings, loading, error, refetch } =
    usePrayerTimes(settings);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [showOffsets, setShowOffsets] = useState(false);

  const offsets = { ...DEFAULT_OFFSETS, ...settings.prayerOffsets };

  const detectLocation = async () => {
    setLocationError(null);
    setLocating(true);
    try {
      const { latitude, longitude } = await requestCurrentPosition();
      updateSettings({
        latitude,
        longitude,
        city: '',
        country: '',
      });
    } catch (err) {
      const code = err?.message;
      const known = Object.values(LOCATION_ERROR);
      setLocationError(known.includes(code) ? code : LOCATION_ERROR.UNAVAILABLE);
    } finally {
      setLocating(false);
    }
  };

  const handleEnableNotif = async () => {
    await requestNotificationPermission();
    updateSettings({ prayerNotifications: true });
  };

  const updateOffset = (key, value) => {
    updateSettings({
      prayerOffsets: { ...offsets, [key]: value },
    });
  };

  const nextLabel = next ? t(`prayers.${next.labelKey}`) : null;

  return (
    <section className="prayer-panel">
      <div className="prayer-panel-header">
        <h2 className="prayer-panel-title">{t('prayerTimes')}</h2>
        {meta?.city && (
          <span className="prayer-location-badge">
            📍 {meta.city}{meta.country ? `, ${meta.country}` : ''}
          </span>
        )}
      </div>

      {next && countdown > 0 && (
        <div className="prayer-countdown-card">
          <div className="prayer-countdown-label">
            {next.isTomorrow ? t('nextPrayerTomorrow') : t('timeUntilNext')}
          </div>
          <div className="prayer-countdown-prayer">
            <PresetIcon name={PRAYER_ICONS[next.labelKey]} size={28} />
            <span>{nextLabel}</span>
            <span className="prayer-countdown-time">{next.time}</span>
          </div>
          <div className="prayer-countdown-timer">
            {formatCountdown(countdown, t)}
          </div>
        </div>
      )}

      <div className="prayer-location">
        <input
          type="text"
          placeholder={t('cityPlaceholder')}
          value={settings.city}
          onChange={(e) =>
            updateSettings({ city: e.target.value, latitude: null, longitude: null })
          }
          className="prayer-input"
        />
        <input
          type="text"
          placeholder={t('countryPlaceholder')}
          value={settings.country}
          onChange={(e) =>
            updateSettings({ country: e.target.value, latitude: null, longitude: null })
          }
          className="prayer-input"
        />
        <button
          type="button"
          className="prayer-locate-btn"
          onClick={detectLocation}
          disabled={locating}
        >
          {locating ? '...' : t('useLocation')}
        </button>
        {(settings.city || settings.latitude) && (
          <button type="button" className="prayer-refresh-btn" onClick={refetch}>
            ↻
          </button>
        )}
      </div>

      {loading && <p className="prayer-status">{t('loading')}</p>}
      {locationError && (
        <p className="prayer-status error">
          {t(
            {
              [LOCATION_ERROR.DENIED]: 'locationErrorDenied',
              [LOCATION_ERROR.TIMEOUT]: 'locationErrorTimeout',
              [LOCATION_ERROR.UNAVAILABLE]: 'locationErrorUnavailable',
              [LOCATION_ERROR.UNSUPPORTED]: 'locationErrorUnsupported',
            }[locationError] || 'locationErrorUnavailable'
          )}
        </p>
      )}
      {error && <p className="prayer-status error">{t('prayerError')}</p>}

      {prayerList.length > 0 && (
        <div className="prayer-times-grid">
          {prayerList.map((p) => (
            <div
              key={p.key}
              className={`prayer-time-card ${next?.key === p.key ? 'next' : ''}`}
            >
              <PresetIcon name={PRAYER_ICONS[p.labelKey]} size={22} />
              <span className="prayer-name">{t(`prayers.${p.labelKey}`)}</span>
              <span className="prayer-time">{p.time}</span>
              {p.offset !== 0 && (
                <span className="prayer-offset-badge">
                  {p.offset > 0 ? '+' : ''}{p.offset} {t('minutesShort')}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {prayerList.length > 0 && (
        <div className="prayer-offsets-section">
          <button
            type="button"
            className="prayer-offsets-toggle"
            onClick={() => setShowOffsets(!showOffsets)}
          >
            ⚙️ {t('timeAdjustment')} {showOffsets ? '▲' : '▼'}
          </button>
          {showOffsets && rawTimings && (
            <div className="prayer-offsets-list">
              <p className="prayer-offsets-hint">{t('timeAdjustmentHint')}</p>
              {PRAYER_KEYS.map((key) => (
                <OffsetControl
                  key={key}
                  prayerKey={key}
                  value={offsets[key]}
                  rawTime={rawTimings[key]}
                  adjustedTime={prayerList.find((p) => p.key === key)?.time}
                  onChange={updateOffset}
                  label={t(`prayers.${key.toLowerCase()}`)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {!settings.prayerNotifications && (
        <button type="button" className="notif-enable-btn" onClick={handleEnableNotif}>
          {t('enablePrayerNotif')}
        </button>
      )}
      {settings.prayerNotifications && (
        <div className="morning-reminder-controls">
          <p className="notif-active">✓ {t('prayerNotifActive')}</p>
          <button
            type="button"
            className="muzakkir-disable-btn"
            onClick={() => updateSettings({ prayerNotifications: false })}
          >
            {t('prayerNotifDisable')}
          </button>
        </div>
      )}
    </section>
  );
}
