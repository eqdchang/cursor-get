import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  GLOBAL_SITE_HREF,
  LINK_CLIENT_PORTAL,
  LINK_HOME,
  LOCATIONS,
  NAV,
  SEARCH_ACTION,
} from "./data";
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
} from "./icons";
import type { CardsOption, DescriptionOption, SidebarOption } from "../types";

const ORIGIN = "https://www.barings.com";

function abs(href: string): string {
  if (!href) return href;
  if (/^https?:\/\//i.test(href) || href.startsWith("#") || href.startsWith("mailto:")) {
    return href;
  }
  return ORIGIN + href;
}

function isCards(opt: SidebarOption): opt is CardsOption {
  return Array.isArray((opt as CardsOption).cards);
}

function SVG({ markup, className }: { markup: string; className?: string }) {
  return <span className={className} dangerouslySetInnerHTML={{ __html: markup }} />;
}

type DesktopSubmenuProps = {
  group: (typeof NAV)[number];
  onLinkClick: () => void;
};

function DesktopSubmenu({ group, onLinkClick }: DesktopSubmenuProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = group.options[activeIndex];
  const showSidebar = group.options.length > 1;

  return (
    <div className="bg-[#f1f3f4] pt-6 pb-8 mt-4">
      <div className="max-w-[1140px] mx-auto px-4 flex">
        {showSidebar ? (
          <ul
            role="menu"
            className="w-[190px] shrink-0 flex flex-col px-4"
          >
            {group.options.map((opt, idx) => {
              const selected = idx === activeIndex;
              return (
                <li key={opt.label} role="none">
                  <button
                    type="button"
                    role="menuitem"
                    aria-selected={selected}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onFocus={() => setActiveIndex(idx)}
                    className={[
                      "block w-full text-left text-[13px] font-light leading-[19.5px] pb-1 text-[#002856]",
                      selected ? "[text-shadow:rgb(0,0,0)_0_0_1px]" : "",
                    ].join(" ")}
                    style={{ cursor: "default" }}
                  >
                    {opt.label}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <div
            className="w-[190px] shrink-0 px-4 text-[13px] font-light text-[#002856] leading-[19.5px] pb-1 [text-shadow:rgb(0,0,0)_0_0_1px]"
            aria-hidden="true"
          >
            {active.label}
          </div>
        )}

        <div className="grow min-w-0">
          {isCards(active) ? (
            <CardsPanel option={active} onLinkClick={onLinkClick} />
          ) : (
            <DescriptionPanel option={active} onLinkClick={onLinkClick} />
          )}
        </div>
      </div>
    </div>
  );
}

function DescriptionPanel({
  option,
  onLinkClick,
}: {
  option: DescriptionOption;
  onLinkClick: () => void;
}) {
  return (
    <div className="flex gap-0">
      <div className="w-[158px] shrink-0">
        <img
          src={option.img}
          alt={option.imgAlt ?? ""}
          className="w-full h-auto block max-w-full"
        />
      </div>
      <div className="grow basis-[42%] max-w-[42%] pl-8 pr-[3.5%]">
        <h3 className="font-serif text-[20px] leading-[22.5px] font-medium text-[#002856] [font-family:'kepler-std-display',serif] [min-width:310px]">
          {option.title}
        </h3>
        <p className="text-[13px] leading-[19.5px] text-[#484848] mt-2 [min-width:310px]">
          {option.copy}
        </p>
        <div className="mt-3">
          <a
            href={abs(option.ctaHref)}
            onClick={onLinkClick}
            className="text-[13px] font-bold text-[#007836] hover:text-[#005c29] transition-colors no-underline"
          >
            {option.ctaText ?? "Learn More"}
          </a>
        </div>
      </div>
      {option.assetClass && (
        <div className="basis-[28%] shrink-0 pl-8">
          <h4 className="font-serif text-[20px] leading-[22.5px] font-medium text-[#002856] [font-family:'kepler-std-display',serif] mb-2">
            {option.assetClass.title}
          </h4>
          <ul className="flex flex-col gap-2">
            {option.assetClass.links.map((l) => (
              <li key={l.href}>
                <a
                  href={abs(l.href)}
                  onClick={onLinkClick}
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

function CardsPanel({
  option,
  onLinkClick,
}: {
  option: CardsOption;
  onLinkClick: () => void;
}) {
  return (
    <div className="flex gap-6">
      {option.cards.map((c) => (
        <a
          key={c.href}
          href={abs(c.href)}
          onClick={onLinkClick}
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

function LocationsPanel({ onLinkClick }: { onLinkClick: () => void }) {
  return (
    <div className="bg-[#f1f3f4] pt-6 pb-8 mt-4">
      <div className="max-w-[1140px] mx-auto px-4">
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
                      onClick={onLinkClick}
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
                        onClick={onLinkClick}
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
            onClick={onLinkClick}
            className="text-[#007836] font-bold hover:text-[#005c29] transition-colors no-underline"
          >
            Visit our Global Site.
          </a>
        </div>
      </div>
    </div>
  );
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <div className="bg-[#f1f3f4] py-3 mt-4">
      <form
        action={ORIGIN + SEARCH_ACTION}
        method="get"
        className="max-w-[760px] mx-auto px-4 flex items-center gap-3"
      >
        <input
          ref={inputRef}
          name="query"
          type="search"
          placeholder="What are you looking for?"
          className="grow bg-transparent border-0 outline-none text-[14px] text-[#002856] placeholder:text-[#002856] placeholder:font-bold py-2 text-center"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close search"
          className="text-[#002856] hover:text-[#007836] transition-colors p-1"
        >
          <SVG markup={ICON_CLOSE} className="block" />
        </button>
      </form>
    </div>
  );
}

type MobilePanel =
  | { type: "root" }
  | { type: "group"; index: number; expanded: number | null };

function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [panel, setPanel] = useState<MobilePanel>({ type: "root" });
  const closeAndReset = useCallback(() => {
    onClose();
    setPanel({ type: "root" });
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAndReset();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeAndReset]);

  if (!open) return null;

  const groupPanel = panel.type === "group" ? panel : null;
  const group = groupPanel ? NAV[groupPanel.index] : null;

  return (
    <div className="fixed inset-0 z-[1000]">
      <div
        className="absolute inset-0 bg-black/30"
        onClick={closeAndReset}
        aria-hidden="true"
      />
      <aside
        role="dialog"
        aria-label="Site menu"
        className="absolute inset-y-0 left-0 w-[85%] max-w-[420px] bg-white overflow-y-auto"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e6e6e6]">
          {groupPanel ? (
            <button
              type="button"
              onClick={() => setPanel({ type: "root" })}
              aria-label="Back"
              className="text-[#002856] p-1"
            >
              <SVG markup={ICON_BACK} className="block" />
            </button>
          ) : (
            <span aria-hidden="true" className="w-6" />
          )}
          <button
            type="button"
            onClick={closeAndReset}
            aria-label="Close menu"
            className="text-[#002856] p-1"
          >
            <SVG markup={ICON_CLOSE} className="block" />
          </button>
        </div>

        {groupPanel && group ? (
          <div className="px-5 pt-2 pb-8">
            <div className="text-[14px] font-bold tracking-[0.5px] uppercase text-[#002856] py-3">
              {group.label}
            </div>
            <ul className="flex flex-col">
              {group.options.map((opt, optIdx) => {
                const expanded = groupPanel.expanded === optIdx;
                return (
                  <li
                    key={opt.label}
                    className="border-b border-[#e6e6e6] last:border-b-0"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setPanel({
                          type: "group",
                          index: groupPanel.index,
                          expanded: expanded ? null : optIdx,
                        })
                      }
                      aria-expanded={expanded}
                      className="w-full flex items-center justify-between py-3 text-left text-[14px] text-[#002856]"
                    >
                      <span>{opt.label}</span>
                      <SVG
                        markup={ICON_CHEVRON_DOWN}
                        className={`block text-[#002856] transition-transform duration-200 ${
                          expanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {expanded && (
                      <div className="pb-4 pl-1">
                        {isCards(opt) ? (
                          <ul className="flex flex-col gap-3">
                            {opt.cards.map((c) => (
                              <li key={c.href}>
                                <a
                                  href={abs(c.href)}
                                  onClick={closeAndReset}
                                  className="text-[14px] text-[#002856] hover:text-[#00953B] transition-colors no-underline"
                                >
                                  {c.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div>
                            <img
                              src={opt.img}
                              alt={opt.imgAlt ?? ""}
                              className="w-full h-auto mb-3"
                            />
                            <div className="font-serif text-[16px] text-[#002856] mb-2">
                              {opt.title}
                            </div>
                            <p className="text-[13px] text-[#484848] mb-3">
                              {opt.copy}
                            </p>
                            <a
                              href={abs(opt.ctaHref)}
                              onClick={closeAndReset}
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
                                      onClick={closeAndReset}
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
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="px-5 pt-2 pb-8">
            <ul className="flex flex-col">
              {NAV.map((g, idx) => (
                <li key={g.aria} className="py-1">
                  <button
                    type="button"
                    onClick={() =>
                      setPanel({ type: "group", index: idx, expanded: null })
                    }
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
                onClick={closeAndReset}
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
        )}
      </aside>
    </div>
  );
}

export function SiteHeader() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [headerHovered, setHeaderHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<number | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => {
      setHoverIndex(null);
    }, 120);
  }, [cancelClose]);

  const openHover = useCallback(
    (idx: number) => {
      cancelClose();
      setLocationsOpen(false);
      setSearchOpen(false);
      setHoverIndex(idx);
    },
    [cancelClose],
  );

  const showWhite =
    scrolled ||
    headerHovered ||
    hoverIndex !== null ||
    locationsOpen ||
    searchOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setHoverIndex(null);
      setLocationsOpen(false);
      setSearchOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!locationsOpen && !searchOpen) return;
    const onClick = (e: MouseEvent) => {
      const root = containerRef.current;
      if (!root) return;
      const path = e.composedPath ? e.composedPath() : [];
      if (path.length ? !path.includes(root) : !root.contains(e.target as Node)) {
        setLocationsOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [locationsOpen, searchOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const baseId = useId();
  const ariaIds = useMemo(
    () => NAV.map((_, i) => `${baseId}-menu-${i}`.replace(/[:]/g, "")),
    [baseId],
  );

  return (
    <div className="bw-scope" ref={containerRef}>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-[100] w-full transition-colors duration-200 ease-in",
          "bg-white text-[#002856]",
          showWhite
            ? "lg:bg-white lg:text-[#002856]"
            : "lg:bg-transparent lg:text-white",
        ].join(" ")}
        onMouseEnter={() => {
          cancelClose();
          setHeaderHovered(true);
        }}
        onMouseLeave={() => {
          setHeaderHovered(false);
          scheduleClose();
        }}
      >
        <DesktopBar
          showWhite={showWhite}
          hoverIndex={hoverIndex}
          onHover={openHover}
          onSearch={() => {
            setHoverIndex(null);
            setLocationsOpen(false);
            setSearchOpen((s) => !s);
          }}
          onLocations={() => {
            setHoverIndex(null);
            setSearchOpen(false);
            setLocationsOpen((l) => !l);
          }}
          onHamburger={() => setMobileOpen(true)}
          ariaIds={ariaIds}
        />

        {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}

        {locationsOpen && (
          <LocationsPanel onLinkClick={() => setLocationsOpen(false)} />
        )}

        {hoverIndex !== null && !locationsOpen && !searchOpen && (
          <div
            id={ariaIds[hoverIndex]}
            role="region"
            aria-label={NAV[hoverIndex].label}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <DesktopSubmenu
              key={hoverIndex}
              group={NAV[hoverIndex]}
              onLinkClick={() => setHoverIndex(null)}
            />
          </div>
        )}
      </header>

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </div>
  );
}

type DesktopBarProps = {
  showWhite: boolean;
  hoverIndex: number | null;
  onHover: (idx: number) => void;
  onSearch: () => void;
  onLocations: () => void;
  onHamburger: () => void;
  ariaIds: string[];
};

function DesktopBar({
  showWhite,
  hoverIndex,
  onHover,
  onSearch,
  onLocations,
  onHamburger,
  ariaIds,
}: DesktopBarProps) {
  const triggerColor = showWhite ? "#002856" : "#ffffff";
  const baseTrigger: CSSProperties = { color: triggerColor };
  return (
    <div className="max-w-[1140px] mx-auto px-4 h-16 flex items-center pt-4">
      {/* Mobile-only left section: hamburger inside flex-1 wrapper so logo
          ends up perfectly centered between hamburger and search. */}
      <div className="flex-1 flex items-center justify-start lg:hidden">
        <button
          type="button"
          onClick={onHamburger}
          aria-label="Open menu"
          className="p-1 text-[#002856]"
        >
          <SVG markup={ICON_HAMBURGER} className="block" />
        </button>
      </div>

      <a
        href={abs(LINK_HOME)}
        aria-label="Barings home"
        className="block shrink-0"
      >
        {/* Mobile: always navy, regardless of header transparent/scrolled state. */}
        <SVG markup={LOGO_NAVY} className="block lg:hidden" />
        {/* Desktop: switch white/navy with the header chrome. */}
        <SVG
          markup={showWhite ? LOGO_NAVY : LOGO_WHITE}
          className="hidden lg:block"
        />
      </a>

      <nav
        aria-label="Primary"
        className="hidden lg:flex items-center ml-4"
      >
        {NAV.map((g, idx) => {
          const open = idx === hoverIndex;
          return (
            <button
              key={g.aria}
              type="button"
              aria-haspopup="menu"
              aria-expanded={open}
              aria-controls={ariaIds[idx]}
              onMouseEnter={() => onHover(idx)}
              onFocus={() => onHover(idx)}
              style={{ color: triggerColor }}
              className={[
                "mx-2 xl:mx-4 text-[13px] font-medium [letter-spacing:0.5px] uppercase whitespace-nowrap leading-5 transition-all duration-200 ease-in",
                open ? "[text-shadow:rgb(0,0,0)_0_0_1px]" : "",
              ].join(" ")}
            >
              {g.label}
            </button>
          );
        })}
      </nav>

      {/* Right section: on mobile this wrapper takes flex-1 (mirroring the
          hamburger wrapper) so the logo lands centered. On desktop it
          collapses to content size and is pushed to the far right. */}
      <div className="flex-1 flex items-center justify-end gap-4 lg:flex-none lg:ml-auto lg:gap-5">
        {/* Mobile search — always navy. */}
        <button
          type="button"
          onClick={onSearch}
          aria-label="Search"
          className="lg:hidden p-1 text-[#002856]"
        >
          <SVG markup={ICON_SEARCH} className="block" />
        </button>
        {/* Desktop search — colour follows header chrome. */}
        <button
          type="button"
          onClick={onSearch}
          aria-label="Search"
          className="hidden lg:inline-flex p-1 transition-colors"
          style={baseTrigger}
        >
          <SVG markup={ICON_SEARCH} className="block" />
        </button>
        <span
          aria-hidden="true"
          className="hidden lg:block w-px h-5"
          style={{ backgroundColor: triggerColor }}
        />
        <button
          type="button"
          onClick={onLocations}
          aria-label="Locations"
          className="hidden lg:inline-flex p-1 transition-colors"
          style={baseTrigger}
        >
          <SVG markup={ICON_LOCATIONS} className="block" />
        </button>
        <a
          href={LINK_CLIENT_PORTAL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Client Portal"
          className="hidden lg:inline-flex p-1 transition-colors"
          style={baseTrigger}
        >
          <SVG markup={ICON_LOCK} className="block" />
        </a>
      </div>
    </div>
  );
}

