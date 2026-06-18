# Similarweb Header Specification

## Overview
- Site: https://www.similarweb.com/
- Extracted: 2026-05-12, re-extracted 2026-05-14, 2026-06-12
- Target files: bundles/sites/similarweb-com/src/header/{SiteHeader.tsx,mount.tsx}

## Logo
- Inline SVG (no image file). 181×23 viewBox, white fill.
- Wordmark: "similarweb" rendered as vectorized paths. Class `app-header__logo--dark-theme`.
- Link target: `/` (the homepage).
- Container rect: 164×24px (scaled), positioned at left of the navbar row.

## Layout
- Header: `<header class="app-header">`. `position: fixed; z-index: 1500; height: 64px; background: transparent.`
- Inside: `.app-header__navbar.app-header__navbar--dark-theme` — `background: rgb(0, 9, 33)` (deep navy), text color white.
- Container: `max-width: 1248px; padding: 0 24px;` centered.
- Navbar row: flex, items centered vertically. 64px tall.
- Three main regions:
  1. Logo (left)
  2. Main menu (center): Products | Solutions | Resources | Enterprise | Pricing
     - **As of 2026-06-12, "Enterprise" (`/corp/enterprise/`) was added** to the desktop top nav (between Resources and Pricing).
     - **"Explore API" (`/corp/daas/api/`) is NOT in the desktop top nav** — it is present in the DOM but `display:none` at desktop. It only renders in the **mobile drawer** (and as the Products Intelligence-tab bottom-bar link). This is a per-breakpoint difference (failure mode #28): desktop nav = Products/Solutions/Resources/Enterprise/Pricing; mobile drawer = Products/Solutions/Resources/Enterprise/Pricing/Explore API/Login.
  3. User menu (right): Get a demo | Get started | Login

## Nav groups

### Products — button, opens tabbed dropdown
Panel anatomy:
- Width: 1200px, Height: 520px
- Position: absolute-ish (rendered `relative` but popup placed below navbar by parent).
- Layout: **tabbed** — 234px left sidebar (tab nav) + 870-918px right panel (tab content).
- Background: white, border-radius 12px, shadow rgba(25,90,254,0.13) 0 4 12.
- 7 tabs (click to switch): Free Tools, AI Search Intelligence, Web Intelligence, App Intelligence, Sales Intelligence, Retail Intelligence, Stock Intelligence.
- A bottom-right corner link reads "Explore API" → `/corp/daas/api/` (shared across tabs that render it).

Tab 1 — Free Tools (no banner, 4 lists displayed as flex-row):
- Tools (heading): Website Traffic Checker `/website/`, Free App Analytics `/app/`, Free Keyword Tool `/generator/`, UTM Builder `/utm-code-builder/`, SERP Seismograph `/serp/`.
- (unnamed continuation): AI Traffic Checker `/ai-traffic/`, Company Profile Checker `/company/`, Technology Checker `/technology/`, Verify Your Website `/connect/`, Browser Extension `/corp/extension/`.
- Rankings (heading): Top Websites `/top-websites/`, Trending Websites `/top-websites/trending/`, Top Android Apps `/top-apps/google/`, Top iOS Apps `/top-apps/apple/`, Top Amazon Products & Brands `/top-amazon-brands/`.
- (unnamed continuation): Mobile vs. Desktop `/platforms/`, Digital 100 `/corp/digital-100/`.

Tab 2 — AI Search Intelligence (banner + 3 lists):
- **As of 2026-06-12 the entire AI Search Intelligence tab moved to the `aisearch.similarweb.com` subdomain** — every link here is now EXTERNAL (different hostname → opens in a new tab). "AI Share of Voice Monitor" was removed.
- Banner: title "Similarweb AI Search Intelligence", subtitle "Turn AI search from a blind spot into a growth channel, with the competitive intelligence to see where you stand and how to win", href `https://aisearch.similarweb.com/`, variant color `#4D80FF`. CTA "Learn more".
- AI Brand Visibility (heading link `https://aisearch.similarweb.com/ai-brand-visibility/`): AI Citation Analysis `.../ai-brand-visibility/citation-analysis/`, AI Prompt Analysis `.../prompt-analysis/`, AI Sentiment Analysis `.../sentiment-analysis/`.
- AI Traffic Tracker (heading link `https://aisearch.similarweb.com/ai-chatbot-traffic/`): ChatGPT, Perplexity, Claude, Grok, Gemini, Deepseek Traffic Trackers (each `https://aisearch.similarweb.com/ai-chatbot-traffic/<x>-traffic-tracker/`).
- AI Search Optimization Toolsets (heading, no href): GEO Tools `https://aisearch.similarweb.com/geo/`, AEO Tools `https://aisearch.similarweb.com/aeo/`.

Tab 3 — Web Intelligence (banner variant `#195AFE`):
- Banner href `/corp/web/`, subtitle "Gain a powerful competitive edge with in-depth insights into your digital landscape".
- Market Intelligence (`/corp/web/market-intelligence/`): Market Research, Competitor Analysis, Benchmarking, Marketing Strategy, Demand Analysis, AI Trend Analyzer.
- SEO Tools (`/corp/search/seo/`): Keyword Research, Rank Tracker, Backlink Analytics, Site Audit, AI SEO Strategy Agent.
- Ad Intelligence (`/corp/web/advertising/`): Display Advertising, Video Advertising, Paid Search Intelligence.

Tab 4 — App Intelligence (banner variant `#FF326F`):
- Banner href `/corp/apps/`, subtitle "Analyze app performance, market trends, and user behavior to drive smarter business growth".
- App Market Intelligence (`/corp/apps/market-intelligence/`): App Competitor Analysis, Mobile Market Trends, App Technographics (SDK).
- App Performance Analytics (`/corp/apps/analytics/`): App Rating & Reviews, App Usage Analytics, App Revenue Analytics, App Keyword Ranking Tracker `/corp/apps/app-keyword-ranking/` (**added 2026-06-12**).
- App Audience Analytics (`/corp/apps/audience-analytics/`): App Demographics & Interests, App-Web Insights.

Tab 5 — Sales Intelligence (banner variant `#FF7A1A` — note: NOT `#FFA800`; re-measured 2026-05-14):
- Banner href `/corp/sales/`, subtitle "Empower your sales strategy with data to uncover pitching opportunities and engage buyers to drive pipeline".
- **Items reorganized 2026-06-12** (same 3 subgroup headings, items reshuffled; Territory Planning / Account-based Marketing / Value Selling removed; CRM Integrations added; Lead Scoring → "AI Lead Scoring"):
- Sales Strategy & Operations (`/corp/sales/strategy-operations/`): Lead Enrichment, CRM Integrations `/corp/sales/crm-integrations/`.
- Lead Generation (`/corp/sales/lead-gen/`): AI Prospecting Agent, Company Research, Buyer Intent & Signals Data, App Leads Finder.
- Sales Engagement (`/corp/sales/sales-engagement/`): AI Lead Scoring `/corp/sales/lead-scoring/`, AI Outreach Agent, AI Meeting Prep Agent.

Tab 6 — Retail Intelligence (banner variant `#C343FF`):
- Banner href `/corp/retail/`, subtitle "Discover shopping trends and drive your ecommerce growth with consumer behavior insights".
- **Subgroups renamed + items reshuffled 2026-06-12** (still 3 link columns; only heading text/hrefs + items changed — no layout change):
- Shopper Insights for Brands (`/corp/retail/shopper-insights/`): Digital Shelf Analytics `/corp/retail/digital-shelf-analytics/`, Consumer Demand Insights `/corp/retail/consumer-demand/`, On-site Search Optimization, Cross-Retail Shopper Behavior `/corp/retail/shopper-behavior/`, Marketplace Optimization `/corp/retail/marketplace-optimization/`.
- Retail Analytics Tools (`/corp/retail/retail-analytics/`): Retail Price Intelligence `/corp/retail/price-intelligence/`, Category Management, Consumer Analytics `/corp/retail/consumer-analytics/`.
- Amazon Seller Tools (`/corp/retail/amazon-seller-tool/`): Amazon Sales Analytics `/corp/retail/amazon-sales-analytics/`, Amazon Keyword Research `/corp/retail/amazon-keyword-tool/`.

Tab 7 — Stock Intelligence (banner variant `#00CA9A`):
- Banner href `/corp/stocks/`, subtitle "Monitor market trends, track stock performance, and use analytics to make data-backed investments".
- Stock Performance (`/corp/stocks/performance/`): Company Digital Performance.
- Sector Monitoring (`/corp/stocks/sector-analysis/`): Market Trends & Sector Insights.
- Predictive Analytics (`/corp/stocks/predictive-analytics/`): Stock Forecasting.

### Solutions — button, opens tabbed dropdown
Panel anatomy: same overall shape as Products (234px sidebar + panel), 5 tabs:
- By Team (cards grid)
- By Industry (link lists)
- Similarweb AI (cards grid)
- Data as a Service (cards grid)
- Advisory Services & Reporting (cards grid)

Tab: By Team — 6 cards in 3×2 grid, each has gradient top accent + title + description:
| Title | href | variant (RGB) |
|---|---|---|
| Marketing | /corp/teams/marketing/ | 255, 50, 111 |
| SEO & GEO | /corp/teams/seo/ | 15, 191, 229 |
| Sales | /corp/teams/sales/ | 254, 183, 43 |
| Research & Analysts | /corp/teams/research-analytics/ | 0, 205, 152 |
| Ecommerce | /corp/teams/ecommerce/ | 194, 77, 252 |
| PPC | /corp/search/ppc/ | 25, 90, 254 |

Tab: By Industry — "Select industry" heading + 2-column list:
- Retail `/corp/industry/retail/`, Consumer Goods `/corp/industry/consumer-goods/`, Financial Services `/corp/industry/financial/`, Travel `/corp/industry/travel/`, B2B Software & Services `/corp/industry/b2b-services/`.
- Telecom, Media, Agencies, Investors, Logistics.

Tab: Similarweb AI — card grid:
- AI Studio `/corp/ai/ai-studio/`
- AI Agents `/corp/ai/ai-agents/`
- Data for AI `/corp/ai/data-for-ai/`
- MCP `/corp/ai/mcp/`

Tab: Data as a Service — card grid (6 cards, **NOT 7**; as of 2026-05-14):
- Data as a Service `/corp/daas/`
- Integrations `/corp/daas/integrations/`
- MCP `/corp/ai/mcp/`
- API `/corp/daas/api/`
- Data Hub `/corp/daas/datahub/`
- Data Feeds `/corp/daas/data-feeds/`
- ~~Data Licensing~~ — **REMOVED as a card**; it is now surfaced as the contextual side banner on this tab (see "Side banner — contextual per Solutions tab" below).

Tab: Advisory Services & Reporting — card grid:
- Advisory Services `/corp/advisory-services/`
- Custom Reporting `/corp/custom-performance-reporting/`
- Brand Health Tracking `/corp/custom-performance-reporting/brand-health/`
- Category Insights `/corp/custom-performance-reporting/category-insights/`
- Market Share Dashboards `/corp/custom-performance-reporting/market-share-dashboard/`
- Digital Travel Analytics `/corp/custom-performance-reporting/digital-travel-analytics/`

### Resources — button, opens flat dropdown
- Panel anatomy: same width (1200px) and shape (white bg, rounded 12px, shadow), **no tabs**.
- Layout: 3 link lists side-by-side + side banner on the right.
- Panel columns:
  - **Learn**: Seasonal Product Launch `/corp/seasonal-launch-fall-2025/`, Similarweb Academy (ext) `https://academy.similarweb.com/`, Help Center (ext) `https://support.similarweb.com/`, Developers Center (ext) `https://developers.similarweb.com/`.
  - **Explore**: Blog `/blog/`, Customer Stories `/corp/clients/`, Reports & Insights `/corp/reports/`, Webinars `/corp/webinars/`, Events `/corp/events/`.
  - **Company**: About Us `/corp/about/`, Our Data `/corp/ourdata/`, Investor Relations (ext) `https://ir.similarweb.com/`.
- Side banner: "Plan earlier and better for the 2026 holiday season" → `/corp/reports/retail-planning/` with title "Top Holiday 2026 Shopper Trends". Image `https://static-us-east-1.similarcdn.com/static_assets/lite/images/retail-planning.png`.

### Pricing — link
- href: https://www.similarweb.com/packages/marketing/

### User menu (right side)
- Get a demo — ghost button, `/corp/book-a-demo/`. White border, 1px solid, 42px border-radius, 11px 15px padding, font-weight 700, 14px.
- Get started — gradient solid button, `https://account.similarweb.com/journey/registration` (external). Linear gradient from blue to pink to orange; border-radius 42px; font-weight 700.
- Login — flat text link, `https://secure.similarweb.com/account/login/default` (external). White, 500, 16px.

## Desktop behaviors
- Dropdown trigger: **click-only** (hover does not open; only click toggles).
- Close triggers: click outside, Escape, click the trigger again.
- Only one dropdown open at a time (clicking another closes the previous).
- When any dropdown is open, the header gets class `app-header--open` (we apply an equivalent class in the clone for potential style hooks, though not required for functionality).
- Search icon: **absent**.

## Mobile behaviors
- Hamburger breakpoint: 1024px (desktop menu disappears below).
- Hamburger opens a full-height drawer containing: Products, Solutions, Resources, Pricing, Login.
- Items with dropdowns expand inline (no separate page).
- Nested tab nav becomes a simple list inside each expanded group.
- Drawer close triggers: tapping a link, Escape, tapping the X icon.
- Body scroll is locked while drawer is open.

## Computed styles — container
- `.app-header`: position fixed, height 64px, z-index 1500, bg transparent.
- `.app-header__navbar`: background `rgb(0, 9, 33)`, color white.
- `.app-header__container`: max-width 1248px, horizontal padding 24px.
- `.app-menu__button--dark-theme`: padding 6px 12px, transparent bg.
- `.app-menu__button-text`: color `rgb(170, 178, 186)` (muted), font-weight 500, font-size 16px.
- Pricing link: color white, 400, 15px, no underline.
- Get a demo (ghost): color white, bg transparent, border 1px solid white, border-radius 42px, padding 11px 15px, font-weight 700, 14px.
- Get started (solid): background-image `linear-gradient(90deg, rgb(25,90,254) 0.39%, rgb(58,86,232) 28.56%, rgb(196,76,147) 65.51%, rgb(255,109,3) 87.47%, rgb(255,150,3) 99.69%)`, color white, border none, border-radius 42px, padding 12px 16px, font-weight 700, 14px.
- Login link: color white, 500, 16px.

## Computed styles — dropdown (Products/Solutions tab panel)
- Popup: background white, border-radius 12px, box-shadow `rgba(25,90,254,0.13) 0 4px 12px`.
- Popup width: **1200px** (sidebar 282 + active tab panel 918).
- Sidebar (`.app-header__tabs-sidebar`): width 282px, padding **40px 24px 0px**, **NO right border**.
- Tab nav (`.app-header__tabs-nav`): width 234px (282 - 48 padding).
- Inactive tab item: color **rgb(9, 37, 64)** (dark navy), font-weight 500, font-size 16px, height 32px, padding 4px 12px.
- Active tab (`.app-header__tabs-button-content--active`): color `rgb(25, 90, 254)`, bg `rgb(241, 246, 255)`, font-weight 500, font-size 16px.
- **Sidebar divider** (`.app-header__tabs-nav--separator`): 1px horizontal line `bg #eef0f3`, width 234px, with margin-bottom 16px.
  - **Products**: divider after "Free Tools" (separates free tools from intelligence products).
  - **Solutions**: divider after "By Industry" (separates entry-level from advanced offerings).
- Active tab panel: width 918px, padding 40px 24px 24px, **NO left border**. Side banner (when present) sits inside this panel as a flex child, not outside.
- Panel content: 870px wide on Products intelligence tabs (3 cols × 274px + 2 × 24 gap); 593px wide on Solutions panels with side banner (2 cols of cards × 291px + 12 gap, or 2 cols of links).
- List section heading (`.title`): color `rgb(9, 37, 64)`, weight 700, 14px, padding-left 12px.
- List item: color `rgba(9, 37, 64, 0.8)`, weight 400, 13px, padding 8px 12px, no underline.

## Computed styles — bottom container (`.app-header__container-bottom`)
This is a separate full-width bar **below** the tab panel — spans the whole 1200px popup, NOT confined to the right panel.
- Background: `rgb(241, 246, 255)` (light blue).
- Padding: 16px 24px.
- Layout: flex, justify-content flex-end, gap ~24px between links.
- Link style: `13px 400` color `rgb(9, 37, 64)` (dark navy), with arrow-right icon.
- **Per-group links**:
  - **Products → Free Tools tab**: "Contact sales" + "Start free trial".
  - **Products → all other (Intelligence) tabs**: "Explore API" only.
  - **Solutions** (all tabs): "Contact sales" + "Start free trial".
  - **Resources**: "Contact sales" + "Start free trial".

## Computed styles — Solution cards (Solutions "By Team" + AI/DaaS/Advisory tabs)
- 2-column grid (because side banner takes the right ~253px of the panel).
- Card width 291px, height ~116px, border-radius **8px** (NOT 12px).
- Border: `1px solid transparent` (NO visible border).
- Padding: **12px** (NOT 16px).
- Background: solid `rgba(R, G, B, 0.05)` tint (NOT a top-to-bottom gradient).
- Title: `rgb(9, 37, 64)`, 16px 700.
- Description (`.card-subtitle`): `rgb(58, 81, 102)`, 13px 400.
- Icon: 18px, colored variant icon (no circular badge).

## Computed styles — Solution banner (variant-colored top banner in tabs)
- Width: 870px (desktop) / full-column on mobile, height ~154px (desktop) / auto stack on mobile.
- **Gradient ORIGIN differs by breakpoint** — re-measure if uncertain. Both stops/colors are identical, only the radial origin moves:
  - Desktop: `radial-gradient(130% 100% at 120% 0%, var(--variant-color) 0%, rgb(23, 78, 212) 58.5%, rgb(16, 37, 62) 100%)` (bright corner = top-right).
  - Mobile: `radial-gradient(130% 100% at 100% 100%, var(--variant-color) 0%, rgb(23, 78, 212) 58.5%, rgb(16, 37, 62) 100%)` (bright corner = bottom-right).
- Border-radius:
  - Desktop: 12px.
  - Mobile: **8px**.
- Padding:
  - Desktop: standard banner padding around the text/illustration row.
  - Mobile: the `<a>` banner has `padding: 0`. Internal padding `16px 16px 0` lives on the text container only — the illustration sits flush against the banner's bottom edge (zero bottom gap). Replicating with a single padded box leaves an obvious dark band beneath the image, so structure the banner as text-block (padded) + image (no margin) stacked vertically inside an `overflow: hidden` rounded container.
- Title — desktop 24px 700; mobile 24px 700 (uses the desktop-class typography even at mobile, NOT the smaller 20px we previously assumed).
- Subtitle: 14px 400 white (both breakpoints).
- CTA "Learn more" + arrow: 14px 700 white.
- Illustration image on right (desktop) / below text (mobile).
- **Desktop and mobile use DIFFERENT illustration images**, served from different CDN URLs (`...--illustration-container--desktop` vs `...--illustration-container--mobile`). The mobile drawer detail view renders the mobile variant; the bundle stores both as `img` and `imgMobile` per banner. Image URLs captured 2026-05-14:

| Tab | imgDesk filename | imgMob filename |
|---|---|---|
| AI Search Intelligence | `66d5815b0ddc44b42b96.png` | `7722bb2a3a5035b4643f.png` |
| Web Intelligence | `894e53c403a1a27a9184.png` | `ad3eac0159b09c4881a1.png` |
| App Intelligence | `83a55227d85d9acd1703.png` | `5cea08ed1ac2903593e7.png` |
| Sales Intelligence | `4938deb032a6f10eda0d.png` | `2f7d0a1d29fa9e0e9008.png` |
| Retail Intelligence | `95a1d1ccb5fe11f81714.png` | `a8c28eee624a9127e4e9.png` |
| Stock Intelligence | `558a256681d090ff55ba.png` | `fa06e10a278bedca67a3.png` |

Base URL: `https://static-us-east-1.similarcdn.com/build/<build-id>/dist/scripts/lite-app/assets/`. Build id at time of re-extraction: `20260610.master.4f0be23` (rotated from `20260514.master.b107e23`; asset filenames byte-identical, so the artwork is unchanged — only the build-id segment was refreshed).

## Side banner — contextual per Solutions tab
- By default, every Solutions tab and the Resources panel show the **holiday retail planning** banner (kicker "Plan earlier and better for the 2026 holiday season"; title "Top Holiday 2026 Shopper Trends"; image `static_assets/lite/images/retail-planning.png`).
- The **Solutions > Data as a Service** tab swaps the banner for a **Data Licensing** variant (kicker AND title both "Data Licensing"; body "Drive new revenue streams and enhance your product with the world's leading digital insights"; CTA "Explore Data Licensing now"; href `/corp/daas/data-partnerships/`; image `static_assets/lite/images/data-licesing.png` — note the typo `licesing` in the live URL).
- Clone implementation: `SOLUTIONS_SIDE_BANNER_BY_TAB` keyed by tab id, falls back to `DEFAULT_SIDE_BANNER`.
- **Side-banner image sizing (fixed 2026-06-15):** the image renders at its **natural aspect ratio** — do NOT box it into a fixed height. The live `retail-planning.png` is 672×384 (1.75:1) and the live site shows it uncropped (image box width = column width, height = width ÷ 1.75). An earlier clone used a fixed `h-28` (112px) box with `object-cover`, which at the 253px column width (2.26:1) cropped ~32px off the top/bottom ("crushed and cut off"). The `SideBanner` `<img>` is now `block w-full h-auto` (no `object-cover`, no fixed height) so each banner image (retail-planning AND the differently-proportioned data-licensing variant) shows in full. The mobile product banner already used `block w-full h-auto`; the desktop Products gradient-banner cutout uses `object-contain` with `h-[120px] w-auto` (aspect preserved) and was already correct.

## Computed styles — Resources popup (flat)
- Layout: single flex row inside `.app-header__panel` with padding 40px 24px 24px. 3 link columns + side banner column, all at the same level. **No vertical dividers between columns.**
- Side banner: width 253px, **NO left border**, no padding offset.
- Heading (`Learn`, `Explore`, `Company`): color `rgb(9, 37, 64)`, 700, 14px (letter-spacing 0.14px).
- List items (anchors): color `rgb(9, 37, 64)`, 700, 16px, font-family `"DM Sans", system-ui`, no underline, padding 8px 12px. (Distinct from Products/Solutions list-item styling — Resources items are bolder + larger.)
- Bottom container: same `rgb(241, 246, 255)` bar with "Contact sales" + "Start free trial".

## Known omissions
- The desktop Products/Solutions panel illustration PNGs are hosted on `static-us-east-1.similarcdn.com`. These are referenced by remote URL rather than bundled — they render if the CDN is reachable, and degrade gracefully (gradient banner only) if not.
- The "app-header--open" body-scroll-lock class toggle is not replicated; clone uses `body.style.overflow = "hidden"` only when the mobile drawer is open.
- The main product-row desktop illustrations are optional and currently omitted for size.
- "Explore API" link in the Products dropdown footer is rendered only on Intelligence tabs (not on Free Tools). The clone renders it on the same set.
- **Inline brand icons for each product-tab sidebar entry** and **per-item link icons inside dropdown panels** are rendered via inline SVGs extracted directly from the live site and bundled into `src/header/icons.generated.ts` via `research/extracted/generate-icons.mjs`. Per-item icons are looked up by **exact label string** (`getIconSvg(label)`); a label with no matching key falls back to a neutral circle marker. So renaming an item in `SiteHeader.tsx` (or adding a new one) requires a matching icon key, or the icon silently disappears.
  - **Icon pipeline / regeneration (read before re-running the generator):** `generate-icons.mjs` merges icons from `products-clean.json`, `solutions-clean.json`, `resources-icons.json`, `sidebar-brand-icons.json`, and the supplemental `extra-icons.json`. It also normalizes hardcoded fills/strokes (`#3A5166` slate, `#195AFE` brand blue) to `currentColor` for label icons so they inherit the menu's text color (sidebar brand icons in `SIDEBAR_BRAND_SVG_BY_ID` keep their brand colors). **The committed `icons.generated.ts` is a superset of what the primary JSON sources alone can reproduce** — a few items that exist on the live site are not present in `products-clean.json`/`resources-icons.json` (currently `AI Trend Analyzer`, `Deepseek Traffic Tracker`, `Events`) and live **only** in `extra-icons.json`. The 2026-06-12 reorg additions (`App Keyword Ranking Tracker`, `CRM Integrations`, `AI Lead Scoring`, `Digital Shelf Analytics`, `Consumer Demand Insights`, `Cross-Retail Shopper Behavior`, `Marketplace Optimization`, `Retail Price Intelligence`, `Consumer Analytics`, `Amazon Sales Analytics`, `Amazon Keyword Research`) are also supplied via `extra-icons.json`. When you re-run the generator, **verify the new output is a superset of the previous `icons.generated.ts`** (diff the `["label"]:` keys; nothing should be dropped) before rebuilding — regenerating from the JSON sources without these supplements is lossy.
- **Top yellow promo bar** above the header (e.g. "What will define the 2026 holiday season? … Download the report →") is a dismissable marketing banner, out of scope for a drop-in header bundle.
- **Simi AI chat widget** bottom-right of the live page is a separate third-party widget, out of scope.
