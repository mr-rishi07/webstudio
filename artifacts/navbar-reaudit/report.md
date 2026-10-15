# Landing Page Navbar re-audit

Reference: live instance `273:2783` inside `273:2782` inside Landing Page `273:2781`, file `O63KoRmbazwDyXhNtPnyDa`. Figma was queried read-only. The complete node bounds, typography, and auto-layout properties are saved in `figma-measurements.json`.

## Findings and correction

The previous implementation's 1440px navigation anchors were already within 0.016px of the live Figma instance. The re-audit did not find a different set of desktop label x-coordinates. It did find that the implementation reproduced these coordinates with a guessed left margin and a narrow navigation grid, rather than the actual Figma composition. This produced a different distribution when the viewport narrowed. Login and CTA label alignment also differed by fractions of a pixel, and the logo used a translated SVG rather than Figma's Sora text.

Figma's actual structure is:

- A 1440 × 90px black header, centered vertically.
- A centered 1358px parent frame at x41. Its end-aligned children occupy 1366px, extending 8px left to x33. The implementation uses the equivalent 33px left and 41px right content insets without intentionally overflowing a parent.
- A 161 × 36px wordmark slot at x33/y27.
- A navigation region at x227/y37, width883px, containing centered label boxes totaling595px. The unused space is144px on each side.
- 33px between the wordmark slot and navigation region, and 33px between that region and the account group.
- Account group at x1143/y25, width256px: a108px Login control, a13px gap, and a135 × 36px CTA wrapper. The137 × 40px button is centered in that wrapper, extending1px on either side and2px vertically. Thus the visible Login-control-to-button gap is12px, although the wrapper gap is13px.

The new Navbar follows those measurements. The existing measured navigation columns remain, but are centered inside the flexible navigation region. The wordmark uses the actual design's Sora text, with no transform or scaling. The existing shared SVG file is untouched. At narrower desktop widths the navigation region contracts, with the compact spacing rule retained near the tablet breakpoint. Existing mobile navigation visibility and CTA sizes remain.

## 1440px x-coordinates and dimensions

All values are CSS pixels. Login and GET STARTED label rows refer to text layout boxes, not their larger clickable controls. Before values for these two labels come from browser text ranges because they previously had no separate span.

| Item | Figma x | Before x | After x | Figma width × height | After layout width × height |
|---|---:|---:|---:|---|---|
| Wordmark slot | 33 | 33 | 33 | 161 × 36 | 161 × 36 |
| PRODUCT | 371 | 370.984 | 371 | 70 × 16 | 70 × 16 |
| AGENCY | 489 | 488.984 | 489 | 61 × 16 | 61 × 16 |
| ENTER PRISING | 598 | 597.984 | 598 | 112 × 16 | 112 × 16 |
| PRICING | 758 | 757.984 | 758 | 63 × 16 | 63 × 16 |
| WEB BUILDER | 869 | 868.984 | 869 | 97 × 16 | 97 × 16 |
| Login label | 1177 | 1176.563 | 1177 | 40 × 16 | 40 × 16 |
| Login control | 1143 | 1143 | 1143 | 108 × 40 | 108 × 40 |
| GET STARTED label | 1283.5 | 1283.266 | 1283.5 | 96 × 16 | 96 × 16 |
| GET STARTED button | 1263 | 1263 | 1263 | 137 × 40 | 137 × 40 |

The previous SVG image rectangle was x33/y30.3125,160.4375 × 26.875px, with a−1.25px translation. The new logo slot is x33/y27,161 × 36px. Its naturally rendered text element measures158.984 × 36px; that text advance differs from the161px Figma text layer, while preserving its unscaled typography and the measured layout slot.

## Adjacent gaps at 1440px

This first table compares layout boxes. It includes the large gaps that do not equal48px.

| Adjacent items | Figma | Before | After |
|---|---:|---:|---:|
| Wordmark slot → PRODUCT | 177 | 177.547 | 177 |
| PRODUCT → AGENCY | 48 | 48 | 48 |
| AGENCY → ENTER PRISING | 48 | 48 | 48 |
| ENTER PRISING → PRICING | 48 | 48 | 48 |
| PRICING → WEB BUILDER | 48 | 48 | 48 |
| WEB BUILDER box → Login label box | 211 | 210.578 | 211 |
| Login label box → GET STARTED button | 46 | 45.578 | 46 |
| Login label box → GET STARTED label box | 66.5 | 65.844 | 66.5 |
| Login clickable control → GET STARTED button | 12 | 12 | 12 |

Text ranges have different advances from layout boxes. The following measured browser gaps include that difference; they are not claimed to be identical to Figma text-layer bounds:

| Adjacent browser text ranges | Before | After |
|---|---:|---:|
| PRODUCT → AGENCY | 46.953 | 46.953 |
| AGENCY → ENTER PRISING | 47.734 | 47.734 |
| ENTER PRISING → PRICING | 47.688 | 47.688 |
| PRICING → WEB BUILDER | 47.750 | 47.750 |
| WEB BUILDER → Login | 210.047 | 210.469 |
| Login → GET STARTED | 65.844 | 65.641 |

## Typography and vertical alignment

- Wordmark: Sora700,30px,36px line height,−1.5px letter spacing, y27. This replaces the SVG approximation and translation.
- Navigation, Login, CTA: Sora700,12px,16px line height,1.2px letter spacing, layout-box y37. These typography values were already present before this re-audit; account text boxes now have the measured Figma dimensions and alignment.
- Login and CTA controls: y25,40px high; all text line-box centers are at y45. CTA radius remains8px.
- No transforms are used in the Navbar.

## Visual evidence and remaining differences

- `figma-reference-1440.png`: freshly exported live Figma Navbar.
- `before-1440.png`: browser baseline from this re-audit.
- `after-1440.png`: corrected browser Navbar.
- `reference-before-after.png`: exact-pixel composition, with Figma on top, browser before in the middle, browser after at the bottom.
- `before-{width}.png` / `after-{width}.png`: responsive captures.
- `before-measurements.json` / `after-measurements.json`: browser boxes, text ranges, typography, overlaps, and overflow.

The comparison was inspected visually at1440px, with narrower desktop and mobile captures also inspected. Mean absolute RGB-channel error against Figma decreases from1.87448 to1.35531 on a0–255 scale. This is supporting evidence, not a claim of pixel equality. Remaining differences are visible in glyph rasterization and browser text advances. Layout-box coordinates match the measured Figma positions, while browser glyph advances differ by approximately0.25–1.05px for navigation labels and2.02px for the wordmark text element. No glyph scaling or tracking overrides were introduced to conceal those differences.

## Validation

| Viewport | Header height | Header overflow | Page overflow | Navbar overlap |
|---:|---:|---:|---:|---|
| 1440 | 90 | 0 | 0 | None |
| 1280 | 90 | 0 | 0 | None |
| 1024 | 90 | 0 | 0 | None |
| 768 | 90 | 0 | 0 | None |
| 390 | 72 | 0 | 0 | None |
| 320 | 72 | 0 | 0 | None |

Additional breakpoint checks at1200px and1101px show no Navbar overlap or header overflow. Those widths already had10px and8px of page-level overflow before this task; these values are unchanged. No other section was modified to address them.

Other Landing Page sections' measured geometry and computed typography are unchanged at every captured width.

- ESLint: passed, exit0.
- TypeScript `tsc --noEmit`: passed, exit0.
- Production build: passed, exit0.

## Files changed

Application files: only `src/components/layout/SiteHeader.tsx` and `src/components/layout/SiteHeader.module.css`.

Supporting measurements, screenshots, comparison scripts, and this report are in `artifacts/navbar-reaudit/`. Existing font files, shared marketing assets, Figma, and PDFs were not modified. No dependencies were installed.
