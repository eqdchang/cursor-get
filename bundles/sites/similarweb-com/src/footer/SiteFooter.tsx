import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

const SITE_BASE = "https://www.similarweb.com";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

type FooterSection = {
  heading: string;
  links: FooterLink[];
};

const COL_A_TOP: FooterSection = {
  heading: "Rankings",
  links: [
    { label: "Top Websites", href: "/top-websites/" },
    { label: "Top Android Apps", href: "/top-apps/google/" },
    { label: "Top iOS Apps", href: "/top-apps/apple/" },
    { label: "Top Amazon Products & Brands", href: "/top-amazon-brands/" },
    { label: "Digital 100", href: "/corp/digital-100/" },
    { label: "Mobile vs. Desktop", href: "/platforms/" },
  ],
};

const COL_A_BOTTOM: FooterSection = {
  heading: "Free Tools",
  links: [
    { label: "Website Traffic Checker", href: "/website/" },
    { label: "AI Traffic Checker", href: "/ai-traffic/" },
    { label: "Free App Analytics", href: "/app/" },
    { label: "Keyword Generator", href: "/generator/" },
    { label: "SERP Seismometer", href: "/serp/" },
  ],
};

const COL_B_TOP: FooterSection = {
  heading: "Solutions",
  links: [
    { label: "Web Intelligence", href: "/corp/web/" },
    { label: "App Intelligence", href: "/corp/apps/" },
    { label: "Retail Intelligence", href: "/corp/retail/" },
    { label: "Sales Intelligence", href: "/corp/sales/" },
    { label: "Stock Intelligence", href: "/corp/stocks/" },
    { label: "Data-as-a-Service", href: "/corp/daas/" },
    { label: "Advisory Services", href: "/corp/advisory-services/" },
    { label: "Custom Reporting", href: "/corp/custom-market-reports/" },
  ],
};

const COL_B_BOTTOM: FooterSection = {
  heading: "Data",
  links: [
    { label: "Our Data", href: "/corp/ourdata/" },
    { label: "Verify Your Website", href: "/connect/" },
    { label: "Browser Extension", href: "/corp/extension/" },
  ],
};

const COL_C: FooterSection = {
  heading: "Resources",
  links: [
    { label: "Blog", href: "/blog/" },
    { label: "Reports", href: "/corp/reports/" },
    { label: "Webinars", href: "/corp/webinars/" },
    { label: "Events", href: "/corp/events/" },
    {
      label: "Knowledge Center & Support",
      href: "https://support.similarweb.com/",
      external: true,
    },
    { label: "Insights", href: "/blog/insights/" },
  ],
};

const COL_D: FooterSection = {
  heading: "About us",
  links: [
    { label: "Company", href: "/corp/about/" },
    { label: "Partners", href: "/corp/partner-with-similarweb/" },
    { label: "Customers", href: "/corp/clients/" },
    { label: "Leadership", href: "/corp/leadership/" },
    { label: "Acquisitions", href: "/corp/about/acquisitions/" },
    { label: "Careers", href: "/corp/careers/" },
    {
      label: "Press",
      href: "https://ir.similarweb.com/news/press-releases",
      external: true,
    },
    {
      label: "Engineering",
      href: "https://medium.com/similarweb-engineering",
      external: true,
    },
    {
      label: "Pricing",
      href: "https://www.similarweb.com/packages/marketing/",
    },
    {
      label: "Investor Relations",
      href: "https://ir.similarweb.com",
      external: true,
    },
    { label: "Media Data Access", href: "/corp/about/press-data/" },
    { label: "Customer Reviews", href: "/corp/reviews/" },
  ],
};

type SocialItem = {
  name: string;
  href: string;
  icon: ReactNode;
};

const SOCIALS: SocialItem[] = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/Similarweb",
    icon: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7v-7h-2v-3h2V8.5A3.5 3.5 0 0 1 15.5 5H18v3h-2a1 1 0 0 0-1 1v2h3v3h-3v7h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "https://twitter.com/intent/user?screen_name=similarweb",
    icon: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M13.71 10.62 20.41 3h-1.59L13 9.613 8.36 3H3l7.03 10.008L3 21h1.59l6.14-6.985L15.64 21H21l-7.29-10.38Zm-2.17 2.47-.71-1.003L5.16 4.17h2.44l4.57 6.425.71 1.003 5.94 8.33h-2.44l-4.84-6.838Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/similarweb",
    icon: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21 5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5Zm-14 5h3v8H7v-8Zm1.5-1.25A1.25 1.25 0 1 1 8.5 6.25a1.25 1.25 0 0 1 0 2.5ZM17 18h-3v-4.4c0-1.1-1-1.2-1.3-1.2-.3 0-1.2.2-1.2 1.2V18h-3v-8h3v1c.4-.7 1.2-1 2.2-1 1.8 0 3.3 1.2 3.3 3.8V18Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UCVCI01HR6iB4AA4ChW08cvQ",
    icon: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="m10 15 5.19-3L10 9v6zm11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/similarwebinsights/",
    icon: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M12 9.3a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm0-1.8a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm5.85-.225a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0ZM12 4.8c-2.225 0-2.588.006-3.631.052-.712.034-1.189.129-1.632.302a2.62 2.62 0 0 0-.98.638c-.289.28-.467.562-.638.98-.174.444-.269.92-.302 1.632C4.772 9.45 4.8 9.794 4.8 12c0 2.225.006 2.588.052 3.631.034.712.129 1.189.302 1.631.156.394.339.676.637.974.303.302.585.485.972.636.45.174.927.27 1.636.303 1 .047 1.342.055 3.601.055 2.225 0 2.588-.006 3.631-.052.71-.034 1.188-.129 1.631-.301a2.64 2.64 0 0 0 .975-.636c.303-.303.486-.585.637-.972.174-.45.27-.928.302-1.636.047-1 .055-1.342.055-3.601 0-2.225-.006-2.588-.052-3.631-.034-.71-.13-1.19-.302-1.632a2.65 2.65 0 0 0-.637-.979 2.61 2.61 0 0 0-.98-.638c-.444-.174-.922-.269-1.632-.302C14.55 4.772 14.206 4.8 12 4.8Zm0-1.8c2.445 0 2.75.009 3.71.054.958.045 1.61.195 2.185.419a4.39 4.39 0 0 1 1.594 1.038 4.41 4.41 0 0 1 1.037 1.594c.222.573.374 1.227.42 2.184C20.991 9.25 21 9.555 21 12c0 2.445-.009 2.75-.054 3.71-.045.958-.198 1.611-.42 2.185a4.41 4.41 0 0 1-1.037 1.594 4.41 4.41 0 0 1-1.594 1.037c-.573.222-1.227.374-2.184.42-.96.042-1.265.054-3.71.054-2.446 0-2.75-.009-3.711-.054-.958-.046-1.61-.198-2.185-.42a4.41 4.41 0 0 1-1.594-1.037 4.41 4.41 0 0 1-1.037-1.594c-.222-.573-.374-1.227-.42-2.185C3.011 14.75 3 14.445 3 12c0-2.445.009-2.75.054-3.71.046-.96.198-1.61.42-2.185A4.41 4.41 0 0 1 4.511 4.51a4.4 4.4 0 0 1 1.594-1.037c.574-.224 1.226-.374 2.185-.42C9.25 3.012 9.555 3 12 3Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "WeChat",
    href: "https://mp.weixin.qq.com/s/dP9RRhIGCvDpdFh8hCKuww",
    icon: (
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M18.574 13.712a.894.894 0 0 1-.898-.898c0-.5.4-.899.898-.899.5 0 .898.4.898.899s-.399.898-.898.898Zm-4.426 0a.898.898 0 1 1 0-1.797.898.898 0 0 1 0 1.797Zm2.213 5.316c-3.38 0-6.12-2.316-6.12-5.175s2.74-5.175 6.12-5.175c3.38 0 6.12 2.316 6.12 5.175 0 1.576-.84 3-2.164 3.96l.49 1.637-1.843-.928c-.83.315-1.71.506-2.603.506Zm-7.12-3.3A5.65 5.65 0 0 1 9.118 12c0-3.45 3.33-6.24 7.43-6.24.257 0 .509.015.757.04C16.623 3.16 13.886 1 10.474 1 6.125 1 2.6 4.156 2.6 8.048c0 2.18 1.2 4.096 2.93 5.297L4.85 15.95l2.53-1.15c.263.1.536.187.812.263.02-.111.025-.224.049-.335Z"
        />
      </svg>
    ),
  },
];

const ADDITIONAL_LINKS: FooterLink[] = [
  { label: "Categories", href: "/category/" },
  { label: "Countries", href: "/country/" },
  { label: "Privacy", href: "/corp/legal/privacy-policy/" },
  { label: "Security", href: "/corp/privacy-security/" },
  { label: "Terms", href: "/corp/legal/terms/" },
  { label: "Equal Pay", href: "/corp/2025-report/" },
];

type OfficeItem = {
  city: string;
  address: string;
  mapHref?: string;
};

const OFFICES: OfficeItem[] = [
  {
    city: "Givatayim, Israel",
    address: "Derech Yitzhak Rabin 33, Givatayim, 5348303, Israel",
    mapHref: "https://goo.gl/maps/fCrvmzJo54qjBnrU9",
  },
  {
    city: "Burlington, US",
    address: "154 Middlesex Turnpike, Burlington, MA 01803, USA",
    mapHref: "https://maps.app.goo.gl/sF9xYEBRsEYmRh5K8",
  },
  {
    city: "New York, US",
    address: "6 E 32nd St, New York, NY 10016, 8 Floor",
    mapHref: "https://maps.app.goo.gl/bRdHcBbdvVRWnW1z6",
  },
  {
    city: "Sao Paulo, Brazil",
    address: "Rua Jaceru, 225 - Vila Gertrudes, São Paulo, Brazil, 04705-000",
    mapHref: "https://goo.gl/maps/Ln37ZizNgyku2vgJA",
  },
  {
    city: "Florianópolis, Brazil",
    address:
      "Rod. Admar Gonzaga, 440 Itacorubi - Florianópolis / SC 88034-000 - Brasil",
    mapHref: "https://goo.gl/maps/X9Z1MNwFPNfaYkPB9",
  },
  {
    city: "Chile",
    address:
      "Av Vitacura 2736, Las Condes, Región Metropolitana, Chile Floor 4",
    mapHref: "https://maps.app.goo.gl/gdWs3reDEp1W1yT86",
  },
  {
    city: "Prague, Czech Republic",
    address: "Boudníkova 2538/13, 180 00 Praha 8, Dock in Five",
    mapHref: "https://maps.app.goo.gl/XzsKwHsnhdeoShGU9",
  },
  {
    city: "Zürich, Switzerland",
    address: "Rötelstrasse 84, 8057 Zürich, Switzerland",
    mapHref: "https://maps.app.goo.gl/fnvQbADi5c4B7hUFA",
  },
  {
    city: "Munich, Germany",
    address:
      "SimilarWeb, Office 01-111, C/O WeWork, Neuturmstrasse 5, BY, 80331 Munich",
    mapHref:
      "https://www.google.com/maps/place/WeWork+-+Altstadt-Lehel/@48.1381045,11.5809333,15z",
  },
  {
    city: "Tokyo, JP",
    address:
      "Otemachi Building 2F, 1-6-1 Otemachi, Chiyoda-ku, Tokyo, 100-0004",
    mapHref: "https://goo.gl/maps/nJEUW65nmMn3YiXBA",
  },
  {
    city: "Singapore",
    address: "Asia Square Tower 2, 12 Marina View, #11-01, Singapore 018961",
    mapHref: "https://maps.app.goo.gl/ApPArjL7yfhvfdw98",
  },
  {
    city: "London, UK",
    address: "145 City Road- 8th Floor, London EC1V 1AZ",
    mapHref: "https://maps.app.goo.gl/J74WuxH9CTMRihZr6",
  },
];

type LanguageOption = { label: string; href: string };

const LANGUAGES: LanguageOption[] = [
  { label: "German", href: "/de/" },
  { label: "English", href: "/" },
  { label: "Spanish", href: "/es/" },
  { label: "French", href: "/fr/" },
  { label: "Italian", href: "/it/" },
  { label: "Japanese", href: "/ja/" },
  { label: "Portuguese", href: "/pt/" },
  { label: "Turkish", href: "/tr/" },
  { label: "Simplified Chinese", href: "/zh/" },
  { label: "Traditional Chinese", href: "/zh-tw/" },
  { label: "Russian", href: "/ru/" },
];

const EXTENSION_HREF =
  "https://chromewebstore.google.com/detail/similarweb-website-traffi/hoklmmgfnpapgjgcpechhaamimifchmp";

function abs(href: string): string {
  if (!href) return SITE_BASE + "/";
  if (/^https?:/i.test(href)) return href;
  if (href.startsWith("/")) return SITE_BASE + href;
  return SITE_BASE + "/" + href;
}

function isExternal(href: string, markedExternal?: boolean): boolean {
  if (markedExternal) return true;
  if (!/^https?:/i.test(href)) return false;
  try {
    const u = new URL(href);
    return u.hostname !== "www.similarweb.com";
  } catch {
    return false;
  }
}

function A({
  href,
  external,
  className,
  children,
  title,
}: {
  href: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
  title?: string;
}) {
  const finalHref = abs(href);
  const ext = isExternal(finalHref, external);
  return (
    <a
      href={finalHref}
      className={className}
      title={title}
      target={ext ? "_blank" : undefined}
      rel={ext ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

const LogoSvg = () => (
  <svg
    viewBox="0 0 181 23"
    width={181}
    height={23}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-white"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M46.746 2.521c.408.39.922.586 1.543.586.62 0 1.128-.196 1.518-.586.408-.393.614-.886.614-1.482s-.206-1.082-.614-1.454C49.417-.805 48.91-1 48.29-1c-.62 0-1.135.195-1.543.585-.39.372-.585.858-.585 1.454s.195 1.092.585 1.482zm-.344 2.497v14.628h3.774V5.018h-3.774zm7.253 0v14.631h3.774V12.1c0-1.336.305-2.379.915-3.127.627-.748 1.443-1.12 2.447-1.12 1.021 0 1.777.333 2.27 1.003.493.666.737 1.631.737 2.89v7.904h3.774V12.1c0-1.336.305-2.379.915-3.127.628-.748 1.454-1.12 2.476-1.12 1.003 0 1.74.333 2.213 1.003.492.666.737 1.631.737 2.89v7.897h3.774v-8.259c0-2.202-.51-3.872-1.532-5.014-1.022-1.138-2.487-1.71-4.395-1.71-1.06 0-2.042.238-2.947.71a5.72 5.72 0 0 0-2.124 1.918c-.943-1.748-2.547-2.624-4.806-2.624-1.021 0-1.926.217-2.713.65a5.081 5.081 0 0 0-1.858 1.68l-.323-1.975h-3.334zm29.192-1.911c-.62 0-1.135-.196-1.542-.586-.39-.39-.586-.886-.586-1.482s.195-1.082.586-1.454c.407-.39.922-.585 1.542-.585s1.128.195 1.518.585c.408.372.614.858.614 1.454s-.206 1.089-.614 1.482c-.39.39-.897.586-1.518.586zm-1.886 16.539V5.018h3.773v14.628h-3.773zM88.216-.876V19.65h3.774V-.876h-3.774zm13.488 20.877c-1.376 0-2.606-.334-3.685-1.004a7.177 7.177 0 0 1-2.564-2.741c-.628-1.16-.943-2.479-.943-3.95 0-1.472.315-2.784.943-3.923.628-1.16 1.486-2.064 2.564-2.713 1.082-.67 2.309-1.003 3.685-1.003 1.1 0 2.064.205 2.891.62A5.183 5.183 0 0 1 106.6 7.03V5.02h3.773v14.63h-3.362l-.411-2.095c-.472.649-1.1 1.22-1.887 1.709-.77.493-1.77.737-3.008.737zm.795-3.302c1.22 0 2.213-.404 2.979-1.21.787-.825 1.181-1.879 1.181-3.155 0-1.277-.394-2.32-1.181-3.128-.766-.826-1.759-1.238-2.979-1.238-1.199 0-2.192.405-2.98 1.21-.787.805-1.18 1.847-1.18 3.127 0 1.277.393 2.33 1.18 3.156.788.823 1.781 1.238 2.98 1.238zm11.256-11.681v14.628h3.774v-6.667c0-1.12.173-1.996.528-2.624.376-.628.887-1.071 1.536-1.326.649-.256 1.386-.383 2.213-.383h1.06l-1.06-3.628c-.77 0-1.582.135-2.181.5a6.014 6.014 0 0 0-2.153 2.241l-.355-2.741h-3.362zm14.842 14.631L124.32 5.021h3.745l2.536 10.53 2.947-10.53h4.189l2.947 10.53 2.568-10.53h3.745l-4.305 14.628h-3.923l-3.125-10.943-3.128 10.944h-3.919zm22.621-.592c1.142.628 2.447.944 3.922.944 1.178 0 2.231-.217 3.157-.65.943-.432 1.73-1.02 2.358-1.769a6.924 6.924 0 0 0 1.387-2.536h-3.834a3.302 3.302 0 0 1-1.181 1.359c-.514.333-1.153.5-1.919.5-1.021 0-1.897-.323-2.624-.972-.706-.649-1.1-1.543-1.178-2.684h11.115c.018-.256.029-.5.029-.738.021-.234.032-.461.032-.677 0-1.337-.316-2.547-.944-3.628a6.62 6.62 0 0 0-2.568-2.596c-1.099-.628-2.365-.943-3.802-.943-1.535 0-2.869.333-4.011 1.003-1.12.65-2.004 1.56-2.653 2.742-.627 1.177-.943 2.524-.943 4.039 0 1.493.323 2.808.972 3.95a6.829 6.829 0 0 0 2.685 2.656zm1.503-10.528c.706-.532 1.522-.798 2.447-.798.965 0 1.77.287 2.419.854.649.571 1 1.337 1.061 2.302h-7.285c.199-1.06.649-1.848 1.358-2.358zM173.329 20c-1.103 0-2.065-.206-2.891-.62a5.182 5.182 0 0 1-2.004-1.742l-.415 2.007h-3.362V-.876h3.774v7.99c.471-.649 1.092-1.22 1.858-1.71.787-.492 1.798-.737 3.036-.737 1.376 0 2.603.333 3.685 1.004a7.177 7.177 0 0 1 2.564 2.74c.628 1.16.944 2.48.944 3.951 0 1.472-.316 2.791-.944 3.95a7.2 7.2 0 0 1-2.564 2.714c-1.075.652-2.305.975-3.681.975zm-.795-3.302c1.199 0 2.192-.404 2.979-1.209.788-.805 1.181-1.848 1.181-3.128 0-1.276-.393-2.33-1.181-3.156-.787-.826-1.777-1.237-2.979-1.237-1.22 0-2.22.41-3.007 1.237-.766.805-1.149 1.848-1.149 3.128 0 1.277.383 2.33 1.149 3.156.783.805 1.787 1.21 3.007 1.21zM41.25 11.564c.865.277 1.553.699 2.064 1.27.51.553.766 1.347.77 2.39a4.11 4.11 0 0 1-.71 2.447c-.493.727-1.199 1.298-2.124 1.709-.926.415-2.015.62-3.274.62-1.298 0-2.44-.209-3.422-.62-.983-.433-1.77-1.021-2.359-1.77a5.021 5.021 0 0 1-.965-2.046l3.416-.525c.124.273.6.972 1.106 1.334.037.034.074.065.113.098l.019.015c.532.394 1.209.589 2.035.589.827 0 1.426-.167 1.799-.5.393-.333.588-.716.588-1.15 0-.63-.276-1.052-.826-1.269-.553-.234-1.32-.46-2.302-.677a24.653 24.653 0 0 1-1.915-.5 9.98 9.98 0 0 1-1.798-.738 4.167 4.167 0 0 1-1.298-1.18c-.334-.49-.5-1.09-.5-1.798 0-1.298.51-2.387 1.532-3.274 1.043-.883 2.497-1.326 4.366-1.326 1.73 0 3.107.404 4.128 1.21a4.713 4.713 0 0 1 1.663 2.44l-3.153.78-.003-.015s-.415-.798-1.089-1.149c-.397-.23-.922-.347-1.575-.347-.709 0-1.259.134-1.652.411-.373.277-.56.62-.56 1.032 0 .433.287.777.854 1.032.568.255 1.326.493 2.27.71 1.021.237 1.958.503 2.802.797zM22.488 5.536c-1.305-1.996-3.195-3.663-5.363-4.51l-.641-.213a7.702 7.702 0 0 0-2.189-.33 4.267 4.267 0 0 0-3.365 6.862l-.266-.34c.127.184.266.368.425.552.674.802 1.632 1.632 2.873 2.575 3.05 2.316 5.03 4.369 5.192 6.915.04.344.064.695.064 1.05 0 1.294-.287 2.663-.777 3.627h.004s-.21.376-.078.486c.067.057.213.1.468-.053a12.207 12.207 0 0 0 3.462-3.323 11.923 11.923 0 0 0 2.124-6.62 11.898 11.898 0 0 0-1.933-6.678zM11.32 12.688l1.912 1.546a4.813 4.813 0 0 1 1.922 3.862 4.835 4.835 0 0 1-3.014 4.483h-.004s-3.621 1.602-7.842-1.444h.004a9.466 9.466 0 0 1-2.192-2.163 11.91 11.91 0 0 1 .784-14.54 12.132 12.132 0 0 1 3.529-2.819c.617-.287.333.295.333.295v.003c-.145.33-.273.667-.376 1.015-1.142 3.808.94 6.897 4.944 9.762z"
      fill="currentColor"
    />
  </svg>
);

function Column({ section }: { section: FooterSection }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-white text-[16px] font-medium">{section.heading}</h3>
      <ul className="flex flex-col gap-2">
        {section.links.map((l) => (
          <li key={l.href + l.label}>
            <A
              href={l.href}
              external={l.external}
              className="text-[14px] font-normal text-white/60 hover:text-white transition-colors no-underline"
            >
              {l.label}
            </A>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileAccordion({
  section,
  open,
  onToggle,
}: {
  section: FooterSection;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/[0.12]">
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="flex items-center justify-between w-full py-4 text-left text-white text-[16px] font-medium"
      >
        <span>{section.heading}</span>
        <ChevronDown
          className={`transition-transform duration-200 text-white/70 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul className="flex flex-col gap-3 pb-4 text-left">
          {section.links.map((l) => (
            <li key={l.href + l.label} className="text-left">
              <A
                href={l.href}
                external={l.external}
                className="block text-left text-[14px] font-normal text-white/60 hover:text-white transition-colors no-underline"
              >
                {l.label}
              </A>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MobileOfficesAccordion({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/[0.12]">
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="flex items-center justify-between w-full py-4 text-left text-white text-[16px] font-medium"
      >
        <span>Our Offices</span>
        <ChevronDown
          className={`transition-transform duration-200 text-white/70 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul className="flex flex-col gap-5 pb-4">
          {OFFICES.map((o) => (
            <li key={o.city} className="flex flex-col gap-2">
              <div className="text-white text-[14px] font-medium">{o.city}</div>
              <div className="border-t border-white/[0.12] pt-2 text-white/60 text-[14px] flex flex-col gap-2">
                <p className="relative pl-7">
                  <MapPinSmallIcon />
                  <a
                    href={o.mapHref || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-inherit hover:text-white no-underline transition-colors"
                  >
                    {o.address}
                  </a>
                </p>
                {o.mapHref && (
                  <p className="relative pl-7">
                    <ExternalLinkSmallIcon />
                    <a
                      href={o.mapHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-inherit hover:text-white no-underline transition-colors"
                    >
                      Open map
                    </a>
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const LocationPinIcon = () => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="shrink-0"
  >
    <path
      fill="currentColor"
      d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 13s-4-3.597-4-5.875S7.79 5 10 5s4 1.847 4 4.125S10 15 10 15zm.472-3.374c.452-.535.828-1.045 1.101-1.503.292-.489.427-.858.427-.998C12 7.938 11.09 7 10 7c-1.09 0-2 .938-2 2.125 0 .14.135.51.427.998.273.458.649.968 1.1 1.503.154.181.312.361.473.538.161-.177.319-.357.472-.538z"
    />
  </svg>
);

const ChromeExtensionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.998 2.804A5.986 5.986 0 0 0 3.275 4.31L5.06 7.407A3 3 0 0 1 8 5h5.19a5.985 5.985 0 0 0-2.192-2.196ZM2.802 5a5.993 5.993 0 0 0 4.364 8.932l1.802-3.105C8.66 10.932 8.338 11 8 11a2.968 2.968 0 0 1-2.586-1.5h-.008L2.802 5Zm7.793 4.5L8 14a6 6 0 0 0 6-6c0-.772-.15-1.536-.441-2.25H9.965A2.976 2.976 0 0 1 11 8a3.015 3.015 0 0 1-.412 1.5h.007ZM10.25 8a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
    />
  </svg>
);

const ChevronDown = ({ className }: { className?: string }) => (
  <svg
    width={12}
    height={12}
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    <path
      d="m3 4.5 3 3 3-3"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MapPinSmallIcon = () => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="absolute left-0 top-[4px] w-4 h-4 shrink-0"
  >
    <path
      fill="currentColor"
      d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 13s-4-3.597-4-5.875S7.79 5 10 5s4 1.847 4 4.125S10 15 10 15zm.472-3.374c.452-.535.828-1.045 1.101-1.503.292-.489.427-.858.427-.998C12 7.938 11.09 7 10 7c-1.09 0-2 .938-2 2.125 0 .14.135.51.427.998.273.458.649.968 1.1 1.503.154.181.312.361.473.538.161-.177.319-.357.472-.538z"
    />
  </svg>
);

const ExternalLinkSmallIcon = () => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="absolute left-0 top-[4px] w-4 h-4 shrink-0"
  >
    <path
      fill="currentColor"
      d="M12.04 12.04H3.254V3.254h4.392V2h-4.39C2.556 2 2 2.565 2 3.255v8.784c0 .69.558 1.253 1.255 1.253h8.784c.69 0 1.253-.565 1.253-1.255V7.646H12.04v4.394zM8.9 2v1.255h2.254L4.987 9.423l.884.884 6.17-6.167v2.252h1.256V2H8.9z"
    />
  </svg>
);

function OfficesDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref}>
      <button
        type="button"
        className="flex items-center py-4 text-[14px] font-black text-white/60 hover:text-white transition-colors w-full"
        onClick={toggle}
        aria-expanded={open}
      >
        <span>See all Similarweb offices</span>
        <span
          className={`ml-4 inline-block w-[6px] h-[6px] border-r-[2px] border-b-[2px] border-current transition-transform duration-300 ${
            open ? "-mt-[3px] -rotate-[135deg]" : "-mt-[6px] rotate-45"
          }`}
        />
      </button>
      {open && (
        <ul className="flex flex-wrap -m-3">
          {OFFICES.map((o) => (
            <li
              key={o.city}
              className="box-border w-full sm:w-1/2 lg:w-1/4 px-3 py-4"
            >
              <div className="text-white text-[14px] font-normal pb-2.5 leading-none">
                {o.city}
              </div>
              <div className="border-t border-white/[0.18] pt-2 text-white/60 text-[14px]">
                <p className="relative pl-7 mt-2">
                  <MapPinSmallIcon />
                  <a
                    href={o.mapHref || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-inherit hover:text-white no-underline transition-colors"
                  >
                    {o.address}
                  </a>
                </p>
                {o.mapHref && (
                  <p className="relative pl-7 mt-2">
                    <ExternalLinkSmallIcon />
                    <a
                      href={o.mapHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-inherit hover:text-white no-underline transition-colors"
                    >
                      Open map
                    </a>
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function LanguageDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative mr-5">
      <button
        type="button"
        className="relative pr-6 text-[14px] font-normal text-white"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={toggle}
      >
        English
        <span
          className={`absolute top-1/2 right-[7px] -mt-[3px] inline-block w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-current transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <ul
          className="absolute bottom-[calc(100%+14px)] left-0 bg-white rounded py-2 min-w-[120px] z-10"
          style={{ boxShadow: "0 2px 10px 0 rgba(0,0,0,.3)" }}
          role="menu"
        >
          {LANGUAGES.map((l) => (
            <li key={l.href} role="none">
              <A
                href={l.href}
                className="block px-4 py-2 text-[14px] text-[#092540]/60 hover:text-[#092540] no-underline whitespace-nowrap transition-colors"
              >
                {l.label}
              </A>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const MOBILE_ACCORDION_SECTIONS: FooterSection[] = [
  COL_A_TOP,
  COL_A_BOTTOM,
  COL_B_TOP,
  COL_B_BOTTOM,
  COL_C,
  COL_D,
];

function MobileFooter() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [officesOpen, setOfficesOpen] = useState(false);
  return (
    <div className="flex flex-col">
      <A href="/" className="inline-flex items-center mb-2">
        <LogoSvg />
        <span className="sr-only">Similarweb Home</span>
      </A>
      <div className="mt-6 flex flex-col">
        {MOBILE_ACCORDION_SECTIONS.map((sec, i) => (
          <MobileAccordion
            key={sec.heading}
            section={sec}
            open={openIdx === i}
            onToggle={() => setOpenIdx((prev) => (prev === i ? null : i))}
          />
        ))}
        <MobileOfficesAccordion
          open={officesOpen}
          onToggle={() => setOfficesOpen((v) => !v)}
        />
      </div>

      <div className="mt-6 flex items-center gap-3">
        <span className="text-white text-[14px] font-medium">
          Follow us on:
        </span>
        <ul className="flex items-center gap-4">
          {SOCIALS.map((s) => (
            <li key={s.name}>
              <A
                href={s.href}
                external
                title={s.name}
                className="inline-flex items-center justify-center w-6 h-6 text-white/60 hover:text-white transition-colors"
              >
                {s.icon}
                <span className="sr-only">{s.name}</span>
              </A>
            </li>
          ))}
        </ul>
      </div>

      <A
        href="https://maps.app.goo.gl/bRdHcBbdvVRWnW1z6"
        external
        className="mt-5 inline-flex items-start gap-2 text-[14px] font-normal text-white/60 hover:text-white transition-colors leading-relaxed"
      >
        <LocationPinIcon />
        <span>6 E 32nd St, New York, NY 10016, 8 Floor</span>
      </A>

      <a
        href={EXTENSION_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 self-start inline-flex items-center justify-center gap-2 px-4 py-3 rounded-[2.625rem] bg-[#195afe] text-[14px] font-bold text-white hover:bg-[#1048d4] transition-colors no-underline tracking-[0.03em]"
        style={{ fontFamily: '"DM Sans", "Noto Sans JP", sans-serif' }}
      >
        <ChromeExtensionIcon />
        <span>Get our free extension</span>
      </a>

      <div className="mt-8 border-t border-white/[0.18] pt-6 flex flex-col gap-5">
        <LanguageDropdown />
        <ul className="flex flex-row flex-wrap gap-x-5 gap-y-2">
          {ADDITIONAL_LINKS.map((l) => (
            <li key={l.href + l.label}>
              <A
                href={l.href}
                external={l.external}
                className="text-[14px] font-normal text-white/60 hover:text-white transition-colors"
              >
                {l.label}
              </A>
            </li>
          ))}
          <li>
            <button
              type="button"
              className="text-[14px] font-normal text-white/60 hover:text-white transition-colors bg-transparent p-0"
            >
              Manage Cookies
            </button>
          </li>
          <li>
            <button
              type="button"
              className="text-[14px] font-normal text-white/60 hover:text-white transition-colors bg-transparent p-0"
            >
              Accessibility Menu
            </button>
          </li>
        </ul>
        <p className="text-[14px] font-normal text-white mt-2">
          © Similarweb LTD 2026 All Rights Reserved
        </p>
      </div>
    </div>
  );
}

function DesktopFooter() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[minmax(220px,300px)_1fr_1fr_1fr_1fr] gap-10 lg:gap-8">
        <div className="flex flex-col gap-6">
          <A href="/" className="inline-flex items-center">
            <LogoSvg />
            <span className="sr-only">Similarweb Home</span>
          </A>
          <div className="flex flex-col gap-3">
            <div className="text-[14px] font-medium text-white">
              Follow us on:
            </div>
            <ul className="flex items-center gap-4">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <A
                    href={s.href}
                    external
                    title={s.name}
                    className="inline-flex items-center justify-center w-6 h-6 text-white/60 hover:text-white transition-colors"
                  >
                    {s.icon}
                    <span className="sr-only">{s.name}</span>
                  </A>
                </li>
              ))}
            </ul>
          </div>
          <A
            href="https://maps.app.goo.gl/bRdHcBbdvVRWnW1z6"
            external
            className="inline-flex items-start gap-2 text-[14px] font-normal text-white/60 hover:text-white transition-colors leading-relaxed"
          >
            <LocationPinIcon />
            <span>
              6 E 32nd St, New York,
              <br />
              NY 10016, 8 Floor
            </span>
          </A>
          <a
            href={EXTENSION_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-[2.625rem] bg-[#195afe] text-[14px] font-bold text-white hover:bg-[#1048d4] transition-colors no-underline tracking-[0.03em]"
            style={{ fontFamily: '"DM Sans", "Noto Sans JP", sans-serif' }}
          >
            <ChromeExtensionIcon />
            <span>Get our free extension</span>
          </a>
        </div>

        <div className="flex flex-col gap-10">
          <Column section={COL_A_TOP} />
          <Column section={COL_A_BOTTOM} />
        </div>

        <div className="flex flex-col gap-10">
          <Column section={COL_B_TOP} />
          <Column section={COL_B_BOTTOM} />
        </div>

        <Column section={COL_C} />
        <Column section={COL_D} />
      </div>

      <div className="mt-16">
        <div className="border-t border-white/[0.18]">
          <OfficesDropdown />
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-6 flex-wrap">
          <LanguageDropdown />
          <ul className="flex items-center gap-5 flex-wrap">
            {ADDITIONAL_LINKS.map((l) => (
              <li key={l.href + l.label}>
                <A
                  href={l.href}
                  external={l.external}
                  className="text-[14px] font-normal text-white/60 hover:text-white transition-colors"
                >
                  {l.label}
                </A>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="text-[14px] font-normal text-white/60 hover:text-white transition-colors bg-transparent p-0"
              >
                Manage Cookies
              </button>
            </li>
            <li>
              <button
                type="button"
                className="text-[14px] font-normal text-white/60 hover:text-white transition-colors bg-transparent p-0"
              >
                Accessibility Menu
              </button>
            </li>
          </ul>
        </div>
        <p className="text-[14px] font-normal text-white">
          © Similarweb LTD 2026 All Rights Reserved
        </p>
      </div>
    </>
  );
}

export function SiteFooter() {
  return (
    <div className="bw-scope">
      <footer className="bg-[#000921] text-white/60">
        <div className="mx-auto max-w-[1248px] px-6 pt-16 pb-12">
          <div className="block lg:hidden">
            <MobileFooter />
          </div>
          <div className="hidden lg:block">
            <DesktopFooter />
          </div>
        </div>
      </footer>
    </div>
  );
}
