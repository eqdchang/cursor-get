import type { FooterColumn } from "../types";

const SITE_BASE = "https://boardwalktech.com";
const LOGO_SRC =
  "https://cdn.prod.website-files.com/5eb236230d5bdf2e76923884/5eb2ec11b9c843355ddc4f57_boardwalk-tech-logo.png";

const COLUMNS: FooterColumn[] = [
  {
    heading: "Platform",
    links: [
      { label: "Velocity", href: `${SITE_BASE}/velocity` },
      { label: "Unity Central", href: `${SITE_BASE}/unity-central` },
      { label: "Verity", href: `${SITE_BASE}/verity` },
    ],
  },
  {
    heading: "Solutions",
    links: [
      {
        label: "AI-Powered Order Management",
        href: `${SITE_BASE}/solutions-ai-powered-order-management`,
      },
      { label: "Deal Pricing", href: `${SITE_BASE}/solutions-deal-pricing` },
      {
        label: "Supply Chain Excel Automation",
        href: `${SITE_BASE}/solutions-supply-chain-excel-automation`,
      },
      {
        label: "Financial Services Excel & EUC Transformation",
        href: `${SITE_BASE}/solutions-financial-services-excel-euc-transformation`,
      },
      {
        label: "Supply Chain Information Intelligence",
        href: `${SITE_BASE}/solutions-supply-chain-information-intelligence`,
      },
      {
        label: "BPO Digital Transformation & Agent AI",
        href: `${SITE_BASE}/solutions-bpo-digital-transformation-agent-ai`,
      },
      {
        label: "Automate & Streamline Excel Processes Around Your ERP",
        href: `${SITE_BASE}/solutions-automating-excel-workflow-around-erp-systems`,
      },
      {
        label: "Automated Control Testing",
        href: `${SITE_BASE}/solutions-automated-control-testing`,
      },
    ],
  },
  {
    heading: "Industries",
    links: [
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
    heading: "Resources",
    links: [
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
    heading: "About Us",
    links: [
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

export function SiteFooter() {
  return (
    <div className="bw-scope">
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={LOGO_SRC} alt="Boardwalk Tech" className="h-8" />
          <p className="text-sm text-gray-500">
            Copyright 2006-2025 Boardwalktech, Inc
          </p>
          <a
            href={`${SITE_BASE}/privacy-policy`}
            className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
    </div>
  );
}
