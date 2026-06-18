/**
 * Raw-mode footer behavior (no React).
 *
 * The footer has no interactive state, but it still gets Shadow DOM isolation:
 * the client pastes the editable markup wrapped in `<div data-bw-raw-footer>`
 * plus `<script src="footer.js">`. This reads the light-DOM source, attaches a
 * shadow root, injects the compiled+inlined CSS, and renders the markup inside.
 *
 * `__BW_STYLES__` is replaced at build time with the compiled, `.bw-scope`-
 * prefixed Tailwind CSS.
 */
import { hoistFontFaces } from "../lib/hoist-fonts";

declare const __BW_STYLES__: string;

const HOST_SELECTOR = "[data-bw-raw-footer]";

function init() {
  const host = document.querySelector<HTMLElement>(HOST_SELECTOR);
  if (!host || host.shadowRoot) return;
  const markup = host.innerHTML;
  hoistFontFaces(__BW_STYLES__);
  const shadow = host.attachShadow({ mode: "open" });
  const style = document.createElement("style");
  style.textContent = __BW_STYLES__;
  shadow.appendChild(style);
  const container = document.createElement("div");
  container.innerHTML = markup;
  shadow.appendChild(container);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

export {};
