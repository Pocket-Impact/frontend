import CTASection from "../components/sections/CTA-Section";
import FeaturesSection from "../components/sections/FeaturesSection";
import HeroSection from "../components/sections/HeroSection";


export default function Home() {
  return (
    <main className="px-4">
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </main>
  );
}
