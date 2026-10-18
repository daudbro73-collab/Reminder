#!/usr/bin/env node
/**
 * Generate all app icons from resources/icon.png (1024×1024 source).
 * Usage: node scripts/generate-app-icons.mjs [source.png]
 */
import { existsSync, mkdirSync, copyFileSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const source = process.argv[2] || path.join(root, 'resources', 'icon.png');

if (!existsSync(source)) {
  console.error('Source icon not found:', source);
  process.exit(1);
}

mkdirSync(path.join(root, 'resources'), { recursive: true });
mkdirSync(path.join(root, 'public'), { recursive: true });

const master = path.join(root, 'resources', 'icon.png');
if (path.resolve(source) !== path.resolve(master)) {
  copyFileSync(source, master);
}

function resize(size, dest) {
  mkdirSync(path.dirname(dest), { recursive: true });
  execSync(`sips -z ${size} ${size} "${master}" --out "${dest}"`, { stdio: 'pipe' });
}

console.log('==> Generating icons from', master);

const webIcons = [
  [512, 'public/pwa-512.png'],
  [192, 'public/pwa-192.png'],
  [180, 'public/apple-touch-icon.png'],
  [32, 'public/favicon.png'],
];

for (const [size, rel] of webIcons) {
  const dest = path.join(root, rel);
  resize(size, dest);
  console.log(`  ✓ ${rel} (${size}px)`);
}

if (existsSync(path.join(root, 'android', 'app', 'src', 'main', 'res'))) {
  console.log('==> Android native icons...');
  execSync(`node "${path.join(__dirname, 'setup-native-icons.mjs')}"`, { stdio: 'inherit', cwd: root });
}

const iosIcon = path.join(root, 'ios', 'App', 'App', 'Assets.xcassets', 'AppIcon.appiconset', 'AppIcon-512@2x.png');
if (existsSync(path.dirname(iosIcon))) {
  resize(1024, iosIcon);
  console.log('  ✓ ios/AppIcon-512@2x.png');
}

console.log('\nDone. Rebuild: npm run build:pwa && npx cap copy ios android');
