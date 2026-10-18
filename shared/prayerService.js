export const PRAYER_KEYS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

function parseTimeToMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function minutesToTime(totalMinutes) {
  const normalized = ((totalMinutes % 1440) + 1440) % 1440;
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function applyOffsets(timings, offsets = {}) {
  const adjusted = {};
  for (const key of PRAYER_KEYS) {
    const base = timings[key];
    if (!base) continue;
    const offset = Number(offsets[key]) || 0;
    adjusted[key] = minutesToTime(parseTimeToMinutes(base) + offset);
  }
  return adjusted;
}

export function getNextPrayerInfo(timings) {
  const now = new Date();
  const nowSeconds =
    now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

  for (const key of PRAYER_KEYS) {
    const time = timings[key];
    if (!time) continue;
    const [h, m] = time.split(':').map(Number);
    const prayerSeconds = h * 3600 + m * 60;
    if (prayerSeconds > nowSeconds) {
      return {
        key,
        time,
        labelKey: key.toLowerCase(),
        countdownSeconds: prayerSeconds - nowSeconds,
        isTomorrow: false,
      };
    }
  }

  const fajr = timings.Fajr;
  if (!fajr) return null;
  const [fh, fm] = fajr.split(':').map(Number);
  const fajrSeconds = fh * 3600 + fm * 60;
  const secondsUntilMidnight = 86400 - nowSeconds;

  return {
    key: 'Fajr',
    time: fajr,
    labelKey: 'fajr',
    countdownSeconds: secondsUntilMidnight + fajrSeconds,
    isTomorrow: true,
  };
}

export async function fetchPrayerTimesFromAladhan({
  latitude,
  longitude,
  city,
  country,
  method = 2,
}) {
  const timestamp = Math.floor(Date.now() / 1000);
  let url;

  if (latitude != null && longitude != null) {
    url = `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${latitude}&longitude=${longitude}&method=${method}`;
  } else if (city && country) {
    url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${method}`;
  } else {
    throw new Error('LOCATION_REQUIRED');
  }

  const res = await fetch(url);
  const data = await res.json();

  if (data.code !== 200) {
    throw new Error('ALADHAN_ERROR');
  }

  const raw = {};
  for (const key of PRAYER_KEYS) {
    raw[key] = data.data.timings[key];
  }

  return {
    rawTimings: raw,
    meta: {
      method: Number(method),
      timezone: data.data.meta?.timezone,
      city: data.data.meta?.city || city || null,
      country: data.data.meta?.country || country || null,
      latitude: data.data.meta?.latitude ?? latitude ?? null,
      longitude: data.data.meta?.longitude ?? longitude ?? null,
      date: data.data.date?.readable,
    },
  };
}
