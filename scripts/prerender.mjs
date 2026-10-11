import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGE_SEO, SITE_URL, buildSeoHead } from '../src/seo.js';
import { render } from '../.vite-prerender/entry-server.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const routes = Object.keys(PAGE_SEO);

for (const route of routes) {
  const appHtml = render(route);
  const html = template
    .replace('<!--SEO_HEAD-->', buildSeoHead(route))
    .replace('<!--APP_HTML-->', appHtml);
  const outputDir = route === '/' ? dist : path.join(dist, route.slice(1));
  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, 'index.html'), html);
}

const urls = routes.map(route => {
  const location = `${SITE_URL}${route === '/' ? '/' : `${route}/`}`;
  const image = route === '/company/team'
    ? `<image:image><image:loc>${SITE_URL}/images/roy-chumba.webp</image:loc><image:title>Roy Chumba, founder of Connex Technologies</image:title></image:image>`
    : '';
  return `<url><loc>${location}</loc>${image}</url>`;
}).join('\n  ');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n  ${urls}\n</urlset>\n`;
await writeFile(path.join(dist, 'sitemap.xml'), sitemap);
await writeFile(path.join(dist, '404.html'), `<!doctype html>
<html lang="en-KE"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>Page not found | Connex Technologies</title><style>body{margin:0;background:#0a0a0b;color:#f2f1ec;font:18px/1.6 Arial,sans-serif;display:grid;min-height:100vh;place-items:center}main{max-width:600px;padding:32px}p{color:#a7a6a0}a{color:#f2f1ec}</style></head><body><main><p>CONNEX TECHNOLOGIES · KENYA</p><h1>This page could not be found.</h1><p>The address may have changed, or the page may no longer be available.</p><a href="/">Return to Connex Technologies</a></main></body></html>`);
await rm(path.join(root, '.vite-prerender'), { recursive: true, force: true });
