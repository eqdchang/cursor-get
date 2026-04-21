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

export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type FooterColumn = {
  heading: string;
  links: FooterLink[];
};
