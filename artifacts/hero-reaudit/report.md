# Landing Page Hero — final audit

Reference: Figma file `O63KoRmbazwDyXhNtPnyDa`, Landing Page `273:2781`, Hero `273:2782`, card composition `273:2792`. All Figma access was read-only.

The Figma Hero frame includes the 90px Navbar. The application keeps the Navbar separate, so its Hero is 967px high, starting at page y90 and ending at y1057. All coordinates below are page coordinates at 1440px unless stated otherwise.

## Complete audit and corrections

| Element | Figma | Browser before | Browser after / correction |
|---|---|---|---|
| Hero bounds below Navbar | x0, y90, 1440 × 967 | Exact | Preserved |
| Bottom corners | 50px | 50px | Preserved |
| Background base | #010101 | #010101 | Preserved |
| Gradient bounds | y150–1057, height907 | Approximation across full Hero | Separate background layer starts60px into Hero, with907px height at1440px |
| Gradient stops | #010101 at0%; #9333ea at50.961536%; #a78bfa at100% | #010101 through6.2%; #9132e8 at53.8%; #a68afa at100%, all relative to967px | Exact source colors and stop within the907px gradient |
| Hero shadow | 0 12px 114.6px rgba(124,58,237,.5) | Absent from Hero | Added; clipped above the separate Hero boundary to preserve the Navbar |
| Copy frame | x315/y153, 810 × 300 | Content-sized flow | 810 × 300 at x315/y153 |
| Heading box | x345.772/y153, 748.456 × 114 | x420.479/y155, 597.042 × 114 | x345.766/y153, 748.453 × 114 |
| Heading font | SF Pro Medium, weight510,48px;57px measured lines;−1.6px tracking | Arial400,48px/57px;−2.35px tracking; translated/scaled | User-approved Tahoma400 fallback,48px/57px,−1.6px tracking; no transform |
| Description box | x315/y287, 810 × 98 | x409.787/y289.487, 624.411 × 96.525 | Exactly x315/y287, 810 × 98 |
| Description font | Inter400,20px/32.5px, tracking0, #adadad | Arial400,20px/32.5px, tracking−.32px, scale(1.122,.99) | Self-hosted Inter400, exact size/line height/tracking/color, no transform |
| CTA bounds | x651.5/y398, 137 × 40 | x651.5/y397.5, 137 × 40 | Exact x651.5/y398, 137 × 40 |
| CTA radius | 8px | 10px | 8px |
| CTA text | Inter400,12px/16px, tracking1.2;96 × 16 box at x672/y410 | Arial400,12px/12px, tracking1.3 | Inter400 with the measured line height, tracking, and label box |
| Copy frame bottom → composition top | 21px | Composition positioned independently | 21px flow spacing |
| CTA bottom → center card top | 36px | 36.5px | 36px |
| Outer card bottom → Hero bottom | 52.980px | 53.125px | 53px after browser subpixel rounding |
| Card shadows | 0 4px 40px rgba(0,0,0,.5) | Colored drop-shadow,0 18px 22px at16% opacity | Exact box-shadow values from Figma |
| Card images | Original Figma image fills, centered FILL cropping | PDF-derived copies; natural-height sizing | Exact Figma source exports, centered object-fit:cover in measured frames |

The first audit, including the untouched baseline and its differences, is in [phase-1-audit.md](phase-1-audit.md). Raw Figma properties are in [figma-measurements.json](figma-measurements.json).

## Every card: before and after

All five frames are310px wide at1440px. All rotations are0°; the tiny rotation values near10⁻¹⁵° returned by Figma are numerical noise. Frame corner radii are0; the small visible rounded corners belong to the original artwork. No additional rounding or rotation was invented.

| Card | Figma x / y / height | Before x / y / height | After x / y / height |
|---|---|---|---|
| Quiet Technology | 47.184 / 619.020 / 385 | 47.125 / 619.016 / 384.859 | 47.172 / 619.016 / 384.984 |
| Slice Debit | 298.195 / 511.277 / 385 | 298.125 / 511.266 / 384.859 | 298.188 / 511.266 / 384.984 |
| BabyHush | 565 / 474 / 384.863 | 565 / 474 / 384.859 | 564.984 / 474 / 384.859 |
| NeoCultural Couture | 831.725 / 511.412 / 384 | 831.719 / 511.281 / 384.250 | 831.719 / 511.406 / 383.984 |
| Inflatable Illustrations | 1082.816 / 619.020 / 385 | 1082.750 / 619.016 / 384.859 | 1082.813 / 619.016 / 384.984 |

The remaining frame-coordinate differences are at most approximately0.016px, consistent with Chromium layout rounding. Images preserve their original aspect ratio through object-fit:cover; the tiny source-to-frame ratio differences are cropped rather than stretched. Mobile uses natural image heights.

Stacking is Quiet → Slice → BabyHush → NeoCultural → Inflatable, front to back. This was already correct and remains unchanged.

| Left-to-right pair | Figma horizontal overlap | Before | After | Figma top difference | Before | After |
|---|---:|---:|---:|---:|---:|---:|
| Quiet → Slice | 58.988 | 59.000 | 58.984 | −107.743 | −107.750 | −107.750 |
| Slice → BabyHush | 43.195 | 43.125 | 43.203 | −37.277 | −37.266 | −37.266 |
| BabyHush → NeoCultural | 43.275 | 43.281 | 43.266 | 37.412 | 37.281 | 37.406 |
| NeoCultural → Inflatable | 58.908 | 58.969 | 58.906 | 107.608 | 107.734 | 107.609 |

The composition is implemented as a proportional canvas derived from these coordinates. At1440px it reproduces the desktop arrangement; narrower desktop/tablet sizes scale every coordinate and dimension together.

## Artwork provenance and preservation

The Figma exports have the same intrinsic dimensions as the existing files:501 × 622px, except NeoCultural at501 × 621px. Pixel comparison found the existing PDF-derived files were not exact matches: mean RGBA channel error ranged from1.18 to2.12 on a0–255 scale. See [asset-comparison.json](asset-comparison.json).

Exact exported originals were copied, without editing or resampling, into the Hero's own source asset folder. The existing files under `public/images/landing/hero/` and `assets-extracted/` were not changed. Static imports retain the source files and Next Image is unoptimized to avoid another conversion.

## Remaining differences

1. **Heading fallback:** SF Pro is not available locally. The user explicitly approved using a fallback and documenting it. Tahoma Regular was selected after visual comparison with Inter510, Arial400/510, and Segoe UI510. Its text shape and width still differ from SF Pro Medium510. The source box, font size, line height, and tracking are preserved, but this is not an exact SF Pro typography match. The heading region's image error is higher than the previous transformed Arial approximation; this is disclosed rather than hidden with glyph scaling or arbitrary tracking adjustments. See [heading-fallback-comparison.png](heading-fallback-comparison.png), ordered Figma, Inter510, Arial400, Arial510, Segoe UI510, Tahoma400.
2. **Browser rendering:** Small text antialiasing, image sampling, gradient, and shadow-rendering differences remain. Card boxes match within approximately0.016px; exact pixel equality is not claimed.
3. **Transition below the Hero:** The protected Explore Creativity section already paints a gradient approximation of the Hero glow. Its source and background were left unchanged. The transition region has approximately1.38 mean RGB-channel error against the Figma export. The Hero ends at the correct y1057 boundary.
4. **Development UI:** Raw browser captures include Next.js's development indicator. It is not Hero content and is absent from the Figma reference. No global configuration was changed to remove it.

## Visual comparison

Mean absolute RGB-channel error,0–255 scale:

| Region | Before | After |
|---|---:|---:|
| Entire Hero below Navbar | 4.564 | 4.211 |
| Heading | 23.056 | 35.898 |
| Description | 13.648 | 8.819 |
| CTA | 12.205 | 5.174 |
| Card composition | 3.460 | 2.204 |
| Background sample | 0.469 | 0.421 |
| Transition below Hero | 1.376 | 1.377 |

The source/reference, desktop result, overlay, and responsive captures were inspected visually. These statistics support the inspection; they do not replace it or imply all regions improved.

- [Original Figma export, including Navbar and shadow](figma-hero-original.png)
- [Figma Hero crop](figma-hero-1440.png)
- [Browser before](before-hero-1440.png)
- [Browser after](after-hero-1440.png)
- [Side-by-side: Figma left, browser after right](side-by-side-1440.png)
- [50% overlay](overlay-50-percent.png)
- [Absolute difference, amplified4×](difference-4x.png)

Comparison crops exclude the unchanged Navbar and include127px of transition below the Hero. Raw full-width captures remain available as `before-1440.png` and `after-1440.png`.

## Responsive validation

No approved mobile Hero was supplied. Below768px, the center card is featured above a two-column grid containing the other four cards. This intentionally increases the mobile section height, allowing all five previews to remain visible. It is a responsive adaptation, not an exact Figma mobile match.

| Width | Before maximum card clipping | After card clipping | Page overflow after | Hero height after | Arrangement |
|---:|---:|---:|---:|---:|---|
| 1440 | 0 | 0 | 0 | 967 | Exact desktop canvas |
| 1280 | 32.875 | 0 | 0 | 967 | Proportional desktop canvas |
| 1024 | 0 | 0 | 0 | 810 | Proportional canvas |
| 768 | 94.481 | 0 | 0 | 810 | Proportional canvas |
| 390 | 127.980 | 0 | 0 | 1114.125 | Featured center card + two-column grid |
| 320 | 162.980 | 0 | 0 | 1108.219 | Featured center card + two-column grid |

All CTA-to-card gaps are36px after correction. Text and controls were checked for readability and the five card rectangles stay within the Hero and viewport. The original source files are used at every size.

Responsive screenshots: [1280](after-1280.png), [1024](after-1024.png), [768](after-768.png), [390](after-390.png), [320](after-320.png). Raw geometry and computed typography are in [before-measurements.json](before-measurements.json) and [after-measurements.json](after-measurements.json).

## Scope and validation

- Navbar: zero changed pixels in the1440px before/after screenshots; computed geometry unchanged at all six widths.
- Other desktop sections: computed geometry and typography unchanged. A separate long screenshot below the Hero was not byte-identical, so no claim of complete page raster equality is made; no source files for those sections were edited.
- On mobile, subsequent sections move down naturally because the Hero now contains all five visible cards; their source and internal layout were not changed.
- `npm run lint`: passed, exit0.
- `npx tsc --noEmit`: passed, exit0.
- `npm run build`: passed, exit0; production page generation succeeded.
- No dependencies installed. Figma, PDF references, original assets, Navbar, and other section source files were not modified.

## Files changed or added

- `src/features/landing/sections/LandingHero.tsx`
- `src/features/landing/sections/LandingHero.module.css`
- `src/features/landing/sections/hero-assets/quiet-technology.png`
- `src/features/landing/sections/hero-assets/slice-debit.png`
- `src/features/landing/sections/hero-assets/babyhush.png`
- `src/features/landing/sections/hero-assets/neocultural-couture.png`
- `src/features/landing/sections/hero-assets/inflatable-illustrations.png`
- `src/features/landing/sections/hero-fonts/Inter-Variable.ttf`
- `src/features/landing/sections/hero-fonts/OFL.txt`

Supporting screenshots, raw measurements, audit notes, and validation helpers are under `artifacts/hero-reaudit/`. The temporary browser profile was removed.
