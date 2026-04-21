# boardwalktech.com Section Specs (consolidated)

Reference: `docs/research/boardwalktech.com/section-details.json` (live DOM dump), `docs/design-references/boardwalktech.com/01-desktop-full-revealed.png`.

**Interaction model for every section:** static layout + hover micro-interactions only. No scroll-driven behavior, no click-state tabs, no time-driven animations. (One-shot mount reveals are omitted from the clone.)

**Shared tokens (verbatim from target):**
- Text defaults: `text-gray-900` (headings), `text-gray-600` (body), `text-gray-500` (muted/labels)
- Brand: `bg-blue-600`/`hover:bg-blue-700`, ring `blue-600/20`
- Hero gradient text: `bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent`
- Section container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

---

## 1. SiteHeader (`src/components/sections/SiteHeader.tsx`)
- Wrapper: `fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-100`
- Inner: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` + `flex items-center justify-between h-20`
- Logo: `<img src="/images/brand/boardwalk-tech-logo.png" className="h-12">` inside `<a href="/" className="flex items-center">`
- Desktop nav: `hidden lg:flex items-center gap-1` containing Platform / Solutions / Industries / Resources / About (each rendered as a button with `px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors`)
- Hamburger (mobile only): `lg:hidden p-2 text-gray-700` with `<MenuIcon className="w-6 h-6" />`
- No scroll-change behavior.

## 2. HeroSection (`src/components/sections/HeroSection.tsx`)
- Section: `relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden`
- Background overlay: `<div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-teal-50/30"/>`
- Container: `relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` → `grid lg:grid-cols-2 gap-12 lg:gap-16 items-center`
- H1: `text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight` with inner gradient span on "Decisions"
- Paragraph: `mt-6 text-lg text-gray-600 leading-relaxed max-w-xl`
- Primary button wrapper `mt-10` with link `/contact-us` → `<a>` button classes verbatim from target.
- Image side: `relative rounded-2xl overflow-hidden shadow-2xl` → `<img className="w-full h-auto object-cover" src="/images/hero/homepage-image-2.png">`

## 3. TrustSection (`src/components/sections/TrustSection.tsx`)
- Section: `py-16 bg-gray-50/50`
- Heading H3: `text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-10` → "Trusted by the world's top companies"
- Grid: `grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 items-center`
- Each cell: `flex items-center justify-center opacity-70 hover:opacity-100 transition-all duration-300` → `<img className="h-8 md:h-10 w-auto object-contain">`

## 4. ProductsSection (`src/components/sections/ProductsSection.tsx`)
- Section: `py-24 bg-white`
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- H2: `text-sm font-semibold text-gray-500 uppercase tracking-wider mb-12` → "Products"
- Grid: `grid lg:grid-cols-2 gap-8`
- Card: `group relative bg-gray-50 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500`
  - Image wrap: `aspect-[4/3] overflow-hidden` → `<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">`
  - Body: `p-8` containing H3 `text-2xl font-bold text-gray-900 mb-4`, P `text-gray-600 leading-relaxed mb-6`, Link with gradient clip-path text (Unity Central uses `from-blue-500 to-indigo-600`; Velocity uses `from-teal-500 to-green-600`) + `ArrowRightIcon className="w-4 h-4"`
- Data:
  - Unity Central: image `/images/products/unity-central.png`, copy verbatim: "Seamlessly connect all your messages, files, documents, workflows, and alerts into one intelligent platform, automating processes and reducing manual work to help you make faster, more informed decisions while keeping everything organized in a unified workspace."
  - Velocity: image `/images/products/velocity.png`, copy: "Transform your Excel-based process applications into secure, compliant, and AI-ready applications, eliminating manual processes and risks without disrupting your existing business processes or replacing Excel."

## 5. FeaturesSection (`src/components/sections/FeaturesSection.tsx`)
- Section: `py-24 bg-gradient-to-b from-gray-50 to-white`
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24`
- Row: `grid lg:grid-cols-2 gap-12 lg:gap-16 items-center` (2nd row adds `lg:flex-row-reverse` and child divs use `lg:order-1` / `lg:order-2`)
- Text col: H2 `text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6` + P `text-lg text-gray-600 leading-relaxed`
- Image col wrap: `relative`
  - Image card: `relative rounded-2xl overflow-hidden shadow-xl` → `<img className="w-full h-auto object-cover">` + overlay `absolute inset-0 bg-gradient-to-t from-black/10 to-transparent`
  - Bleed circle 1: `absolute -z-10 -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-60`
  - Bleed circle 2: `absolute -z-10 -bottom-4 -left-4 w-32 h-32 bg-teal-100 rounded-full blur-2xl opacity-60`
- 3 rows (image side alternates: right, left, right):
  1. "A brand-new class of information management" + homepage-image-1.png
  2. "Rapidly transform your data into information" + homepage-image-3.png (image LEFT)
  3. "Faster, more insightful decisions" + homepage-image-4.png

## 6. SolutionsSection (`src/components/sections/SolutionsSection.tsx`)
- Section: `py-24 bg-white`
- H2: same label style as Products — "Solutions"
- Grid: `grid md:grid-cols-2 lg:grid-cols-4 gap-6`
- Card: `<div className="group">` → `<a className="block" href="#">`
  - Image wrap: `relative aspect-[4/3] rounded-2xl overflow-hidden mb-4` with `<img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">` + overlay `absolute inset-0 bg-gradient-to-t from-black/40 to-transparent`
  - H3: `text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors`
  - P: `text-sm text-gray-600 leading-relaxed mb-3`
  - Span CTA: `inline-flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:gap-2 transition-all` + `ArrowRightIcon className="w-4 h-4"`
- 4 cards (titles + exact copy captured in section-details.json; images under `/images/solutions/`)

## 7. ArticleSection (`src/components/sections/ArticleSection.tsx`)
- Section: `py-24 bg-gradient-to-b from-gray-50 to-white`
- Layout: `grid lg:grid-cols-2 gap-12 items-center`
- Left column:
  - Label span: `text-sm font-semibold text-blue-600 uppercase tracking-wider` → "Article"
  - H2: `mt-4 text-3xl lg:text-4xl font-bold text-gray-900 leading-tight` → "How Boardwalktech's intelligent information platform revolutionizes enterprise data"
  - CTA wrap `mt-8` with link to Bloomberg article; `<button>` classes:
    `inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background shadow-sm hover:bg-accent h-9 border-gray-300 hover:border-blue-600 hover:text-blue-600 px-6 py-5 text-base rounded-xl transition-all`
- Right column `relative`:
  - Image card `rounded-2xl overflow-hidden shadow-xl` with avif hero
  - Badge `absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3` containing square `w-10 h-10 bg-black rounded-lg flex items-center justify-center` (text "BB" `text-white font-bold text-xs`) and labels `Bloomberg` (font-semibold text-gray-900 text-sm) + `Featured Article` (text-xs text-gray-500).

## 8. AboutSection (`src/components/sections/AboutSection.tsx`)
- Section: `py-24 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white`
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` + inner `max-w-4xl mx-auto text-center`
- H2: `text-4xl lg:text-5xl font-bold leading-tight mb-8`
- P1: `text-lg text-gray-300 leading-relaxed mb-6` (paragraph text verbatim from captured data)
- P2: `text-lg text-gray-300 leading-relaxed mb-10`
- Link to `#contact` → button with classes verbatim: `inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-base rounded-xl shadow-lg transition-all` + "Contact us" + ArrowRight.

## 9. SiteFooter (`src/components/sections/SiteFooter.tsx`)
- Outer: `bg-white border-t border-gray-100`
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16`
- Column grid: `grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12`
  - Columns: Platform / Solutions / Industries / Resources / About Us
  - Column H4: `text-sm font-semibold text-gray-900 mb-4`
  - UL: `space-y-3`, each link `text-sm text-gray-600 hover:text-blue-600 transition-colors`
- Bottom row: `mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4`
  - IMG `h-8`, logo
  - P: `text-sm text-gray-500` "Copyright 2006-2025 Boardwalktech, Inc"
  - A: `text-sm text-gray-500 hover:text-blue-600 transition-colors` "Privacy Policy"
