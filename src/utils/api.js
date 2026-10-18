import {
  PRAYER_KEYS,
  applyOffsets,
  getNextPrayerInfo,
  fetchPrayerTimesFromAladhan,
} from '../../shared/prayerService.js';

const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export function useProxyApi() {
  return import.meta.env.DEV && !API_BASE;
}

export function hasPrayerLocation(settings) {
  return (
    (settings.latitude != null && settings.longitude != null) ||
    (settings.city?.trim() && settings.country?.trim())
  );
}

function apiUrl(path) {
  return API_BASE ? `${API_BASE}${path}` : path;
}

export async function fetchPrayerTimes(settings) {
  const offsets = settings.prayerOffsets || {};
  if (!hasPrayerLocation(settings)) return null;

  if (useProxyApi()) {
    const params = new URLSearchParams();
    if (settings.latitude != null && settings.longitude != null) {
      params.set('latitude', String(settings.latitude));
      params.set('longitude', String(settings.longitude));
    } else {
      params.set('city', settings.city.trim());
      params.set('country', settings.country.trim());
    }
    params.set('method', String(settings.prayerMethod ?? 2));
    for (const [key, value] of Object.entries(offsets)) {
      if (value) params.set(`offset_${key}`, String(value));
    }
    const res = await fetch(apiUrl(`/api/prayer-times?${params}`));
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'fetch_failed');
    return json;
  }

  const { rawTimings, meta } = await fetchPrayerTimesFromAladhan({
    city: settings.city,
    country: settings.country,
    latitude: settings.latitude,
    longitude: settings.longitude,
    method: settings.prayerMethod ?? 2,
  });

  const timings = applyOffsets(rawTimings, offsets);
  const next = getNextPrayerInfo(timings);

  return {
    timings,
    rawTimings,
    offsets,
    next,
    prayers: PRAYER_KEYS.map((key) => ({
      key,
      labelKey: key.toLowerCase(),
      time: timings[key],
      rawTime: rawTimings[key],
      offset: offsets[key] || 0,
    })),
    meta,
  };
}

export async function fetchQuranMeta() {
  try {
    if (useProxyApi()) {
      const res = await fetch(apiUrl('/api/quran/surahs'));
      if (res.ok) {
        const json = await res.json();
        if (json?.code === 200) return json;
      }
    }
  } catch {
    /* fall through to direct API */
  }
  const res = await fetch('https://api.alquran.cloud/v1/meta');
  return res.json();
}

export async function fetchQuranSurah(number, editions) {
  const editionParam = editions || 'quran-uthmani';
  try {
    if (useProxyApi()) {
      const res = await fetch(
        apiUrl(`/api/quran/surah/${number}?editions=${encodeURIComponent(editionParam)}`)
      );
      if (res.ok) {
        const json = await res.json();
        if (json?.code === 200) return json;
      }
    }
  } catch {
    /* fall through to direct API */
  }
  const res = await fetch(
    `https://api.alquran.cloud/v1/surah/${number}/editions/${editionParam}`
  );
  return res.json();
}
