# Navbar comparison

Read-only reference: Figma file O63KoRmbazwDyXhNtPnyDa, Navbar node 273:2783.

## Implementation files

- `src/components/layout/SiteHeader.tsx`: load self-hosted Sora Bold with `next/font/local`, scoped to the header.
- `src/components/layout/SiteHeader.module.css`: use 1.2px tracking and 16px line height, remove per-link tracking overrides and Login scaling, remove the logo's vertical scale while retaining its vertical translation, use the reference's 8px desktop CTA radius. Use a clamped navigation margin and 40px link gaps only at 1101–1200px to keep the desktop groups separated. Existing navigation visibility and mobile breakpoints remain.
- `src/components/layout/fonts/Sora-Bold.ttf`: official Google Fonts Sora Bold font, downloaded from fonts.gstatic.com.
- `src/components/layout/fonts/OFL.txt`: official Sora SIL Open Font License.

No global styles, page sections, footer, routes, existing image/SVG assets, Figma, or PDFs were modified. No dependencies were installed.

## 1440px measurements

| Property | Before | After | Reference |
|---|---|---|---|
| Header height | 90px | 90px | 90px |
| Navigation font | Arial 12px/700 | Sora 12px/700 | Sora 12px/700 |
| Navigation line height | 12px | 16px | 16px |
| Navigation letter spacing | 1.6px; Pricing 2.05px; Web Builder 1.28px | 1.2px throughout | 1.2px |
| Link gaps | 48px | 48px | 48px |
| Navigation top | 39px | 37px | Centered 16px line box in 90px header |
| Login transformed box | 111.78 × 45px | 108 × 40px | 108 × 40px |
| Login tracking | 2px | 1.2px | 1.2px |
| CTA rectangle | x1263, y25, 137 × 40px | Unchanged | 137 × 40px |
| CTA radius | 10px | 8px | 8px |
| CTA tracking | 1.3px | 1.2px | 1.2px |
| SVG rendered box | 160.44 × 28.08px | 160.44 × 26.875px | Existing approved SVG retained without aspect distortion |

Navigation x positions remain 370.984375, 488.984375, 597.984375, 757.984375, and 868.984375px. They differ from the supplied integer positions by 0.015625px due to browser subpixel layout. Link boxes retain widths 70, 61, 112, 63, and 97px.

## Screenshots and comparison

- `figma-reference-1440.png`: read-only Figma export.
- `before-1440.png`: original browser Navbar.
- `after-1440.png`: updated browser Navbar.
- `reference-before-after.png`: reference, before, after stacked vertically.
- `before-{width}.png` and `after-{width}.png`: captures at 1440, 1280, 1024, 768, 390, and 320px.
- `before-measurements.json`, `after-measurements.json`: DOM geometry and computed typography.
- `comparison.json`: image comparison statistics.

Mean absolute channel error against the reference decreased from 3.81164 to 1.87448 on a 0–255 scale (50.8% reduction). Exact pixel equality is not claimed. Remaining differences include SVG logo outlines/vertical ink bounds and font rasterization. At a white-channel threshold of 127, the reference logo ink bounds are x34–191/y32–55; the retained undistorted SVG is x34–191/y33–54. No marketing asset was changed to compensate.

## Validation

- Page and header horizontal overflow: 0px at 1440, 1280, 1024, 768, 390, and 320px.
- Other Landing Page sections' measured geometry and computed typography are unchanged at all six widths.
- ESLint: passed, exit code 0.
- TypeScript `tsc --noEmit`: passed, exit code 0.
- Production `next build`: passed, exit code 0; home page statically prerendered.

Validation helpers: `validate.mjs` uses Chrome DevTools Protocol without added dependencies; `compare.ps1` uses System.Drawing for screenshot comparison. Temporary Chrome profile removed after capture.
