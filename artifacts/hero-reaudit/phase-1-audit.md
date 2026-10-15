# Hero audit before implementation

Coordinates are relative to the 1440px Landing Page, including the unchanged 90px Navbar. Figma frame 273:2782 is 1440 × 1057px; the application's separate Hero starts at y90 and ends at y1057.

| Element | Figma | Current browser | Confirmed difference |
|---|---|---|---|
| Hero boundaries | x0, y90–1057 below Navbar | x0, y90–1057 | None |
| Bottom radius | 50px | 50px | None |
| Base | #010101 | Gradient starts #010101 | Equivalent top base |
| Gradient | y150, height907; #010101 at0%, #9333ea at50.961536%, #a78bfa at100% | Stops relative to967px: black6.2%, #9132e8 at53.8%, #a68afa at100% | Wrong colors and midpoint mapping |
| Hero glow | 0 12px 114.6px rgba(124,58,237,.5) | No Hero shadow; adjacent section approximates transition with gradients | Missing actual Hero effect; adjacent section is protected scope |
| Copy frame | x315, y153, 810 × 300 | Content-sized flow | Explicit reference frame absent |
| Heading box | x345.772, y153, 748.456 × 114 | x420.479, y155, 597.042 × 114 | Box too narrow; y+2px |
| Heading type | SF Pro Medium510,48px, automatic57px lines, tracking−1.6px | Arial400,48px/57px, tracking−2.35px, translated/scaled | Wrong font/weight/tracking; artificial transform |
| Description box | x315, y287, 810 × 98 | x409.787, y289.487, 624.411 × 96.525 | Box and y mismatch; transformed |
| Description type | Inter400,20px/32.5px, tracking0, #adadad | Arial400,20px/32.5px, tracking−.32px, scale(1.122,.99) | Font and tracking mismatch |
| CTA | x651.5, y398, 137 × 40, radius8 | x651.5, y397.5, 137 × 40, radius10 | y−.5px; radius+2px |
| CTA text | Inter400,12px/16px, tracking1.2; x672/y410 in96 × 16 box | Arial400,12px/12px, tracking1.3 | Typography/alignment mismatch |
| Composition origin | Central card x565/y474 | x565/y474 | Correct |
| CTA → first card top | 36px | 36.5px | .5px extra |
| Lowest card → Hero bottom | 52.980px | 53.125px | .145px extra |
| Card shadows | 0 4px 40px rgba(0,0,0,.5) | drop-shadow(0 18px 22px rgba(30,4,55,.16)) | Offset, spread appearance, and color differ |

## Five-card geometry

All cards are 310px wide, rotation0°, with frame radius0. Rounded corners visible within the artwork are part of the source image. Stacking from front to back is Quiet → Slice → BabyHush → NeoCultural → Inflatable; the current implementation already has that order.

| Card | Figma x / y / height | Before x / y / height | Delta (before − Figma) |
|---|---|---|---|
| Quiet Technology | 47.184 / 619.020 / 385 | 47.125 / 619.016 / 384.859 | −.059 / −.004 / −.141 |
| Slice Debit | 298.195 / 511.277 / 385 | 298.125 / 511.266 / 384.859 | −.070 / −.011 / −.141 |
| BabyHush | 565 / 474 / 384.863 | 565 / 474 / 384.859 | 0 / 0 / −.004 |
| NeoCultural | 831.725 / 511.412 / 384 | 831.719 / 511.281 / 384.250 | −.006 / −.130 / +.250 |
| Inflatable | 1082.816 / 619.020 / 385 | 1082.750 / 619.016 / 384.859 | −.066 / −.004 / −.141 |

| Adjacent pair, left → right | Figma horizontal overlap / top difference | Browser before |
|---|---|---|
| Quiet → Slice | 58.988 / −107.743 | 59 / −107.750 |
| Slice → BabyHush | 43.195 / −37.277 | 43.125 / −37.266 |
| BabyHush → NeoCultural | 43.275 / +37.412 | 43.281 / +37.281 |
| NeoCultural → Inflatable | 58.908 / +107.608 | 58.969 / +107.734 |

Figma uses centered FILL cropping. The current images use natural-height sizing. The exported Figma originals have the same intrinsic dimensions as the existing PDF-derived images (501 × 622; NeoCultural501 × 621), but are not pixel-identical: mean RGBA error is1.18–2.12 per channel. Exact exported originals will be added as Hero-only files; existing assets will remain untouched.

## Responsive baseline

Page overflow is0px at all six requested widths, but `overflow: hidden` conceals card clipping. At1280px the outside cards lose about33px each; at768px about94px; at390px about128px and at320px about163px. At320px the outer cards are entirely outside the visible area. The new responsive adaptation must fit every card or rearrange them; it must not rely on overflow hiding.

## Font decision

SF Pro is unavailable in the project/installed fonts. The user approved a fallback with the difference documented. Inter will be self-hosted only for the Hero, used directly for the description and CTA, and as the heading fallback while retaining the reference's size, weight, spacing, and line-box geometry.
