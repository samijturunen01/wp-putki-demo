# Project status – WP-Putki redesign concept (Hades Design)

_Last updated: 2026-11-19_

## Target
- **Company:** WP-Putki Oy (Y-tunnus 0761869-8), LVI-urakointi ja -huolto, Ukkolantie 25, 80130 Joensuu
- **Original website:** https://www.wp-putki.fi/
- **Brief:** `C:\VERKKOSIVUT\Prompt.md` (Hades Design Conversion First Master Prompt v2.0 – do not modify). Target URL override: https://www.wp-putki.fi/
- **Additional user instructions:** none beyond the master prompt.

## Repository & deployment
- Repo: `samijturunen01/wp-putki-demo` (public) – https://github.com/samijturunen01/wp-putki-demo
- Live demo: https://samijturunen01.github.io/wp-putki-demo/ (GitHub Actions → Pages on every push to `main`)
- Deployment: first deploy 2026-11-19, CI green (lint, build, 93 Playwright tests); live site verified with `LIVE_URL=https://samijturunen01.github.io npx playwright test` → 93 passed, 3 skipped
- Local preview port: **4331** (`node scripts/serve-dist.mjs 4331`)
- Git identity (repo-local): `samijturunen01 <308068629+samijturunen01@users.noreply.github.com>`

## Conversion strategy (summary – see CONVERSION_STRATEGY.md)
Primary goal: qualified request (form *tarjouspyyntö / työtilaus*) or tap-to-call to the work-order line 040 034 1377.
Secondary: direct calls to named specialists, service pages, directions, Google reviews.
Key differentiators: since 1989 · lämpö + vesi + ilma + asbesti/haitta-aineet from one contractor · named contacts.

## Creative direction – "Linjassa"
- The logo is one unbroken line drawn like a pipe run; the site uses the language of an LVI drawing: night-blue
  drafting surfaces (`ink` #061018 + blueprint grid), the logo cyan #05AEF0 as the flow line, rounded pipe bends,
  valve symbols (⋈) as markers, supply/return colour coding (heat = ember #FF7247, water = cyan, air = light cyan,
  asbestos = warning yellow #FFC845).
- Type: **Unbounded** (display), **Figtree** (body), **Geist Mono** (drawing labels). Not used in earlier demos.
- Signature motion: **"Painekoe"** homepage intro (GSAP) – the recreated WP mark is laid as a pipe with a bright flow
  front, the P closes its loop, the white indicator lights, PUTKI draws, one water pulse runs through (~2.8 s,
  non-blocking, every full load/refresh, not after in-app navigation, never with reduced motion).
- Second signature interaction: **"Nousulinja"** – services hang off one riser that fills with the service colours
  while scrolling; each valve turns open when the flow reaches it.
- Third: **"Kenelle soitan?"** router (tabs pattern) – picks the right named contact for the situation.

## Pages
`/` · `/palvelut` · `/palvelut/lampo` · `/palvelut/vesi` · `/palvelut/ilma` · `/palvelut/asbesti` · `/urakointi` ·
`/yritys` · `/yhteystiedot` (form `#tarjouspyynto`, map `#kartta`, invoicing `#laskutus`) · branded `404.html`.

## Completed
- Research, content verification, competitor scan (docs/CONTENT_SOURCES.md)
- Logo recreated as stroke SVG from the authentic PNG (src/components/brand/logo.json), favicons, OG image
- All pages, prerendering with per-route meta + JSON-LD, sitemap, robots (noindex demo)
- 3-step request form with URL preselection (`?aihe=urakka|huolto|asbesti|muu&ala=lampo|vesi|ilma|asbesti`), demo adapter
- Click-to-load Google Map + directions, mobile action bar, scroll manager (top on nav, restore on back/forward, anchors)
- Playwright suite (pages, navigation, intro, features, axe) – desktop + mobile projects
- Docs: CONTENT_SOURCES, REDESIGN_IMPROVEMENTS, CONVERSION_STRATEGY, CONVERSION_MEASUREMENT, ASSET_PROVENANCE, IMAGE_REPLACEMENT_LIST

## Testing status (local, 2026-11-19)
- `tsc -b` ✔ · `eslint .` ✔ · `npm run build` ✔ (10 routes prerendered)
- Playwright: 96 tests (desktop + mobile projects) – 93 passed, 3 skipped (desktop-only / mobile-only cases)
- axe-core WCAG 2.0/2.1/2.2 A/AA: no serious/critical violations on any route (automated only)
- Lab perf (scripts/perf-lab.mjs, throttled 1.6 Mbps/150 ms; mobile 4× CPU): LCP 1.6–2.0 s mobile, 1.4–1.7 s desktop, CLS 0. Lab data, not field data.
- Viewports inspected: 360, 390, 1440 (screenshots); 768/1024 covered by responsive breakpoints

## Known issues / notes
- Windows: run builds/tests from PowerShell with an upper-case `C:\` cwd (vite.config.ts normalises the drive letter).
- JS bundle ≈ 143 kB gzip (React + Router + GSAP core); acceptable, could lazy-load GSAP if needed.
- No verified Google rating → only a link to Google reviews.

## Asset permissions
Authentic logo and company photos: authorised by the user (master prompt §8). Stock: Pexels licence, labelled
"Kuvituskuva". Details in ASSET_PROVENANCE.md.

## Remaining for production (if the customer buys)
Confirm open items in CONTENT_SOURCES.md (phone number, hours, store, feedback origin, founding year display),
original vector logo, authentic service photos (IMAGE_REPLACEMENT_LIST.md), Apps Script + reCAPTCHA form backend,
privacy policy, consent + analytics, domain/DNS/HTTPS, canonical/indexing (`VITE_ALLOW_INDEXING=true`, `SITE_URL`,
`VITE_BASE_PATH=/`).

## Next recommended action
Present the live demo to WP-Putki; collect confirmations listed above and 4–6 authentic job photos.
