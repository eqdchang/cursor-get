import { ArrowRightIcon } from "@/components/icons";
import type { SolutionCard } from "@/types/content";

const SOLUTIONS: SolutionCard[] = [
  {
    title: "Supply Chain Excel Automation",
    description:
      "Imagine transforming static spreadsheets into dynamic, integrated systems that keep your supply chain running efficiently without leaving Excel behind.",
    image: "/images/solutions/supply-chain-excel.jpg",
    alt: "Supply Chain Excel Automation",
    href: "#solutions",
  },
  {
    title: "Financial Services Excel & EUC Transformation",
    description:
      "Quickly automate Excel based process, workflow, security, and compliance.",
    image: "/images/solutions/financial-services-euc.jpg",
    alt: "Financial Services Excel & EUC Transformation",
    href: "#solutions",
  },
  {
    title: "Supply Chain Information Intelligence",
    description:
      "Transform your supply chain with data-driven predictive insights that leverage the power of AI for proactive decision-making, streamlined operations, and increased efficiency.",
    image: "/images/solutions/supply-chain-intel.jpg",
    alt: "Supply Chain Information Intelligence",
    href: "#solutions",
  },
  {
    title: "BPO Digital Transformation & Agent AI",
    description:
      "Transform and automate processes increasing efficiency with predictive and Agent AI.",
    image: "/images/solutions/bpo-agent-ai.jpg",
    alt: "BPO Digital Transformation & Agent AI",
    href: "#solutions",
  },
];

export function SolutionsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-12">
          Solutions
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SOLUTIONS.map((s) => (
            <div key={s.title} className="group">
              <a className="block" href={s.href}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                  <img
                    src={s.image}
                    alt={s.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  {s.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:gap-2 transition-all">
                  Learn More
                  <ArrowRightIcon className="w-4 h-4" />
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
