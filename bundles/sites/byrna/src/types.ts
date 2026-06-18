export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  /** Product thumbnail (CDN URL). Present on Shop launcher rows only. */
  img?: string;
  /** Inline badge text, e.g. "New" / "Best Seller". */
  badge?: string;
  /** Inline nested links (e.g. Projectiles → .61 / .68 / 12 Gauge). */
  items?: NavItem[];
};

export type NavColumn = {
  heading: string;
  /**
   * When set AND `items` is empty, the column heading itself is the link
   * (Learn → Tips & Drills / Real Stories / Product Guides). Otherwise the
   * heading is a static label above `items`.
   */
  href?: string;
  external?: boolean;
  items: NavItem[];
};

/** Promotional image tile rendered as the last column of a mega panel. */
export type NavCard = {
  href: string;
  img: string;
  alt?: string;
  external?: boolean;
};

export type NavGroup = {
  label: string;
  href: string;
  external?: boolean;
  /** Mega-panel columns. Absent → the group is a plain top-level link. */
  columns?: NavColumn[];
  card?: NavCard;
};

export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
  /**
   * Light-DOM widget triggers (Accessibility, Cookie Settings) have no real
   * destination on the live site — they open a JS overlay. We render them as
   * non-navigating buttons (visual stubs).
   */
  stub?: boolean;
};

export type FooterColumn = {
  heading: string;
  links: FooterLink[];
};
