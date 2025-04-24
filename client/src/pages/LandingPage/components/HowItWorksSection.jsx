import React from "react";
import SplitImage from "../../../assets/images/how-it-works.svg";
import { Button } from "@windmill/react-ui";

const HowItWorksSection = () => {
  return (
    <section className="w-full bg-gray-50 py-10">
      <div className="w-full max-w-7xl mx-auto px-5 py-5 flex flex-col gap-5 sm:flex-row-reverse justify-center items-center bg-white sm:rounded-lg shadow-lg">
        <div className="flex flex-col gap-5 sm:w-1/2 sm:px-20 text-gray-800">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            How does smartinserat.com works?
          </h1>
          <p>
            It works magic like maic from harry potter. If you have not seen the
            potter series your missing out big time. If you have the potter
            series your not seen missing out bvi got it or hwt time.
          </p>
          <Button size="larger">Start Advertising</Button>
        </div>
        <div className="sm:w-1/2">
          <img src={SplitImage} alt="how-it-works" className="object-cover" />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
