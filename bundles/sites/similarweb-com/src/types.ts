export type DropdownListItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type DropdownList = {
  heading: string | null;
  headingHref?: string;
  items: DropdownListItem[];
};

export type ProductTabPanel = {
  id: string;
  label: string;
  banner: {
    title: string;
    subtitle: string;
    href: string;
    variantColor: string;
  } | null;
  lists: DropdownList[];
  showExploreApi?: boolean;
};

export type SolutionCard = {
  title: string;
  subtitle: string;
  href: string;
  variantColor?: string;
};

export type SolutionTabPanel = {
  id: string;
  label: string;
  kind: "cards" | "list";
  heading?: string;
  cards?: SolutionCard[];
  lists?: DropdownList[];
};

export type ResourceColumn = {
  heading: string;
  items: DropdownListItem[];
};

export type SideBanner = {
  kicker: string;
  title: string;
  description: string;
  href: string;
  imgSrc: string;
  imgAlt: string;
};

export type FooterColumnSection = {
  heading: string;
  headingHref?: string;
  links: { label: string; href: string; external?: boolean }[];
};

export type FooterGridColumn = {
  sections: FooterColumnSection[];
};

export type FooterSocial = {
  name: string;
  href: string;
};

export type FooterLegalLink = {
  label: string;
  href?: string;
  external?: boolean;
};
