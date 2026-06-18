import type { NavGroup } from "../types";

/**
 * Single source of truth for the Byrna header content.
 *
 * Imported by BOTH the interactive bundle (`SiteHeader.tsx`) and the raw-mode
 * static render (`raw/header.static.tsx`) so copy/links are never duplicated.
 */
export const SITE_BASE = "https://byrna.com";

export const LOGO_SRC =
  "https://byrna.com/cdn/shop/files/Byrna-Logo.jpg?v=1688423395&width=600";

/** Product-quiz tile shown as the last column of the Shop mega panel. */
export const SHOP_CARD_IMG =
  "https://byrna.com/cdn/shop/files/QuestionMark-Icon_1.png?v=1776809952&width=500";

const img = (file: string) => `https://byrna.com/cdn/shop/files/${file}`;

/** Top geo/region switcher bar (black bar above the nav). */
export const GEO_REGIONS = [
  { label: "US", flag: "\u{1F1FA}\u{1F1F8}", href: "https://byrna.com/", active: true },
  { label: "CA", flag: "\u{1F1E8}\u{1F1E6}", href: "https://byrna.ca/", active: false },
  { label: "LE", flag: "\u{1F6E1}", href: "https://le.byrna.com/", active: false },
];

/** Social icons shown on the right of the top geo bar AND at the bottom of the mobile drawer. */
export const HEADER_SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/byrnanation" },
  { label: "Instagram", href: "https://www.instagram.com/byrnanation" },
  { label: "Twitter", href: "https://twitter.com/byrnanation" },
  { label: "Youtube", href: "https://www.youtube.com/channel/UCsd__wC1miuRs0Q8uAttc6Q" },
];

/** Orange announcement bar copy. */
export const ANNOUNCEMENT = "FREE SHIPPING ON ALL ORDERS OVER $100 *";

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Shop",
    href: `${SITE_BASE}/collections/all-byrna-products`,
    columns: [
      {
        heading: "Less-Lethal Pistols",
        items: [
          {
            label: "Byrna CL-XL",
            href: `${SITE_BASE}/products/byrna-clxl-launcher-universal-kit`,
            img: img("Byrna_CL-XL_Orange_-_Right_transparent.png?v=1779472691&width=64"),
            badge: "New",
          },
          {
            label: "Byrna CL",
            href: `${SITE_BASE}/products/byrna-compact-launcher-universal-kit`,
            img: img("Byrna_CL_Orange_-_Right_transparent.png?v=1779471752&width=64"),
          },
          {
            label: "Byrna SD",
            href: `${SITE_BASE}/products/byrna-sd-non-lethal-self-defense-pistol`,
            img: img("Byrna_SD_Orange_-_Right_transparent.png?v=1779470435&width=64"),
            badge: "Best Seller",
          },
          {
            label: "Byrna LE",
            href: `${SITE_BASE}/products/le-kit`,
            img: img("Byrna_LE_Orange_-_Right_transparent.png?v=1779471052&width=64"),
          },
          {
            label: "Compare Pistols",
            href: `${SITE_BASE}/collections/byrna-non-lethal-guns`,
            img: img("4-Launchers_99.png?v=1773936015&width=64"),
          },
        ],
      },
      {
        heading: "Less-Lethal Rifles",
        items: [
          {
            label: "Byrna Mission 4",
            href: `${SITE_BASE}/products/mission-4-kit`,
            img: img("Mission_4.jpg?v=1693507222&width=64"),
          },
          {
            label: "Byrna TCR",
            href: `${SITE_BASE}/products/byrna-tcr`,
            img: img("TCR.jpg?v=1693507204&width=64"),
          },
          {
            label: "Compare Rifles",
            href: `${SITE_BASE}/collections/less-lethal-self-defense-rifles`,
            img: img("Byrna_Mission_4.svg?v=1683164330&width=64"),
          },
        ],
      },
      {
        heading: "Projectiles, CO2 & Accessories",
        items: [
          {
            label: "Projectiles",
            href: `${SITE_BASE}/collections/ammo-and-projectiles`,
            items: [
              {
                label: ".61 Caliber for CL-XL & CL",
                href: `${SITE_BASE}/collections/61-projectiles`,
              },
              {
                label: ".68 Caliber for SD, LE, Mission 4, TCR",
                href: `${SITE_BASE}/collections/ammo-and-projectiles`,
              },
              {
                label: "12 Gauge Kinetic",
                href: `${SITE_BASE}/products/less-lethal-12-gauge-round-10ct`,
              },
            ],
          },
          {
            label: "Shop CO2 by Launcher",
            href: `${SITE_BASE}/collections/byrna-co2`,
          },
          {
            label: "Shop Accessories By Launcher",
            href: `${SITE_BASE}/collections/accessories`,
          },
        ],
      },
      {
        heading: "Personal Defense",
        items: [
          { label: "Byrna Duo", href: `${SITE_BASE}/products/byrna-duo` },
          {
            label: "Byrna Banshee",
            href: `${SITE_BASE}/products/byrna-banshee-personal-safety-alarm`,
          },
          {
            label: "Defense Sprays",
            href: `${SITE_BASE}/collections/bgr-max-pepper-spray`,
          },
          {
            label: "Byrna Ballistipac",
            href: `${SITE_BASE}/collections/backpack-body-armor`,
          },
        ],
      },
    ],
    card: {
      href: `${SITE_BASE}/pages/byrna-product-quiz`,
      img: SHOP_CARD_IMG,
      alt: "Take the Byrna product quiz",
    },
  },
  {
    label: "Find a Store",
    href: `${SITE_BASE}/pages/dealer-locator`,
  },
  {
    label: "Why Byrna",
    href: `${SITE_BASE}/pages/about`,
    columns: [
      {
        heading: "About",
        items: [
          { label: "Our Mission", href: `${SITE_BASE}/pages/about` },
          {
            label: "Our Technology",
            href: `${SITE_BASE}/pages/byrna-technology`,
          },
        ],
      },
      {
        heading: "Product",
        items: [
          {
            label: "Product Catalog",
            href: `${SITE_BASE}/pages/2026-product-catalog`,
          },
        ],
      },
      {
        heading: "Media & Investors",
        items: [
          { label: "Media", href: `${SITE_BASE}/blogs/media` },
          { label: "Investors", href: "https://ir.byrna.com/", external: true },
          {
            label: "NASDAQ: BYRN",
            href: "https://ir.byrna.com/quote",
            external: true,
          },
        ],
      },
    ],
  },
  {
    label: "Learn",
    href: `${SITE_BASE}/blogs/byrna-nation`,
    columns: [
      {
        heading: "Tips & Drills",
        href: `${SITE_BASE}/blogs/byrna-nation/tagged/tips-and-drills`,
        items: [],
      },
      {
        heading: "Real Stories",
        href: `${SITE_BASE}/blogs/byrna-nation/tagged/real-stories-hub`,
        items: [],
      },
      {
        heading: "Product Guides",
        href: `${SITE_BASE}/blogs/byrna-nation/tagged/product-guides`,
        items: [],
      },
    ],
  },
  {
    label: "Support",
    href: `${SITE_BASE}/pages/contact-us`,
    columns: [
      {
        heading: "Customer Help",
        items: [
          { label: "Customer Service", href: `${SITE_BASE}/pages/contact-us` },
          { label: "Order Status", href: `${SITE_BASE}/pages/order-status` },
          {
            label: "Warranty & Registration",
            href: "https://care.byrna.com/register",
            external: true,
          },
          {
            label: "Service & Returns",
            href: "https://care.byrna.com/rma",
            external: true,
          },
        ],
      },
      {
        heading: "Business & Partnerships",
        items: [
          {
            label: "Become a Dealer",
            href: `${SITE_BASE}/pages/dealer-sales-inquiries`,
          },
        ],
      },
      {
        heading: "Press",
        items: [
          {
            label: "Media Inquiries",
            href: `${SITE_BASE}/pages/media-inquiries`,
          },
        ],
      },
    ],
  },
];

export function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href) && !href.startsWith(SITE_BASE);
}
