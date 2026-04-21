import { StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import "../styles.css";
import { SiteHeader } from "./SiteHeader";

const DEFAULT_MOUNT_ID = "byrna-header-root";

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
      `[ByrnaHeader] mount target not found. Pass a selector or Element, or add <div id="${DEFAULT_MOUNT_ID}">.`,
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
  (window as unknown as { ByrnaHeader: typeof api }).ByrnaHeader = api;
  const autoTarget = document.getElementById(DEFAULT_MOUNT_ID);
  if (autoTarget) mount(autoTarget);
}

export default api;
export { mount, unmount };
