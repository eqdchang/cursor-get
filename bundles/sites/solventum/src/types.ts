export type NavDropdownItem = {
  label: string;
  href: string;
  external?: boolean;
  description?: string;
};

export type NavSubgroup = {
  heading: string;
  href?: string;
  items: NavDropdownItem[];
};

export type NavGroup = {
  label: string;
  href: string;
  external?: boolean;
  items?: NavDropdownItem[];
  subgroups?: NavSubgroup[];
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
