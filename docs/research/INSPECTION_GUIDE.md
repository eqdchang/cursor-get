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
- **Dual-behavior rows** — a subgroup heading is often both a link (text navigates) and an accordion (chevron toggles). Identify which part of the row does what and mirror it.

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

### Computed styles to capture (via `getComputedStyle`)
- Header container: `height`, `background`, `border-bottom`, `position`, `z-index`.
- Inner max-width + horizontal padding.
- Nav item font-size, font-weight, color, hover color.
- Dropdown: width, border-radius, shadow, padding, item font-size.

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

### Columns
For each column:
- Heading
- Each link: label, `href`, external flag

### Bottom bar
- Logo (often the same CDN URL as the header)
- Copyright line (verbatim)
- Legal links (privacy, terms, cookies, accessibility)
- Social icons: record icon type + `href` for each

### Widgets to flag but not implement
If the footer has any of these, record them under "Known omissions" in the footer spec. Render their visible markup for layout fidelity (input boxes, button text, placeholders, headings) but do NOT wire up any behavior:
- Newsletter signup form — input + button render, no submission handler
- Any other form (contact, zip-code lookup, quote request, etc.) — same rule
- Language / region switcher
- Live chat launcher
- Cookie consent banner (those are site-wide concerns, not a footer feature)

## Things to get right

- **Every href is real.** No `#` placeholders. If you can't extract a link, the spec is incomplete.
- **Hover AND click both open dropdowns.** The live site may be hover-only, but our bundle must support both so it works on touch and keyboard.
- **Dropdown panels are measured, not guessed.** Width, layout type, row types, and nested expansion are recorded in the spec before any JSX is written.
- **No invented UI.** Every visible row in the cloned output must have a source on the live site. "View all X →", featured banners, promo chips, CTAs — if you can't screenshot it on the real site, delete it.
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
