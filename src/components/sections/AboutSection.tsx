import { ArrowRightIcon } from "@/components/icons";

export function AboutSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-8">
            About us
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Boardwalktech is a leading provider of AI-driven information
            management solutions, trusted by Fortune 500 companies worldwide. Our
            patented Intelligent Information Platform allows organizations to
            seamlessly unify, organize, manage, and track both structured and
            unstructured information and data in real-time.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed mb-10">
            With our predictive, resilient, and knowledge-driven approach, we
            empower companies to make faster, more informed decisions, improving
            efficiency and productivity across their entire enterprise. Our
            Intelligent AI Workspace integrates with enterprise systems,
            transforming how businesses handle mission-critical information and
            collaborate across teams, customers, suppliers, and partners.
            Available on any device or interface, our Intelligent Workspace
            delivers results faster and more effectively than traditional
            solutions.
          </p>
          <a href="#contact">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-base rounded-xl shadow-lg transition-all"
            >
              Contact us
              <ArrowRightIcon />
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
