import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Globe,
  Menu,
  Search,
  X,
} from "lucide-react";

const SITE_BASE = "https://www.solventum.com";
const LOGO_SRC =
  "https://s7d9.scene7.com/is/content/mmmspinco/solventum-logo-horz-black-4?ts=1755617370220&dpr=off";

// ─── Types ────────────────────────────────────────────────────────────────────

type RowKind = "secondary-title" | "heading-static" | "subtitle" | "description";

type NavRow = {
  kind: RowKind;
  text: string;
  href?: string;
  external?: boolean;
};

type NavColumn = {
  rows: NavRow[];
};

type CalloutItem = {
  label: string;
  href: string;
  external?: boolean;
  iconName: string;
};

type NavGroup = {
  label: string;
  href: string;
  external?: boolean;
  columns?: NavColumn[];
  callout?: CalloutItem[];
};

// ─── Nav data ─────────────────────────────────────────────────────────────────

function ext(href: string): boolean {
  try {
    return new URL(href).hostname !== "www.solventum.com";
  } catch {
    return false;
  }
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Medical",
    href: "/en-us/home/medical/",
    columns: [
      {
        rows: [
          { kind: "secondary-title", text: "Advanced wound care", href: "/en-us/home/medical/advanced-wound-care/" },
          { kind: "subtitle", text: "Advanced skin care", href: "/en-us/home/medical/advanced-wound-care/advanced-skin-care/" },
          { kind: "subtitle", text: "Negative pressure wound therapy", href: "/en-us/home/medical/advanced-wound-care/negative-pressure-wound-therapy/" },
          { kind: "subtitle", text: "Advanced wound dressings", href: "/en-us/home/medical/advanced-wound-care/advanced-wound-dressings/" },
        ],
      },
      {
        rows: [
          { kind: "secondary-title", text: "Surgical solutions", href: "/en-us/home/medical/surgical-solutions/" },
          { kind: "subtitle", text: "Antimicrobial incise drapes", href: "/en-us/home/medical/surgical-solutions/antimicrobial-incise-drapes/" },
          { kind: "subtitle", text: "Temperature management", href: "/en-us/home/medical/surgical-solutions/temperature-management/" },
          { kind: "subtitle", text: "Surgical skin preparation", href: "/en-us/home/medical/surgical-solutions/skin-preparations/" },
        ],
      },
      {
        rows: [
          { kind: "secondary-title", text: "IV site management", href: "/en-us/home/medical/iv-site-management/" },
          { kind: "subtitle", text: "IV dressings", href: "/en-us/home/medical/iv-site-management/iv-dressings/" },
          { kind: "subtitle", text: "Disinfecting port protectors", href: "/en-us/home/medical/iv-site-management/disinfecting-port-protectors/" },
          { kind: "subtitle", text: "IV training", href: "/en-us/home/medical/iv-site-management/iv-training/" },
        ],
      },
      {
        rows: [
          { kind: "secondary-title", text: "Sterilization assurance", href: "/en-us/home/medical/sterilization-assurance/" },
          { kind: "subtitle", text: "Steam sterilization", href: "/en-us/home/medical/sterilization-assurance/steam-sterilization/" },
          { kind: "subtitle", text: "Low temperature sterilization (VH2O2 & EtO)", href: "/en-us/home/medical/sterilization-assurance/low-temperature-sterilization/" },
        ],
      },
      {
        rows: [
          { kind: "secondary-title", text: "Patient management & monitoring", href: "/en-us/home/medical/patient-monitoring-and-management/", external: true },
          { kind: "subtitle", text: "Littmann® Stethoscopes", href: "https://www.littmann.com/en-us/home/", external: true },
          { kind: "subtitle", text: "ECG Electrodes", href: "/en-us/home/medical/patient-monitoring-and-management/ecg-electrodes/" },
          { kind: "subtitle", text: "Medical tapes, wraps & securement devices", href: "/en-us/home/medical/patient-monitoring-and-management/medical-tapes-wraps-and-securement-devices/" },
        ],
      },
      {
        rows: [
          { kind: "secondary-title", text: "Medical technologies OEM", href: "/en-us/home/medical/medical-technologies-oem/" },
          { kind: "subtitle", text: "Transdermal components", href: "/en-us/home/medical/medical-technologies-oem/transdermal-components/" },
          { kind: "subtitle", text: "Medical wearables", href: "/en-us/home/medical/medical-technologies-oem/medical-wearables/" },
          { kind: "subtitle", text: "Diagnostics", href: "/en-us/home/medical/medical-technologies-oem/diagnostics/" },
          { kind: "subtitle", text: "Resources", href: "/en-us/home/medical/medical-technologies-oem/resources/" },
          { kind: "subtitle", text: "Optical solutions", href: "/en-us/home/medical/medical-technologies-oem/optical-solutions/" },
        ],
      },
    ],
    callout: [
      { label: "Resources", href: "/en-us/home/medical/resources/", iconName: "resources" },
      { label: "Education", href: "/en-us/home/medical/education/", iconName: "education" },
      { label: "Solventum™ Express", href: "https://express.solventum.com/", external: true, iconName: "external-link" },
      { label: "Instructions for use", href: "https://eifu.solventum.com/", external: true, iconName: "search" },
      { label: "Support", href: "/en-us/home/medical/support/", iconName: "support" },
    ],
  },
  {
    label: "Oral care",
    href: "/en-us/home/oral-care/",
    columns: [
      {
        rows: [
          { kind: "secondary-title", text: "Dental professionals", href: "/en-us/home/oral-care/dental-solutions/" },
          { kind: "subtitle", text: "Direct procedures", href: "/en-us/home/oral-care/dental-solutions/direct-procedure/" },
          { kind: "subtitle", text: "Indirect procedures", href: "/en-us/home/oral-care/dental-solutions/indirect-procedure/" },
          { kind: "subtitle", text: "Preventative dental care", href: "/en-us/home/oral-care/dental-solutions/preventive-care/" },
          { kind: "subtitle", text: "Custom solutions", href: "/en-us/home/oral-care/dental-solutions/custom-solutions/" },
          { kind: "subtitle", text: "All dental products", href: "/en-us/home/oral-care/dental-solutions/all-products/" },
        ],
      },
      {
        rows: [
          { kind: "secondary-title", text: "Orthodontic professionals", href: "/en-us/home/oral-care/orthodontic-solutions/" },
          { kind: "subtitle", text: "Fixed orthodontic appliances", href: "/en-us/home/oral-care/orthodontic-solutions/fixed-appliances/" },
          { kind: "subtitle", text: "Orthodontic bonding solutions", href: "/en-us/home/oral-care/orthodontic-solutions/bonding-solutions/" },
          { kind: "subtitle", text: "Custom orthodontic solutions", href: "/en-us/home/oral-care/clarity-solutions/" },
          { kind: "subtitle", text: "All orthodontic products", href: "/en-us/home/oral-care/orthodontic-solutions/all-products/" },
        ],
      },
      {
        rows: [
          { kind: "secondary-title", text: "Clarity™ solutions", href: "/en-us/home/oral-care/clarity-solutions/" },
          { kind: "subtitle", text: "Clarity™ Aligners", href: "/en-us/home/oral-care/clarity-solutions/clarity-aligners/" },
          { kind: "subtitle", text: "Clarity™ Precision Grip Attachments", href: "/en-us/home/oral-care/clarity-solutions/clarity-precision-grip-attachments/" },
          { kind: "subtitle", text: "Clarity™ Digital Bonding", href: "/en-us/home/oral-care/clarity-solutions/clarity-digital-bonding/" },
          { kind: "subtitle", text: "Clarity™ Attachment Material", href: "https://www.solventum.com/en-us/home/f/b5005574000/" },
          { kind: "subtitle", text: "Clarity™ Portal", href: "/en-us/home/oral-care/clarity-solutions/clarity-portal/" },
        ],
      },
      {
        rows: [
          { kind: "secondary-title", text: "Resources & support", href: "/en-us/home/oral-care/resources/" },
          { kind: "subtitle", text: "Authorized dental distributors", href: "/en-us/home/oral-care/support/distributors/" },
          { kind: "subtitle", text: "Brain Floss blog", href: "/en-us/home/oral-care/brain-floss/" },
          { kind: "subtitle", text: "Our rebrand story", href: "/en-us/home/oral-care/support/our-rebrand-story/" },
        ],
      },
    ],
    callout: [
      { label: "Education", href: "/en-us/home/oral-care/education/", iconName: "education" },
      { label: "Oral care support", href: "/en-us/home/oral-care/support/", iconName: "support" },
      { label: "All oral care products", href: "/en-us/home/oral-care/all-products/", iconName: "globe" },
      { label: "Clarity™ Portal login", href: "https://clarity.solventum.com/", external: true, iconName: "external-link" },
      { label: "Are you a patient?", href: "/en-us/home/oral-care/patients/", iconName: "person" },
    ],
  },
  {
    label: "Health information & technology",
    href: "/en-us/home/health-information-technology/",
    columns: [
      {
        rows: [
          { kind: "heading-static", text: "Solutions" },
          { kind: "subtitle", text: "Ambient documentation and speech recognition", href: "/en-us/home/health-information-technology/ambient-documentation-speech-recognition/" },
          { kind: "subtitle", text: "Clinical documentation integrity", href: "/en-us/home/health-information-technology/clinical-documentation-integrity/" },
          { kind: "subtitle", text: "Coding", href: "/en-us/home/health-information-technology/coding/" },
          { kind: "subtitle", text: "Population health analytics and grouping", href: "/en-us/home/health-information-technology/population-health-analytics-grouping/" },
          { kind: "subtitle", text: "Consulting and outsourced services", href: "/en-us/home/health-information-technology/consulting-outsourced-services/" },
        ],
      },
      {
        rows: [
          { kind: "heading-static", text: "Who we serve" },
          { kind: "subtitle", text: "Clinicians", href: "/en-us/home/health-information-technology/clinicians/" },
          { kind: "subtitle", text: "Revenue cycle teams", href: "/en-us/home/health-information-technology/revenue-cycle-teams/" },
          { kind: "subtitle", text: "Payers and payment programs", href: "/en-us/home/health-information-technology/payers-payment-programs/" },
          { kind: "subtitle", text: "Federal government health agencies", href: "/en-us/home/health-information-technology/federal-government-health-agencies/" },
          { kind: "subtitle", text: "C-suite", href: "/en-us/home/health-information-technology/c-suite/" },
        ],
      },
      {
        rows: [
          { kind: "heading-static", text: "What we deliver" },
          { kind: "subtitle", text: "Accurate and streamlined clinical documentation", href: "/en-us/home/health-information-technology/accurate-and-streamlined-clinical-documentation/" },
          { kind: "subtitle", text: "Cost and performance management", href: "/en-us/home/health-information-technology/cost-performance-management/" },
          { kind: "subtitle", text: "Quality care and outcomes", href: "/en-us/home/health-information-technology/quality-care-outcomes/" },
        ],
      },
      {
        rows: [
          { kind: "heading-static", text: "Platforms" },
          { kind: "subtitle", text: "Solventum™ Cloud Platform", href: "/en-us/home/health-information-technology/platforms/cloud/" },
          { kind: "subtitle", text: "Solventum™ 360 Encompass™ System", href: "/en-us/home/health-information-technology/platforms/solventum-360-encompass-system/" },
        ],
      },
      {
        rows: [
          { kind: "secondary-title", text: "Resources & education", href: "/en-us/home/health-information-technology/resources-education/" },
          { kind: "subtitle", text: "Case studies", href: "/en-us/home/health-information-technology/resources-education/?solventum-en-glo-resources%5Bquery%5D=&solventum-en-glo-resources%5BrefinementList%5D%5BcontentType%5D%5B0%5D=Case%20Studies%2C%20Clinical%20Studies%20%26%20White%20Papers#resourceLibrary" },
          { kind: "subtitle", text: "Webinars", href: "/en-us/home/health-information-technology/resources-education/webinars/" },
          { kind: "subtitle", text: "Events", href: "/en-us/home/health-information-technology/resources-education/events/" },
          { kind: "subtitle", text: "News", href: "/en-us/home/health-information-technology/news/" },
          { kind: "subtitle", text: "Inside Angle blog", href: "/en-us/home/health-information-technology/resources-education/blog/" },
          { kind: "subtitle", text: "HIS Learning Nexus", href: "https://solventum-his-us.myabsorb.com/", external: true },
        ],
      },
      {
        rows: [
          { kind: "secondary-title", text: "Support", href: "/en-us/home/health-information-technology/support/" },
          { kind: "subtitle", text: "Submit a support ticket", href: "https://solventumhis.servicenowservices.com/csm", external: true },
          { kind: "subtitle", text: "Product documentation", href: "https://solventumhis.servicenowservices.com/csm?id=kb_home", external: true },
        ],
      },
    ],
    callout: [
      { label: "Contact us", href: "/en-us/home/health-information-technology/support/", iconName: "support" },
    ],
  },
  {
    label: "Purification & filtration",
    href: "/en-us/home/purification-filtration/",
    columns: [
      {
        rows: [
          { kind: "secondary-title", text: "Biopharmaceutical purification", href: "/en-us/home/purification-filtration/biopharmaceutical-purification/" },
          { kind: "subtitle", text: "Harvest & clarification", href: "/en-us/home/purification-filtration/biopharmaceutical-purification/harvest-clarification/" },
          { kind: "subtitle", text: "Anion exchange chromatography", href: "/en-us/home/purification-filtration/biopharmaceutical-purification/anion-exchange-chromatography/" },
          { kind: "subtitle", text: "Sterile filtration", href: "/en-us/home/purification-filtration/biopharmaceutical-purification/sterile-filtration/" },
          { kind: "subtitle", text: "Gene therapy", href: "/en-us/home/purification-filtration/biopharmaceutical-purification/gene-therapy/" },
          { kind: "subtitle", text: "All products", href: "/en-us/home/purification-filtration/biopharmaceutical-purification/all-products/" },
          { kind: "subtitle", text: "School of Purification", href: "/en-us/home/purification-filtration/biopharmaceutical-purification/school-of-purification/" },
          { kind: "subtitle", text: "Resources", href: "/en-us/home/purification-filtration/biopharmaceutical-purification/resources/" },
          { kind: "subtitle", text: "Support", href: "/en-us/home/purification-filtration/biopharmaceutical-purification/support/" },
        ],
      },
      {
        rows: [
          { kind: "secondary-title", text: "Manufacturing", href: "/en-us/home/purification-filtration/manufacturing/" },
          { kind: "subtitle", text: "Industrial water", href: "/en-us/home/purification-filtration/manufacturing/industrial-water/" },
          { kind: "subtitle", text: "Microelectronics", href: "/en-us/home/purification-filtration/manufacturing/microelectronics/" },
          { kind: "subtitle", text: "Food & beverage manufacturing", href: "/en-us/home/purification-filtration/manufacturing/food-beverage/" },
          { kind: "subtitle", text: "Advanced dissolved gas control", href: "/en-us/home/purification-filtration/manufacturing/advanced-dissolved-gas-control/" },
          { kind: "subtitle", text: "All products", href: "/en-us/home/purification-filtration/manufacturing/all-products/" },
          { kind: "subtitle", text: "Resources", href: "/en-us/home/purification-filtration/manufacturing/resources/" },
          { kind: "subtitle", text: "Support", href: "/en-us/home/purification-filtration/manufacturing/support/" },
        ],
      },
      {
        rows: [
          { kind: "secondary-title", text: "Commercial water", href: "/en-us/home/purification-filtration/commercial-water/" },
          { kind: "subtitle", text: "Foodservice", href: "/en-us/home/purification-filtration/commercial-water/foodservice/" },
          { kind: "subtitle", text: "Education & childcare facilities", href: "/en-us/home/purification-filtration/commercial-water/education-childcare-facilities/" },
          { kind: "subtitle", text: "Resources", href: "/en-us/home/purification-filtration/commercial-water/resources/" },
          { kind: "subtitle", text: "Support", href: "/en-us/home/purification-filtration/commercial-water/support/" },
        ],
      },
      {
        rows: [
          { kind: "secondary-title", text: "Membranes for OEMs", href: "/en-us/home/purification-filtration/membranes-for-oems/" },
          { kind: "subtitle", text: "Industrial membrane materials", href: "/en-us/home/purification-filtration/membranes-for-oems/industrial-membrane-materials/" },
          { kind: "subtitle", text: "Medical membrane materials", href: "/en-us/home/purification-filtration/membranes-for-oems/medical-membrane-materials/" },
          { kind: "subtitle", text: "Resources", href: "/en-us/home/purification-filtration/membranes-for-oems/resources/" },
          { kind: "subtitle", text: "Support", href: "/en-us/home/purification-filtration/membranes-for-oems/support/" },
        ],
      },
      {
        rows: [
          { kind: "secondary-title", text: "Residential water", href: "/en-us/home/purification-filtration/residential-water/" },
          { kind: "subtitle", text: "Under sink filtration", href: "/en-us/home/purification-filtration/residential-water/under-sink-filtration/" },
          { kind: "subtitle", text: "Whole house filtration", href: "/en-us/home/purification-filtration/residential-water/whole-house-filtration/" },
          { kind: "subtitle", text: "All products", href: "/en-us/home/purification-filtration/residential-water/all-products/" },
          { kind: "subtitle", text: "Resources", href: "/en-us/home/purification-filtration/residential-water/resources/" },
          { kind: "subtitle", text: "Support", href: "/en-us/home/purification-filtration/residential-water/support/" },
        ],
      },
    ],
    callout: [],
  },
  {
    label: "Patients & consumers",
    href: "/en-us/home/patients-consumers/",
  },
  {
    label: "Resources",
    href: "/en-us/home/resources/",
    columns: [
      {
        rows: [
          { kind: "secondary-title", text: "Medical", href: "/en-us/home/medical/resources/" },
          { kind: "description", text: "Get inspired by the stories behind our innovations and find medical resources including product regulatory information and instructions for use." },
        ],
      },
      {
        rows: [
          { kind: "secondary-title", text: "Oral care", href: "/en-us/home/oral-care/resources/" },
          { kind: "description", text: "Explore our oral care resource library for brochures, case studies, clinical studies, white papers, infographics, and technical papers. Stay updated with blog insights from industry experts sharing clinical cases and their knowledge." },
        ],
      },
      {
        rows: [
          { kind: "secondary-title", text: "Health information & technology", href: "/en-us/home/health-information-technology/resources-education/" },
          { kind: "description", text: "Sharpen your skills and knowledge with continued education, customer training, enlightening topical webinars, case studies and more resources." },
        ],
      },
      {
        rows: [
          { kind: "heading-static", text: "Purification & filtration" },
          { kind: "subtitle", text: "Biopharmaceutical purification resources", href: "/en-us/home/purification-filtration/biopharmaceutical-purification/resources/" },
          { kind: "subtitle", text: "Manufacturing resources", href: "/en-us/home/purification-filtration/manufacturing/resources/" },
          { kind: "subtitle", text: "Commercial water resources", href: "/en-us/home/purification-filtration/commercial-water/resources/" },
          { kind: "subtitle", text: "Membranes OEMs resources", href: "/en-us/home/purification-filtration/membranes-for-oems/resources/" },
          { kind: "subtitle", text: "Residential water resources", href: "/en-us/home/purification-filtration/residential-water/resources/" },
        ],
      },
      {
        rows: [
          { kind: "secondary-title", text: "Solventum Stories", href: "/en-us/home/resources/stories/all-stories/" },
          { kind: "description", text: "Explore real stories from patients and healthcare providers that bring our mission to life and show the human impact behind our work." },
        ],
      },
    ],
    callout: [
      { label: "Instructions for use & certificates", href: "https://eifu.solventum.com/", external: true, iconName: "search" },
      { label: "Compliance and safety documents", href: "https://www.3m.com/3M/en_US/company-us/SDS-search/", external: true, iconName: "file" },
      { label: "Lithium battery test summary search", href: "https://www.3m.com/3M/en_US/company-us/lithium-battery-test-summary-report-search/", external: true, iconName: "external-link" },
    ],
  },
  {
    label: "Education",
    href: "/en-us/home/education/",
    columns: [
      {
        rows: [
          { kind: "secondary-title", text: "Medical", href: "/en-us/home/medical/education/" },
          { kind: "description", text: "Free continuing education for nurses, infection preventionists, sterile processing managers and other health care professionals. Solventum medical course topics include: infection prevention, skin care and wound care best practices and guidelines for improving patient outcomes." },
        ],
      },
      {
        rows: [
          { kind: "secondary-title", text: "Oral care", href: "/en-us/home/oral-care/education/" },
          { kind: "description", text: "Enhance your expertise with our continuing education programs for dental professionals. Topics include advanced restorative techniques, preventive care strategies, and the latest dental technology. Stay ahead with our expert-led webinars, hands-on workshops and valuable resources." },
        ],
      },
      {
        rows: [
          { kind: "secondary-title", text: "Health information & technology", href: "/en-us/home/health-information-technology/resources-education/" },
          { kind: "description", text: "Sharpen your skills and knowledge with continued education, customer training, enlightening topical webinars, case studies and more resources." },
        ],
      },
      {
        rows: [
          { kind: "secondary-title", text: "Purification & filtration", href: "/en-us/home/purification-filtration/biopharmaceutical-purification/school-of-purification/" },
          { kind: "description", text: "Solventum's School of Purification educates topics such as biopharmaceutical purification, anion exchange chromatography & recombinant protein production." },
        ],
      },
    ],
    callout: [],
  },
  {
    label: "Our company",
    href: "/en-us/home/our-company/",
    columns: [
      { rows: [{ kind: "secondary-title", text: "Leadership", href: "/en-us/home/our-company/leadership/" }, { kind: "description", text: "Learn about current company officers and board of directors." }] },
      { rows: [{ kind: "secondary-title", text: "Careers", href: "/en-us/home/our-company/careers/" }, { kind: "description", text: "Explore current career opportunities, or sign up for job alerts, with related information on benefits, diversity, equity, sustainability and more." }] },
      { rows: [{ kind: "secondary-title", text: "Partners & suppliers", href: "/en-us/home/our-company/partners-suppliers/" }, { kind: "description", text: "Here both current or prospective suppliers with us can find information and resources on expected code of conduct, responsibility, ethics and more." }] },
      { rows: [{ kind: "secondary-title", text: "Governance", href: "/en-us/home/our-company/leadership/governance/" }, { kind: "description", text: "View our governance priorities involving corporate governance, innovation management, corporate code of conduct, enterprise risk and stakeholder management here." }] },
      { rows: [{ kind: "secondary-title", text: "Ethics & compliance", href: "/en-us/home/our-company/ethics-compliance/" }, { kind: "description", text: "As a healthcare company we put people first in all we do. Learn about our ethics, code of conduct, how we work with others or report a concern here." }] },
      { rows: [{ kind: "secondary-title", text: "How we innovate", href: "/en-us/home/our-company/how-we-innovate/" }, { kind: "description", text: "Learn about the philosophy behind our approach to innovation, how we nurture and recognize new ideas, with examples of a few key past improvements to outcomes." }] },
      { rows: [{ kind: "secondary-title", text: "Sustainability & social impact", href: "/en-us/home/our-company/sustainability-social-impact/" }, { kind: "description", text: "Explore how we're embedding environmental stewardship, social responsibility and strong governance across our business from sourcing renewable electricity to supporting global communities." }] },
      { rows: [{ kind: "secondary-title", text: "Contact us", href: "/en-us/home/our-company/contact-us/" }, { kind: "description", text: "Easily locate information for our mailing address, submit a help request, key telephone numbers, hours of operation, submit an idea to us and more." }] },
    ],
    callout: [
      { label: "Newsroom", href: "https://news.solventum.com/", external: true, iconName: "news" },
      { label: "Investors", href: "https://investors.solventum.com/", external: true, iconName: "person" },
    ],
  },
];

const UTILITY_LINKS = [
  { label: "Login", href: "/en-us/home/login/" },
  { label: "Investors", href: "https://investors.solventum.com/", external: true },
  { label: "Careers", href: "/en-us/home/our-company/careers/" },
  { label: "Partner Portal login", href: "https://order.solventum.com/", external: true },
];

// ─── SVG icons for callout buttons that Lucide doesn't ship ──────────────────

function CalloutIcon({ name }: { name: string }) {
  switch (name) {
    case "resources":
      return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;
    case "education":
      return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>;
    case "support":
      return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0z"/></svg>;
    case "globe":
      return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
    case "person":
      return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
    case "news":
      return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10l6 6v8a2 2 0 0 1-2 2z"/><polyline points="17 10 12 10 12 3"/></svg>;
    case "file":
      return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
    case "external-link":
      return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
    case "search":
      return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
    default:
      return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
  }
}

// ─── Dropdown panel ──────────────────────────────────────────────────────────

function DropdownPanel({ group }: { group: NavGroup }) {
  const columns = group.columns ?? [];
  const callout = group.callout ?? [];

  return (
    <div
      role="menu"
      className="w-full bg-[#01332B] text-white shadow-xl"
    >
      <div className="max-w-[1280px] mx-auto px-5 pt-8 pb-6">
        {/* Section header link */}
        <a
          href={group.href}
          role="menuitem"
          {...(ext(group.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="inline-flex items-center gap-2 text-[#05DD4D] text-[32px] font-normal mb-6 hover:text-[#BFFDE3] transition-colors"
        >
          {group.label}
          <span aria-hidden="true">→</span>
        </a>

        {/* Columns grid — 3 equal columns, 32px gap, wrapping */}
        <div className="grid grid-cols-3 gap-x-8 gap-y-6">
          {columns.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-[6px]">
              {col.rows.map((row, ri) => {
                if (row.kind === "secondary-title") {
                  return (
                    <a
                      key={ri}
                      href={row.href}
                      role="menuitem"
                      {...(row.external || ext(row.href ?? "") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="flex items-center gap-1 text-[#05DD4D] text-[20px] font-normal hover:text-[#BFFDE3] transition-colors"
                    >
                      {row.text}
                      <span aria-hidden="true" className="text-base">→</span>
                    </a>
                  );
                }
                if (row.kind === "heading-static") {
                  return (
                    <span key={ri} className="text-white text-[20px] font-normal">
                      {row.text}
                    </span>
                  );
                }
                if (row.kind === "description") {
                  return (
                    <p key={ri} className="text-white text-base leading-relaxed max-w-[240px]">
                      {row.text}
                    </p>
                  );
                }
                // subtitle
                return (
                  <a
                    key={ri}
                    href={row.href}
                    role="menuitem"
                    {...(row.external || ext(row.href ?? "") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-[#DBFFF0] text-base hover:text-[#19A591] transition-colors"
                  >
                    {row.text}
                  </a>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom callout row */}
      {callout.length > 0 && (
        <div className="bg-[#005145] py-4">
          <div className="max-w-[1280px] mx-auto px-5 flex flex-row gap-6 flex-wrap">
            {callout.map((item, i) => (
              <a
                key={i}
                href={item.href}
                role="menuitem"
                {...(item.external || ext(item.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex items-center gap-2 text-[#DBFFF0] text-base font-bold hover:text-[#BFFDE3] transition-colors"
              >
                <span className="opacity-80">
                  <CalloutIcon name={item.iconName} />
                </span>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Mobile drawer ────────────────────────────────────────────────────────────

function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => closeRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const toggle = (label: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#01332B] text-white overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Main navigation"
    >
      {/* Close button */}
      <div className="flex justify-end p-4">
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close navigation"
          className="p-2"
        >
          <X size={28} className="text-[#00D44B]" />
        </button>
      </div>

      <nav>
        <ul>
          {NAV_GROUPS.map((group) => {
            const hasChildren = (group.columns?.length ?? 0) > 0;
            const isExpanded = expanded.has(group.label);

            return (
              <li key={group.label} className="border-b border-white/10">
                {hasChildren ? (
                  <>
                    <button
                      onClick={() => toggle(group.label)}
                      aria-expanded={isExpanded}
                      className="flex items-center justify-between w-full px-6 py-4 text-left text-white text-base font-medium"
                    >
                      {group.label}
                      <ChevronRight
                        size={20}
                        className={`text-[#00D44B] transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="bg-[#003D31] px-6 pb-4">
                        {group.columns?.map((col, ci) => (
                          <div key={ci} className="mb-4">
                            {col.rows.map((row, ri) => {
                              if (row.kind === "secondary-title") {
                                return (
                                  <a
                                    key={ri}
                                    href={row.href}
                                    onClick={onClose}
                                    {...(row.external || ext(row.href ?? "") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                    className="block pt-3 pb-1 text-[#00D44B] text-sm font-semibold"
                                  >
                                    {row.text} →
                                  </a>
                                );
                              }
                              if (row.kind === "heading-static") {
                                return (
                                  <span key={ri} className="block pt-3 pb-1 text-[#00D44B] text-sm font-semibold">
                                    {row.text}
                                  </span>
                                );
                              }
                              if (row.kind === "description") {
                                return (
                                  <p key={ri} className="text-white/60 text-xs leading-relaxed mb-1">
                                    {row.text}
                                  </p>
                                );
                              }
                              return (
                                <a
                                  key={ri}
                                  href={row.href}
                                  onClick={onClose}
                                  {...(row.external || ext(row.href ?? "") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                  className="block py-1 text-white/90 text-sm"
                                >
                                  {row.text}
                                </a>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={group.href}
                    onClick={onClose}
                    className="flex items-center px-6 py-4 text-white text-base font-medium"
                  >
                    {group.label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        {/* Utility strip at bottom of drawer */}
        <div className="flex flex-wrap gap-4 px-6 py-5 border-t border-white/10 mt-2">
          {UTILITY_LINKS.map((u) => (
            <a
              key={u.label}
              href={u.href}
              onClick={onClose}
              {...(u.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-white/80 text-sm underline"
            >
              {u.label}
            </a>
          ))}
          <span className="flex items-center gap-1 text-white/80 text-sm">
            <Globe size={14} />
            EN-US
          </span>
        </div>
      </nav>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function SiteHeader() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Escape key handler
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Outside click
  useEffect(() => {
    const handleMousedown = (e: MouseEvent) => {
      const nav = navRef.current;
      if (!nav) return;
      const path =
        typeof e.composedPath === "function" ? e.composedPath() : [];
      const insideNav = path.length
        ? path.includes(nav)
        : nav.contains(e.target as Node);
      if (!insideNav) setOpenGroup(null);
    };
    document.addEventListener("mousedown", handleMousedown);
    return () => document.removeEventListener("mousedown", handleMousedown);
  }, []);

  const handleTriggerClick = (label: string) => {
    setOpenGroup((prev) => (prev === label ? null : label));
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
    setTimeout(() => hamburgerRef.current?.focus(), 50);
  };

  return (
    <div className="bw-scope">
      {/* Mobile drawer */}
      <MobileDrawer open={mobileOpen} onClose={handleMobileClose} />

      <header className="bg-white relative">
        {/* ── Utility + Logo row ───────────────────────────────── */}
        <div className="max-w-[1280px] mx-auto px-5">
          <div className="flex items-center justify-between h-[82px]">
            {/* Logo */}
            <a href={`${SITE_BASE}/en-us/home/`} aria-label="Solventum homepage">
              <img
                src={LOGO_SRC}
                alt="Go to the Solventum homepage."
                width={192}
                height={48}
                className="block"
                style={{ height: "48px", width: "auto" }}
              />
            </a>

            {/* Desktop utility links */}
            <div className="hidden lg:flex items-center gap-5">
              {UTILITY_LINKS.map((u) => (
                <a
                  key={u.label}
                  href={u.href}
                  {...(u.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="text-[#19191A] text-sm font-medium underline hover:text-[#005145] transition-colors"
                >
                  {u.label}
                </a>
              ))}
              {/* Contact us pill button */}
              <a
                href="/en-us/home/our-company/contact-us/"
                className="text-[#0A7B6B] border-2 border-[#0A7B6B] rounded-full px-4 py-[9px] text-sm font-bold hover:bg-[#0A7B6B] hover:text-white transition-colors"
              >
                Contact us
              </a>
              {/* Search stub */}
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search"
                  className="border border-[#6E6E6E] rounded-full pl-3 pr-8 py-1.5 text-sm w-44 outline-none focus:border-[#0A7B6B]"
                  readOnly
                  aria-label="Search (not functional)"
                />
                <Search size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#303030]" />
              </div>
              {/* Language switcher stub */}
              <button
                aria-label="Language: English United States (not functional)"
                className="flex items-center gap-1 text-sm text-[#01332B]"
                onClick={() => {/* stubbed */}}
              >
                <Globe size={16} />
                EN-US
                <ChevronDown size={14} />
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              ref={hamburgerRef}
              className="lg:hidden p-2"
              aria-label="Main menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={28} className="text-[#303030]" />
            </button>
          </div>
        </div>

        {/* ── Main nav bar ─────────────────────────────────────── */}
        <nav
          ref={navRef}
          aria-label="Main navigation"
          className="hidden lg:block border-t border-[#888B8B] relative"
        >
          <div className="max-w-[1280px] mx-auto px-5">
            <ul className="flex items-center gap-0 h-12" role="menubar">
              {NAV_GROUPS.map((group) => {
                const hasDropdown = (group.columns?.length ?? 0) > 0;
                const isOpen = openGroup === group.label;

                return (
                  <li
                    key={group.label}
                    className="relative"
                  >
                    {hasDropdown ? (
                      <button
                        role="menuitem"
                        aria-haspopup="menu"
                        aria-expanded={isOpen}
                        aria-controls={`dropdown-${group.label.replace(/\s+/g, "-")}`}
                        onClick={() => handleTriggerClick(group.label)}
                        className={`flex items-center gap-1 px-3 py-3 text-sm font-bold whitespace-nowrap transition-colors ${
                          isOpen ? "text-[#005145] border-b-4 border-[#005145]" : "text-[#01332B] hover:text-[#0A7B6B]"
                        }`}
                      >
                        {group.label}
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                    ) : (
                      <a
                        href={group.href}
                        role="menuitem"
                        {...(group.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="flex items-center px-3 py-3 text-sm font-bold whitespace-nowrap text-[#01332B] hover:text-[#0A7B6B] transition-colors"
                      >
                        {group.label}
                      </a>
                    )}

                  </li>
                );
              })}
            </ul>
          </div>

          {/* Dropdown panel — absolute, below nav bar, scrolls with header */}
          {NAV_GROUPS.map((group) => {
            const isOpen = openGroup === group.label;
            const hasDropdown = (group.columns?.length ?? 0) > 0;
            if (!isOpen || !hasDropdown) return null;
            return (
              <div
                key={group.label}
                id={`dropdown-${group.label.replace(/\s+/g, "-")}`}
                className="absolute left-0 right-0 z-50 top-full"
              >
                <DropdownPanel group={group} />
              </div>
            );
          })}
        </nav>

        {/* Mobile search stub row */}
        <div className="lg:hidden px-4 pb-3">
          <div className="relative">
            <input
              type="search"
              placeholder="Search"
              className="w-full border border-[#6E6E6E] rounded-sm pl-3 pr-10 py-2 text-sm outline-none"
              readOnly
              aria-label="Search (not functional)"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1" aria-label="Submit search (not functional)">
              <Search size={18} className="text-[#303030]" />
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
