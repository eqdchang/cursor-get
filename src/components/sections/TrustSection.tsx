import type { TrustLogo } from "@/types/content";

const LOGOS: TrustLogo[] = [
  { name: "Accenture", src: "/images/trust/accenture.png" },
  { name: "Apple", src: "/images/trust/apple.png" },
  { name: "Levis", src: "/images/trust/levis.png" },
  { name: "Mars", src: "/images/trust/mars.png" },
  { name: "Verizon", src: "/images/trust/verizon.png" },
  { name: "Qualcomm", src: "/images/trust/qualcomm.png" },
  { name: "Estee Lauder", src: "/images/trust/estee-lauder.png" },
  { name: "Meta", src: "/images/trust/meta.png" },
];

export function TrustSection() {
  return (
    <section className="py-16 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-10">
          Trusted by the world&apos;s top companies
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 items-center">
          {LOGOS.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center justify-center opacity-70 hover:opacity-100 transition-all duration-300"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-8 md:h-10 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
