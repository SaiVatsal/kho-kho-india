import { chromium } from 'playwright';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const screenshotsDir = path.join(rootDir, 'screenshots');

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function run() {
  console.log('Starting preview server on port 4173...');
  const server = spawn('npm', ['--prefix', 'web', 'run', 'preview', '--', '--port', '4173'], {
    shell: true,
    stdio: 'pipe'
  });

  // Wait 3.5s for server to start
  await new Promise((res) => setTimeout(res, 3500));

  console.log('Launching headless Chromium browser (1920x1080)...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();

  try {
    console.log('Navigating to http://localhost:4173 ...');
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle', timeout: 30000 });

    // Wait for initial loader to complete (approx 1.2s)
    await page.waitForTimeout(2500);

    // 1. Hero Screenshot
    console.log('Capturing Hero 3D view...');
    await page.screenshot({ path: path.join(screenshotsDir, 'hero.png') });

    // 2. Rules Demo Screenshot
    console.log('Capturing Rules Demo...');
    const rulesEl = await page.$('#rules-demo');
    if (rulesEl) {
      await rulesEl.scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      await rulesEl.screenshot({ path: path.join(screenshotsDir, 'rules.png') });
    }

    // 3. Timeline Screenshot
    console.log('Capturing History Timeline...');
    const timelineEl = await page.$('#history');
    if (timelineEl) {
      await timelineEl.scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      await timelineEl.screenshot({ path: path.join(screenshotsDir, 'timeline.png') });
    }

    // 4. India Map Screenshot
    console.log('Capturing India Map...');
    const mapEl = await page.$('#map');
    if (mapEl) {
      await mapEl.scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      await mapEl.screenshot({ path: path.join(screenshotsDir, 'map.png') });
    }

    // 5. Mini Game Screenshot
    console.log('Capturing Mini-Game Arena...');
    const gameEl = await page.$('#mini-game');
    if (gameEl) {
      await gameEl.scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      await gameEl.screenshot({ path: path.join(screenshotsDir, 'game.png') });
    }

    // 6. Stats & Stars Screenshot
    console.log('Capturing Stats & Legends...');
    const statsEl = await page.$('#stats');
    if (statsEl) {
      await statsEl.scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      await statsEl.screenshot({ path: path.join(screenshotsDir, 'stats.png') });
    }

    // 7. Colleges & KLU Spotlight
    console.log('Capturing KLU & College Athletes Roster...');
    const colEl = await page.$('#colleges');
    if (colEl) {
      await colEl.scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      await colEl.screenshot({ path: path.join(screenshotsDir, 'colleges.png') });
    }

    console.log('All screenshots captured successfully into /screenshots/ !');
  } catch (err) {
    console.error('Error during screenshot capture:', err);
  } finally {
    await browser.close();
    server.kill();
    process.exit(0);
  }
}

run();
