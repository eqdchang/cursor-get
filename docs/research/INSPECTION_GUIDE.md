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
For each dropdown, hover or click the trigger and record every item:

| Label | href | external? | description (if shown) |

Rules:
- Resolve relative `href`s against the site origin.
- If `href` hostname differs from the site, mark `external: true`. Those get `target="_blank" rel="noopener noreferrer"` in the bundle.
- If an item has a sub-description line (e.g. "AI Workflow Automation"), capture it too.

### Trailing controls
- Search icon? CTA button? Language switcher? Record the element but implement only the hit-target — full search UI is out of scope unless the user explicitly asks for it.

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
If the footer has any of these, record them under "Known omissions" in the footer spec:
- Newsletter signup form
- Language / region switcher
- Live chat launcher
- Cookie consent banner (those are site-wide concerns, not a footer feature)

## Things to get right

- **Every href is real.** No `#` placeholders. If you can't extract a link, the spec is incomplete.
- **Hover AND click both open dropdowns.** The live site may be hover-only, but our bundle must support both so it works on touch and keyboard.
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
