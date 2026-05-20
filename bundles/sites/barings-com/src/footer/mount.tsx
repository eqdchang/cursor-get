import { createRoot, type Root } from "react-dom/client";
import { StrictMode } from "react";
import { SiteFooter } from "./SiteFooter";
import styles from "../styles.css?inline";

const DEFAULT_MOUNT_ID = "barings-footer-root";
const STYLE_MARKER = "data-bw-styles";
const CONTAINER_MARKER = "data-bw-container";

const roots = new WeakMap<Element, Root>();

function getOrCreateShadow(target: Element): {
  shadow: ShadowRoot | null;
  container: Element;
} {
  if (!("attachShadow" in target)) {
    return { shadow: null, container: target };
  }

  let shadow: ShadowRoot | null = (target as HTMLElement).shadowRoot ?? null;
  if (!shadow) {
    try {
      shadow = (target as HTMLElement).attachShadow({ mode: "open" });
    } catch {
      shadow = null;
    }
  }

  if (!shadow) {
    return { shadow: null, container: target };
  }

  if (!shadow.querySelector(`style[${STYLE_MARKER}]`)) {
    const styleEl = document.createElement("style");
    styleEl.setAttribute(STYLE_MARKER, "");
    styleEl.textContent = styles;
    shadow.appendChild(styleEl);
  }

  let container = shadow.querySelector(
    `[${CONTAINER_MARKER}]`,
  ) as HTMLElement | null;
  if (!container) {
    container = document.createElement("div");
    container.setAttribute(CONTAINER_MARKER, "");
    shadow.appendChild(container);
  }

  return { shadow, container };
}

function mount(target: Element) {
  if (roots.has(target)) return;
  const { container } = getOrCreateShadow(target);
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <SiteFooter />
    </StrictMode>,
  );
  roots.set(target, root);
}

function unmount(target: Element) {
  const root = roots.get(target);
  if (!root) return;
  root.unmount();
  roots.delete(target);
}

const api = { mount, unmount };

if (typeof window !== "undefined") {
  (window as unknown as { BaringsComFooter: typeof api }).BaringsComFooter = api;
  const autoTarget = document.getElementById(DEFAULT_MOUNT_ID);
  if (autoTarget) mount(autoTarget);
}

export default api;
