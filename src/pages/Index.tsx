import AboutSection from "@/components/About";
import HeroSection from "@/components/HeroSection2";
import ServicesSection from "@/components/Services";
import ContactSection from "@/components/Contact";
import Footer from "@/components/Footer";
import TestimonialSection from "@/components/TestimonialSection";
// import { ProductShowcase } from "@/components/ProductShowcase";

const Index = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TestimonialSection />
      <ContactSection />
      <Footer />
      {/* <ProductShowcase /> */}
    </>
  );
};

export default Index;
