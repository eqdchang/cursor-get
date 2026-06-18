# Byrna Header Specification

## Overview
- Site: https://byrna.com/
- Extracted: 2026-04-21 (re-extracted: 2026-06-18 — full header redesign; **fidelity re-extraction 2026-06-18** with exact fonts, ornaments, geo/announcement chrome, two-level mobile accordion)
- Target files: `bundles/sites/byrna/src/header/{data.ts,SiteHeader.tsx,mount.tsx}`
- Shared data: `bundles/sites/byrna/src/header/data.ts` (consumed by the bundle AND the raw-mode static render)
- Scope class: `bw-scope`
- Global: `window.ByrnaHeader`
- Mount id: `#byrna-header-root`

JS-driven hover+click state machine. Built with React + Tailwind v4 (utilities + theme only, preflight omitted); ships as a single self-contained IIFE bundle. Raw-mode editable artifacts also ship (see `src/raw/`).

> **2026-06-18 redesign note.** The live site replaced its old top-nav
> (`Products · Find a Store · About Byrna · Reviews/Stories · Contact Us`) with a
> new IA: `Shop · Find a Store · Why Byrna · Learn · Support`. The Shop dropdown
> is now a full-width mega panel with product thumbnails, badges, a nested
> "Projectiles" submenu and a product-quiz image card. The component was rebuilt
> from scratch to this spec (user-approved structural change).

## Header chrome (above the nav) — now cloned
Three stacked bars (live: geo bar is its own section; announcement + nav are the sticky `header`):
1. **Geo bar** — black `#000`, 39px tall. Left: region links `US` (active, lighter `bg-white/10` tab) · `CA` (byrna.ca) · `LE` (le.byrna.com), each `proxima-nova-extra-condensed` 14px/900 white with a small flag. Right: 4 white social icons (Facebook, Instagram, Twitter, Youtube).
2. **Announcement bar** — orange `#ff671d`, ~36px. Centered text `FREE SHIPPING ON ALL ORDERS OVER $100 *`, `proxima-nova-extra-condensed` ~14.8px/700 black.
3. **Main nav** — white `#fff`. Logo left (~h-44), centered nav, right icons (search / account / cart, 39px each).

## Logo
- src: `https://byrna.com/cdn/shop/files/Byrna-Logo.jpg?v=1688423395&width=600`
- alt: `Logo` (rendered with alt `Byrna`)
- link: `https://byrna.com/`
- rendered: `h-[44px]` (logo row ~63px tall, nav row ~90px)

## Live mega-menu DOM
- Root: `header.header.sticky.byrna_mega_menu` (announcement bar + `.byrna-mega-menu__main`)
- Nav list: `.byrna-mega-menu__center > ul.byrna-mega-menu__nav-list` (6 `<li>`: 5 nav groups + 1 social-icons row)
- Each dropdown panel: `.byrna-mega-menu__submenu` — **full viewport width** (`position: absolute; left: 0`, `width: 100vw`), inner `.byrna-mega-menu__submenu-wrapper` has the white background.
- Column container `.byrna-mega-menu__collection-link`: `display: flex; flex-wrap: nowrap; gap: ~20px; justify-content: center` (inner content max ~1387px).
- Trigger mechanism: **hover-reveal** (CSS `:hover`; the trigger `<a>` also navigates on click). The clone implements hover+click with button triggers (project standard, superset of hover-only).

## Nav groups

### Shop — href: /collections/all-byrna-products
Full-width mega panel: 4 heading columns + a product-quiz image card.

**Column — Less-Lethal Pistols** (each row has a product thumbnail)
| Label | href | badge |
|-------|------|-------|
| Byrna CL-XL | /products/byrna-clxl-launcher-universal-kit | New |
| Byrna CL | /products/byrna-compact-launcher-universal-kit | — |
| Byrna SD | /products/byrna-sd-non-lethal-self-defense-pistol | Best Seller |
| Byrna LE | /products/le-kit | — |
| Compare Pistols | /collections/byrna-non-lethal-guns | — |

**Column — Less-Lethal Rifles** (thumbnails)
| Label | href |
|-------|------|
| Byrna Mission 4 | /products/mission-4-kit |
| Byrna TCR | /products/byrna-tcr |
| Compare Rifles | /collections/less-lethal-self-defense-rifles |

**Column — Projectiles, CO2 & Accessories** (text only)
| Label | href | notes |
|-------|------|-------|
| Projectiles | (heading) | inline nested submenu ↓ |
| ↳ .61 Caliber for CL-XL & CL | /collections/61-projectiles | nested |
| ↳ .68 Caliber for SD, LE, Mission 4, TCR | /collections/ammo-and-projectiles | nested |
| ↳ 12 Gauge Kinetic | /products/less-lethal-12-gauge-round-10ct | nested |
| Shop CO2 by Launcher | /collections/byrna-co2 | |
| Shop Accessories By Launcher | /collections/accessories | |

**Column — Personal Defense** (text only)
| Label | href |
|-------|------|
| Byrna Duo | /products/byrna-duo |
| Byrna Banshee | /products/byrna-banshee-personal-safety-alarm |
| Defense Sprays | /collections/bgr-max-pepper-spray |
| Byrna Ballistipac | /collections/backpack-body-armor |

**Image card** → /pages/byrna-product-quiz (QuestionMark-Icon_1.png)

### Find a Store — href: /pages/dealer-locator
No dropdown — direct link.

### Why Byrna — href: /pages/about
| Column | Label | href | external |
|--------|-------|------|----------|
| About | Our Mission | /pages/about | — |
| About | Our Technology | /pages/byrna-technology | — |
| Product | Product Catalog | /pages/2026-product-catalog | — |
| Media & Investors | Media | /blogs/media | — |
| Media & Investors | Investors | https://ir.byrna.com/ | yes |
| Media & Investors | NASDAQ: BYRN | https://ir.byrna.com/quote | yes |

### Learn — href: /blogs/byrna-nation
Three columns whose **heading is itself the link** (no child items):
| Label | href |
|-------|------|
| Tips & Drills | https://byrna.com/blogs/byrna-nation/tagged/tips-and-drills |
| Real Stories | https://byrna.com/blogs/byrna-nation/tagged/real-stories-hub |
| Product Guides | https://byrna.com/blogs/byrna-nation/tagged/product-guides |

### Support — href: /pages/contact-us
| Column | Label | href | external |
|--------|-------|------|----------|
| Customer Help | Customer Service | /pages/contact-us | — |
| Customer Help | Order Status | /pages/order-status | — |
| Customer Help | Warranty & Registration | https://care.byrna.com/register | yes |
| Customer Help | Service & Returns | https://care.byrna.com/rma | yes |
| Business & Partnerships | Become a Dealer | /pages/dealer-sales-inquiries | — |
| Press | Media Inquiries | /pages/media-inquiries | — |

## Trailing controls (desktop, right-side)
- Search button — icon only, stubbed (search panel out of scope)
- Account: /account/login
- Cart: /cart

## Computed styles (measured live, now matched)
- **Fonts (now loaded, not faked):** `proxima-nova-extra-condensed` (Adobe Typekit) is `@font-face`-loaded in `styles.css` from the exact URLs byrna serves (weights 400 + 900); fallback `Oswald`/`Arial Narrow`. This condensed face is the single biggest fidelity driver — the previous clone used a non-condensed system stack.
- **Fonts (CRITICAL, measured live 2026-06-18):** the live site loads ONLY two `proxima-nova-extra-condensed` faces — `fvd=n9` weight **900** and `fvd=n4` weight **400**. There is no 500/600/700/800 face. CSS font-matching therefore snaps every requested mid-weight (600–800) **up to the 900 black face**, which is why the live UI reads "way bolder". Our `fonts.generated.css` MUST declare the n4 file as `font-weight: 400` (NOT a `400 800` range) so the same snapping happens; a range would render mid-weights with the light 400 master. `@font-face` is hoisted to `<head>` (see AGENTS.md) so it loads inside the shadow root.
- Nav trigger: `proxima-nova-extra-condensed`, **16px, weight 400** (fixed px, does NOT scale), uppercase, color `#020122`; active/hover `#ff671d`. Chevron rotates 180° when open.
- **Dropdown text is RESPONSIVE (vw), not fixed.** Measured live: column title ≈ **1.03vw** (14.8px @1440, 13.2px @1280), item ≈ **0.857vw** (12.3px @1440, 11.0px @1280) — linear from origin, i.e. plain `vw`. We replicate with `clamp(12px,1.03vw,18px)` (title) and `clamp(10px,0.86vw,15px)` (item) so ours tracks live at any width. (A single fixed px size can never match a vw site across widths — comparison screenshots MUST be at the same viewport width.)
- **Column title:** uppercase, weight 900, `clamp(12px,1.03vw,18px)`, color `#000`, `padding: 8px 0`, **`border-bottom: 0.5px solid #eaeaea`** plus a **short orange `::before` accent bar (70×1–2px, `#ff671b`) pinned bottom-left** (`.bw-coltitle`).
- Item link: uppercase, weight 900, `clamp(10px,0.86vw,15px)`, color `#3a3a3a`, hover `#ff671d`; rows `margin-bottom: ~19.7px`.
- **Product thumbnails:** 32×32, `object-fit: contain`, `border-radius: 2px`, `margin-right: 12px`.
- **Badges:** pill (`border-radius: ~16px`), ~11.5px/800 white uppercase. `New` = olive `#63663b`; `Best Seller` = gray `#5f5f5f`.
- **Submenu panel:** `position: absolute; width: 100vw`, white, `box-shadow: 0 16px 32px -16px rgba(0,0,0,.25)`, padding ~`20px 26px 33px`; columns `display:flex; justify-content:center; gap:~20px` (so 3-col panels center as a group).
- Brand accent: `#ff671d` (underline `#ff671b`). Header background `#ffffff`; geo bar `#000`.

## Desktop behaviors
- Dropdown trigger: hover opens; click also toggles. Only one open at a time.
- Close triggers: outside `mousedown`, `Escape`, opening another group.
- `aria-haspopup="menu"`, `aria-expanded`, `role="menu"`, `role="menuitem"` set.

## Mobile behaviors (breakpoint: `lg` = 1024px)
- Hamburger opens a **left drawer with black `#000` background** over a dimmed overlay; close `X` top-right. Body scroll locked while open.
- Cart icon stays visible in the top bar.
- **Two-level accordion** (matches live):
  - L1 groups (`SHOP`, `WHY BYRNA`, `LEARN`, `SUPPORT`) — `proxima-nova-extra-condensed` 26px/900 uppercase, white → **orange `#ff671d` when open**, `border-bottom: 1px #262626`, chevron rotates. `FIND A STORE` is a direct link (no chevron).
  - L2 sub-groups (the column titles, e.g. `LESS-LETHAL PISTOLS`) — 20px/800 uppercase, white → orange when open, own chevron + `#262626` separator. (Learn's columns are direct links — no L2.)
  - L3 items — 20px/900 uppercase white.
- Bottom of drawer: 4 circular-outline social icons.
- Drawer close: Escape, tapping any link, the overlay, or the `X`. Focus returns to hamburger.

## Known omissions
- Search panel UI (button present, handler stubbed).
- Live cart count badge.
- Product-thumbnail / quiz-card raster assets are referenced via the Shopify CDN URLs (not bundled).
- `proxima-nova-extra-condensed` + `skolar-pe` load cross-origin from Adobe Typekit (the same URLs byrna serves); if Typekit is unreachable the condensed/serif fallbacks apply.
