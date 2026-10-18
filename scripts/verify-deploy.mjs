#!/usr/bin/env node
import { existsSync, statSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, '..', 'dist');

const required = [
  'index.html',
  'manifest.webmanifest',
  'sw.js',
  'registerSW.js',
  'pwa-192.png',
  'pwa-512.png',
  'favicon.png',
];

let ok = true;

if (!existsSync(dist)) {
  console.error('✗ dist/ not found — run: npm run build:pwa');
  process.exit(1);
}

for (const file of required) {
  const p = path.join(dist, file);
  if (!existsSync(p)) {
    console.error(`✗ missing dist/${file}`);
    ok = false;
  } else {
    const kb = (statSync(p).size / 1024).toFixed(1);
    console.log(`✓ dist/${file} (${kb} KB)`);
  }
}

const assetsDir = path.join(dist, 'assets');
if (!existsSync(assetsDir)) {
  console.error('✗ missing dist/assets/');
  ok = false;
} else {
  console.log('✓ dist/assets/');
}

if (!ok) {
  console.error('\nPWA deploy check failed.');
  process.exit(1);
}

console.log('\nPWA ready to deploy — upload dist/ to HTTPS hosting.');
