import type { FooterColumn } from "@/types/content";

const COLUMNS: FooterColumn[] = [
  {
    heading: "Platform",
    links: [
      { label: "Velocity", href: "#velocity" },
      { label: "Unity Central", href: "#unity-central" },
      { label: "Verity", href: "#verity" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "AI-Powered Order Management", href: "#solutions" },
      { label: "Deal Pricing", href: "#solutions" },
      { label: "Supply Chain Excel Automation", href: "#solutions" },
      { label: "Financial Services Excel & EUC Transformation", href: "#solutions" },
      { label: "Supply Chain Information Intelligence", href: "#solutions" },
      { label: "BPO Digital Transformation & Agent AI", href: "#solutions" },
      { label: "Automate & Streamline Excel Processes Around Your ERP", href: "#solutions" },
      { label: "Automated Control Testing", href: "#solutions" },
    ],
  },
  {
    heading: "Industries",
    links: [
      { label: "CPG", href: "#industries" },
      { label: "Apparel", href: "#industries" },
      { label: "Technology", href: "#industries" },
      { label: "Manufacturing", href: "#industries" },
      { label: "Financial Services", href: "#industries" },
      { label: "Insurance", href: "#industries" },
      { label: "Tax", href: "#industries" },
      { label: "Government", href: "#industries" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Insights Library", href: "#insights" },
      { label: "Blog", href: "#blog" },
      { label: "Client Resources", href: "#client-resources" },
    ],
  },
  {
    heading: "About Us",
    links: [
      { label: "Newsroom", href: "#newsroom" },
      { label: "Partners", href: "#partners" },
      { label: "Leadership", href: "#leadership" },
      { label: "Investors", href: "#investors" },
      { label: "Careers", href: "#careers" },
      { label: "Contact Us", href: "#contact" },
    ],
  },
];

export function SiteFooter() {
  return (
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
          <img
            src="/images/brand/boardwalk-tech-logo.png"
            alt="Boardwalk Tech"
            className="h-8"
          />
          <p className="text-sm text-gray-500">
            Copyright 2006-2025 Boardwalktech, Inc
          </p>
          <a
            href="#privacy"
            className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
