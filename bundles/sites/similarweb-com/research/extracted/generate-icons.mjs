#!/usr/bin/env node
// Reads products-clean.json / solutions-clean.json and produces
// src/header/icons.generated.ts — a label -> raw SVG string map.

import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(
  __dirname,
  "..",
  "..",
  "src",
  "header",
  "icons.generated.ts",
);

const products = JSON.parse(
  readFileSync(join(__dirname, "products-clean.json"), "utf-8"),
);
const solutions = JSON.parse(
  readFileSync(join(__dirname, "solutions-clean.json"), "utf-8"),
);
const sidebar = JSON.parse(
  readFileSync(join(__dirname, "sidebar-brand-icons.json"), "utf-8"),
);
const resources = JSON.parse(
  readFileSync(join(__dirname, "resources-icons.json"), "utf-8"),
);

const iconMap = new Map(); // label -> svg string

// Namespace random SVG gradient/clip IDs so they don't collide across instances.
let nsCounter = 0;
function namespace(svg) {
  const ns = `sw${nsCounter++}_`;
  // Find all ids defined inside <defs> and replace references to them.
  const idRe = /id="([^"]+)"/g;
  const ids = new Set();
  let m;
  while ((m = idRe.exec(svg))) ids.add(m[1]);
  let out = svg;
  for (const id of ids) {
    const esc = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    out = out
      .replace(new RegExp(`id="${esc}"`, "g"), `id="${ns}${id}"`)
      .replace(new RegExp(`#${esc}`, "g"), `#${ns}${id}`);
  }
  return out;
}

function add(label, svg) {
  if (!label || !svg) return;
  if (iconMap.has(label)) return; // first writer wins
  iconMap.set(label, namespace(svg));
}

// Products tabs: columns of items
for (const [, data] of Object.entries(products)) {
  for (const col of data.columns || []) {
    for (const item of col.items || []) {
      if (item.icon && item.icon.t === "svg") add(item.text, item.icon.html);
    }
  }
}

// Solutions tabs: cards
// The card's text is title+description concatenated. We need to split to get the title.
// We look at the title-case prefix vs the description. A simple heuristic: the title
// is the first chunk before a sentence-ending lowercase->uppercase transition, or
// before the first lowercase character (since titles are usually 1-4 words).
function splitTitle(text) {
  // Known titles from the extracted data. We'll match by checking if the text STARTS
  // with any of these; otherwise fall back to best-guess.
  const TITLES = [
    "Marketing",
    "SEO & GEO",
    "Sales",
    "Research & Analysts",
    "Ecommerce",
    "PPC",
    "Retail",
    "Consumer Goods",
    "Financial Services",
    "Travel",
    "B2B Software & Services",
    "Telecom",
    "Media",
    "Agencies",
    "Investors",
    "Logistics",
    "AI Studio",
    "AI Agents",
    "Data for AI",
    "MCP",
    "Data as a Service",
    "Integrations",
    "API",
    "Data Hub",
    "Data Feeds",
    "Advisory Services",
    "Custom Reporting",
    "Brand Health Tracking",
    "Category Insights",
    "Market Share Dashboards",
    "Digital Travel Analytics",
  ];
  const sorted = [...TITLES].sort((a, b) => b.length - a.length);
  for (const t of sorted) {
    if (text.startsWith(t)) return t;
  }
  return text; // fall back
}

// Known real card labels per solution tab (filtering out stale items).
const SOLUTION_REAL_LABELS = {
  "By Team": [
    "Marketing",
    "SEO & GEO",
    "Sales",
    "Research & Analysts",
    "Ecommerce",
    "PPC",
  ],
  "By Industry": [
    "Retail",
    "Consumer Goods",
    "Financial Services",
    "Travel",
    "B2B Software & Services",
    "Telecom",
    "Media",
    "Agencies",
    "Investors",
    "Logistics",
  ],
  "Similarweb AI": ["AI Studio", "AI Agents", "Data for AI", "MCP"],
  "Data as a Service": [
    "Data as a Service",
    "Integrations",
    "MCP",
    "API",
    "Data Hub",
    "Data Feeds",
  ],
  Advisory: [
    "Advisory Services",
    "Custom Reporting",
    "Brand Health Tracking",
    "Category Insights",
    "Market Share Dashboards",
    "Digital Travel Analytics",
  ],
};

for (const [tab, data] of Object.entries(solutions)) {
  const allow = new Set(SOLUTION_REAL_LABELS[tab] || []);
  for (const card of data.cards || []) {
    const title = splitTitle(card.text);
    if (!allow.has(title)) continue;
    if (card.icon) add(title, card.icon);
  }
}

// Resources dropdown per-item icons.
for (const [label, svg] of Object.entries(resources)) {
  add(label, svg);
}

// Sidebar brand icons keyed by product tab id.
const sidebarMap = new Map();
for (const [id, svg] of Object.entries(sidebar)) {
  sidebarMap.set(id, namespace(svg));
}

// Emit TS file.
const entries = Array.from(iconMap.entries())
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([label, svg]) => {
    const key = JSON.stringify(label);
    const value = JSON.stringify(svg);
    return `  [${key}]: ${value},`;
  })
  .join("\n");

const sidebarEntries = Array.from(sidebarMap.entries())
  .map(([id, svg]) => `  [${JSON.stringify(id)}]: ${JSON.stringify(svg)},`)
  .join("\n");

const banner = `// AUTO-GENERATED by research/extracted/generate-icons.mjs
// Do not edit by hand. Re-run the generator to refresh.
// Maps item label -> raw inline SVG markup extracted from the live site.

export const ICON_SVG_BY_LABEL: Record<string, string> = {
${entries}
};

export const SIDEBAR_BRAND_SVG_BY_ID: Record<string, string> = {
${sidebarEntries}
};

export function getIconSvg(label: string): string | undefined {
  return ICON_SVG_BY_LABEL[label];
}

export function getSidebarBrandSvg(id: string): string | undefined {
  return SIDEBAR_BRAND_SVG_BY_ID[id];
}
`;

writeFileSync(OUT, banner, "utf-8");
console.log(`wrote ${OUT} (${iconMap.size} icons)`);
