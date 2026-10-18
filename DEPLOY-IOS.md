# Muzakkir — iOS (App Store / TestFlight)

## Требования

- Mac с **Xcode** (App Store, ~12 GB)
- **Apple Developer** аккаунт ($99/год) для публикации
- **CocoaPods**: `brew install cocoapods`

## 1. Подготовка проекта

```bash
npm run prepare:ios
```

Скопирует web-сборку в `ios/App`, обновит иконку.

## 2. Xcode

```bash
# После установки Xcode:
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
export LANG=en_US.UTF-8
cd ios/App && pod install && cd ../..
npm run cap:ios
```

В Xcode:

1. Откройте **App.xcworkspace** (не `.xcodeproj`)
2. Target **App** → **Signing & Capabilities**
   - Team: ваш Apple Developer аккаунт
   - Bundle ID: `com.muzakkir.app`
3. **Product → Archive**
4. **Distribute App** → App Store Connect / TestFlight

## 3. Уведомления и геолокация

Уже добавлено в `Info.plist`:

- `NSUserNotificationsUsageDescription` — музаккир
- `NSLocationWhenInUseUsageDescription` — время намаза

## 4. Иконка

`npm run prepare:ios` кладёт `resources/icon.png` → `AppIcon-512@2x.png` (1024×1024).

## 5. Обновление версии

Перед каждым релизом в Xcode:

- **General → Version** (например 1.0.1)
- **General → Build** (+1)

Или в `ios/App/App.xcodeproj` → `MARKETING_VERSION` / `CURRENT_PROJECT_VERSION`.

## 6. Чеклист App Store

- [ ] Скриншоты iPhone 6.7" и 6.5"
- [ ] Описание на RU/EN
- [ ] Политика конфиденциальности (URL)
- [ ] TestFlight — тест на реальном iPhone
- [ ] Музаккир: разрешить уведомления при первом включении

## Команды

```bash
npm run prepare:ios   # подготовка без Xcode
npm run cap:ios       # открыть Xcode
```
