import { ArrowRightIcon } from "@/components/icons";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-teal-50/30"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Where Data Becomes{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                Decisions
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
              Unify, organize, manage, and transform all your structured and
              unstructured information seamlessly into a connected, predictive,
              and resilient AI-powered platform, enabling smarter decision-making
              and increased efficiency.
            </p>
            <div className="mt-10">
              <a href="#contact">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-base rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transition-all"
                >
                  Contact us
                  <ArrowRightIcon />
                </button>
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/hero/homepage-image-2.png"
                alt="Professional working with data"
                className="w-full h-auto object-cover"
                width={477}
                height={348}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
