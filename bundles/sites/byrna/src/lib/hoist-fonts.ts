/**
 * Register @font-face rules at the DOCUMENT level.
 *
 * Browsers do NOT honor `@font-face` declared inside a Shadow DOM `<style>`: the
 * font silently fails to load and text falls back to a lighter system face
 * (e.g. "Arial Narrow"), which renders thinner and more condensed than the real
 * brand webfont. To fix this we lift every `@font-face` block out of the
 * compiled CSS and inject it once into `<head>`. Fonts registered at the
 * document level are usable inside any shadow root, so isolation of the rest of
 * the CSS (which stays inside the shadow root) is unaffected.
 */
const MARKER = "data-bw-fonts";

export function hoistFontFaces(css: string): void {
  if (typeof document === "undefined") return;
  if (document.head.querySelector(`style[${MARKER}]`)) return;
  const faces = css.match(/@font-face\s*\{[^}]*\}/g);
  if (!faces || faces.length === 0) return;
  const style = document.createElement("style");
  style.setAttribute(MARKER, "");
  style.textContent = faces.join("\n");
  document.head.appendChild(style);
}
