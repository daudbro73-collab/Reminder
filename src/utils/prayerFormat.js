export function formatCountdown(totalSeconds, t) {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) {
    return t('countdownHms', { h, m, s: String(s).padStart(2, '0') });
  }
  if (m > 0) {
    return t('countdownMs', { m, s: String(s).padStart(2, '0') });
  }
  return t('countdownS', { s });
}

export function buildPrayerApiUrl(settings) {
  const params = new URLSearchParams();
  const { city, country, latitude, longitude, prayerMethod, prayerOffsets } = settings;

  if (latitude != null && longitude != null) {
    params.set('latitude', String(latitude));
    params.set('longitude', String(longitude));
  } else if (city?.trim() && country?.trim()) {
    params.set('city', city.trim());
    params.set('country', country.trim());
  } else {
    return null;
  }

  params.set('method', String(prayerMethod ?? 2));

  const offsets = prayerOffsets || {};
  for (const [key, value] of Object.entries(offsets)) {
    if (value) params.set(`offset_${key}`, String(value));
  }

  return `/api/prayer-times?${params.toString()}`;
}
