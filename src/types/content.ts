export type TrustLogo = {
  name: string;
  src: string;
};

export type ProductCard = {
  name: string;
  description: string;
  image: string;
  alt: string;
  href: string;
  gradient: string;
};

export type FeatureRow = {
  title: string;
  description: string;
  image: string;
  alt: string;
  imageOnRight: boolean;
};

export type SolutionCard = {
  title: string;
  description: string;
  image: string;
  alt: string;
  href: string;
};

export type FooterColumn = {
  heading: string;
  links: FooterLink[];
};

export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavDropdownItem = {
  label: string;
  description?: string;
  href: string;
  external?: boolean;
};

export type NavGroup = {
  label: string;
  href: string;
  items: NavDropdownItem[];
};
