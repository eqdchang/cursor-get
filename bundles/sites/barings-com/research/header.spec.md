# Barings.com header — extracted spec

Source: https://www.barings.com/en-us/guest (extracted 2026-05-14, re-extracted 2026-05-15 at 1440×900 and 390×844)

## Change log

- **2026-05-15** — Client diff applied (corp-site update):
  - Strategies → Private Credit Asset Class link order swapped: Global Direct Lending now first, Capital Solutions second (was the reverse). Global Infrastructure and Corporate Private Placements unchanged.
  - Strategies → Private Equity Asset Class link replaced: "Diversified Alternative Equity" (`/strategies/private-equity/diversified-alternative-equity`) → "Private Equity Solutions" (`/strategies/private-equity/private-equity-solutions`).
  - Both changes are data-only and applied in `src/header/data.ts` only. No structural or styling change.
- **2026-05-14** — Initial extraction. Confirmed hover-driven dropdowns (not click), mobile bar uses `space-between` to center the logo between hamburger and search, mobile chrome stays white at all scroll positions.

Screenshots in `images/`:
- `barings-header-default.png` — transparent over hero
- `barings-header-scrolled.png` — white-bg / navy-text scrolled state
- `barings-about-click-default.png` — About dropdown (image+description style)
- `barings-strategies-default.png` — Strategies dropdown with Asset Class right column
- `barings-funds-default.png` — Funds dropdown (image-with-caption row)
- `barings-financing-default.png` — Financing Solutions (single-option + asset class)
- `barings-sustainability.png` — Sustainability (image-with-caption row)
- `barings-perspectives.png` — Perspectives (image+description)
- `barings-contact.png` — Contact (image-with-caption row)
- `barings-locations-modal.png` — Locations panel
- `barings-search-open.png` — Search overlay
- `barings-mobile-default.png` / `barings-mobile-drawer.png` / `barings-mobile-about-expanded.png` — mobile

## Layout

### Container
- 1440px viewport, container roughly `max-width: 1140px`, centered.
- Header height: 64px (excluding the alert banner above it).
- Logo width: 121px × 32px.
- Top-nav cluster starts at x=335 (≈48px gap from logo's right edge).
- Top-nav items spaced ~32px apart (measured: 47, 79, 45, 157, 106, 96, 66 widths separated by ~32px gaps).
- Right utility cluster: search → vertical divider → location pin → lock/account.
  - Each icon ~24×25.
  - Spacing between adjacent icons: ~32–4px (locations to lock = 28, search to locations = 56 because of the divider).

### Header states (animated transition)
- **Transparent (default over hero)**:
  - `background: transparent`
  - Logo: `logo-barings-white.svg` (white wordmark + green/blue accent strikethrough)
  - Nav text + utility icons: white
- **Scrolled / dropdown-open**:
  - `background: #ffffff`
  - Logo: `logo-barings.svg` (navy wordmark)
  - Nav text: navy `#002856`
  - Utility icons: navy `#002856`
- Trigger: `cmp-header__desktop` gets `.scrolled` class via JS `scroll` listener. The same white state is forced when any dropdown is open.
- Transition: `0.2s ease-in` (color + background-color).

### Position
- Live site uses a `position: fixed` wrapper (`<header class="cmp-header">`) that overlays the hero. The bundle uses `position: fixed; top: 0; left: 0; right: 0` to match.
- Alert banner (`cmp-alert`) is a body-level component above the header in the live page — explicitly OUT OF SCOPE for the header bundle. Hosts that want a fraud-warning bar add their own.

## Top-level navigation (7 items)

1. About → `#menu-about`
2. Strategies → `#menu-strategies`
3. Funds → `#menu-funds`
4. Financing Solutions → `#menu-financing-solutions`
5. Sustainability → `#menu-sustainability`
6. Perspectives → `#menu-perspectives`
7. Contact → `#menu-contact`

### Trigger styling
- Font: 13px / 500 / `letter-spacing: 0.5px` / uppercase.
- Default color (over hero): white. Scrolled / dropdown-open: navy `#002856`.
- Active (dropdown open): font-weight bumps to 700.
- Background: transparent. No hover background.
- Transition: `0.2s ease-in`.

### Trigger interaction
- **Hover opens** the corresponding dropdown panel. Verified by inspecting the live CSS: `.cmp-header__desktop:hover { background: #fff }` and JS toggles `.show` on `.sub-menu-navigation` as the cursor enters a `.menu__toggle`.
- The panel and the trigger share a hover region: moving down from the trigger into the panel keeps it open. Moving the cursor entirely away from the header collapses everything (transparent state restored).
- Only one dropdown open at a time. Hovering another trigger swaps content.
- Click on a trigger does nothing destructive — the trigger is a `<button>` with no link; clicking just triggers the same hover-style display state.
- Escape closes the panel.

## Dropdown anatomy

### Panel
- The actual visible panel is `.sub-menu-navigation` (a sibling of the menu list inside `.cmp-header__desktop`). It is hidden by default (`display: none; height: 0; opacity: 0`) and gets `display: block; opacity: 1` when `.show` is added.
- Sits **inline below the header in normal flow** (pushes hero/page content down).
- Background: light gray `rgb(241, 243, 244)` (`#f1f3f4`).
- Full-bleed width (1440px); inner `.container` is `max-width: 1140px; padding: 0 16px`, centered.
- Padding: `padding: 24px 0 32px`. Margin-top: `16px` (visible gap between header bottom and panel top).
- Verified panel rect at 1440 viewport: `x=0 y=139 w=1440 h=207`; container rect `x=150 y=163 w=1140 h=151`.

### Two-column layout
- **Left sidebar** (`col-2`, ~190px content):
  - Vertical list of options.
  - Each option is a `<button>` with text only.
  - Default: 13px / 300 / left-aligned / color `rgb(0, 40, 86)` / `museo-sans, sans-serif` / `text-transform: none` (NOT uppercase) / line-height 19.5px.
  - Padding: `0 0 4px` (small bottom gap between items).
  - Selected: same weight (300), but `text-shadow: rgb(0, 0, 0) 0 0 1px` — produces a faux-bold without changing the layout width.
  - Selected option drives the right pane content.
- **Right content**:
  - Image + description side-by-side, then optional Asset Class column or replaced by a row of image-with-caption cards.

### Right content variant A — Image + description
- Image wrapper: `flex: 0 0 20%; min-width: 166px` (becomes 190px above 1440 viewport, 240px above 1920).
- Image renders **small** — measured `158×119 px` at 1440 viewport. Aspect ratio ≈ 4:3. Native asset is 688×516.
- Description column: `flex: 0 0 41.8%; max-width: 42%; padding-right: 3.5%`.
  - Title: `font-family: kepler-std-display, serif; font-size: 20px; font-weight: 500; line-height: 22.5px; color: rgb(0, 40, 86); min-width: 310px`.
  - Copy: `font-size: 13px; line-height: 19.5px; min-width: 310px; color: inherits body gray (#484848 derivative)`.
  - CTA: "Learn More" — class `cta-link text-green-400`. Color `rgb(0, 120, 54)` (`#007836`), font-weight 700, 13px, museo-sans, no underline.
- Used by: About (all 5 except Careers), Strategies (all 8), Financing Solutions (single option), Perspectives (3), Contact (Locations / Contact Us / Security & Fraud).

### Right content variant B — Image-with-caption row (col-3 each)
- 2–3 cards in a row.
- Each card: image (full-width, aspect ratio square-ish) + caption link below.
- Caption link: 13-14px, navy default, no underline. Hover: green or underline.
- Used by: About > Careers (3 cards), Funds > Closed End Funds (3) / BDC (2), Sustainability (2), Contact > Media (3).

### Right content variant C — Right column "Asset Class" panel
- When present, sits to the right of the description (variant A) at `col-4`.
- Title: "Asset Class" — small caps / serif heading.
- Links: stacked, green `#00953B`, weight 600, 14px, no underline.
- Used by: Strategies (Public Fixed Income, Public Equities, Private Credit, Real Estate, Private Equity), Financing Solutions.

### Sidebar interaction (selected option switches right pane)
- **Mouseenter** on a sidebar `<button>` flips the `.selected` class to that option and shows its content. Verified — hover is what changes the right pane, not click.
- The sidebar has a default-selected option (the first in source order). When the dropdown opens, the first option's content is shown.

## Color trade between header and dropdown
- The header swap (white text → navy text, transparent → white background, white logo → navy logo) is keyed off `.cmp-header__desktop:hover` (or `.scrolled`) — pure CSS, no JS needed. Hovering anywhere on the header (including the dropdown panel which is inside the same wrapper) keeps the header in its "scrolled" appearance.
- Confirmed CSS rule: `.cmp-header__desktop.scrolled, .cmp-header__desktop:hover { background: rgb(255, 255, 255); }`.

## Utility cluster

### Search (button)
- Click toggles a search overlay anchored under the header.
- Overlay: white-ish bar, ~60% width, centered horizontally, 56px tall.
- Contains an input with placeholder "What are you looking for?" and an X close button on the right.
- Press Enter to submit (no live results overlay).
- Submit URL: `/en-us/guest/search?query=<term>`.

### Locations (button)
- Click toggles a regions panel below the header (same gray bg as nav dropdowns, full bleed).
- Panel structure: 4 region columns (col-2, col-2, col-2, col-4) + bottom note.
  - **North America**: Canada, United States.
  - **Latin America**: Argentina, Brazil, Chile, Colombia, Mexico, Panama, Peru, Uruguay.
  - **Asia Pacific**: Australia, China (中国), Hong Kong (香港 - 中文), Hong Kong - English, Japan (日本), Korea, Singapore, Taiwan (台灣).
  - **Europe** (split into 2 sub-columns of 8 each):
    - Col 1: Austria, Belgium, Denmark, Finland, France, Germany, Ireland, Italy.
    - Col 2: Luxembourg, Netherlands, Norway, Portugal, Spain, Sweden, Switzerland, United Kingdom.
- Region heading: 13px / 700 / navy.
- Country links: 13px / 300 / navy, hover green.
- Bottom: "Location not listed? Visit our Global Site." link.
- Each country links to its primary persona page (e.g. Canada → `/en-ca/institutional`, USA → `/en-us/institutional`).

### Account / Client Portal
- An anchor `<a href="https://cap.barings.com/" target="_blank">` (not a button toggle — direct link).
- Padlock SVG icon.

## Mobile (≤960px)

### Mobile header
- Background: white at all scroll positions.
- Hamburger left (24×24), centered logo (121px), search icon right (24×24).
- No location/account icons in compact header bar.

### Mobile drawer (toggle hamburger)
- Slides in from left covering ~80% width (white background).
- Top: X close icon at top-right.
- Items (uppercase, navy 700, 14px, big gaps):
  About, Strategies, Funds, Financing Solutions, Sustainability, Perspectives, Contact.
- Below the menu: Locations link (with pin icon) and Client Portal link (with lock icon).
- Body scroll locked.
- Tapping a top-level item drills into a second-level view:
  - Back arrow at top-left, X close at top-right, sub-menu title in uppercase navy 700.
  - List of sidebar options; each row has a chevron-down on the right; tapping expands the row inline (accordion) revealing the same image + title + copy + Learn More cluster as desktop.
- Escape / X close / tap outside (when drawer is offscreen) closes drawer.

## Accessibility

- Each top-level trigger uses `<button aria-haspopup="menu" aria-expanded={open} aria-controls={panelId}>`.
- Each open panel uses `role="menu"` and inner items use `role="menuitem"` (or `role="link"` when they're links).
- Sidebar option buttons announce as `aria-selected` when active.
- External links (Client Portal): `target="_blank" rel="noopener noreferrer"`.
- Mobile drawer manages focus: focus moves to first link on open, returns to hamburger on close.

## Colors (extracted from computed styles + CSS palette)

| Token        | Value     | Usage                                  |
|--------------|-----------|----------------------------------------|
| navy         | `#002856` | Primary text, icons, active states     |
| green        | `#00953B` | Accent, "Learn More" links, asset class |
| green-400    | `#007836` | Green hover state                      |
| body-gray    | `#484848` | Body copy color                        |
| gray-100     | `#f1f1f1` | Dropdown / footer-nav background       |
| gray-400     | `#d9d9d9` | Footer legal background                |
| white        | `#ffffff` | Header bg (scrolled), card bg          |
