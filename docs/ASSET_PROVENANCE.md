# Asset provenance

Publication permission: the user (Hades Design) confirmed in the master prompt that the target company's original
logo, branding and authorised company photographs may be used and published in this demo (GitHub repo + Pages).
Originals live in `source-assets/` (git-ignored); optimised WebP variants are built into `public/images/p/` by
`npm run images` (`scripts/optimize-images.mjs`, manifest `scripts/photo-manifest.mjs`).

## Brand

| Local file | Source | Notes | Rights |
|---|---|---|---|
| `src/components/brand/logo.json`, `Logo.tsx`, `public/brand/wp-putki-*.svg` | Recreated from https://www.wp-putki.fi/wp-content/uploads/2024/09/cropped-wp-putki-logo.png (512×512) | Centre-line geometry measured from the bitmap and drawn as round-capped strokes (W and P are each one continuous line; white indicator pill; rounded "PUTKI"). Overlay diff against the original checked visually and numerically. Production should use the company's original vector logo if one exists. | Company logo – covered by user authorisation |
| `public/favicon*.png/svg`, `apple-touch-icon.png`, `icon-192.png` | Generated from the recreated WP mark | | as above |
| `public/images/og-wp-putki.jpg` | Generated: authentic fleet photo + recreated logo | Social share image | as above |

## Authentic company photographs (wp-putki.fi media library, uploaded 2024-10-07)

| Key | Original file | Description | Used on |
|---|---|---|---|
| `fleet` | `WhatsApp-Image-2024-10-07-at-14.16.09-scaled.jpeg` (2560×1920) | Row of white WP-Putki vans (Ford Transit, Opel Vivaro …) with logo | Home, Yritys, OG image |
| `fleet-2` | `WhatsApp-Image-2024-10-07-at-14.16.40-scaled.jpeg` (2560×1920) | Nissan NV400 flatbed + vans in front of a hall | Home, Urakointi |
| `store` | `WhatsApp-Image-2024-10-07-at-14.17.28-scaled.jpeg` (2560×2080) | Store interior: shelves of LVI parts, service counter | Home, Palvelut, Yritys |
| `showroom` | `WhatsApp-Image-2024-10-07-at-14.16.27-scaled.jpeg` (1859×2560) | Faucet and shower display | Palvelut, Yritys |

Base URL: `https://www.wp-putki.fi/wp-content/uploads/2024/10/`. Near-duplicates `…14.16.58…` and `…14.26.46…` were
downloaded but not used. Rights: authorised company photographs (user authorisation).

## Illustrative stock (Pexels licence – free commercial use, no attribution required)

Clearly labelled "Kuvituskuva" on the site; never presented as WP-Putki's work. Listed in `IMAGE_REPLACEMENT_LIST.md`.

| Key | Source | Subject |
|---|---|---|
| `stock-lampo` | https://www.pexels.com/photo/7937300/ | Heating circulation pump, valves and gauge |
| `stock-lampo-2` | https://www.pexels.com/photo/36983669/ | Insulated heating pipes |
| `stock-vesi` | https://www.pexels.com/photo/4494653/ | Water meters and valves on pipework |
| `stock-ilma` | https://www.pexels.com/photo/32032996/ | Spiral ventilation ducts |
| `stock-asbesti` | https://www.pexels.com/photo/9741472/ | Fenced demolition waste bags and warning tape |
| `stock-saneeraus` | https://www.pexels.com/photo/8488035/ | Old water pipes and valves on a wall |

Licence: https://www.pexels.com/license/

## Deliberately NOT used
- Divi theme demo images in the wp-putki.fi media library (`consulting-*`, `business-coach-*`, `portrait-square-*`, `author_*`, `corp.jpg`, `smb.jpg`, `sol.jpg`, `tech-03-*`, `blank-profile-picture-*`) – theme stock, unrelated.
- `unnamed-file.png` (fittings flat-lay on /palvelut) – third-party stock of unknown licence.
- `Vaihtoautot_Hero_1920x1080.webp` (Mercedes vans) – third-party image of a car dealer, not WP-Putki's fleet.
- Competitor images and any AI-generated imagery.
