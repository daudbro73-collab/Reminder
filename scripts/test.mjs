#!/usr/bin/env node
/**
 * Smoke & quality tests for Muzakkir app
 */
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';
import {
  applyOffsets,
  getNextPrayerInfo,
  PRAYER_KEYS,
} from '../server/prayerService.js';
import { buildPrayerApiUrl } from '../src/utils/prayerFormat.js';
import { toDateKey, addDays, daysBetween } from '../src/utils/dateUtils.js';
import { t, translations, LANGUAGES } from '../src/i18n/translations.js';
import { PRESETS } from '../src/constants/presets.js';
import { HABIT_PRESETS } from '../src/constants/habitPresets.js';
import { getPresetTranslations, getHabitPresetTranslations } from '../src/i18n/presetStrings.js';
import { getTaskDisplayTitle, getHabitDisplayTitle, findTaskPreset } from '../src/utils/displayLabels.js';
import { getTasksForNotification, getTaskNotifyAt } from '../src/utils/taskScheduler.js';
import { taskNotificationId } from '../src/constants/notificationIds.js';

const API = process.env.API_URL || 'http://localhost:3001';
let passed = 0;
let failed = 0;
const issues = [];

function ok(name) {
  passed++;
  console.log(`  ✓ ${name}`);
}

function fail(name, detail) {
  failed++;
  issues.push({ name, detail });
  console.log(`  ✗ ${name}`);
  if (detail) console.log(`    → ${detail}`);
}

function assert(cond, name, detail) {
  if (cond) ok(name);
  else fail(name, detail);
}

// ─── Unit: prayerService ───────────────────────────────────────────
console.log('\n📿 Prayer service (unit)');

const base = { Fajr: '05:00', Dhuhr: '12:30', Asr: '15:45', Maghrib: '18:20', Isha: '20:00' };

const adjusted = applyOffsets(base, { Fajr: 5, Maghrib: -2 });
assert(adjusted.Fajr === '05:05', 'offset +5 min Fajr');
assert(adjusted.Maghrib === '18:18', 'offset -2 min Maghrib');
assert(adjusted.Dhuhr === '12:30', 'unchanged Dhuhr');

const midnightWrap = applyOffsets({ Isha: '23:50' }, { Isha: 15 });
assert(midnightWrap.Isha === '00:05', 'offset wraps past midnight');

// Mock time for next prayer — we test structure only
const next = getNextPrayerInfo(base);
assert(next && next.key && next.time && typeof next.countdownSeconds === 'number', 'getNextPrayerInfo structure');
assert(PRAYER_KEYS.length === 5, '5 prayer keys');

// ─── Unit: prayer API URL builder ──────────────────────────────────
console.log('\n🔗 Prayer API URL builder');

const urlCity = buildPrayerApiUrl({ city: 'Moscow', country: 'Russia', prayerMethod: 2, prayerOffsets: { Fajr: 3 } });
assert(urlCity?.includes('city=Moscow'), 'city param');
assert(urlCity?.includes('offset_Fajr=3'), 'offset param');

const urlCoords = buildPrayerApiUrl({ latitude: 55.75, longitude: 37.62, prayerMethod: 2, prayerOffsets: {} });
assert(urlCoords?.includes('latitude=55.75'), 'lat param');

const urlNone = buildPrayerApiUrl({ city: '', country: '', latitude: null, longitude: null });
assert(urlNone === null, 'no location → null');

// ─── Unit: date utils (local timezone) ─────────────────────────────
console.log('\n📅 Date utils');

const localToday = toDateKey();
const parts = localToday.split('-');
assert(parts.length === 3 && parts[0].length === 4, 'toDateKey format YYYY-MM-DD');
assert(toDateKey(new Date()) === localToday, 'toDateKey uses local date not UTC');
assert(addDays(localToday, 1) > localToday, 'addDays increments');
assert(daysBetween(localToday, addDays(localToday, 7)) === 7, 'daysBetween');

// ─── Unit: i18n completeness ───────────────────────────────────────
console.log('\n🌐 i18n completeness');

const ruKeys = Object.keys(translations.ru).filter((k) => typeof translations.ru[k] === 'string');
for (const lang of LANGUAGES.map((l) => l.code)) {
  const missing = ruKeys.filter((k) => typeof translations[lang][k] !== 'string');
  assert(missing.length === 0, `${lang}: all top-level keys`, missing.slice(0, 5).join(', '));
}

assert(t('ru', 'appTitle') === 'Музаккир', 'RU appTitle Музаккир');
assert(t('en', 'appTitle') === 'Muzakkir', 'EN appTitle Muzakkir');
assert(t('ar', 'appTitle') === 'مُذَكِّر', 'AR appTitle مُذَكِّر');
assert(t('ru', 'countdownMs', { m: 5, s: '03' }).includes('5'), 'interpolation works');

// ─── Unit: presets ─────────────────────────────────────────────────
console.log('\n📋 Presets & habits');

const spheres = ['physical', 'intellectual', 'spiritual', 'financial'];
for (const sphere of spheres) {
  assert(PRESETS[sphere]?.length >= 12, `${sphere} has ≥12 presets`, String(PRESETS[sphere]?.length));
  assert(HABIT_PRESETS[sphere]?.length >= 5, `${sphere} has ≥5 habit presets`);
}

for (const lang of LANGUAGES.map((l) => l.code)) {
  const pt = getPresetTranslations(lang);
  for (const sphere of spheres) {
    const presetIds = PRESETS[sphere].map((p) => p.id);
    const translated = Object.keys(pt[sphere] || {});
    const missing = presetIds.filter((id) => !translated.includes(id));
    assert(missing.length === 0, `${lang} preset strings for ${sphere}`, missing.slice(0, 3).join(', '));
  }
}

// Mock t like LanguageContext preset resolution
function mockT(lang) {
  return (key) => {
    const presetMatch = key.match(/^presets\.(\w+)\.(\w+)$/);
    if (presetMatch) {
      return getPresetTranslations(lang)[presetMatch[1]]?.[presetMatch[2]] || key;
    }
    const habitMatch = key.match(/^habitPresets\.(\w+)\.(\w+)$/);
    if (habitMatch) {
      return getHabitPresetTranslations(lang)[habitMatch[1]]?.[habitMatch[2]] || key;
    }
    return key;
  };
}

const ruTask = { title: 'Пить 2л воды', category: 'physical', presetId: 'water' };
assert(
  getTaskDisplayTitle(ruTask, mockT('en')) === 'Drink 2L water',
  'task preset title follows selected language'
);
assert(
  findTaskPreset({ title: 'Пить 2л воды', category: 'physical' })?.presetId === 'water',
  'legacy task title resolves to preset'
);

const ruHabit = { title: 'Курение', sphere: 'physical', presetId: 'smoking' };
assert(
  getHabitDisplayTitle(ruHabit, mockT('en')) === 'Smoking',
  'habit preset title follows selected language'
);

// ─── API integration (needs running server) ────────────────────────
console.log('\n🖥️  API integration');

async function apiTest(path, expectStatus, checks = {}) {
  try {
    const res = await fetch(`${API}${path}`);
    if (res.status !== expectStatus) {
      fail(`GET ${path} → ${expectStatus}`, `got ${res.status}`);
      return null;
    }
    const json = await res.json().catch(() => ({}));
    for (const [label, fn] of Object.entries(checks)) {
      assert(fn(json), label);
    }
    ok(`GET ${path} → ${expectStatus}`);
    return json;
  } catch (e) {
    fail(`GET ${path}`, e.message);
    return null;
  }
}

async function runApiTests() {
  await apiTest('/api/health', 200, {
    'health ok': (j) => j.ok === true,
  });

  const moscow = await apiTest(
    '/api/prayer-times?city=Moscow&country=Russia',
    200,
    {
      'has 5 prayers': (j) => j.prayers?.length === 5,
      'has raw + adjusted': (j) => j.rawTimings && j.timings,
      'has next countdown': (j) => j.next?.countdownSeconds >= 0,
      'has meta timezone': (j) => !!j.meta?.timezone,
    }
  );

  if (moscow) {
    for (const p of moscow.prayers) {
      assert(/^\d{2}:\d{2}$/.test(p.time), `time format ${p.key}`, p.time);
    }
  }

  const offset = await apiTest(
    '/api/prayer-times?city=Moscow&country=Russia&offset_Fajr=10',
    200,
    {
      'Fajr offset applied': (j) => {
        const raw = parseTime(j.rawTimings.Fajr);
        const adj = parseTime(j.timings.Fajr);
        return adj - raw === 10 || adj - raw === 10 - 1440;
      },
    }
  );

  await apiTest('/api/prayer-times', 400, {
    'location required error': (j) => j.error === 'location_required',
  });

  await apiTest('/api/prayer-times?city=ZZZINVALID999&country=Nowhere', 200, {
    'invalid city still returns timings (Aladhan fallback)': (j) => j.prayers?.length === 5,
  });

  const coords = await apiTest(
    '/api/prayer-times?latitude=21.4225&longitude=39.8262&method=4',
    200,
    {
      'coords Mecca': (j) => j.meta?.latitude != null,
    }
  );
}

function parseTime(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

// ─── Start server if needed ────────────────────────────────────────
async function ensureServer() {
  try {
    const res = await fetch(`${API}/api/health`);
    if (res.ok) {
      console.log('  (server already running)');
      return null;
    }
  } catch {
    /* start */
  }

  const proc = spawn('node', ['server/index.js'], {
    cwd: new URL('..', import.meta.url).pathname,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, PORT: '3001' },
  });

  for (let i = 0; i < 20; i++) {
    await sleep(250);
    try {
      const res = await fetch(`${API}/api/health`);
      if (res.ok) return proc;
    } catch {
      /* retry */
    }
  }
  fail('server startup', 'could not reach /api/health in 5s');
  proc.kill();
  return null;
}

// ─── Build check ───────────────────────────────────────────────────
console.log('\n📦 Production build');

async function runBuild() {
  return new Promise((resolve) => {
    const proc = spawn('npm', ['run', 'build'], {
      cwd: new URL('..', import.meta.url).pathname,
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: true,
    });
    let out = '';
    proc.stdout?.on('data', (d) => { out += d; });
    proc.stderr?.on('data', (d) => { out += d; });
    proc.on('close', (code) => {
      if (code === 0) ok('vite build succeeds');
      else fail('vite build', out.slice(-500));
      resolve();
    });
  });
}

// ─── Code quality notes (static) ───────────────────────────────────
console.log('\n🔍 Known limitations (not failures)');

// ─── Unit: notification schedulers ─────────────────────────────────
console.log('\n🔔 Notification schedulers');

const sampleTasks = [
  { id: 'task-a', completed: false, deadline: localToday, title: 'Today task' },
  { id: 'task-b', completed: true, deadline: localToday, title: 'Done' },
  { id: 'task-c', completed: false, deadline: addDays(localToday, 5), title: 'Future' },
];
const pendingTasks = getTasksForNotification(sampleTasks);
assert(pendingTasks.length === 2, 'task notif filters incomplete with deadline');
assert(
  taskNotificationId('task-a') >= 301 && taskNotificationId('task-a') <= 999,
  'task notification id in range'
);
const notifyAt = getTaskNotifyAt(localToday);
assert(notifyAt === null || notifyAt instanceof Date, 'getTaskNotifyAt shape');

const limitations = [
  'PWA background push needs VAPID keys (node scripts/generate-vapid.mjs)',
  'Prayer API requires dev server or separate `npm run dev:server`',
  'Production build serves static files only — API not bundled',
  'Geolocation requires HTTPS or localhost',
  'Aladhan API is external — depends on network',
];
limitations.forEach((l) => console.log(`  ⚠ ${l}`));

// ─── Main ──────────────────────────────────────────────────────────
const serverProc = await ensureServer();
await runApiTests();
await runBuild();
if (serverProc) serverProc.kill();

console.log('\n' + '─'.repeat(50));
console.log(`Results: ${passed} passed, ${failed} failed`);
if (issues.length) {
  console.log('\nFailures:');
  issues.forEach((i) => console.log(`  • ${i.name}: ${i.detail}`));
  process.exit(1);
}
console.log('All automated checks passed.\n');
process.exit(0);
