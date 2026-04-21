# Byrna Header Specification

## Overview
- Site: https://byrna.com/
- Extracted: 2026-04-21
- Target files: `bundles/sites/byrna/src/header/{SiteHeader.tsx,mount.tsx}`
- Scope class: `bw-scope`
- Global: `window.ByrnaHeader`
- Mount id: `#byrna-header-root`

Implementation is a JS-driven hover/click state machine. Built with React + Tailwind v4 (utilities + theme only, preflight omitted) and ships as a single self-contained IIFE bundle.

## Logo
- src: `https://byrna.com/cdn/shop/files/Byrna-Logo_400x.jpg?v=1688423395`
- alt: `Byrna`
- dimensions: 205×79 (rendered at `h-12`, ~124×48)
- link: `https://byrna.com/`

## Trailing controls (desktop, right-side)
- Search button — icon only, stubbed (search panel is out of scope per `/clone-header-footer` contract)
- Account: `https://byrna.com/account/login`
- Cart: `https://byrna.com/cart`

## Nav groups

### Products — href: https://byrna.com/collections/all-byrna-products
Hybrid dropdown: 4 subgroup columns + 7 direct items separated by a divider.

#### Subgroup — Less-Lethal Pistols (href: /collections/byrna-non-lethal-guns)
| Label | href |
|-------|------|
| Byrna CL-XL | https://byrna.com/products/byrna-clxl-launcher-universal-kit |
| Byrna CL | https://byrna.com/products/byrna-compact-launcher-universal-kit |
| Byrna SD | https://byrna.com/products/byrna-sd-non-lethal-self-defense-pistol |
| Byrna LE | https://byrna.com/products/le-kit |

#### Subgroup — Less-Lethal Rifles (href: /collections/less-lethal-self-defense-rifles)
| Label | href |
|-------|------|
| Byrna Mission 4 | https://byrna.com/products/mission-4-kit |
| Byrna TCR | https://byrna.com/products/byrna-tcr |

#### Subgroup — Ammo & CO2 (no group-level href on the live site)
| Label | href |
|-------|------|
| .61 Caliber CL Ammo | https://byrna.com/collections/61-projectiles |
| .68 Caliber Ammo | https://byrna.com/collections/ammo-and-projectiles |
| CO2 | https://byrna.com/collections/byrna-co2 |

#### Subgroup — Accessories / Apparel (href: /collections/accessories)
| Label | href |
|-------|------|
| CL-XL Accessories | https://byrna.com/collections/byrna-clxl-accessories |
| CL Accessories | https://byrna.com/collections/byrna-compact-launcher-accessories |
| SD/EP Accessories | https://byrna.com/collections/sd-launcher-accessories |
| LE/SDXL Accessories | https://byrna.com/collections/hd-xl-launcher-accessories |
| TCR Accessories | https://byrna.com/collections/byrna-tcr-accessories |
| Mission 4 Accessories | https://byrna.com/collections/byrna-mission-4-accessories |
| Apparel | https://byrna.com/collections/apparel |

#### Direct items (rendered below subgroups, divider)
| Label | href |
|-------|------|
| Byrna Duo | https://byrna.com/products/byrna-duo |
| Defense Sprays | https://byrna.com/collections/bgr-max-pepper-spray |
| Less-Lethal 12 Gauge Round | https://byrna.com/products/less-lethal-12-gauge-round-10ct |
| Banshee Safety Alarm | https://byrna.com/products/byrna-banshee-personal-safety-alarm |
| Backpack Body Armor | https://byrna.com/collections/backpack-body-armor |
| ByrnaCare | https://byrna.com/collections/byrnacare |
| Clearance | https://byrna.com/collections/clearance |

### Find a Store — href: https://byrna.com/pages/dealer-locator
No dropdown. Rendered as a direct link.

### About Byrna — href: https://byrna.com/pages/about
| Label | href | external |
|-------|------|----------|
| Byrna's Mission | https://byrna.com/pages/about | — |
| Byrna's Technology | https://byrna.com/pages/byrna-technology | — |
| Product Catalog | https://byrna.com/pages/2026-product-catalog | — |
| Media | https://byrna.com/blogs/media | — |
| FAQ's | https://byrna.com/pages/faq | — |

#### Subgroup — Free Speech Saves Lives (href: /pages/stop-censoring-byrna)
| Label | href |
|-------|------|
| Big Tech Censors Byrna | https://byrna.com/pages/stop-censoring-byrna |
| Big Tech Censors Gun Control Discussions | https://byrna.com/pages/big-tech-is-censoring-discussion-of-how-to-reduce-gun-violence-in-america |

### Reviews/Stories — href: https://byrna.com/pages/reviews
| Label | href |
|-------|------|
| Reviews | https://byrna.com/pages/reviews |
| Blogs | https://byrna.com/blogs/byrna-nation |
| Byrna Tips | https://byrna.com/blogs/learn |

### Contact Us — href: https://byrna.com/pages/contact-us
| Label | href | external |
|-------|------|----------|
| Become a Dealer | https://byrna.com/pages/dealer-sales-inquiries | — |
| Customer Service | https://byrna.com/pages/contact-us | — |
| Warranty Registration | https://care.byrna.com/register | yes |
| Service and Returns | https://care.byrna.com/rma | yes |
| Order Status | https://byrna.com/pages/order-status | — |
| Investors | https://ir.byrna.com/ | yes |
| Media Inquiries | https://byrna.com/pages/media-inquiries | — |

## Desktop behaviors
- Dropdown trigger: hover opens; click also toggles.
- Close triggers: outside `mousedown`, `Escape`, or opening a different group.
- `aria-haspopup="menu"`, `aria-expanded`, `role="menu"`, `role="menuitem"` are set.
- "Find a Store" has no dropdown and renders as a direct `<a>`.
- Search icon is present but stubbed — clicking it does nothing (explicit scope decision; implementing a search panel is out of scope).

## Mobile behaviors (breakpoint: `lg` = 1024px)
- Hamburger toggles the drawer; body scroll is locked while open (`document.body.style.overflow = "hidden"`).
- Cart icon remains visible in the top bar even when the drawer is closed.
- Each group expands in place; opening one does not auto-close others (mobile pattern differs from desktop by design).
- Drawer close triggers: Escape, tapping any link, toggling hamburger again.
- On close, focus returns to the hamburger button.
- Drawer scrolls internally when taller than the viewport (`max-h-[calc(100vh-5rem)] overflow-y-auto`).

## Computed styles — container
- Brand ink color: `#020122` (navy-black)
- Brand accent: `#ff671d` (orange, used on hover + CTAs)
- Header background: `#ffffff`
- Header border-bottom: `1px solid #020122`
- Nav font: condensed, bold, uppercase; web-font on live site is `proxima-nova-extra-condensed`. Bundle falls back to system-ui + Arial for portability. The nav is still visually dense + uppercase via Tailwind classes.
- Header is `sticky top-0` so it stays pinned as the user scrolls.

## Known omissions
- `top-geo-bar` country switcher (US / CA / LE) and `top-bar` promo slider above the header on the live site.
- Search panel UI (button present, handler stubbed).
- Live cart count badge (cart icon links to `/cart` but does not reflect a server-side cart state).
- `proxima-nova-extra-condensed` webfont (licensed). Uses system fallback.
