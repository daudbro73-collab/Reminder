<div align="center">

# 🕌 Muzakkir — Muslim Life Balance Tracker

**A PWA + native mobile app for prayer times, Quran, dhikr, habits and daily life balance**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Capacitor](https://img.shields.io/badge/Capacitor-7-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)](https://capacitorjs.com)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)

[🌐 Web App (PWA)](#) · [📱 Android APK](#) · [🍎 iOS App](#) · [📖 Deploy Guide](DEPLOY.md)

</div>

---

## 📋 Overview

**Muzakkir** (Arabic: مزكر — "The Reminder") is a comprehensive Islamic life tracker that helps Muslims maintain balance across all spheres of life. Built as an **offline-first PWA** with native iOS and Android support via Capacitor.

> 🌍 Available in 4 languages: 🇷🇺 Russian · 🇬🇧 English · 🇸🇦 Arabic (RTL) · 🇪🇸 Spanish

---

## ✨ Features

### 🕌 Prayer & Spirituality
- **Accurate prayer times** via Aladhan API (auto-detects location)
- **Push notifications** for each prayer with customizable alerts
- **Quran reader** with tajweed highlighting and bookmarks
- **Morning / Afternoon / Evening Dhikr** with taslim counter

### 📊 Life Balance Dashboard

| Sphere | What It Tracks |
|--------|---------------|
| 🏃 **Physical** | Exercise habits, sleep, nutrition |
| 🧠 **Intellectual** | Reading, learning, skill development |
| 🕌 **Spiritual** | Prayer, Quran, dhikr, fasting |
| 💰 **Financial** | Savings goals, spending habits |

### ⚙️ More Features
- **Muzakkir reminders** — customizable Islamic reminders with taslim
- **Bad habit tracker** — monitor and eliminate harmful patterns
- **Offline-first** — works without internet (localStorage sync)
- **RTL support** — native Arabic right-to-left layout

---

## 📱 Platform Support

| Platform | Status | Build Command |
|----------|--------|--------------|
| 🌐 PWA (Web) | ✅ Ready | `npm run deploy:pwa` |
| 🤖 Android | ✅ Ready | `npm run build:apk:debug` |
| 🍎 iOS | ✅ Ready | Xcode required |

---

## 🚀 Quick Start

```bash
git clone https://github.com/daudbro73-collab/Reminder.git
cd Reminder
npm install
npm run dev
```

| URL | Service |
|-----|---------|
| `http://localhost:5173` | React client app |
| `http://localhost:3001` | Express API proxy |

### Production build

```bash
npm run deploy:pwa         # PWA → dist/ (with verification)
npm run build:apk:debug    # Android debug APK (JDK 17 + Android SDK required)
npm run build:native       # Capacitor sync (Android + iOS)
```

See full instructions in [DEPLOY.md](DEPLOY.md).

---

## 🏗️ Project Structure

```
Muzakkir/
├── src/                    # React application
├── server/
│   ├── index.js            # Express API proxy
│   ├── pushService.js      # Web Push notifications
│   ├── prayerService.js    # Prayer time logic
│   └── morningChecklist.js # Daily checklist
├── shared/
│   └── prayerService.js    # Shared client+server logic
├── ios/                    # Capacitor iOS project (Xcode)
├── android/                # Capacitor Android project
├── dist/                   # Built PWA output
├── resources/              # Icons & splash screens
├── capacitor.config.json
├── vite.config.js
├── DEPLOY.md
└── DEPLOY-IOS.md
```

---

## 💡 Tech Stack

| Layer | Technology |
|-------|-----------|
| UI | React 18 + Vite 6 |
| Native | Capacitor 7 (iOS + Android) |
| PWA | vite-plugin-pwa |
| Push | Web Push API (VAPID keys) |
| Prayer Times | Aladhan API |
| Server | Express.js (optional proxy) |
| Storage | localStorage (offline-first) |
| i18n | Custom i18n (RU/EN/AR/ES) |

---

## 📜 Scripts

```bash
npm run dev               # Dev server (client + API)
npm run build             # Web build
npm run deploy:pwa        # Build + verify PWA
npm run build:apk:debug   # Android APK (debug)
npm run generate:vapid    # Generate VAPID push keys
npm test                  # Run tests
```

---

<div align="center">

Built with ❤️ and بسم الله by **Rustam Berheev**

[![GitHub](https://img.shields.io/badge/GitHub-daudbro73--collab-181717?style=flat-square&logo=github)](https://github.com/daudbro73-collab)

</div>
