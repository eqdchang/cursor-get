import type { FooterColumn } from "../types";

type IconProps = { className?: string };

function FacebookIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M13.5 21v-8.25h2.77l.42-3.23H13.5V7.44c0-.94.26-1.57 1.6-1.57h1.71V2.99c-.83-.09-1.67-.13-2.5-.13-2.47 0-4.16 1.51-4.16 4.29v2.37H7.5v3.23h2.65V21h3.35z" />
    </svg>
  );
}

function TwitterIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817-5.966 6.817H1.676l7.73-8.835L1.25 2.25h6.833l4.713 6.231zm-1.161 17.52h1.834L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.39C1.35 2.68.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.39 2.13.67.67 1.34 1.08 2.13 1.39.76.3 1.64.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.39.67-.67 1.08-1.34 1.39-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.31-.79-.72-1.46-1.39-2.13C21.32 1.35 20.65.94 19.86.63 19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0m0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84m0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4m7.85-10.4a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44" />
    </svg>
  );
}

function YoutubeIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M23.5 6.2a3 3 0 0 0-2.12-2.12C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.58A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.12 2.12C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.58a3 3 0 0 0 2.12-2.12A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8M9.75 15.57V8.43L15.82 12z" />
    </svg>
  );
}

const SITE_BASE = "https://byrna.com";
const LOGO_SRC =
  "https://byrna.com/cdn/shop/files/logo3_1600x.png?v=1676410937";

const COLUMNS: FooterColumn[] = [
  {
    heading: "Shop & Support",
    links: [
      {
        label: "Byrna Retail Stores",
        href: `${SITE_BASE}/pages/byrna-retail-stores`,
      },
      {
        label: "Find a Dealer",
        href: `${SITE_BASE}/pages/dealer-locator`,
      },
      {
        label: "Shop All Products",
        href: `${SITE_BASE}/collections/all`,
      },
      {
        label: "First Aid",
        href: `${SITE_BASE}/pages/first-aid`,
      },
      {
        label: "Product Documents",
        href: `${SITE_BASE}/pages/product-documents`,
      },
      {
        label: "Warranty Registration",
        href: "https://care.byrna.com/register",
        external: true,
      },
      {
        label: "Service & Returns",
        href: "https://care.byrna.com/rma",
        external: true,
      },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Return Policy", href: `${SITE_BASE}/pages/return-policy` },
      { label: "FAQ", href: `${SITE_BASE}/pages/faq` },
      { label: "About", href: `${SITE_BASE}/pages/about` },
      { label: "Contact", href: `${SITE_BASE}/pages/contact-us` },
      { label: "Careers", href: `${SITE_BASE}/pages/careers` },
      {
        label: "International Inquiries",
        href: "mailto:international@byrna.com",
        external: true,
      },
      { label: "Media", href: `${SITE_BASE}/blogs/media` },
    ],
  },
  {
    heading: "Legal & Investors",
    links: [
      {
        label: "Shipping Restrictions",
        href: `${SITE_BASE}/pages/restrictions`,
      },
      { label: "Order Status", href: `${SITE_BASE}/pages/order-status` },
      { label: "Terms of Use", href: `${SITE_BASE}/pages/terms-of-use` },
      {
        label: "Privacy Policy",
        href: `${SITE_BASE}/pages/privacy-policy`,
      },
      {
        label: "Investors",
        href: "https://ir.byrna.com/",
        external: true,
      },
      {
        label: "NASDAQ: BYRN",
        href: "https://ir.byrna.com/quote",
        external: true,
      },
      {
        label: "Law Enforcement",
        href: "https://le.byrna.com/",
        external: true,
      },
      {
        label: "Become an Affiliate",
        href: `${SITE_BASE}/pages/byrna-affiliate-application`,
      },
    ],
  },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/byrnanation",
    Icon: FacebookIcon,
  },
  {
    label: "Twitter",
    href: "https://twitter.com/byrnanation",
    Icon: TwitterIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/byrnanation",
    Icon: InstagramIcon,
  },
  {
    label: "Youtube",
    href: "https://www.youtube.com/channel/UCsd__wC1miuRs0Q8uAttc6Q",
    Icon: YoutubeIcon,
  },
];

const PAYMENTS = [
  "American Express",
  "Diners Club",
  "Discover",
  "Google Pay",
  "JCB",
  "Mastercard",
  "Visa",
];

export function SiteFooter() {
  return (
    <div className="bw-scope">
      <footer className="bg-[#020122] text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-14">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4">
              Sign up to be the first to access new product announcements &amp;
              special promotions
            </h3>
            <form
              action={`${SITE_BASE}/contact#footer-classic`}
              method="post"
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <label htmlFor="byrna-newsletter-email" className="sr-only">
                Email
              </label>
              <input
                id="byrna-newsletter-email"
                type="email"
                name="contact[email]"
                placeholder="Email*"
                required
                className="flex-1 px-4 py-2.5 bg-transparent border border-white/60 text-white placeholder-white/60 focus:outline-none focus:border-[#ff671d] text-sm"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#ff671d] text-white text-sm font-bold uppercase tracking-wide hover:bg-[#e5571a] transition-colors"
              >
                Join
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-4">
                  {col.heading}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={
                          link.external ? "noopener noreferrer" : undefined
                        }
                        className="text-sm text-white/80 hover:text-[#ff671d] transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4">
                Follow Byrna
              </h4>
              <ul className="flex flex-wrap gap-3">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex h-10 w-10 items-center justify-center border border-white/30 text-white hover:bg-[#ff671d] hover:border-[#ff671d] transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-14 pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-6">
            <a
              href={`${SITE_BASE}/`}
              aria-label="Byrna home"
              className="shrink-0"
            >
              <img
                src={LOGO_SRC}
                alt="Byrna"
                className="h-8 w-auto opacity-90"
              />
            </a>
            <p className="text-xs text-white/70 text-center">
              &copy; 2026 Byrna. All Rights Reserved.
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-2">
              {PAYMENTS.map((p) => (
                <li
                  key={p}
                  className="px-2 py-1 border border-white/25 text-[10px] font-semibold uppercase tracking-wider text-white/80"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
