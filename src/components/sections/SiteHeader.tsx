import { MenuIcon } from "@/components/icons";

const NAV_ITEMS = ["Platform", "Solutions", "Industries", "Resources", "About"] as const;

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="flex items-center" aria-label="Boardwalk Tech home">
            <img
              src="/images/brand/boardwalk-tech-logo.png"
              alt="Boardwalk Tech"
              className="h-12"
              width={225}
              height={48}
            />
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div key={item} className="relative">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {item}
                </button>
              </div>
            ))}
            <button
              type="button"
              aria-label="More"
              className="p-2 text-gray-500 hover:text-blue-600 transition-colors ml-2"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
          </nav>

          <button
            type="button"
            aria-label="Open menu"
            className="lg:hidden p-2 text-gray-700"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
