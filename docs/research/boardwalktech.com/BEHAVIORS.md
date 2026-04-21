# boardwalktech.com — Behaviors

Findings from the mandatory interaction sweep (scroll, click, hover, responsive).

## Scroll-driven behaviors
- **Header does NOT change on scroll.** It remains `bg-white` with `border-b border-gray-100` at all scroll positions.
- **On-mount reveal animations:** Many elements start with `opacity: 0` + translated transforms and fade in via CSS transitions. This is a one-shot mount animation, not tied to scroll position. We can omit these animations entirely or replicate with a simple `animate-in` utility; they don't change the final layout so we'll build the final state directly.
- **No parallax, no scroll-snap, no sticky panels** outside the fixed header.
- **No smooth-scroll library** (Lenis/Locomotive absent).

## Click-driven / hover-driven behaviors
- **Nav dropdowns:** Desktop nav has 5 groups (Platform / Solutions / Industries / Resources / About). Each is an `<a>` pointing to a real route AND reveals a **hover-triggered** dropdown panel with title + optional description rows. Implemented in v2 via Tailwind `group`/`group-hover:` on `opacity`, `visibility`, `translate-y-1` with `transition-all duration-150`.
- **Search icon** in the desktop nav is visual-only on the live site (clicking triggers an empty sonner/radix toaster container). Rendered as a plain `<button>` with no action.
- **Mobile menu button (hamburger):** Toggles an inline drawer below the header containing all 5 nav groups as a stacked accordion (always-expanded). Icon flips between `lucide-menu` and `lucide-x`. Implemented in v2 via React `useState` in a `"use client"` component; tapping a link closes the drawer.
- **Primary "Contact us" buttons** link to `/contact-us` (we'll set `href="#contact"` in the clone for the body sections only — header/footer/drawer use real URLs).
- **"Learn More" links** go to `/UnityCentral`, `/Velocity`, `/Solutions` etc. Stub as `href="#"` in the clone's body sections.
- **"Read Article on Bloomberg"** links to an external Bloomberg URL — keep the real link.

## Hover states (explicit — matters for polish)

| Element | Before | After | Transition |
|---------|--------|-------|------------|
| Hero primary button | `bg-blue-600 shadow-lg shadow-blue-600/20` | `bg-blue-700 shadow-xl shadow-blue-600/30` | `transition-all` (default ~150ms) |
| Trust logo | `opacity-70` | `opacity-100` | `transition-all duration-300` |
| Product card wrapper | `shadow-none` | `shadow-xl` | `transition-all duration-500` |
| Product card image | `scale-100` | `scale-105` | `transition-transform duration-700` |
| Solution card image | `scale-100` | `scale-110` | `transition-transform duration-700` |
| Solution card title | `text-gray-900` | `text-blue-600` | `transition-colors` |
| Solution card arrow (gap) | `gap-1` | `gap-2` | `transition-all` |
| Product card CTA (gap) | `gap-2` | `gap-3` | `transition-all` |
| Header nav button icon | `text-gray-500` | `text-blue-600` | `transition-colors` |
| Bloomberg button | default border | `border-blue-600 text-blue-600` | `transition-all` |
| Privacy Policy footer link | `text-gray-500` | `text-blue-600` | `transition-colors` |

## Responsive sweep findings

### Desktop (≥1024px, `lg:`)
- Full navigation visible in header
- Hero: 2-column grid
- Products: 2 cards side-by-side
- Info-mgmt: 2 columns (alternating)
- Solutions: 4 cards in one row
- Footer: 5 columns

### Tablet (768–1023px, `md:`)
- Hamburger menu shown (nav hidden until `lg:`)
- Hero stacks (1 column)
- Products stack (1 column)
- Info-mgmt stacks
- Solutions: 2×2 grid
- Footer: 5 columns (still `md:grid-cols-5`)

### Mobile (<768px)
- Hamburger menu
- Everything 1-col stacks except Trust logos (2×4) and Footer (2 cols)
- Hero h1 drops from 60px to 36px
- Info-mgmt H2 drops from 36px (`lg:text-4xl`) to 30px (`text-3xl`)

## Known simplifications in our clone
- **Header + footer are fully functional** as of v2: nav dropdowns hover-reveal, mobile drawer toggles, and every header/footer/drawer anchor points to its real boardwalktech.com route (Investors → `https://ir.boardwalktech.com/` in a new tab).
- Body-section "Learn More" / "Contact us" CTAs still route to `#` anchors rather than real routes (not re-extracted in v2).
- Bloomberg external link preserved.
- No analytics (GTM, gtag) loaded.
- Server-rendered via Next.js (the original is a client-only SPA).
