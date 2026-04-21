import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import type { NavGroup } from "../types";

const SITE_BASE = "https://boardwalktech.com";
const LOGO_SRC =
  "https://cdn.prod.website-files.com/5eb236230d5bdf2e76923884/5eb2ec11b9c843355ddc4f57_boardwalk-tech-logo.png";

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Platform",
    href: `${SITE_BASE}/Platform`,
    items: [
      {
        label: "Velocity",
        description: "Business Process and AI Workflow Automation",
        href: `${SITE_BASE}/velocity`,
      },
      {
        label: "Unity Central",
        description:
          "Regulated Data Foundation for AI Information Orchestration",
        href: `${SITE_BASE}/unity-central`,
      },
      {
        label: "Verity",
        description:
          "AI Driven Intelligent Controls/Compliance Automation/Execution",
        href: `${SITE_BASE}/verity`,
      },
    ],
  },
  {
    label: "Solutions",
    href: `${SITE_BASE}/Solutions`,
    items: [
      {
        label: "AI Driven Controls Intelligence - Automation, Testing, Monitoring",
        href: `${SITE_BASE}/solutions-automated-control-testing`,
      },
      {
        label:
          "Excel EUC Transformation/Automation/Controls for Financial Services",
        href: `${SITE_BASE}/solutions-financial-services-excel-euc-transformation`,
      },
      {
        label: "Excel Based Deal Pricing and CPQ",
        href: `${SITE_BASE}/solutions-deal-pricing`,
      },
      {
        label: "Excel Tracker AI Based Digital Transformation",
        href: `${SITE_BASE}/solutions-bpo-digital-transformation-agent-ai`,
      },
      {
        label: "AI Powered Order Management and Visibility",
        href: `${SITE_BASE}/solutions-ai-powered-order-management`,
      },
      {
        label: "AI Automate your Excel Processes in your Enterprise",
        href: `${SITE_BASE}/solutions-automating-excel-workflow-around-erp-systems`,
      },
      {
        label: "AI Supply Chain Information Intelligence",
        href: `${SITE_BASE}/solutions-supply-chain-information-intelligence`,
      },
      {
        label: "Supply Chain Excel Automation",
        href: `${SITE_BASE}/solutions-supply-chain-excel-automation`,
      },
    ],
  },
  {
    label: "Industries",
    href: `${SITE_BASE}/Industries`,
    items: [
      { label: "CPG", href: `${SITE_BASE}/industries-cpg` },
      { label: "Apparel", href: `${SITE_BASE}/industries-apparel` },
      { label: "Technology", href: `${SITE_BASE}/industries-technology` },
      { label: "Manufacturing", href: `${SITE_BASE}/industries-manufacturing` },
      {
        label: "Financial Services",
        href: `${SITE_BASE}/industries-financial-services`,
      },
      { label: "Insurance", href: `${SITE_BASE}/industries-insurance` },
      { label: "Tax", href: `${SITE_BASE}/industries-tax` },
      { label: "Government", href: `${SITE_BASE}/industries-government` },
    ],
  },
  {
    label: "Resources",
    href: `${SITE_BASE}/Resources`,
    items: [
      {
        label: "Insights Library",
        href: `${SITE_BASE}/resources-insights-library`,
      },
      { label: "Blog", href: `${SITE_BASE}/resources-blog` },
      {
        label: "Client Resources",
        href: `${SITE_BASE}/resources-client-resources`,
      },
    ],
  },
  {
    label: "About",
    href: `${SITE_BASE}/AboutUs`,
    items: [
      { label: "Newsroom", href: `${SITE_BASE}/about-us-newsroom` },
      { label: "Partners", href: `${SITE_BASE}/about-us-partners` },
      { label: "Leadership", href: `${SITE_BASE}/about-us-leadership` },
      {
        label: "Investors",
        href: "https://ir.boardwalktech.com/",
        external: true,
      },
      { label: "Careers", href: `${SITE_BASE}/about-us-careers` },
      { label: "Contact Us", href: `${SITE_BASE}/contact-us` },
    ],
  },
];

type OpenMode = "hover" | "click";

export function SiteHeader() {
  const reactId = useId();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [openMode, setOpenMode] = useState<OpenMode | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
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
    setMobileOpen(false);
  }

  const drawerId = `bw-mobile-drawer-${reactId}`;

  return (
    <div ref={rootRef} className="bw-scope">
      <header className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a
              href={`${SITE_BASE}/Home`}
              className="flex items-center"
              aria-label="Boardwalk Tech home"
            >
              <img
                src={LOGO_SRC}
                alt="Boardwalk Tech"
                className="h-12"
                width={225}
                height={48}
              />
            </a>

            <nav
              ref={navRef}
              aria-label="Primary"
              className="hidden lg:flex items-center gap-1"
            >
              {NAV_GROUPS.map((group) => {
                const isOpen = openGroup === group.label;
                const menuId = `bw-menu-${reactId}-${group.label}`;
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
                      className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
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
                        className="absolute top-full left-0 w-96 mt-1 py-2 bg-white rounded-xl shadow-xl border border-gray-100 z-50"
                      >
                        <a
                          href={group.href}
                          role="menuitem"
                          onClick={closeEverything}
                          className="block px-4 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors border-b border-gray-100"
                        >
                          View all {group.label}
                        </a>
                        {group.items.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            role="menuitem"
                            target={item.external ? "_blank" : undefined}
                            rel={
                              item.external ? "noopener noreferrer" : undefined
                            }
                            onClick={closeEverything}
                            className="block px-4 py-3 text-sm hover:bg-blue-50 transition-colors"
                          >
                            <div className="font-medium text-gray-900">
                              {item.label}
                            </div>
                            {item.description ? (
                              <div className="text-xs text-gray-500 mt-1">
                                {item.description}
                              </div>
                            ) : null}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
              <button
                type="button"
                aria-label="Search"
                className="p-2 text-gray-500 hover:text-blue-600 transition-colors ml-2"
              >
                <Search className="w-5 h-5" />
              </button>
            </nav>

            <button
              ref={hamburgerRef}
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls={drawerId}
              onClick={() => setMobileOpen((open) => !open)}
              className="lg:hidden p-2 text-gray-700"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div
            ref={drawerRef}
            id={drawerId}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="max-h-[calc(100vh-5rem)] overflow-y-auto py-4 px-4">
              {NAV_GROUPS.map((group) => (
                <div key={group.label} className="py-2">
                  <a
                    href={group.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    {group.label}
                  </a>
                  {group.items.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 pl-4 text-sm"
                    >
                      <div className="text-gray-900 font-medium">
                        {item.label}
                      </div>
                      {item.description ? (
                        <div className="text-xs text-gray-500 mt-0.5">
                          {item.description}
                        </div>
                      ) : null}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </header>
    </div>
  );
}
