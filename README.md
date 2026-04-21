# Header + Footer Drop-in Bundler

Extract any site's header and footer as self-contained JavaScript bundles you can drop into another site with a single `<script>` tag. Each bundle includes its own React, styles, and icons — the host page needs nothing else.

Point it at a URL, run `/clone-header-footer` inside Cursor with a browser MCP attached, and the agent will extract the header and footer (DOM, computed styles, every link, dropdown contents, mobile drawer) and produce two built bundles in `bundles/dist/<slug>/`.

Functional parity is non-negotiable: hover AND click open dropdowns, mobile drawer locks body scroll and restores focus on close, ARIA is correct, every link points at the real live URL, and Tailwind's preflight is stripped so the bundle does not restyle the host page.

## Quick start

```bash
git clone <this-repo> my-clones
cd my-clones

# Install the Next.js preview harness
npm install

# Install and build the reference bundles (boardwalktech.com)
cd bundles
npm install
npm run build:boardwalktech
cd ..

# Preview the extracted components locally
npm run dev   # http://localhost:3000
```

The reference build produces:

```
bundles/dist/boardwalktech/
  header.bundle.js   ~210 KB (65 KB gzipped)
  footer.bundle.js   ~208 KB (65 KB gzipped)
```

## Cloning a new site

Start a Cursor CLI session in this repo and run:

```
/clone-header-footer https://example.com/
```

The agent will:

1. Derive a site slug from the hostname (e.g. `example-com`).
2. Scaffold `bundles/sites/<slug>/{src,demo,research}/`.
3. Extract the header (logo, nav items, dropdowns, mobile drawer, every `href`) and the footer (columns, links, copyright, legal).
4. Write `research/header.spec.md` + `research/footer.spec.md`.
5. Generate TypeScript using the `boardwalktech` site as a template.
6. Build `bundles/dist/<slug>/{header,footer}.bundle.js`.
7. Run a functional-parity smoke test in the browser MCP against the site's `demo/` folder.

One site per commit.

## Using a built bundle on a host site

Drop into any HTML page:

```html
<!-- Where the header should render -->
<div id="boardwalk-header-root"></div>

<!-- Everything else on the page -->
<main>...</main>

<!-- Where the footer should render -->
<div id="boardwalk-footer-root"></div>

<!-- One script tag each, anywhere -->
<script src="/path/to/header.bundle.js"></script>
<script src="/path/to/footer.bundle.js"></script>
```

The bundles auto-mount on load. Programmatic control too:

```js
window.BoardwalkHeader.mount("#some-other-slot");
window.BoardwalkHeader.unmount();

window.BoardwalkFooter.mount(document.getElementById("footer-slot"));
window.BoardwalkFooter.unmount();
```

The global name follows the pattern `<SlugPascalCase>Header` / `<SlugPascalCase>Footer` for any new site.

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
    boardwalktech/            example reference site
      src/                    SiteHeader + SiteFooter + mount scripts + styles
      demo/                   host-page smoke tests
      research/               header.spec.md + footer.spec.md
  dist/
    <slug>/                   per-site build output (gitignored)
      header.bundle.js
      footer.bundle.js

src/                          Next.js preview harness
  app/
    page.tsx                  renders SiteHeader + SiteFooter from bundles/sites/boardwalktech
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
npm run build:boardwalktech  # or build:<slug> for any site
npm run build:all            # iterate sites/
npm run dev:boardwalktech    # Vite dev server rooted in sites/<slug>/demo/
```

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
