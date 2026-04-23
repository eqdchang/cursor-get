# Solventum Header Specification

## Overview
- Site: https://www.solventum.com/en-us/home/
- Extracted: 2026-04-23
- Target files: bundles/sites/solventum/src/header/{SiteHeader.tsx,mount.tsx}
- Tech stack on source: AEM (Adobe Experience Manager) — all class names begin with `cmp-`.

## Logo
- src: `https://s7d9.scene7.com/is/content/mmmspinco/solventum-logo-horz-black-4?ts=1755617370220&dpr=off`
- alt: `Go to the Solventum homepage.`
- intrinsic: 300 × 75 (rendered at 192 × 48 on desktop)
- link: `/en-us/home/`
- mobile: same image, rendered ~130 × ~32

## Top utility bar (desktop, above main nav)
Order, left to right:
1. Logo (links to home)
2. Login — `/en-us/home/login/`
3. Investors — `https://investors.solventum.com/` (external, new tab)
4. Careers — `/en-us/home/our-company/careers/`
5. Partner Portal login — `https://order.solventum.com/` (external, new tab)
6. Contact us — `/en-us/home/our-company/contact-us/` (rendered as a pill-button with green border)
7. Search input (STUBBED — icon + placeholder render for layout only, no submit handler)
8. Language switcher — `EN-US` with globe icon (STUBBED — renders the label only, no dropdown)

## Measured computed styles (extracted 2026-04-23)

### Utility links (Login, Investors, Careers, Partner Portal login)
- color: `#303030` (dark grey-black)
- font-size: 14px
- text-decoration: **underline** by default; no underline on hover

### Main nav trigger buttons (Medical, Oral care, …)
- color: `#005145` (dark green) — NOT `#303030`
- font-weight: **700 (bold)**
- font-size: 14px
- active/open state: color `#00A053` (bright green) + 2px bottom border

### Dropdown panel (extracted while Medical panel open)
| Element | color | font-weight | font-size |
|---|---|---|---|
| Section header link ("Medical →") | `#05DD4D` | 400 (normal) | **32px** |
| secondary-title row | `#05DD4D` | 400 (normal) | **20px** |
| subtitle row | `#DBFFF0` (light mint) | 400 | 16px |
| description paragraph | `#FFFFFF` | 400 | 16px |
| callout row button | `#DBFFF0` (light mint) | **700 (bold)** | 16px |

All dropdown links: `text-decoration: none` (no underline in any state).

## Main nav (desktop, below utility bar)
8 top-level items in order. Dropdowns open **on click only** (not hover). Only one dropdown open at a time. Closes on second click, Escape key, or outside click. Panel is full-width of the 1280px container, dark green (`#005145`), fixed-positioned below the nav bar.

### Panel anatomy (universal)
- Width: **1280px** (= inner container width), aligned with the nav bar
- Layout: flex row with 40px gap between subgroup columns
- Panel background: `#005145` (dark green)
- Header region: dropdown's title link at **32px font-size, weight 400, color `#05DD4D`** with an arrow `→` suffix
- Body: N subgroup columns, each column is its own vertical stack
- Bottom callout row (ocean-green band `#003D31`, full-width): 0–5 icon-button links, evenly distributed
- Row types used across the site (enumerated up front so the renderer is stable):
  - **secondary-title** — linked subgroup heading (**20px, weight 400, color `#05DD4D`**, arrow `→` suffix)
  - **heading-static** — non-clickable subgroup heading (same style but no link/arrow; used by HIT)
  - **subtitle** — regular link under a heading (**16px, color `#DBFFF0` light mint**, no underline)
  - **description** — paragraph of body text (**16px, color `#FFFFFF`**, used in Resources / Education / Our company)
- No row types exist on the live site beyond these four.

### 1. Medical — href: `/en-us/home/medical/`
- Layout: 3-column grid × 2 rows = 6 subgroup columns total (grid wraps on smaller widths)
- Callout: 5 icons

Columns:
1. **Advanced wound care** `/en-us/home/medical/advanced-wound-care/`
   - Advanced skin care — `/en-us/home/medical/advanced-wound-care/advanced-skin-care/`
   - Negative pressure wound therapy — `/en-us/home/medical/advanced-wound-care/negative-pressure-wound-therapy/`
   - Advanced wound dressings — `/en-us/home/medical/advanced-wound-care/advanced-wound-dressings/`
2. **Surgical solutions** `/en-us/home/medical/surgical-solutions/`
   - Antimicrobial incise drapes — `/en-us/home/medical/surgical-solutions/antimicrobial-incise-drapes/`
   - Temperature management — `/en-us/home/medical/surgical-solutions/temperature-management/`
   - Surgical skin preparation — `/en-us/home/medical/surgical-solutions/skin-preparations/`
3. **IV site management** `/en-us/home/medical/iv-site-management/`
   - IV dressings — `/en-us/home/medical/iv-site-management/iv-dressings/`
   - Disinfecting port protectors — `/en-us/home/medical/iv-site-management/disinfecting-port-protectors/`
   - IV training — `/en-us/home/medical/iv-site-management/iv-training/`
4. **Sterilization assurance** `/en-us/home/medical/sterilization-assurance/`
   - Steam sterilization — `/en-us/home/medical/sterilization-assurance/steam-sterilization/`
   - Low temperature sterilization (VH2O2 & EtO) — `/en-us/home/medical/sterilization-assurance/low-temperature-sterilization/`
5. **Patient management & monitoring** `/en-us/home/medical/patient-monitoring-and-management/`
   - Littmann® Stethoscopes — `https://www.littmann.com/en-us/home/` (external)
   - ECG Electrodes — `/en-us/home/medical/patient-monitoring-and-management/ecg-electrodes/`
   - Medical tapes, wraps & securement devices — `/en-us/home/medical/patient-monitoring-and-management/medical-tapes-wraps-and-securement-devices/`
6. **Medical technologies OEM** `/en-us/home/medical/medical-technologies-oem/`
   - Transdermal components — `/en-us/home/medical/medical-technologies-oem/transdermal-components/`
   - Medical wearables — `/en-us/home/medical/medical-technologies-oem/medical-wearables/`
   - Diagnostics — `/en-us/home/medical/medical-technologies-oem/diagnostics/`
   - Resources — `/en-us/home/medical/medical-technologies-oem/resources/`
   - Optical solutions — `/en-us/home/medical/medical-technologies-oem/optical-solutions/`

Callout: Resources (icon `resources`) · Education (`education`) · Solventum™ Express — `https://express.solventum.com/` (external, `external-link`) · Instructions for use — `https://eifu.solventum.com/` (external, `search`) · Support (`support`).

### 2. Oral care — href: `/en-us/home/oral-care/`
- Layout: 4 subgroup columns in a single row
- Callout: 5 icons

Columns:
1. **Dental professionals** `/en-us/home/oral-care/dental-solutions/`
   - Direct procedures — `/en-us/home/oral-care/dental-solutions/direct-procedure/`
   - Indirect procedures — `/en-us/home/oral-care/dental-solutions/indirect-procedure/`
   - Preventative dental care — `/en-us/home/oral-care/dental-solutions/preventive-care/`
   - Custom solutions — `/en-us/home/oral-care/dental-solutions/custom-solutions/`
   - All dental products — `/en-us/home/oral-care/dental-solutions/all-products/`
2. **Orthodontic professionals** `/en-us/home/oral-care/orthodontic-solutions/`
   - Fixed orthodontic appliances — `/en-us/home/oral-care/orthodontic-solutions/fixed-appliances/`
   - Orthodontic bonding solutions — `/en-us/home/oral-care/orthodontic-solutions/bonding-solutions/`
   - Custom orthodontic solutions — `/en-us/home/oral-care/clarity-solutions/`
   - All orthodontic products — `/en-us/home/oral-care/orthodontic-solutions/all-products/`
3. **Clarity™ solutions** `/en-us/home/oral-care/clarity-solutions/`
   - Clarity™ Aligners — `/en-us/home/oral-care/clarity-solutions/clarity-aligners/`
   - Clarity™ Precision Grip Attachments — `/en-us/home/oral-care/clarity-solutions/clarity-precision-grip-attachments/`
   - Clarity™ Digital Bonding — `/en-us/home/oral-care/clarity-solutions/clarity-digital-bonding/`
   - Clarity™ Attachment Material — `https://www.solventum.com/en-us/home/f/b5005574000/`
   - Clarity™ Portal — `/en-us/home/oral-care/clarity-solutions/clarity-portal/`
4. **Resources & support** `/en-us/home/oral-care/resources/`
   - Authorized dental distributors — `/en-us/home/oral-care/support/distributors/`
   - Brain Floss blog — `/en-us/home/oral-care/brain-floss/`
   - Our rebrand story — `/en-us/home/oral-care/support/our-rebrand-story/`

Callout: Education · Oral care support · All oral care products · Clarity™ Portal login (external `https://clarity.solventum.com/`) · Are you a patient? (`person`).

### 3. Health information & technology — href: `/en-us/home/health-information-technology/`
- Layout: 6 subgroup columns (first 4 are non-clickable `heading-static`, last 2 are linked `secondary-title`)
- Callout: 1 icon

Columns:
1. **Solutions** (non-clickable)
   - Ambient documentation and speech recognition — `/en-us/home/health-information-technology/ambient-documentation-speech-recognition/`
   - Clinical documentation integrity — `/en-us/home/health-information-technology/clinical-documentation-integrity/`
   - Coding — `/en-us/home/health-information-technology/coding/`
   - Population health analytics and grouping — `/en-us/home/health-information-technology/population-health-analytics-grouping/`
   - Consulting and outsourced services — `/en-us/home/health-information-technology/consulting-outsourced-services/`
2. **Who we serve** (non-clickable)
   - Clinicians — `/en-us/home/health-information-technology/clinicians/`
   - Revenue cycle teams — `/en-us/home/health-information-technology/revenue-cycle-teams/`
   - Payers and payment programs — `/en-us/home/health-information-technology/payers-payment-programs/`
   - Federal government health agencies — `/en-us/home/health-information-technology/federal-government-health-agencies/`
   - C-suite — `/en-us/home/health-information-technology/c-suite/`
3. **What we deliver** (non-clickable)
   - Accurate and streamlined clinical documentation — `/en-us/home/health-information-technology/accurate-and-streamlined-clinical-documentation/`
   - Cost and performance management — `/en-us/home/health-information-technology/cost-performance-management/`
   - Quality care and outcomes — `/en-us/home/health-information-technology/quality-care-outcomes/`
4. **Platforms** (non-clickable)
   - Solventum™ Cloud Platform — `/en-us/home/health-information-technology/platforms/cloud/`
   - Solventum™ 360 Encompass™ System — `/en-us/home/health-information-technology/platforms/solventum-360-encompass-system/`
5. **Resources & education** `/en-us/home/health-information-technology/resources-education/`
   - Case studies — (long Algolia-filtered URL, preserved verbatim in source)
   - Webinars — `/en-us/home/health-information-technology/resources-education/webinars/`
   - Events — `/en-us/home/health-information-technology/resources-education/events/`
   - News — `/en-us/home/health-information-technology/news/`
   - Inside Angle blog — `/en-us/home/health-information-technology/resources-education/blog/`
   - HIS Learning Nexus — `https://solventum-his-us.myabsorb.com/` (external)
6. **Support** `/en-us/home/health-information-technology/support/`
   - Submit a support ticket — `https://solventumhis.servicenowservices.com/csm` (external)
   - Product documentation — `https://solventumhis.servicenowservices.com/csm?id=kb_home` (external)

Callout: Contact us → `/en-us/home/health-information-technology/support/` (`support` icon).

### 4. Purification & filtration — href: `/en-us/home/purification-filtration/`
- Layout: 5 subgroup columns in one row
- Callout: empty (no icons)

Columns: Biopharmaceutical purification, Manufacturing, Commercial water, Membranes for OEMs, Residential water. See `nav-dump.json` (or `SiteHeader.tsx` data) for the full 34-link enumeration; pattern is heading-link + 4–8 child links per column ending with Resources + Support.

### 5. Patients & consumers — href: `/en-us/home/patients-consumers/`
- Type: direct link (no dropdown, no chevron)

### 6. Resources — href: `/en-us/home/resources/`
- Layout: 5 subgroup columns
- Row types: 4 columns use `secondary-title` + `description`, 1 column (Purification & filtration) uses `heading-static` + `subtitle` list
- Callout: 3 icons (Instructions for use & certificates, Compliance and safety documents, Lithium battery test summary search — all external)

### 7. Education — href: `/en-us/home/education/`
- Layout: 4 subgroup columns, all `secondary-title` + `description`
- Callout: empty

### 8. Our company — href: `/en-us/home/our-company/`
- Layout: 8 subgroup columns, all `secondary-title` + `description` (long description paragraphs)
- Callout: 2 icons (Newsroom external, Investors external)

## Desktop behaviors (must match live)
- **Click-only** — dropdowns open on click, NOT on hover. Hover alone does nothing.
- Click top-level trigger → opens dropdown. Second click on same trigger → closes it.
- Only one dropdown open at a time; clicking a different trigger closes the previous and opens the new one.
- Escape → closes any open dropdown.
- Outside click (mousedown outside nav root) → closes the dropdown.
- `aria-haspopup="menu"`, `aria-expanded`, `aria-controls`, `role="menu"`, `role="menuitem"` on the right nodes.
- Tab reaches each top-level trigger; Enter / Space toggles.

## Mobile behaviors (viewport < 1024px)
- Hamburger appears top-right, logo left. Layout is a single white bar (~56px tall) with a full-width Search input stub below it.
- Search input row is rendered but not wired up (STUBBED).
- Tapping hamburger opens a full-viewport dark-green drawer listing all 8 top-level items vertically.
- Each expandable top-level item shows a right chevron; tapping opens a sub-panel that shows its columns flattened into a vertical list (heading-link followed by the column's children, separated by spacing).
- `Patients & consumers` has no chevron (direct link).
- Below the 8 top-level items, the mobile drawer shows the utility strip inline: Investors, Careers, Partner Portal login, Contact us, EN-US.
- Drawer close triggers: tap X icon, Escape key, tap a navigable link.
- While drawer is open: `document.body.style.overflow === "hidden"` (no background scroll). On close, focus returns to the hamburger button.

## Computed styles — container
- Overall header height (desktop, both bars): 130px.
- Main nav bar: white background, 48px tall, 1280px inner max-width, centered.
- Utility bar: white background, rendered inline with main nav rather than a separate strip (logo + utility + nav stack vertically in the live DOM).
- Border-bottom on header: `1px solid #6E6E6E` (thin gray hairline at the bottom of the whole header).
- Body font-family (scope default): `"Solve Pro", "Neue Haas Grotesk Text", "Helvetica Neue", Helvetica, Arial, ui-sans-serif, system-ui, sans-serif`.
- Body text color: `#303030`.
- Brand green (primary): `#00A053` (approx — used for links + accents).
- Brand dark green (dropdown background): `#005145` (rgb(0, 81, 69)).
- Brand ocean-green callout strip background: ~`#006A52` (slightly lighter, within dropdown).
- Button pill border color: `#00A053`.

## Known omissions (stubbed, not implemented)
- Search input (desktop + mobile) — renders markup (input + magnifying-glass icon) for layout, no submit handler.
- Language switcher (`EN-US` globe button) — renders as a static label with a globe icon; no country picker modal.
- Login link — real href preserved, but any logged-in state (account chip, avatar) is not implemented.
- Cookie banner / consent modal — not in scope.
- Scene7 dpr/timestamp query params on the logo URL are preserved verbatim.
