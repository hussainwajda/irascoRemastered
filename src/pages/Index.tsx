import { EnergyRibbon } from "@/components/EnergyRibbon";
import { HeroSection } from "@/components/HeroSection";
import { ProductShowcase } from "@/components/ProductShowcase";

const Index = () => {
  return (
    <div className="min-h-screen bg-irasco-midnight text-irasco-white">
      <EnergyRibbon />
      <HeroSection />
      <ProductShowcase />
      
      <footer className="py-12 bg-irasco-graphite">
        <div className="container mx-auto px-6 text-center">
          <p className="text-irasco-white/60 font-inter">
            IRASCO - Living Atmosphere HVAC Solutions
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
