"use client";

import { SiteFooter } from "../../../bundles/sites/similarweb-com/src/footer/SiteFooter";
import { SiteHeader } from "../../../bundles/sites/similarweb-com/src/header/SiteHeader";

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main className="pt-24 pb-24">
        <div className="max-w-3xl mx-auto px-6 text-gray-700 leading-relaxed">
          <h1 className="text-3xl font-semibold text-gray-900 mb-6">
            Similarweb — header + footer preview
          </h1>
          <p className="mb-4">
            Rendering{" "}
            <code className="px-1.5 py-0.5 bg-gray-100 rounded text-sm">
              bundles/sites/similarweb-com/src/
            </code>{" "}
            directly. The preview uses the exact same source as the built
            drop-in bundle.
          </p>
          <p className="mb-4">
            Use this to sanity-check click-to-open dropdowns, the tabbed
            mega-menus, keyboard navigation (Tab / Enter / Escape), and the
            mobile drawer at narrow viewport widths.
          </p>
          <p>
            To ship:{" "}
            <code>cd bundles &amp;&amp; npm run build:similarweb-com</code>{" "}
            &rarr; drop <code>dist/similarweb-com/header.bundle.js</code> and{" "}
            <code>dist/similarweb-com/footer.bundle.js</code> into any host site
            with a <code>&lt;script&gt;</code> tag and matching mount divs.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
