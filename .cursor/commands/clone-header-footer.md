# Clone Header + Footer

You are about to extract the **header** and **footer** from the URL the user provides and package them as self-contained drop-in JS bundles that can be shipped into any host site via a single `<script>` tag.

Scope is only two components per site. No page body, no section loop, no full-page clone. If the user asks you to clone anything else, stop and redirect them to that narrower scope first.

## Scope defaults

- **Fidelity level:** Pixel-perfect visuals AND functional parity with the live site. Hover-reveal dropdowns, click-to-toggle, keyboard navigation, mobile drawer, body scroll lock, focus restore, ARIA — all must match. **Dropdown panel shape and nested interactions must match too** — see the anatomy rules below.
- **Links:** Every `href` points to the real live URL. External links (different hostname than the target) get `target="_blank" rel="noopener noreferrer"`.
- **Style isolation:** The bundle must not leak CSS onto the host site, and the host's CSS must not bleed into the bundle. The mount script uses **Shadow DOM** as the primary isolation mechanism (the bundled CSS is imported as a string via `?inline` and injected into the shadow root). Preflight is disabled, every selector is prefixed with `.bw-scope` by PostCSS, and everything is rendered inside `<div className="bw-scope">` as defense-in-depth.
- **Out of scope:** Page body, hero, sections, CMS content. Backend. Authentication.
- **Forms are visual stubs only.** Any form in the header or footer — newsletter signup, email subscribe, search bar, contact form, "find a dealer by zip" input, quote request, etc. — is cloned for layout and styling only. The `<input>` and `<button>` render so the header/footer looks complete, but no submission handler is wired up. Mark the form as *stubbed* in the relevant spec file under "Known omissions". The same goes for search icons that open a search panel: render the icon hit-target, do not build the panel.
- **No invented UI.** Every visible element in the cloned output must exist in the extracted source. Do not add "View all X", "Featured", CTA blocks, promo banners, tag lines, or any other embellishment that isn't on the real site. If it isn't in `research/header.spec.md` or `research/footer.spec.md`, it does not ship.

## Known failure modes to avoid

These are real mistakes made on prior sites. Do not repeat them:

1. **Mega-menu hallucination.** Seeing a nav item has a dropdown and assuming it's a wide multi-column mega-menu grid. Many sites use a narrow single-column panel with inline accordion subgroups. Always measure the panel width and enumerate row types before writing JSX.
2. **Skipping second-level probes.** Capturing top-level hover/click but never hovering or clicking *inside* an open dropdown. That's where accordion chevrons, side-flyouts, and tooltip descriptions live.
3. **Hover omission / click-only omission.** Building click-only dropdowns on a site where the real behavior is hover-reveal, or building hover-reveal on a click-only site. Always test BOTH `mouseenter` AND `click` on the first trigger and record which mechanism(s) actually open the dropdown. Do not assume any mechanism without testing.
4. **Placeholder hrefs.** Shipping `href="#"` because you didn't extract the real link. The spec file must list a real URL for every clickable item.
5. **Invented headers / links.** Adding "View all X →" sections, promo banners, or CTAs that are not in the live site. If you can't screenshot it on the real site, it doesn't exist.
6. **Wrong font-weight on links.** Applying the header's font-weight to footer links or vice versa. Header and footer link weights are independent — measure each with `getComputedStyle` separately.
7. **Wrong text-decoration on links.** Each link type may have different text-decoration behavior. Extract `text-decoration-line` for every distinct link type (utility, dropdown, footer column, legal bar) and match it exactly. Do not assume any default.
8. **Footer column merging missed.** Two footer sections that share the same x-coordinate are stacked in one grid column, not separate columns. Always measure heading x-positions before deciding the grid template. Splitting stacked sections into separate columns pushes the layout wider and mispositions icons.
9. **Icon color/size assumed.** Icon colors and sizes vary across sites. Measure `color`, `border-color`, and rendered `width`/`height` on the actual icon link elements — do not copy colors from adjacent text or headings.
10. **Dropdown interior styles not measured.** Section headers, subgroup headings, item links, descriptions, and callout buttons inside dropdown panels each have their own font-size, font-weight, and color. Measure each distinct element type inside an open dropdown before writing JSX.
11. **Dropdown positioning not measured.** The dropdown panel's `position`, its positioned ancestor, and its scroll behavior must be measured on the live site and replicated exactly. If the live site's dropdown scrolls with the header, the clone must too. If it stays pinned, the clone must too.
12. **Dropdown background color measured only on the outermost element.** The outermost panel element's background may be overridden by an inner container with a different color. Walk inward from the panel root checking `backgroundColor` on every container. Record every non-transparent layer. The callout/bottom row may also have its own distinct background.
13. **Dropdown column layout not measured.** The column container's layout mode, column count, gap, and child widths must be measured. Without this, columns end up bunched on one side instead of distributed to match the live site. Measure and replicate the exact layout.
14. **Button border-width assumed.** CTA buttons may use different border widths. Always measure `border-width` explicitly for every styled button.

## Pre-flight

1. Browser MCP is required (Playwright MCP, Chrome MCP, etc.). If none is available, ask the user which they have.
1a. **Images directory.** Ensure the `images/` folder exists at the repo root (`mkdir -p images`). All screenshots and images taken during extraction and comparison go here. This folder is gitignored.
2. Parse the user's message as a single URL. Validate it resolves via the browser MCP.
3. Derive the site slug from the hostname: drop `www.`, replace `.` with `-`, lowercase. E.g. `https://boardwalktech.com/` → `boardwalktech-com` (or just `boardwalktech` if the user prefers a shorter name — confirm if ambiguous).
4. **Mode detection.** Check whether `bundles/sites/<slug>/` already exists.
   - If it does NOT exist → **cold-start mode**. Proceed through Steps 1–8 in order.
   - If it DOES exist → **diff mode**. Skip Step 1 (scaffolding) and follow the "Diff mode procedure" section below instead of Steps 3–4. Step 2 (extraction) still runs fresh.
5. Verify the bundles package installs and the Vite pipeline works: `cd bundles && npm install && npm run build:all` (or build any existing site, e.g. `npm run build:boardwalktech`). This is a pipeline sanity check only; do NOT treat any existing site as a template for a new one.

## Execution modes

### Cold-start mode
The slug folder does not exist. Every file is created from scratch for this specific site. **Do not copy `SiteHeader.tsx` or `SiteFooter.tsx` from any existing site** — those components carry that site's dropdown shape, row-type assumptions, icon choices, and state machine tuning, and copying them is what caused prior clones to inherit the wrong mega-menu pattern. The only site-agnostic plumbing that gets reused is listed in Step 1 (styles skeleton, type definitions, mount script, demo HTML) and it is inlined in that step so nothing has to be sourced from another site's folder.

### Diff mode
The slug folder already exists. Assume the component files and manual tuning there are correct. Re-extract the live site into a fresh spec, diff it against the existing spec, classify each diff, apply only safe data-level changes, and report the rest to the user for review. See "Diff mode procedure" below.

## Functional parity contract (done-criteria)

Do NOT consider the site done until every item below is verified on the built bundle served from `bundles/sites/<slug>/demo/`:

### Header — desktop (viewport >= 1024px)
- [ ] Dropdown trigger behavior matches the live site (hover+click, click-only, or hover-only — as recorded in Step 2b). If hover+click: hovering opens, clicking also toggles. If click-only: only click toggles, no hover handlers.
- [ ] Dropdown panel positioning matches the live site (measured `position`, positioned ancestor, and scroll behavior).
- [ ] Dropdown column layout matches the live site (measured column count, gap, and child widths).
- [ ] Only one dropdown is open at a time; opening one closes the previous.
- [ ] Tab reaches each nav item; Enter/Space toggles its dropdown.
- [ ] Escape closes the open dropdown.
- [ ] Clicking outside the nav closes any open dropdown.
- [ ] Every link in every dropdown has a non-empty, non-`#` `href` that matches the value in the spec file.
- [ ] External links have `target="_blank" rel="noopener noreferrer"`.
- [ ] `aria-haspopup="menu"`, `aria-expanded`, `role="menu"`, `role="menuitem"` are set.

### Dropdown panel anatomy (for every dropdown)
Must be recorded in `header.spec.md` AND visually confirmed against the real site:

- [ ] **Panel width** measured (px) and within ±20px of the real site.
- [ ] **Layout type** classified: single-column list | multi-column grid | grid with subgroup columns | flyout (side-opening) | accordion (expands inline).
- [ ] **Row-type inventory**: every kind of row in the panel is enumerated (link, heading, subgroup-toggle with chevron, divider, CTA button, image card, description row). If a row type exists in the real site, it must exist in the clone. If a row type exists in the clone but not the real site, delete it.
- [ ] **Nested interactions probed**: if any row has a chevron, arrow, or "+" icon, trigger hover AND click on that row and record the resulting behavior (inline accordion, side flyout, no-op link). Build a matching interaction.
- [ ] **Subgroup heading dual-behavior**: on many sites the subgroup heading is itself a link to a collection page AND has a separate chevron toggle. Verify which clicks navigate vs. which clicks expand, and mirror that exactly.
- [ ] **Background color layered check**: the panel's visible background is measured by walking inward from the root, not just reading the root element's `background-color`. Inner containers may override the root's color.
- [ ] **Column layout measured**: column container's display mode, column count, gap, and child widths are extracted and matched with `grid grid-cols-N`, not flex with min-width.
- [ ] **Side-by-side screenshot**: a screenshot of the real site's dropdown in its closed AND most-expanded state placed next to a screenshot of the built bundle's dropdown. Structural match, not just "both have links".

### Header — mobile (viewport ~390px)
- [ ] Hamburger toggles the drawer open/closed.
- [ ] While drawer is open: `document.body.style.overflow === "hidden"` (no background scroll).
- [ ] Tapping a link inside the drawer closes the drawer.
- [ ] Escape closes the drawer.
- [ ] When drawer closes, focus returns to the hamburger button.
- [ ] Drawer scrolls internally when taller than the viewport.

### Footer
- [ ] Every link `href` matches the spec file.
- [ ] External links flagged and opened in a new tab.
- [ ] Any widget (newsletter, social icons, language switcher) is either implemented or explicitly listed under "Known omissions" in `footer.spec.md`.
- [ ] Grid column count matches the live site. Sections that share a column on the live site share a column in the bundle.
- [ ] Column heading `font-size` and `font-weight` match the spec's measured values.
- [ ] Column link `font-weight` matches the measured spec.
- [ ] Column link `text-decoration` matches the spec (underlined by default? on hover only? never?).
- [ ] Social icon `color` and `border-color` match the spec (green? white? branded?).
- [ ] Social icon rendered size (width × height) matches the spec (±2px).

### Style isolation
- [ ] Bundle uses Shadow DOM mount: `mount.tsx` calls `target.attachShadow({ mode: "open" })`, injects bundled CSS via `<style>` inside the shadow root, and renders React into a container inside the shadow.
- [ ] `mount.tsx` imports CSS as a string via `import styles from "../styles.css?inline"` (NOT `import "../styles.css"`).
- [ ] `styles.css` imports `tailwindcss/theme.css` and `tailwindcss/utilities.css` only — NOT `tailwindcss/preflight.css` and NOT the umbrella `@import "tailwindcss";`.
- [ ] Top-level render is still wrapped in `<div className="bw-scope">…</div>` (defense-in-depth scope class).
- [ ] Click-outside detection in `SiteHeader.tsx` uses `event.composedPath()` to detect clicks inside the shadow DOM; falls back to `nav.contains(target)` only if `composedPath` is missing.
- [ ] Host-page smoke test: drop the bundle into the actual host page (or a blank HTML page with pre-existing `<h1>`, `<ul>`, `<p>` styles AND aggressive resets like `* { margin: 0 } a { color: red }`) and confirm the bundle renders correctly AND the host's content renders unchanged.

## Step 1 — Scaffold the per-site folder (cold-start only)

Create the directory tree under `bundles/sites/<slug>/`:

```
bundles/sites/<slug>/
  src/
    styles.css
    types.ts
    header/
      SiteHeader.tsx    (empty for now — written in Step 4)
      mount.tsx
    footer/
      SiteFooter.tsx    (empty for now — written in Step 4)
      mount.tsx
  demo/
    header.html
    footer.html
  research/
    header.spec.md      (empty — filled in Step 2)
    footer.spec.md      (empty — filled in Step 3)
```

**Do NOT copy component files from any other site.** The only files this step creates are the site-agnostic skeleton below. Write them with the exact content shown, substituting `<slug>` and `<PascalSlug>` (e.g. `byrna` / `Byrna`).

### `src/styles.css`
Tailwind v4 without preflight, with a scope class. Use `bw-scope` — it's the project-wide scope convention that every existing site uses. Only use a site-specific class (e.g. `<slug>-scope`) if the client plans to load multiple different bundles on the same host page.

```css
@layer theme, base, components, utilities;

@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/utilities.css" layer(utilities);

@source "./**/*.{ts,tsx}";

@layer base {
  .bw-scope,
  .bw-scope *,
  .bw-scope *::before,
  .bw-scope *::after {
    box-sizing: border-box;
    border: 0 solid;
  }

  .bw-scope {
    /* font-family and color are filled in Step 2 from the site's computed styles */
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
  }

  .bw-scope a {
    color: inherit;
    text-decoration: inherit;
  }

  .bw-scope button {
    font: inherit;
    color: inherit;
    background-color: transparent;
    border-radius: 0;
    cursor: pointer;
    appearance: button;
  }

  .bw-scope img,
  .bw-scope svg {
    display: block;
    vertical-align: middle;
    max-width: 100%;
    height: auto;
  }

  .bw-scope ul,
  .bw-scope ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .bw-scope h1,
  .bw-scope h2,
  .bw-scope h3,
  .bw-scope h4,
  .bw-scope h5,
  .bw-scope h6,
  .bw-scope p {
    margin: 0;
    font-size: inherit;
    font-weight: inherit;
  }
}
```

### `src/types.ts`
Pure structural definitions. The shape of nav groups and footer columns is universal across sites, so these types are the one thing safe to reuse verbatim. Copy them as-is:

```ts
export type NavDropdownItem = {
  label: string;
  href: string;
  external?: boolean;
  description?: string;
};

export type NavSubgroup = {
  heading: string;
  href?: string;
  items: NavDropdownItem[];
};

export type NavGroup = {
  label: string;
  href: string;
  external?: boolean;
  items?: NavDropdownItem[];
  subgroups?: NavSubgroup[];
};

export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type FooterColumn = {
  heading: string;
  links: FooterLink[];
};
```

If the site's extracted spec reveals row types this schema cannot express (image cards, description rows, CTA rows), extend the types — don't force the data into the wrong shape.

### `src/header/mount.tsx`

The mount uses **Shadow DOM** for full style isolation. The bundled CSS is imported as a string via `?inline` and injected inside the shadow root. Host CSS cannot reach inside; bundle CSS cannot leak out.

```tsx
import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { SiteHeader } from "./SiteHeader";
import styles from "../styles.css?inline";

const DEFAULT_MOUNT_ID = "<slug>-header-root";
const STYLE_MARKER = "data-bw-styles";
const CONTAINER_MARKER = "data-bw-container";

type MountTarget = Element | string;

let activeRoot: Root | null = null;

function resolveTarget(target?: MountTarget): Element | null {
  if (target instanceof Element) return target;
  if (typeof target === "string") {
    const el = document.querySelector(target);
    if (el) return el;
  }
  return document.getElementById(DEFAULT_MOUNT_ID);
}

function getOrCreateShadowContainer(target: Element): Element {
  if (!("attachShadow" in target)) return target;

  let shadow: ShadowRoot | null =
    (target as HTMLElement).shadowRoot ?? null;
  if (!shadow) {
    try {
      shadow = (target as HTMLElement).attachShadow({ mode: "open" });
    } catch {
      return target;
    }
  }

  if (!shadow.querySelector(`style[${STYLE_MARKER}]`)) {
    const styleEl = document.createElement("style");
    styleEl.setAttribute(STYLE_MARKER, "");
    styleEl.textContent = styles;
    shadow.appendChild(styleEl);
  }

  let container = shadow.querySelector(
    `[${CONTAINER_MARKER}]`,
  ) as HTMLElement | null;
  if (!container) {
    container = document.createElement("div");
    container.setAttribute(CONTAINER_MARKER, "");
    shadow.appendChild(container);
  }
  return container;
}

function mount(target?: MountTarget): void {
  const el = resolveTarget(target);
  if (!el) {
    console.warn(
      `[<PascalSlug>Header] mount target not found. Pass a selector or Element, or add <div id="${DEFAULT_MOUNT_ID}">.`,
    );
    return;
  }
  if (activeRoot) {
    activeRoot.unmount();
    activeRoot = null;
  }
  activeRoot = createRoot(getOrCreateShadowContainer(el));
  activeRoot.render(
    <StrictMode>
      <SiteHeader />
    </StrictMode>,
  );
}

function unmount(): void {
  activeRoot?.unmount();
  activeRoot = null;
}

const api = { mount, unmount, DEFAULT_MOUNT_ID };

if (typeof window !== "undefined") {
  (window as unknown as { <PascalSlug>Header: typeof api }).<PascalSlug>Header = api;
  const autoTarget = document.getElementById(DEFAULT_MOUNT_ID);
  if (autoTarget) mount(autoTarget);
}

export default api;
export { mount, unmount };
```

### `src/footer/mount.tsx`
Same shape as the header mount, swap `Header` for `Footer` and use mount id `<slug>-footer-root` and global `window.<PascalSlug>Footer`.

### Click-outside detection inside shadow DOM
`SiteHeader.tsx` must use `event.composedPath()` (not `e.target` + `nav.contains(...)`) for outside-click detection. When the shadow root re-targets the event for `document`-level listeners, `e.target` becomes the shadow host element, which makes every click look "outside" the nav. `composedPath()` returns the actual click path including elements inside the shadow.

```tsx
const onDown = (e: MouseEvent) => {
  const nav = navRef.current;
  if (!nav) return;
  const path =
    typeof e.composedPath === "function" ? e.composedPath() : [];
  const insideNav = path.length
    ? path.includes(nav)
    : nav.contains(e.target as Node);
  if (!insideNav) closeAll();
};
```

### `demo/header.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title><Slug> header demo</title>
  </head>
  <body>
    <div id="<slug>-header-root"></div>
    <main style="padding: 2rem; font-family: system-ui">
      <h1>Host page heading</h1>
      <p>This text should render with the host's default styles (no leak from the bundle).</p>
      <ul>
        <li>Host list item 1</li>
        <li>Host list item 2</li>
      </ul>
    </main>
    <script src="../../../dist/<slug>/header.bundle.js"></script>
  </body>
</html>
```

### `demo/footer.html`
Same, with `<slug>-footer-root` and `footer.bundle.js`.

### Wire up build scripts
Add to `bundles/package.json`:

```json
"build:<slug>": "SITE=<slug> npm run build:site",
"dev:<slug>": "SITE=<slug> BUNDLE=header vite"
```

Add a matching `src/app/<slug>/page.tsx` in the Next.js preview harness (copy the structure from `src/app/byrna/page.tsx`, swap slug).

**At this point Step 1 is done.** You have an empty but valid skeleton. `SiteHeader.tsx` and `SiteFooter.tsx` do not yet exist; they get written in Step 4 after extraction.

## Step 2 — Extract the header from the live site

Using the browser MCP at a 1440px viewport. Treat this as three distinct passes: structure, interactions, and measurements. Do NOT skip ahead to writing code before all three are in the spec file.

### 2a. Structure pass
1. Identify the `<header>` / `<nav>` root element. Capture its DOM structure and `getComputedStyle()` values (height, background, border-bottom, position, z-index, inner max-width, horizontal padding).
2. Extract the logo: absolute URL of the `<img src>`, width, height, alt text, and the URL it links to.
3. Enumerate top-level nav items in order. For each, record: label, `href`, whether it has a dropdown.
4. Capture trailing icons (search, account, cart, language switcher, CTA button). Only implement hit-targets; full search/cart UI is out of scope.
5. Note any forms in the header (search input, email signup, etc.). Record the visible markup — placeholder text, button label, layout — but mark the form as *stubbed* in the spec under "Known omissions". The clone renders the input and button for layout fidelity but does not wire up submission.

### 2b. Dropdown trigger behavior (test before building)
Before extracting dropdown contents, determine how they open. Test the FIRST dropdown trigger:
1. Hover the trigger — does the dropdown appear?
2. Click the trigger — does the dropdown toggle open/close?
3. Record the result in the spec as one of:
   - **hover + click** (hover opens, click also toggles)
   - **click-only** (hover does nothing; only click toggles)
   - **hover-only** (click navigates the href)
The component state machine differs for each. This determines whether `openMode`, `hoverTimeout`, and `onMouseEnter`/`onMouseLeave` are needed.

### 2c. Dropdown anatomy pass (the one you keep skipping)
For **every** top-level item that has a dropdown, do all of the following before moving on:

1. Open the dropdown (using the trigger mechanism identified in 2b). Take a screenshot of the open panel in its default state and save it to `images/` (create the directory if it doesn't exist).
2. `getBoundingClientRect()` on the panel root — record its width in px and whether it renders as single column, multi-column grid, or side flyout.
3. Enumerate every direct child row of the panel. For each, classify as one of:
   - **link** — a simple anchor that navigates
   - **subgroup-toggle** — a row with a chevron/arrow that expands more items (accordion or side flyout)
   - **heading** — a non-interactive label above a group of links
   - **divider** — visual separator only
   - **CTA** — styled button (position varies by site)
   - **image-card** — image + label tile
   - **description-row** — label + secondary descriptive text line
4. For any `subgroup-toggle` row, hover AND click it. Record:
   - Does it expand inline (pushing siblings down) or open a side flyout?
   - Does the heading text itself navigate when clicked, with the chevron as a separate expand target? If so, build it the same way.
   - What appears when expanded? Enumerate those items too.
5. For any row whose href differs from its visible text target (e.g. a heading that links to a collection while a chevron toggles the accordion), mirror that dual-behavior exactly.
6. After probing, close the dropdown and repeat for the next top-level item. Do not assume siblings share the same anatomy — they may differ.

Useful probes (run via the browser MCP's evaluate):

```javascript
// Measure an open dropdown panel
const panel = document.querySelector("SELECTOR_FOR_OPEN_PANEL");
const r = panel.getBoundingClientRect();
({ width: Math.round(r.width), height: Math.round(r.height), columns: getComputedStyle(panel).gridTemplateColumns });
```

```javascript
// Enumerate row types inside an open panel
[...panel.children].map(el => ({
  tag: el.tagName,
  classes: el.className,
  hasChevron: !!el.querySelector('svg, .chevron, [class*="arrow"], [class*="caret"]'),
  linkHref: el.querySelector('a')?.href ?? null,
  textStart: (el.textContent || '').trim().slice(0, 60),
}));
```

### 2d. Link audit pass
- Resolve every relative `href` against the site origin.
- Mark `external: true` when the resolved hostname differs from the site's hostname.
- If a link you need is behind a hover-delay or modal, trigger the interaction before extracting. No `#` placeholders in the spec.

### 2e. Computed style measurement pass (mandatory before writing JSX)
Open a dropdown and extract `getComputedStyle` for EVERY distinct element type. Record all values in a "Measured computed styles" table in the spec. Do not skip any row:

| Element | Properties to extract |
|---|---|
| Header element | `position` (sticky/fixed/relative — determines dropdown positioning strategy) |
| Nav bar separator | `border-top` or `border-bottom` color between utility bar and nav bar |
| Nav trigger buttons | `color`, `font-weight`, `font-size` |
| Nav trigger active state | `color`, `border-bottom` (width, style, color) |
| Utility links (top bar) | `color`, `font-weight`, `font-size`, `text-decoration-line` |
| Contact/CTA button | `color`, `font-weight`, `font-size`, `border` (including **width**), `border-radius`, `padding` |
| Dropdown panel bg | `background-color` — check **inner containers** too, not just the root (see failure mode #12) |
| Dropdown callout row bg | `background-color` (measure separately from the main panel) |
| Dropdown column layout | `display`, `column-gap`, child count, each child `width` (see failure mode #13) |
| Dropdown section header | `color`, `font-weight`, `font-size` |
| Dropdown heading-static (non-link headings) | `color`, `font-weight`, `font-size` |
| Dropdown subgroup headings | `color`, `font-weight`, `font-size` |
| Dropdown item links | `color`, `font-weight`, `font-size`, `text-decoration-line` |
| Dropdown description text | `color`, `font-weight`, `font-size` |
| Dropdown callout buttons | `color`, `font-weight`, `font-size` |
| Callout/bottom-bar icons | `color` (may differ from text) |

Use this snippet to batch-extract everything from an open dropdown in one call:

```javascript
const pick = (el, ...props) => Object.fromEntries(props.map(p => [p, getComputedStyle(el).getPropertyValue(p)]));
// Run after opening the first dropdown
```

If any value in the table is missing, the spec is incomplete. Do not write JSX until this table is filled in.

### 2f. Mobile pass (resize to 390px)
1. Locate the hamburger button and its icon. Record the breakpoint where the desktop nav disappears.
2. Open the drawer. Is the data identical to the desktop nav, or flattened / different ordering?
3. For any row in the drawer that has a chevron, tap it and record whether it expands inline. The mobile interaction model may differ from the desktop one — measure both independently.
4. Close behaviors: tap hamburger again, tap X, tap outside, Escape. Record which are supported; the clone must implement tap-hamburger-again + Escape + link-tap-closes at minimum.

Write all of this into `bundles/sites/<slug>/research/header.spec.md` using the template at the bottom of this file.

## Step 3 — Extract the footer

### 3a. Grid layout pass
Before listing columns, measure the footer's actual layout structure:
1. Find all column headings inside the footer.
2. Extract each heading's `getBoundingClientRect()` x-coordinate.
3. Headings with the **same x-coordinate** are stacked in one grid column — do not split them into separate columns. Record how many true columns the grid has and which sections share a column.

```javascript
const footer = document.querySelector('footer');
const headings = [...footer.querySelectorAll('h3, h4, h5, [class*="heading"], [class*="title"]')];
headings.map(h => {
  const r = h.getBoundingClientRect();
  return { text: h.textContent.trim().slice(0, 30), x: Math.round(r.x), y: Math.round(r.y) };
});
```

### 3b. Content pass
1. Identify the `<footer>` root.
2. Enumerate column headings and links. Record label + `href` for each.
3. Bottom bar: logo, copyright line, privacy / terms links, any social icons.
4. For any forms (newsletter signup, email subscribe, contact form, zip-code lookup, etc.) record the visible markup — heading/label, input placeholder, button text, layout — and mark it as *stubbed* under "Known omissions". The clone renders the form for layout fidelity only; no submission handler.
5. Flag any other widgets that are out of scope (language switcher, live chat launcher, cookie banner) under "Known omissions" too.

### 3c. Computed style measurement pass (mandatory)
Extract `getComputedStyle` for EVERY distinct footer element type. Record in a "Measured computed styles" table in the spec:

| Element | Properties to extract |
|---|---|
| Column headings | `color`, `font-weight`, `font-size`, `text-transform` |
| Column links | `color`, `font-weight`, `font-size`, `text-decoration-line` |
| Social icon links | `color`, `border`, `border-color`, `width`, `height`, `padding`, `border-radius` |
| Legal / bottom-bar links | `color`, `font-weight`, `font-size`, `text-decoration-line` |
| Mission/tagline text | `color`, `font-weight`, `font-size` |
| CTA buttons | `color`, `border-color`, `background-color`, `font-size` |

**Critical:** Footer link `font-weight` and `text-decoration` are independent of header values. Many sites have bold header triggers with normal-weight footer links, or underlined footer links with non-underlined header links. Measure them separately — do not copy values from the header.

Write `bundles/sites/<slug>/research/footer.spec.md`.

## Step 4 — Write the components from scratch

Write `SiteHeader.tsx` and `SiteFooter.tsx` **from scratch**, shaped entirely by the spec files you produced in Steps 2 and 3. Do not copy these files from any other site. The spec is the authority on the JSX shape; the patterns below are the authority on the behavior.

### Required behaviors (implement these regardless of the site)

A correct `SiteHeader.tsx` exposes this state machine (adapted based on the trigger behavior recorded in Step 2b):

| State | Purpose |
|-------|---------|
| `openGroup: string \| null` | which top-level nav item's dropdown is currently open |
| `openMode: "hover" \| "click" \| null` | **(hover+click sites only)** why it's open, so a click doesn't immediately close a hover-opened menu |
| `expandedSubgroups: Set<string>` | which nested accordion subgroups are currently expanded within the open dropdown |
| `mobileOpen: boolean` | hamburger drawer open state |
| `mobileExpanded: Set<string>` | which top-level groups are expanded within the mobile drawer |

Effects depend on the trigger behavior recorded in Step 2b:

**If hover+click:**
- Mouseenter on a top-level trigger → `openMode: "hover"`. Mouseleave → close, unless `openMode === "click"`.
- Click on a top-level trigger → toggle with `openMode: "click"`.

**If click-only:**
- No `openMode` state, no `hoverTimeout` ref, no `onMouseEnter`/`onMouseLeave` handlers.
- Click on a top-level trigger → toggle `openGroup`.

**All sites, regardless of trigger behavior:**
- Outside click (`mousedown` outside `navRef`) → close.
- Escape key → close both dropdown and mobile drawer.
- Mobile drawer open → set `document.body.style.overflow = "hidden"`, focus first focusable element in drawer, and on close restore body overflow and focus the hamburger button.
- ARIA: `aria-haspopup="menu"`, `aria-expanded`, `aria-controls`, `role="menu"`, `role="menuitem"` on the right nodes.

### Shape from the spec, not from a template

For each top-level nav item, read its **Panel anatomy** block in `header.spec.md` and render only what that block describes:

- `Layout: single-column list` → narrow panel, no grid, no column headings inside.
- `Layout: multi-column grid (N cols)` → `grid-cols-N` panel, each column starts with its subgroup heading.
- `Layout: side flyout` → hovering a subgroup-toggle row opens a second panel absolutely positioned to the right.
- `Subgroup expansion: inline accordion` → chevron toggle expands items below the heading, pushing later rows down.
- `Heading-vs-chevron split: heading navigates, chevron toggles` → render the heading text as an `<a>` and the chevron as a sibling `<button>` with `onClick={(e) => { e.stopPropagation(); toggleSubgroup(key); }}`.

Render rows in the order they appear in the spec. A row type not in the spec is not rendered. A row type in the spec without an implementation stops the build — add the implementation, don't skip the row.

### Footer

Read `footer.spec.md`. Render the columns, bottom bar, social icons, and form stubs per the spec. Forms render markup (input + button with the recorded placeholder/label text) but do not wire up submission (see the "Forms are visual stubs only" rule).

### Logo, colors, and fonts

- `SITE_BASE` constant = the live site's origin (from the spec "Overview" line).
- `LOGO_SRC` constant = the absolute URL from the spec "Logo" block.
- Site-specific colors and fonts come from the spec's "Computed styles — container" block. Put the base font-family and text color into `styles.css` under the `.bw-scope { … }` rule you left blank in Step 1. Do NOT copy colors from another site's `styles.css`.
- Tailwind classes on the components use arbitrary-value utilities for brand colors (e.g. `text-[#020122]`, `bg-[#ff671d]`) extracted from the spec.

### Icons

Use `lucide-react` for generic icons (menu, x, chevron-down, chevron-right, search, user, shopping-cart). If the site uses brand icons (Facebook, Twitter/X, Instagram, YouTube, TikTok) that `lucide-react` no longer exports, inline the SVG paths directly in the component — don't add a new dependency.

### Scope wrapper

The top-level `<div>` returned by both `SiteHeader` and `SiteFooter` uses `className="bw-scope"` matching the class defined in `styles.css` (or the site-specific class if you opted into one).

### After writing the components

Run the typecheck:

```bash
cd bundles && npm run typecheck
```

Fix any errors before moving to Step 5. `NavGroup` / `FooterColumn` types may need extension if the site has row types the default schema can't express — update `types.ts` rather than forcing the data into the wrong shape.

## Diff mode procedure

Use this instead of Steps 1, 3, and 4 when `bundles/sites/<slug>/` already exists.

### D1. Re-extract the spec into a temp location

Run Step 2 in full (all four passes: structure, dropdown anatomy, link audit, mobile). Write the new spec to a temp path, not over the existing one:

```
bundles/sites/<slug>/research/header.spec.new.md
bundles/sites/<slug>/research/footer.spec.new.md
```

Do the same for the footer.

### D2. Diff against the existing spec

Compare `header.spec.new.md` vs `header.spec.md` and `footer.spec.new.md` vs `footer.spec.md`. Classify every difference as one of:

**Data-only (safe to auto-apply):**
- Logo URL, alt text, dimensions changed.
- A nav item's label or href changed.
- A nav item was added to an existing dropdown.
- A nav item was removed from an existing dropdown.
- A footer column gained or lost a link.
- Copyright text changed (e.g. year rolled over).
- `external` flag changed for an existing link.
- A social link URL changed.

**Structural (stop and report — do not auto-apply):**
- A top-level nav item gained a dropdown it didn't have before (or vice versa).
- A dropdown's panel layout changed (single-column ↔ grid ↔ flyout).
- A subgroup appeared or disappeared inside a dropdown.
- The heading-vs-chevron split changed.
- Panel width changed by more than 40 px.
- Mobile breakpoint moved.
- A new form / icon / widget appeared, or an existing one was removed.
- A new row type appeared that the component doesn't currently render.
- The scope class, base font, or base text color changed.

### D3. Apply data-only changes

For each data-only diff:

1. Overwrite the relevant entry in the component's `NAV_GROUPS` / `COLUMNS` / `SOCIALS` / `SITE_BASE` / `LOGO_SRC` constant.
2. Do NOT rewrite surrounding JSX, state machine, styles, or icon imports.
3. If the entry is gone on the live site, delete it from the data array.
4. If a new entry appears, insert it at the same position as in the new spec.

### D4. Report structural diffs to the user

Print a clear summary of every structural diff in chat, grouped by top-level nav item and by footer region. For each, include: the old shape, the new shape, and a one-sentence recommendation ("Products gained a fifth subgroup 'Training' — add a new subgroup entry to `NAV_GROUPS[0].subgroups` and confirm the chevron/accordion behavior on the live site"). Do NOT touch component logic for structural diffs; wait for the user to decide.

### D5. Replace the old spec

Once data-only diffs are applied and structural diffs are reported, replace the old spec with the new one:

```bash
mv bundles/sites/<slug>/research/header.spec.new.md bundles/sites/<slug>/research/header.spec.md
mv bundles/sites/<slug>/research/footer.spec.new.md bundles/sites/<slug>/research/footer.spec.md
```

The spec always reflects the live site's current state. Manual UI tuning stays in the component files.

### D6. Rebuild and smoke test

Run Step 5 (build) and Step 6 (functional parity) as normal. If no data-only changes were applied and no structural diffs were reported, the build output should be byte-identical to the previous build — confirmation that diff mode was truly a no-op for an unchanged site.

## Step 5 — Build

From the repo root:

```bash
cd bundles
npm run build:site -- --env SITE=<slug>     # or: SITE=<slug> npm run build:site
```

Verify `bundles/dist/<slug>/{header,footer}.bundle.js` exist. Each should be ~65 KB gzipped.

## Step 6 — Run the functional-parity smoke test

Serve the site's demo folder:

```bash
python3 -m http.server 8765 --directory bundles
```

Then via the browser MCP:

1. Navigate to `http://localhost:8765/sites/<slug>/demo/header.html`.
2. Walk the Header desktop checklist above. Test hover, click, Escape, outside-click, and Tab navigation.
3. Walk the **dropdown panel anatomy** checklist — for each dropdown in the built bundle, confirm width, layout type, row inventory, and nested behavior match what's in the spec.
4. Resize to 390px. Walk the Header mobile checklist.
5. Navigate to `http://localhost:8765/sites/<slug>/demo/footer.html`.
6. Walk the Footer checklist.
7. Navigate to a **blank** HTML page that only imports the header bundle — verify the host's default `<h1>` / `<ul>` / `<p>` styles are unchanged (style isolation smoke test).

If any checkbox fails, fix the component, rebuild, and re-run the test. Do not move on until every box is green.

### Step 6.5 — Side-by-side visual diff (mandatory)

Before calling the header done, open TWO browser tabs via the MCP:
- Tab A: the live site (e.g. `https://byrna.com/`).
- Tab B: the built demo (`http://localhost:8765/sites/<slug>/demo/header.html`).

For each top-level nav item:
1. Open the dropdown in both tabs.
2. Take a viewport screenshot of each and save to `images/` (create the directory if it doesn't exist). The `images/` folder is gitignored, so these won't be committed.
3. Compare structurally. Ask: "Is the panel the same width? Same number of columns? Same row types in the same order? Are there any rows in one that aren't in the other?"
4. If there are any invented rows in the clone (see "No invented UI" rule), delete them.
5. If the clone is missing a row type that exists in the real site (subgroup toggle, description line, CTA), add it.
6. Repeat for any nested/expanded state (e.g. expand an accordion subgroup and compare again).

Only when the structural match is tight do you move on. Not "close enough" — if the user can tell at a glance that the shapes are different, the clone is not done.

## Step 7 — Preview in Next.js (optional but recommended)

The Next.js preview harness auto-discovers every folder under `bundles/sites/` and lists them on the index page. Each site has its own route.

**Cold-start:** create `src/app/<slug>/page.tsx` that imports `SiteHeader` and `SiteFooter` from `../../../bundles/sites/<slug>/src/...`. Copy the structure from `src/app/byrna/page.tsx` and swap the slug. Run `npm run dev` and visit `http://localhost:3000/<slug>`.

**Diff mode:** the route already exists. Just refresh `http://localhost:3000/<slug>` after rebuilding to see the updated components.

This renders the same source as the bundle inside a full Next.js page — useful for catching layout issues the demo HTML page might miss.

## Step 8 — Commit

Single commit per site:

```
feat(<slug>): extract header + footer as drop-in bundle
```

Include: `bundles/sites/<slug>/**`, any `bundles/vite.config.ts` or `package.json` edits needed for the new slug. Do not commit `bundles/dist/` (gitignored).

## Spec file templates

### `header.spec.md`

```markdown
# <Slug> Header Specification

## Overview
- Site: <URL>
- Extracted: <date>
- Target files: bundles/sites/<slug>/src/header/{SiteHeader.tsx,mount.tsx}

## Logo
- src: <absolute URL>
- alt: <text>
- dimensions: <w>x<h>
- link: <where the logo links to>

## Nav groups
(one section per top-level nav item)

### <Label> — href: <URL>

**Panel anatomy** (fill this in BEFORE writing JSX):
- Width: <px>
- Layout: <single-column list | multi-column grid (N cols) | side flyout | accordion>
- Row types (in order, top to bottom):
  1. <row-type> — <label / heading / CTA text>
  2. …
- Subgroup expansion: <none | inline accordion | side flyout>
- Heading-vs-chevron split: <heading navigates, chevron toggles | whole row navigates | whole row toggles>

**Items** (flat list, including nested ones under subgroups):
| Label | href | external | parent subgroup | description |
|-------|------|----------|-----------------|-------------|
| …     | …    | …        | …               | …           |

## Desktop behaviors
- Dropdown trigger: hover + click
- Close triggers: outside click, Escape
- Search icon: <present / absent> — <implemented / stubbed>

## Mobile behaviors
- Hamburger breakpoint: <px>
- Drawer row types: <same as desktop | flattened | other>
- Drawer close triggers: link tap, Escape, hamburger toggle
- Any differences from desktop data: <describe>

## Computed styles — container
- height: …
- background: …
- border: …
- padding: …
- max-width (inner): …

## Known omissions
- <list anything not implemented>
- <list anything on the live site you deliberately did not clone and why>
```

### `footer.spec.md`

```markdown
# <Slug> Footer Specification

## Overview
- Site: <URL>
- Extracted: <date>
- Target files: bundles/sites/<slug>/src/footer/{SiteFooter.tsx,mount.tsx}

## Columns
### <Heading>
| Label | href | external |
|-------|------|----------|
| …     | …    | …        |

## Bottom bar
- Logo: <src>
- Copyright: <text>
- Legal links: [privacy, terms, …]
- Social icons: <list>

## Computed styles
- background: …
- padding: …

## Known omissions
- Newsletter signup, language switcher, etc.
```

## What NOT to do

- Do not implement CSS-only `group-hover` dropdowns. They break on touch and keyboard. Use JS state.
- Do not leave `href="#"` or placeholder links anywhere. If you don't know the real link, extract it from the live site.
- Do not `@import "tailwindcss"` in the bundle's `styles.css`. That pulls preflight and breaks the host page.
- Do not build the page body, any hero section, or any content between the header and footer. Scope is two components.
- Do not skip the functional parity checklist. A beautiful header that doesn't open its dropdowns on touch is a broken header.
- Do not default to a mega-menu. If you haven't measured the open panel's width and classified its row types (Step 2b), you don't know what shape it should be.
- Do not invent UI. No "View all X →" headers, no "Featured" banners, no promo cards, no helper sentences — unless they exist on the live site and are in the spec file.
- Do not probe only top-level interactions. If a dropdown row has a chevron, you must hover and click it before you can say the site is extracted.
- Do not call it done without the Step 6.5 side-by-side visual diff. "Links work and nothing's broken" is not the bar; the bar is "the shapes match".
- Do not copy `SiteHeader.tsx` or `SiteFooter.tsx` from another site as a starting template. Those files carry that site's dropdown shape and will bias the new clone toward the wrong structure. Write them from scratch, shaped by this site's spec.
- Do not overwrite existing component files on a re-clone. Diff mode only updates the data arrays for *data-only* diffs; *structural* diffs are reported to the user, never applied silently.
