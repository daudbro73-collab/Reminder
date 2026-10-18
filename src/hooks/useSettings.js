import { useState, useEffect, useCallback, useRef } from 'react';
import { toDateKey } from '../utils/dateUtils';
import { loadObject, saveJson } from '../utils/userStorage';
import { MUZAKKIR_DEFAULT_TIMES, MUZAKKIR_DEFAULT_SLOTS } from '../constants/muzakkirMessages.js';

const STORAGE_BASE = 'reminder-settings';

const DEFAULT = {
  city: '',
  country: '',
  latitude: null,
  longitude: null,
  prayerNotifications: false,
  taskNotifications: false,
  morningReminder: false,
  morningReminderTime: '07:00',
  muzakkirEnabled: false,
  muzakkirTimes: { ...MUZAKKIR_DEFAULT_TIMES },
  muzakkirSlots: { ...MUZAKKIR_DEFAULT_SLOTS },
  muzakkirMorningChecklist: true,
  prayerMethod: 2,
  prayerOffsets: {
    Fajr: 0,
    Dhuhr: 0,
    Asr: 0,
    Maghrib: 0,
    Isha: 0,
  },
  notifiedToday: {},
};

function normalizeSettings(raw) {
  const safeTimes =
    raw?.muzakkirTimes && typeof raw.muzakkirTimes === 'object' && !Array.isArray(raw.muzakkirTimes)
      ? raw.muzakkirTimes
      : {};
  const safeSlots =
    raw?.muzakkirSlots && typeof raw.muzakkirSlots === 'object' && !Array.isArray(raw.muzakkirSlots)
      ? raw.muzakkirSlots
      : {};
  const safeOffsets =
    raw?.prayerOffsets && typeof raw.prayerOffsets === 'object' && !Array.isArray(raw.prayerOffsets)
      ? raw.prayerOffsets
      : {};

  const s = {
    ...DEFAULT,
    ...raw,
    muzakkirTimes: { ...MUZAKKIR_DEFAULT_TIMES, ...safeTimes },
    muzakkirSlots: { ...MUZAKKIR_DEFAULT_SLOTS, ...safeSlots },
    prayerOffsets: { ...DEFAULT.prayerOffsets, ...safeOffsets },
  };
  if (s.morningReminder && !s.muzakkirEnabled) {
    s.muzakkirEnabled = true;
    s.muzakkirTimes.morning = s.morningReminderTime || MUZAKKIR_DEFAULT_TIMES.morning;
    s.muzakkirMorningChecklist = true;
    s.muzakkirSlots = { morning: true, noon: false, evening: false };
  }
  return s;
}

function load(userId) {
  return normalizeSettings(loadObject(userId, STORAGE_BASE, DEFAULT));
}

export function saveSettings(userId, settings) {
  saveJson(userId, STORAGE_BASE, settings);
}

export function getSettings(userId) {
  return load(userId);
}

export function useSettings(userId) {
  const [settings, setSettings] = useState(() => (userId ? load(userId) : { ...DEFAULT }));
  const skipSaveRef = useRef(true);

  useEffect(() => {
    skipSaveRef.current = true;
    if (!userId) {
      setSettings({ ...DEFAULT });
      return;
    }
    setSettings(load(userId));
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    if (skipSaveRef.current) {
      skipSaveRef.current = false;
      return;
    }
    saveSettings(userId, settings);
  }, [userId, settings]);

  const updateSettings = useCallback((updates) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  }, []);

  const markNotified = useCallback((prayerName) => {
    const today = toDateKey();
    setSettings((prev) => {
      const dayList = prev.notifiedToday[today] || [];
      if (dayList.includes(prayerName)) return prev;
      return {
        ...prev,
        notifiedToday: {
          ...prev.notifiedToday,
          [today]: [...dayList, prayerName],
        },
      };
    });
  }, []);

  return { settings, updateSettings, markNotified };
}
