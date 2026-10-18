import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  initWebPush,
  getVapidPublicKey,
  upsertSubscription,
  removeSubscription,
  startPushScheduler,
} from './pushService.js';
import {
  fetchPrayerTimesFromAladhan,
  applyOffsets,
  getNextPrayerInfo,
  PRAYER_KEYS,
} from './prayerService.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, '..', 'dist');

const app = express();
const PORT = process.env.PORT || 3001;
const SERVE_STATIC = process.env.SERVE_STATIC === 'true';

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'muzakkir-api',
    webPush: Boolean(getVapidPublicKey()),
  });
});

app.get('/api/push/vapid-public-key', (_req, res) => {
  const key = getVapidPublicKey();
  if (!key) return res.status(503).json({ error: 'push_not_configured' });
  res.json({ publicKey: key });
});

app.post('/api/push/subscribe', (req, res) => {
  try {
    const result = upsertSubscription(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/push/unsubscribe', (req, res) => {
  try {
    const result = removeSubscription(req.body?.userId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/prayer-times', async (req, res) => {
  try {
    const { city, country, latitude, longitude, method } = req.query;

    const offsets = {};
    for (const key of PRAYER_KEYS) {
      const param = req.query[`offset_${key}`] ?? req.query[`offset_${key.toLowerCase()}`];
      if (param != null && param !== '') {
        offsets[key] = Number(param);
      }
    }

    const { rawTimings, meta } = await fetchPrayerTimesFromAladhan({
      city,
      country,
      latitude: latitude != null ? Number(latitude) : null,
      longitude: longitude != null ? Number(longitude) : null,
      method: method ? Number(method) : 2,
    });

    const timings = applyOffsets(rawTimings, offsets);
    const next = getNextPrayerInfo(timings);

    res.json({
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
    });
  } catch (err) {
    if (err.message === 'LOCATION_REQUIRED') {
      return res.status(400).json({ error: 'location_required' });
    }
    if (err.message === 'ALADHAN_ERROR') {
      return res.status(502).json({ error: 'aladhan_failed' });
    }
    console.error('Prayer times error:', err);
    res.status(500).json({ error: 'server_error' });
  }
});

app.get('/api/quran/surahs', async (_req, res) => {
  try {
    const r = await fetch('https://api.alquran.cloud/v1/meta');
    const json = await r.json();
    res.json(json);
  } catch (err) {
    console.error('Quran meta error:', err);
    res.status(502).json({ error: 'quran_failed' });
  }
});

app.get('/api/quran/surah/:number', async (req, res) => {
  try {
    const num = Number(req.params.number);
    if (!num || num < 1 || num > 114) {
      return res.status(400).json({ error: 'invalid_surah' });
    }
    const editions = String(req.query.editions || 'quran-uthmani')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .join(',');
    const r = await fetch(`https://api.alquran.cloud/v1/surah/${num}/editions/${editions}`);
    const json = await r.json();
    res.json(json);
  } catch (err) {
    console.error('Quran surah error:', err);
    res.status(502).json({ error: 'quran_failed' });
  }
});

if (SERVE_STATIC) {
  app.use(express.static(DIST_DIR));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Muzakkir API on http://localhost:${PORT}`);
  if (SERVE_STATIC) {
    console.log(`PWA static files from ${DIST_DIR}`);
  }
  if (initWebPush()) {
    startPushScheduler();
  }
});
