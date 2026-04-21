# Clone Header + Footer

You are about to extract the **header** and **footer** from the URL the user provides and package them as self-contained drop-in JS bundles that can be shipped into any host site via a single `<script>` tag.

Scope is only two components per site. No page body, no section loop, no full-page clone. If the user asks you to clone anything else, stop and redirect them to that narrower scope first.

## Scope defaults

- **Fidelity level:** Pixel-perfect visuals AND functional parity with the live site. Hover-reveal dropdowns, click-to-toggle, keyboard navigation, mobile drawer, body scroll lock, focus restore, ARIA — all must match.
- **Links:** Every `href` points to the real live URL. External links (different hostname than the target) get `target="_blank" rel="noopener noreferrer"`.
- **Style isolation:** The bundle must not leak CSS onto the host site. Preflight is disabled, everything is wrapped in a scope class.
- **Out of scope:** Page body, hero, sections, CMS content. Backend. Authentication. Search functionality (the icon may exist, but implementing a search panel is out of scope unless explicitly requested).

## Pre-flight

1. Browser MCP is required (Playwright MCP, Chrome MCP, etc.). If none is available, ask the user which they have.
2. Parse the user's message as a single URL. Validate it resolves via the browser MCP.
3. Derive the site slug from the hostname: drop `www.`, replace `.` with `-`, lowercase. E.g. `https://boardwalktech.com/` → `boardwalktech-com` (or just `boardwalktech` if the user prefers a shorter name — confirm if ambiguous).
4. Verify the bundles package installs and builds: `cd bundles && npm install && npm run build:boardwalktech`. This confirms the existing template works before you scaffold a new site.

## Functional parity contract (done-criteria)

Do NOT consider the site done until every item below is verified on the built bundle served from `bundles/sites/<slug>/demo/`:

### Header — desktop (viewport >= 1024px)
- [ ] Hovering each top-level nav item opens its dropdown.
- [ ] Clicking each top-level nav item toggles its dropdown open/closed (for touch and keyboard).
- [ ] Only one dropdown is open at a time; opening one closes the previous.
- [ ] Tab reaches each nav item; Enter/Space toggles its dropdown.
- [ ] Escape closes the open dropdown.
- [ ] Clicking outside the nav closes any open dropdown.
- [ ] Every link in every dropdown has a non-empty, non-`#` `href` that matches the value in the spec file.
- [ ] External links have `target="_blank" rel="noopener noreferrer"`.
- [ ] `aria-haspopup="menu"`, `aria-expanded`, `role="menu"`, `role="menuitem"` are set.

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

### Style isolation
- [ ] `styles.css` imports `tailwindcss/theme.css` and `tailwindcss/utilities.css` only — NOT `tailwindcss/preflight.css` and NOT the umbrella `@import "tailwindcss";`.
- [ ] Top-level render is wrapped in `<div className="bw-scope">…</div>` (or the site's scope class).
- [ ] Host-page smoke test: drop the bundle into a blank HTML page with pre-existing `<h1>`, `<ul>`, `<p>` styles and confirm they render unchanged.

## Step 1 — Scaffold the per-site folder

Create the directory tree under `bundles/sites/<slug>/`:

```
bundles/sites/<slug>/
  src/
    styles.css        (copy boardwalktech's — Tailwind without preflight + scope rules)
    types.ts
    header/
      SiteHeader.tsx
      mount.tsx
    footer/
      SiteFooter.tsx
      mount.tsx
  demo/
    header.html       (<div id="<slug>-header-root"></div> + <script src="../../../dist/<slug>/header.bundle.js">)
    footer.html
  research/
    header.spec.md
    footer.spec.md
```

Start by copying the boardwalktech site as the template, then replace the slug-specific bits (global name in `mount.tsx`, mount id, logo URL, nav data, footer data).

## Step 2 — Extract the header from the live site

Using the browser MCP at a 1440px viewport:

1. Identify the `<header>` / `<nav>` root element. Capture its DOM structure and `getComputedStyle()` values.
2. Extract the logo: absolute URL of the `<img src>`, width, height, alt.
3. For each top-level nav item: hover it, capture the dropdown that appears. For each dropdown item, capture label, `href`, and description text.
4. Check every `href` — if it's a relative path (`/platform`), resolve it against the site origin. If it points to a different hostname, mark `external: true`.
5. Capture any trailing icons (search, CTA button, etc.).

Then resize to 390px and inspect the mobile layout:

1. Locate the hamburger button and its icon.
2. Open the mobile drawer. Capture the drawer markup — is it the same data as desktop, or different?
3. Note any close behaviors that differ from the contract above (e.g. a close button inside the drawer).

Write all of this into `bundles/sites/<slug>/research/header.spec.md` using the structure below.

## Step 3 — Extract the footer

1. Identify the `<footer>` root.
2. Enumerate column headings and links. Record label + `href` for each.
3. Bottom bar: logo, copyright line, privacy / terms links, any social icons.
4. Flag widgets that are out of scope (newsletter signup, language switcher) under "Known omissions".

Write `bundles/sites/<slug>/research/footer.spec.md`.

## Step 4 — Generate the TypeScript

- Copy `bundles/sites/boardwalktech/src/header/SiteHeader.tsx` to `bundles/sites/<slug>/src/header/SiteHeader.tsx`.
- Replace:
  - `SITE_BASE` constant with the live site's origin.
  - `LOGO_SRC` with the extracted absolute logo URL.
  - `NAV_GROUPS` array with the extracted nav data.
  - Scope class name if the slug warrants a different prefix (optional — `bw-scope` is fine for all sites).
- Do the same for `footer/SiteFooter.tsx` with the footer columns.
- Copy `types.ts` and `styles.css` verbatim from boardwalktech.
- In `mount.tsx` for both header and footer:
  - Change `DEFAULT_MOUNT_ID` to `<slug>-header-root` / `<slug>-footer-root`.
  - Change the global name assigned to `window` (e.g. `window.ExampleHeader`).
- Update `vite.config.ts` if needed — it should auto-resolve via `SITE=<slug>` already.

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
3. Resize to 390px. Walk the Header mobile checklist.
4. Navigate to `http://localhost:8765/sites/<slug>/demo/footer.html`.
5. Walk the Footer checklist.
6. Navigate to a **blank** HTML page that only imports the header bundle — verify the host's default `<h1>` / `<ul>` / `<p>` styles are unchanged (style isolation smoke test).

If any checkbox fails, fix the component, rebuild, and re-run the test. Do not move on until every box is green.

## Step 7 — Preview in Next.js (optional but recommended)

Edit `src/app/page.tsx` to import from `bundles/sites/<slug>/src/...` instead of `boardwalktech`, then run `npm run dev`. This renders the same source as the bundle inside a full Next.js page — useful for catching layout issues.

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
| Label | href | external | description |
|-------|------|----------|-------------|
| …     | …    | …        | …           |

## Desktop behaviors
- Dropdown trigger: hover + click
- Close triggers: outside click, Escape
- Search icon: <present / absent> — <implemented / stubbed>

## Mobile behaviors
- Hamburger breakpoint: <px>
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
