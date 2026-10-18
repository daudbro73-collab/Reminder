#!/usr/bin/env node
/**
 * Copy resources/icon.png into Android mipmap folders after `npx cap add android`.
 * Usage: node scripts/setup-native-icons.mjs
 */
import { existsSync, mkdirSync, copyFileSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const source = path.join(root, 'resources', 'icon.png');
const foregroundSource = path.join(root, 'resources', 'icon-foreground.png');
const androidRes = path.join(root, 'android', 'app', 'src', 'main', 'res');

const sizes = {
  'mipmap-mdpi': 48,
  'mipmap-hdpi': 72,
  'mipmap-xhdpi': 96,
  'mipmap-xxhdpi': 144,
  'mipmap-xxxhdpi': 192,
};

if (!existsSync(source)) {
  console.error('Missing resources/icon.png');
  process.exit(1);
}

const fgSource = existsSync(foregroundSource) ? foregroundSource : source;

if (!existsSync(androidRes)) {
  console.error('Android project not found. Run: npx cap add android');
  process.exit(1);
}

for (const [folder, size] of Object.entries(sizes)) {
  const dir = path.join(androidRes, folder);
  mkdirSync(dir, { recursive: true });
  const dest = path.join(dir, 'ic_launcher.png');
  execSync(`sips -z ${size} ${size} "${source}" --out "${dest}"`, { stdio: 'inherit' });
  const round = path.join(dir, 'ic_launcher_round.png');
  copyFileSync(dest, round);
  const foreground = path.join(dir, 'ic_launcher_foreground.png');
  execSync(`sips -z ${size} ${size} "${fgSource}" --out "${foreground}"`, { stdio: 'inherit' });
  console.log(`✓ ${folder}/ic_launcher + foreground (${size}px)`);
}

const drawable = path.join(androidRes, 'drawable');
mkdirSync(drawable, { recursive: true });
execSync(`sips -z 24 24 "${fgSource}" --out "${path.join(drawable, 'ic_stat_icon.png')}"`, {
  stdio: 'inherit',
});
console.log('✓ drawable/ic_stat_icon.png');

console.log('Native Android icons ready.');
