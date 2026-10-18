const API_BASE = import.meta.env.VITE_API_URL || '';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; ++i) arr[i] = raw.charCodeAt(i);
  return arr;
}

export function isWebPushSupported() {
  return (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    Boolean(import.meta.env.VITE_VAPID_PUBLIC_KEY)
  );
}

export async function subscribeWebPush() {
  if (!isWebPushSupported()) return null;
  try {
    const reg = await navigator.serviceWorker.ready;
    const existing = await reg.pushManager.getSubscription();
    if (existing) return existing;

    const key = import.meta.env.VITE_VAPID_PUBLIC_KEY;
    return reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(key),
    });
  } catch (err) {
    console.warn('Web push subscribe:', err);
    return null;
  }
}

export async function unsubscribeWebPush() {
  try {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if (sub) await sub.unsubscribe();
  } catch (_) {
  }
}

function buildSyncPayload({ userId, settings, tasks, habits, prayerList, lang }) {
  return {
    userId,
    lang,
    settings: {
      prayerNotifications: settings.prayerNotifications,
      muzakkirEnabled: settings.muzakkirEnabled,
      muzakkirTimes: settings.muzakkirTimes,
      muzakkirSlots: settings.muzakkirSlots,
      muzakkirMorningChecklist: settings.muzakkirMorningChecklist,
      taskNotifications: settings.taskNotifications,
      city: settings.city,
      country: settings.country,
      latitude: settings.latitude,
      longitude: settings.longitude,
      prayerMethod: settings.prayerMethod,
      prayerOffsets: settings.prayerOffsets,
    },
    prayerList: prayerList.map((p) => ({
      key: p.key,
      labelKey: p.labelKey,
      time: p.time,
    })),
    tasks: tasks
      .filter((task) => !task.completed)
      .map((task) => ({
        id: task.id,
        title: task.title,
        deadline: task.deadline,
        category: task.category,
        presetId: task.presetId,
      })),
    habits: habits.map((h) => ({
      id: h.id,
      title: h.title,
      presetId: h.presetId,
      logs: h.logs || {},
    })),
  };
}

export async function syncWebPushProfile({ userId, settings, tasks, habits = [], prayerList, lang }) {
  if (!isWebPushSupported() || !userId) return false;

  const needsAny =
    settings.prayerNotifications ||
    settings.muzakkirEnabled ||
    settings.taskNotifications;
  if (!needsAny) {
    await unsubscribeWebPush();
    return false;
  }

  if (!('Notification' in window) || Notification.permission !== 'granted') return false;

  const subscription = await subscribeWebPush();
  if (!subscription) return false;

  try {
    const res = await fetch(`${API_BASE}/api/push/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subscription: subscription.toJSON(),
        profile: buildSyncPayload({ userId, settings, tasks, habits, prayerList, lang }),
      }),
    });
    return res.ok;
  } catch (err) {
    console.warn('Web push sync:', err);
    return false;
  }
}

export async function removeWebPushProfile(userId) {
  if (!userId) return;
  try {
    await fetch(`${API_BASE}/api/push/unsubscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
  } catch (_) {
  }
  await unsubscribeWebPush();
}
