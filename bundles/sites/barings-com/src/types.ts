export type AssetClassLink = {
  label: string;
  href: string;
};

export type AssetClassPanel = {
  title: string;
  links: AssetClassLink[];
};

export type CardOption = {
  label: string;
  img: string;
  imgAlt?: string;
  href: string;
};

export type DescriptionOption = {
  label: string;
  img: string;
  imgAlt?: string;
  title: string;
  copy: string;
  ctaHref: string;
  ctaText?: string;
  assetClass?: AssetClassPanel;
};

export type CardsOption = {
  label: string;
  cards: CardOption[];
};

export type SidebarOption = DescriptionOption | CardsOption;

export type NavGroup = {
  label: string;
  aria: string;
  options: SidebarOption[];
};

export type LocationLink = {
  label: string;
  href: string;
};

export type LocationRegion = {
  title: string;
  countries: LocationLink[];
};

export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type SocialIcon = {
  label: string;
  href: string;
  icon: string;
};
