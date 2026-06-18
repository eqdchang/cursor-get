#!/usr/bin/env node
/**
 * Raw-mode build for a single site.
 *
 * Produces an editable, copy-paste artifact set under dist/<site>/ WITHOUT
 * touching the frozen bundle (header.bundle.js / footer.bundle.js):
 *
 *   header.html   editable fragment (wrapped in <div data-bw-raw-header>)
 *   footer.html   editable fragment (wrapped in <div data-bw-raw-footer>)
 *   styles.css    compiled, .bw-scope-prefixed Tailwind CSS (reference copy)
 *   header.js     vanilla behavior; Shadow-DOM-adopts the fragment + inlines CSS
 *   footer.js     vanilla; Shadow-DOM-adopts the footer fragment + inlines CSS
 *   raw-demo.html local smoke-test page (hero + header + content + footer)
 *
 * Pipeline:
 *   1. Compile CSS through the SAME vite + tailwind + postcss-prefix pipeline the
 *      bundle uses (via a temp `?inline` entry), so the raw CSS == bundle CSS.
 *   2. Render the static header + footer to HTML with renderToStaticMarkup.
 *   3. Bundle the vanilla behavior to IIFE, inlining the compiled CSS via define.
 */
import { build as viteBuild } from "vite";
import { build as esbuild } from "esbuild";
import tailwindcss from "@tailwindcss/vite";
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const bundlesRoot = resolve(__dirname, "..");
const site = (process.env.SITE ?? "barings-com").trim();
const siteRoot = resolve(bundlesRoot, "sites", site);
const srcRoot = resolve(siteRoot, "src");
const rawSrc = resolve(srcRoot, "raw");
const outDir = resolve(bundlesRoot, "dist", site);
const tmpDir = resolve(outDir, ".raw-tmp");

mkdirSync(outDir, { recursive: true });
mkdirSync(tmpDir, { recursive: true });

/* 1. Compile CSS (same pipeline as the bundle). */
const cssEntry = resolve(rawSrc, "__css-extract.ts");
writeFileSync(cssEntry, 'import s from "../styles.css?inline";\nexport default s;\n');
let css = "";
try {
  await viteBuild({
    root: bundlesRoot,
    configFile: false,
    logLevel: "error",
    plugins: [tailwindcss()],
    build: {
      lib: { entry: cssEntry, formats: ["es"], fileName: () => "css.mjs" },
      outDir: tmpDir,
      emptyOutDir: false,
      minify: false,
      sourcemap: false,
    },
  });
  const mod = await import(pathToFileURL(resolve(tmpDir, "css.mjs")).href);
  css = mod.default;
} finally {
  rmSync(cssEntry, { force: true });
}
writeFileSync(resolve(outDir, "styles.css"), css);

/* 2. Render static HTML. CJS output so react-dom/server can require() node
   builtins (util/stream) natively. */
const renderEntry = resolve(tmpDir, "render.cjs");
await esbuild({
  entryPoints: [resolve(rawSrc, "render.tsx")],
  bundle: true,
  format: "cjs",
  platform: "node",
  jsx: "automatic",
  outfile: renderEntry,
  logLevel: "error",
});
const rendered = JSON.parse(
  execFileSync(process.execPath, [renderEntry], { encoding: "utf8" }),
);
/* React 19 hoists <link rel="preload" as="image"> resource hints into the
   static markup. Strip them so the editable fragment stays clean. */
const stripPreload = (s) =>
  s.replace(/<link\b[^>]*\brel="preload"[^>]*>/g, "");
const headerHtml = `<div data-bw-raw-header>\n${stripPreload(rendered.header)}\n</div>\n`;
const footerHtml = `<div data-bw-raw-footer>\n${stripPreload(rendered.footer)}\n</div>\n`;
writeFileSync(resolve(outDir, "header.html"), headerHtml);
writeFileSync(resolve(outDir, "footer.html"), footerHtml);

/* 3. Bundle vanilla behavior, inlining the compiled CSS. */
async function buildBehavior(entry, outfile) {
  await esbuild({
    entryPoints: [entry],
    bundle: true,
    format: "iife",
    platform: "browser",
    minify: true,
    define: { __BW_STYLES__: JSON.stringify(css) },
    outfile,
    logLevel: "error",
  });
}
await buildBehavior(resolve(rawSrc, "behavior-header.ts"), resolve(outDir, "header.js"));
await buildBehavior(resolve(rawSrc, "behavior-footer.ts"), resolve(outDir, "footer.js"));

/* Demo / smoke-test page. */
const demo = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${site} — raw drop-in demo</title>
    <style>
      :root { color-scheme: light; }
      body { margin: 0; font-family: Georgia, "Times New Roman", serif; color: #222; }
      /* A dark hero so the transparent-over-hero header chrome is visible. */
      .hero { height: 520px; background: linear-gradient(135deg, #002856, #00953b); }
      .content { max-width: 720px; margin: 48px auto; padding: 0 24px; line-height: 1.7; }
      .content h1 { font-size: 28px; }
      a.host-link { color: crimson; }
    </style>
  </head>
  <body>
    <!-- Editable header fragment (paste into the site header file). -->
    ${headerHtml}

    <section class="hero"></section>
    <main class="content">
      <h1>Host page content</h1>
      <p>
        These host styles (serif font, crimson <a class="host-link" href="#">links</a>)
        must NOT bleed into the header/footer, and the header/footer styles must
        NOT leak out here. Both are rendered inside a Shadow DOM by the scripts.
      </p>
      <p>Scroll up/down to see the header chrome flip between transparent and white.</p>
    </main>

    <!-- Editable footer fragment. -->
    ${footerHtml}

    <script src="./header.js"></script>
    <script src="./footer.js"></script>
  </body>
</html>
`;
writeFileSync(resolve(outDir, "raw-demo.html"), demo);

rmSync(tmpDir, { recursive: true, force: true });

console.log(`raw build complete → dist/${site}/`);
console.log("  header.html, footer.html, styles.css, header.js, footer.js, raw-demo.html");
