import CTASection from "@/components/sections/CTA-Section";
import FeaturesSection from "@/components/sections/FeaturesSection";
import FooterSection from "@/components/sections/FooterSection";
import HeroSection from "@/components/sections/HeroSection";
import ImpactSection from "@/components/sections/ImpactSection";
import PricingSection from "@/components/sections/PricingSection";
import ProblemsSection from "@/components/sections/ProblemsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ToolsSection from "@/components/sections/ToolsSection";

export default function Home() {
  return (
    <main className="px-4">
      <HeroSection />
      <ProblemsSection />
      <FeaturesSection />
      <ToolsSection />
      <ImpactSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
      <FooterSection />
    </main>
  );
}
