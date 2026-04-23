# Solventum Footer Specification

## Overview
- Site: https://www.solventum.com/en-us/home/
- Extracted: 2026-04-23
- Target files: bundles/sites/solventum/src/footer/{SiteFooter.tsx,mount.tsx}

## Layout
Full-width dark green footer with internal 1280px max-width container. Three regions stacked vertically:
1. **Top row** — Logo (left, ~192 × 48) + mission tagline + "Learn more" CTA link (left side), four link columns (right side)
2. **Divider** — thin horizontal rule (1px `rgba(255,255,255,0.2)`)
3. **Bottom bar** — legal links row (left) + copyright (right)

## Logo
- src: `https://s7d9.scene7.com/is/content/mmmspinco/solventum-logo-horz-white-4?ts=1755617370206&dpr=off`
- alt: `Go to the Solventum homepage.`
- link: `/en-us/home/`
- rendered height: ~68px (white version)

## Mission block (left column)
- Heading: **Our mission**
- Body: "Enabling better, smarter, safer healthcare to improve lives"
- CTA: "Learn more" → `/en-us/home/our-company/` (pill button, outlined green)

## Columns

### Our company
| Label | href | external |
|-------|------|----------|
| About us | /en-us/home/our-company/ | false |
| Careers | /en-us/home/our-company/careers/ | false |
| Investors | https://investors.solventum.com/ | true |
| Partners & suppliers | /en-us/home/our-company/partners-suppliers/ | false |
| Sustainability & social impact | /en-us/home/our-company/sustainability-social-impact/ | false |
| Ethics & compliance | /en-us/home/our-company/ethics-compliance/ | false |
| Newsroom | https://news.solventum.com/ | true |

### Resources & education
| Label | href | external |
|-------|------|----------|
| Solventum stories | /en-us/home/resources/ | false |
| Solventum education | /en-us/home/education/ | false |
| SDS/RDS lookup | https://www.3m.com/3M/en_US/company-us/SDS-search/ | true |
| Instructions for use & certificates | https://eifu.solventum.com/ | true |
| Lithium battery test summary search | https://www.3m.com/3M/en_US/company-us/lithium-battery-test-summary-report-search/ | true |

### Info
| Label | href | external |
|-------|------|----------|
| Contact us | /en-us/home/our-company/contact-us/ | false |
| Partner Portal login | https://order.solventum.com/ | true |
| Site map | /en-us/home/our-company/sitemap/ | false |

### Follow Us
Five social icon circles (Facebook, YouTube, LinkedIn, X/Twitter, Instagram). All open in a new tab. No label text rendered alongside each icon — icons only.

| Platform | href |
|----------|------|
| Facebook | https://www.facebook.com/solventumhealth |
| YouTube | https://www.youtube.com/@Solventum |
| LinkedIn | https://www.linkedin.com/company/solventumhealth/ |
| X (Twitter) | https://twitter.com/solventum |
| Instagram | https://www.instagram.com/solventumhealth |

All five are external. Icon style: circular white-border outline, ~40 × 40px, on dark-green background.

## Bottom bar
Two rows:
1. Legal links (left):
   | Label | href | external |
   |-------|------|----------|
   | Legal | /en-us/home/legal/ | false |
   | Terms of sale | /en-us/home/global-terms-of-sale/ | false |
   | Privacy | /en-us/home/legal/website-privacy-statement/ | false |
   | HIPAA Privacy | /en-us/home/our-company/hipaa-privacy/ | false |
   | Security | /en-us/home/security/ | false |
   | Terms & Conditions | /en-us/home/legal/website-terms-conditions/ | false |
   | DMCA | /en-us/home/legal/dmca/ | false |
   | Accessibility Statement | /en-us/home/our-company/ethics-compliance/accessibility-statement/ | false |
   | Your Privacy Preferences | #cmp-revoke-consent | false |
   | Transparency in Supply Chains and Modern Slavery Disclosures | /content/dam/public/language-masters/en/entp/document/2025/solventum-modern-slavery-statement-entp-en.pdf | true |

2. Copyright (right): `© Solventum 2026. All Rights Reserved.`

## Computed styles
- background: `rgb(1, 51, 43)` → `#01332B` (very dark green)
- color: `rgb(255, 255, 255)` (white text)
- padding: `32px 0`
- link hover color: `#00A053` (green underline / color change)
- column heading font-weight: 600
- column links font-size: ~14px, color: white with 0.8 opacity or `rgb(200,235,220)` approx

## Known omissions
- "Your Privacy Preferences" link (`#cmp-revoke-consent`) — renders as a real `<a>` but clicking it does nothing (the host OneTrust script would normally intercept it).
- The original page has a cookie-consent icon overlay on the "Your Privacy Preferences" link — not replicated; text link only.
