# Header + Footer Drop-in Bundler (Cursor CLI)

## What this is

A focused template for extracting a website's header and footer and shipping them as self-contained drop-in JS bundles. Each bundle is a single `<script>` tag that mounts a fully functional header or footer onto any host page — no React or Tailwind required on the host.

Run `/clone-header-footer <url>` in a Cursor session with a browser MCP attached (Playwright MCP, Chrome MCP, etc.) to produce a new site's bundle.

## Tech stack

### Bundle package (`bundles/`) — the shippable artifact
- Vite 7 library mode (IIFE output)
- React 19 + react-dom (bundled into the artifact)
- Tailwind CSS v4, **preflight disabled** for style isolation
- `vite-plugin-css-injected-by-js` to inject CSS into the host page head at runtime
- `lucide-react` icons (tree-shaken)
- TypeScript strict mode

### Preview harness (`src/`) — the local preview
- Next.js 16 (App Router, React 19)
- Tailwind CSS v4 (full preflight — it's a normal Next.js app)
- Imports the header + footer components directly from `bundles/sites/<slug>/src/` so the preview matches the shipped artifact exactly, no source duplication

## Project structure

```
bundles/                              # shippable drop-in bundles
  vite.config.ts                      # lib mode; reads SITE + BUNDLE env vars
  package.json                        # scripts: build:<slug>, build:all, dev:<slug>
  scripts/build-all.mjs               # iterates sites/ and builds each
  sites/
    boardwalktech/                    # example reference site
      src/
        styles.css                    # Tailwind v4 without preflight + scope rules
        types.ts                      # NavGroup, FooterColumn, etc.
        header/
          SiteHeader.tsx              # Component with JS-driven dropdowns
          mount.tsx                   # Auto-mount + window.BoardwalkHeader API
        footer/
          SiteFooter.tsx
          mount.tsx
      demo/
        header.html                   # <div> + <script> smoke-test page
        footer.html
      research/
        header.spec.md                # Extracted from the live site
        footer.spec.md
  dist/                               # build output (gitignored)
    boardwalktech/
      header.bundle.js
      footer.bundle.js

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
- `npm run build` — build the default site (boardwalktech)
- `npm run build:<slug>` — e.g. `npm run build:boardwalktech`
- `npm run build:all` — every site
- `npm run dev:<slug>` — Vite dev server rooted in `sites/<slug>/demo/`

## Functional parity contract

Every extracted header + footer must pass this checklist before being considered done. Full rubric lives in `.cursor/commands/clone-header-footer.md`.

### Header (desktop)
- Hover opens dropdown. Click also opens/closes dropdown (touch + keyboard users).
- Only one dropdown open at a time; outside click closes.
- Escape closes the open dropdown.
- Every `href` is real. External links get `target="_blank" rel="noopener noreferrer"`.
- ARIA: `aria-haspopup="menu"`, `aria-expanded`, `role="menu"`, `role="menuitem"`.

### Dropdown panel anatomy
- Panel width, layout type (single-column / grid / flyout / accordion), and row types recorded in `research/header.spec.md` BEFORE any JSX is written.
- Nested interactions probed: for every row with a chevron/arrow, hover AND click it and mirror the resulting behavior (inline accordion vs. side flyout).
- Side-by-side screenshot diff against the live site in all expanded states passes before shipping.
- No invented UI. Every visible row traces to the live site. No "View all X", no fabricated CTAs, no decorative headers.

### Header (mobile)
- Hamburger toggles drawer. Close on link tap, Escape, or toggle again.
- Body scroll locked while drawer open. Focus returns to hamburger on close.

### Footer
- Every `href` is real.
- Site-specific widgets (newsletter, social, language) are implemented or explicitly noted as omitted.

### Style isolation
- `styles.css` imports `tailwindcss/theme.css` + `tailwindcss/utilities.css` only. Preflight is NOT included.
- Everything is wrapped in a `<div className="bw-scope">` so any future base rules are scoped.

## Working style

- One site per commit. `feat(<slug>): extract header + footer as drop-in bundle`.
- Never build full-page sections. Hero, cards, testimonials, etc. are explicitly out of scope.
- The bundle source is the source of truth. The Next.js preview imports from it — never duplicate components between `bundles/sites/<slug>/src/` and `src/`.
- After any component edit, rebuild the affected bundle (`npm run bundles:build:<slug>`) and run the functional-parity smoke test against `bundles/sites/<slug>/demo/`.

## Cold-start vs diff mode

Every `/clone-header-footer <url>` run begins by checking whether `bundles/sites/<slug>/` exists.

- **Cold-start** (folder does not exist): create a site-agnostic skeleton (`styles.css` with the project-wide `bw-scope` class, `types.ts`, `mount.tsx`, demo HTML). Do NOT copy `SiteHeader.tsx` or `SiteFooter.tsx` from any other site — components are written from scratch, shaped by this site's own extracted spec. Starting a new site from another site's JSX is the root cause of shape-transfer bugs (e.g. the mega-menu that leaked from boardwalktech into byrna).
- **Diff mode** (folder exists): re-extract the spec into a temp location, diff against the existing spec, and classify each change as *data-only* (auto-apply by updating the data arrays in `SiteHeader.tsx` / `SiteFooter.tsx`) or *structural* (stop and report to the user for manual review). Component logic is never rewritten silently on a re-clone.

Full rubric for both modes lives in `.cursor/commands/clone-header-footer.md`.
