"use client";

import { SiteFooter } from "../../../bundles/sites/barings-com/src/footer/SiteFooter";
import { SiteHeader } from "../../../bundles/sites/barings-com/src/header/SiteHeader";

export default function Page() {
  return (
    <>
      <SiteHeader />
      <section
        className="min-h-[420px] flex items-center justify-center px-6"
        style={{ background: "#002856", color: "rgba(255,255,255,0.55)" }}
      >
        <p className="text-[13px] uppercase tracking-[0.5px] text-center">
          Host page hero — the bundle only ships the header above this line
        </p>
      </section>
      <main className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-gray-700 leading-relaxed">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Barings — header + footer preview
          </h2>
          <p className="mb-4">
            Rendering{" "}
            <code className="px-1.5 py-0.5 bg-gray-100 rounded text-sm">
              bundles/sites/barings-com/src/
            </code>{" "}
            directly. The preview uses the exact same source as the built
            drop-in bundle.
          </p>
          <p className="mb-4">
            Use this to sanity-check the transparent-over-hero header (it turns
            white when you hover anywhere on the header bar or scroll past the
            hero), hover-to-open top-level menus, hover-to-switch sidebar
            options, the search overlay, the locations panel, and the mobile
            drawer at narrow viewport widths. The dark hero strip above is
            placeholder filler so you can see the transparent state — it is
            NOT part of the bundle.
          </p>
          <p>
            To ship:{" "}
            <code>cd bundles &amp;&amp; npm run build:barings-com</code> &rarr;
            drop <code>dist/barings-com/header.bundle.js</code> and{" "}
            <code>dist/barings-com/footer.bundle.js</code> into any host site
            with a <code>&lt;script&gt;</code> tag and matching mount divs.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
