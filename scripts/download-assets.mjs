#!/usr/bin/env node
// Downloads all assets used by the boardwalktech.com clone into /public/.
// Usage: node scripts/download-assets.mjs

import { createWriteStream } from "node:fs";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "public");

const CDN = "https://cdn.prod.website-files.com/5eb236230d5bdf2e76923884";

const ASSETS = [
  // Brand
  { url: `${CDN}/5eb2ec11b9c843355ddc4f57_boardwalk-tech-logo.png`, out: "images/brand/boardwalk-tech-logo.png" },

  // Hero
  { url: `${CDN}/67215efe7d32a632803a5b7a_homepage-image-2.png`, out: "images/hero/homepage-image-2.png" },

  // Trust logos (exact rendered order: row 1 then row 2)
  { url: `${CDN}/66fee9b7a10f8c7ebfa146a5_Accenture.png`, out: "images/trust/accenture.png" },
  { url: `${CDN}/66fee9b654e808b3f6bbef38_Apple.png`, out: "images/trust/apple.png" },
  { url: `${CDN}/66fee9b605281ac3d1c159d7_Levis.png`, out: "images/trust/levis.png" },
  { url: `${CDN}/66fee9b6b6ea775c7c5731ee_Mars.png`, out: "images/trust/mars.png" },
  { url: `${CDN}/66fee9b74e465bab73aa809d_Verizon.png`, out: "images/trust/verizon.png" },
  { url: `${CDN}/66fee9b7dafc33cbf84b571e_Qualcomm.png`, out: "images/trust/qualcomm.png" },
  { url: `${CDN}/66fee9b7a5226651f4afdef4_ESTEE%20LAUDER.png`, out: "images/trust/estee-lauder.png" },
  { url: `${CDN}/66fee9b754e808b3f6bbef5d_Meta.png`, out: "images/trust/meta.png" },

  // Products
  { url: `${CDN}/6720410de519ee56d8e98629_homepage-image-7.png`, out: "images/products/unity-central.png" },
  { url: `${CDN}/672048ad7a66087aa5fd88f5_homepage-image-8.png`, out: "images/products/velocity.png" },

  // Info-management features
  { url: `${CDN}/6720412255ea8661ef377734_homepage-image-1.png`, out: "images/features/homepage-image-1.png" },
  { url: `${CDN}/67203ecb2db0d7886f46d5bd_homepage-image-3.png`, out: "images/features/homepage-image-3.png" },
  { url: `${CDN}/67203ecb932b41a171166fdb_homepage-image-4.png`, out: "images/features/homepage-image-4.png" },

  // Solutions (4 cards)
  { url: `${CDN}/673fc7eb491caec8b7a21fb0_image13.jpg`, out: "images/solutions/supply-chain-excel.jpg" },
  { url: `${CDN}/673fc7ebfa5d6dc7f5ac6e9c_image11.jpg`, out: "images/solutions/financial-services-euc.jpg" },
  { url: `${CDN}/673fceda7a3d4704bbe5b2c7_image16.jpg`, out: "images/solutions/supply-chain-intel.jpg" },
  { url: `${CDN}/673fc7eb341ad60d550317fe_image10.jpg`, out: "images/solutions/bpo-agent-ai.jpg" },

  // Bloomberg article
  { url: `${CDN}/6721607f7adb34388bd3a5d1_LQZPPCLFNBDKZPDB3TPH3Y2IDI.avif`, out: "images/article/bloomberg-hero.avif" },
];

async function download({ url, out }) {
  const dest = join(PUBLIC_DIR, out);
  await mkdir(dirname(dest), { recursive: true });
  const res = await fetch(url);
  if (!res.ok || !res.body) {
    throw new Error(`${res.status} ${res.statusText} — ${url}`);
  }
  await pipeline(res.body, createWriteStream(dest));
  console.log(`ok  ${out}`);
}

async function runInBatches(items, batchSize = 4) {
  const results = { ok: 0, fail: 0, failures: [] };
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const settled = await Promise.allSettled(batch.map(download));
    settled.forEach((r, j) => {
      if (r.status === "fulfilled") {
        results.ok++;
      } else {
        results.fail++;
        const item = batch[j];
        results.failures.push({ url: item.url, err: String(r.reason) });
        console.error(`fail  ${item.out} — ${r.reason}`);
      }
    });
  }
  return results;
}

const t0 = Date.now();
console.log(`Downloading ${ASSETS.length} assets to ${PUBLIC_DIR}...`);
const res = await runInBatches(ASSETS, 4);
const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
console.log(`\nDone in ${elapsed}s — ${res.ok} ok, ${res.fail} failed`);
if (res.fail > 0) {
  console.error(JSON.stringify(res.failures, null, 2));
  process.exit(1);
}
