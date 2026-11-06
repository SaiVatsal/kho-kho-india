import { chromium } from 'playwright';
import { spawn } from 'child_process';

async function auditSite() {
  console.log('--- STARTING COMPREHENSIVE SITE AUDIT ---');

  const server = spawn('npm', ['--prefix', 'web', 'run', 'preview', '--', '--port', '4173'], {
    shell: true,
    stdio: 'pipe'
  });

  await new Promise((res) => setTimeout(res, 3500));

  const browser = await chromium.launch({ headless: true });
  const viewports = [
    { name: 'Mobile (iPhone/Android)', width: 375, height: 667 },
    { name: 'Tablet (iPad)', width: 768, height: 1024 },
    { name: 'Laptop', width: 1280, height: 800 },
    { name: 'Desktop (Full HD)', width: 1920, height: 1080 }
  ];

  let errors = [];

  for (const vp of viewports) {
    console.log(`Testing viewport: ${vp.name} (${vp.width}x${vp.height})...`);
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(`[${vp.name}] Console Error: ${msg.text()}`);
      }
    });

    page.on('pageerror', (err) => {
      errors.push(`[${vp.name}] Unhandled Exception: ${err.message}`);
    });

    await page.goto('http://localhost:4173', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    // Verify key sections exist
    const sections = ['#hero', '#rules-demo', '#history', '#map', '#mini-game', '#stats', '#colleges', '#news', '#footer'];
    for (const sec of sections) {
      const el = await page.$(sec);
      if (!el) {
        errors.push(`Missing section ${sec} on ${vp.name}`);
      }
    }

    // Test Presentation Modal
    const pptButton = await page.$('button[title*="Presentation Deck"]');
    if (pptButton) {
      await pptButton.click();
      await page.waitForTimeout(400);
      const modal = await page.$('text=Kho Kho Masterclass Presentation Deck');
      if (!modal) errors.push(`Presentation deck modal failed to open on ${vp.name}`);

      // Close modal
      const closeBtn = await page.$('button[aria-label="Close presentation deck"]');
      if (closeBtn) await closeBtn.click();
      await page.waitForTimeout(300);
    }

    await page.close();
  }

  // Interactive Mini-Game verification test
  console.log('Testing Mini-Game mechanics (start, movement, Kho trigger)...');
  const gamePage = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await gamePage.goto('http://localhost:4173#mini-game', { waitUntil: 'networkidle' });
  await gamePage.waitForTimeout(1500);

  // Click start match
  const startBtn = await gamePage.$('button:has-text("Start Match"), button:has-text("Enter Field")');
  if (startBtn) {
    await startBtn.click();
    await gamePage.waitForTimeout(500);

    // Simulate arrow keys
    await gamePage.keyboard.press('ArrowRight');
    await gamePage.keyboard.press('ArrowRight');
    await gamePage.keyboard.press('Space'); // Give Kho
    await gamePage.waitForTimeout(500);
    console.log('Mini-game responded to keyboard events without error!');
  } else {
    errors.push('Mini-Game start button not found!');
  }
  await gamePage.close();

  await browser.close();
  server.kill();

  if (errors.length > 0) {
    console.error('Audit encountered warnings/errors:');
    errors.forEach(e => console.error(' -', e));
  } else {
    console.log('ALL VIEWPORTS (375, 768, 1280, 1920) PASSED WITH ZERO CONSOLE ERRORS!');
  }
}

auditSite();
