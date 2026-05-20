import type { LocationRegion, NavGroup } from "../types";

const ASSET = "https://www.barings.com";

export const LINK_HOME = "/en-us/guest";
export const LINK_CLIENT_PORTAL = "https://cap.barings.com/";

export const NAV: NavGroup[] = [
  {
    label: "About",
    aria: "menu-about",
    options: [
      {
        label: "About",
        img: ASSET + "/globalassets/2-assets/navigation-top/about/who-we-are.jpg?t=20211208051947",
        title: "Who We Are",
        copy: "A global alternative asset manager with expertise across credit, real assets, capital solutions and emerging markets.",
        ctaHref: "/en-us/guest/about/who-we-are",
        ctaText: "Learn More",
      },
      {
        label: "History",
        img: ASSET + "/globalassets/2-assets/navigation-top/about/history.jpg?t=20211208051947",
        title: "Our History",
        copy: "Throughout history, Barings has been a leader in providing global, innovative, diversified solutions to clients. This mission continues to drive the firm today.",
        ctaHref: "/en-us/guest/about/our-history",
        ctaText: "Learn More",
      },
      {
        label: "Leadership",
        img: ASSET + "/globalassets/2-assets/navigation-top/about/our-leadership.jpg?t=20211208051947",
        title: "Our Leadership",
        copy: "Grounded in shared values and a team-based culture, we strive to improve everyday—to innovate, to adapt, and to evolve in service to our clients.",
        ctaHref: "/en-us/guest/about/our-leadership",
        ctaText: "Learn More",
      },
      {
        label: "Careers",
        cards: [
          {
            label: "I Am A Professional",
            img: ASSET + "/globalassets/2-assets/about/careers/careers.jpg?t=20250625024309",
            imgAlt: "Teammates gathered in a meeting room in Barings headquarters office in Charlotte.",
            href: "/en-us/guest/about/careers/professional",
          },
          {
            label: "I Am A Student",
            img: ASSET + "/globalassets/2-assets/perspectives/viewpoints/articles/2023/09-september/early-career-journeys.jpg?t=20230927043713",
            href: "/en-us/guest/about/careers/student",
          },
          {
            label: "Inclusion & Experience",
            img: ASSET + "/globalassets/2-assets/about/dei-inclusion--experience/inclusion-and-experience.jpg?t=20250612062112",
            href: "/en-us/guest/about/careers/inclusion-experience",
          },
        ],
      },
      {
        label: "Industry Partnerships & Events",
        img: ASSET + "/globalassets/2-assets/about/industry-partnerships--events/industry-partnerships-events.jpg?t=20250401085601",
        title: "Industry Partnerships & Events",
        copy: "Our industry collaborations and exclusive events foster thought leadership, innovation, and lasting relationships.",
        ctaHref: "/en-us/guest/about/industry-partnerships",
        ctaText: "Learn More",
      },
    ],
  },
  {
    label: "Strategies",
    aria: "menu-strategies",
    options: [
      {
        label: "Public Fixed Income",
        img: ASSET + "/globalassets/2-assets/navigation-top/strategies/public-fixed-income.jpg?t=20211208052256",
        title: "Public Fixed Income",
        copy: "Our broad capabilities allow us to go beyond traditional fixed income strategies and access investments spanning the quality, yield and liquidity spectrum.",
        ctaHref: "/en-us/guest/strategies/public-fixed-income",
        ctaText: "Learn More",
        assetClass: {
          title: "Asset Class",
          links: [
            { label: "Global High Yield & CLOs", href: "/en-us/guest/strategies/public-fixed-income/high-yield" },
            { label: "Emerging Markets Debt", href: "/en-us/guest/strategies/public-fixed-income/emerging-markets-debt" },
            { label: "Investment Grade", href: "/en-us/guest/strategies/public-fixed-income/investment-grade" },
          ],
        },
      },
      {
        label: "Public Equities",
        img: ASSET + "/globalassets/2-assets/strategies/public-equities/public-equities.jpg?t=20211208052817",
        title: "Public Equities",
        copy: "Our experienced team constructs growth at reasonable price portfolios (GARP), utilizing bottom-up research in an effort to identify attractive investment opportunities over a long-term horizon. Assessing risks and opportunities, identifying positive change and integrating ESG factors are core components of our investment process.",
        ctaHref: "/en-us/guest/strategies/public-equities",
        ctaText: "Learn More",
        assetClass: {
          title: "Asset Class",
          links: [
            { label: "Emerging Markets Equity", href: "/en-us/guest/strategies/public-equities/emerging-markets-equity" },
            { label: "Small & Mid Cap Equity", href: "/en-us/guest/strategies/public-equities/small-and-mid-cap-equity" },
            { label: "Global & International Equities", href: "/en-us/guest/strategies/public-equities/global-and-international-equities" },
          ],
        },
      },
      {
        label: "Private Credit",
        img: ASSET + "/contentassets/50506c85404a433f8bc7cc7ed4e4276f/private-credit.jpg?t=20211109071331",
        title: "Private Credit",
        copy: "Our global presence and longstanding expertise allows us to evaluate and capture the yield potential of illiquid and less liquid credit-based investments.",
        ctaHref: "/en-us/guest/strategies/private-credit",
        ctaText: "Learn More",
        assetClass: {
          title: "Asset Class",
          links: [
            { label: "Global Direct Lending", href: "/en-us/guest/strategies/private-credit/global-direct-lending" },
            { label: "Capital Solutions", href: "/en-us/guest/strategies/private-credit/capital-solutions" },
            { label: "Global Infrastructure", href: "/en-us/guest/strategies/private-credit/global-infrastructure" },
            { label: "Corporate Private Placements", href: "/en-us/guest/strategies/private-credit/private-placements" },
          ],
        },
      },
      {
        label: "Asset-Based Solutions",
        img: ASSET + "/globalassets/2-assets/strategies/asset-based-solutions/asset-based-solutions.jpeg?t=20260205042447",
        imgAlt: "A close-up view of a glass facade of a modern skyscraper. The reflective glass panels create a complex pattern of lines and reflections.",
        title: "Asset-Based Solutions",
        copy: "Our platform combines global origination capabilities with deep public and private market expertise to capture relative value and deliver compelling risk-adjusted returns.",
        ctaHref: "/en-us/guest/strategies/asset-based-solutions",
        ctaText: "Learn More",
      },
      {
        label: "Portfolio Finance",
        img: ASSET + "/globalassets/2-assets/strategies/portfolio-finance/portfolio-finance.jpg?t=20240124093748",
        title: "Portfolio Finance",
        copy: "We directly originate secured portfolio financings through our relationships with asset managers. As credit investors, we are focused on capital preservation, enabling us to deliver the potential for consistent, strong relative value over time.",
        ctaHref: "/en-us/guest/strategies/portfolio-finance",
        ctaText: "Learn More",
      },
      {
        label: "Real Estate",
        img: ASSET + "/globalassets/2-assets/strategies/real-estate/real-estate.jpg?t=20211208052911",
        title: "Real Estate",
        copy: "Our team secures access to investments across the risk spectrum and around the globe, applying an active management approach designed to maximize each asset's potential.",
        ctaHref: "/en-us/guest/strategies/real-estate",
        ctaText: "Learn More",
        assetClass: {
          title: "Asset Class",
          links: [
            { label: "Global Real Estate Debt", href: "/en-us/guest/strategies/real-estate/real-estate-debt" },
            { label: "Global Real Estate Equity", href: "/en-us/guest/strategies/real-estate/real-estate-equity" },
          ],
        },
      },
      {
        label: "Private Equity",
        img: ASSET + "/globalassets/2-assets/strategies/private-equity/private-equity.jpg?t=20251009074712",
        title: "Private Equity",
        copy: "Our experienced team seeks differentiated sources of return across private equity, real assets and asset-based investments.",
        ctaHref: "/en-us/guest/strategies/private-equity",
        ctaText: "Learn More",
        assetClass: {
          title: "Asset Class",
          links: [
            { label: "Private Equity Solutions", href: "/en-us/guest/strategies/private-equity/private-equity-solutions" },
          ],
        },
      },
      {
        label: "Insurance Solutions",
        img: ASSET + "/globalassets/2-assets/strategies/insurance-solutions/insurance-solutions.jpg?t=20211208052416",
        title: "Insurance Solutions",
        copy: "Barings\u2019 Insurance Solutions group develops customized solutions leveraging the firm\u2019s experience and capabilities across public and private asset classes.",
        ctaHref: "/en-us/guest/strategies/insurance-solutions",
        ctaText: "Learn More",
      },
    ],
  },
  {
    label: "Funds",
    aria: "menu-funds",
    options: [
      {
        label: "Closed End Funds",
        cards: [
          {
            label: "Barings Global Short Duration High Yield Fund",
            img: ASSET + "/globalassets/2-assets/funds/us/closed-end-funds.jpg?t=20211208051507",
            href: "/en-us/guest/funds/us-closed-end-funds/barings-global-short-duration-high-yield-fund",
          },
          {
            label: "Barings Participation Investors",
            img: ASSET + "/globalassets/2-assets/funds/us/barings-participation-investors.jpg?t=20251202095357",
            href: "/en-us/guest/funds/us-closed-end-funds/barings-participation-investors",
          },
          {
            label: "Barings Corporate Investors",
            img: ASSET + "/globalassets/2-assets/funds/us/barings-corporate-investors.jpg?t=20251202095357",
            href: "/en-us/guest/funds/us-closed-end-funds/barings-corporate-investors",
          },
        ],
      },
      {
        label: "Business Development Companies",
        cards: [
          {
            label: "Business Development Companies",
            img: ASSET + "/globalassets/archive/image-or-video-content/business-development-companies.jpg?t=20211207071203",
            href: "/en-us/guest/funds/business-development-companies/barings-bdc",
          },
          {
            label: "BPCC Client Portal",
            img: ASSET + "/globalassets/2-assets/funds/us/client-investor-portal.jpg?t=20220519054215",
            href: "/en-us/guest/funds/business-development-companies/client-portal",
          },
        ],
      },
      {
        label: "Mutual Funds",
        img: ASSET + "/globalassets/2-assets/navigation-top/funds/us-mutual-funds.jpg?t=20211216024607",
        title: "Mutual Funds",
        copy: "Barings subadvises a series of mutual funds for MassMutual Funds. The link below will redirect you to their website for more information.",
        ctaHref: "/en-us/guest/funds/mutual-funds",
        ctaText: "Learn More",
      },
    ],
  },
  {
    label: "Financing Solutions",
    aria: "menu-financing-solutions",
    options: [
      {
        label: "Financing Solutions",
        img: ASSET + "/globalassets/2-assets/navigation-top/financing-solutions/financing-solutions.jpg?t=20220405080909",
        title: "Our Financing Opportunities",
        copy: "With over 300 global investment professionals positioned in local markets, and a flexible capital base, we can provide solutions across a range of private asset classes.",
        ctaHref: "/en-us/guest/financing-solutions/origination",
        ctaText: "Learn More",
        assetClass: {
          title: "Asset Class",
          links: [
            { label: "Private Credit", href: "/en-us/guest/financing-solutions/origination/private-credit" },
            { label: "Portfolio Finance", href: "/en-us/guest/financing-solutions/origination/portfolio-finance" },
            { label: "Private Equity", href: "/en-us/guest/financing-solutions/origination/private-equity" },
            { label: "Real Estate", href: "/en-us/guest/financing-solutions/origination/real-estate" },
          ],
        },
      },
    ],
  },
  {
    label: "Sustainability",
    aria: "menu-sustainability",
    options: [
      {
        label: "Sustainability",
        cards: [
          {
            label: "Sustainability",
            img: ASSET + "/globalassets/2-assets/esg/sustainability/sustainability.jpg?t=20250514024326",
            href: "/en-us/guest/sustainability-nav/sustainability-nav/sustainability",
          },
          {
            label: "Corporate Citizenship",
            img: ASSET + "/globalassets/2-assets/esg/corporate-citizenship/corporate-citizenship.jpg?t=20250627041149",
            href: "/en-us/guest/sustainability-nav/sustainability-nav/corporate-citizenship",
          },
        ],
      },
    ],
  },
  {
    label: "Perspectives",
    aria: "menu-perspectives",
    options: [
      {
        label: "Viewpoints",
        img: ASSET + "/contentassets/e2ead7000b954829b13a95e2f8879038/perspectives.jpg?t=20211111114305",
        title: "Our Views",
        copy: "Read, watch and listen to the latest insights from our global investment teams.",
        ctaHref: "/en-us/guest/perspectives/viewpoints",
        ctaText: "Learn More",
      },
      {
        label: "Podcast",
        img: ASSET + "/contentassets/71330b30bf644cafba983d91dcf9205f/streaming-income.jpg?t=20211111114451",
        title: "Streaming Income",
        copy: "In this interview-style podcast, we offer insight into where our global teams are seeing risks and opportunities today.",
        ctaHref: "/en-us/guest/perspectives/podcasts",
        ctaText: "Learn More",
      },
      {
        label: "LinkedIn Newsletter",
        img: ASSET + "/globalassets/2-assets/navigation-top/perspectives/where-credit-is-due.jpg?t=20251215054249",
        title: "Where Credit Is Due",
        copy: "Our monthly newsletter focused on recognizing value across portfolios and people.",
        ctaHref: "/en-us/guest/perspectives/newsletter/linkedin-newsletter",
        ctaText: "Read Now",
      },
    ],
  },
  {
    label: "Contact",
    aria: "menu-contact",
    options: [
      {
        label: "Media",
        cards: [
          {
            label: "In the News",
            img: ASSET + "/globalassets/2-assets/navigation-top/contact/in-the-news.jpg?t=20250930031218",
            href: "/en-us/guest/contact/in-the-media/in-the-news",
          },
          {
            label: "Press Releases",
            img: ASSET + "/globalassets/2-assets/navigation-top/contact/media.jpg?t=20250930030858",
            href: "/en-us/guest/contact/in-the-media/press-releases",
          },
          {
            label: "Awards & Recognition",
            img: ASSET + "/globalassets/2-assets/navigation-top/about/awards-recognition.jpg?t=20211208051947",
            href: "/en-us/guest/contact/in-the-media/awards-and-recognition",
          },
        ],
      },
      {
        label: "Locations",
        img: ASSET + "/contentassets/f83ed5ddb7224b4f8400b1b7f573e4e5/locations.jpg?t=20211206024920",
        title: "Locations",
        copy: "With offices on four continents, we have the global perspective and local presence to uncover and provide access to a superior range of investment opportunities.",
        ctaHref: "/en-us/guest/contact/locations",
        ctaText: "Learn More",
      },
      {
        label: "Contact Us",
        img: ASSET + "/globalassets/2-assets/navigation-top/contact/contact.jpg?t=20211208052011",
        title: "Contact Us",
        copy: "If you have questions or would like more information about our offerings, please get in touch with us.",
        ctaHref: "/en-us/guest/contact/contact-barings",
        ctaText: "Learn More",
      },
      {
        label: "Security & Fraud",
        img: ASSET + "/globalassets/2-assets/navigation-top/contact/security-fraud.jpg?t=20240206032030",
        title: "Security & Fraud",
        copy: "Barings is committed to protecting information entrusted to us by identifying and monitoring cyber threats and deploying appropriate security controls.",
        ctaHref: "/en-us/guest/contact/security-fraud",
        ctaText: "Learn More",
      },
    ],
  },
];

export const LOCATIONS: LocationRegion[] = [
  {
    title: "North America",
    countries: [
      { label: "Canada", href: "/en-ca/institutional" },
      { label: "United States", href: "/en-us/institutional" },
    ],
  },
  {
    title: "Latin America",
    countries: [
      { label: "Argentina", href: "/en-ar/institutional" },
      { label: "Brazil", href: "/en-br/institutional" },
      { label: "Chile", href: "/en-cl/institutional" },
      { label: "Colombia", href: "/en-co/institutional" },
      { label: "Mexico", href: "/en-mx/institutional" },
      { label: "Panama", href: "/en-pa/institutional" },
      { label: "Peru", href: "/en-pe/institutional" },
      { label: "Uruguay", href: "/en-uy/institutional" },
    ],
  },
  {
    title: "Asia Pacific",
    countries: [
      { label: "Australia", href: "/en-au/institutional" },
      { label: "China (\u4e2d\u56fd)", href: "/zh-cn/individual" },
      { label: "Hong Kong (\u9999\u6e2f - \u4e2d\u6587)", href: "/zh-hk/individual" },
      { label: "Hong Kong - English", href: "/en-hk/institutional" },
      { label: "Japan (\u65e5\u672c)", href: "/ja-jp/institutional" },
      { label: "Korea", href: "/en-kr/institutional" },
      { label: "Singapore", href: "/en-sg/institutional" },
      { label: "Taiwan (\u53f0\u7063)", href: "/zh-tw/individual" },
    ],
  },
  {
    title: "Europe",
    countries: [
      { label: "Austria", href: "/de-at/institutional" },
      { label: "Belgium", href: "/en-be/institutional" },
      { label: "Denmark", href: "/en-dk/institutional" },
      { label: "Finland", href: "/en-fi/institutional" },
      { label: "France", href: "/en-fr/institutional" },
      { label: "Germany", href: "/de-de/institutional" },
      { label: "Ireland", href: "/en-ie/institutional" },
      { label: "Italy", href: "/en-it/institutional" },
      { label: "Luxembourg", href: "/en-lu/institutional" },
      { label: "Netherlands", href: "/en-nl/institutional" },
      { label: "Norway", href: "/en-no/institutional" },
      { label: "Portugal", href: "/en-pt/institutional" },
      { label: "Spain", href: "/en-es/institutional" },
      { label: "Sweden", href: "/en-se/institutional" },
      { label: "Switzerland", href: "/en-ch/institutional" },
      { label: "United Kingdom", href: "/en-gb/institutional" },
    ],
  },
];

export const GLOBAL_SITE_HREF = "/guest";

export const SEARCH_ACTION = "/en-us/guest/search";
