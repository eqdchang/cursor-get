# Byrna Footer Specification

## Overview
- Site: https://byrna.com/
- Extracted: 2026-04-21
- Target files: `bundles/sites/byrna/src/footer/{SiteFooter.tsx,mount.tsx}`
- Scope class: `bw-scope`
- Global: `window.ByrnaFooter`
- Mount id: `#byrna-footer-root`

The live footer groups links into 3 anonymous columns plus a social column (Shopify CMS block titles `082725 C2 Footer 1 - Byrnacare`, `C2 Footer 2`, `C2 Footer 3`, `C2 Footer 4` are `display:none`). The bundle restores that layout with explicit, user-facing headings.

## Columns

### Shop & Support
| Label | href | external |
|-------|------|----------|
| Byrna Retail Stores | https://byrna.com/pages/byrna-retail-stores | — |
| Find a Dealer | https://byrna.com/pages/dealer-locator | — |
| Shop All Products | https://byrna.com/collections/all | — |
| First Aid | https://byrna.com/pages/first-aid | — |
| Product Documents | https://byrna.com/pages/product-documents | — |
| Warranty Registration | https://care.byrna.com/register | yes |
| Service & Returns | https://care.byrna.com/rma | yes |

### Company
| Label | href | external |
|-------|------|----------|
| Return Policy | https://byrna.com/pages/return-policy | — |
| FAQ | https://byrna.com/pages/faq | — |
| About | https://byrna.com/pages/about | — |
| Contact | https://byrna.com/pages/contact-us | — |
| Careers | https://byrna.com/pages/careers | — |
| International Inquiries | mailto:international@byrna.com | yes |
| Media | https://byrna.com/blogs/media | — |

### Legal & Investors
| Label | href | external |
|-------|------|----------|
| Shipping Restrictions | https://byrna.com/pages/restrictions | — |
| Order Status | https://byrna.com/pages/order-status | — |
| Terms of Use | https://byrna.com/pages/terms-of-use | — |
| Privacy Policy | https://byrna.com/pages/privacy-policy | — |
| Investors | https://ir.byrna.com/ | yes |
| NASDAQ: BYRN | https://ir.byrna.com/quote | yes |
| Law Enforcement | https://le.byrna.com/ | yes |
| Become an Affiliate | https://byrna.com/pages/byrna-affiliate-application | — |

### Follow Byrna (social icons)
| Label | href |
|-------|------|
| Facebook | https://www.facebook.com/byrnanation |
| Twitter | https://twitter.com/byrnanation |
| Instagram | https://www.instagram.com/byrnanation |
| Youtube | https://www.youtube.com/channel/UCsd__wC1miuRs0Q8uAttc6Q |

All social links open in a new tab with `rel="noopener noreferrer"`.

## Newsletter
Rendered above the columns. Matches the live site's `POST https://byrna.com/contact#footer-classic` form with an `email` input and a `JOIN` submit button. The form's `onSubmit` is `preventDefault`-ed in the bundle so the demo doesn't round-trip. Real subscription handling is out of scope.

## Bottom bar
- Logo (left): `https://byrna.com/cdn/shop/files/logo3_1600x.png?v=1676410937`, links to `https://byrna.com/`
- Copyright (center): `© 2026 Byrna. All Rights Reserved.`
- Payment badges (right): American Express, Diners Club, Discover, Google Pay, JCB, Mastercard, Visa — rendered as text chips since the live SVG sprite is theme-specific.

## Computed styles
- Background: `#020122` (navy-black)
- Body text color: `#ffffff` (with 70–80% opacity for secondary text)
- Accent: `#ff671d` (hover + newsletter CTA)
- Font: inherits from `.bw-scope` (system-ui). Live site uses `skolar-pe`.

## Known omissions
- Klaviyo / Shopify newsletter back-end integration (form is a visual-only stub).
- Exact payment-method SVG art (rendered as text chips; same ordering as the live site).
- `skolar-pe` webfont (licensed). Uses system fallback.
- Region / currency chooser (handled by the top-geo-bar, which is out of scope).
