/**
 * Adobe Typekit @font-face rules used by barings.com.
 *
 * The live site embeds these (kepler-std-display for serif display headings,
 * museo-sans for body/UI text) directly in its stylesheet, pointing at Adobe's
 * CORS-enabled `use.typekit.net/af/...` font binaries. We replicate the exact
 * rules so the clone's text metrics — and therefore wrapping and spacing —
 * match the live site instead of falling back to system fonts.
 *
 * These are injected into the HOST document's <head> (not the shadow root):
 * `@font-face` registered at document level is visible to shadow trees, while
 * `@font-face` declared inside a shadow root is not reliably honored across
 * browsers. Font definitions don't apply any styles on their own, so this does
 * not leak visual styles into the host page.
 */
export const FONT_FACE_CSS = `
@font-face{font-display:auto;font-family:museo-sans;font-style:normal;font-weight:100;src:url("https://use.typekit.net/af/635674/00000000000000000000e800/27/l?fvd=n1&primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&v=3") format("woff2"),url("https://use.typekit.net/af/635674/00000000000000000000e800/27/d?fvd=n1&primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&v=3") format("woff"),url("https://use.typekit.net/af/635674/00000000000000000000e800/27/a?fvd=n1&primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&v=3") format("opentype");}
@font-face{font-display:auto;font-family:museo-sans;font-style:normal;font-weight:300;src:url("https://use.typekit.net/af/620bf8/00000000000000000000e7fe/27/l?fvd=n3&primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&v=3") format("woff2"),url("https://use.typekit.net/af/620bf8/00000000000000000000e7fe/27/d?fvd=n3&primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&v=3") format("woff"),url("https://use.typekit.net/af/620bf8/00000000000000000000e7fe/27/a?fvd=n3&primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&v=3") format("opentype");}
@font-face{font-display:auto;font-family:museo-sans;font-style:normal;font-weight:500;src:url("https://use.typekit.net/af/a28b50/00000000000000000000e803/27/l?fvd=n5&primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&v=3") format("woff2"),url("https://use.typekit.net/af/a28b50/00000000000000000000e803/27/d?fvd=n5&primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&v=3") format("woff"),url("https://use.typekit.net/af/a28b50/00000000000000000000e803/27/a?fvd=n5&primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&v=3") format("opentype");}
@font-face{font-display:auto;font-family:museo-sans;font-style:normal;font-weight:700;src:url("https://use.typekit.net/af/e3ca36/00000000000000000000e805/27/l?fvd=n7&primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&v=3") format("woff2"),url("https://use.typekit.net/af/e3ca36/00000000000000000000e805/27/d?fvd=n7&primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&v=3") format("woff"),url("https://use.typekit.net/af/e3ca36/00000000000000000000e805/27/a?fvd=n7&primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&v=3") format("opentype");}
@font-face{font-display:auto;font-family:museo-sans;font-style:normal;font-weight:900;src:url("https://use.typekit.net/af/9cf49e/00000000000000000000e807/27/l?fvd=n9&primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&v=3") format("woff2"),url("https://use.typekit.net/af/9cf49e/00000000000000000000e807/27/d?fvd=n9&primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&v=3") format("woff"),url("https://use.typekit.net/af/9cf49e/00000000000000000000e807/27/a?fvd=n9&primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&v=3") format("opentype");}
@font-face{font-display:auto;font-family:kepler-std-display;font-style:normal;font-weight:400;src:url("https://use.typekit.net/af/74a78f/00000000000000000001302b/27/l?fvd=n4&primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&v=3") format("woff2"),url("https://use.typekit.net/af/74a78f/00000000000000000001302b/27/d?fvd=n4&primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&v=3") format("woff"),url("https://use.typekit.net/af/74a78f/00000000000000000001302b/27/a?fvd=n4&primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&v=3") format("opentype");}
@font-face{font-display:auto;font-family:kepler-std-display;font-style:normal;font-weight:500;src:url("https://use.typekit.net/af/32a5e0/000000000000000000013029/27/l?fvd=n5&primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&v=3") format("woff2"),url("https://use.typekit.net/af/32a5e0/000000000000000000013029/27/d?fvd=n5&primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&v=3") format("woff"),url("https://use.typekit.net/af/32a5e0/000000000000000000013029/27/a?fvd=n5&primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&v=3") format("opentype");}
@font-face{font-display:auto;font-family:kepler-std-display;font-style:italic;font-weight:400;src:url("https://use.typekit.net/af/86da46/000000000000000000013026/27/l?fvd=i4&primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&v=3") format("woff2"),url("https://use.typekit.net/af/86da46/000000000000000000013026/27/d?fvd=i4&primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&v=3") format("woff"),url("https://use.typekit.net/af/86da46/000000000000000000013026/27/a?fvd=i4&primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&v=3") format("opentype");}
`;

/**
 * Raw-mode-only font wiring for the shadow root.
 *
 * Kept out of the shared `styles.css` so the bundle's stylesheet stays
 * byte-frozen. These unlayered rules override Tailwind's layered utilities:
 * pointing `--font-serif` at Kepler makes the `font-serif` utility (and the
 * arbitrary `[font-family:'kepler-std-display']` on headings) resolve to Kepler,
 * while the base font-family switches body/UI text to Museo Sans — matching the
 * live Adobe Typekit families instead of the system fallbacks.
 */
export const SCOPE_FONT_CSS = `
.bw-scope{
  --font-serif:"kepler-std-display",Georgia,"Times New Roman",serif;
  font-family:"museo-sans","Open Sans",-apple-system,BlinkMacSystemFont,"Helvetica Neue","Segoe UI",Arial,sans-serif;
}
.bw-scope .font-serif{font-family:var(--font-serif);}
`;

/** Inject the font @font-face rules once into the host document <head>. */
export function ensureFonts(): void {
  const ID = "bw-typekit-fonts";
  if (document.getElementById(ID)) return;
  const style = document.createElement("style");
  style.id = ID;
  style.textContent = FONT_FACE_CSS;
  document.head.appendChild(style);
}
