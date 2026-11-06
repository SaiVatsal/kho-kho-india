const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const cwd = process.cwd();
const webDir = path.join(cwd, 'web');

console.log('[Vercel Build Runner] Current directory:', cwd);

if (fs.existsSync(webDir) && fs.existsSync(path.join(webDir, 'package.json'))) {
  console.log('[Vercel Build Runner] Detected repository root. Installing and building web...');
  execSync('npm --prefix web install && npm --prefix web run build', { stdio: 'inherit' });

  const srcDist = path.join(webDir, 'dist');
  const targetDist = path.join(cwd, 'dist');
  if (fs.existsSync(srcDist)) {
    if (!fs.existsSync(targetDist)) {
      fs.mkdirSync(targetDist, { recursive: true });
    }
    fs.cpSync(srcDist, targetDist, { recursive: true });
    console.log('[Vercel Build Runner] Successfully prepared ./dist for Vercel deployment.');
  }
} else {
  console.log('[Vercel Build Runner] Already inside web directory. Running direct build...');
  execSync('npm run build', { stdio: 'inherit' });
}
