import type { FeatureRow } from "@/types/content";

const FEATURES: FeatureRow[] = [
  {
    title: "A brand-new class of information management",
    description:
      "Automatically ingest all forms of information — emails, chats, documents, and spreadsheets — into an organized, time-sequenced database, without the need for transformations or coding expertise.",
    image: "/images/features/homepage-image-1.png",
    alt: "A brand-new class of information management",
    imageOnRight: true,
  },
  {
    title: "Rapidly transform your data into information",
    description:
      "Instantly configure AI-driven, collaborative, and predictive solutions that automate manual processes, unify data, and leverage advanced analytics to significantly boost productivity.",
    image: "/images/features/homepage-image-3.png",
    alt: "Rapidly transform your data into information",
    imageOnRight: false,
  },
  {
    title: "Faster, more insightful decisions",
    description:
      "Gain total visibility into all your enterprise information, building knowledge, trust, predictability, and collaboration to empower faster, more informed decisions and previously unimaginable results.",
    image: "/images/features/homepage-image-4.png",
    alt: "Faster, more insightful decisions",
    imageOnRight: true,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          >
            <div className={f.imageOnRight ? "" : "lg:order-2"}>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
                {f.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {f.description}
              </p>
            </div>
            <div className={`relative ${f.imageOnRight ? "" : "lg:order-1"}`}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={f.image}
                  alt={f.alt}
                  className="w-full h-auto object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute -z-10 -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-60"
              />
              <div
                aria-hidden="true"
                className="absolute -z-10 -bottom-4 -left-4 w-32 h-32 bg-teal-100 rounded-full blur-2xl opacity-60"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
