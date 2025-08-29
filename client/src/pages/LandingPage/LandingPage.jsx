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
import HomeFilters from "./components/HomeFilters";

const LandingPage = () => {
  return (
    <div>
       <div className="flex bg-cover flex-col w-full items-center dark:g-gray-600 h-full">
      <HeroWithNav />
      </div>
      <SecondSections />
      <div className="flex flex-col w-full items-center bg-white dark:g-gray-600 h-full">
      <div className="z-10 w-full justify-center">
        <div className="text-center text-gray-600 w-full px-5">
        <h3 className="text-royalPurple text-1xl sm:text-2xl font-extrabold font-bold uppercase mt-14 mb-3">INSERATE</h3>
        <h2 className="text-black text-2xl sm:text-3xl font-extrabold ">
        UNSERE IMMOBILIENANZEIGEN
        </h2>
      </div>
        <HomeFilters />
      </div>
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
    </div></div>
  );
};

export default LandingPage;
