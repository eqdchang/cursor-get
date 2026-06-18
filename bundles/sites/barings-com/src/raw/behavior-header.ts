/**
 * Raw-mode header behavior (no React).
 *
 * The client pastes the editable header markup wrapped in
 * `<div data-bw-raw-header>…</div>` plus a `<script src="header.js">`. This
 * script reads that container's innerHTML (the editable light-DOM source),
 * attaches a Shadow DOM, injects the compiled+inlined CSS, renders the markup
 * inside the shadow root for full style isolation, and wires up all behavior
 * against the `data-bw-*` hooks. Editing text/links in the light-DOM source and
 * reloading re-renders the shadow content.
 *
 * `__BW_STYLES__` is replaced at build time with the compiled, `.bw-scope`-
 * prefixed Tailwind CSS (the same stylesheet the bundle uses).
 */
import { SCOPE_FONT_CSS, ensureFonts } from "./fonts";

declare const __BW_STYLES__: string;

const HOST_SELECTOR = "[data-bw-raw-header]";
const CLOSE_DELAY = 120;

/* Chrome (transparent-over-hero ↔ white) + logo swap. Kept out of the shared
   styles.css so the bundle's stylesheet stays byte-frozen. */
const RAW_CSS = `
[data-bw-header]{background:#fff;color:#002856;}
[data-bw-header] [data-bw-divider]{background-color:currentColor;}
[data-bw-trigger].bw-active{text-shadow:rgb(0,0,0) 0 0 1px;}
@media (min-width:1024px){
  [data-bw-header][data-bw-chrome="transparent"]{background:transparent;color:#fff;}
  [data-bw-header][data-bw-chrome="white"]{background:#fff;color:#002856;}
  [data-bw-header][data-bw-chrome="white"] [data-bw-logo="white"]{display:none;}
  [data-bw-header][data-bw-chrome="white"] [data-bw-logo="navy"]{display:block;}
}
`;

function wire(shadow: ShadowRoot) {
  const $ = <T extends Element = HTMLElement>(sel: string) =>
    shadow.querySelector<T>(sel);
  const $$ = <T extends Element = HTMLElement>(sel: string) =>
    Array.from(shadow.querySelectorAll<T>(sel));

  const header = $("[data-bw-header]");
  const root = $("[data-bw-header-root]");
  const triggers = $$("[data-bw-trigger]") as HTMLElement[];
  const submenus = $$("[data-bw-submenu]") as HTMLElement[];
  const searchPanel = $("[data-bw-search]");
  const locationsPanel = $("[data-bw-locations]");
  const searchInput = $<HTMLInputElement>("[data-bw-search] input");

  let openGroup: number | null = null;
  let locationsOpen = false;
  let searchOpen = false;
  let headerHovered = false;
  let scrolled = false;
  let closeTimer: number | null = null;

  const showWhite = () =>
    scrolled || headerHovered || openGroup !== null || locationsOpen || searchOpen;

  function applyChrome() {
    if (header) header.setAttribute("data-bw-chrome", showWhite() ? "white" : "transparent");
  }

  function render() {
    submenus.forEach((el) => {
      const idx = Number(el.getAttribute("data-bw-submenu"));
      el.hidden = !(openGroup === idx && !locationsOpen && !searchOpen);
    });
    triggers.forEach((el) => {
      const idx = Number(el.getAttribute("data-bw-trigger"));
      const active = openGroup === idx && !locationsOpen && !searchOpen;
      el.setAttribute("aria-expanded", active ? "true" : "false");
      el.classList.toggle("bw-active", active);
    });
    if (searchPanel) searchPanel.hidden = !searchOpen;
    if (locationsPanel) locationsPanel.hidden = !locationsOpen;
    applyChrome();
  }

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
      render();
    }, CLOSE_DELAY);
  }

  triggers.forEach((el) => {
    const idx = Number(el.getAttribute("data-bw-trigger"));
    const open = () => {
      cancelClose();
      locationsOpen = false;
      searchOpen = false;
      openGroup = idx;
      render();
    };
    el.addEventListener("mouseenter", open);
    el.addEventListener("focus", open);
  });

  submenus.forEach((el) => {
    el.addEventListener("mouseenter", cancelClose);
    el.addEventListener("mouseleave", scheduleClose);
  });

  if (header) {
    header.addEventListener("mouseenter", () => {
      cancelClose();
      headerHovered = true;
      applyChrome();
    });
    header.addEventListener("mouseleave", () => {
      headerHovered = false;
      scheduleClose();
      applyChrome();
    });
  }

  /* Sidebar option switching within each submenu. */
  $$("[data-bw-subtab]").forEach((tab) => {
    const key = tab.getAttribute("data-bw-subtab")!;
    const [g] = key.split(":");
    const activate = () => {
      $$(`[data-bw-subtab^="${g}:"]`).forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.classList.toggle("[text-shadow:rgb(0,0,0)_0_0_1px]", on);
      });
      $$(`[data-bw-subpanel^="${g}:"]`).forEach((p) => {
        (p as HTMLElement).hidden = p.getAttribute("data-bw-subpanel") !== key;
      });
    };
    tab.addEventListener("mouseenter", activate);
    tab.addEventListener("focus", activate);
  });

  /* Search + Locations toggles. */
  $$('[data-bw-action="search"]').forEach((btn) =>
    btn.addEventListener("click", () => {
      openGroup = null;
      locationsOpen = false;
      searchOpen = !searchOpen;
      render();
      if (searchOpen) searchInput?.focus();
    }),
  );
  $('[data-bw-action="search-close"]')?.addEventListener("click", () => {
    searchOpen = false;
    render();
  });
  $$('[data-bw-action="locations"]').forEach((btn) =>
    btn.addEventListener("click", () => {
      openGroup = null;
      searchOpen = false;
      locationsOpen = !locationsOpen;
      render();
    }),
  );

  /* Close on outside click (shadow-aware) + Escape. */
  document.addEventListener("mousedown", (e) => {
    if (!root) return;
    const path = typeof e.composedPath === "function" ? e.composedPath() : [];
    const inside = path.length ? path.includes(root) : root.contains(e.target as Node);
    if (!inside) {
      openGroup = null;
      locationsOpen = false;
      searchOpen = false;
      render();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    openGroup = null;
    locationsOpen = false;
    searchOpen = false;
    render();
    closeDrawer();
  });

  /* Scroll chrome. */
  const onScroll = () => {
    scrolled = window.scrollY > 8;
    applyChrome();
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile drawer ---- */
  const drawer = $("[data-bw-drawer]");
  const backBtn = $('[data-bw-action="mobile-back"]');
  const backSpacer = $("[data-bw-mback-spacer]");
  const rootPanel = $('[data-bw-mpanel="root"]');
  const groupPanels = $$("[data-bw-mpanel]").filter(
    (el) => el.getAttribute("data-bw-mpanel") !== "root",
  ) as HTMLElement[];

  function showMobileRoot() {
    if (rootPanel) (rootPanel as HTMLElement).hidden = false;
    groupPanels.forEach((p) => (p.hidden = true));
    if (backBtn) (backBtn as HTMLElement).hidden = true;
    if (backSpacer) (backSpacer as HTMLElement).hidden = false;
  }
  function showMobileGroup(idx: number) {
    if (rootPanel) (rootPanel as HTMLElement).hidden = true;
    groupPanels.forEach((p) => {
      p.hidden = p.getAttribute("data-bw-mpanel") !== String(idx);
    });
    if (backBtn) (backBtn as HTMLElement).hidden = false;
    if (backSpacer) (backSpacer as HTMLElement).hidden = true;
  }
  function openDrawer() {
    if (!drawer) return;
    drawer.hidden = false;
    document.body.style.overflow = "hidden";
    showMobileRoot();
  }
  function closeDrawer() {
    if (!drawer || drawer.hidden) return;
    drawer.hidden = true;
    document.body.style.overflow = "";
    showMobileRoot();
  }

  $('[data-bw-action="mobile-open"]')?.addEventListener("click", openDrawer);
  $$('[data-bw-action="mobile-close"]').forEach((b) =>
    b.addEventListener("click", closeDrawer),
  );
  backBtn?.addEventListener("click", showMobileRoot);

  $$("[data-bw-mgroup]").forEach((btn) =>
    btn.addEventListener("click", () =>
      showMobileGroup(Number(btn.getAttribute("data-bw-mgroup"))),
    ),
  );

  $$("[data-bw-mopt]").forEach((btn) => {
    const key = btn.getAttribute("data-bw-mopt")!;
    const [g] = key.split(":");
    btn.addEventListener("click", () => {
      const content = $(`[data-bw-mcontent="${key}"]`) as HTMLElement | null;
      const willOpen = content ? content.hidden : false;
      $$(`[data-bw-mcontent^="${g}:"]`).forEach(
        (c) => ((c as HTMLElement).hidden = true),
      );
      $$(`[data-bw-mopt^="${g}:"]`).forEach((b) => {
        b.setAttribute("aria-expanded", "false");
        b.querySelector(".bw-mchevron")?.classList.remove("rotate-180");
      });
      if (content && willOpen) {
        content.hidden = false;
        btn.setAttribute("aria-expanded", "true");
        btn.querySelector(".bw-mchevron")?.classList.add("rotate-180");
      }
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
  ensureFonts();
  const markup = host.innerHTML;
  const shadow = host.attachShadow({ mode: "open" });
  const style = document.createElement("style");
  style.textContent = __BW_STYLES__ + RAW_CSS + SCOPE_FONT_CSS;
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
