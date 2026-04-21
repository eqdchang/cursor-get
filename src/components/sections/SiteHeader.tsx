"use client";

import { useState } from "react";
import {
  ChevronDownIcon,
  MenuIcon,
  SearchIcon,
  XIcon,
} from "@/components/icons";
import type { NavGroup } from "@/types/content";

const SITE_BASE = "https://boardwalktech.com";

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

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a
            href={`${SITE_BASE}/Home`}
            className="flex items-center"
            aria-label="Boardwalk Tech home"
          >
            <img
              src="/images/brand/boardwalk-tech-logo.png"
              alt="Boardwalk Tech"
              className="h-12"
              width={225}
              height={48}
            />
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="relative group">
                <a
                  href={group.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {group.label}
                  <ChevronDownIcon className="w-4 h-4" />
                </a>
                <div
                  className="absolute top-full left-0 w-96 mt-1 py-2 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-150 z-50"
                  role="menu"
                >
                  {group.items.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="block px-4 py-3 text-sm hover:bg-blue-50 transition-colors group/item"
                    >
                      <div className="font-medium text-gray-900 group-hover/item:text-blue-600">
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
              </div>
            ))}
            <button
              type="button"
              aria-label="Search"
              className="p-2 text-gray-500 hover:text-blue-600 transition-colors ml-2"
            >
              <SearchIcon className="w-5 h-5" />
            </button>
          </nav>

          <button
            type="button"
            aria-label="Menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 text-gray-700"
          >
            {mobileOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="lg:hidden bg-white border-t border-gray-100 overflow-hidden">
          <div className="max-h-[70vh] overflow-y-auto py-4 px-4">
            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="py-2">
                <div className="text-sm font-semibold text-gray-900 mb-2">
                  {group.label}
                </div>
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
  );
}
