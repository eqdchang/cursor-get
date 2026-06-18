/**
 * Raw-mode header behavior (no React).
 *
 * The client pastes the editable header markup wrapped in
 * `<div data-bw-raw-header>…</div>` plus `<script src="header.js">`. This script
 * reads that container's innerHTML (the editable light-DOM source), attaches a
 * Shadow DOM, injects the compiled+inlined CSS, renders the markup inside the
 * shadow root for full style isolation, and wires up all behavior against the
 * `data-bw-*` hooks. Editing text/links in the light-DOM source and reloading
 * re-renders the shadow content.
 *
 * `__BW_STYLES__` is replaced at build time with the compiled, `.bw-scope`-
 * prefixed Tailwind CSS — the same stylesheet the bundle uses.
 */
import { hoistFontFaces } from "../lib/hoist-fonts";

declare const __BW_STYLES__: string;

const HOST_SELECTOR = "[data-bw-raw-header]";
const CLOSE_DELAY = 120;

function wire(shadow: ShadowRoot) {
  const $ = <T extends Element = HTMLElement>(sel: string) =>
    shadow.querySelector<T>(sel);
  const $$ = <T extends Element = HTMLElement>(sel: string) =>
    Array.from(shadow.querySelectorAll<T>(sel));

  const root = $("[data-bw-header-root]");
  const header = $("[data-bw-header]");
  const triggers = $$("[data-bw-trigger]") as HTMLElement[];
  const submenus = $$("[data-bw-submenu]") as HTMLElement[];

  let openGroup: number | null = null;
  let openMode: "hover" | "click" | null = null;
  let closeTimer: number | null = null;

  function cancelClose() {
    if (closeTimer !== null) {
      window.clearTimeout(closeTimer);
      closeTimer = null;
    }
  }
  function scheduleClose() {
    cancelClose();
    closeTimer = window.setTimeout(() => {
      openGroup = null;
      openMode = null;
      render();
    }, CLOSE_DELAY);
  }

  function render() {
    submenus.forEach((el) => {
      const idx = Number(el.getAttribute("data-bw-submenu"));
      el.hidden = openGroup !== idx;
    });
    triggers.forEach((el) => {
      const idx = Number(el.getAttribute("data-bw-trigger"));
      const active = openGroup === idx;
      el.setAttribute("aria-expanded", active ? "true" : "false");
      el.querySelector(".bw-chevron")?.classList.toggle("rotate-180", active);
    });
  }

  triggers.forEach((el) => {
    const idx = Number(el.getAttribute("data-bw-trigger"));
    el.addEventListener("mouseenter", () => {
      cancelClose();
      openGroup = idx;
      openMode = "hover";
      render();
    });
    el.addEventListener("focus", () => {
      cancelClose();
      openGroup = idx;
      openMode = "hover";
      render();
    });
    el.addEventListener("click", () => {
      if (openGroup === idx && openMode === "click") {
        openGroup = null;
        openMode = null;
      } else {
        openGroup = idx;
        openMode = "click";
      }
      render();
    });
  });

  if (header) {
    header.addEventListener("mouseenter", cancelClose);
    header.addEventListener("mouseleave", () => {
      if (openMode === "hover") scheduleClose();
    });
  }

  /* Outside click (shadow-aware) + Escape. */
  document.addEventListener("mousedown", (e) => {
    if (!root) return;
    const path = typeof e.composedPath === "function" ? e.composedPath() : [];
    const inside = path.length
      ? path.includes(root)
      : root.contains(e.target as Node);
    if (!inside) {
      openGroup = null;
      openMode = null;
      render();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    openGroup = null;
    openMode = null;
    render();
    closeDrawer();
  });

  /* ---- Mobile drawer ---- */
  const drawer = $("[data-bw-drawer]");
  const openBtn = $('[data-bw-action="mobile-open"]');

  function openDrawer() {
    if (!drawer) return;
    drawer.hidden = false;
    document.body.style.overflow = "hidden";
    openBtn?.setAttribute("aria-expanded", "true");
  }
  function closeDrawer() {
    if (!drawer || drawer.hidden) return;
    drawer.hidden = true;
    document.body.style.overflow = "";
    openBtn?.setAttribute("aria-expanded", "false");
    openBtn?.focus();
  }

  openBtn?.addEventListener("click", openDrawer);
  $$('[data-bw-action="mobile-close"]').forEach((b) =>
    b.addEventListener("click", closeDrawer),
  );

  /* Mobile accordion — level 1 (top groups). Toggles text colour + chevron. */
  $$("[data-bw-mgroup]").forEach((btn) => {
    const idx = btn.getAttribute("data-bw-mgroup");
    btn.addEventListener("click", () => {
      const panel = $(`[data-bw-mpanel="${idx}"]`) as HTMLElement | null;
      if (!panel) return;
      const willOpen = panel.hidden;
      panel.hidden = !willOpen;
      btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
      btn.classList.toggle("text-[#ff671d]", willOpen);
      btn.classList.toggle("text-white", !willOpen);
      btn.querySelector(".bw-mchevron")?.classList.toggle("rotate-180", willOpen);
    });
  });

  /* Mobile accordion — level 2 (column sub-groups inside an open group). */
  $$("[data-bw-msub]").forEach((btn) => {
    const key = btn.getAttribute("data-bw-msub");
    btn.addEventListener("click", () => {
      const panel = $(`[data-bw-msubpanel="${key}"]`) as HTMLElement | null;
      if (!panel) return;
      const willOpen = panel.hidden;
      panel.hidden = !willOpen;
      btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
      btn.classList.toggle("text-[#ff671d]", willOpen);
      btn.classList.toggle("text-white", !willOpen);
      btn.querySelector(".bw-msubchevron")?.classList.toggle("rotate-180", willOpen);
    });
  });

  /* Tapping any link closes the drawer. */
  drawer
    ?.querySelectorAll("[data-bw-link], a[href]")
    .forEach((a) => a.addEventListener("click", closeDrawer));

  render();
}

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
  wire(shadow);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

export {};
