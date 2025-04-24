import React from "react";
import PropertySlider from "../../components/PropertySlider";
import TestimonialsSlider from "../../components/TestimonialsSlider";
import PricingSection from "../../components/Pricing/PricingSection";
import HeroWithNav from "./components/HeroWithNavbar";
import Footer from "../../components/Footer";
import FAQ from "./components/FAQ";
import OurServicesSection from "./components/OurServicesSection";
import BottomBanner from "./components/BottomBanner";
import SecondSections from "./components/SecondSection";
import PublishedOn from "./components/ImageSections";
import InformationSections from "./components/InformationSections";
import PhoneImageSection from "./components/PhoneImageSection";
import ButtonSections from "./components/ButtonSections";

const LandingPage = () => {
  return (
    <div className="flex flex-col w-full items-center bg-white dark:g-gray-600 h-full">
      <HeroWithNav />
      <SecondSections />
      <PropertySlider title={"Unsere Immobilienanzeigen"} topMargin={true} />
      <PublishedOn />
      <InformationSections />
      <PhoneImageSection />
      <OurServicesSection />
      {/* <HowItWorksSection /> */}
      <PricingSection />
      <TestimonialsSlider />
      <FAQ />
      <BottomBanner />
      <ButtonSections />
      <Footer />
    </div>
  );
};

export default LandingPage;
