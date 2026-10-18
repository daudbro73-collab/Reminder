import { isNativeApp } from '../native.js';

export const LOCATION_ERROR = {
  DENIED: 'denied',
  UNAVAILABLE: 'unavailable',
  TIMEOUT: 'timeout',
  UNSUPPORTED: 'unsupported',
  INSECURE: 'insecure',
};

export const MAP_SEARCH_RADIUS_M = 8000;

function webGeolocationAvailable() {
  return typeof window !== 'undefined' && window.isSecureContext && navigator.geolocation;
}

function getCurrentPositionWeb() {
  if (!webGeolocationAvailable()) {
    return Promise.reject(new Error(LOCATION_ERROR.INSECURE));
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          source: 'gps',
        }),
      (err) => {
        if (err.code === 1) reject(new Error(LOCATION_ERROR.DENIED));
        else if (err.code === 3) reject(new Error(LOCATION_ERROR.TIMEOUT));
        else reject(new Error(LOCATION_ERROR.UNAVAILABLE));
      },
      { enableHighAccuracy: true, timeout: 25000, maximumAge: 0 }
    );
  });
}

async function getCurrentPositionNative() {
  const { Geolocation } = await import('@capacitor/geolocation');
  let status = await Geolocation.checkPermissions();
  if (status.location !== 'granted' && status.coarseLocation !== 'granted') {
    status = await Geolocation.requestPermissions();
  }
  if (status.location !== 'granted' && status.coarseLocation !== 'granted') {
    throw new Error(LOCATION_ERROR.DENIED);
  }

  const pos = await Geolocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 25000,
  });

  return {
    latitude: pos.coords.latitude,
    longitude: pos.coords.longitude,
    source: 'gps',
  };
}

export async function checkLocationPermission() {
  if (isNativeApp()) {
    try {
      const { Geolocation } = await import('@capacitor/geolocation');
      const status = await Geolocation.checkPermissions();
      if (status.location === 'granted' || status.coarseLocation === 'granted') {
        return 'granted';
      }
      if (status.location === 'denied' || status.coarseLocation === 'denied') {
        return 'denied';
      }
      return 'prompt';
    } catch {
      return 'unavailable';
    }
  }

  if (!webGeolocationAvailable()) return LOCATION_ERROR.INSECURE;

  if (navigator.permissions?.query) {
    try {
      const status = await navigator.permissions.query({ name: 'geolocation' });
      return status.state;
    } catch {
      return 'prompt';
    }
  }

  return 'prompt';
}

/** Explicit user action — shows the OS location permission dialog. */
export async function requestLocationPermission() {
  if (isNativeApp()) {
    try {
      const { Geolocation } = await import('@capacitor/geolocation');
      const result = await Geolocation.requestPermissions();
      if (result.location === 'granted' || result.coarseLocation === 'granted') {
        return 'granted';
      }
      if (result.location === 'denied' || result.coarseLocation === 'denied') {
        return 'denied';
      }
      return 'denied';
    } catch {
      return 'unavailable';
    }
  }

  if (!webGeolocationAvailable()) return LOCATION_ERROR.INSECURE;

  try {
    await getCurrentPositionWeb();
    return 'granted';
  } catch (err) {
    if (err?.message === LOCATION_ERROR.DENIED) return 'denied';
    if (err?.message === LOCATION_ERROR.INSECURE) return LOCATION_ERROR.INSECURE;
    return 'unavailable';
  }
}

export function getSavedLocation(settings) {
  if (settings?.latitude != null && settings?.longitude != null) {
    return {
      latitude: settings.latitude,
      longitude: settings.longitude,
      source: 'saved',
    };
  }
  return null;
}

export async function requestCurrentPosition(settings = null) {
  if (isNativeApp()) {
    try {
      return await getCurrentPositionNative();
    } catch (err) {
      if (Object.values(LOCATION_ERROR).includes(err?.message)) throw err;
      const saved = getSavedLocation(settings);
      if (saved) return saved;
      throw new Error(LOCATION_ERROR.UNAVAILABLE);
    }
  }

  if (!webGeolocationAvailable()) {
    const saved = getSavedLocation(settings);
    if (saved) return saved;
    throw new Error(LOCATION_ERROR.INSECURE);
  }

  return getCurrentPositionWeb();
}
