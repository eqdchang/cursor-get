import { readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import Link from "next/link";

function listSites(): string[] {
  const sitesDir = resolve(process.cwd(), "bundles", "sites");
  try {
    return readdirSync(sitesDir)
      .filter((name) => !name.startsWith("."))
      .filter((name) => statSync(resolve(sitesDir, name)).isDirectory())
      .sort();
  } catch {
    return [];
  }
}

export default function Page() {
  const sites = listSites();
  return (
    <main className="min-h-screen px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          Header + footer preview harness
        </h1>
        <p className="text-gray-600 leading-relaxed mb-10">
          Pick a site below to render its <code>SiteHeader</code> and{" "}
          <code>SiteFooter</code> directly from{" "}
          <code>bundles/sites/&lt;slug&gt;/src/</code>. The preview uses the
          exact same source as the built drop-in bundle — no duplication, no
          drift.
        </p>

        {sites.length === 0 ? (
          <p className="text-gray-500">
            No sites found under <code>bundles/sites/</code>. Run{" "}
            <code>/clone-header-footer &lt;url&gt;</code> to extract one.
          </p>
        ) : (
          <ul className="space-y-3">
            {sites.map((slug) => (
              <li key={slug}>
                <Link
                  href={`/${slug}`}
                  className="block rounded-lg border border-gray-200 p-4 hover:border-gray-900 hover:bg-gray-50 transition-colors"
                >
                  <div className="font-mono text-sm text-gray-900">
                    /{slug}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    bundles/sites/{slug}/
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
