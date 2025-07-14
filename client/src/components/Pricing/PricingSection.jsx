import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import PricingCards from "./PricingCards";
import { dictionary } from "../../resources/multiLanguages";
import "react-tabs/style/react-tabs.css";
import "./styles.css";
import { Link } from "react-router-dom";

const PricingSection = () => {
  const listingTypes = ["sale", "rent"];
  const subscriptionDurations = [1, 2, 3];
  const languageReducer = "de";

  const subscriptionKeys = {
    1: "month1",
    2: "month2",
    3: "month3",
    4: "month4",
    5: "month5",
    6: "month6",
    7: "month7",
    8: "month8",
    9: "month9",
    10: "month10",
    11: "month11",
    12: "month12",
  };

  

  return (
    <section className="w-full bg-white mt-16" id='Preise'>
      <div className="max-w-5xl mx-auto flex justify-center items-center flex-col text-center">
        <div className="flex flex-col justify-center items-center px-5">
        <h3 className="text-royalPurple text-1xl sm:text-2xl font-extrabold uppercase mt-14 p-2">
        PREISE
      </h3>
      <h2 className="text-black text-2xl sm:text-3xl font-extrabold p-2">
      BIS ZU 50% GEGENÜBER EINZELANZEIGEN SPAREN
      </h2>
        </div>
        <Tabs className="w-full py-12 p-2">
          <TabList className="flex justify-center gap-0 mb-5">
            {listingTypes.map((listingType, index) => (
             <Tab className="cursor-pointer w-48 bg-purple-100 text-gray-700 px-5 h-10 py-2 rounded-l-lg text-xs sm:text-sm md:text-base font-bold flex items-center justify-center" key={index}>
             {listingType === "rent"
               ? dictionary["prices"][languageReducer].rent
               : dictionary["prices"][languageReducer].sale}
           </Tab>
           
            ))}
          </TabList>

          {listingTypes.map((listingType) => (
            <TabPanel>
              <Tabs>
                <TabList className="flex justify-center gap-0 mb-16">
                  {subscriptionDurations.map((subscriptionDuration, index) => (
                  <Tab className="cursor-pointer bg-purple-100 w-32 h-10 flex items-center justify-center bg-gray-100 text-gray-700 px-5 py-2 rounded-l-lg text-xs sm:text-sm md:text-base font-bold"   key={index}>
                  <h6 className="text-xs sm:text-sm md:text-base font-bold">
                    {
                      dictionary["prices"][languageReducer][
                        subscriptionKeys[subscriptionDuration]
                      ] }
                  </h6>
                </Tab> 
                  ))}
                </TabList>
                {subscriptionDurations && subscriptionDurations.map((subscriptionDuration, index) => (
                  <TabPanel key={index}>
                    <PricingCards
                      listingType={listingType}
                      subscriptionDuration={subscriptionDuration}
                    />
                  </TabPanel>
                ))}
              </Tabs>
            </TabPanel>
          ))}
        </Tabs>
      </div>
      <div className="w-full flex flex-col items-center text-center px-2">
      {/* Highlighted Text */}
      <p className="text-lg sm:text-xl font-bold text-black">
        DAS{" "}
        <span className="text-royalPurple font-extrabold">SMART</span>INSERAT IST
        BIS ZU{" "}
        <span className="text-royalPurple font-extrabold">50% GÜNSTIGER</span> ALS
        DIE EINZELBUCHUNG AUF EINER PLATTFORM
      </p> 
      {/* <Link className="mt-6 hover:text-white hero-bg text-white text-lg sm:text-xl font-bold px-16 py-2 md:py-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
        JETZT INSERIEREN
      </Link> */}
    </div>
    </section>
  );
};

export default PricingSection;
