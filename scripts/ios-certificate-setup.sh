#!/usr/bin/env bash
# Open Xcode and show iOS signing checklist (certificates via Apple ID)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WORKSPACE="$ROOT/ios/App/App.xcworkspace"

echo "=========================================="
echo "  Muzakkir — iOS сертификат и подпись"
echo "=========================================="
echo ""

if [[ ! -d "/Applications/Xcode.app" ]]; then
  echo "❌ Xcode не установлен. Установи из App Store."
  exit 1
fi

export DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer

echo "Текущие сертификаты на Mac:"
IDENTITIES=$(security find-identity -v -p codesigning 2>/dev/null | grep -c "valid identities" || true)
security find-identity -v -p codesigning 2>/dev/null | head -5 || echo "  (нет)"
echo ""

if security find-identity -v -p codesigning 2>/dev/null | grep -q "0 valid identities"; then
  echo "⚠ Сертификатов пока нет — Xcode создаст их автоматически после шага 2–3."
  echo ""
fi

cat << 'GUIDE'

── Шаг 1: Apple ID в Xcode ──────────────────────────
  Xcode → Settings (⌘,) → Accounts → «+» → Apple ID
  Войди своим Apple ID.

── Шаг 2: Apple Developer (для App Store / TestFlight) ─
  Нужна подписка $99/год:
  https://developer.apple.com/programs/enroll/

  Только тест на своём iPhone — можно бесплатный Personal Team
  (без публикации в App Store).

── Шаг 3: Подпись проекта ────────────────────────────
  1. Откроется App.xcworkspace
  2. Слева: App (синяя иконка) → TARGET App
  3. Вкладка «Signing & Capabilities»
  4. ✓ Automatically manage signing
  5. Team → выбери свой аккаунт / команду
  6. Bundle ID: com.muzakkir.app (уже настроен)

  Xcode сам создаст:
  • Apple Development (для симулятора и iPhone)
  • Apple Distribution (при первом Archive — для App Store)

── Шаг 4: Проверка на iPhone ─────────────────────────
  Подключи iPhone → выбери его вверху → ▶ Run

── Шаг 5: Archive → TestFlight ───────────────────────
  Product → Archive → Distribute App → App Store Connect

GUIDE

echo ""
echo "Открываю Xcode..."
open "$WORKSPACE"
