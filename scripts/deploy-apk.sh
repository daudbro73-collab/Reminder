#!/usr/bin/env bash
# Build APK and publish for download.
# Default: build on Oracle server (low-memory Gradle settings).
# Optional: BUILD_APK_LOCALLY=1 if Java + ANDROID_HOME are installed on this Mac.
set -euo pipefail

SERVER_HOST="${DEPLOY_HOST:-92.5.234.30}"
SERVER_USER="${DEPLOY_USER:-ubuntu}"
SSH_KEY="${DEPLOY_KEY:-$HOME/Desktop/ssh-key-2026-06-26.key}"
REMOTE_DIR="/var/www/muzakkir"
BUILD_DIR="/tmp/muzakkir-build"
ANDROID_SDK="/opt/android-sdk"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

chmod 600 "$SSH_KEY"

echo "==> Regenerating app icons..."
node scripts/generate-icon-5bars.mjs

echo "==> Native web build + cap sync android..."
NATIVE_BUILD=true npx vite build
npx cap sync android

APK_OUT="android/app/build/outputs/apk/debug/app-debug.apk"

build_apk_locally() {
  if [[ "${BUILD_APK_LOCALLY:-}" != "1" ]]; then
    return 1
  fi
  if ! command -v java >/dev/null 2>&1; then
    echo "Local build skipped: Java not installed"
    return 1
  fi
  local sdk="${ANDROID_HOME:-${ANDROID_SDK_ROOT:-}}"
  if [[ -z "$sdk" || ! -d "$sdk" ]]; then
    echo "Local build skipped: ANDROID_HOME not set"
    return 1
  fi

  echo "==> Building APK locally..."
  (
    cd android
    chmod +x gradlew
    ./gradlew --stop 2>/dev/null || true
    ./gradlew clean assembleDebug --no-daemon
  )
  [[ -f "$APK_OUT" ]]
}

upload_apk() {
  local apk_path="$1"
  echo "==> Uploading APK to server..."
  ssh -i "$SSH_KEY" -o StrictHostKeyChecking=accept-new "${SERVER_USER}@${SERVER_HOST}" \
    "sudo mkdir -p ${REMOTE_DIR}/dist/downloads && sudo chown -R ubuntu:ubuntu ${REMOTE_DIR}/dist/downloads"
  rsync -avz \
    -e "ssh -i ${SSH_KEY} -o StrictHostKeyChecking=accept-new" \
    "$apk_path" "${SERVER_USER}@${SERVER_HOST}:${REMOTE_DIR}/dist/downloads/muzakkir.apk"
  if [[ -f dist/download.html ]]; then
    rsync -avz \
      -e "ssh -i ${SSH_KEY} -o StrictHostKeyChecking=accept-new" \
      dist/download.html "${SERVER_USER}@${SERVER_HOST}:${REMOTE_DIR}/dist/download.html"
  fi
  ssh -i "$SSH_KEY" -o StrictHostKeyChecking=accept-new "${SERVER_USER}@${SERVER_HOST}" \
    "ls -lh ${REMOTE_DIR}/dist/downloads/muzakkir.apk"
}

if build_apk_locally; then
  upload_apk "$APK_OUT"
else
  echo "==> Uploading build sources for server-side APK build..."
  ssh -i "${SSH_KEY}" -o StrictHostKeyChecking=accept-new "${SERVER_USER}@${SERVER_HOST}" \
    "mkdir -p ${BUILD_DIR} && rm -rf ${BUILD_DIR}/android ${BUILD_DIR}/dist ${BUILD_DIR}/node_modules ${BUILD_DIR}/package.json ${BUILD_DIR}/package-lock.json 2>/dev/null; mkdir -p ${BUILD_DIR}/android ${BUILD_DIR}/dist"
  rsync -avz \
    -e "ssh -i ${SSH_KEY} -o StrictHostKeyChecking=accept-new" \
    "$ROOT/android/" "${SERVER_USER}@${SERVER_HOST}:${BUILD_DIR}/android/"
  rsync -avz \
    -e "ssh -i ${SSH_KEY} -o StrictHostKeyChecking=accept-new" \
    "$ROOT/package.json" "$ROOT/package-lock.json" \
    "${SERVER_USER}@${SERVER_HOST}:${BUILD_DIR}/"
  rsync -avz \
    -e "ssh -i ${SSH_KEY} -o StrictHostKeyChecking=accept-new" \
    "$ROOT/dist/" "${SERVER_USER}@${SERVER_HOST}:${BUILD_DIR}/dist/"

  echo "==> Building APK on server (low-memory mode)..."
  ssh -i "$SSH_KEY" -o StrictHostKeyChecking=accept-new "${SERVER_USER}@${SERVER_HOST}" \
    "REMOTE_DIR='${REMOTE_DIR}' BUILD_DIR='${BUILD_DIR}' ANDROID_SDK='${ANDROID_SDK}' bash -s" << 'REMOTE'
set -euo pipefail

REMOTE_DIR="${REMOTE_DIR:-/var/www/muzakkir}"
BUILD_DIR="${BUILD_DIR:-/tmp/muzakkir-build}"
ANDROID_SDK="${ANDROID_SDK:-/opt/android-sdk}"

# Swap for Gradle on 1GB RAM instances (4G)
if ! swapon --show | grep -q swapfile; then
  sudo fallocate -l 4G /swapfile 2>/dev/null || sudo dd if=/dev/zero of=/swapfile bs=1M count=4096
  sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile
  grep -q swapfile /etc/fstab || echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
fi

if ! command -v java >/dev/null 2>&1 || ! java -version 2>&1 | grep -qE '21|17'; then
  sudo apt-get update -qq
  sudo apt-get install -y openjdk-21-jdk
fi

export JAVA_HOME="${JAVA_HOME:-/usr/lib/jvm/java-21-openjdk-amd64}"
export PATH="$JAVA_HOME/bin:$PATH"
export GRADLE_OPTS="-Xmx512m -XX:MaxMetaspaceSize=256m -XX:+UseSerialGC -Dorg.gradle.daemon=false -Dkotlin.daemon.jvm.options=-Xmx256m"

if [[ ! -x "$ANDROID_SDK/cmdline-tools/latest/bin/sdkmanager" ]]; then
  sudo mkdir -p "$ANDROID_SDK/cmdline-tools"
  TMP=$(mktemp -d)
  cd "$TMP"
  wget -q https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip
  unzip -q commandlinetools-linux-11076708_latest.zip
  sudo rm -rf "$ANDROID_SDK/cmdline-tools/latest"
  sudo mv cmdline-tools "$ANDROID_SDK/cmdline-tools/latest"
  sudo chown -R ubuntu:ubuntu "$ANDROID_SDK"
  cd /
  rm -rf "$TMP"
fi

export ANDROID_HOME="$ANDROID_SDK"
export PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$PATH"

if [[ ! -d "$ANDROID_SDK/platforms/android-35" ]]; then
  yes | sdkmanager --licenses >/dev/null 2>&1 || true
  sdkmanager "platform-tools" "platforms;android-35" "build-tools;35.0.0"
fi

cd "$BUILD_DIR"
echo "Disk:" && df -h /tmp / | tail -2
echo "Memory:" && free -h

rm -rf node_modules android/.gradle android/app/build android/build
npm ci

KEYBOARD_SRC="node_modules/@capacitor/keyboard/android/src/main/java/com/capacitorjs/plugins/keyboard/KeyboardPlugin.java"
if [[ ! -s "$KEYBOARD_SRC" ]]; then
  echo "Capacitor keyboard sources missing or empty — reinstalling node_modules"
  rm -rf node_modules
  npm ci
fi
test -s "$KEYBOARD_SRC" || { echo "ERROR: $KEYBOARD_SRC not found"; exit 1; }

rm -rf android/app/src/main/assets/public
mkdir -p android/app/src/main/assets/public
cp -a dist/. android/app/src/main/assets/public/

cd android
chmod +x gradlew
./gradlew --stop 2>/dev/null || true

# Low-memory Gradle/Kotlin settings for 1GB VPS
if grep -q 'org.gradle.jvmargs' gradle.properties; then
  sed -i 's/^org.gradle.jvmargs=.*/org.gradle.jvmargs=-Xmx512m -XX:MaxMetaspaceSize=256m -XX:+UseSerialGC/' gradle.properties
else
  echo 'org.gradle.jvmargs=-Xmx512m -XX:MaxMetaspaceSize=256m -XX:+UseSerialGC' >> gradle.properties
fi
grep -q '^org.gradle.daemon=' gradle.properties && sed -i 's/^org.gradle.daemon=.*/org.gradle.daemon=false/' gradle.properties || echo 'org.gradle.daemon=false' >> gradle.properties
grep -q '^org.gradle.parallel=' gradle.properties && sed -i 's/^org.gradle.parallel=.*/org.gradle.parallel=false/' gradle.properties || echo 'org.gradle.parallel=false' >> gradle.properties
grep -q '^org.gradle.workers.max=' gradle.properties && sed -i 's/^org.gradle.workers.max=.*/org.gradle.workers.max=1/' gradle.properties || echo 'org.gradle.workers.max=1' >> gradle.properties
grep -q '^kotlin.incremental=' gradle.properties && sed -i 's/^kotlin.incremental=.*/kotlin.incremental=false/' gradle.properties || echo 'kotlin.incremental=false' >> gradle.properties

./gradlew clean assembleDebug --no-daemon --max-workers=1

APK=app/build/outputs/apk/debug/app-debug.apk
test -f "$APK" || { echo "APK not produced"; exit 1; }

sudo mkdir -p "$REMOTE_DIR/dist/downloads"
sudo cp "$APK" "$REMOTE_DIR/dist/downloads/muzakkir.apk"
sudo cp "$BUILD_DIR/dist/download.html" "$REMOTE_DIR/dist/download.html" 2>/dev/null || true
sudo chown -R ubuntu:ubuntu "$REMOTE_DIR/dist/downloads" "$REMOTE_DIR/dist/download.html" 2>/dev/null || true
ls -lh "$REMOTE_DIR/dist/downloads/muzakkir.apk"
REMOTE
fi

echo ""
echo "=========================================="
echo "  APK ready!"
echo "  http://${SERVER_HOST}/downloads/muzakkir.apk"
echo "  http://${SERVER_HOST}/download.html"
echo "=========================================="
