# Header + Footer Drop-in Bundler

Extract any site's header and footer as self-contained JavaScript bundles you can drop into another site with a single `<script>` tag. Each bundle includes its own React, styles, and icons — the host page needs nothing else.

Point it at a URL, run `/clone-header-footer` inside Cursor with a browser MCP attached, and the agent will extract the header and footer (DOM, computed styles, every link, dropdown contents, mobile drawer) and produce two built bundles in `bundles/dist/<slug>/`.

Functional parity is non-negotiable: hover AND click open dropdowns, mobile drawer locks body scroll and restores focus on close, ARIA is correct, every link points at the real live URL, and Tailwind's preflight is stripped so the bundle does not restyle the host page.

## Quick start

```bash
git clone <this-repo> my-clones
cd my-clones

# Install the Next.js preview harness and the bundles package
npm install
cd bundles && npm install && cd ..

# Preview whatever sites are already under bundles/sites/
npm run dev   # http://localhost:3000
```

The preview index lists every folder in `bundles/sites/` and links to its route (`/<slug>`). To build the shippable bundles for a given site:

```bash
cd bundles
npm run build:<slug>
# produces bundles/dist/<slug>/{header,footer}.bundle.js
#   each typically ~210 KB (~65 KB gzipped)
```

`npm run bundles:build:all` from the repo root builds every site at once.

## Cloning a site

Start a Cursor CLI session in this repo and run:

```
/clone-header-footer https://example.com/
```

The agent will:

1. Derive a site slug from the hostname (e.g. `example-com`).
2. Detect whether `bundles/sites/<slug>/` already exists and pick a mode:
   - **Cold-start** (new site): scaffold `bundles/sites/<slug>/{src,demo,research}/` from a site-agnostic skeleton and write `SiteHeader.tsx` / `SiteFooter.tsx` from scratch, shaped entirely by this site's own extracted spec. No other site is used as a template.
   - **Diff mode** (existing site): re-extract into a temp spec, diff it against the current one, auto-apply *data-only* changes (logo URL, added / removed links, updated copyright), and stop and report *structural* changes (a dropdown's panel shape changed, a new widget appeared) for manual review.
3. Extract the header (logo, nav items, dropdown panel anatomy, every `href`, mobile drawer) and footer (columns, links, copyright, legal, form stubs).
4. Write `research/header.spec.md` + `research/footer.spec.md`.
5. Build `bundles/dist/<slug>/{header,footer}.bundle.js`.
6. Run a functional-parity smoke test in the browser MCP against the site's `demo/` folder, including a side-by-side visual diff against the live site.

One site per commit.

## Using a built bundle on a host site

Each bundle auto-mounts into a `<div>` whose id matches `<slug>-header-root` or `<slug>-footer-root`. Drop into any HTML page:

```html
<!-- Where the header should render -->
<div id="<slug>-header-root"></div>

<!-- Everything else on the page -->
<main>...</main>

<!-- Where the footer should render -->
<div id="<slug>-footer-root"></div>

<!-- One script tag each, anywhere -->
<script src="/path/to/header.bundle.js"></script>
<script src="/path/to/footer.bundle.js"></script>
```

For programmatic control, each bundle exposes a global `window.<PascalSlug>Header` / `window.<PascalSlug>Footer` (e.g. for a site with slug `acme`, the globals are `window.AcmeHeader` and `window.AcmeFooter`):

```js
window.<PascalSlug>Header.mount("#some-other-slot");
window.<PascalSlug>Header.unmount();

window.<PascalSlug>Footer.mount(document.getElementById("footer-slot"));
window.<PascalSlug>Footer.unmount();
```

Host page requirements: none. React, styles, and icons are all bundled inside. Tailwind's preflight is stripped so the host's `<h1>`, `<p>`, `<ul>`, etc. render with their existing styles.

## Prerequisites

- [Node.js](https://nodejs.org/) 24+
- [Cursor](https://cursor.com/) with CLI access
- A browser MCP server (Playwright MCP recommended — the agent uses it for extraction and verification)

### Browser MCP setup

```jsonc
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    }
  }
}
```

Add to `~/.cursor/mcp.json`, restart Cursor, then run `/clone-header-footer <url>`.

## Project structure

```
bundles/                      shippable drop-in bundles
  vite.config.ts              lib-mode Vite, reads SITE + BUNDLE env vars
  sites/
    <slug>/                   one folder per cloned site
      src/                    SiteHeader + SiteFooter + mount scripts + styles
      demo/                   host-page smoke tests
      research/               header.spec.md + footer.spec.md
  dist/
    <slug>/                   per-site build output (gitignored)
      header.bundle.js
      footer.bundle.js

src/                          Next.js preview harness
  app/
    page.tsx                  auto-discovers bundles/sites/* and lists each one
    <slug>/page.tsx           renders SiteHeader + SiteFooter for that site
    globals.css               Tailwind v4 that scans bundles/ too

docs/research/
  INSPECTION_GUIDE.md         what to extract from a live site

.cursor/commands/
  clone-header-footer.md      the /clone-header-footer prompt
```

## Commands

At the repo root:

```bash
npm run dev                  # Next.js preview at http://localhost:3000
npm run build                # Next.js production build
npm run typecheck            # TypeScript check
npm run bundles:build        # build the default site
npm run bundles:build:all    # build every site under bundles/sites/
```

Inside `bundles/`:

```bash
npm run build:<slug>         # build one site's header + footer bundles
npm run build:all            # iterate every folder under sites/
npm run dev:<slug>           # Vite dev server rooted in sites/<slug>/demo/
```

Each site's `package.json` script is added the first time you clone that site.

## Use cases

- **Unified branding across multiple properties** — ship the same header/footer onto marketing, docs, status page, app, legacy sites.
- **Legacy site refresh** — drop a modern header/footer onto an old WordPress or custom-stack site without rewriting the body.
- **Platform migration** — preserve a familiar chrome while rebuilding the app underneath.

## Not intended for

- **Phishing or impersonation.** Do not clone a site's header/footer to pretend to be that site.
- **Stripping branding.** The extracted assets (logos, copy) belong to the original owner.
- **Violating terms of service.** Some sites prohibit reuse of their markup or design. Check first.

## Tuning the clone behavior

Everything the agent does is defined by `.cursor/commands/clone-header-footer.md`. Edit that file to adjust extraction rules, the functional-parity checklist, or the spec template. Changes take effect in the next Cursor session.

## License

MIT. Originally forked from [JCodesMore/ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template).
