#!/usr/bin/env node
/**
 * Pre-flight checks before APK build.
 */
import { existsSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
let ok = true;

function check(label, pass, hint) {
  if (pass) console.log(`✓ ${label}`);
  else {
    console.error(`✗ ${label}`);
    if (hint) console.error(`  → ${hint}`);
    ok = false;
  }
}

check('android/ project', existsSync(path.join(root, 'android')), 'npm run cap:add:android');
check('resources/icon.png', existsSync(path.join(root, 'resources', 'icon.png')));

try {
  const java = execSync('java -version 2>&1', { encoding: 'utf8' });
  check('Java runtime', /version/i.test(java), 'Install JDK 17: brew install openjdk@17');
} catch {
  check('Java runtime', false, 'Install JDK 17: brew install openjdk@17');
}

const sdk = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT;
check(
  'Android SDK',
  Boolean(sdk && existsSync(sdk)),
  'Install Android Studio and set ANDROID_HOME'
);

if (!ok) {
  console.error('\nAPK build prerequisites missing. See DEPLOY.md');
  process.exit(1);
}

console.log('\nReady for: npm run build:apk:debug');
