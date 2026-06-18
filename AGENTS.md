# Header + Footer Drop-in Bundler (Cursor CLI)

## What this is

A focused template for extracting a website's header and footer and shipping them as self-contained drop-in artifacts onto any host page — no React or Tailwind required on the host. In both modes the rendered output is sandboxed in a Shadow DOM, so host CSS can't bleed in and the artifact's CSS can't leak out.

Run `/clone-header-footer <url>` in a Cursor session with a browser MCP attached (Playwright MCP, Chrome MCP, etc.) to produce a new site's artifacts. The extraction process and parity rubric are identical for both modes — only the final packaging differs.

## Two ways to use this (output modes)

`/clone-header-footer <url>` accepts an optional mode flag. Both can ship side by side for the same site; the bundle is always the fallback.

### 1. Bundle mode (`-bundle`, the default)

The classic single-`<script>` IIFE artifact. React renders the header/footer into a Shadow DOM at runtime. The client drops in one `<script>` tag plus a mount `<div>`; everything (markup, JS, CSS) lives inside the bundle.

- **Best when:** the client just wants to embed it and never touch the contents, or the markup is regenerated from source on every change.
- **To edit copy/links:** edit the component's data (`.tsx`) and rebuild — there is no HTML for the client to hand-edit.
- **Hand off:** `header.bundle.js` + `footer.bundle.js` + a mount `<div>` per artifact.

### 2. Raw mode (`-raw`)

In addition to the bundle, emits an **editable HTML** artifact set. The header/footer ship as plain, hand-editable HTML the client pastes into their own site; a small companion script provides the interactivity and isolation.

- **Best when:** the client needs to update text and `href`s directly in the markup without a rebuild (e.g. a link changed).
- **How isolation is preserved:** the editable markup lives in the host's light DOM (so it's editable), and on load `header.js` reads that markup, moves it into a Shadow DOM, injects the compiled CSS, and wires up behavior off `data-bw-*` attributes. What renders is sandboxed exactly like the bundle.
- **To edit copy/links:** edit the `.html` fragment in place — keep the `data-bw-*` attributes intact. No rebuild needed.
- **Hand off:** `header.html` + `footer.html` (editable) + `header.js` + `footer.js` (CSS is inlined into the JS; `styles.css` is a reference copy only).
- **Source of truth stays single:** the static HTML is generated at build time (`renderToStaticMarkup`) from the same `data.ts` / `icons.ts` the bundle uses, and the raw build never touches the frozen bundle files.

The full raw-mode rubric lives in `.cursor/commands/clone-header-footer.md` ("Step 5b — Raw build").

### Scan-freshness flag (`-fresh`)

`-fresh` is a modifier (not an output mode) that can be combined with `-bundle` or `-raw` — e.g. `/clone-header-footer https://example.com -raw -fresh`. It forces a **clean-slate re-scan** of the live site:

- **Ignore all prior findings.** Do not trust the existing `research/header.spec.md` / `footer.spec.md`, prior screenshots, memory, or any value already in the component files. Re-measure everything from the live DOM as if the site had never been cloned.
- **Ignore the data-only/structural diff shortcut.** Normal diff mode (folder exists) only updates data arrays for "safe" diffs and leaves component logic alone. `-fresh` suspends that: re-derive the full spec, then reconcile the components against the freshly measured truth, replacing styles/structure where they disagree with the live site.
- **Use it when** a normal re-clone has drifted, the user says the clone "still doesn't match," or you suspect the stored spec is stale/wrong. It is the explicit "stop trusting the cache, look again in detail" switch.
- It does **not** change what gets shipped (bundle vs raw) — that's still controlled by `-bundle`/`-raw`. It only changes how thoroughly the live site is re-examined.

## Match every detail — for every site (non-negotiable)

This applies to **every** site, not just one. On any fresh scan, the live site is the only source of truth, and the goal is to match it as closely as humanly possible — pixel for pixel, weight for weight, pixel of spacing for pixel of spacing.

- **Inspect every single thing.** Walk every nav item, every dropdown, every row inside every dropdown, every footer column, every icon, every button, every divider, every badge. If it is visible on the live site, it gets measured and reproduced. Nothing is "close enough."
- **Measure, never eyeball.** For every distinct element, pull `getComputedStyle` and record `font-family`, `font-size`, `font-weight`, `line-height`, `letter-spacing`, `text-transform`, `color`, plus box metrics (`width`, `height`, `padding`, `margin`, `gap`, `border`, `border-radius`) and `background-color`. Approximations (15px vs 16px, weight 400 vs 900, a 35px circle vs bare icon) are exactly the differences users catch.
- **Every icon is a real measurement.** Capture each icon's rendered size, color, stroke, and any container chrome (circular background, fill color, border, badge). Don't assume an icon is bare — many sit inside styled buttons.
- **Fonts must actually render at the right weight.** If the clone looks lighter/thinner than live, the brand webfont is probably not loading or is loading at the wrong weight. Verify the exact `@font-face` files and weights the live site loads and confirm the embedded files match. Register `@font-face` at the document level (see Style isolation), never only inside the shadow root.
- **Responsive values are responsive.** If the live site sizes text/spacing with `vw`/`clamp`, the clone must too — a single fixed px can't track a `vw` site across widths. Always compare at the SAME viewport width.
- **Prove it before claiming a match.** After editing, rebuild, RE-MEASURE the same elements, and take a fresh side-by-side screenshot at the same viewport in the same state. Do not say "this matches" without a same-turn measurement + screenshot. (Full rubric: `.cursor/rules/live-site-fidelity.mdc`.)

## Tech stack

### Bundle package (`bundles/`) — the shippable artifact
- Vite 7 library mode (IIFE output)
- React 19 + react-dom (bundled into the artifact)
- Tailwind CSS v4, **preflight disabled** for style isolation
- **Shadow DOM mount** — each `mount()` call attaches a shadow root to the target element and renders the header/footer inside it. CSS is imported as a string via `import styles from "../styles.css?inline"` and injected as a `<style>` tag inside the shadow root. Host CSS cannot reach inside; bundle CSS cannot leak out.
- `postcss-prefix-selector` (`bundles/postcss.config.mjs`) prefixes every selector with `.bw-scope` as defense-in-depth — if `attachShadow` is ever unavailable for a mount target, the prefix still keeps utilities scoped.
- `lucide-react` icons (tree-shaken)
- TypeScript strict mode

### Raw mode artifacts (`bundles/sites/<slug>/src/raw/`) — the editable drop-in
- Built by `bundles/scripts/build-raw.mjs` (separate from the Vite bundle build; never modifies `header.bundle.js` / `footer.bundle.js`).
- `header.static.tsx` renders the FULL DOM for every state up front (all submenus, panels, full mobile drawer), each non-default state marked `hidden`, wired with `data-bw-*` hooks. It reuses the bundle's `data.ts` / `icons.ts`, so copy is never duplicated. Built to HTML via `renderToStaticMarkup`.
- `behavior-header.ts` / `behavior-footer.ts` are vanilla controllers: read the host markup, attach a Shadow DOM, inject the compiled CSS (inlined at build via `__BW_STYLES__`), and layer on all interactivity off the `data-bw-*` attributes. Same `--tw-*` reset and `composedPath()` outside-click handling as the bundle.
- Output: `header.html` + `footer.html` (editable) + `header.js` + `footer.js` (CSS inlined) + `styles.css` (reference) + `raw-demo.html` (smoke test).

### Preview harness (`src/`) — the local preview
- Next.js 16 (App Router, React 19)
- Tailwind CSS v4 (full preflight — it's a normal Next.js app)
- Imports the header + footer components directly from `bundles/sites/<slug>/src/` so the preview matches the shipped artifact exactly, no source duplication

## Project structure

```
bundles/                              # shippable drop-in bundles
  vite.config.ts                      # lib mode; reads SITE + BUNDLE env vars
  package.json                        # scripts: build:<slug>, build:all, dev:<slug>, build:raw:<slug>
  scripts/build-all.mjs               # iterates sites/ and builds each (bundle mode)
  scripts/build-raw.mjs               # raw-mode build (editable HTML + companion JS)
  sites/
    boardwalktech/                    # example reference site
      src/
        styles.css                    # Tailwind v4 without preflight + scope rules
        types.ts                      # NavGroup, FooterColumn, etc.
        header/
          SiteHeader.tsx              # Component with JS-driven dropdowns (bundle mode)
          data.ts                     # nav/footer data — shared by bundle + raw
          mount.tsx                   # Auto-mount + window.BoardwalkHeader API
        footer/
          SiteFooter.tsx
          mount.tsx
        raw/                          # raw-mode source (only present for -raw sites)
          header.static.tsx           # full static render, all states, data-bw-* hooks
          behavior-header.ts          # vanilla: shadow-adopt + CSS inject + interactivity
          behavior-footer.ts          # vanilla: shadow-adopt + CSS inject
          render.tsx                  # build entry: renderToStaticMarkup → JSON
      demo/
        header.html                   # <div> + <script> smoke-test page
        footer.html
      research/
        header.spec.md                # Extracted from the live site
        footer.spec.md
  dist/                               # build output (gitignored)
    boardwalktech/
      header.bundle.js                # bundle mode
      footer.bundle.js
      header.html, footer.html        # raw mode: editable fragments
      header.js, footer.js            # raw mode: companion behavior (CSS inlined)
      styles.css, raw-demo.html       # raw mode: reference CSS + smoke-test page

src/                                  # Next.js preview harness
  app/
    layout.tsx
    page.tsx                          # renders SiteHeader + SiteFooter from bundles/sites/boardwalktech/src/
    globals.css                       # Tailwind scans bundles/sites/**/src too

docs/
  research/
    INSPECTION_GUIDE.md               # what to extract from a live site
  design-references/
    <hostname>/                       # Screenshots used as extraction targets

.cursor/
  commands/
    clone-header-footer.md            # the /clone-header-footer slash command
```

## Commands

### Root (Next.js preview)
- `npm run dev` — preview harness at http://localhost:3000
- `npm run build` — Next.js production build
- `npm run typecheck` — TypeScript check
- `npm run bundles:build` — build the default site's bundles
- `npm run bundles:build:all` — build every site under `bundles/sites/`

### `bundles/` package
- `npm run build` — build the default site (boardwalktech), bundle mode
- `npm run build:<slug>` — e.g. `npm run build:boardwalktech`
- `npm run build:all` — every site, bundle mode
- `npm run dev:<slug>` — Vite dev server rooted in `sites/<slug>/demo/`
- `npm run build:raw:<slug>` — raw mode: emit editable HTML + companion JS for a site (e.g. `npm run build:raw:barings-com`). Does not touch the bundle.

## Standing extraction process

The full rubric is in `.cursor/commands/clone-header-footer.md` ("General approach (always)"). The order is non-negotiable on every site:

1. Walk every dropdown in the header and every collapsible/widget in the footer at the desktop viewport. Open each, screenshot to `images/`, then close it. Do the same for every nested level (subgroup expansion, side flyout, accordion). Every state visible on the live site has a screenshot before any JSX is written.
2. Probe interactivity: hover AND click each top-level trigger (record which mechanism opens the dropdown), hover representative rows inside, click chevrons/sub-toggles, confirm hit-targets for trailing widgets. Capture how the trigger itself changes when its dropdown is open (color, underline, 3px bar, chevron rotation, parent `--active` class).
3. Repeat the entire pass at mobile (~390px). Open the hamburger, screenshot the drawer, expand each group inside and screenshot each expansion. Mobile interaction model and typography are measured independently — never assume they mirror desktop.
4. Match every visible ornament: borders, fonts, icons, spacing, colors, hover/click effects, active-state indicators, separator lines, `::before` / `::after` pseudo-elements, animated chevron rotations, focus rings, image assets. Header / footer / utility-bar styles are independent — measure each link and button type separately.
5. All screenshots and reference images go to `images/` at the repo root by default. The folder is created in pre-flight (`mkdir -p images`) and is gitignored. Never store screenshots elsewhere; never ask where to save them.

## Functional parity contract

Every extracted header + footer must pass this checklist before being considered done. Full rubric lives in `.cursor/commands/clone-header-footer.md`.

### Header (desktop)
- Dropdown trigger behavior matches the live site: hover+click, click-only, or hover-only. Test BOTH hover and click on the first trigger during extraction (Step 2b) and record the result. Do not default to hover+click without testing.
- Only one dropdown open at a time; outside click closes.
- Escape closes the open dropdown.
- Every `href` is real. External links get `target="_blank" rel="noopener noreferrer"`.
- ARIA: `aria-haspopup="menu"`, `aria-expanded`, `role="menu"`, `role="menuitem"`.

### Dropdown panel anatomy
- Panel width, layout type (single-column / grid / flyout / accordion), and row types recorded in `research/header.spec.md` BEFORE any JSX is written.
- **Dropdown positioning measured and matched.** Measure the dropdown panel's `position`, its positioned ancestor, and whether it scrolls with the header or stays pinned. The clone must replicate the same behavior. Verify by scrolling while a dropdown is open.
- **Dropdown background color measured by walking inward from the panel root**, not just reading the root's `background-color`. Inner containers may override the root's color. The callout/bottom row may have its own distinct background. Record every non-transparent layer.
- **Dropdown column layout measured and matched.** Measure the live site's column container display mode, column-gap, child count, and child widths. Replicate the same layout so columns are distributed the same way as the live site.
- Nested interactions probed: for every row with a chevron/arrow, hover AND click it and mirror the resulting behavior (inline accordion vs. side flyout).
- **Computed styles measured for every distinct element type inside the dropdown** (section header, subgroup headings, heading-static labels, item links, descriptions, callout buttons, icons) — each has its own font-size, font-weight, and color. Measure every one independently; do not reuse values from other element types.
- **CTA button border-width measured explicitly.** Measure `border-width` for every styled button — do not assume 1px.
- Side-by-side screenshot diff against the live site in all expanded states passes before shipping.
- No invented UI. Every visible row traces to the live site. No "View all X", no fabricated CTAs, no decorative headers.

### Header (mobile)
- Hamburger toggles drawer. Close on link tap, Escape, or toggle again.
- Body scroll locked while drawer open. Focus returns to hamburger on close.

### Footer
- Every `href` is real.
- Site-specific widgets (newsletter, social, language) are implemented or explicitly noted as omitted.
- Grid column count matches the live site. Sections sharing an x-coordinate on the live site share a grid column in the bundle — measure heading positions before deciding the grid template.
- All computed styles measured independently from header: column heading `font-size`/`font-weight`, link `font-weight`, link `text-decoration`, social icon `color`/`border-color`/size. Footer values and header values are measured separately — do not copy between them.

### Style isolation
- **Shadow DOM is the primary isolation mechanism.** Each `mount.tsx` calls `target.attachShadow({ mode: "open" })`, injects a `<style>` tag with the bundled CSS (imported via `?inline`), and renders React inside a container element within the shadow root. Host CSS cannot cross the shadow boundary in either direction.
- `styles.css` imports `tailwindcss/theme.css` + `tailwindcss/utilities.css` only. Preflight is NOT included.
- Everything is still wrapped in a `<div className="bw-scope">` and the PostCSS pass (`bundles/postcss.config.mjs`, using `postcss-prefix-selector`) still prefixes every emitted selector with `.bw-scope` — defense-in-depth in case a mount target is ever an element that can't host a shadow root.
- Click-outside detection inside shadow DOM uses `event.composedPath()` (not `e.target`) so clicks inside the shadow are correctly identified as "inside the nav". `e.target` from a `document` listener gets re-targeted to the shadow host and would otherwise produce false outside-click closes.
- **`@font-face` MUST be registered at the document level, not inside the shadow root.** Browsers silently ignore `@font-face` rules declared inside a Shadow DOM `<style>`, so brand webfonts fail to load and text falls back to a lighter/narrower system face. Every mount path (both `mount.tsx` files and both `behavior-*.ts` files) calls `hoistFontFaces()` (`src/lib/hoist-fonts.ts`), which extracts the `@font-face` blocks from the compiled CSS and injects them once into `<head>` (deduped via `style[data-bw-fonts]`). Fonts registered at the document level are usable inside any shadow root, so the rest of the CSS still stays scoped in the shadow. Self-hosted base64 fonts make this safe even on hosts with no network access.
- Net effect: the bundle's styles override host styles inside the header/footer (because they live in a separate DOM tree), and zero rules apply outside the shadow root.

## Working style

- One site per commit. `feat(<slug>): extract header + footer as drop-in bundle`.
- Never build full-page sections. Hero, cards, testimonials, etc. are explicitly out of scope.
- The bundle source is the source of truth. The Next.js preview imports from it — never duplicate components between `bundles/sites/<slug>/src/` and `src/`.
- After any component edit, rebuild the affected bundle (`npm run bundles:build:<slug>`) and run the functional-parity smoke test against `bundles/sites/<slug>/demo/`.

## Cold-start vs diff mode

Every `/clone-header-footer <url>` run begins by checking whether `bundles/sites/<slug>/` exists.

- **Cold-start** (folder does not exist): create a site-agnostic skeleton (`styles.css` with the project-wide `bw-scope` class, `types.ts`, `mount.tsx`, demo HTML). Do NOT copy `SiteHeader.tsx` or `SiteFooter.tsx` from any other site — components are written from scratch, shaped by this site's own extracted spec. Starting a new site from another site's JSX is the root cause of shape-transfer bugs (e.g. the mega-menu that leaked from boardwalktech into byrna).
- **Diff mode** (folder exists): re-extract the spec into a temp location, diff against the existing spec, and classify each change as *data-only* (auto-apply by updating the data arrays in `SiteHeader.tsx` / `SiteFooter.tsx`) or *structural* (stop and report to the user for manual review). Component logic is never rewritten silently on a re-clone.
- **Fresh mode** (`-fresh` flag, folder may or may not exist): ignore the existing spec, prior screenshots, and the data-only/structural diff shortcut entirely. Re-measure the live site from scratch and reconcile the components against that freshly measured truth, fixing styles/structure wherever they disagree. Use when a clone has drifted or the user says it "still doesn't match." See "Scan-freshness flag (`-fresh`)" above.

Full rubric for all modes lives in `.cursor/commands/clone-header-footer.md`.
