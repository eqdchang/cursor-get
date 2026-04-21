# boardwalktech.com — Assets Inventory

All assets downloaded by `scripts/download-assets.mjs` into `public/`.

## Source CDN
All images originate from `https://cdn.prod.website-files.com/5eb236230d5bdf2e76923884/` (Webflow CDN). Favicon from a Supabase bucket.

## Local paths

### Brand
- `public/images/brand/boardwalk-tech-logo.png` — 1042×222, used in header (`h-12`) and footer (`h-8`)

### Hero
- `public/images/hero/homepage-image-2.png` — 477×348, alt "Professional working with data"

### Trust row (2×4 grid, rendered order)
- `public/images/trust/accenture.png`
- `public/images/trust/apple.png`
- `public/images/trust/levis.png`
- `public/images/trust/mars.png`
- `public/images/trust/verizon.png`
- `public/images/trust/qualcomm.png`
- `public/images/trust/estee-lauder.png`
- `public/images/trust/meta.png`
  (All sourced at 3840×1932, rendered at `h-8 md:h-10 w-auto object-contain`.)

### Products (2 cards)
- `public/images/products/unity-central.png` — 1045×633
- `public/images/products/velocity.png` — 1045×633

### Information-management features (3 alternating rows)
- `public/images/features/homepage-image-1.png` — 1217×1178 ("A brand-new class of information management")
- `public/images/features/homepage-image-3.png` — 481×348 ("Rapidly transform your data into information")
- `public/images/features/homepage-image-4.png` — 467×344 ("Faster, more insightful decisions")

### Solutions (4 cards)
- `public/images/solutions/supply-chain-excel.jpg` — 1000×667
- `public/images/solutions/financial-services-euc.jpg` — 1000×667
- `public/images/solutions/supply-chain-intel.jpg` — 1200×800
- `public/images/solutions/bpo-agent-ai.jpg` — 1000×667

### Featured article (Bloomberg)
- `public/images/article/bloomberg-hero.avif` — 1440×810

### SEO
- `public/seo/favicon.png` — 32×32 BW logo mark

## Icons
The site uses **Lucide React** icons (already bundled by the source). We'll use the same via the `lucide-react` package which is already installed. Icons observed:
- `Menu` (header hamburger)
- `ArrowRight` (all CTAs and "Learn More" links)
- `Bookmark` / article badge glyphs are plain text ("BB")

## Fonts
**None to download.** The site uses the system sans stack (Tailwind's default `font-sans`).
