import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { SiteHeader } from "./SiteHeader";
import styles from "../styles.css?inline";

const DEFAULT_MOUNT_ID = "solventum-header-root";
const STYLE_MARKER = "data-bw-styles";
const CONTAINER_MARKER = "data-bw-container";

type MountTarget = Element | string;

let activeRoot: Root | null = null;

function resolveTarget(target?: MountTarget): Element | null {
  if (target instanceof Element) return target;
  if (typeof target === "string") {
    const el = document.querySelector(target);
    if (el) return el;
  }
  return document.getElementById(DEFAULT_MOUNT_ID);
}

function getOrCreateShadowContainer(target: Element): Element {
  if (!("attachShadow" in target)) return target;

  let shadow: ShadowRoot | null =
    (target as HTMLElement).shadowRoot ?? null;
  if (!shadow) {
    try {
      shadow = (target as HTMLElement).attachShadow({ mode: "open" });
    } catch {
      return target;
    }
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
  return container;
}

function mount(target?: MountTarget): void {
  const el = resolveTarget(target);
  if (!el) {
    console.warn(
      `[SolventumHeader] mount target not found. Pass a selector or Element, or add <div id="${DEFAULT_MOUNT_ID}">.`,
    );
    return;
  }
  if (activeRoot) {
    activeRoot.unmount();
    activeRoot = null;
  }
  activeRoot = createRoot(getOrCreateShadowContainer(el));
  activeRoot.render(
    <StrictMode>
      <SiteHeader />
    </StrictMode>,
  );
}

function unmount(): void {
  activeRoot?.unmount();
  activeRoot = null;
}

const api = { mount, unmount, DEFAULT_MOUNT_ID };

if (typeof window !== "undefined") {
  (window as unknown as { SolventumHeader: typeof api }).SolventumHeader = api;
  const autoTarget = document.getElementById(DEFAULT_MOUNT_ID);
  if (autoTarget) mount(autoTarget);
}

export default api;
export { mount, unmount };
