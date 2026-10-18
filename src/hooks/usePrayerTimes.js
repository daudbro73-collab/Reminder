import { useState, useEffect, useCallback } from 'react';
import { fetchPrayerTimes, hasPrayerLocation } from '../utils/api';

const PRAYER_KEYS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

export function usePrayerTimes(settings) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(0);

  const fetchTimings = useCallback(async () => {
    if (!hasPrayerLocation(settings)) return;

    setLoading(true);
    setError(null);
    try {
      const json = await fetchPrayerTimes(settings);
      if (!json) {
        setError('location_required');
        setData(null);
        return;
      }
      setData(json);
      setCountdown(json.next?.countdownSeconds ?? 0);
    } catch (err) {
      setError(err.message === 'LOCATION_REQUIRED' ? 'location_required' : 'fetch_failed');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [
    settings.city,
    settings.country,
    settings.latitude,
    settings.longitude,
    settings.prayerMethod,
    JSON.stringify(settings.prayerOffsets),
  ]);

  useEffect(() => {
    fetchTimings();
    const refresh = setInterval(fetchTimings, 3600000);
    return () => clearInterval(refresh);
  }, [fetchTimings]);

  useEffect(() => {
    if (!data?.next) return;
    setCountdown(data.next.countdownSeconds);

    const tick = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          fetchTimings();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(tick);
  }, [data?.next?.key, data?.next?.time, fetchTimings]);

  const prayerList = data?.prayers ?? [];

  return {
    timings: data?.timings ?? null,
    rawTimings: data?.rawTimings ?? null,
    prayerList,
    next: data?.next ?? null,
    countdown,
    meta: data?.meta ?? null,
    loading,
    error,
    refetch: fetchTimings,
  };
}

export function getNextPrayer(prayerList) {
  if (!prayerList.length) return null;
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();

  for (const p of prayerList) {
    const [h, m] = p.time.split(':').map(Number);
    if (h * 60 + m > nowMins) return p;
  }
  return prayerList[0];
}

export function isPrayerTimeNow(timeStr, windowMinutes = 2) {
  const [h, m] = timeStr.split(':').map(Number);
  const now = new Date();
  const prayer = new Date();
  prayer.setHours(h, m, 0, 0);
  return Math.abs(now - prayer) / 60000 <= windowMinutes;
}

export { PRAYER_KEYS };
