#!/usr/bin/env node
import { execSync } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const sitesDir = resolve(__dirname, "..", "sites");

const slugs = readdirSync(sitesDir).filter((name) => {
  if (name.startsWith(".")) return false;
  return statSync(resolve(sitesDir, name)).isDirectory();
});

if (slugs.length === 0) {
  console.error("No sites found under sites/. Nothing to build.");
  process.exit(1);
}

for (const slug of slugs) {
  console.log(`\n=== Building ${slug} ===`);
  execSync("npm run build:site", {
    stdio: "inherit",
    env: { ...process.env, SITE: slug },
  });
}

console.log(`\nBuilt ${slugs.length} site(s): ${slugs.join(", ")}`);
