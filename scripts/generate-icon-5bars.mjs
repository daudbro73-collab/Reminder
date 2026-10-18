#!/usr/bin/env node
/**
 * Generate Muzakkir icon: 5 proportional ascending bars (no arrow).
 * Output: resources/icon.png, icon-foreground.png + all sizes via generate-app-icons.mjs
 */
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const svgPath = path.join(root, 'resources', 'icon.svg');
const svgFgPath = path.join(root, 'resources', 'icon-foreground.svg');
const pngPath = path.join(root, 'resources', 'icon.png');
const pngFgPath = path.join(root, 'resources', 'icon-foreground.png');

const SIZE = 1024;
const RADIUS = 224;

// Proportional bar heights 1:2:3:4:5
const BAR_COUNT = 5;
const BAR_RATIOS = [1, 2, 3, 4, 5];
const BAR_WIDTH = 88;
const BAR_GAP = 36;
const BAR_MAX_H = 440;
const BAR_MIN_H = Math.round((BAR_MAX_H * BAR_RATIOS[0]) / BAR_RATIOS[4]);
const BAR_BOTTOM = 780;

const heights = BAR_RATIOS.map((r) => Math.round((BAR_MAX_H * r) / BAR_RATIOS[4]));
const totalW = BAR_COUNT * BAR_WIDTH + (BAR_COUNT - 1) * BAR_GAP;
const startX = (SIZE - totalW) / 2;

const defs = `
  <defs>
    <linearGradient id="bg" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1b4332"/>
      <stop offset="55%" stop-color="#2d6a4f"/>
      <stop offset="100%" stop-color="#40916c"/>
    </linearGradient>
    <linearGradient id="barGrad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#74c69d"/>
      <stop offset="100%" stop-color="#d8f3dc"/>
    </linearGradient>
    <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0d2818" flood-opacity="0.25"/>
    </filter>
  </defs>`;

function barRects() {
  return heights
    .map((h, i) => {
      const x = startX + i * (BAR_WIDTH + BAR_GAP);
      const y = BAR_BOTTOM - h;
      const rx = BAR_WIDTH / 2;
      return `  <rect x="${x}" y="${y}" width="${BAR_WIDTH}" height="${h}" rx="${rx}" ry="${rx}"
    fill="url(#barGrad)" filter="url(#shadow)"/>`;
    })
    .join('\n');
}

const svgFull = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
${defs}
  <rect width="${SIZE}" height="${SIZE}" rx="${RADIUS}" ry="${RADIUS}" fill="url(#bg)"/>
${barRects()}
</svg>`;

const svgForeground = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
${defs}
${barRects()}
</svg>`;

mkdirSync(path.join(root, 'resources'), { recursive: true });
writeFileSync(svgPath, svgFull);
writeFileSync(svgFgPath, svgForeground);

function rasterize(svgFile, outPng) {
  if (process.platform === 'darwin') {
    try {
      execSync(`qlmanage -t -s ${SIZE} -o "${path.dirname(outPng)}" "${svgFile}"`, { stdio: 'pipe' });
      const rendered = `${svgFile}.png`;
      if (existsSync(rendered)) {
        execSync(`mv "${rendered}" "${outPng}"`);
        return true;
      }
    } catch {
      /* fallback */
    }
  }
  execSync(`rsvg-convert -w ${SIZE} -h ${SIZE} "${svgFile}" -o "${outPng}"`, { stdio: 'pipe' });
  return true;
}

rasterize(svgPath, pngPath);
rasterize(svgFgPath, pngFgPath);

console.log('✓ resources/icon.png (5 bars, no arrow)');
console.log('✓ resources/icon-foreground.png (adaptive foreground)');
execSync(`node "${path.join(__dirname, 'generate-app-icons.mjs')}"`, { stdio: 'inherit', cwd: root });
