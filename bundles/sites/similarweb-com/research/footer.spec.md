# Similarweb Footer Specification

## Overview
- Site: https://www.similarweb.com/
- Extracted: 2026-04-24
- Target files: bundles/sites/similarweb-com/src/footer/{SiteFooter.tsx,mount.tsx}

## Layout
- `<footer class="app-footer app-footer--dark-theme">`.
- Background: `rgb(0, 9, 33)` (deep navy — matches header).
- Text color: `rgba(255, 255, 255, 0.6)`.
- Container: max-width 1248px, horizontal padding 24px.
- Padding-top: ~64px. Padding-bottom: ~48px.

## Grid (desktop ≥ 1024px)
From heading x-coordinate analysis, 5 columns:
1. **Identity column** (x=120): Logo + "Follow us on:" + social icons + primary address.
2. **Nav col 2** (x=460): Rankings (top) + Free Tools (bottom) — stacked.
3. **Nav col 3** (x=679): Solutions (top) + Data (bottom) — stacked.
4. **Nav col 4** (x=898): Resources.
5. **Nav col 5** (x=1117): About us.

## Identity column
- Similarweb logo SVG (same shape as header; `.app-footer__logo`).
- "Follow us on:" label (class `app-footer__social-title`).
- Social icons (24×24, color rgba(255,255,255,0.6), transparent bg, no border):
  - Facebook: https://www.facebook.com/Similarweb
  - Twitter/X: https://twitter.com/intent/user?screen_name=similarweb
  - LinkedIn: https://www.linkedin.com/company/similarweb
  - YouTube: https://www.youtube.com/channel/UCVCI01HR6iB4AA4ChW08cvQ
  - Instagram: https://www.instagram.com/similarwebinsights/
  - WeChat: https://mp.weixin.qq.com/s/dP9RRhIGCvDpdFh8hCKuww
- Primary office (address link): `6 E 32nd St, New York, NY 10016, 8 Floor` → https://maps.app.goo.gl/bRdHcBbdvVRWnW1z6 (ext).

## Columns

### Rankings
| Label | href |
|---|---|
| Top Websites | /top-websites/ |
| Top Android Apps | /top-apps/google/ |
| Top iOS Apps | /top-apps/apple/ |
| Top Amazon Products & Brands | /top-amazon-brands/ |
| Digital 100 | /corp/digital-100/ |
| Top Browsers | /browsers/ |
| Mobile vs. Desktop | /platforms/ |

### Free Tools (stacked below Rankings)
| Label | href |
|---|---|
| Website Traffic Checker | /website/ |
| AI Traffic Checker | /ai-traffic/ |
| Free App Analytics | /app/ |
| Keyword Generator | /generator/ |
| SERP Seismometer | /serp/ |

### Solutions
| Label | href |
|---|---|
| Web Intelligence | /corp/web/ |
| App Intelligence | /corp/apps/ |
| Retail Intelligence | /corp/retail/ |
| Sales Intelligence | /corp/sales/ |
| Stock Intelligence | /corp/stocks/ |
| Data-as-a-Service | /corp/daas/ |
| Advisory Services | /corp/advisory-services/ |
| Custom Reporting | /corp/custom-market-reports/ |

### Data (stacked below Solutions)
| Label | href |
|---|---|
| Our Data | /corp/ourdata/ |
| Verify Your Website | /connect/ |
| Browser Extension | /corp/extension/ |

### Resources
| Label | href |
|---|---|
| Blog | /blog/ |
| Reports | /corp/reports/ |
| Webinars | /corp/webinars/ |
| Events | /corp/events/ |
| Knowledge Center & Support | https://support.similarweb.com/ (ext) |
| Insights | /blog/insights/ |

### About us
| Label | href |
|---|---|
| Company | /corp/about/ |
| Partners | /corp/partner-with-similarweb/ |
| Customers | /corp/clients/ |
| Leadership | /corp/leadership/ |
| Acquisitions | /corp/about/acquisitions/ |
| Careers | /corp/careers/ |
| Press | https://ir.similarweb.com/news/press-releases (ext) |
| Engineering | https://medium.com/similarweb-engineering (ext) |
| Pricing | https://www.similarweb.com/packages/marketing/ |
| Investor Relations | https://ir.similarweb.com (ext) |
| Media Data Access | /corp/about/press-data/ |
| Customer Reviews | /corp/reviews/ |

## Bottom area
- "See all Similarweb offices" button (class `app-footer__offices-title-desktop`) — opens an inline offices list. (Clone: stub renders a plain link to our primary office maps page; the multi-office dropdown UX is **omitted** as it is noisy for a bundled footer.)
- Language switcher button labeled "English" with dropdown containing 11 languages (German, English, Spanish, French, Italian, Japanese, Portuguese, Turkish, Simplified Chinese, Traditional Chinese, Russian). **Clone renders the button as a non-interactive visual stub (click is a no-op) — language switching requires the host site to re-serve content.**
- Additional links row: Categories `/category/`, Countries `/country/`, Privacy `/corp/legal/privacy-policy/`, Security `/corp/privacy-security/`, Terms `/corp/legal/terms/`, Equal Pay `/corp/2025-report/`, Manage Cookies (button, stub), Accessibility Menu (button, stub).
- Copyright: "© Similarweb LTD 2026 All Rights Reserved".

## Computed styles
- Footer bg: rgb(0, 9, 33).
- Nav-title heading: color white, font-weight 500, font-size 16px, no uppercase.
- Nav list link: color rgba(255,255,255,0.6), 400, 14px, no underline.
- Social icon link: color rgba(255,255,255,0.6), 24×24, no border, no bg.
- Legal/additional link: color rgba(255,255,255,0.6), 400, 14px, no underline.
- Copyright: color white, 400, 14px.

## Known omissions
- Multi-office dropdown (8+ office selector with per-office address and map link) — replaced by a single "See all Similarweb offices" link to `/corp/about/` (primary address still shown up top).
- Language switcher — rendered as a static label "English" with a caret, click does nothing.
- Manage Cookies / Accessibility Menu buttons — rendered, click is a no-op (cookie consent is a separate SaaS integration out of scope).
- WeChat QR code popup — only the link is kept.
