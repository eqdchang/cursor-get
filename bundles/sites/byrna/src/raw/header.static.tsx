/**
 * Static (raw-mode) render of the Byrna header.
 *
 * Renders the FULL DOM for every state up front — geo bar, announcement bar,
 * all mega panels, and the entire two-level mobile drawer — with each
 * non-default state marked `hidden`. Interactivity is layered on at runtime by
 * `behavior-header.ts`, keyed off the `data-bw-*` attributes declared here.
 *
 * Content is imported from the same `header/data.ts` the bundle uses.
 */
import type { NavColumn, NavGroup, NavItem } from "../types";
import {
  ANNOUNCEMENT,
  GEO_REGIONS,
  HEADER_SOCIALS,
  LOGO_SRC,
  NAV_GROUPS,
  SITE_BASE,
  isExternal,
} from "../header/data";

function rel(href: string, external?: boolean) {
  const ext = external ?? isExternal(href);
  return ext ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

function hasPanel(group: NavGroup): boolean {
  return !!group.columns && group.columns.length > 0;
}

const ChevronDown = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);
const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const IconCart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);
const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-7 w-7">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const SOCIAL_PATHS: Record<string, string> = {
  Facebook:
    "M11,22 C17.0754375,22 22,17.0751625 22,11 C22,4.9248375 17.0754375,0 11,0 C4.9245625,0 0,4.9248375 0,11 C0,17.0751625 4.9245625,22 11,22 Z M12.7428125,10.9991062 L12.7428125,18.5585812 L9.6146875,18.5585812 L9.6146875,10.99945 L8.052,10.99945 L8.052,8.394375 L9.6146875,8.394375 L9.6146875,6.8303125 C9.6146875,4.7051125 10.49675,3.44141875 13.0040625,3.44141875 L15.0913125,3.44141875 L15.0913125,6.04676875 L13.7864375,6.04676875 C12.810875,6.04676875 12.74625,6.4108 12.74625,7.09025625 L12.7428125,8.3941 L15.10575,8.3941 L14.829375,10.9991062 L12.7428125,10.9991062 Z",
  Instagram:
    "M11,22 C17.0754375,22 22,17.0751625 22,11 C22,4.9248375 17.0754375,0 11,0 C4.9245625,0 0,4.9248375 0,11 C0,17.0751625 4.9245625,22 11,22 Z M7.94475,3.63419375 C8.735375,3.5982375 8.988375,3.5894375 11.0006875,3.5894375 L10.998625,3.5894375 C13.011625,3.5894375 13.26325,3.5982375 14.053875,3.63419375 C14.8424375,3.6702875 15.3814375,3.79520625 15.85375,3.97849375 C16.341875,4.167625 16.7536875,4.4207625 17.1661875,4.8329875 C17.5786875,5.2449375 17.8316875,5.65833125 18.0214375,6.14576875 C18.203625,6.61698125 18.32875,7.15543125 18.365875,7.94440625 C18.4009375,8.734825 18.4105625,8.9874125 18.4105625,11 C18.4105625,13.0125875 18.4009375,13.2645562 18.365875,14.0550438 C18.32875,14.843675 18.203625,15.3823313 18.0214375,15.8536812 C17.8316875,16.3409125 17.5786875,16.754375 17.1661875,17.1662562 C16.754375,17.5784813 16.341875,17.8323062 15.8544375,18.021575 C15.3828125,18.2047937 14.8438125,18.3297125 14.0545625,18.365875 C13.264625,18.4018313 13.0123125,18.4106312 11,18.4106312 C8.987,18.4106312 8.7346875,18.4018313 7.94475,18.365875 C7.1555,18.3297125 6.6171875,18.2047937 6.1455625,18.021575 C5.658125,17.8323062 5.2449375,17.5784813 4.833125,17.1662562 C4.4213125,16.754375 4.167625,16.3409125 3.9785625,15.853475 C3.7956875,15.3823313 3.6705625,14.8438125 3.634125,14.0549062 C3.598375,13.2644187 3.5894375,13.0125875 3.5894375,11 C3.5894375,8.9874125 3.598375,8.7346875 3.634125,7.9442 C3.669875,7.1556375 3.7943125,6.61698125 3.9785625,6.14563125 C4.1683125,5.65833125 4.4213125,5.2449375 4.8338125,4.8329875 C5.245625,4.42096875 5.6588125,4.1677625 6.14625,3.97849375 C6.617875,3.79520625 7.1561875,3.6702875 7.94475,3.63419375 Z M10.753875,4.92476875 C10.604,4.9247 10.465125,4.92463125 10.335875,4.9248375 L10.335875,4.92298125 C8.9546875,4.9245625 8.69,4.933775 8.0059375,4.9647125 C7.283375,4.99785 6.8915,5.1183 6.63025,5.2201875 C6.2844375,5.3548 6.037625,5.5154 5.77775,5.774725 C5.5185625,6.03411875 5.3576875,6.2811375 5.223625,6.62695 C5.121875,6.8882 5.0015625,7.28035 4.967875,8.00284375 C4.9328125,8.78405 4.92525,9.017525 4.92525,10.996425 C4.92525,12.9753937 4.9328125,13.2100375 4.967875,13.9912437 C5.000875,14.7138062 5.121875,15.1059563 5.223625,15.3668625 C5.3576875,15.7128125 5.5185625,15.9592125 5.77775,16.2186062 C6.037625,16.478 6.2844375,16.6385312 6.63025,16.7728688 C6.8915,16.874275 7.283375,16.995 8.0059375,17.0283437 C8.787625,17.0638875 9.0220625,17.0715875 11.0006875,17.0715875 C12.9793125,17.0715875 13.21375,17.0638875 13.9954375,17.0283437 C14.718,16.9953437 15.109875,16.8748937 15.371125,16.7730062 C15.7169375,16.6386688 15.9630625,16.4781375 16.2229375,16.2187438 C16.482125,15.9595562 16.643,15.7132937 16.7770625,15.3674812 C16.8788125,15.106575 16.999125,14.714425 17.0328125,13.9918625 C17.067875,13.2106563 17.0754375,12.9760125 17.0754375,10.9982813 C17.0754375,9.02061875 17.067875,8.78590625 17.0328125,8.0047 C16.9998125,7.28220625 16.8788125,6.89005625 16.7770625,6.62915 C16.643,6.2833375 16.482125,6.03631875 16.2229375,5.776925 C15.96375,5.51753125 15.7169375,5.357 15.371125,5.2226625 C15.109875,5.12125625 14.718,5.00053125 13.9954375,4.9674625 C13.21375,4.93191875 12.9793125,4.9248375 11.0006875,4.9248375 L10.753875,4.92476875 Z M14.9565625,6.155325 C14.4656875,6.155325 14.0669375,6.55318125 14.0669375,7.0442625 C14.0669375,7.53520625 14.4656875,7.93354375 14.9565625,7.93354375 C15.4474375,7.93354375 15.8455,7.53520625 15.8455,7.0442625 C15.8455,6.55331875 15.4474375,6.155325 14.9565625,6.155325 Z M7.195375,11 C7.195375,8.89838125 8.899,7.19434375 11.0006875,7.19434375 C13.102375,7.19434375 14.806,8.8983125 14.806,11 C14.806,13.1016875 13.102375,14.8049 11.0006875,14.8049 C8.899,14.8049 7.195375,13.1016875 7.195375,11 Z M13.470875,10.9999312 C13.470875,9.63565625 12.3646875,8.52974375 11.0006875,8.52974375 C9.6366875,8.52974375 8.5305,9.63565625 8.5305,10.9999312 C8.5305,12.3641375 9.6366875,13.4701875 11.0006875,13.4701875 C12.3646875,13.4701875 13.470875,12.3641375 13.470875,10.9999312 Z",
  Twitter:
    "M11,22 C17.0754375,22 22,17.0751625 22,11 C22,4.9248375 17.0754375,0 11,0 C4.9245625,0 0,4.9248375 0,11 C0,17.0751625 4.9245625,22 11,22 Z M10.835,8.8836 L10.806125,8.40365625 C10.7188125,7.1597625 11.485375,6.02353125 12.698125,5.582775 C13.1443125,5.42609375 13.90125,5.4065 14.3955625,5.5435875 C14.590125,5.60236875 14.958625,5.79830625 15.2205625,5.97458125 L15.695625,6.297775 L16.2195,6.1312625 C16.511,6.043125 16.89875,5.89620625 17.073375,5.79830625 C17.238375,5.7101 17.384125,5.66115 17.384125,5.69050625 C17.384125,5.85701875 17.02525,6.42516875 16.724125,6.7386 C16.317125,7.17935625 16.4333125,7.21854375 17.257625,6.9246375 C17.752625,6.758125 17.76225,6.758125 17.6653125,6.94423125 C17.606875,7.0422 17.3064375,7.38505625 16.9860625,7.6984875 C16.4429375,8.23714375 16.4140625,8.295925 16.4140625,8.7465125 C16.4140625,9.44191875 16.0840625,10.8915125 15.7540625,11.6849563 C15.142875,13.1737375 13.8331875,14.7115375 12.5235,15.4853187 C10.679625,16.5725312 8.22525,16.846775 6.158625,16.2100812 C5.46975,15.9946187 4.2865625,15.4461313 4.2865625,15.3481625 C4.2865625,15.3188062 4.6454375,15.2796187 5.082,15.2697875 C5.993625,15.2501937 6.9059375,14.9955437 7.682125,14.545025 L8.206,14.231525 L7.6044375,14.0258937 C6.7505625,13.7320562 5.984,13.056175 5.790125,12.41955 C5.7316875,12.21385 5.751625,12.2040187 6.29475,12.2040187 L6.857125,12.1942563 L6.3820625,11.9689625 C5.819,11.6849563 5.30475,11.2050125 5.053125,10.7152375 C4.8681875,10.3626187 4.6358125,9.471275 4.7031875,9.40273125 C4.723125,9.373375 4.926625,9.43215625 5.1596875,9.5104625 C5.828625,9.75535 5.9159375,9.69656875 5.5281875,9.2852375 C4.8008125,8.5408125 4.577375,7.43400625 4.926625,6.38598125 L5.091625,5.9158 L5.7316875,6.55249375 C7.041375,7.835575 8.584125,8.59959375 10.3503125,8.82481875 L10.835,8.8836 Z",
  Youtube:
    "M11,22 C17.0754375,22 22,17.0751625 22,11 C22,4.9248375 17.0754375,0 11,0 C4.9245625,0 0,4.9248375 0,11 C0,17.0751625 4.9245625,22 11,22 Z M18.1005,7.3371375 C17.93,6.68229375 17.428125,6.1667375 16.790125,5.9917 C15.6344375,5.6736625 11,5.6736625 11,5.6736625 C11,5.6736625 6.3655625,5.6736625 5.2091875,5.9917 C4.571875,6.1667375 4.0693125,6.68229375 3.8988125,7.3371375 C3.5894375,8.52383125 3.5894375,11 3.5894375,11 C3.5894375,11 3.5894375,13.4760313 3.8988125,14.6628625 C4.0693125,15.3176375 4.571875,15.8332625 5.2091875,16.0083688 C6.3655625,16.3263375 11,16.3263375 11,16.3263375 C11,16.3263375 15.6344375,16.3263375 16.790125,16.0083688 C17.428125,15.8332625 17.93,15.3176375 18.1005,14.6628625 C18.4105625,13.4760313 18.4105625,11 18.4105625,11 C18.4105625,11 18.4105625,8.52383125 18.1005,7.3371375 Z M9.6105625,13.5473938 L9.6105625,8.91584375 L13.3155,11.2316875 L9.6105625,13.5473938 Z",
};
const SocialIcon = ({ label, className }: { label: string; className?: string }) => (
  <svg viewBox="0 0 22 22" fill="currentColor" aria-hidden="true" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d={SOCIAL_PATHS[label]} />
  </svg>
);

function Badge({ text }: { text: string }) {
  const olive = /new/i.test(text);
  return (
    <span
      className={`bw-cond ml-2 inline-block rounded-full px-[7px] py-[3px] text-[11px] font-extrabold uppercase leading-none text-white ${
        olive ? "bg-[#63663b]" : "bg-[#5f5f5f]"
      }`}
    >
      {text}
    </span>
  );
}

function ItemRow({ item }: { item: NavItem }) {
  if (item.items && item.items.length > 0) {
    return (
      <li className="mb-[18px]">
        <span className="block text-[clamp(10px,0.86vw,15px)] font-black uppercase text-[#3a3a3a]">{item.label}</span>
        <ul className="mt-[10px] space-y-[10px] pl-[10px]">
          {item.items.map((sub) => (
            <li key={sub.label}>
              <a
                href={sub.href}
                role="menuitem"
                data-bw-link
                {...rel(sub.href, sub.external)}
                className="block text-[clamp(10px,0.86vw,15px)] font-black uppercase text-[#3a3a3a] no-underline transition-colors hover:text-[#ff671d]"
              >
                {sub.label}
              </a>
            </li>
          ))}
        </ul>
      </li>
    );
  }
  return (
    <li className="mb-[18px]">
      <a
        href={item.href}
        role="menuitem"
        data-bw-link
        {...rel(item.href, item.external)}
        className="flex items-center text-[clamp(10px,0.86vw,15px)] font-black uppercase text-[#3a3a3a] no-underline transition-colors hover:text-[#ff671d]"
      >
        {item.img ? (
          <img src={item.img} alt="" aria-hidden="true" className="mr-3 h-8 w-8 shrink-0 rounded-[2px] object-contain" />
        ) : null}
        <span className="flex items-center">
          {item.label}
          {item.badge ? <Badge text={item.badge} /> : null}
        </span>
      </a>
    </li>
  );
}

function ColumnBlock({ column }: { column: NavColumn }) {
  const headingIsLink = column.items.length === 0 && !!column.href;
  return (
    <div className="w-[230px] shrink-0">
      {headingIsLink ? (
        <a
          href={column.href}
          role="menuitem"
          data-bw-link
          {...rel(column.href!, column.external)}
          className="bw-coltitle block py-[8px] text-[clamp(12px,1.03vw,18px)] font-black uppercase text-black no-underline transition-colors hover:text-[#ff671d]"
        >
          {column.heading}
        </a>
      ) : (
        <h3 className="bw-coltitle mb-[18px] py-[8px] text-[clamp(12px,1.03vw,18px)] font-black uppercase text-black">
          {column.heading}
        </h3>
      )}
      {column.items.length > 0 ? (
        <ul>
          {column.items.map((item) => (
            <ItemRow key={item.label} item={item} />
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function DesktopPanel({ group, idx }: { group: NavGroup; idx: number }) {
  return (
    <div
      id={`bw-submenu-${idx}`}
      data-bw-submenu={String(idx)}
      hidden
      role="menu"
      aria-label={group.label}
      className="absolute left-0 right-0 top-full z-50 bg-white shadow-[0_16px_32px_-16px_rgba(0,0,0,0.25)]"
    >
      <div className="mx-auto flex max-w-[1400px] justify-center gap-5 px-6 pb-8 pt-5">
        {group.columns!.map((column) => (
          <ColumnBlock key={column.heading} column={column} />
        ))}
        {group.card ? (
          <a
            href={group.card.href}
            role="menuitem"
            data-bw-link
            {...rel(group.card.href, group.card.external)}
            className="flex w-[230px] shrink-0 items-center justify-center no-underline"
          >
            <img src={group.card.img} alt={group.card.alt ?? ""} className="h-auto w-full max-w-[180px] object-contain" />
          </a>
        ) : null}
      </div>
    </div>
  );
}

function MobileColumn({ column, gi, ci }: { column: NavColumn; gi: number; ci: number }) {
  const isLinkOnly = column.items.length === 0 && !!column.href;
  if (isLinkOnly) {
    return (
      <a
        href={column.href}
        data-bw-link
        {...rel(column.href!, column.external)}
        className="block border-b border-[#262626] py-4 text-[20px] font-black uppercase text-white no-underline"
      >
        {column.heading}
      </a>
    );
  }
  return (
    <div className="border-b border-[#262626]">
      <button
        type="button"
        data-bw-msub={`${gi}-${ci}`}
        aria-expanded="false"
        className="flex w-full items-center justify-between py-4 text-[20px] font-extrabold uppercase text-white"
      >
        {column.heading}
        <ChevronDown className="bw-msubchevron h-5 w-5 transition-transform" />
      </button>
      <ul data-bw-msubpanel={`${gi}-${ci}`} hidden className="pb-3">
        {column.items.flatMap((item) =>
          item.items && item.items.length > 0
            ? item.items.map((sub) => (
                <li key={sub.label}>
                  <a href={sub.href} data-bw-link {...rel(sub.href, sub.external)} className="flex items-center gap-3 py-2 text-[18px] font-black uppercase text-white/90 no-underline">
                    {sub.label}
                  </a>
                </li>
              ))
            : [
                <li key={item.label}>
                  <a href={item.href} data-bw-link {...rel(item.href, item.external)} className="flex items-center gap-3 py-2 text-[18px] font-black uppercase text-white/90 no-underline">
                    {item.img ? <img src={item.img} alt="" aria-hidden="true" className="h-7 w-7 shrink-0 rounded-[2px] object-contain" /> : null}
                    <span className="flex items-center">
                      {item.label}
                      {item.badge ? <Badge text={item.badge} /> : null}
                    </span>
                  </a>
                </li>,
              ],
        )}
      </ul>
    </div>
  );
}

function MobileGroup({ group, idx }: { group: NavGroup; idx: number }) {
  if (!hasPanel(group)) {
    return (
      <a
        href={group.href}
        data-bw-link
        {...rel(group.href, group.external)}
        className="block border-b border-[#262626] py-4 text-[26px] font-black uppercase text-white no-underline"
      >
        {group.label}
      </a>
    );
  }
  return (
    <div className="border-b border-[#262626]">
      <button
        type="button"
        data-bw-mgroup={String(idx)}
        aria-expanded="false"
        className="flex w-full items-center justify-between py-4 text-[26px] font-black uppercase text-white"
      >
        {group.label}
        <ChevronDown className="bw-mchevron h-6 w-6 transition-transform" />
      </button>
      <div data-bw-mpanel={String(idx)} hidden className="pb-2 pl-1">
        {group.columns!.map((column, ci) => (
          <MobileColumn key={column.heading} column={column} gi={idx} ci={ci} />
        ))}
      </div>
    </div>
  );
}

export function StaticHeader() {
  return (
    <div className="bw-scope" data-bw-header-root>
      <header data-bw-header className="relative bg-white">
        {/* Top geo / region bar */}
        <div className="bg-black text-white">
          <div className="mx-auto flex h-[39px] max-w-[1400px] items-center justify-between px-4 sm:px-6">
            <div className="flex h-full items-stretch">
              {GEO_REGIONS.map((r) => (
                <a
                  key={r.label}
                  href={r.href}
                  {...rel(r.href, true)}
                  className={`flex items-center gap-1.5 px-3 text-[14px] font-black no-underline ${
                    r.active ? "bg-white/10" : "text-white/80 hover:text-white"
                  }`}
                >
                  <span aria-hidden="true" className="text-[13px] leading-none">{r.flag}</span>
                  {r.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4">
              {HEADER_SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="text-white no-underline transition-colors hover:text-[#ff671d]">
                  <SocialIcon label={s.label} className="h-[19px] w-[19px]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Orange announcement bar */}
        <div className="bg-[#ff671d]">
          <p className="bw-cond py-[10px] text-center text-[15px] font-bold text-black">{ANNOUNCEMENT}</p>
        </div>

        {/* Main nav bar */}
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <div className="relative flex h-[64px] items-center justify-between lg:h-[90px]">
            {/* Desktop logo (left) */}
            <a href={`${SITE_BASE}/`} className="hidden shrink-0 items-center no-underline lg:flex" aria-label="Byrna home">
              <img src={LOGO_SRC} alt="Byrna" className="h-[44px] w-auto" />
            </a>

            {/* Mobile left actions: hamburger + search */}
            <div className="flex items-center gap-1 lg:hidden">
              <button type="button" data-bw-action="mobile-open" aria-label="Open menu" aria-expanded="false" className="flex flex-col gap-[5px] p-2 text-[#020122]">
                <span className="block h-[2px] w-6 bg-current" />
                <span className="block h-[2px] w-6 bg-current" />
                <span className="block h-[2px] w-6 bg-current" />
              </button>
              <button type="button" aria-label="Search" className="p-2 text-[#020122] transition-colors hover:text-[#ff671d]">
                <IconSearch />
              </button>
            </div>

            {/* Mobile centered logo */}
            <a href={`${SITE_BASE}/`} className="absolute left-1/2 flex -translate-x-1/2 items-center no-underline lg:hidden" aria-label="Byrna home">
              <img src={LOGO_SRC} alt="Byrna" className="h-[30px] w-auto" />
            </a>

            <nav data-bw-nav aria-label="Primary" className="hidden flex-1 items-center justify-center lg:flex">
              {NAV_GROUPS.map((group, idx) =>
                hasPanel(group) ? (
                  <button
                    key={group.label}
                    type="button"
                    data-bw-trigger={String(idx)}
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-controls={`bw-submenu-${idx}`}
                    className="flex items-center gap-1.5 whitespace-nowrap px-5 py-3 text-[16px] font-normal uppercase text-[#020122] transition-colors hover:text-[#ff671d]"
                  >
                    {group.label}
                    <ChevronDown className="bw-chevron h-[18px] w-[18px] transition-transform" />
                  </button>
                ) : (
                  <a
                    key={group.label}
                    href={group.href}
                    {...rel(group.href, group.external)}
                    className="whitespace-nowrap px-5 py-3 text-[16px] font-normal uppercase text-[#020122] no-underline transition-colors hover:text-[#ff671d]"
                  >
                    {group.label}
                  </a>
                ),
              )}
            </nav>

            <div className="hidden shrink-0 items-center gap-[10px] lg:flex">
              <button type="button" aria-label="Search" className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#d6d6d6] text-[#020122] transition-colors hover:bg-[#c4c4c4]">
                <IconSearch />
              </button>
              <a href={`${SITE_BASE}/account/login`} aria-label="Account" className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#d6d6d6] text-[#020122] no-underline transition-colors hover:bg-[#c4c4c4]">
                <IconUser />
              </a>
              <a href={`${SITE_BASE}/cart`} aria-label="Cart" className="relative flex h-[35px] w-[35px] items-center justify-center rounded-full bg-[#d6d6d6] text-[#020122] no-underline transition-colors hover:bg-[#c4c4c4]">
                <IconCart />
                <span className="absolute -right-[2px] -top-[2px] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#ff671b] text-[11px] font-bold leading-none text-black">
                  0
                </span>
              </a>
            </div>

            {/* Mobile right actions: account + cart */}
            <div className="flex items-center gap-1 lg:hidden">
              <a href={`${SITE_BASE}/account/login`} aria-label="Account" className="p-2 text-[#020122] no-underline">
                <IconUser />
              </a>
              <a href={`${SITE_BASE}/cart`} aria-label="Cart" className="p-2 text-[#020122] no-underline">
                <IconCart />
              </a>
            </div>
          </div>
        </div>

        {NAV_GROUPS.map((group, idx) =>
          hasPanel(group) ? <DesktopPanel key={group.label} group={group} idx={idx} /> : null,
        )}
      </header>

      {/* Mobile drawer (two-level accordion, black) */}
      <div data-bw-drawer hidden role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[60] lg:hidden">
        <div data-bw-action="mobile-close" className="absolute inset-0 bg-black/50" />
        <div className="absolute left-0 top-0 h-full w-[85%] max-w-[400px] overflow-y-auto bg-black px-5 pb-10">
          <div className="flex justify-end py-3">
            <button type="button" data-bw-action="mobile-close" aria-label="Close menu" className="p-2 text-white">
              <IconClose />
            </button>
          </div>
          {NAV_GROUPS.map((group, idx) => (
            <MobileGroup key={group.label} group={group} idx={idx} />
          ))}
          <div className="mt-6 flex items-center gap-4">
            {HEADER_SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="text-white no-underline transition-colors hover:text-[#ff671d]">
                <SocialIcon label={s.label} className="h-[26px] w-[26px]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
