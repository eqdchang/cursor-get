# boardwalktech.com — Page Topology

## Tech stack observed
- Vite + React SPA (single JS bundle: `assets/index-DsfB-T2w.js`)
- Tailwind CSS (raw utility classes in rendered HTML — all standard v3/v4 classes like `bg-blue-600`, `bg-gradient-to-b from-gray-50 to-white`)
- shadcn/ui Button primitive used for primary + secondary CTAs
- **No custom web fonts** — uses the system sans stack (`ui-sans-serif, system-ui, sans-serif`)
- **No smooth-scroll library** (no Lenis / Locomotive)
- Assets served from Webflow CDN: `https://cdn.prod.website-files.com/5eb236230d5bdf2e76923884/...`

## Viewport & Layout
- Desktop reference: **1440px wide**, document total height ~6284px
- Single `min-h-screen bg-white` wrapper containing `<header>` + 7 `<section>` + `<footer>`
- Content column: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Header is `fixed top-0` with `h-20` — so hero has `pt-32 lg:pt-40` to clear it.

## Vertical section order (desktop)

| # | Section | Top | Height | Wrapper classes | Heading |
|---|---------|-----|--------|-----------------|---------|
| 0 | Header (fixed) | 0 | 80 | `fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-100` | — (nav) |
| 1 | Hero | 0 | 708 | `relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden` + `absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-teal-50/30` overlay | `Where Data Becomes Decisions` |
| 2 | Trust logos | 708 | 316 | `py-16 bg-gray-50/50` | `Trusted by the world's top companies` |
| 3 | Products | 1024 | 968 | `py-24 bg-white` | `Products` |
| 4 | Info management (3 alternating feature rows) | 1992 | 1783 | `py-24 bg-gradient-to-b from-gray-50 to-white` | 3 separate H2s |
| 5 | Solutions (4 cards) | 3775 | 704 | `py-24 bg-white` | `Solutions` |
| 6 | Bloomberg article | 4479 | 521 | `py-24 bg-gradient-to-b from-gray-50 to-white` | `How Boardwalktech's ...` |
| 7 | About us (dark) | 5000 | 618 | `py-24 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white` | `About us` |
| 8 | Footer | 5618 | 666 | `bg-white border-t border-gray-100` | — |

## Interaction models

| Section | Model | Notes |
|---------|-------|-------|
| Header | static (fixed) | Does NOT change on scroll (no shrink, no shadow toggle). Hover effects on nav items only. |
| Hero | static | No animation after initial load (reveal animations happen on mount). `shadow-2xl` image card is a fixed frame. |
| Trust logos | static | Each logo has `opacity-70 hover:opacity-100 transition-all duration-300`. |
| Products | static + hover | Card has `hover:shadow-xl transition-all duration-500`; image has `group-hover:scale-105 transition-transform duration-700`. |
| Info mgmt | static (rows alternate via `lg:order-1`/`lg:order-2`) | 3 rows. Row 2 flips image to left. |
| Solutions | static + hover | Image `group-hover:scale-110 transition-transform duration-700`; heading gets `group-hover:text-blue-600`; arrow gets `group-hover:gap-2` wider spacing. |
| Bloomberg article | static | Bloomberg "featured article" card absolutely positioned bottom-left of image. |
| About us | static | Dark gradient background. Centered content. |
| Footer | static | Link hovers. |

## Dependencies / overlays
- Header is `fixed z-50` — overlays everything.
- Hero section has a full-bleed `absolute inset-0` gradient overlay (`from-blue-50/50 via-white to-teal-50/30`).
- Info-mgmt rows have `absolute -z-10` blurred circles (`bg-blue-100 / bg-teal-100 rounded-full blur-2xl opacity-60`) bleeding out from image corners.
- Bloomberg article has an `absolute -bottom-4 -left-4` "BB Bloomberg / Featured Article" badge overlay.

## Responsive behavior
- Breakpoint switches at `lg:` (Tailwind default 1024px) and `md:` (768px).
- Header: mobile shows hamburger button (`lg:hidden`), desktop shows full nav (`hidden lg:flex`).
- Hero: mobile stacks (1 column), desktop 2-column grid (`lg:grid-cols-2`).
- Trust logos: 2 cols mobile → 4 cols md+.
- Products: 1 col mobile → 2 cols lg+.
- Info-mgmt rows: stack on mobile → 2 col lg+ (alternating order).
- Solutions: 1 col mobile → 2 cols md → 4 cols lg.
- Footer: 2 cols mobile → 5 cols md+.
- Hero h1: `text-4xl sm:text-5xl lg:text-6xl` (36px / 48px / 60px).
