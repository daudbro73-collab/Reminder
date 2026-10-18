# Muzakkir — деплой PWA и APK

## Быстрый старт

### PWA (веб)

```bash
npm install
npm run deploy:pwa      # сборка + проверка dist/
```

Готово: залейте папку **`dist/`** на HTTPS-хостинг.

| Платформа | Как |
|-----------|-----|
| **Netlify** | Подключить репозиторий — `netlify.toml` уже настроен |
| **Vercel** | Импорт проекта — `vercel.json` уже настроен |
| **Любой VPS** | `npm run start:prod` (PWA + API на :3001) |

Проверка локально: `npm run preview` → http://localhost:4173

### Android APK (debug, для теста)

```bash
npm run build:apk:debug
```

APK: `android/app/build/outputs/apk/debug/app-debug.apk`

Установка на телефон: скопировать APK → открыть → разрешить установку из неизвестных источников.

### Android APK/AAB (release, для Play Store)

```bash
npm run build:native
npm run cap:android
```

Android Studio → **Build → Generate Signed Bundle / APK** → создать keystore.

---

# Muzakkir — полный деплой

Три целевые платформы: **PWA** (веб), **Android APK/AAB**, **iOS**.

---

## 1. Подготовка (общая)

```bash
npm install
cp .env.example .env   # при необходимости
npm run deploy:pwa     # PWA-сборка + проверка
npm test               # проверки
```

### Переменные окружения

| Переменная | Когда нужна | Описание |
|------------|-------------|----------|
| `VITE_API_URL` | Сборка (`build`) | URL вашего API. Если пусто — клиент ходит напрямую в Aladhan / AlQuran |
| `PORT` | Сервер | Порт Express (по умолчанию `3001`) |
| `SERVE_STATIC=true` | `start:prod` | Раздавать `dist/` вместе с API |

---

## 2. PWA (Progressive Web App)

### Локальная проверка

```bash
npm run build
npm run preview          # http://localhost:4173
# или полный стек с API:
npm run start:prod       # http://localhost:3001 — PWA + /api/*
```

### Хостинг (статика)

Загрузите содержимое папки **`dist/`** на любой HTTPS-хостинг:

- Vercel / Netlify / Cloudflare Pages / GitHub Pages / свой nginx

**Важно:** включите fallback на `index.html` для SPA-маршрутов.

Пример `vercel.json` уже в корне проекта.

### Установка на телефон

- **Android Chrome:** меню → «Установить приложение»
- **iOS Safari:** Поделиться → «На экран Домой»

PWA кэширует шрифты, статику и ответы API Корана. Намаз и уведомления в браузере работают, пока вкладка открыта (без push-сервера).

---

## 3. Android (APK / AAB)

### Первичная настройка (один раз)

```bash
npm run cap:add:android    # создаёт android/ + иконки
```

Требуется [Android Studio](https://developer.android.com/studio) и JDK 17+.

### Сборка после каждого релиза

```bash
npm run build:native       # vite build + cap sync
npm run cap:android        # открыть Android Studio
```

В Android Studio:

1. **Build → Generate Signed Bundle / APK**
2. Выберите **Android App Bundle** (Play Store) или **APK** (прямая установка)
3. Создайте или выберите keystore (храните в безопасном месте, не в git)

### Debug APK (быстро)

```bash
cd android
./gradlew assembleDebug
# APK: android/app/build/outputs/apk/debug/app-debug.apk
```

### Разрешения

- Уведомления (Android 13+): запрашиваются при включении Музаккира
- Геолокация: для «Моё местоположение» в намазе

### Play Store

- `applicationId`: `com.muzakkir.app`
- Подготовьте скриншоты, политику конфиденциальности, описание
- Загрузите AAB в [Google Play Console](https://play.google.com/console)

---

## 4. iOS

### Первичная настройка (один раз)

```bash
npm run cap:add:ios
```

Требуется Mac с [Xcode](https://developer.apple.com/xcode/) и аккаунт Apple Developer ($99/год для App Store).

### Сборка

```bash
npm run build:native
npm run cap:ios
```

В Xcode:

1. Выберите Team (Signing & Capabilities)
2. Убедитесь, что включён **Push Notifications** / **Background Modes** при необходимости
3. Добавьте в `Info.plist` строку для уведомлений:
   - `NSUserNotificationsUsageDescription` — зачем нужны уведомления
4. **Product → Archive** → загрузка в App Store Connect

### TestFlight

Archive → Distribute App → App Store Connect → TestFlight для бета-тестеров.

### Иконки iOS

Замените набор в `ios/App/App/Assets.xcassets/AppIcon.appiconset/` или используйте Xcode Asset Catalog с `resources/icon.png`.

---

## 5. API в продакшене

| Вариант | Как |
|---------|-----|
| **Без своего сервера** | `npm run build` — клиент вызывает Aladhan и AlQuran напрямую |
| **Свой прокси** | Деплой `server/index.js`, при сборке: `VITE_API_URL=https://api.example.com npm run build` |
| **PWA + API на одном домене** | `npm run build && SERVE_STATIC=true npm run start:prod` |

---

## 6. Чеклист перед релизом

- [ ] `npm test` — все тесты зелёные
- [ ] `npm run build` — без ошибок, в `dist/` есть `sw.js` и `manifest.webmanifest`
- [ ] Иконки: `public/pwa-192.png`, `public/pwa-512.png`, `resources/icon.png`
- [ ] Версия в `package.json` обновлена
- [ ] Keystore / Apple signing настроены
- [ ] Проверены уведомления Музаккира на реальном устройстве
- [ ] Проверен намаз с геолокацией и городом

---

## 7. Полезные команды

```bash
npm run dev              # разработка (Vite + API)
npm run build:pwa        # PWA-сборка
npm run build:native     # сборка + cap sync
npm run start:prod       # прод: PWA + API
npm run icons:native     # обновить Android-иконки из resources/icon.png
npm run cap:sync         # только sync без build
```
