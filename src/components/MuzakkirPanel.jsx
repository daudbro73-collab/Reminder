import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { requestNotificationPermission } from '../hooks/useNotifications';
import {
  MUZAKKIR_SLOTS,
  MUZAKKIR_DEFAULT_TIMES,
  MUZAKKIR_DEFAULT_SLOTS,
  getActiveMuzakkirSlots,
} from '../constants/muzakkirMessages';
import { syncMuzakkirNotifications } from '../utils/muzakkirNotificationSync';
import { isNativeApp } from '../native.js';
import { syncWebPushProfile } from '../utils/webPushSubscribe.js';
import { openExactAlarmSettings, ensureExactAlarmPermission, ensureExactAlarmForSchedule } from '../utils/nativeNotificationHelper.js';
import EmojiIcon from './icons/EmojiIcon';

const SLOT_ICONS = {
  morning: 'sunrise',
  noon: 'sun',
  evening: 'moon',
};

const SLOT_LABEL_KEYS = {
  morning: 'muzakkirMorning',
  noon: 'muzakkirNoon',
  evening: 'muzakkirEvening',
};

export default function MuzakkirPanel({
  settings,
  updateSettings,
  tasks = [],
  habits = [],
  userId = null,
}) {
  const { t, lang } = useLanguage();
  const times = { ...MUZAKKIR_DEFAULT_TIMES, ...settings.muzakkirTimes };
  const slots = { ...MUZAKKIR_DEFAULT_SLOTS, ...settings.muzakkirSlots };
  const activeCount = getActiveMuzakkirSlots(settings).length;
  const [notifHint, setNotifHint] = useState(null);
  const [exactAlarmNeeded, setExactAlarmNeeded] = useState(false);

  const scheduleMuzakkir = async (nextSettings = settings) => {
    if (!nextSettings.muzakkirEnabled) return true;
    const nativeOk = await syncMuzakkirNotifications({
      settings: nextSettings,
      lang,
      tasks,
      habits,
      t,
    });
    if (!isNativeApp() && userId) {
      await syncWebPushProfile({
        userId,
        settings: nextSettings,
        tasks,
        habits,
        prayerList: [],
        lang,
      });
    }
    return isNativeApp() ? nativeOk : true;
  };

  useEffect(() => {
    if (!settings.muzakkirEnabled) return;
    scheduleMuzakkir();
  }, [
    settings.muzakkirEnabled,
    settings.muzakkirTimes,
    settings.muzakkirSlots,
    settings.muzakkirMorningChecklist,
    lang,
    tasks,
    habits,
  ]);

  useEffect(() => {
    if (!isNativeApp() || !settings.muzakkirEnabled) {
      setExactAlarmNeeded(false);
      return;
    }
    ensureExactAlarmPermission().then((ok) => setExactAlarmNeeded(!ok));
  }, [settings.muzakkirEnabled]);

  const handleEnable = async () => {
    if (activeCount === 0) return;
    setNotifHint(null);

    const next = { ...settings, muzakkirEnabled: true, morningReminder: false };
    updateSettings({ muzakkirEnabled: true, morningReminder: false });

    await requestNotificationPermission();
    await ensureExactAlarmForSchedule();

    const ok = await scheduleMuzakkir(next);
    if (!ok) {
      setNotifHint(t('notifScheduleFailed'));
    }
  };

  const handleDisable = async () => {
    setNotifHint(null);
    updateSettings({ muzakkirEnabled: false });
    await syncMuzakkirNotifications({
      settings: { ...settings, muzakkirEnabled: false },
      lang,
      tasks,
      habits,
      t,
    });
  };

  const setTime = (slot, value) => {
    updateSettings({
      muzakkirTimes: { ...times, [slot]: value },
    });
  };

  const toggleSlot = (slot, checked) => {
    updateSettings({
      muzakkirSlots: { ...slots, [slot]: checked },
    });
  };

  return (
    <section className="muzakkir-card morning-reminder-card">
      <div className="morning-reminder-header muzakkir-header">
        <EmojiIcon name="bell" size={28} />
        <div>
          <h3>{t('muzakkirTitle')}</h3>
          <p>{t('muzakkirDesc')}</p>
        </div>
      </div>

      <div className="muzakkir-times">
        {MUZAKKIR_SLOTS.map((slot) => (
          <div key={slot} className={`muzakkir-time-row ${slots[slot] ? 'enabled' : ''}`}>
            <label className="muzakkir-slot-check">
              <input
                type="checkbox"
                checked={slots[slot] !== false}
                onChange={(e) => toggleSlot(slot, e.target.checked)}
              />
              <span className="muzakkir-time-label">
                <EmojiIcon name={SLOT_ICONS[slot]} size={18} />
                {t(SLOT_LABEL_KEYS[slot])}
              </span>
            </label>
            <input
              type="time"
              className="morning-time-input"
              value={times[slot]}
              onChange={(e) => setTime(slot, e.target.value)}
              disabled={!slots[slot]}
              aria-label={t(SLOT_LABEL_KEYS[slot])}
            />
          </div>
        ))}
      </div>

      {slots.morning && (
        <label className="muzakkir-checklist-toggle">
          <input
            type="checkbox"
            checked={settings.muzakkirMorningChecklist !== false}
            onChange={(e) => updateSettings({ muzakkirMorningChecklist: e.target.checked })}
          />
          <span>{t('muzakkirMorningChecklist')}</span>
        </label>
      )}

      <div className="morning-reminder-controls">
        {notifHint && <p className="prayer-status error">{notifHint}</p>}
        {exactAlarmNeeded && settings.muzakkirEnabled && (
          <p className="prayer-status">
            {t('exactAlarmHint')}{' '}
            <button type="button" className="link-btn" onClick={() => openExactAlarmSettings()}>
              {t('exactAlarmOpenSettings')}
            </button>
          </p>
        )}
        {settings.muzakkirEnabled ? (
          <>
            <p className="morning-active">✓ {t('muzakkirActive', { count: activeCount })}</p>
            <button type="button" className="muzakkir-disable-btn" onClick={handleDisable}>
              {t('muzakkirDisable')}
            </button>
          </>
        ) : (
          <>
            {activeCount === 0 && (
              <p className="muzakkir-pick-slot">{t('muzakkirPickSlot')}</p>
            )}
            <button
              type="button"
              className="morning-enable-btn"
              onClick={handleEnable}
              disabled={activeCount === 0}
            >
              {t('enableMuzakkir')}
            </button>
          </>
        )}
      </div>
    </section>
  );
}
