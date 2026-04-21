import { useEffect, useId, useRef, useState } from "react";
import {
  ChevronDown,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import type { NavGroup } from "../types";

const SITE_BASE = "https://byrna.com";
const LOGO_SRC =
  "https://byrna.com/cdn/shop/files/Byrna-Logo_400x.jpg?v=1688423395";

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Products",
    href: `${SITE_BASE}/collections/all-byrna-products`,
    subgroups: [
      {
        heading: "Less-Lethal Pistols",
        href: `${SITE_BASE}/collections/byrna-non-lethal-guns`,
        items: [
          {
            label: "Byrna CL-XL",
            href: `${SITE_BASE}/products/byrna-clxl-launcher-universal-kit`,
          },
          {
            label: "Byrna CL",
            href: `${SITE_BASE}/products/byrna-compact-launcher-universal-kit`,
          },
          {
            label: "Byrna SD",
            href: `${SITE_BASE}/products/byrna-sd-non-lethal-self-defense-pistol`,
          },
          {
            label: "Byrna LE",
            href: `${SITE_BASE}/products/le-kit`,
          },
        ],
      },
      {
        heading: "Less-Lethal Rifles",
        href: `${SITE_BASE}/collections/less-lethal-self-defense-rifles`,
        items: [
          {
            label: "Byrna Mission 4",
            href: `${SITE_BASE}/products/mission-4-kit`,
          },
          {
            label: "Byrna TCR",
            href: `${SITE_BASE}/products/byrna-tcr`,
          },
        ],
      },
      {
        heading: "Ammo & CO2",
        items: [
          {
            label: ".61 Caliber CL Ammo",
            href: `${SITE_BASE}/collections/61-projectiles`,
          },
          {
            label: ".68 Caliber Ammo",
            href: `${SITE_BASE}/collections/ammo-and-projectiles`,
          },
          {
            label: "CO2",
            href: `${SITE_BASE}/collections/byrna-co2`,
          },
        ],
      },
      {
        heading: "Accessories / Apparel",
        href: `${SITE_BASE}/collections/accessories`,
        items: [
          {
            label: "CL-XL Accessories",
            href: `${SITE_BASE}/collections/byrna-clxl-accessories`,
          },
          {
            label: "CL Accessories",
            href: `${SITE_BASE}/collections/byrna-compact-launcher-accessories`,
          },
          {
            label: "SD/EP Accessories",
            href: `${SITE_BASE}/collections/sd-launcher-accessories`,
          },
          {
            label: "LE/SDXL Accessories",
            href: `${SITE_BASE}/collections/hd-xl-launcher-accessories`,
          },
          {
            label: "TCR Accessories",
            href: `${SITE_BASE}/collections/byrna-tcr-accessories`,
          },
          {
            label: "Mission 4 Accessories",
            href: `${SITE_BASE}/collections/byrna-mission-4-accessories`,
          },
          {
            label: "Apparel",
            href: `${SITE_BASE}/collections/apparel`,
          },
        ],
      },
    ],
    items: [
      {
        label: "Byrna Duo",
        href: `${SITE_BASE}/products/byrna-duo`,
      },
      {
        label: "Defense Sprays",
        href: `${SITE_BASE}/collections/bgr-max-pepper-spray`,
      },
      {
        label: "Less-Lethal 12 Gauge Round",
        href: `${SITE_BASE}/products/less-lethal-12-gauge-round-10ct`,
      },
      {
        label: "Banshee Safety Alarm",
        href: `${SITE_BASE}/products/byrna-banshee-personal-safety-alarm`,
      },
      {
        label: "Backpack Body Armor",
        href: `${SITE_BASE}/collections/backpack-body-armor`,
      },
      {
        label: "ByrnaCare",
        href: `${SITE_BASE}/collections/byrnacare`,
      },
      {
        label: "Clearance",
        href: `${SITE_BASE}/collections/clearance`,
      },
    ],
  },
  {
    label: "Find a Store",
    href: `${SITE_BASE}/pages/dealer-locator`,
  },
  {
    label: "About Byrna",
    href: `${SITE_BASE}/pages/about`,
    items: [
      { label: "Byrna's Mission", href: `${SITE_BASE}/pages/about` },
      {
        label: "Byrna's Technology",
        href: `${SITE_BASE}/pages/byrna-technology`,
      },
      {
        label: "Product Catalog",
        href: `${SITE_BASE}/pages/2026-product-catalog`,
      },
      { label: "Media", href: `${SITE_BASE}/blogs/media` },
      { label: "FAQ's", href: `${SITE_BASE}/pages/faq` },
    ],
    subgroups: [
      {
        heading: "Free Speech Saves Lives",
        href: `${SITE_BASE}/pages/stop-censoring-byrna`,
        items: [
          {
            label: "Big Tech Censors Byrna",
            href: `${SITE_BASE}/pages/stop-censoring-byrna`,
          },
          {
            label: "Big Tech Censors Gun Control Discussions",
            href: `${SITE_BASE}/pages/big-tech-is-censoring-discussion-of-how-to-reduce-gun-violence-in-america`,
          },
        ],
      },
    ],
  },
  {
    label: "Reviews/Stories",
    href: `${SITE_BASE}/pages/reviews`,
    items: [
      { label: "Reviews", href: `${SITE_BASE}/pages/reviews` },
      { label: "Blogs", href: `${SITE_BASE}/blogs/byrna-nation` },
      { label: "Byrna Tips", href: `${SITE_BASE}/blogs/learn` },
    ],
  },
  {
    label: "Contact Us",
    href: `${SITE_BASE}/pages/contact-us`,
    items: [
      {
        label: "Become a Dealer",
        href: `${SITE_BASE}/pages/dealer-sales-inquiries`,
      },
      { label: "Customer Service", href: `${SITE_BASE}/pages/contact-us` },
      {
        label: "Warranty Registration",
        href: "https://care.byrna.com/register",
        external: true,
      },
      {
        label: "Service and Returns",
        href: "https://care.byrna.com/rma",
        external: true,
      },
      { label: "Order Status", href: `${SITE_BASE}/pages/order-status` },
      {
        label: "Investors",
        href: "https://ir.byrna.com/",
        external: true,
      },
      {
        label: "Media Inquiries",
        href: `${SITE_BASE}/pages/media-inquiries`,
      },
    ],
  },
];

function hasDropdown(group: NavGroup): boolean {
  return (
    (group.items && group.items.length > 0) ||
    (group.subgroups && group.subgroups.length > 0) ||
    false
  );
}

type OpenMode = "hover" | "click";

export function SiteHeader() {
  const reactId = useId();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [openMode, setOpenMode] = useState<OpenMode | null>(null);
  const [expandedSubgroups, setExpandedSubgroups] = useState<Set<string>>(
    new Set(),
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<Set<string>>(new Set());
  const rootRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (openGroup === null) return;
    function handlePointer(event: MouseEvent) {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenGroup(null);
        setOpenMode(null);
      }
    }
    document.addEventListener("mousedown", handlePointer);
    return () => document.removeEventListener("mousedown", handlePointer);
  }, [openGroup]);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpenGroup(null);
      setOpenMode(null);
      setMobileOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const firstFocusable = drawerRef.current?.querySelector<HTMLElement>(
      "a, button",
    );
    firstFocusable?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      hamburgerRef.current?.focus();
    };
  }, [mobileOpen]);

  function handleGroupEnter(label: string) {
    if (openGroup === label) return;
    setOpenGroup(label);
    setOpenMode("hover");
  }

  function handleGroupLeave(label: string) {
    if (openGroup !== label) return;
    if (openMode === "click") return;
    setOpenGroup(null);
    setOpenMode(null);
  }

  function toggleGroup(label: string) {
    const wasOpenByClick = openGroup === label && openMode === "click";
    if (wasOpenByClick) {
      setOpenGroup(null);
      setOpenMode(null);
    } else {
      setOpenGroup(label);
      setOpenMode("click");
    }
  }

  function closeEverything() {
    setOpenGroup(null);
    setOpenMode(null);
    setExpandedSubgroups(new Set());
    setMobileOpen(false);
  }

  function toggleSubgroup(key: string) {
    setExpandedSubgroups((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function toggleMobileGroup(label: string) {
    setMobileExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }

  const drawerId = `byrna-mobile-drawer-${reactId}`;

  return (
    <div ref={rootRef} className="bw-scope">
      <header className="sticky top-0 left-0 right-0 bg-white z-50 border-b border-[#020122] shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a
              href={`${SITE_BASE}/`}
              className="flex items-center shrink-0"
              aria-label="Byrna home"
            >
              <img
                src={LOGO_SRC}
                alt="Byrna"
                className="h-12 w-auto"
                width={124}
                height={48}
              />
            </a>

            <nav
              ref={navRef}
              aria-label="Primary"
              className="hidden lg:flex items-center gap-0"
            >
              {NAV_GROUPS.map((group) => {
                const isOpen = openGroup === group.label;
                const menuId = `byrna-menu-${reactId}-${group.label}`;
                const dropdown = hasDropdown(group);
                if (!dropdown) {
                  return (
                    <a
                      key={group.label}
                      href={group.href}
                      target={group.external ? "_blank" : undefined}
                      rel={group.external ? "noopener noreferrer" : undefined}
                      className="px-4 py-3 text-sm font-bold uppercase tracking-wide text-[#020122] hover:text-[#ff671d] transition-colors whitespace-nowrap"
                    >
                      {group.label}
                    </a>
                  );
                }
                return (
                  <div
                    key={group.label}
                    className="relative"
                    onMouseEnter={() => handleGroupEnter(group.label)}
                    onMouseLeave={() => handleGroupLeave(group.label)}
                  >
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={isOpen}
                      aria-controls={menuId}
                      onClick={() => toggleGroup(group.label)}
                      className="flex items-center gap-1 px-4 py-3 text-sm font-bold uppercase tracking-wide text-[#020122] hover:text-[#ff671d] transition-colors whitespace-nowrap"
                    >
                      {group.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen ? (
                      <div
                        id={menuId}
                        role="menu"
                        aria-label={group.label}
                        className="absolute top-full left-0 w-[268px] mt-0 bg-white shadow-xl z-50 py-2"
                      >
                        {group.subgroups?.map((sg) => {
                          const sgKey = `${group.label}::${sg.heading}`;
                          const sgOpen = expandedSubgroups.has(sgKey);
                          const sgPanelId = `${menuId}-sg-${sg.heading}`;
                          return (
                            <div key={sg.heading}>
                              <div className="flex items-center justify-between gap-2 pl-5 pr-3">
                                {sg.href ? (
                                  <a
                                    href={sg.href}
                                    role="menuitem"
                                    target={
                                      sg.href.startsWith("http") &&
                                      !sg.href.startsWith(SITE_BASE)
                                        ? "_blank"
                                        : undefined
                                    }
                                    rel={
                                      sg.href.startsWith("http") &&
                                      !sg.href.startsWith(SITE_BASE)
                                        ? "noopener noreferrer"
                                        : undefined
                                    }
                                    onClick={closeEverything}
                                    className="flex-1 py-2.5 text-xs font-bold uppercase tracking-wider text-[#020122] hover:text-[#ff671d] transition-colors"
                                  >
                                    {sg.heading}
                                  </a>
                                ) : (
                                  <div className="flex-1 py-2.5 text-xs font-bold uppercase tracking-wider text-[#020122]">
                                    {sg.heading}
                                  </div>
                                )}
                                <button
                                  type="button"
                                  aria-expanded={sgOpen}
                                  aria-controls={sgPanelId}
                                  aria-label={`${sgOpen ? "Collapse" : "Expand"} ${sg.heading}`}
                                  onClick={(ev) => {
                                    ev.stopPropagation();
                                    toggleSubgroup(sgKey);
                                  }}
                                  className="p-1 text-[#020122] hover:text-[#ff671d]"
                                >
                                  <ChevronDown
                                    className={`w-4 h-4 transition-transform ${
                                      sgOpen ? "rotate-180" : ""
                                    }`}
                                  />
                                </button>
                              </div>
                              {sgOpen ? (
                                <ul
                                  id={sgPanelId}
                                  className="pl-8 pr-3 pb-2 border-l border-gray-300 ml-5"
                                >
                                  {sg.items.map((item) => (
                                    <li key={item.label}>
                                      <a
                                        href={item.href}
                                        role="menuitem"
                                        target={
                                          item.external ? "_blank" : undefined
                                        }
                                        rel={
                                          item.external
                                            ? "noopener noreferrer"
                                            : undefined
                                        }
                                        onClick={closeEverything}
                                        className="block py-1.5 text-xs font-bold uppercase tracking-wider text-[#020122] hover:text-[#ff671d] transition-colors"
                                      >
                                        {item.label}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              ) : null}
                            </div>
                          );
                        })}
                        {group.items?.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            role="menuitem"
                            target={item.external ? "_blank" : undefined}
                            rel={
                              item.external ? "noopener noreferrer" : undefined
                            }
                            onClick={closeEverything}
                            className="block pl-5 pr-3 py-2.5 text-xs font-bold uppercase tracking-wider text-[#020122] hover:text-[#ff671d] transition-colors"
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-1 shrink-0">
              <button
                type="button"
                aria-label="Search"
                className="p-2 text-[#020122] hover:text-[#ff671d] transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              <a
                href={`${SITE_BASE}/account/login`}
                aria-label="Account"
                className="p-2 text-[#020122] hover:text-[#ff671d] transition-colors"
              >
                <User className="w-5 h-5" />
              </a>
              <a
                href={`${SITE_BASE}/cart`}
                aria-label="Cart"
                className="p-2 text-[#020122] hover:text-[#ff671d] transition-colors relative"
              >
                <ShoppingCart className="w-5 h-5" />
              </a>
            </div>

            <div className="flex lg:hidden items-center gap-1">
              <a
                href={`${SITE_BASE}/cart`}
                aria-label="Cart"
                className="p-2 text-[#020122]"
              >
                <ShoppingCart className="w-5 h-5" />
              </a>
              <button
                ref={hamburgerRef}
                type="button"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls={drawerId}
                onClick={() => setMobileOpen((open) => !open)}
                className="p-2 text-[#020122]"
              >
                {mobileOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen ? (
          <div
            ref={drawerRef}
            id={drawerId}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
            className="lg:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            <div className="max-h-[calc(100vh-5rem)] overflow-y-auto py-2">
              {NAV_GROUPS.map((group) => {
                const dropdown = hasDropdown(group);
                if (!dropdown) {
                  return (
                    <a
                      key={group.label}
                      href={group.href}
                      target={group.external ? "_blank" : undefined}
                      rel={group.external ? "noopener noreferrer" : undefined}
                      onClick={closeEverything}
                      className="block px-5 py-3 text-sm font-bold uppercase tracking-wide text-[#020122] border-b border-gray-100"
                    >
                      {group.label}
                    </a>
                  );
                }
                const expanded = mobileExpanded.has(group.label);
                const panelId = `byrna-mpanel-${reactId}-${group.label}`;
                return (
                  <div
                    key={group.label}
                    className="border-b border-gray-100"
                  >
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={panelId}
                      onClick={() => toggleMobileGroup(group.label)}
                      className="w-full flex items-center justify-between px-5 py-3 text-sm font-bold uppercase tracking-wide text-[#020122]"
                    >
                      {group.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          expanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {expanded ? (
                      <div id={panelId} className="pb-3 px-5 space-y-3">
                        <a
                          href={group.href}
                          target={group.external ? "_blank" : undefined}
                          rel={
                            group.external ? "noopener noreferrer" : undefined
                          }
                          onClick={closeEverything}
                          className="block text-xs font-bold uppercase tracking-widest text-[#ff671d]"
                        >
                          View all {group.label} &rarr;
                        </a>
                        {group.subgroups?.map((sg) => (
                          <div key={sg.heading}>
                            {sg.href ? (
                              <a
                                href={sg.href}
                                onClick={closeEverything}
                                className="block text-xs font-bold uppercase tracking-widest text-[#020122] mb-1"
                              >
                                {sg.heading}
                              </a>
                            ) : (
                              <div className="text-xs font-bold uppercase tracking-widest text-[#020122] mb-1">
                                {sg.heading}
                              </div>
                            )}
                            <ul className="space-y-1 pl-3">
                              {sg.items.map((item) => (
                                <li key={item.label}>
                                  <a
                                    href={item.href}
                                    target={
                                      item.external ? "_blank" : undefined
                                    }
                                    rel={
                                      item.external
                                        ? "noopener noreferrer"
                                        : undefined
                                    }
                                    onClick={closeEverything}
                                    className="block py-1 text-sm text-gray-700"
                                  >
                                    {item.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        {group.items && group.items.length > 0 ? (
                          <ul className="space-y-1 pt-2 border-t border-gray-100">
                            {group.items.map((item) => (
                              <li key={item.label}>
                                <a
                                  href={item.href}
                                  target={item.external ? "_blank" : undefined}
                                  rel={
                                    item.external
                                      ? "noopener noreferrer"
                                      : undefined
                                  }
                                  onClick={closeEverything}
                                  className="block py-1 text-sm font-semibold text-[#020122]"
                                >
                                  {item.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                );
              })}
              <div className="flex items-center gap-4 px-5 py-4">
                <button
                  type="button"
                  aria-label="Search"
                  className="p-2 text-[#020122]"
                >
                  <Search className="w-5 h-5" />
                </button>
                <a
                  href={`${SITE_BASE}/account/login`}
                  onClick={closeEverything}
                  aria-label="Account"
                  className="p-2 text-[#020122]"
                >
                  <User className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </header>
    </div>
  );
}
