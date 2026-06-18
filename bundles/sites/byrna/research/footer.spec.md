# Byrna Footer Specification

## Overview
- Site: https://byrna.com/
- Extracted: 2026-04-21 (re-extracted: 2026-06-18 — data-only; **fidelity re-extraction 2026-06-18** — true layout, fonts, no headings)
- Target files: `bundles/sites/byrna/src/footer/{SiteFooter.tsx,mount.tsx}`
- Raw-mode artifacts also ship (see `src/raw/`); `SiteFooter` is reused verbatim by the raw static render.
- Scope class: `bw-scope`
- Global: `window.ByrnaFooter`
- Mount id: `#byrna-footer-root`

## Layout (corrected)
The live footer is a single `flex` row (`justify-content: space-between; flex-wrap: wrap`) on a navy `#020122` background:
- **Newsletter block on the LEFT** (~420–450px wide).
- **Four link columns on the RIGHT** — **NO visible headings** (the Shopify CMS block titles `082725 C2 Footer 1`, `C2 Footer 2`, … are `display:none`). The previous clone incorrectly invented headings (`Shop & Support`, `Company`, `Legal & Investors`); these are removed.
- Below: a centered **white Byrna logo** (`logo3`).
- Bottom: centered **payment icons** then the copyright line.
- Mobile (≤640px): newsletter full-width on top, then the link lists in a 2-column grid, logo + payment centered.

## Link columns (no headings, white serif)

### Column 1
Byrna Retail Stores · Find A Dealer · Shop All Products · First Aid · Product Documents · Warranty Registration (`care.byrna.com/register`, ext) · Service & Returns (`care.byrna.com/rma`, ext)

### Column 2
Return Policy · FAQ · About · Contact · Careers · International Inquiries (`mailto:international@byrna.com`) · Media · **Accessibility** (stub — accessibility-widget JS trigger)

### Column 3
Shipping Restrictions · Order Status · Terms Of Use · Privacy Policy · Investors (`ir.byrna.com`, ext) · NASDAQ: BYRN (ext) · Law Enforcement (`le.byrna.com`, ext) · Become an Affiliate · **Cookie Settings** (stub — OneTrust JS trigger)

### Column 4 (social — text links, not icons)
Facebook · Twitter · Instagram · Youtube — each rendered as the **text label followed by a small ↗ external-arrow** (12px), opening in a new tab with `rel="noopener noreferrer"`. (Live uses a 12px arrow image; the clone uses an inline SVG arrow.)

## Newsletter (left block)
- Heading: `SIGN UP TO BE THE FIRST TO ACCESS NEW PRODUCT ANNOUNCEMENTS & SPECIAL PROMOTIONS` — `proxima-nova-extra-condensed`, 24px, weight 700, white.
- Field: a **rounded-full (pill) container with a 1px white border**; transparent input, `Your Email*` placeholder (white/70); an orange **`JOIN`** pill button on the right (`#ff671d`, `proxima-nova-extra-condensed` 20px/900 white, `border-radius: 24px`, `padding: 6.5px 40px`).
- `POST https://byrna.com/contact#footer-classic`; `onSubmit` is `preventDefault`-ed (visual stub).

## Bottom bar
- Logo (centered): `https://byrna.com/cdn/shop/files/logo3_2000x.png?v=1676410937` (white wordmark), links to `/`.
- Payment icons (centered): American Express, Diners Club, Discover, Google Pay, JCB, Mastercard, Visa — rendered as small white chips (live uses an SVG sprite).
- Copyright: `© 2026 Byrna. All Rights Reserved.` (~12px, white).

## Computed styles (measured live, now matched)
- Background: `#020122` (navy-black).
- **Links: `skolar-pe` SERIF, 16px, weight 400, line-height 26px, color WHITE `#ffffff`, hover orange `#ff671d`.** (The previous clone used a white sans stack at 80% opacity — the serif face + full-white default were the main footer misses.) `skolar-pe` is now `@font-face`-loaded from Typekit in `styles.css` (fallback Georgia serif).
- Newsletter heading + JOIN button use `proxima-nova-extra-condensed` (`.bw-cond`).
- Accent: `#ff671d` (link hover + JOIN CTA).

## Known omissions
- `Accessibility` (col 2) and `Cookie Settings` (col 3) are JS-overlay triggers on the live site (accessibility widget / OneTrust). Rendered as non-navigating `<button>` stubs (`stub: true`); no handler wired.
- Klaviyo / Shopify newsletter back-end integration (form is a visual-only stub).
- Exact payment-method SVG art (rendered as white text chips; same ordering as the live site).
- `skolar-pe` loads cross-origin from Adobe Typekit; serif fallback applies if unreachable.
