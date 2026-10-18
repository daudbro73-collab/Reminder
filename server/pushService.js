import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import webpush from 'web-push';
import { fetchPrayerTimesFromAladhan, applyOffsets, PRAYER_KEYS } from './prayerService.js';
import { t } from '../src/i18n/translations.js';
import { getActiveMuzakkirSlots, getMuzakkirNotification } from '../src/constants/muzakkirMessages.js';
import { buildMorningChecklistForPush } from './morningChecklist.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, 'data');
const STORE_PATH = path.join(DATA_DIR, 'push-profiles.json');

let vapidReady = false;
const firedKeys = new Map();

function toDateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadStore() {
  ensureDataDir();
  if (!fs.existsSync(STORE_PATH)) return {};
  try {
    return JSON.parse(fs.readFileSync(STORE_PATH, 'utf8'));
  } catch {
    return {};
  }
}

function saveStore(store) {
  ensureDataDir();
  fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2));
}

export function initWebPush() {
  const publicKey = process.env.VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const email = process.env.VAPID_EMAIL || 'mailto:support@muzakkir.app';

  if (!publicKey || !privateKey) {
    console.warn('Web Push: set VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY to enable background PWA notifications');
    return false;
  }

  webpush.setVapidDetails(email, publicKey, privateKey);
  vapidReady = true;
  return true;
}

export function getVapidPublicKey() {
  return process.env.VAPID_PUBLIC_KEY || null;
}

export function upsertSubscription({ subscription, profile }) {
  if (!subscription?.endpoint || !profile?.userId) {
    throw new Error('INVALID_SUBSCRIPTION');
  }
  const store = loadStore();
  store[profile.userId] = {
    subscription,
    profile,
    updatedAt: new Date().toISOString(),
  };
  saveStore(store);
  return { ok: true };
}

export function removeSubscription(userId) {
  if (!userId) throw new Error('USER_REQUIRED');
  const store = loadStore();
  delete store[userId];
  saveStore(store);
  return { ok: true };
}

function todayKey() {
  return toDateKey();
}

function wasFired(userId, key) {
  const day = todayKey();
  const userDay = firedKeys.get(userId);
  if (!userDay || userDay.day !== day) return false;
  return userDay.keys.has(key);
}

function markFired(userId, key) {
  const day = todayKey();
  let userDay = firedKeys.get(userId);
  if (!userDay || userDay.day !== day) {
    userDay = { day, keys: new Set() };
    firedKeys.set(userId, userDay);
  }
  userDay.keys.add(key);
}

async function sendPush(userId, entry, payload) {
  if (!vapidReady) return;
  try {
    await webpush.sendNotification(entry.subscription, JSON.stringify(payload), { TTL: 60 * 60 });
    markFired(userId, payload.tag);
  } catch (err) {
    if (err.statusCode === 410 || err.statusCode === 404) {
      removeSubscription(userId);
    }
    console.warn('Push send failed:', err.statusCode || err.message);
  }
}

function isTimeMatch(timeStr, windowMinutes = 2) {
  const [h, m] = timeStr.split(':').map(Number);
  const now = new Date();
  const target = new Date();
  target.setHours(h, m, 0, 0);
  return Math.abs(now - target) / 60000 <= windowMinutes;
}

async function resolvePrayerList(profile) {
  if (profile.prayerList?.length) return profile.prayerList;
  const s = profile.settings || {};
  try {
    const { rawTimings } = await fetchPrayerTimesFromAladhan({
      city: s.city,
      country: s.country,
      latitude: s.latitude,
      longitude: s.longitude,
      method: s.prayerMethod ?? 2,
    });
    const timings = applyOffsets(rawTimings, s.prayerOffsets || {});
    return PRAYER_KEYS.map((key) => ({
      key,
      labelKey: key.toLowerCase(),
      time: timings[key],
    }));
  } catch {
    return [];
  }
}

async function checkProfile(userId, entry) {
  const profile = entry.profile;
  const lang = profile.lang || 'ru';
  const settings = profile.settings || {};
  const tr = (key, vars) => t(lang, key, vars);

  if (settings.prayerNotifications) {
    const prayers = await resolvePrayerList(profile);
    for (const prayer of prayers) {
      const tag = `prayer-${todayKey()}-${prayer.key}`;
      if (wasFired(userId, tag)) continue;
      if (isTimeMatch(prayer.time, 2)) {
        await sendPush(userId, entry, {
          title: tr('prayerNotifTitle'),
          body: tr('prayerNotifBody', {
            prayer: tr(`prayers.${prayer.labelKey}`),
            time: prayer.time,
          }),
          tag,
        });
      }
    }
  }

  if (settings.muzakkirEnabled) {
    const times = settings.muzakkirTimes || {};
    const trFn = (key, vars) => t(lang, key, vars);
    for (const slot of getActiveMuzakkirSlots(settings)) {
      const time = times[slot];
      if (!time) continue;
      const tag = `muzakkir-${todayKey()}-${slot}`;
      if (wasFired(userId, tag)) continue;
      if (isTimeMatch(time, 3)) {
        const extra =
          slot === 'morning' && settings.muzakkirMorningChecklist
            ? buildMorningChecklistForPush(profile.tasks || [], profile.habits || [], trFn)
            : '';
        const { title, body } = getMuzakkirNotification(lang, slot, extra);
        await sendPush(userId, entry, { title, body, tag });
      }
    }
  }

  if (settings.taskNotifications && profile.tasks?.length) {
    const today = todayKey();
    for (const task of profile.tasks) {
      if (task.completed || !task.deadline || task.deadline !== today) continue;
      const tag = `task-${today}-${task.id}`;
      if (wasFired(userId, tag)) continue;
      if (isTimeMatch('09:00', 2)) {
        await sendPush(userId, entry, {
          title: tr('taskNotifTitle'),
          body: tr('taskNotifBody', { title: task.title || tr('deadline') }),
          tag,
        });
      }
    }
  }
}

export function startPushScheduler() {
  if (!vapidReady) return;

  const tick = async () => {
    const store = loadStore();
    for (const [userId, entry] of Object.entries(store)) {
      await checkProfile(userId, entry);
    }
  };

  tick();
  setInterval(tick, 60 * 1000);
  console.log('Web Push scheduler running (every 60s)');
}
