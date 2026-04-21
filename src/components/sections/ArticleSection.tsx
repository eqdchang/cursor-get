import { ArrowRightIcon } from "@/components/icons";

const BLOOMBERG_URL =
  "https://www.bnnbloomberg.ca/investment-trends/2024/10/21/how-boardwalktechs-intelligent-information-platform-revolutionizes-enterprise-data/";

export function ArticleSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              Article
            </span>
            <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              How Boardwalktech&apos;s intelligent information platform
              revolutionizes enterprise data
            </h2>
            <div className="mt-8">
              <a href={BLOOMBERG_URL} target="_blank" rel="noopener noreferrer">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-white shadow-sm hover:bg-gray-50 border-gray-300 hover:border-blue-600 hover:text-blue-600 px-6 py-5 text-base rounded-xl transition-all"
                >
                  Read Article on Bloomberg
                  <ArrowRightIcon />
                </button>
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/images/article/bloomberg-hero.avif"
                alt="Bloomberg article"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">BB</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Bloomberg</p>
                <p className="text-xs text-gray-500">Featured Article</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
