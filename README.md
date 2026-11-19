# WP-Putki – verkkosivukonsepti (Hades Design)

Speculative redesign concept for **WP-Putki Oy** (LVI-urakointi ja -huolto, Joensuu) – **not the company's official
website**. Live demo: https://samijturunen01.github.io/wp-putki-demo/ (noindex, forms in demo mode).

Stack: React 19 · Vite 8 · TypeScript · Tailwind CSS 4 · React Router 7 · GSAP (core) · Lucide.
Every route is prerendered to static HTML for GitHub Pages (`scripts/prerender.mjs`).

```bash
npm ci
npm run dev        # http://127.0.0.1:5173/wp-putki-demo/
npm run build      # typecheck + build + prerender → dist/
npm run preview    # serve dist like GitHub Pages on :4331
npm test           # Playwright (needs a build; desktop + mobile)
npm run images     # rebuild WebP variants, logo SVGs, favicons, OG image (needs source-assets/)
node scripts/perf-lab.mjs http://127.0.0.1:4331/wp-putki-demo/   # lab LCP/CLS
```

Configuration: see `.env.example` (`VITE_FORM_MODE=demo` never sends data; `VITE_ALLOW_INDEXING=false`).

Documentation: `docs/PROJECT_STATUS.md` (start here), `docs/CONTENT_SOURCES.md`, `docs/CONVERSION_STRATEGY.md`,
`docs/REDESIGN_IMPROVEMENTS.md`, `docs/CONVERSION_MEASUREMENT.md`, `docs/ASSET_PROVENANCE.md`,
`docs/IMAGE_REPLACEMENT_LIST.md`.
