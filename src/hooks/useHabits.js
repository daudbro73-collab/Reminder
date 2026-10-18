import { useState, useEffect, useCallback, useRef } from 'react';
import { toDateKey } from '../utils/dateUtils';
import { loadArray, saveJson } from '../utils/userStorage';
import { createId } from '../utils/id';

const STORAGE_BASE = 'reminder-habits';

function loadHabits(userId) {
  return loadArray(userId, STORAGE_BASE);
}

function saveHabits(userId, habits) {
  saveJson(userId, STORAGE_BASE, habits);
}

export function useHabits(userId) {
  const [habits, setHabits] = useState(() => (userId ? loadHabits(userId) : []));
  const skipSaveRef = useRef(true);

  useEffect(() => {
    skipSaveRef.current = true;
    if (!userId) {
      setHabits([]);
      return;
    }
    setHabits(loadHabits(userId));
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    if (skipSaveRef.current) {
      skipSaveRef.current = false;
      return;
    }
    saveHabits(userId, habits);
  }, [userId, habits]);

  const addHabit = useCallback(({
    title,
    note,
    fields,
    periodDays = 30,
    periodType = '30',
    customPeriodDays = null,
    presetId = null,
    sphere = null,
  }) => {
    const today = toDateKey();
    const habit = {
      id: createId(),
      title: title.trim(),
      note: note?.trim() || '',
      fields: fields || [],
      presetId: presetId || null,
      sphere: sphere || null,
      startDate: today,
      periodDays: periodType === 'custom' ? customPeriodDays : Number(periodType) || periodDays,
      periodType,
      customPeriodDays: periodType === 'custom' ? customPeriodDays : null,
      logs: {},
      createdAt: new Date().toISOString(),
    };
    setHabits((prev) => [habit, ...prev]);
    return habit;
  }, []);

  const deleteHabit = useCallback((id) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }, []);

  const updateHabit = useCallback((id, updates) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, ...updates } : h))
    );
  }, []);

  const logDay = useCallback((id, dateKey, status) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        const logs = { ...h.logs };
        if (status === null) {
          delete logs[dateKey];
        } else {
          logs[dateKey] = status;
        }
        return { ...h, logs };
      })
    );
  }, []);

  const logToday = useCallback((id, status) => {
    logDay(id, toDateKey(), status);
  }, [logDay]);

  return { habits, addHabit, deleteHabit, updateHabit, logDay, logToday };
}
