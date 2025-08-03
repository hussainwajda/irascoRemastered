import AboutSection from "@/components/About";
import HeroSection from "@/components/HeroSection2";
import ServicesSection from "@/components/Services";
import ContactSection from "@/components/Contact";
import MapSection from "@/components/Map";
import Footer from "@/components/Footer";
import GoogleReviews from "@/components/GoogleReviews";
// import { ProductShowcase } from "@/components/ProductShowcase";

const Index = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GoogleReviews />
      <ContactSection />
      <MapSection />
      <Footer />
      {/* <ProductShowcase /> */}
    </>
  );
};

export default Index;
