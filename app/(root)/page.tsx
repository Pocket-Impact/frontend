import CTASection from "../components/sections/CTA-Section";
import FeaturesSection from "../components/sections/FeaturesSection";
import HeroSection from "../components/sections/HeroSection";
import PricingSection from "../components/sections/PricingSection";


export default function Home() {
  return (
    <main className="px-4">
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
    </main>
  );
}
