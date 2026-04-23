# Header + Footer Inspection Guide

Use this alongside the `/clone-header-footer` Cursor command. It covers *what* to extract from a live site so the resulting drop-in bundle is functionally equivalent, not just visually similar.

## Before you start

Open the target site in the browser MCP at 1440px viewport. You will toggle to 390px later for the mobile drawer.

## Header — desktop (1440px)

### Logo
- Absolute URL of the `<img src>`, alt text, rendered width/height.
- What URL does the logo link to? (Usually the site home.)

### Top-level nav items
For each top-level nav entry, record:
- Label
- Its own `href` (used as the "View all <Label>" link in the cloned dropdown)
- Whether it has a dropdown

### Dropdowns

Dropdowns are where most clones fail. A dropdown is more than "a list of links under a nav item" — it has a specific **width**, a specific **layout type**, and a specific **row vocabulary**. All three must be extracted before you write JSX.

For each dropdown, in order:

#### 1. Panel anatomy (measure, don't assume)
Hover the trigger to open the panel, then:

- **Width** — `panel.getBoundingClientRect().width`, rounded to an integer. A 268px narrow list and a 720px mega-menu grid are entirely different components.
- **Layout type** — classify as one of:
  - *single-column list* (narrow, every row is one item stacked vertically)
  - *multi-column grid* (wide, multiple columns of items side-by-side)
  - *grid with subgroup columns* (each column has a heading + list of items)
  - *side flyout* (hovering a row opens a second panel to the right)
  - *inline accordion* (a row with a chevron that pushes siblings down when expanded)
- **Row type inventory** — walk every direct child of the panel and classify each as: `link`, `subgroup-toggle` (has chevron/arrow), `heading`, `divider`, `CTA button`, `image-card`, `description-row`.
- **Dual-behavior rows** — a subgroup heading may be both a link (text navigates) and an accordion (chevron toggles). Identify which part of the row does what and mirror it.

Record this in `research/header.spec.md` under each nav group's "Panel anatomy" block. If you can't fill it in, you haven't finished extracting.

#### 2. Nested interactions (the second-level probe)
For any `subgroup-toggle` row, hover AND click it. Record:
- Does the sub-list appear inline (push siblings down) or to the side?
- How wide is the sub-list and does it have its own row types?
- Does the heading above the chevron also navigate somewhere when clicked?
- If the real site uses a CSS checkbox trick or `<details>` for this — ignore the mechanism; clone the visible behavior with React state.

#### 3. Item capture
Walk the expanded panel (including all nested subgroups) and capture every clickable item:

| Label | href | external? | parent subgroup | description (if shown) |

Rules:
- Resolve relative `href`s against the site origin.
- If `href` hostname differs from the site, mark `external: true`. Those get `target="_blank" rel="noopener noreferrer"` in the bundle.
- If an item has a sub-description line (e.g. "AI Workflow Automation"), capture it too.
- If a row has NO anchor (it's a heading or a divider), record it as a row-type entry, not as an item.

#### 4. Do not invent
If the final spec lists a row that you cannot point to on the live site, delete it. No "View all X" headers, no promo tiles, no "Featured" chips — unless they exist on the real panel.

### Trailing controls
- Search icon? CTA button? Language switcher? Record the element but implement only the hit-target — full search UI is out of scope unless the user explicitly asks for it.

### Forms in the header
If the header contains a form (search input, email signup, zip/dealer lookup, etc.), record the visible markup — placeholder, button label, layout — but do NOT wire up submission. The clone renders the input and button for pixel fidelity; the form is a visual stub. Note it under "Known omissions" in the header spec.

### Header scroll behavior and dropdown positioning
Before writing any dropdown code, determine:

1. **Header `position`** — measure `getComputedStyle(header).position`. Record whether it's `sticky`, `fixed`, `relative`, or `static`.
2. **Dropdown panel position** — on the live site, open a dropdown and measure:
   - `getComputedStyle(panel).position` and `top` / `left` values.
   - Walk up `parentElement` to find which ancestor has `position: relative`. That's the positioning context.
3. **Scroll test** — open a dropdown, then `window.scrollBy(0, 200)`. Does the dropdown scroll away with the header or stay pinned? The clone must match this behavior exactly.

```javascript
// Check header position and dropdown positioning
const header = document.querySelector('header');
console.log('header position:', getComputedStyle(header).position);
// Open a dropdown, then:
const panel = document.querySelector('SELECTOR_FOR_OPEN_PANEL');
console.log('panel position:', getComputedStyle(panel).position, 'top:', getComputedStyle(panel).top);
```

Record the measured values in the spec under "Dropdown positioning". Replicate the same positioning strategy in the component.

### Dropdown trigger behavior (do not assume)
Test the trigger mechanism for the FIRST dropdown before writing any code:
1. Hover the trigger — does the dropdown open?
2. Click the trigger — does the dropdown open/close?
3. If hover opens it, does click ALSO toggle it?
Record the result in the spec as one of:
- **hover + click** — hover opens, click also toggles
- **click-only** — hover does nothing; click toggles open/close
- **hover-only** — click navigates the href instead of toggling
The component state machine differs for each. Always test — do not assume any particular mechanism without measuring.

### Computed styles — header (via `getComputedStyle`)
Extract ALL of these before writing JSX. Group them into the spec under "Measured computed styles".

**Container:**
- `height`, `background`, `border-bottom`, `position`, `z-index`
- Inner max-width + horizontal padding

**Nav trigger buttons** (the top-level labels like "Products", "Solutions"):
- `color`, `font-weight`, `font-size`, `letter-spacing`
- Active/open state color and any border/indicator

**Utility links** (Login, Careers, etc. in the top bar):
- `color`, `font-weight`, `font-size`
- `text-decoration` / `text-decoration-line` (underlined by default? on hover only? never?)

**Dropdown interior** (open a dropdown and measure each distinct element type):
- Section header link (the big title at the top of the panel): `color`, `font-weight`, `font-size`
- Subgroup heading / secondary-title links: `color`, `font-weight`, `font-size`
- Regular item links (subtitle rows): `color`, `font-weight`, `font-size`, `text-decoration`
- Description paragraphs: `color`, `font-weight`, `font-size`
- Callout / bottom-bar links: `color`, `font-weight`, `font-size`
- Callout icons: `color` (do NOT assume they match the link color — they may differ)

**Dropdown panel:**
- `width`, `border-radius`, `box-shadow`, `padding`, item font-size

**Dropdown background color (check layering, not just the root):**
- The outermost panel element may have one `background-color`, but an inner container may override it with a different color that is actually visible. Walk from the panel root inward checking `backgroundColor` on each container. Record every non-transparent layer.
- Check the callout / bottom-bar row separately — it may have its own distinct background.

```javascript
// Walk inward from panel root to find the actual visible background
let el = panel;
while (el) {
  const bg = getComputedStyle(el).backgroundColor;
  if (bg !== 'rgba(0, 0, 0, 0)') console.log(el.className?.slice(0, 40), bg);
  el = el.firstElementChild;
}
```

**Dropdown column layout (measure the grid, not just the panel width):**
- Open a dropdown and find the container that holds the column groups (the div with `display: flex` or `display: grid` and multiple children).
- Measure: `display`, `grid-template-columns`, `flex-wrap`, `column-gap`, child count, and each child's `width` and `x` position.
- Check multiple dropdowns — the column count may vary between them, or it may be consistent. Record what you find for each.
- Record the column count, gap, and child width in the spec. Replicate the same layout mode (grid or flex) and column distribution in the component so column widths and spacing match the live site.

```javascript
// Measure dropdown column layout
const container = panel.querySelector('.column-container-selector');
const s = getComputedStyle(container);
console.log('display:', s.display, 'gap:', s.columnGap, 'wrap:', s.flexWrap);
[...container.children].forEach(c => {
  const r = c.getBoundingClientRect();
  console.log('x:', Math.round(r.left), 'w:', Math.round(r.width));
});
```

## Header — mobile (390px)

Resize the viewport to 390px and re-inspect.

- Where does the hamburger appear? What is its icon (Menu → X toggle)?
- At what breakpoint does the desktop nav disappear? (Usually `lg` = 1024px.)
- Open the drawer. Is the data identical to the desktop nav, or flatter?
- Does the drawer slide, fade, or instantly appear? Is it full-screen or a panel?
- Where does the close control live? (Tap hamburger again, tap X, tap outside, Escape.)

Functional parity expectations regardless of the live site's exact behavior:
- Body scroll is locked while drawer open.
- Tapping a link closes the drawer.
- Escape closes the drawer.
- Focus returns to the hamburger on close.

## Footer

### Grid layout (measure, don't assume)
Before listing columns, measure the footer's actual grid/flex structure:

1. Find all column headings (`h3`, `h4`, `h5`, etc.) inside the footer.
2. For EACH heading, record its **x-coordinate** via `getBoundingClientRect()`.
3. Headings that share the same x-coordinate are **in the same column**, stacked vertically. Do not split them into separate grid columns in the clone.
4. Record the grid template: number of columns, their sizing (fixed px vs `1fr`), and which sections share a column.

Example: if "Info" (x=1070, y=441) and "Follow Us" (x=1070, y=630) share the same x, they're stacked in one column — the grid has 4 columns, not 5.

```javascript
// Measure footer heading positions to detect shared columns
const footer = document.querySelector('footer');
const headings = [...footer.querySelectorAll('h3, h4, h5, [class*="heading"], [class*="title"]')];
headings.map(h => {
  const r = h.getBoundingClientRect();
  return { text: h.textContent.trim().slice(0, 30), x: Math.round(r.x), y: Math.round(r.y) };
});
```

### Columns
For each column:
- Heading
- Each link: label, `href`, external flag

### Bottom bar
- Logo (may or may not match the header logo — check both)
- Copyright line (verbatim)
- Legal links (privacy, terms, cookies, accessibility)
- Social icons: record icon type + `href` for each

### Computed styles — footer (via `getComputedStyle`)
Extract ALL of these before writing JSX. These are separate measurements from the header — do not copy header values into the footer.

**Column headings:**
- `color`, `font-weight`, `font-size`, `text-transform`

**Column links:**
- `color`, `font-weight`, `font-size`
- `text-decoration` / `text-decoration-line` — are links underlined by default? If so, do they lose the underline on hover? This is a common pattern and must match exactly.

**Social icon links:**
- `color`, `border`, `border-color` (icons may be green, white, or branded — do not assume)
- `width`, `height`, `padding`, `border-radius`
- Icon content size (SVG width/height inside the link)

**Legal / bottom-bar links:**
- `color`, `font-weight`, `font-size`, `text-decoration`

**Mission / tagline / CTA:**
- Any special button styles (border color, text color, hover state)

Record all values in a "Measured computed styles" table at the top of `footer.spec.md`.

### Widgets to flag but not implement
If the footer has any of these, record them under "Known omissions" in the footer spec. Render their visible markup for layout fidelity (input boxes, button text, placeholders, headings) but do NOT wire up any behavior:
- Newsletter signup form — input + button render, no submission handler
- Any other form (contact, zip-code lookup, quote request, etc.) — same rule
- Language / region switcher
- Live chat launcher
- Cookie consent banner (those are site-wide concerns, not a footer feature)

## Things to get right

- **Every href is real.** No `#` placeholders. If you can't extract a link, the spec is incomplete.
- **Dropdown trigger tested, not assumed.** Test hover AND click on the first dropdown trigger. Record whether it's hover+click, click-only, or hover-only. Do not assume any mechanism without testing.
- **Dropdown panels are measured, not guessed.** Width, layout type, row types, and nested expansion are recorded in the spec before any JSX is written.
- **Every distinct element type is measured.** Before writing any component, extract `getComputedStyle` for every visually distinct element: nav triggers, utility links, dropdown headings, dropdown items, dropdown descriptions, callout buttons, footer headings, footer links, social icons, legal links. Record them in a "Measured computed styles" table in the spec. If you skip this, you will ship wrong colors, wrong font weights, wrong text-decoration, and wrong sizes.
- **Footer grid structure is measured.** Heading x-coordinates determine which sections share a column. Do not split stacked sections into separate grid columns.
- **Link text-decoration is explicit.** For every link type (header utility, dropdown items, footer columns, legal bar), record whether it's underlined by default, underlined on hover only, or never underlined. "Underline by default, none on hover" is common and the opposite of the CSS default.
- **Icon colors are measured, not assumed.** Social icons, callout icons, and decorative icons may be green, white, branded, or different from surrounding text. Measure `color` and `border-color` on the actual elements.
- **No invented UI.** Every visible row in the cloned output must have a source on the live site. "View all X →", featured banners, promo chips, CTAs — if you can't screenshot it on the real site, delete it.
- **Dropdown positioning matches the live site.** Measure the dropdown panel's `position`, its positioned ancestor, and whether it scrolls with the header or stays pinned. Replicate the same behavior. Verify by scrolling while a dropdown is open.
- **Dropdown background is measured through all layers.** The outermost panel element's `background-color` may be overridden by an inner container. Walk inward checking each container's background. The callout/bottom row may have a different background from the main content area.
- **Dropdown column layout is measured and matched.** Measure the column container's display mode, column count, gap, and each child's width. Replicate the same distribution in the component so columns are spaced the same as the live site.
- **Button border widths are measured.** CTA buttons may have different `border-width` values. Measure `border-width` explicitly for every styled button.
- **Side-by-side before shipping.** Open the real site and the built demo in two tabs, open each dropdown in both (including expanded/nested states), and confirm the shapes match. Not just "both have links" — same width, same column count, same row types in the same order.
- **Style isolation.** The bundle must not style the host page's `<h1>` / `<p>` / `<ul>`. This is solved in `styles.css` by skipping preflight, but it's worth verifying with the host-isolation smoke test.

## Handy extraction snippets

Run these in the browser MCP console.

```javascript
// All header links as [{label, href}]
[...document.querySelector("header").querySelectorAll("a")].map(a => ({
  label: a.textContent.trim(),
  href: a.href,
}));
```

```javascript
// Measure an open dropdown panel — width, layout, position
const panel = document.querySelector("SELECTOR_FOR_OPEN_PANEL");
const r = panel.getBoundingClientRect();
const s = getComputedStyle(panel);
({
  width: Math.round(r.width),
  height: Math.round(r.height),
  display: s.display,
  gridCols: s.gridTemplateColumns,
  flexDir: s.flexDirection,
});
```

```javascript
// Enumerate row types inside an open panel — this is the probe that catches mega-menu hallucination
[...panel.children].map(el => ({
  tag: el.tagName,
  classes: (el.className || "").toString().slice(0, 80),
  hasChevron: !!el.querySelector('svg, .chevron, [class*="arrow"], [class*="caret"], [class*="plus"]'),
  linkHref: el.querySelector("a")?.href ?? null,
  textStart: (el.textContent || "").trim().slice(0, 60),
}));
```

```javascript
// Dropdown items after hovering a nav item — capture the entire menu
const menu = document.querySelector("SELECTOR_FOR_OPEN_DROPDOWN");
[...menu.querySelectorAll("a")].map(a => ({
  label: a.querySelector("[data-label]")?.textContent.trim() ?? a.textContent.trim(),
  description: a.querySelector("[data-description]")?.textContent.trim(),
  href: a.href,
  external: new URL(a.href).hostname !== location.hostname,
}));
```

```javascript
// Footer columns
[...document.querySelector("footer").querySelectorAll("[class*=column], [class*=col], nav")].map(col => ({
  heading: col.querySelector("h4,h3,h5,.heading")?.textContent.trim(),
  links: [...col.querySelectorAll("a")].map(a => ({
    label: a.textContent.trim(),
    href: a.href,
    external: new URL(a.href).hostname !== location.hostname,
  })),
}));
```

Adapt selectors to the target site.
