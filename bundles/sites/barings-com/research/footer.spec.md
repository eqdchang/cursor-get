# Barings.com footer — extracted spec

Source: https://www.barings.com/en-us/guest (extracted 2026-05-14, re-extracted 2026-05-15 at 1440×900)
Screenshot: `images/barings-footer-bottom.png`.

## Change log

- **2026-05-15** — Diff round confirmed the corp site updated the colophon copy to "subsidiary of MassMutual **and MS&AD**, seeks to deliver…". The bundle was already on this revision (extracted with the new wording on 2026-05-14), so no code change was required.
- **2026-05-14** — Initial extraction.

The footer has three vertical sections, each full-bleed with a different background color.

## Section 1 — Colophon (white)

- Background: `#ffffff`.
- Padding: ~24px top/bottom on mobile, ~32px on desktop (`py-3 py-md-4`).
- Container width: ~1140px.
- Two columns at desktop:
  - **Who We Are** (col-12 col-sm-8 col-md-6):
    - Heading: `Who We Are` — 16-18px / 700 / navy `#002856` (uses class `heading_overwrite_6`, serif on the live site).
    - Body copy (12-13px / 400 / gray `#484848`):
      > Barings is a $481 billion* global alternative asset manager that partners with institutional, insurance, and wealth clients, and supports leading businesses with flexible financing solutions. The firm, a subsidiary of MassMutual and MS&AD, seeks to deliver excess returns by leveraging its global scale and capabilities across credit, real assets, capital solutions and emerging markets.
    - Asterisk note (italic-ish, 12px gray):
      > *As of March 31, 2026
    - "Contact Us" CTA link: green `#00953B`, 12-13px, no underline.
      - Href: `/en-us/guest/contact/contact-barings`.
  - **Follow Us** (col-12 col-sm-4 col-md-5 offset-md-1):
    - Heading: `Follow Us` — same style as Who We Are heading.
    - Five circular social icons in a row:
      1. LinkedIn → `https://www.linkedin.com/company/barings`
      2. Twitter / X → `https://twitter.com/Barings`
      3. Apple Podcast → `https://podcasts.apple.com/us/podcast/streaming-income-a-podcast-from-barings/id1449496233`
      4. Spotify → `https://open.spotify.com/show/7wv1GJCQHcggXDdMHbhRlY`
      5. YouTube → `https://www.youtube.com/@Barings`
    - Each icon is a 36-40px circle with a thin navy border and a centered glyph. Live site uses pre-rendered SVGs that already include the circle outline (single-color navy `#002856`).
    - Spacing between icons: ~12-16px.
    - All open in new tab (`target="_blank"`).

## Section 2 — Footer nav (gray-100)

- Background: `#f1f1f1` (gray-100).
- Padding: ~12px top/bottom (`py-2`).
- Container width: ~1140px.
- A single horizontal `<ul>` of 5 links separated by 24-32px gaps:
  1. Privacy Notice → `/en-us/guest/content/privacy-notice`
  2. Cookie Notice → `/en-us/guest/content/cookies-notice`
  3. Terms & Conditions → `/en-us/guest/content/terms-and-conditions`
  4. Important Disclosures → `/en-us/guest/content/important-disclosures`
  5. Site Map → `/en-us/guest/sitemap`
- Link styling: 12px / 400 / gray-700 `#484848`, no underline. Hover: navy `#002856`.

## Section 3 — Legal (gray-400)

- Background: `#d9d9d9` (gray-400).
- Padding: ~16-20px top/bottom (`py-3`).
- Three paragraphs of disclaimer text, navy/gray text, 12px / 400 with `<strong>` for the "PAST PERFORMANCE…" call-out:
  1. > The opinions and other information contained herein, whether express or implied are made in good faith in relation to the facts known at the time of preparation and are subject to change without notice. **PAST PERFORMANCE IS NOT NECESSARILY INDICATIVE OF FUTURE RESULTS.** All monetary figures are in USD unless otherwise specified.
  2. > This material should not be construed as a recommendation, and Barings is not soliciting any action based upon such information. Additionally, the strategies and funds may not be available to all investor types in all jurisdictions. In some jurisdictions this website may contain advertising.
  3. > Copyright © 2026 Barings. The BARINGS name and logo design are trademarks of Barings and are registered in U.S. Patent and Trademark Office and in other countries around the world. All rights are reserved.

## Out of scope (not part of the bundle)

- Floating "scroll to top" button (bottom-right circle with up arrow).
- Floating "open chat" speech bubble (bottom-right, below the scroll-to-top).
- Cookie consent banner.
- Lead-gen modal triggered elsewhere on the site.
- Above-footer carousel content.
