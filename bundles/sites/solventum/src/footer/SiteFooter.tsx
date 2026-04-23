const SITE_BASE = "https://www.solventum.com";
const LOGO_SRC =
  "https://s7d9.scene7.com/is/content/mmmspinco/solventum-logo-horz-white-4?ts=1755617370206&dpr=off";

function ext(href: string): boolean {
  try {
    return new URL(href).hostname !== "www.solventum.com";
  } catch {
    return false;
  }
}

type FooterLink = { label: string; href: string; external?: boolean };
type FooterColumn = { heading: string; links: FooterLink[] };

const COLUMNS: FooterColumn[] = [
  {
    heading: "Our company",
    links: [
      { label: "About us", href: "/en-us/home/our-company/" },
      { label: "Careers", href: "/en-us/home/our-company/careers/" },
      { label: "Investors", href: "https://investors.solventum.com/", external: true },
      { label: "Partners & suppliers", href: "/en-us/home/our-company/partners-suppliers/" },
      { label: "Sustainability & social impact", href: "/en-us/home/our-company/sustainability-social-impact/" },
      { label: "Ethics & compliance", href: "/en-us/home/our-company/ethics-compliance/" },
      { label: "Newsroom", href: "https://news.solventum.com/", external: true },
    ],
  },
  {
    heading: "Resources & education",
    links: [
      { label: "Solventum stories", href: "/en-us/home/resources/" },
      { label: "Solventum education", href: "/en-us/home/education/" },
      { label: "SDS/RDS lookup", href: "https://www.3m.com/3M/en_US/company-us/SDS-search/", external: true },
      { label: "Instructions for use & certificates", href: "https://eifu.solventum.com/", external: true },
      { label: "Lithium battery test summary search", href: "https://www.3m.com/3M/en_US/company-us/lithium-battery-test-summary-report-search/", external: true },
    ],
  },
  {
    heading: "Info",
    links: [
      { label: "Contact us", href: "/en-us/home/our-company/contact-us/" },
      { label: "Partner Portal login", href: "https://order.solventum.com/", external: true },
      { label: "Site map", href: "/en-us/home/our-company/sitemap/" },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/solventumhealth",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@Solventum",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/solventumhealth/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://twitter.com/solventum",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/solventumhealth",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

const LEGAL_LINKS: FooterLink[] = [
  { label: "Legal", href: "/en-us/home/legal/" },
  { label: "Terms of sale", href: "/en-us/home/global-terms-of-sale/" },
  { label: "Privacy", href: "/en-us/home/legal/website-privacy-statement/" },
  { label: "HIPAA Privacy", href: "/en-us/home/our-company/hipaa-privacy/" },
  { label: "Security", href: "/en-us/home/security/" },
  { label: "Terms & Conditions", href: "/en-us/home/legal/website-terms-conditions/" },
  { label: "DMCA", href: "/en-us/home/legal/dmca/" },
  { label: "Accessibility Statement", href: "/en-us/home/our-company/ethics-compliance/accessibility-statement/" },
  { label: "Your Privacy Preferences", href: "#cmp-revoke-consent" },
  { label: "Transparency in Supply Chains and Modern Slavery Disclosures", href: "/content/dam/public/language-masters/en/entp/document/2025/solventum-modern-slavery-statement-entp-en.pdf", external: true },
];

export function SiteFooter() {
  return (
    <div className="bw-scope">
      <footer
        className="text-white"
        style={{ backgroundColor: "#01332B", padding: "32px 0 24px" }}
      >
        <div className="max-w-[1280px] mx-auto px-5">
          {/* Logo */}
          <a href={`${SITE_BASE}/en-us/home/`} aria-label="Solventum homepage" className="inline-block mb-8">
            <img
              src={LOGO_SRC}
              alt="Go to the Solventum homepage."
              style={{ height: "68px", width: "auto" }}
            />
          </a>

          {/* Main content row: mission block + 4 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_1fr_1fr_1fr] gap-8 mb-10">
            {/* Mission block */}
            <div>
              <h5 className="text-white font-semibold mb-3 text-sm">Our mission</h5>
              <p className="text-white/80 text-sm leading-relaxed mb-4">
                Enabling better, smarter, safer healthcare to improve lives
              </p>
              <a
                href="/en-us/home/our-company/"
                className="inline-block text-[#00D44B] border border-[#00D44B] rounded-full px-4 py-1.5 text-sm font-medium hover:bg-[#00D44B] hover:text-[#01332B] transition-colors"
              >
                Learn more
              </a>
            </div>

            {/* Link columns */}
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <h5 className="text-white font-semibold mb-3 text-sm">{col.heading}</h5>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...(link.external || ext(link.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="text-[#00D44B] text-sm hover:underline"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Follow Us */}
            <div>
              <h5 className="text-white font-semibold mb-3 text-sm">Follow Us</h5>
              <div className="flex gap-2">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex items-center justify-center w-9 h-9 rounded-full border border-white/60 text-white hover:border-[#00D44B] hover:text-[#00D44B] transition-colors shrink-0"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-white/20 mb-5" />

          {/* Bottom bar */}
          <div className="flex flex-col gap-2">
            {/* Main legal links row */}
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {LEGAL_LINKS.slice(0, -1).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.external || ext(link.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="text-[#00D44B] text-xs hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
            {/* "Transparency..." on its own row with copyright right-aligned */}
            <div className="flex items-center justify-between gap-4">
              <a
                href={LEGAL_LINKS[LEGAL_LINKS.length - 1].href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00D44B] text-xs hover:underline"
              >
                {LEGAL_LINKS[LEGAL_LINKS.length - 1].label}
              </a>
              <p className="text-white/60 text-xs whitespace-nowrap">© Solventum 2026. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
