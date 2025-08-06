import AboutSection from "@/components/About";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/Services";
import ContactSection from "@/components/Contact";
import MapSection from "@/components/Map";
import Footer from "@/components/Footer";
import GoogleReviews from "@/components/GoogleReviews";
import Loader from "@/components/Loader";
import { IrascoLogo } from "@/components/IrascoLogo";
// import { ProductShowcase } from "@/components/ProductShowcase";

const Index = () => {
  return (
    <>
      <Loader logo={<IrascoLogo size="medium" />} />
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
