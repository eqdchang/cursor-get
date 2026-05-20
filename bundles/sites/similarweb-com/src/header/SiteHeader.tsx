import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { getIconSvg, getSidebarBrandSvg } from "./icons.generated";

const SITE_BASE = "https://www.similarweb.com";

type GroupKey = "products" | "solutions" | "resources";

type ListSection = {
  heading?: string;
  headingHref?: string;
  items: { label: string; href: string; external?: boolean }[];
  columns?: number;
};

type SolutionBanner = {
  title: string;
  subtitle: string;
  href: string;
  variant: string;
  img?: string;
  imgMobile?: string;
};

type CardItem = {
  title: string;
  description: string;
  href: string;
  external?: boolean;
  variantRgb?: string;
};

type TabPanelBase = {
  id: string;
  label: string;
};

type LinkTabPanel = TabPanelBase & {
  kind: "links";
  banner?: SolutionBanner;
  lists: ListSection[];
  showExploreApi?: boolean;
};

type CardTabPanel = TabPanelBase & {
  kind: "cards";
  cardHeading?: string;
  cards: CardItem[];
  cardStyle?: "colored" | "icon";
};

type TabPanel = LinkTabPanel | CardTabPanel;

type BottomLink = { label: string; href: string; external?: boolean };

const PRODUCTS_BOTTOM_INTELLIGENCE: BottomLink[] = [
  { label: "Explore API", href: "/corp/daas/api/" },
];
const PRODUCTS_BOTTOM_FREE_TOOLS: BottomLink[] = [
  { label: "Contact sales", href: "/corp/contact-us/" },
  {
    label: "Start free trial",
    href: "https://account.similarweb.com/journey/registration/",
    external: true,
  },
];
const SOLUTIONS_BOTTOM: BottomLink[] = [
  { label: "Contact sales", href: "/corp/contact-us/" },
  {
    label: "Start free trial",
    href: "https://account.similarweb.com/journey/registration/",
    external: true,
  },
];
const RESOURCES_BOTTOM: BottomLink[] = SOLUTIONS_BOTTOM;

type SideBannerSpec = {
  kicker: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  img: string;
};

const DEFAULT_SIDE_BANNER: SideBannerSpec = {
  kicker: "Plan earlier and better for the 2026 holiday season",
  title: "Top Holiday 2026 Shopper Trends",
  body: "Understand how shoppers are researching, comparing and deciding earlier, and what's shaping demand across the full season.",
  cta: "Download Now",
  href: "/corp/reports/retail-planning/",
  img: "https://static-us-east-1.similarcdn.com/static_assets/lite/images/retail-planning.png",
};

const DATA_LICENSING_SIDE_BANNER: SideBannerSpec = {
  kicker: "Data Licensing",
  title: "Data Licensing",
  body: "Drive new revenue streams and enhance your product with the world's leading digital insights",
  cta: "Explore Data Licensing now",
  href: "/corp/daas/data-partnerships/",
  img: "https://static-us-east-1.similarcdn.com/static_assets/lite/images/data-licesing.png",
};

const SOLUTIONS_SIDE_BANNER_BY_TAB: Record<string, SideBannerSpec> = {
  daas: DATA_LICENSING_SIDE_BANNER,
};

const PRODUCT_TABS: TabPanel[] = [
  {
    id: "free-tools",
    label: "Free Tools",
    kind: "links",
    lists: [
      {
        heading: "Tools",
        columns: 2,
        items: [
          { label: "Website Traffic Checker", href: "/website/" },
          { label: "Free App Analytics", href: "/app/" },
          { label: "Free Keyword Tool", href: "/generator/" },
          { label: "UTM Builder", href: "/utm-code-builder/" },
          { label: "SERP Seismograph", href: "/serp/" },
          { label: "AI Traffic Checker", href: "/ai-traffic/" },
          { label: "Company Profile Checker", href: "/company/" },
          { label: "Technology Checker", href: "/technology/" },
          { label: "Verify Your Website", href: "/connect/" },
          { label: "Browser Extension", href: "/corp/extension/" },
        ],
      },
      {
        heading: "Rankings",
        columns: 2,
        items: [
          { label: "Top Websites", href: "/top-websites/" },
          { label: "Trending Websites", href: "/top-websites/trending/" },
          { label: "Top Android Apps", href: "/top-apps/google/" },
          { label: "Top iOS Apps", href: "/top-apps/apple/" },
          {
            label: "Top Amazon Products & Brands",
            href: "/top-amazon-brands/",
          },
          { label: "Mobile vs. Desktop", href: "/platforms/" },
          { label: "Digital 100", href: "/corp/digital-100/" },
        ],
      },
    ],
  },
  {
    id: "ai-search",
    label: "AI Search Intelligence",
    kind: "links",
    showExploreApi: true,
    banner: {
      title: "Similarweb AI Search Intelligence",
      subtitle:
        "Turn AI search from a blind spot into a growth channel, with the competitive intelligence to see where you stand and how to win",
      href: "/corp/search/gen-ai-intelligence/",
      variant: "#4D80FF",
      img: "https://static-us-east-1.similarcdn.com/build/20260514.master.b107e23/dist/scripts/lite-app/assets/66d5815b0ddc44b42b96.png",
      imgMobile:
        "https://static-us-east-1.similarcdn.com/build/20260514.master.b107e23/dist/scripts/lite-app/assets/7722bb2a3a5035b4643f.png",
    },
    lists: [
      {
        heading: "AI Brand Visibility",
        headingHref:
          "/corp/search/gen-ai-intelligence/ai-brand-visibility/",
        items: [
          {
            label: "AI Share of Voice Monitor",
            href: "/corp/search/gen-ai-intelligence/ai-brand-visibility/ai-sov/",
          },
          {
            label: "AI Citation Analysis",
            href: "/corp/search/gen-ai-intelligence/ai-brand-visibility/citation-analysis/",
          },
          {
            label: "AI Prompt Analysis",
            href: "/corp/search/gen-ai-intelligence/ai-brand-visibility/prompt-analysis/",
          },
          {
            label: "AI Sentiment Analysis",
            href: "/corp/search/gen-ai-intelligence/ai-brand-visibility/sentiment-analysis/",
          },
        ],
      },
      {
        heading: "AI Traffic Tracker",
        headingHref:
          "/corp/search/gen-ai-intelligence/ai-chatbot-traffic/",
        items: [
          {
            label: "ChatGPT Traffic Tracker",
            href: "/corp/search/gen-ai-intelligence/ai-chatbot-traffic/chatgpt-traffic-tracker/",
          },
          {
            label: "Perplexity Traffic Tracker",
            href: "/corp/search/gen-ai-intelligence/ai-chatbot-traffic/perplexity-traffic-tracker/",
          },
          {
            label: "Claude Traffic Tracker",
            href: "/corp/search/gen-ai-intelligence/ai-chatbot-traffic/claude-traffic-tracker/",
          },
          {
            label: "Grok Traffic Tracker",
            href: "/corp/search/gen-ai-intelligence/ai-chatbot-traffic/grok-traffic-tracker/",
          },
          {
            label: "Gemini Traffic Tracker",
            href: "/corp/search/gen-ai-intelligence/ai-chatbot-traffic/gemini-traffic-tracker/",
          },
          {
            label: "Deepseek Traffic Tracker",
            href: "/corp/search/gen-ai-intelligence/ai-chatbot-traffic/deepseek-traffic-tracker/",
          },
        ],
      },
      {
        heading: "AI Search Optimization Toolsets",
        items: [
          { label: "GEO Tools", href: "/corp/search/geo/" },
          { label: "AEO Tools", href: "/corp/search/aeo/" },
        ],
      },
    ],
  },
  {
    id: "web",
    label: "Web Intelligence",
    kind: "links",
    showExploreApi: true,
    banner: {
      title: "Similarweb Web Intelligence",
      subtitle:
        "Gain a powerful competitive edge with in-depth insights into your digital landscape",
      href: "/corp/web/",
      variant: "#195AFE",
      img: "https://static-us-east-1.similarcdn.com/build/20260514.master.b107e23/dist/scripts/lite-app/assets/894e53c403a1a27a9184.png",
      imgMobile:
        "https://static-us-east-1.similarcdn.com/build/20260514.master.b107e23/dist/scripts/lite-app/assets/ad3eac0159b09c4881a1.png",
    },
    lists: [
      {
        heading: "Market Intelligence",
        headingHref: "/corp/web/market-intelligence/",
        items: [
          { label: "Market Research", href: "/corp/web/market-research/" },
          {
            label: "Competitor Analysis",
            href: "/corp/web/competitive-analysis/",
          },
          { label: "Benchmarking", href: "/corp/web/benchmarking/" },
          { label: "Marketing Strategy", href: "/corp/web/strategy/" },
          { label: "Demand Analysis", href: "/corp/web/trend-analysis/" },
          {
            label: "AI Trend Analyzer",
            href: "/corp/ai/agents/trend-analyzer/",
          },
        ],
      },
      {
        heading: "SEO Tools",
        headingHref: "/corp/search/seo/",
        items: [
          {
            label: "Keyword Research",
            href: "/corp/search/keyword-research/",
          },
          { label: "Rank Tracker", href: "/corp/search/rank-tracker/" },
          {
            label: "Backlink Analytics",
            href: "/corp/search/backlink-analysis/",
          },
          { label: "Site Audit", href: "/corp/search/site-audit/" },
          {
            label: "AI SEO Strategy Agent",
            href: "/corp/ai/agents/seo-strategist/",
          },
        ],
      },
      {
        heading: "Ad Intelligence",
        headingHref: "/corp/web/advertising/",
        items: [
          { label: "Display Advertising", href: "/corp/web/display/" },
          { label: "Video Advertising", href: "/corp/web/video/" },
          {
            label: "Paid Search Intelligence",
            href: "/corp/search/ppc/",
          },
        ],
      },
    ],
  },
  {
    id: "app",
    label: "App Intelligence",
    kind: "links",
    showExploreApi: true,
    banner: {
      title: "Similarweb App Intelligence",
      subtitle:
        "Analyze app performance, market trends, and user behavior to drive smarter business growth",
      href: "/corp/apps/",
      variant: "#FF326F",
      img: "https://static-us-east-1.similarcdn.com/build/20260514.master.b107e23/dist/scripts/lite-app/assets/83a55227d85d9acd1703.png",
      imgMobile:
        "https://static-us-east-1.similarcdn.com/build/20260514.master.b107e23/dist/scripts/lite-app/assets/5cea08ed1ac2903593e7.png",
    },
    lists: [
      {
        heading: "App Market Intelligence",
        headingHref: "/corp/apps/market-intelligence/",
        items: [
          {
            label: "App Competitor Analysis",
            href: "/corp/apps/competitors/",
          },
          {
            label: "Mobile Market Trends",
            href: "/corp/apps/market-trends/",
          },
          {
            label: "App Technographics (SDK)",
            href: "/corp/apps/technographics/",
          },
        ],
      },
      {
        heading: "App Performance Analytics",
        headingHref: "/corp/apps/analytics/",
        items: [
          {
            label: "App Rating & Reviews",
            href: "/corp/apps/ratings-reviews/",
          },
          { label: "App Usage Analytics", href: "/corp/apps/usage/" },
          {
            label: "App Revenue Analytics",
            href: "/corp/apps/in-app-purchases/",
          },
        ],
      },
      {
        heading: "App Audience Analytics",
        headingHref: "/corp/apps/audience-analytics/",
        items: [
          {
            label: "App Demographics & Interests",
            href: "/corp/apps/demographics-interests/",
          },
          {
            label: "App-Web Insights",
            href: "/corp/apps/app-web-insights/",
          },
        ],
      },
    ],
  },
  {
    id: "sales",
    label: "Sales Intelligence",
    kind: "links",
    showExploreApi: true,
    banner: {
      title: "Similarweb Sales Intelligence",
      subtitle:
        "Empower your sales strategy with data to uncover pitching opportunities and engage buyers to drive pipeline",
      href: "/corp/sales/",
      variant: "#FF7A1A",
      img: "https://static-us-east-1.similarcdn.com/build/20260514.master.b107e23/dist/scripts/lite-app/assets/4938deb032a6f10eda0d.png",
      imgMobile:
        "https://static-us-east-1.similarcdn.com/build/20260514.master.b107e23/dist/scripts/lite-app/assets/2f7d0a1d29fa9e0e9008.png",
    },
    lists: [
      {
        heading: "Sales Strategy & Operations",
        headingHref: "/corp/sales/strategy-operations/",
        items: [
          {
            label: "Territory Planning",
            href: "/corp/sales/territory-planning/",
          },
          { label: "Lead Scoring", href: "/corp/sales/lead-scoring/" },
          { label: "Lead Enrichment", href: "/corp/sales/lead-enrichment/" },
        ],
      },
      {
        heading: "Lead Generation",
        headingHref: "/corp/sales/lead-gen/",
        items: [
          {
            label: "AI Prospecting Agent",
            href: "/corp/ai/agents/prospecting/",
          },
          {
            label: "Company Research",
            href: "/corp/sales/company-research/",
          },
          {
            label: "Account-based Marketing",
            href: "/corp/sales/account-based-outreach/",
          },
          {
            label: "AI Outreach Agent",
            href: "/corp/ai/agents/sales-outreach/",
          },
          { label: "App Leads Finder", href: "/corp/sales/app-leads/" },
        ],
      },
      {
        heading: "Sales Engagement",
        headingHref: "/corp/sales/sales-engagement/",
        items: [
          {
            label: "AI Meeting Prep Agent",
            href: "/corp/ai/agents/meeting-prep/",
          },
          {
            label: "Buyer Intent & Signals Data",
            href: "/corp/sales/intent-signals/",
          },
          {
            label: "Value Selling",
            href: "/corp/sales/value-selling/",
          },
        ],
      },
    ],
  },
  {
    id: "retail",
    label: "Retail Intelligence",
    kind: "links",
    showExploreApi: true,
    banner: {
      title: "Similarweb Retail Intelligence",
      subtitle:
        "Discover shopping trends and drive your ecommerce growth with consumer behavior insights",
      href: "/corp/retail/",
      variant: "#C343FF",
      img: "https://static-us-east-1.similarcdn.com/build/20260514.master.b107e23/dist/scripts/lite-app/assets/95a1d1ccb5fe11f81714.png",
      imgMobile:
        "https://static-us-east-1.similarcdn.com/build/20260514.master.b107e23/dist/scripts/lite-app/assets/a8c28eee624a9127e4e9.png",
    },
    lists: [
      {
        heading: "Ecommerce Analytics",
        headingHref: "/corp/retail/ecommerce-analytics/",
        items: [
          {
            label: "Amazon Sales Performance",
            href: "/corp/retail/amazon-sales-analytics/",
          },
          {
            label: "Category Management",
            href: "/corp/retail/category-management/",
          },
          {
            label: "Cross-Retail Analytics",
            href: "/corp/retail/retail-analytics/",
          },
        ],
      },
      {
        heading: "Marketplace Optimization",
        headingHref: "/corp/retail/marketplace-optimization/",
        items: [
          {
            label: "On-site Search Optimization",
            href: "/corp/retail/on-site-search-optimization/",
          },
          {
            label: "Amazon Store Optimization",
            href: "/corp/retail/amazon-seller-tool/",
          },
          {
            label: "Amazon Keyword Research Agent",
            href: "/corp/retail/amazon-keyword-tool/",
          },
        ],
      },
      {
        heading: "Consumer Analytics",
        headingHref: "/corp/retail/consumer-analytics/",
        items: [
          {
            label: "Consumer Demand Analytics",
            href: "/corp/retail/consumer-demand/",
          },
          {
            label: "Shopper Behavior",
            href: "/corp/retail/shopper-behavior/",
          },
        ],
      },
    ],
  },
  {
    id: "stock",
    label: "Stock Intelligence",
    kind: "links",
    showExploreApi: true,
    banner: {
      title: "Similarweb Stock Intelligence",
      subtitle:
        "Monitor market trends, track stock performance, and use analytics to make data-backed investments",
      href: "/corp/stocks/",
      variant: "#00CA9A",
      img: "https://static-us-east-1.similarcdn.com/build/20260514.master.b107e23/dist/scripts/lite-app/assets/558a256681d090ff55ba.png",
      imgMobile:
        "https://static-us-east-1.similarcdn.com/build/20260514.master.b107e23/dist/scripts/lite-app/assets/fa06e10a278bedca67a3.png",
    },
    lists: [
      {
        heading: "Stock Performance",
        headingHref: "/corp/stocks/performance/",
        items: [
          {
            label: "Company Digital Performance",
            href: "/corp/stocks/company-performance/",
          },
        ],
      },
      {
        heading: "Sector Monitoring",
        headingHref: "/corp/stocks/sector-analysis/",
        items: [
          {
            label: "Market Trends & Sector Insights",
            href: "/corp/stocks/sector-performance/",
          },
        ],
      },
      {
        heading: "Predictive Analytics",
        headingHref: "/corp/stocks/predictive-analytics/",
        items: [
          {
            label: "Stock Forecasting",
            href: "/corp/stocks/forecasting/",
          },
        ],
      },
    ],
  },
];

const SOLUTION_TABS: TabPanel[] = [
  {
    id: "by-team",
    label: "By Team",
    kind: "cards",
    cardStyle: "colored",
    cards: [
      {
        title: "Marketing",
        description:
          "Monitor your competitors' digital performance & strategy. Make data-driven decisions that drive growth.",
        href: "/corp/teams/marketing/",
        variantRgb: "255, 50, 111",
      },
      {
        title: "SEO & GEO",
        description:
          "Create organic strategies for traditional and AI search with the industry's most powerful data, so you can drive visibility, traffic and impact.",
        href: "/corp/teams/seo/",
        variantRgb: "15, 191, 229",
      },
      {
        title: "Sales",
        description:
          "Find & enrich companies & contacts while providing unique digital insights to close business faster",
        href: "/corp/teams/sales/",
        variantRgb: "254, 183, 43",
      },
      {
        title: "Research & Analysts",
        description:
          "Streamline and improve your research strategy with the industry's most robust datasets and market insights.",
        href: "/corp/teams/research-analytics/",
        variantRgb: "0, 205, 152",
      },
      {
        title: "Ecommerce",
        description:
          "Gain full visibility into your competitors' ecommerce performance and marketing strategy.",
        href: "/corp/teams/ecommerce/",
        variantRgb: "194, 77, 252",
      },
      {
        title: "PPC",
        description:
          "Get more ROI and faster, with access to your competitors' winning paid search and display ad tactics.",
        href: "/corp/search/ppc/",
        variantRgb: "25, 90, 254",
      },
    ],
  },
  {
    id: "by-industry",
    label: "By Industry",
    kind: "links",
    lists: [
      {
        heading: "Select industry",
        columns: 2,
        items: [
          { label: "Retail", href: "/corp/industry/retail/" },
          {
            label: "Consumer Goods",
            href: "/corp/industry/consumer-goods/",
          },
          {
            label: "Financial Services",
            href: "/corp/industry/financial/",
          },
          { label: "Travel", href: "/corp/industry/travel/" },
          {
            label: "B2B Software & Services",
            href: "/corp/industry/b2b-services/",
          },
          { label: "Telecom", href: "/corp/industry/telecom/" },
          { label: "Media", href: "/corp/industry/media/" },
          { label: "Agencies", href: "/corp/industry/agencies/" },
          { label: "Investors", href: "/corp/industry/investment/" },
          { label: "Logistics", href: "/corp/industry/logistics/" },
        ],
      },
    ],
  },
  {
    id: "ai",
    label: "Similarweb AI",
    kind: "cards",
    cardHeading: "Similarweb AI",
    cardStyle: "icon",
    cards: [
      {
        title: "AI Studio",
        description:
          "Ask Similarweb questions in natural language and get expert-level insights.",
        href: "/corp/ai/ai-studio/",
      },
      {
        title: "AI Agents",
        description:
          "Put digital intelligence on autopilot with AI Agents",
        href: "/corp/ai/ai-agents/",
      },
      {
        title: "Data for AI",
        description:
          "Power smarter AI models, agents, and applications with digital insights at scale.",
        href: "/corp/ai/data-for-ai/",
      },
      {
        title: "MCP",
        description:
          "Connect Similarweb's trusted digital intelligence directly to your AI agents, tools, and workflows",
        href: "/corp/ai/mcp/",
      },
    ],
  },
  {
    id: "daas",
    label: "Data as a Service",
    kind: "cards",
    cardHeading: "Data as a Service",
    cardStyle: "icon",
    cards: [
      {
        title: "Data as a Service",
        description:
          "Power your business with digital insights at scale.",
        href: "/corp/daas/",
      },
      {
        title: "Integrations",
        description:
          "Connect Similarweb data directly with a variety of data platforms and tools for actionable insights.",
        href: "/corp/daas/integrations/",
      },
      {
        title: "MCP",
        description:
          "Connect Similarweb's trusted digital intelligence directly to your AI agents, tools, and workflows",
        href: "/corp/ai/mcp/",
      },
      {
        title: "API",
        description:
          "Access data in real-time and at scale with unmatched flexibility and customization.",
        href: "/corp/daas/api/",
      },
      {
        title: "Data Hub",
        description:
          "Simplified reporting, custom data visualizations, and automated exports\u2013all in one place.",
        href: "/corp/daas/datahub/",
      },
      {
        title: "Data Feeds",
        description:
          "Custom or pre-configured data feeds - delivered where, when, and how you need them.",
        href: "/corp/daas/data-feeds/",
      },
    ],
  },
  {
    id: "advisory",
    label: "Advisory Services & Reporting",
    kind: "cards",
    cardHeading: "Advisory Services & Reporting",
    cardStyle: "icon",
    cards: [
      {
        title: "Advisory Services",
        description:
          "Gain deeper market and consumer insights through expert consulting services.",
        href: "/corp/advisory-services/",
      },
      {
        title: "Custom Reporting",
        description:
          "Get dashboards that deliver real-time insights into digital behavior, brand health, and more.",
        href: "/corp/custom-performance-reporting/",
      },
      {
        title: "Brand Health Tracking",
        description:
          "Track your digital health on web, app & marketplaces to find hidden issues and strengths",
        href: "/corp/custom-performance-reporting/brand-health/",
      },
      {
        title: "Category Insights",
        description:
          "Track subcategory trends, benchmark SKU-level market share, and sharpen your assortment strategy.",
        href: "/corp/custom-performance-reporting/category-insights/",
      },
      {
        title: "Market Share Dashboards",
        description:
          "Understand your digital market share across web and app. Track competitors and benchmarks in one place",
        href: "/corp/custom-performance-reporting/market-share-dashboard/",
      },
      {
        title: "Digital Travel Analytics",
        description:
          "Uncover booking habits and search trends for OTAs, flights, hotels, and destinations",
        href: "/corp/custom-performance-reporting/digital-travel-analytics/",
      },
    ],
  },
];

const RESOURCES_COLUMNS: ListSection[] = [
  {
    heading: "Learn",
    items: [
      {
        label: "Seasonal Product Launch",
        href: "/corp/seasonal-launch-fall-2025/",
      },
      {
        label: "Similarweb Academy",
        href: "https://academy.similarweb.com/",
        external: true,
      },
      {
        label: "Help Center",
        href: "https://support.similarweb.com/",
        external: true,
      },
      {
        label: "Developers Center",
        href: "https://developers.similarweb.com/",
        external: true,
      },
    ],
  },
  {
    heading: "Explore",
    items: [
      { label: "Blog", href: "/blog/" },
      { label: "Customer Stories", href: "/corp/clients/" },
      { label: "Reports & Insights", href: "/corp/reports/" },
      { label: "Webinars", href: "/corp/webinars/" },
      { label: "Events", href: "/corp/events/" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "About Us", href: "/corp/about/" },
      { label: "Our Data", href: "/corp/ourdata/" },
      {
        label: "Investor Relations",
        href: "https://ir.similarweb.com/",
        external: true,
      },
    ],
  },
];

const LogoSvg = ({ className }: { className?: string } = {}) => (
  <svg
    viewBox="0 0 181 23"
    width={181}
    height={23}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className ?? "text-white"}
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

const ChevronDown = ({ className }: { className?: string }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="m4 6 4 4 4-4"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRightThin = ({ className }: { className?: string }) => (
  <svg
    width={5}
    height={8}
    viewBox="0 0 5 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M1 1l3 3-3 3"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRight = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    className={className}
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M3 7.375h7.606L7.112 3.881 8 3l5 5-5 5-.881-.881 3.487-3.494H3v-1.25Z"
    />
  </svg>
);

const MenuIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M4 7h16M4 12h16M4 17h16"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
    />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M6 6l12 12M18 6L6 18"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
    />
  </svg>
);

const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <circle cx={7} cy={7} r={5} stroke="currentColor" strokeWidth={1.5} />
    <path
      d="m14 14-3-3"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </svg>
);

const ArrowLeft = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M11.5 5 6.5 10l5 5M7 10h7"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PRODUCT_VARIANT: Record<string, string> = {
  "free-tools": "#092540",
  "ai-search": "#4D80FF",
  web: "#195AFE",
  app: "#FF326F",
  sales: "#FFA800",
  retail: "#C343FF",
  stock: "#00CA9A",
};

function BrandCircleIcon({
  id,
  size = 24,
  className,
}: {
  id: string;
  size?: number;
  className?: string;
}) {
  const svg = getSidebarBrandSvg(id);
  if (svg) {
    return (
      <span
        aria-hidden="true"
        className={`inline-block [&>svg]:w-full [&>svg]:h-full ${className ?? ""}`}
        style={{ width: size, height: size }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  }
  const color = PRODUCT_VARIANT[id] || "#092540";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx={12} cy={12} r={12} fill={color} />
    </svg>
  );
}

function RowIcon({ className }: { className?: string }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx={8} cy={8} r={2.5} fill="currentColor" opacity=".5" />
    </svg>
  );
}

function InlineSvg({
  svg,
  className,
  size,
}: {
  svg: string;
  className?: string;
  size?: number;
}) {
  const style =
    size !== undefined
      ? { width: size, height: size, display: "inline-block" as const }
      : undefined;
  return (
    <span
      aria-hidden="true"
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

function LabelIcon({
  label,
  className,
  fallback,
  size = 16,
}: {
  label: string;
  className?: string;
  fallback?: ReactNode;
  size?: number;
}) {
  const svg = getIconSvg(label);
  if (svg) {
    return (
      <InlineSvg
        svg={svg}
        className={`[&>svg]:w-full [&>svg]:h-full shrink-0 ${className ?? ""}`}
        size={size}
      />
    );
  }
  return <>{fallback}</>;
}

function CardIcon({ className }: { className?: string }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="m8 2 1.8 3.7 4 .6-2.9 2.8.7 4L8 11.3l-3.6 1.9.7-4L2.2 6.3l4-.6L8 2Z"
        fill="currentColor"
        opacity=".75"
      />
    </svg>
  );
}

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

type LinkProps = {
  href: string;
  external?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  role?: string;
  children: ReactNode;
};

function A({
  href,
  external,
  className,
  style,
  onClick,
  role,
  children,
}: LinkProps) {
  const finalHref = abs(href);
  const ext = isExternal(finalHref, external);
  return (
    <a
      href={finalHref}
      className={className}
      style={style}
      onClick={onClick}
      role={role}
      target={ext ? "_blank" : undefined}
      rel={ext ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

function bannerGradient(variant: string, mode: "desktop" | "mobile" = "desktop"): string {
  const origin = mode === "mobile" ? "100% 100%" : "120% 0%";
  return `radial-gradient(130% 100% at ${origin}, ${variant} 0%, rgb(23, 78, 212) 58.5%, rgb(16, 37, 62) 100%)`;
}

function cardTintBg(rgb?: string): string | undefined {
  if (!rgb) return undefined;
  return `rgba(${rgb}, 0.05)`;
}

export function SiteHeader() {
  const [openGroup, setOpenGroup] = useState<GroupKey | null>(null);
  const [activeProductTab, setActiveProductTab] = useState<string>(
    PRODUCT_TABS.find((t) => t.id === "ai-search")?.id ?? PRODUCT_TABS[0].id,
  );
  const [activeSolutionTab, setActiveSolutionTab] = useState<string>(
    SOLUTION_TABS[0].id,
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const navRef = useRef<HTMLElement | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);

  const closeAll = useCallback(() => setOpenGroup(null), []);

  useEffect(() => {
    if (!openGroup) return;
    const onDown = (e: MouseEvent) => {
      const nav = navRef.current;
      if (!nav) return;
      const path =
        typeof e.composedPath === "function" ? e.composedPath() : [];
      const insideNav = path.length
        ? path.includes(nav)
        : nav.contains(e.target as Node);
      if (!insideNav) closeAll();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openGroup, closeAll]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen && hamburgerRef.current) {
      hamburgerRef.current.focus();
    }
  }, [mobileOpen]);

  const toggleGroup = useCallback((g: GroupKey) => {
    setOpenGroup((prev) => (prev === g ? null : g));
  }, []);

  const activeProduct = useMemo(
    () => PRODUCT_TABS.find((t) => t.id === activeProductTab) ?? PRODUCT_TABS[0],
    [activeProductTab],
  );
  const activeSolution = useMemo(
    () =>
      SOLUTION_TABS.find((t) => t.id === activeSolutionTab) ?? SOLUTION_TABS[0],
    [activeSolutionTab],
  );

  return (
    <div className="bw-scope">
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[1500] bg-[#000921] text-white`}
      >
        <div className="w-full bg-[#000921]">
          <div className="mx-auto max-w-[1248px] px-6">
            <div
              className="flex items-center h-16"
            >
              <A
                href="/"
                className="shrink-0 flex items-center"
                onClick={closeAll}
              >
                <LogoSvg />
                <span className="sr-only">Similarweb Home</span>
              </A>

              <nav
                className="hidden lg:flex items-center ml-5 flex-1 self-stretch"
                aria-label="Primary"
              >
                <ul className="flex items-center justify-center gap-1 w-full h-full">
                  <li className="relative h-full flex items-center">
                    <button
                      type="button"
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[16px] font-medium transition-colors ${openGroup === "products" ? "text-[#195AFE]" : "text-white hover:text-[#aab2ba]"}`}
                      aria-haspopup="menu"
                      aria-expanded={openGroup === "products"}
                      onClick={() => toggleGroup("products")}
                    >
                      Products
                      <ChevronDown
                        className={`transition-transform ${openGroup === "products" ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openGroup === "products" && (
                      <span
                        aria-hidden="true"
                        className="absolute left-0 right-0 bottom-0 h-[3px] bg-[#195AFE]"
                      />
                    )}
                  </li>
                  <li className="relative h-full flex items-center">
                    <button
                      type="button"
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[16px] font-medium transition-colors ${openGroup === "solutions" ? "text-[#195AFE]" : "text-white hover:text-[#aab2ba]"}`}
                      aria-haspopup="menu"
                      aria-expanded={openGroup === "solutions"}
                      onClick={() => toggleGroup("solutions")}
                    >
                      Solutions
                      <ChevronDown
                        className={`transition-transform ${openGroup === "solutions" ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openGroup === "solutions" && (
                      <span
                        aria-hidden="true"
                        className="absolute left-0 right-0 bottom-0 h-[3px] bg-[#195AFE]"
                      />
                    )}
                  </li>
                  <li className="relative h-full flex items-center">
                    <button
                      type="button"
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[16px] font-medium transition-colors ${openGroup === "resources" ? "text-[#195AFE]" : "text-white hover:text-[#aab2ba]"}`}
                      aria-haspopup="menu"
                      aria-expanded={openGroup === "resources"}
                      onClick={() => toggleGroup("resources")}
                    >
                      Resources
                      <ChevronDown
                        className={`transition-transform ${openGroup === "resources" ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openGroup === "resources" && (
                      <span
                        aria-hidden="true"
                        className="absolute left-0 right-0 bottom-0 h-[3px] bg-[#195AFE]"
                      />
                    )}
                  </li>
                  <li>
                    <A
                      href="https://www.similarweb.com/packages/marketing/"
                      className="inline-flex items-center px-3 py-1.5 rounded-md text-[16px] font-medium text-white hover:text-[#aab2ba]"
                      onClick={closeAll}
                    >
                      Pricing
                    </A>
                  </li>
                </ul>
              </nav>

              <div className="hidden lg:flex items-center gap-3">
                <A
                  href="/corp/book-a-demo/"
                  className="inline-flex items-center justify-center h-[42px] px-[15px] rounded-[42px] border border-white text-[14px] font-bold text-white hover:bg-white hover:text-[#000921] transition-colors"
                  onClick={closeAll}
                >
                  Get a demo
                </A>
                <A
                  href="https://account.similarweb.com/journey/registration"
                  className="relative inline-flex items-center justify-center h-[42px] px-4 rounded-[42px] text-[14px] font-bold text-white hover:opacity-90 transition-opacity overflow-hidden"
                  onClick={closeAll}
                  external
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-[42px]"
                    style={{
                      background:
                        "linear-gradient(90deg, rgb(25,90,254) 0.39%, rgb(58,86,232) 28.56%, rgb(196,76,147) 65.51%, rgb(255,109,3) 87.47%, rgb(255,150,3) 99.69%)",
                    }}
                  />
                  <span className="relative">Get started</span>
                </A>
                <A
                  href="https://secure.similarweb.com/account/login/default"
                  className="relative inline-flex items-center pl-3 pr-0 h-[42px] text-[16px] font-medium text-white hover:text-white/90 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-px before:h-5 before:bg-[#b6bec6]"
                  onClick={closeAll}
                  external
                >
                  Login
                </A>
              </div>

              <button
                ref={hamburgerRef}
                type="button"
                className="lg:hidden ml-auto p-2 text-white"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((v) => !v)}
              >
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>

        {openGroup && (
          <div className="hidden lg:block absolute left-0 right-0 top-full bg-[#000921]/50">
            <div className="mx-auto max-w-[1248px] px-6">
              <div
                className="rounded-xl bg-white text-[#092540] shadow-[0_4px_12px_rgba(25,90,254,0.13)] overflow-hidden"
                role="menu"
              >
                {openGroup === "products" && (
                  <>
                    <TabbedPanel
                      tabs={PRODUCT_TABS}
                      activeId={activeProductTab}
                      onSelect={setActiveProductTab}
                      active={activeProduct}
                      onNavigate={closeAll}
                      showBrandIcons
                      sidebarDividerAfterId="free-tools"
                    />
                    <BottomBar
                      links={
                        activeProduct.id === "free-tools"
                          ? PRODUCTS_BOTTOM_FREE_TOOLS
                          : PRODUCTS_BOTTOM_INTELLIGENCE
                      }
                      onNavigate={closeAll}
                    />
                  </>
                )}
                {openGroup === "solutions" && (
                  <>
                    <TabbedPanel
                      tabs={SOLUTION_TABS}
                      activeId={activeSolutionTab}
                      onSelect={setActiveSolutionTab}
                      active={activeSolution}
                      onNavigate={closeAll}
                      withSideBanner
                      sidebarDividerAfterId="by-industry"
                      sideBannerByTabId={SOLUTIONS_SIDE_BANNER_BY_TAB}
                    />
                    <BottomBar links={SOLUTIONS_BOTTOM} onNavigate={closeAll} />
                  </>
                )}
                {openGroup === "resources" && (
                  <>
                    <ResourcesPanel onNavigate={closeAll} />
                    <BottomBar links={RESOURCES_BOTTOM} onNavigate={closeAll} />
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <div aria-hidden="true" className="h-16" />

      {mobileOpen && <MobileDrawer onClose={() => setMobileOpen(false)} />}
    </div>
  );
}

function TabbedPanel({
  tabs,
  activeId,
  onSelect,
  active,
  onNavigate,
  showBrandIcons,
  withSideBanner,
  sidebarDividerAfterId,
  sideBannerByTabId,
}: {
  tabs: TabPanel[];
  activeId: string;
  onSelect: (id: string) => void;
  active: TabPanel;
  onNavigate: () => void;
  showBrandIcons?: boolean;
  withSideBanner?: boolean;
  sidebarDividerAfterId?: string;
  sideBannerByTabId?: Record<string, SideBannerSpec>;
}) {
  return (
    <div className="flex">
      <div className="w-[282px] shrink-0 pt-10 px-6 pb-0">
        <ul role="menu" className="flex flex-col gap-y-4">
          {tabs.map((tab) => {
            const isActive = tab.id === activeId;
            return (
              <li key={tab.id} className="w-[234px]">
                <button
                  type="button"
                  role="menuitem"
                  className={`w-full text-left flex items-center gap-3 px-3 min-h-8 py-1 rounded-md text-[16px] font-medium leading-tight transition-colors ${isActive ? "bg-[#F1F6FF] text-[#195AFE]" : "text-[#092540] hover:bg-[#f6f8fb]"}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(tab.id);
                  }}
                >
                  {showBrandIcons && tab.id !== "free-tools" && (
                    <BrandCircleIcon id={tab.id} size={20} className="shrink-0" />
                  )}
                  <span className="flex-1">{tab.label}</span>
                  <ChevronRightThin
                    className={`shrink-0 ${isActive ? "text-[#195AFE]" : "text-[#aab2ba]"}`}
                  />
                </button>
                {sidebarDividerAfterId === tab.id && (
                  <div
                    role="presentation"
                    className="mt-4 mb-0 h-px w-full bg-[#eef0f3]"
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex-1 min-w-0 pt-10 pr-6 pb-6 pl-0 flex gap-6">
        <div className="flex-1 min-w-0">
          {active.kind === "links" && (
            <LinkPanel panel={active} onNavigate={onNavigate} />
          )}
          {active.kind === "cards" && (
            <CardPanel panel={active} onNavigate={onNavigate} />
          )}
        </div>
        {withSideBanner && (
          <div className="w-[253px] shrink-0">
            <SideBanner
              spec={
                sideBannerByTabId?.[active.id] ?? DEFAULT_SIDE_BANNER
              }
              onNavigate={onNavigate}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function BottomBar({
  links,
  onNavigate,
}: {
  links: BottomLink[];
  onNavigate: () => void;
}) {
  return (
    <div className="flex justify-end items-center gap-6 bg-[#F1F6FF] px-6 py-4">
      {links.map((l) => (
        <A
          key={l.label}
          href={l.href}
          external={l.external}
          onClick={onNavigate}
          className="inline-flex items-center gap-1.5 text-[13px] font-normal text-[#092540] no-underline hover:text-[#195AFE]"
        >
          {l.label}
          <ArrowRight />
        </A>
      ))}
    </div>
  );
}

function SideBanner({
  spec = DEFAULT_SIDE_BANNER,
  onNavigate,
}: {
  spec?: SideBannerSpec;
  onNavigate: () => void;
}) {
  return (
    <A
      href={spec.href}
      onClick={onNavigate}
      className="flex flex-col gap-2 text-[#092540] no-underline"
    >
      <div className="text-[12px] font-normal text-[#092540]/70">
        {spec.kicker}
      </div>
      <div className="h-28 w-full rounded-lg overflow-hidden bg-[#F6F8FB]">
        <img
          src={spec.img}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="text-[16px] font-bold mt-1">{spec.title}</div>
      <div className="text-[13px] font-normal leading-snug text-[#092540]/75">
        {spec.body}
      </div>
      <div className="inline-flex items-center gap-1.5 text-[14px] font-bold text-[#092540] mt-1">
        {spec.cta}
        <ArrowRight />
      </div>
    </A>
  );
}

function LinkPanel({
  panel,
  onNavigate,
}: {
  panel: LinkTabPanel;
  onNavigate: () => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      {panel.banner && (
        <A
          href={panel.banner.href}
          onClick={onNavigate}
          className="relative flex items-center justify-between gap-6 overflow-hidden rounded-xl px-6 py-5 text-white no-underline min-h-[120px]"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-xl"
            style={{ background: bannerGradient(panel.banner.variant) }}
          />
          <span className="relative z-10 flex flex-col gap-2 max-w-[560px]">
            <span className="text-[22px] font-bold leading-tight text-white">
              {panel.banner.title}
            </span>
            <span className="text-[13px] font-normal opacity-95 text-white">
              {panel.banner.subtitle}
            </span>
            <span className="mt-1 inline-flex items-center gap-1.5 text-[13px] font-bold text-white">
              Learn more
              <ArrowRight />
            </span>
          </span>
          {panel.banner.img && (
            <img
              src={panel.banner.img}
              alt=""
              aria-hidden="true"
              className="absolute right-0 bottom-0 z-10 h-[120px] w-auto max-w-[240px] object-contain"
              loading="lazy"
            />
          )}
        </A>
      )}
      <div className="flex gap-6">
        {panel.lists.map((list, i) => (
          <div key={i} className="flex-1 min-w-0">
            {list.heading &&
              (list.headingHref ? (
                <A
                  href={list.headingHref}
                  onClick={onNavigate}
                  className="inline-block pl-3 mb-1 text-[14px] font-bold tracking-wide text-[#092540] no-underline"
                >
                  {list.heading}
                </A>
              ) : (
                <div className="pl-3 mb-1 text-[14px] font-bold tracking-wide text-[#092540]">
                  {list.heading}
                </div>
              ))}
            <ul
              className={
                list.columns && list.columns > 1 ? "gap-x-6" : "flex flex-col"
              }
              style={
                list.columns && list.columns > 1
                  ? {
                      columnCount: list.columns,
                      columnGap: "1.5rem",
                    }
                  : undefined
              }
            >
              {list.items.map((it) => (
                <li
                  key={it.href + it.label}
                  style={{ breakInside: "avoid" }}
                >
                  <A
                    href={it.href}
                    external={it.external}
                    onClick={onNavigate}
                    className="flex items-start gap-2 px-3 py-2 text-[13px] font-normal text-[#092540]/80 rounded-md hover:bg-[#f1f6ff] hover:text-[#195AFE] no-underline leading-tight"
                    role="menuitem"
                  >
                    <LabelIcon
                      label={it.label}
                      size={16}
                      fallback={<RowIcon className="shrink-0 text-[#aab2ba]" />}
                    />
                    <span>{it.label}</span>
                  </A>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function CardPanel({
  panel,
  onNavigate,
}: {
  panel: CardTabPanel;
  onNavigate: () => void;
}) {
  const style = panel.cardStyle ?? (panel.cards[0]?.variantRgb ? "colored" : "icon");
  return (
    <div className="flex flex-col gap-3">
      {panel.cardHeading && (
        <div className="px-1 text-[14px] font-bold tracking-wide text-[#092540]">
          {panel.cardHeading}
        </div>
      )}
      <div className="grid grid-cols-2 gap-3">
        {panel.cards.map((c) =>
          style === "colored" ? (
            <A
              key={c.href + c.title}
              href={c.href}
              external={c.external}
              onClick={onNavigate}
              className="block rounded-lg border border-transparent p-3 hover:border-[#c5d2ff] transition-colors no-underline"
              style={{ background: cardTintBg(c.variantRgb) }}
              role="menuitem"
            >
              <div className="flex items-center gap-2 mb-2">
                <LabelIcon
                  label={c.title}
                  size={18}
                  fallback={
                    <span
                      aria-hidden="true"
                      className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full"
                      style={{
                        background: c.variantRgb
                          ? `rgb(${c.variantRgb})`
                          : "#195AFE",
                      }}
                    >
                      <CardIcon className="text-white" />
                    </span>
                  }
                />
                <div className="text-[16px] font-bold text-[#092540]">
                  {c.title}
                </div>
              </div>
              <div className="text-[13px] font-normal text-[#3A5166] leading-snug">
                {c.description}
              </div>
            </A>
          ) : (
            <A
              key={c.href + c.title}
              href={c.href}
              external={c.external}
              onClick={onNavigate}
              className="block rounded-lg border border-transparent p-3 hover:bg-[#f6f8fb] transition-colors no-underline"
              role="menuitem"
            >
              <div className="flex items-center gap-2 mb-2">
                <LabelIcon
                  label={c.title}
                  size={18}
                  fallback={<CardIcon className="text-[#3A5166] shrink-0" />}
                />
                <div className="text-[16px] font-bold text-[#092540]">
                  {c.title}
                </div>
              </div>
              <div className="text-[13px] font-normal text-[#3A5166] leading-snug">
                {c.description}
              </div>
            </A>
          ),
        )}
      </div>
    </div>
  );
}

function ResourcesPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="flex gap-6 pt-10 px-6 pb-6">
      <div className="flex flex-1 gap-6">
        {RESOURCES_COLUMNS.map((col, i) => (
          <div key={i} className="flex-1 min-w-0">
            <div className="px-3 mb-1 text-[14px] font-bold tracking-[0.14px] text-[#092540]">
              {col.heading}
            </div>
            <ul className="flex flex-col">
              {col.items.map((it) => (
                <li key={it.href + it.label}>
                  <A
                    href={it.href}
                    external={it.external}
                    onClick={onNavigate}
                    className="flex items-center gap-2 px-3 py-2 text-[16px] font-bold text-[#092540] rounded-md hover:bg-[#f6f8fb] no-underline"
                    style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
                    role="menuitem"
                  >
                    <LabelIcon
                      label={it.label}
                      size={16}
                      fallback={<RowIcon className="shrink-0 text-[#aab2ba]" />}
                    />
                    <span className="truncate">{it.label}</span>
                  </A>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="w-[253px] shrink-0">
        <SideBanner onNavigate={onNavigate} />
      </div>
    </div>
  );
}

type MobileView =
  | { kind: "root" }
  | { kind: "products" }
  | { kind: "solutions" }
  | { kind: "resources" }
  | { kind: "productTab"; tabId: string }
  | { kind: "solutionTab"; tabId: string };

function MobileDrawer({ onClose }: { onClose: () => void }) {
  const [view, setView] = useState<MobileView>({ kind: "root" });
  const back = useCallback(() => {
    setView((v) => {
      if (v.kind === "productTab") return { kind: "products" };
      if (v.kind === "solutionTab") return { kind: "solutions" };
      return { kind: "root" };
    });
  }, []);

  const header = (() => {
    switch (view.kind) {
      case "root":
        return null;
      case "products":
        return "Products";
      case "solutions":
        return "Solutions";
      case "resources":
        return "Resources";
      case "productTab":
        return PRODUCT_TABS.find((t) => t.id === view.tabId)?.label || "";
      case "solutionTab":
        return SOLUTION_TABS.find((t) => t.id === view.tabId)?.label || "";
    }
  })();

  return (
    <div
      className="fixed inset-0 z-[2000] bg-white text-[#092540] overflow-y-auto flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      <div className="sticky top-0 bg-white flex items-center justify-between h-14 px-4 border-b border-[#eef0f3] z-10">
        {view.kind === "root" ? (
          <>
            <A
              href="/"
              className="inline-flex items-center text-[#092540]"
              onClick={onClose}
            >
              <LogoSvg className="text-[#092540]" />
              <span className="sr-only">Similarweb</span>
            </A>
            <button
              type="button"
              className="p-2 text-[#092540]"
              aria-label="Close menu"
              onClick={onClose}
            >
              <CloseIcon />
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="inline-flex items-center gap-2 p-2 text-[#092540] text-[16px] font-bold"
              aria-label="Back"
              onClick={back}
            >
              <ArrowLeft />
              <span>{header}</span>
            </button>
            <button
              type="button"
              className="p-2 text-[#092540]"
              aria-label="Close menu"
              onClick={onClose}
            >
              <CloseIcon />
            </button>
          </>
        )}
      </div>

      <div className="flex-1 px-4 py-4">
        <div className="relative mb-4">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aab2ba]" />
          <input
            type="text"
            placeholder="Analyze any website or app"
            className="w-full h-11 pl-9 pr-3 rounded-md bg-[#f4f6fa] text-[14px] text-[#092540] placeholder:text-[#aab2ba] border border-transparent focus:outline-none focus:border-[#c5d2ff]"
            aria-label="Search"
          />
        </div>

        {view.kind === "root" && (
          <MobileRoot
            onOpen={(key) => setView({ kind: key })}
            onNavigate={onClose}
          />
        )}
        {view.kind === "products" && (
          <MobileTabList
            tabs={PRODUCT_TABS}
            withBrandIcons
            onOpen={(tabId) => setView({ kind: "productTab", tabId })}
            onNavigate={onClose}
          />
        )}
        {view.kind === "solutions" && (
          <MobileTabList
            tabs={SOLUTION_TABS}
            onOpen={(tabId) => setView({ kind: "solutionTab", tabId })}
            onNavigate={onClose}
          />
        )}
        {view.kind === "resources" && <MobileResources onNavigate={onClose} />}
        {view.kind === "productTab" && (
          <MobileTabContent
            tab={
              PRODUCT_TABS.find((t) => t.id === view.tabId) ?? PRODUCT_TABS[0]
            }
            onNavigate={onClose}
          />
        )}
        {view.kind === "solutionTab" && (
          <MobileTabContent
            tab={
              SOLUTION_TABS.find((t) => t.id === view.tabId) ?? SOLUTION_TABS[0]
            }
            onNavigate={onClose}
          />
        )}
      </div>

      {view.kind === "root" && (
        <div className="sticky bottom-0 bg-white p-4 border-t border-[#eef0f3] flex items-center gap-3">
          <A
            href="/corp/book-a-demo/"
            onClick={onClose}
            className="inline-flex items-center justify-center h-[42px] px-4 rounded-[42px] border border-[#FF7A1A] text-[14px] font-bold text-[#FF7A1A] flex-1 no-underline"
          >
            Get a demo
          </A>
          <A
            href="https://account.similarweb.com/journey/registration"
            onClick={onClose}
            external
            className="relative inline-flex items-center justify-center h-[42px] px-4 rounded-[42px] text-[14px] font-bold text-white overflow-hidden flex-1 no-underline"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-[42px]"
              style={{
                background:
                  "linear-gradient(90deg, rgb(25,90,254) 0.39%, rgb(58,86,232) 28.56%, rgb(196,76,147) 65.51%, rgb(255,109,3) 87.47%, rgb(255,150,3) 99.69%)",
              }}
            />
            <span className="relative">Get started</span>
          </A>
        </div>
      )}
    </div>
  );
}

function MobileRoot({
  onOpen,
  onNavigate,
}: {
  onOpen: (key: "products" | "solutions" | "resources") => void;
  onNavigate: () => void;
}) {
  const rows: {
    label: string;
    href?: string;
    onClick?: () => void;
    external?: boolean;
  }[] = [
    { label: "Products", onClick: () => onOpen("products") },
    { label: "Solutions", onClick: () => onOpen("solutions") },
    { label: "Resources", onClick: () => onOpen("resources") },
    {
      label: "Pricing",
      href: "https://www.similarweb.com/packages/marketing/",
    },
    { label: "Explore API", href: "/corp/daas/api/" },
    {
      label: "Login",
      href: "https://secure.similarweb.com/account/login/default",
      external: true,
    },
  ];
  return (
    <ul className="flex flex-col">
      {rows.map((r) =>
        r.onClick ? (
          <li key={r.label}>
            <button
              type="button"
              onClick={r.onClick}
              className="w-full flex items-center justify-between py-4 text-[16px] font-bold text-[#092540]"
            >
              {r.label}
              <ChevronRightThin className="text-[#092540]" />
            </button>
          </li>
        ) : (
          <li key={r.label}>
            <A
              href={r.href!}
              external={r.external}
              onClick={onNavigate}
              className="flex items-center py-4 text-[16px] font-bold text-[#092540] no-underline"
            >
              {r.label}
            </A>
          </li>
        ),
      )}
    </ul>
  );
}

function MobileTabList({
  tabs,
  withBrandIcons,
  onOpen,
}: {
  tabs: TabPanel[];
  withBrandIcons?: boolean;
  onOpen: (tabId: string) => void;
  onNavigate: () => void;
}) {
  const [first, ...rest] = tabs;
  const firstIsFreeTools = first?.id === "free-tools";
  return (
    <ul className="flex flex-col">
      {firstIsFreeTools && (
        <li>
          <button
            type="button"
            onClick={() => onOpen(first.id)}
            className="w-full flex items-center justify-between py-4 text-[16px] font-bold text-[#092540] border-b border-[#eef0f3]"
          >
            {first.label}
            <ChevronRightThin className="text-[#092540]" />
          </button>
        </li>
      )}
      {(firstIsFreeTools ? rest : tabs).map((tab) => (
        <li key={tab.id}>
          <button
            type="button"
            onClick={() => onOpen(tab.id)}
            className="w-full flex items-center gap-3 py-3 text-[16px] font-bold text-[#092540]"
          >
            {withBrandIcons && (
              <BrandCircleIcon id={tab.id} size={28} className="shrink-0" />
            )}
            <span className="flex-1 text-left">{tab.label}</span>
            <ChevronRightThin className="text-[#092540]" />
          </button>
        </li>
      ))}
    </ul>
  );
}

function MobileTabContent({
  tab,
  onNavigate,
}: {
  tab: TabPanel;
  onNavigate: () => void;
}) {
  if (tab.kind === "links") {
    const bannerImg = tab.banner?.imgMobile || tab.banner?.img;
    return (
      <div className="flex flex-col gap-6">
        {tab.banner && (
          <A
            href={tab.banner.href}
            onClick={onNavigate}
            className="relative block rounded-lg overflow-hidden text-white no-underline flex flex-col"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: bannerGradient(tab.banner.variant, "mobile") }}
            />
            <span className="relative flex flex-col gap-2 px-4 pt-4">
              <span className="text-[24px] font-bold leading-tight text-white">
                {tab.banner.title}
              </span>
              <span className="text-[14px] font-normal opacity-95 text-white">
                {tab.banner.subtitle}
              </span>
              <span className="mt-1 inline-flex items-center gap-1.5 text-[14px] font-bold text-white">
                Learn more
                <ArrowRight />
              </span>
            </span>
            {bannerImg && (
              <img
                src={bannerImg}
                alt=""
                aria-hidden="true"
                className="relative block w-full h-auto"
                loading="lazy"
              />
            )}
          </A>
        )}
        <div className="flex flex-col gap-6">
          {tab.lists.map((list, i) => (
            <div key={i} className="flex flex-col gap-2">
              {list.heading && (
                <div className="text-[15px] font-bold text-[#092540]">
                  {list.heading}
                </div>
              )}
              <ul className="flex flex-col">
                {list.items.map((it) => (
                  <li key={it.href + it.label}>
                    <A
                      href={it.href}
                      external={it.external}
                      onClick={onNavigate}
                      className="flex items-center gap-2.5 py-2 text-[14px] text-[#092540]/85 no-underline"
                    >
                      <LabelIcon
                        label={it.label}
                        size={16}
                        fallback={<RowIcon className="shrink-0 text-[#aab2ba]" />}
                      />
                      <span>{it.label}</span>
                    </A>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const cardStyle =
    tab.cardStyle ?? (tab.cards[0]?.variantRgb ? "colored" : "icon");
  return (
    <div className="flex flex-col gap-4">
      {tab.cardHeading && (
        <div className="text-[14px] font-bold text-[#092540]">
          {tab.cardHeading}
        </div>
      )}
      <ul className="flex flex-col gap-3">
        {tab.cards.map((c) => {
          const isColored = cardStyle === "colored";
          const cardBg = isColored ? cardTintBg(c.variantRgb) : undefined;
          return (
            <li key={c.href + c.title}>
              <A
                href={c.href}
                external={c.external}
                onClick={onNavigate}
                className={`block rounded-xl ${isColored ? "border border-transparent" : "border border-[#eef0f3]"} p-4 no-underline`}
                style={cardBg ? { background: cardBg } : undefined}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <LabelIcon
                    label={c.title}
                    size={20}
                    fallback={
                      isColored ? (
                        <span
                          aria-hidden="true"
                          className="inline-flex items-center justify-center w-5 h-5 rounded-full"
                          style={{
                            background: c.variantRgb
                              ? `rgb(${c.variantRgb})`
                              : "#195AFE",
                          }}
                        >
                          <CardIcon className="text-white" />
                        </span>
                      ) : (
                        <CardIcon className="text-[#3A5166]" />
                      )
                    }
                  />
                  <div className="text-[15px] font-bold text-[#092540]">
                    {c.title}
                  </div>
                </div>
                <div className="text-[13px] font-normal text-[#092540]/75 leading-snug">
                  {c.description}
                </div>
              </A>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function MobileResources({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="flex flex-col gap-6">
      {RESOURCES_COLUMNS.map((col, i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="text-[15px] font-bold text-[#092540]">
            {col.heading}
          </div>
          <ul className="flex flex-col">
            {col.items.map((it) => (
              <li key={it.href + it.label}>
                <A
                  href={it.href}
                  external={it.external}
                  onClick={onNavigate}
                  className="flex items-center gap-2.5 py-2 text-[14px] text-[#092540]/85 no-underline"
                >
                  <LabelIcon
                    label={it.label}
                    size={16}
                    fallback={<RowIcon className="shrink-0 text-[#aab2ba]" />}
                  />
                  <span>{it.label}</span>
                </A>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
