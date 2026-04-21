import { ArrowRightIcon } from "@/components/icons";
import type { ProductCard } from "@/types/content";

const PRODUCTS: ProductCard[] = [
  {
    name: "Unity Central",
    description:
      "Seamlessly connect all your messages, files, documents, workflows, and alerts into one intelligent platform, automating processes and reducing manual work to help you make faster, more informed decisions while keeping everything organized in a unified workspace.",
    image: "/images/products/unity-central.png",
    alt: "Unity Central",
    href: "#unity-central",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    name: "Velocity",
    description:
      "Transform your Excel-based process applications into secure, compliant, and AI-ready applications, eliminating manual processes and risks without disrupting your existing business processes or replacing Excel.",
    image: "/images/products/velocity.png",
    alt: "Velocity",
    href: "#velocity",
    gradient: "from-teal-500 to-green-600",
  },
];

export function ProductsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-12">
          Products
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          {PRODUCTS.map((p) => (
            <div
              key={p.name}
              className="group relative bg-gray-50 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{p.name}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {p.description}
                </p>
                <a
                  href={p.href}
                  className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${p.gradient} bg-clip-text text-transparent group-hover:gap-3 transition-all`}
                >
                  Learn More
                  <ArrowRightIcon className="w-4 h-4 text-blue-600" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
