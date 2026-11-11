import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const ssrDir = path.join(rootDir, 'dist-ssr');

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const result = {};
  const lines = fs.readFileSync(filePath, 'utf-8').split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const eqIndex = line.indexOf('=');
    if (eqIndex === -1) continue;

    const key = line.slice(0, eqIndex).trim();
    let value = line.slice(eqIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    result[key] = value;
  }

  return result;
}

function loadEnv() {
  const envFiles = [
    '.env',
    '.env.local',
    '.env.production',
    '.env.production.local'
  ];

  const merged = {};
  for (const file of envFiles) {
    Object.assign(merged, parseEnvFile(path.join(rootDir, file)));
  }

  for (const [key, value] of Object.entries(process.env)) {
    if (value !== undefined) {
      merged[key] = value;
    }
  }

  return merged;
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function prerender() {
  const templatePath = path.join(distDir, 'index.html');
  const ssrEntryPath = path.join(ssrDir, 'entry-server.js');

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Missing built client HTML at ${templatePath}`);
  }
  if (!fs.existsSync(ssrEntryPath)) {
    throw new Error(`Missing SSR bundle at ${ssrEntryPath}`);
  }

  const env = loadEnv();
  const template = fs.readFileSync(templatePath, 'utf-8');
  const { render } = await import(pathToFileURL(ssrEntryPath).href);
  const appHtml = render();

  if (!appHtml || typeof appHtml !== 'string') {
    throw new Error('SSR render() returned empty output');
  }

  const rootPattern = /<div\s+id=["']root["']\s*>\s*(?:<!--app-html-->)?\s*<\/div>/;
  if (!rootPattern.test(template)) {
    throw new Error('Could not find <div id="root"></div> mount point in dist/index.html');
  }

  let html = template.replace(rootPattern, () => `<div id="root">${appHtml}</div>`);

  // Верификация Search Console и Яндекс.Вебмастер из переменных окружения
  const verificationTags = [];
  const gscCode = (env.VITE_GSC_VERIFICATION || '').trim();
  const yandexCode = (env.VITE_YANDEX_VERIFICATION || '').trim();

  if (gscCode) {
    verificationTags.push(
      `<meta name="google-site-verification" content="${escapeAttr(gscCode)}" />`
    );
  }
  if (yandexCode) {
    verificationTags.push(
      `<meta name="yandex-verification" content="${escapeAttr(yandexCode)}" />`
    );
  }

  const verificationSnippet = verificationTags.join('\n    ');
  if (html.includes('<!--SITE_VERIFICATION_META-->')) {
    html = html.replace('<!--SITE_VERIFICATION_META-->', () => verificationSnippet);
  } else if (verificationSnippet) {
    html = html.replace('</head>', () => `    ${verificationSnippet}\n  </head>`);
  }

  // Опциональный <noscript> для Google Tag Manager при заданном валидном VITE_GTM_ID
  const gtmId = (env.VITE_GTM_ID || '').trim();
  const hasValidGtm = /^GTM-[A-Z0-9]+$/i.test(gtmId) && gtmId !== 'GTM-XXXXXXX';
  const gtmNoscript = hasValidGtm
    ? `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${escapeAttr(gtmId)}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`
    : '';

  if (html.includes('<!--GTM_NOSCRIPT-->')) {
    html = html.replace('<!--GTM_NOSCRIPT-->', () => gtmNoscript);
  }

  fs.writeFileSync(templatePath, html, 'utf-8');
  fs.rmSync(ssrDir, { recursive: true, force: true });

  console.log(
    `[prerender] Injected ${appHtml.length} chars into dist/index.html and cleaned dist-ssr`
  );
}

prerender().catch((err) => {
  console.error('[prerender] Failed:', err);
  process.exit(1);
});
