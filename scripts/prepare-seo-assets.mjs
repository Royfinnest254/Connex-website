import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imageDir = path.join(root, 'public', 'images');
await mkdir(imageDir, { recursive: true });

const portrait = path.join(root, 'src', 'assets', 'images', 'roy.png');
const portraitOut = path.join(imageDir, 'roy-chumba.webp');
await sharp(portrait).rotate().resize({ width: 784, height: 860, fit: 'inside', withoutEnlargement: true }).webp({ quality: 82 }).toFile(portraitOut);

const base = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#0a0a0b"/><stop offset="1" stop-color="#202024"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <path d="M780 0h420v630H780c70-100 106-207 106-315S850 100 780 0Z" fill="#141417"/>
  <rect x="96" y="86" width="8" height="458" fill="#c09e5a"/>
  <text x="136" y="154" fill="#c09e5a" font-family="Arial,sans-serif" font-size="24" font-weight="700" letter-spacing="5">CONNEX TECHNOLOGIES</text>
  <text x="136" y="280" fill="#f2f1ec" font-family="Arial,sans-serif" font-size="54" font-weight="700">Payment coordination</text>
  <text x="136" y="350" fill="#f2f1ec" font-family="Arial,sans-serif" font-size="54" font-weight="700">infrastructure for Kenya</text>
  <text x="136" y="432" fill="#a7a6a0" font-family="Arial,sans-serif" font-size="25">Data completeness. Verifiable handoffs.</text>
  <text x="136" y="520" fill="#a7a6a0" font-family="Arial,sans-serif" font-size="20">connextechnologies.org</text>
</svg>`;

const companyOg = await sharp(Buffer.from(base)).png().toBuffer();
await sharp(companyOg).png().toFile(path.join(root, 'public', 'og-image.png'));

const profileBackground = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="bg" x2="1"><stop stop-color="#0a0a0b"/><stop offset="1" stop-color="#202024"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="560" height="630" fill="#101012"/>
  <rect x="96" y="86" width="8" height="458" fill="#c09e5a"/>
  <text x="136" y="154" fill="#c09e5a" font-family="Arial,sans-serif" font-size="24" font-weight="700" letter-spacing="5">CONNEX TECHNOLOGIES</text>
  <text x="136" y="300" fill="#f2f1ec" font-family="Arial,sans-serif" font-size="58" font-weight="700">Roy Chumba</text>
  <text x="136" y="360" fill="#a7a6a0" font-family="Arial,sans-serif" font-size="28">Founder and CEO</text>
  <text x="136" y="444" fill="#a7a6a0" font-family="Arial,sans-serif" font-size="24">Building payment coordination</text>
  <text x="136" y="480" fill="#a7a6a0" font-family="Arial,sans-serif" font-size="24">infrastructure in Kenya.</text>
</svg>`);

const portraitLayer = await sharp(portrait)
  .rotate()
  .resize(640, 630, { fit: 'cover', position: 'attention' })
  .png()
  .toBuffer();
await sharp(profileBackground)
  .composite([{ input: portraitLayer, left: 560, top: 0 }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(path.join(imageDir, 'roy-chumba-profile-og.jpg'));
