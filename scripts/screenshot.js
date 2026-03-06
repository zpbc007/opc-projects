import { chromium } from 'playwright';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(ROOT_DIR, 'images');

/**
 * Generate filename: YYYY-MM-DD-{001}.png
 */
function generateFilename() {
  const date = new Date().toISOString().split('T')[0];
  const files = fs.existsSync(OUTPUT_DIR) ? fs.readdirSync(OUTPUT_DIR) : [];
  const todayFiles = files.filter(f => f.startsWith(date) && f.endsWith('.png'));
  const nextId = todayFiles.length + 1;
  return `${date}-${String(nextId).padStart(3, '0')}.png`;
}

/**
 * Start Vite preview server
 */
function startServer() {
  return new Promise((resolve, reject) => {
    const server = spawn('npm', ['run', 'preview'], {
      cwd: ROOT_DIR,
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: true,
    });

    let output = '';
    const timeout = setTimeout(() => {
      // Fallback to default port after timeout
      resolve({ server, url: 'http://localhost:4173' });
    }, 5000);

    server.stdout.on('data', (data) => {
      output += data.toString();
      const match = output.match(/Local:\s*(https?:\/\/[^\s]+)/);
      if (match && !timeout._called) {
        clearTimeout(timeout);
        resolve({ server, url: match[1] });
      }
    });

    server.stderr.on('data', (data) => {
      const error = data.toString();
      if (error.includes('EADDRINUSE')) {
        clearTimeout(timeout);
        reject(new Error(`Port is already in use. Please close any running preview servers.`));
      }
    });

    server.on('error', (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

/**
 * Main screenshot function
 */
async function main() {
  console.log('\n📸 OPC Projects Screenshot Tool');
  console.log('================================\n');

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`📁 Created output directory: ${OUTPUT_DIR}`);
  }

  // Start server
  console.log('🚀 Starting Vite preview server...');
  const { server, url } = await startServer();
  console.log(`   Server running at: ${url}`);

  try {
    // Launch browser
    console.log('🌐 Launching browser...');
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({
      viewport: { width: 1920, height: 1080 },
    });

    // Navigate with screenshot mode
    console.log('📄 Loading page...');
    await page.goto(`${url}?screenshot=1`, { waitUntil: 'networkidle' });

    // Wait for content to render
    await page.waitForSelector('.project-list', { timeout: 10000 });
    await page.waitForTimeout(1000); // Extra wait for animations

    // Take screenshot
    const filename = generateFilename();
    const outputPath = path.join(OUTPUT_DIR, filename);

    console.log('📷 Taking screenshot...');
    await page.screenshot({
      path: outputPath,
      fullPage: false,
    });

    console.log(`\n✅ Screenshot saved: ${outputPath}\n`);

    await browser.close();
  } finally {
    // Cleanup: stop server
    console.log('🛑 Stopping server...');
    server.kill('SIGTERM');
  }
}

main().catch((err) => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});