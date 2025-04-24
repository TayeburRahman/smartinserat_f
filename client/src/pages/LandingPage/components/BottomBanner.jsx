import React from "react";
import { dictionary } from "../../../resources/multiLanguages";
import { Link } from "react-router-dom";
import { Button } from "@windmill/react-ui";

const BottomBanner = () => {
  const languageReducer = "de";
  return (
    <section className="flex justify-center py-12 md:py-12 hero-bg w-full md:pb-16">
      <div className="flex flex-col text-center items-center max-w-7xl text-white">
        <h2 className="text-2xl md:text-4xl font-semibold mt-6 mb-2">
          {dictionary["waiting"][languageReducer]["title"]}
        </h2>
        <p className="text-gray-50 text-center text-2xl md:text-4xl font-semibold">
          {dictionary["waiting"][languageReducer]["description"]}
        </p>
        <p className="text-gray-50 text-center text-2xl md:text-4xl font-semibold">
          {dictionary["waiting"][languageReducer]["description2"]}
        </p>
        
      </div>
    </section>
  );
};

export default BottomBanner;
