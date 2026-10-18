#!/usr/bin/env bash
# Prepare iOS project for Xcode archive (run on Mac with Xcode installed)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> iOS preflight..."

XCODE_DEV="/Applications/Xcode.app/Contents/Developer"
if [[ -d "$XCODE_DEV" ]]; then
  export DEVELOPER_DIR="$XCODE_DEV"
elif ! xcode-select -p 2>/dev/null | grep -q Xcode.app; then
  echo "⚠ Xcode not found. Install from App Store, then run:"
  echo "   sudo xcode-select -s /Applications/Xcode.app/Contents/Developer"
  echo ""
fi

if ! command -v pod >/dev/null 2>&1; then
  echo "⚠ CocoaPods not found. Install: brew install cocoapods"
  echo ""
fi

echo "==> Building web assets for iOS (no service worker)..."
NATIVE_BUILD=true npm run build

echo "==> Capacitor sync iOS..."
npx cap sync ios

if [[ -f "$ROOT/resources/icon.png" ]] && [[ -d "$ROOT/ios/App/App/Assets.xcassets/AppIcon.appiconset" ]]; then
  echo "==> Generating iOS app icon without alpha channel (1024x1024)..."
  ICONSET="$ROOT/ios/App/App/Assets.xcassets/AppIcon.appiconset"
  swift "$ROOT/scripts/remove-icon-alpha.swift" "$ROOT/resources/icon.png" "$ICONSET/AppIcon-512@2x.png"
  echo "✓ App icon updated (hasAlpha: no)"
fi

if command -v pod >/dev/null 2>&1 && [[ -n "${DEVELOPER_DIR:-}" || "$(xcode-select -p 2>/dev/null)" == *Xcode.app* ]]; then
  echo "==> pod install..."
  export LANG=en_US.UTF-8
  cd "$ROOT/ios/App"
  pod install
  cd "$ROOT"
  echo "✓ Pods installed"
else
  echo "⏭ Skipping pod install (need Xcode + CocoaPods)"
fi

echo ""
echo "=========================================="
echo "  iOS project ready at: ios/App/"
echo ""
echo "  Next steps (on Mac with Xcode):"
echo "  1. npm run cap:ios"
echo "  2. Select Team in Signing & Capabilities"
echo "  3. Product → Archive → Distribute"
echo "=========================================="
