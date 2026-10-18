<div align="center">
  <h1>🕌 Muzakkir — مزكر</h1>
  <p><strong>Offline-first Islamic life tracker · PWA + iOS + Android · Prayer times, Quran, dhikr, habits</strong></p>

  [![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
  [![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
  [![Capacitor](https://img.shields.io/badge/Capacitor-7-119EFF?style=flat-square&logo=capacitor&logoColor=white)](https://capacitorjs.com)
  [![PWA](https://img.shields.io/badge/PWA-offline--first-5A0FC8?style=flat-square)](https://web.dev/progressive-web-apps)
  [![Platforms](https://img.shields.io/badge/platforms-Web_·_iOS_·_Android-lightgrey?style=flat-square)](https://capacitorjs.com)
  [![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=flat-square)](LICENSE)

  **🇷🇺 RU · 🇬🇧 EN · 🇸🇦 AR (RTL) · 🇪🇸 ES**
</div>

---

## What Is Muzakkir?

**Muzakkir** (Arabic: مزكر — "The Reminder") is a comprehensive Islamic lifestyle app that helps Muslims track the four spheres of a balanced life: physical, intellectual, spiritual, and financial.

It runs as an **installable PWA** in the browser and as a **native app** on iOS and Android (via Capacitor 7) — with full **offline support** since all data lives in localStorage. No account required, no data leaves the device.

---

## Core Modules

### 🕌 Prayer Times
- Auto-detects location and fetches accurate prayer times (Aladhan API)
- Push notifications for Fajr, Dhuhr, Asr, Maghrib, Isha
- Qibla direction indicator
- Countdown to next prayer

### 📖 Quran & Dhikr
- Full Mushaf with tajweed color coding
- Bookmark and reading progress tracking
- Morning / afternoon / evening adhkar with tasbih counter
- Muzakkir reminders — customizable notifications with taslim wording

### 🏋️ Life Balance Dashboard
| Sphere | Tracks |
|--------|--------|
| 🏃 Physical | Workout log, sleep hours, water intake, step goals |
| 🧠 Intellectual | Books read, learning hours, skills practiced |
| 🕌 Spiritual | Prayers completed, Quran pages, fasting days |
| 💰 Financial | Savings target progress, daily expense log |

### 📵 Habit Tracker
- Define bad habits to eliminate (smoking, social media, etc.)
- Streak counter with streak-break recovery flow
- Weekly heatmap view

---

## Platform Support

| Platform | Status | Notes |
|----------|:------:|-------|
| 🌐 Web (PWA) | ✅ | Installable, push notifications via VAPID |
| 🤖 Android | ✅ | Debug APK via Gradle; release via Android Studio |
| 🍎 iOS | ✅ | Xcode 15+ required; see [DEPLOY-IOS.md](DEPLOY-IOS.md) |

---

## Quick Start

```bash
git clone https://github.com/daudbro73-collab/Reminder.git
cd Reminder
npm install
npm run dev          # client: :5173  +  API proxy: :3001
```

### Build Targets

```bash
# PWA (web) — outputs to dist/
npm run deploy:pwa

# Android debug APK (requires JDK 17 + Android SDK)
npm run build:apk:debug

# Capacitor sync for iOS/Android after source change
npm run build:native

# Generate VAPID keys for Web Push
npm run generate:vapid
```

Full deployment instructions: [DEPLOY.md](DEPLOY.md) · [DEPLOY-IOS.md](DEPLOY-IOS.md)

---

## Architecture

```
Muzakkir/
├── src/                      # React 18 application
│   ├── screens/              # Full-page views (Prayer, Quran, Dashboard…)
│   ├── components/           # Shared UI components
│   ├── hooks/                # usePrayer, useHabits, useBalance…
│   └── i18n/                 # Translation strings (RU/EN/AR/ES)
├── server/
│   ├── index.js              # Express proxy server (dev only)
│   ├── prayerService.js      # Aladhan API wrapper + caching
│   ├── pushService.js        # Web Push (VAPID) notification sender
│   └── morningChecklist.js   # Scheduled morning checklist push
├── shared/
│   └── prayerService.js      # Isomorphic prayer logic (client + server)
├── ios/App/                  # Capacitor Xcode project
├── android/                  # Capacitor Gradle project
├── resources/                # App icons, splash screens (all sizes)
├── dist/                     # PWA build output (served statically)
├── capacitor.config.json     # appId: com.muzakkir.app
└── vite.config.js            # Vite + vite-plugin-pwa config
```

---

## Tech Stack

| | Technology | Role |
|-|------------|------|
| ⚛️ | React 18 | UI framework |
| ⚡ | Vite 6 | Dev server + bundler |
| 📱 | Capacitor 7 | iOS + Android native bridge |
| 🔔 | vite-plugin-pwa + VAPID | PWA + push notifications |
| 🕌 | Aladhan API | Prayer time calculations |
| 🌐 | Express.js | Dev-mode API proxy + push sender |
| 🗄️ | localStorage | Offline-first data persistence |
| 🌍 | Custom i18n | 4 languages, RTL support for Arabic |

---

<div align="center">
  <strong>Built by Rustam Berheev</strong><br/>
  <a href="https://github.com/daudbro73-collab">github.com/daudbro73-collab</a>
</div>
