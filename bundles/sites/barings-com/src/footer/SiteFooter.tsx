import {
  SOCIAL_APPLE_PODCAST,
  SOCIAL_LINKEDIN,
  SOCIAL_SPOTIFY,
  SOCIAL_TWITTER,
  SOCIAL_YOUTUBE,
} from "../header/icons";

const ORIGIN = "https://www.barings.com";

function abs(href: string): string {
  if (!href) return href;
  if (/^https?:\/\//i.test(href) || href.startsWith("#") || href.startsWith("mailto:")) {
    return href;
  }
  return ORIGIN + href;
}

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/barings", icon: SOCIAL_LINKEDIN },
  { label: "Twitter", href: "https://twitter.com/Barings", icon: SOCIAL_TWITTER },
  {
    label: "Apple Podcasts",
    href: "https://podcasts.apple.com/us/podcast/streaming-income-a-podcast-from-barings/id1449496233",
    icon: SOCIAL_APPLE_PODCAST,
  },
  { label: "Spotify", href: "https://open.spotify.com/show/7wv1GJCQHcggXDdMHbhRlY", icon: SOCIAL_SPOTIFY },
  { label: "YouTube", href: "https://www.youtube.com/@Barings", icon: SOCIAL_YOUTUBE },
];

const NAV_LINKS = [
  { label: "Privacy Notice", href: "/en-us/guest/content/privacy-notice" },
  { label: "Cookie Notice", href: "/en-us/guest/content/cookies-notice" },
  { label: "Terms & Conditions", href: "/en-us/guest/content/terms-and-conditions" },
  { label: "Important Disclosures", href: "/en-us/guest/content/important-disclosures" },
  { label: "Site Map", href: "/en-us/guest/sitemap" },
];

function SVG({ markup, className }: { markup: string; className?: string }) {
  return <span className={className} dangerouslySetInnerHTML={{ __html: markup }} />;
}

export function SiteFooter() {
  return (
    <div className="bw-scope">
      <footer className="[font-family:'museo-sans',sans-serif] text-[#484848]">
        {/* Section 1 — colophon (white, py-8) */}
        <div className="bg-white py-8">
          <div className="max-w-[1140px] mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-6">
              <h2 className="[font-family:'kepler-std-display',serif] text-[20px] leading-[22.5px] font-medium text-[#002856] mb-3">
                Who We Are
              </h2>
              <div className="text-[13px] leading-[19.5px] text-[#484848] mb-3 space-y-3">
                <p>
                  Barings is a $481 billion* global alternative asset manager
                  that partners with institutional, insurance, and wealth
                  clients, and supports leading businesses with flexible
                  financing solutions. The firm, a subsidiary of MassMutual and
                  MS&amp;AD, seeks to deliver excess returns by leveraging its
                  global scale and capabilities across credit, real assets,
                  capital solutions and emerging markets.
                </p>
                <p>*As of March 31, 2026</p>
              </div>
              <a
                href={abs("/en-us/guest/contact/contact-barings")}
                className="text-[13px] font-bold text-[#007836] hover:text-[#005c29] transition-colors no-underline"
              >
                Contact Us
              </a>
            </div>

            <div className="md:col-span-5 md:col-start-8">
              <h2 className="[font-family:'kepler-std-display',serif] text-[20px] leading-[22.5px] font-medium text-[#002856] mb-3">
                Follow Us
              </h2>
              <ul className="flex items-center gap-3 flex-wrap">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="block w-12 h-12 text-[#002856] hover:text-[#007836] transition-colors"
                    >
                      <SVG markup={s.icon} className="block w-12 h-12" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2 — gray-100 nav strip (py-4) */}
        <div className="bg-[#f1f3f4] py-4">
          <div className="max-w-[1140px] mx-auto px-4">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={abs(l.href)}
                    className="text-[13px] font-light text-[#484848] hover:text-[#002856] transition-colors no-underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 3 — gray-400 legal (py-6) */}
        <div className="bg-[#c3c6c8] py-6">
          <div className="max-w-[1140px] mx-auto px-4 text-[13px] leading-[19.5px] text-[#484848] space-y-3">
            <p>
              The opinions and other information contained herein, whether
              express or implied are made in good faith in relation to the
              facts known at the time of preparation and are subject to change
              without notice.{" "}
              <strong>
                PAST PERFORMANCE IS NOT NECESSARILY INDICATIVE OF FUTURE
                RESULTS.
              </strong>{" "}
              All monetary figures are in USD unless otherwise specified.
            </p>
            <p>
              This material should not be construed as a recommendation, and
              Barings is not soliciting any action based upon such information.
              Additionally, the strategies and funds may not be available to
              all investor types in all jurisdictions. In some jurisdictions
              this website may contain advertising.
            </p>
            <p>
              Copyright © 2026 Barings. The BARINGS name and logo design are
              trademarks of Barings and are registered in U.S. Patent and
              Trademark Office and in other countries around the world. All
              rights are reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
