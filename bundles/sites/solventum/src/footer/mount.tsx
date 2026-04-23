import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import "../styles.css";
import { SiteFooter } from "./SiteFooter";

const DEFAULT_MOUNT_ID = "solventum-footer-root";

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

function mount(target?: MountTarget): void {
  const el = resolveTarget(target);
  if (!el) {
    console.warn(
      `[SolventumFooter] mount target not found. Pass a selector or Element, or add <div id="${DEFAULT_MOUNT_ID}">.`,
    );
    return;
  }
  if (activeRoot) {
    activeRoot.unmount();
    activeRoot = null;
  }
  activeRoot = createRoot(el);
  activeRoot.render(
    <StrictMode>
      <SiteFooter />
    </StrictMode>,
  );
}

function unmount(): void {
  activeRoot?.unmount();
  activeRoot = null;
}

const api = { mount, unmount, DEFAULT_MOUNT_ID };

if (typeof window !== "undefined") {
  (window as unknown as { SolventumFooter: typeof api }).SolventumFooter = api;
  const autoTarget = document.getElementById(DEFAULT_MOUNT_ID);
  if (autoTarget) mount(autoTarget);
}

export default api;
export { mount, unmount };
