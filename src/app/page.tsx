import { AboutSection } from "@/components/sections/AboutSection";
import { ArticleSection } from "@/components/sections/ArticleSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { TrustSection } from "@/components/sections/TrustSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main>
        <HeroSection />
        <TrustSection />
        <ProductsSection />
        <FeaturesSection />
        <SolutionsSection />
        <ArticleSection />
        <AboutSection />
      </main>
      <SiteFooter />
    </div>
  );
}
