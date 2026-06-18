/**
 * Static (raw-mode) render of the Barings header.
 *
 * Unlike the bundle's interactive `SiteHeader.tsx`, this component renders the
 * FULL DOM for every state up front (all submenus, the locations panel, the
 * search overlay, and every level of the mobile drawer) with each non-default
 * state hidden via the `hidden` attribute. All interactivity is layered on at
 * runtime by `behavior-header.ts`, which keys off the `data-bw-*` attributes
 * declared here.
 *
 * Content (labels, hrefs, images, icons) is imported from the same `data.ts` /
 * `icons.ts` the bundle uses, so the raw HTML never duplicates copy — it is
 * generated from the single source and then handed to the client as editable
 * markup.
 */
import type { HTMLAttributes } from "react";
import {
  GLOBAL_SITE_HREF,
  LINK_CLIENT_PORTAL,
  LINK_HOME,
  LOCATIONS,
  NAV,
  SEARCH_ACTION,
} from "../header/data";
import {
  ICON_BACK,
  ICON_CHEVRON_DOWN,
  ICON_CLOSE,
  ICON_HAMBURGER,
  ICON_LOCATIONS,
  ICON_LOCK,
  ICON_SEARCH,
  LOGO_NAVY,
  LOGO_WHITE,
} from "../header/icons";
import type { CardsOption, SidebarOption } from "../types";

const ORIGIN = "https://www.barings.com";

function abs(href: string): string {
  if (!href) return href;
  if (
    /^https?:\/\//i.test(href) ||
    href.startsWith("#") ||
    href.startsWith("mailto:")
  ) {
    return href;
  }
  return ORIGIN + href;
}

function isCards(opt: SidebarOption): opt is CardsOption {
  return Array.isArray((opt as CardsOption).cards);
}

function SVG({
  markup,
  className,
  ...rest
}: { markup: string; className?: string } & HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...rest}
      className={className}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}

function OptionContent({ option }: { option: SidebarOption }) {
  if (isCards(option)) {
    return (
      <div className="flex gap-6">
        {option.cards.map((c) => (
          <a
            key={c.href}
            href={abs(c.href)}
            data-bw-link
            className="w-[166px] shrink-0 group block no-underline"
          >
            <img
              src={c.img}
              alt={c.imgAlt ?? c.label}
              className="w-full h-auto block"
            />
            <span className="block mt-2 text-[13px] font-light text-[#002856] [letter-spacing:0.5px] group-hover:text-[#007836] transition-colors">
              {c.label}
            </span>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-0">
      <div className="w-[158px] min-[1920px]:w-[208px] shrink-0">
        <img
          src={option.img}
          alt={option.imgAlt ?? ""}
          className="w-full h-auto block max-w-full"
        />
      </div>
      <div
        className={[
          "grow min-w-0 pl-8 pr-[3.5%]",
          option.assetClass ? "border-r border-[#dee2e6]" : "",
        ].join(" ")}
      >
        <h3 className="font-serif text-[20px] leading-[22.5px] font-medium text-[#002856] [font-family:'kepler-std-display',serif] [min-width:310px]">
          {option.title}
        </h3>
        <p className="text-[13px] leading-[19.5px] text-[#484848] mt-2 [min-width:310px]">
          {option.copy}
        </p>
        <div className="mt-3">
          <a
            href={abs(option.ctaHref)}
            data-bw-link
            className="text-[13px] font-bold text-[#007836] hover:text-[#005c29] transition-colors no-underline"
          >
            {option.ctaText ?? "Learn More"}
          </a>
        </div>
      </div>
      {option.assetClass && (
        <div className="w-[285px] min-[1920px]:w-[360px] shrink-0 ml-[17px] pl-8">
          <h4 className="font-serif text-[20px] leading-[22.5px] font-medium text-[#002856] [font-family:'kepler-std-display',serif] mb-2">
            {option.assetClass.title}
          </h4>
          <ul className="flex flex-col gap-2">
            {option.assetClass.links.map((l) => (
              <li key={l.href}>
                <a
                  href={abs(l.href)}
                  data-bw-link
                  className="text-[13px] font-bold text-[#007836] hover:text-[#005c29] transition-colors no-underline"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function DesktopSubmenu({
  group,
  groupIndex,
}: {
  group: (typeof NAV)[number];
  groupIndex: number;
}) {
  const showSidebar = group.options.length > 1;
  return (
    <div className="bg-[#f1f3f4] pt-6 pb-8">
      <div className="max-w-[1140px] min-[1920px]:max-w-[1440px] mx-auto pl-4 flex">
        {showSidebar ? (
          <ul role="menu" className="w-[190px] min-[1920px]:w-[240px] shrink-0 flex flex-col gap-[2px] px-4">
            {group.options.map((opt, idx) => (
              <li key={opt.label} role="none">
                <button
                  type="button"
                  role="menuitem"
                  data-bw-subtab={`${groupIndex}:${idx}`}
                  aria-selected={idx === 0}
                  className={[
                    "block w-full text-left text-[13px] font-light leading-[19.5px] pb-1 text-[#002856]",
                    idx === 0 ? "[text-shadow:rgb(0,0,0)_0_0_1px]" : "",
                  ].join(" ")}
                  style={{ cursor: "default" }}
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div
            className="w-[190px] min-[1920px]:w-[240px] shrink-0 px-4 text-[13px] font-light text-[#002856] leading-[19.5px] pb-1 [text-shadow:rgb(0,0,0)_0_0_1px]"
            aria-hidden="true"
          >
            {group.options[0].label}
          </div>
        )}

        <div className="grow min-w-0">
          {group.options.map((opt, idx) => (
            <div
              key={opt.label}
              data-bw-subpanel={`${groupIndex}:${idx}`}
              {...(idx === 0 ? {} : { hidden: true })}
            >
              <OptionContent option={opt} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileGroupOptions({ groupIndex }: { groupIndex: number }) {
  const group = NAV[groupIndex];
  return (
    <div data-bw-mpanel={String(groupIndex)} hidden className="px-5 pt-2 pb-8">
      <div className="text-[14px] font-bold tracking-[0.5px] uppercase text-[#002856] py-3">
        {group.label}
      </div>
      <ul className="flex flex-col">
        {group.options.map((opt, optIdx) => (
          <li
            key={opt.label}
            className="border-b border-[#e6e6e6] last:border-b-0"
          >
            <button
              type="button"
              data-bw-mopt={`${groupIndex}:${optIdx}`}
              aria-expanded="false"
              className="w-full flex items-center justify-between py-3 text-left text-[14px] text-[#002856]"
            >
              <span>{opt.label}</span>
              <SVG
                markup={ICON_CHEVRON_DOWN}
                className="bw-mchevron block text-[#002856] transition-transform duration-200"
              />
            </button>
            <div data-bw-mcontent={`${groupIndex}:${optIdx}`} hidden className="pb-4 pl-1">
              {isCards(opt) ? (
                <ul className="flex flex-col gap-3">
                  {opt.cards.map((c) => (
                    <li key={c.href}>
                      <a
                        href={abs(c.href)}
                        data-bw-link
                        className="text-[14px] text-[#002856] hover:text-[#00953B] transition-colors no-underline"
                      >
                        {c.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <div>
                  <div className="font-serif text-[16px] text-[#002856] mb-2">
                    {opt.title}
                  </div>
                  <p className="text-[13px] text-[#484848] mb-3">{opt.copy}</p>
                  <a
                    href={abs(opt.ctaHref)}
                    data-bw-link
                    className="text-[13px] font-semibold text-[#00953B] hover:text-[#007836] transition-colors no-underline"
                  >
                    {opt.ctaText ?? "Learn More"}
                  </a>
                  {opt.assetClass && (
                    <ul className="mt-3 flex flex-col gap-2">
                      {opt.assetClass.links.map((l) => (
                        <li key={l.href}>
                          <a
                            href={abs(l.href)}
                            data-bw-link
                            className="text-[14px] font-semibold text-[#00953B] hover:text-[#007836] transition-colors no-underline"
                          >
                            {l.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StaticHeader() {
  return (
    <div className="bw-scope" data-bw-header-root>
      <header
        data-bw-header
        data-bw-chrome="transparent"
        className="fixed top-0 left-0 right-0 z-[100] w-full transition-colors duration-200 ease-in"
      >
        <div className="max-w-[1140px] min-[1920px]:max-w-[1440px] mx-auto px-4 h-16 flex items-center">
          <div className="flex-1 flex items-center justify-start lg:hidden">
            <button
              type="button"
              data-bw-action="mobile-open"
              aria-label="Open menu"
              className="p-1 text-[#002856]"
            >
              <SVG markup={ICON_HAMBURGER} className="block" />
            </button>
          </div>

          <a href={abs(LINK_HOME)} aria-label="Barings home" className="block shrink-0">
            <SVG markup={LOGO_NAVY} className="block lg:hidden" />
            <SVG
              markup={LOGO_WHITE}
              data-bw-logo="white"
              className="hidden lg:block"
            />
            <SVG
              markup={LOGO_NAVY}
              data-bw-logo="navy"
              className="hidden"
            />
          </a>

          <nav aria-label="Primary" className="hidden lg:flex lg:grow items-center justify-center">
            {NAV.map((g, idx) => (
              <button
                key={g.aria}
                type="button"
                data-bw-trigger={String(idx)}
                aria-haspopup="menu"
                aria-expanded="false"
                aria-controls={`bw-submenu-${idx}`}
                className="mx-2 xl:mx-4 p-0 border-0 bg-transparent text-[13px] font-medium [letter-spacing:0.5px] uppercase whitespace-nowrap leading-5 transition-all duration-200 ease-in"
              >
                {g.label}
              </button>
            ))}
          </nav>

          <div className="flex-1 flex items-center justify-end gap-4 lg:flex-none lg:gap-5">
            <button
              type="button"
              data-bw-action="search"
              aria-label="Search"
              className="lg:hidden p-1 text-[#002856]"
            >
              <SVG markup={ICON_SEARCH} className="block" />
            </button>
            <button
              type="button"
              data-bw-action="search"
              aria-label="Search"
              className="hidden lg:inline-flex p-1 transition-colors"
            >
              <SVG markup={ICON_SEARCH} className="block" />
            </button>
            <span
              aria-hidden="true"
              data-bw-divider
              className="hidden lg:block w-px h-5"
            />
            <button
              type="button"
              data-bw-action="locations"
              aria-label="Locations"
              className="hidden lg:inline-flex p-1 transition-colors"
            >
              <SVG markup={ICON_LOCATIONS} className="block" />
            </button>
            <a
              href={LINK_CLIENT_PORTAL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Client Portal"
              className="hidden lg:inline-flex p-1 transition-colors"
            >
              <SVG markup={ICON_LOCK} className="block" />
            </a>
          </div>
        </div>

        <div data-bw-search hidden className="bg-[#f1f3f4] py-3">
          <form
            action={ORIGIN + SEARCH_ACTION}
            method="get"
            className="max-w-[760px] mx-auto px-4 flex items-center gap-3"
          >
            <input
              name="query"
              type="search"
              placeholder="What are you looking for?"
              className="grow bg-transparent border-0 outline-none text-[14px] text-[#002856] placeholder:text-[#002856] placeholder:font-bold py-2 text-center"
            />
            <button
              type="button"
              data-bw-action="search-close"
              aria-label="Close search"
              className="text-[#002856] hover:text-[#007836] transition-colors p-1"
            >
              <SVG markup={ICON_CLOSE} className="block" />
            </button>
          </form>
        </div>

        <div data-bw-locations hidden className="bg-[#f1f3f4] pt-6 pb-8">
          <div className="max-w-[1140px] min-[1920px]:max-w-[1440px] mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-4">
              {LOCATIONS.slice(0, 3).map((region) => (
                <div key={region.title}>
                  <div className="text-[13px] font-bold text-[#002856] mb-2">
                    {region.title}
                  </div>
                  <ul className="flex flex-col gap-2">
                    {region.countries.map((c) => (
                      <li key={c.href}>
                        <a
                          href={abs(c.href)}
                          data-bw-link
                          className="text-[13px] font-light text-[#002856] hover:text-[#007836] transition-colors no-underline"
                        >
                          {c.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="col-span-2">
                <div className="text-[13px] font-bold text-[#002856] mb-2">
                  Europe
                </div>
                <div className="grid grid-cols-2 gap-x-6">
                  {[
                    LOCATIONS[3].countries.slice(0, 8),
                    LOCATIONS[3].countries.slice(8),
                  ].map((chunk, i) => (
                    <ul key={i} className="flex flex-col gap-2">
                      {chunk.map((c) => (
                        <li key={c.href}>
                          <a
                            href={abs(c.href)}
                            data-bw-link
                            className="text-[13px] font-light text-[#002856] hover:text-[#007836] transition-colors no-underline"
                          >
                            {c.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 text-[13px] font-bold text-[#002856]">
              Location not listed?{" "}
              <a
                href={abs(GLOBAL_SITE_HREF)}
                data-bw-link
                className="text-[#007836] font-bold hover:text-[#005c29] transition-colors no-underline"
              >
                Visit our Global Site.
              </a>
            </div>
          </div>
        </div>

        {NAV.map((g, idx) => (
          <div
            key={g.aria}
            id={`bw-submenu-${idx}`}
            data-bw-submenu={String(idx)}
            hidden
            role="region"
            aria-label={g.label}
          >
            <DesktopSubmenu group={g} groupIndex={idx} />
          </div>
        ))}
      </header>

      <div data-bw-drawer hidden className="fixed inset-0 z-[1000]">
        <div
          className="absolute inset-0 bg-black/30"
          data-bw-action="mobile-close"
          aria-hidden="true"
        />
        <aside
          role="dialog"
          aria-label="Site menu"
          className="absolute inset-y-0 left-0 w-[85%] max-w-[420px] bg-[#f1f3f4] overflow-y-auto"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#e6e6e6]">
            <button
              type="button"
              data-bw-action="mobile-back"
              aria-label="Back"
              hidden
              className="text-[#002856] p-1"
            >
              <SVG markup={ICON_BACK} className="block" />
            </button>
            <span aria-hidden="true" data-bw-mback-spacer className="w-6" />
            <button
              type="button"
              data-bw-action="mobile-close"
              aria-label="Close menu"
              className="text-[#002856] p-1"
            >
              <SVG markup={ICON_CLOSE} className="block" />
            </button>
          </div>

          <div data-bw-mpanel="root" className="px-5 pt-2 pb-8">
            <ul className="flex flex-col">
              {NAV.map((g, idx) => (
                <li key={g.aria} className="py-1">
                  <button
                    type="button"
                    data-bw-mgroup={String(idx)}
                    className="w-full text-left py-3 text-[14px] font-bold tracking-[0.5px] uppercase text-[#002856]"
                  >
                    {g.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-4">
              <a
                href={abs("/en-us/guest/contact/locations")}
                data-bw-link
                className="flex items-center gap-2 text-[14px] text-[#002856] hover:text-[#00953B] transition-colors no-underline"
              >
                <SVG markup={ICON_LOCATIONS} className="block text-[#002856]" />
                Locations
              </a>
              <a
                href={LINK_CLIENT_PORTAL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[14px] text-[#002856] hover:text-[#00953B] transition-colors no-underline"
              >
                <SVG markup={ICON_LOCK} className="block text-[#002856]" />
                Client Portal
              </a>
            </div>
          </div>

          {NAV.map((_, idx) => (
            <MobileGroupOptions key={idx} groupIndex={idx} />
          ))}
        </aside>
      </div>
    </div>
  );
}
