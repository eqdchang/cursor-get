import { existsSync } from "node:fs";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

type BundleKey = "header" | "footer";

const GLOBAL_NAMES: Record<BundleKey, string> = {
  header: "BoardwalkHeader",
  footer: "BoardwalkFooter",
};

function toPascalCase(slug: string): string {
  return slug
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("");
}

export default defineConfig(({ command }) => {
  const site = (process.env.SITE ?? "boardwalktech").trim();
  const bundle = (process.env.BUNDLE ?? "header").trim() as BundleKey;

  if (bundle !== "header" && bundle !== "footer") {
    throw new Error(
      `Invalid BUNDLE "${bundle}". Expected "header" or "footer".`,
    );
  }

  const siteRoot = resolve(__dirname, "sites", site);
  if (!existsSync(siteRoot)) {
    throw new Error(
      `Unknown SITE "${site}". Expected a directory at sites/${site}/.`,
    );
  }

  const entry = resolve(siteRoot, "src", bundle, "mount.tsx");
  if (!existsSync(entry)) {
    throw new Error(`Missing entry file: ${entry}`);
  }

  const pascalSite = toPascalCase(site);
  const globalName =
    site === "boardwalktech"
      ? GLOBAL_NAMES[bundle]
      : `${pascalSite}${bundle === "header" ? "Header" : "Footer"}`;

  const isDev = command === "serve";

  return {
    plugins: [react(), tailwindcss()],
    root: isDev ? resolve(siteRoot, "demo") : undefined,
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
    build: {
      lib: {
        entry,
        name: globalName,
        formats: ["iife"],
        fileName: () => `${bundle}.bundle.js`,
      },
      outDir: resolve(__dirname, "dist", site),
      emptyOutDir: false,
      cssCodeSplit: false,
      sourcemap: true,
      rollupOptions: {
        output: {
          inlineDynamicImports: true,
          exports: "named",
        },
      },
    },
  };
});
