#!/usr/bin/env bash
# Deploy PWA to Oracle + build & publish APK (one command)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

HOST="${DEPLOY_HOST:-92.5.234.30}"

echo "=========================================="
echo "  Muzakkir — Web + APK deploy"
echo "=========================================="
echo ""

echo ">>> [0/3] App icons..."
node scripts/generate-icon-5bars.mjs

echo ""
echo ">>> [1/3] PWA + API (web)..."
bash scripts/deploy-oracle.sh

echo ""
echo ">>> [2/3] Android APK..."
bash scripts/deploy-apk.sh

echo ""
echo "=========================================="
echo "  All done!"
echo "  Web:  http://${HOST}/muzakkir/"
echo "  APK:  http://${HOST}/muzakkir/downloads/muzakkir.apk"
echo "  Page: http://${HOST}/muzakkir/download.html"
echo "=========================================="
