# Drop-in Header + Footer Bundles

Per-site drop-in bundles of a website's header and footer. Each bundle is a single IIFE `<script>` — React, Tailwind styles, and icons all included — so any host page can mount the extracted components with one script tag.

## Layout

```
bundles/
  sites/
    <slug>/
      src/
        styles.css         Tailwind v4 without preflight + .bw-scope base rules
        types.ts           shared NavGroup / FooterColumn types
        header/
          SiteHeader.tsx   component
          mount.tsx        auto-mount + window.<Slug>Header API
        footer/
          SiteFooter.tsx
          mount.tsx
      demo/
        header.html        blank host page that loads dist/<slug>/header.bundle.js
        footer.html
      research/
        header.spec.md     extracted from the live site
        footer.spec.md
  dist/
    <slug>/
      header.bundle.js     self-contained IIFE, CSS injected at runtime
      footer.bundle.js
```

Add a new site by copying `sites/boardwalktech/` to `sites/<slug>/` and updating nav/footer data. The build config auto-discovers directories under `sites/`.

## Commands

```bash
npm install

npm run build                     # default site (boardwalktech)
npm run build:boardwalktech
npm run build:all                 # iterate every directory under sites/

npm run dev                       # Vite dev server for the default site's demo/
npm run dev:boardwalktech

npm run typecheck
```

Per-site builds set `SITE=<slug>` and build both the header and footer entries.

## Using a bundle on a host site

```html
<div id="boardwalk-header-root"></div>
<!-- host content -->
<div id="boardwalk-footer-root"></div>

<script src="https://your-cdn/boardwalktech/header.bundle.js"></script>
<script src="https://your-cdn/boardwalktech/footer.bundle.js"></script>
```

The bundles auto-mount on load into the default mount ids. Programmatic control:

```js
window.BoardwalkHeader.mount("#custom-slot");
window.BoardwalkHeader.unmount();

window.BoardwalkFooter.mount(document.getElementById("footer-slot"));
window.BoardwalkFooter.unmount();
```

Each bundle exposes `DEFAULT_MOUNT_ID` on its global for reference.

## Functional parity

Every bundle must match these behaviors, not just the look:

- **Desktop nav:** hover opens dropdown; click also toggles (for touch + keyboard). Outside click and Escape close. ARIA attributes set.
- **Mobile drawer:** hamburger toggles; body scroll locked while open; focus returns to hamburger on close; link tap and Escape close.
- **Links:** every `href` is the real live URL; external links open in a new tab with `rel="noopener noreferrer"`.
- **Style isolation:** `styles.css` imports `tailwindcss/theme.css` + `tailwindcss/utilities.css` only. Preflight is NOT included, so the host page's base styles are untouched. All rendering is wrapped in `<div className="bw-scope">`.

## What's inside each bundle

- React 19 + react-dom/client (bundled)
- Tailwind v4 utilities used by the component (injected into `<head>` by `vite-plugin-css-injected-by-js`)
- `lucide-react` icons (tree-shaken to the ones actually used)
- The component + mount script

Typical size: ~210 KB raw, ~65 KB gzipped.

## Local demo

```bash
npm run build:boardwalktech
python3 -m http.server 8765 --directory .
# open http://localhost:8765/sites/boardwalktech/demo/header.html
# open http://localhost:8765/sites/boardwalktech/demo/footer.html
```

Any static server works. The demo HTML files reference the built bundles at `../../../dist/<slug>/`.
