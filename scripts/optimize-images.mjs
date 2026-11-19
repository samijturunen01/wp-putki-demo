/**
 * Builds responsive WebP variants of the photographs (scripts/photo-manifest.mjs) into
 * public/images/p/, the social share image, favicons and logo SVG files, and writes the
 * intrinsic sizes to src/data/photoSizes.json (width/height attributes → no layout shift).
 *
 * Usage: node scripts/optimize-images.mjs [--force]
 */
import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'
import { photos } from './photo-manifest.mjs'

const SRC = 'source-assets'
const OUT = 'public/images/p'
const WIDTHS = [480, 960, 1600]
const force = process.argv.includes('--force')
await fs.mkdir(OUT, { recursive: true })

const sizes = {}
for (const [key, { file }] of Object.entries(photos)) {
  const meta = await sharp(path.join(SRC, file)).metadata()
  const portrait = (meta.orientation ?? 1) >= 5
  const w = portrait ? meta.height : meta.width
  const h = portrait ? meta.width : meta.height
  const widths = WIDTHS.filter((x) => x < w * 0.98)
  widths.push(Math.min(w, 2000))
  const uniq = [...new Set(widths)].sort((a, b) => a - b)
  for (const width of uniq) {
    const out = path.join(OUT, `${key}-${width}.webp`)
    if (!force && (await fs.stat(out).catch(() => null))) continue
    await sharp(path.join(SRC, file))
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: width <= 480 ? 72 : 78, effort: 5, smartSubsample: true })
      .toFile(out)
  }
  sizes[key] = { w, h, widths: uniq }
}
await fs.writeFile('src/data/photoSizes.json', JSON.stringify(sizes, null, 1) + '\n')

// ---- Logo files (recreated vector, see src/components/brand/logo.json) --------------------------
const L = JSON.parse(await fs.readFile('src/components/brand/logo.json', 'utf8'))
const logoSvg = ({ bg, text = '#ffffff', viewBox = L.viewBox, mark = false, pad = 0 } = {}) => {
  const [x, y, w, h] = viewBox.split(' ').map(Number)
  const vb = `${x - pad} ${y - pad} ${w + pad * 2} ${h + pad * 2}`
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}"${bg ? '' : ''}>
${bg ? `<rect x="${x - pad}" y="${y - pad}" width="${w + pad * 2}" height="${h + pad * 2}" fill="${bg}"/>` : ''}
<g fill="none" stroke="${L.cyan}" stroke-width="${L.markStroke}" stroke-linecap="round" stroke-linejoin="round"><path d="${L.W}"/><path d="${L.P}"/></g>
<path d="${L.pill}" stroke="${text}" stroke-width="${L.pillStroke}" stroke-linecap="round"/>
${mark ? '' : `<g fill="none" stroke="${text}" stroke-width="${L.textStroke}" stroke-linecap="round" stroke-linejoin="round">${L.putki.map((d) => `<path d="${d}"/>`).join('')}</g>`}
</svg>
`
}
await fs.mkdir('public/brand', { recursive: true })
await fs.writeFile('public/brand/wp-putki-logo.svg', logoSvg({ bg: '#000000', pad: 30 }))
await fs.writeFile('public/brand/wp-putki-logo-transparent.svg', logoSvg({}))
await fs.writeFile('public/brand/wp-putki-logo-light-bg.svg', logoSvg({ text: '#061018' }))
await fs.writeFile('public/brand/wp-putki-mark.svg', logoSvg({ viewBox: L.markViewBox, mark: true }))

// ---- Social share image (1200×630): authentic fleet photo + recreated logo --------------------
const photo = await sharp(path.join(SRC, photos.fleet.file)).rotate().resize(760, 630, { fit: 'cover', position: 'left' }).toBuffer()
const panel = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#061018"/><stop offset="0.86" stop-color="#061018"/><stop offset="1" stop-color="#061018" stop-opacity="0"/></linearGradient></defs>
  <rect width="560" height="630" fill="url(#g)"/>
  <path d="M60 470 H200" stroke="#05AEF0" stroke-width="4" stroke-linecap="round"/>
  <text x="60" y="520" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700" fill="#f1f5f7">LVI-työt Joensuussa</text>
  <text x="60" y="560" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#a3b4c2">Lämpö · Vesi · Ilma · Asbesti – vuodesta 1989</text>
</svg>`)
const logoPng = await sharp(Buffer.from(logoSvg({}))).resize({ width: 300 }).png().toBuffer()
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#061018' } })
  .composite([
    { input: photo, left: 440, top: 0 },
    { input: panel, left: 0, top: 0 },
    { input: logoPng, left: 52, top: 110 },
  ])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile('public/images/og-wp-putki.jpg')

// ---- Favicons: the WP mark on night blue --------------------------------------------------------
const icon = (size, radius) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="${radius}" fill="#061018"/>
  <svg x="8" y="24" width="84" height="52" viewBox="${L.markViewBox}" preserveAspectRatio="xMidYMid meet">
    <g fill="none" stroke="${L.cyan}" stroke-width="${L.markStroke * 1.35}" stroke-linecap="round" stroke-linejoin="round"><path d="${L.W}"/><path d="${L.P}"/></g>
  </svg>
</svg>`)
await sharp(icon(32, 20)).png().toFile('public/favicon-32.png')
await sharp(icon(192, 22)).png().toFile('public/icon-192.png')
await sharp(icon(180, 0)).png().toFile('public/apple-touch-icon.png')
await fs.writeFile('public/favicon.svg', icon(64, 20))

console.log(`Optimised ${Object.keys(photos).length} photos → ${OUT}`)
