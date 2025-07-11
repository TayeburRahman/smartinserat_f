import React, {  useContext, useEffect, useState } from "react";
import PriceCard from "../Cards/PriceCard";
import { dictionary } from "../../resources/multiLanguages";
import { StripeContext } from "../../context/StripeContext"; 
import { ClipLoader } from "react-spinners"; 
import PricingCardLoader from "./PricingCardLoader";
const PricingCards = ({ listingType, subscriptionDuration }) => {
  const { products: packages } = useContext(StripeContext);
  const [loading, setLoading] = useState(false);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const languageReducer = "en";

  // const filteredPackages = [
  //   {
  //     packageName: "Basic Plan",
  //     packageDescription: "Ideal for individuals looking to get started.",
  //     price: 9.99,
  //     subscriptionType: "BASIC",
  //   },
  //   {
  //     packageName: "Standard Plan",
  //     packageDescription: "Perfect for small teams with moderate needs.",
  //     price: 19.99,
  //     subscriptionType: "MEDIUM",
  //   },
  //   {
  //     packageName: "Premium Plan",
  //     packageDescription: "For businesses that need advanced features.",
  //     price: 29.99,
  //     subscriptionType: "PREMIUM",
  //   },
  // ];

  const optionsDictionary = {
    BASIC: [
      {
        label: "ImmoScout24",
        available: true,
      },
      {
        label: "Kleinanzeigen",
        available: true,
      },
      {
        label: "Immowelt",
        available: false,
      },
      {
        label: "Immonet",
        available: false,
      },
      {
        label: "Premium Platzierung",
        available: false,
      },
    ],
    MEDIUM: [
      {
        label: "ImmoScout24",
        available: true,
      },
      {
        label: "Kleinanzeigen",
        available: true,
      },
      {
        label: "Immowelt",
        available: true,
      },
      {
        label: "Immonet",
        available: true,
      },
      {
        label: "Premium Platzierung",
        available: false,
      },
    ],
    PREMIUM: [
      {
        label: "ImmoScout24",
        available: true,
      },
      {
        label: "Kleinanzeigen",
        available: true,
      },
      {
        label: "Immowelt",
        available: true,
      },
      {
        label: "Immonet",
        available: true,
      },
      {
        label: "Premium Platzierung",
        available: true,
      },
    ],
  };

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

  const month =
    dictionary["prices"][languageReducer][
      subscriptionKeys[subscriptionDuration]
    ];

    useEffect(() => {
      setLoading(true);
      // const timer = setTimeout(() => {
        const filteredData = packages.filter((pkg) =>
            pkg.listingType === listingType &&
            pkg.subscriptionDuration === subscriptionDuration
        );
        setFilteredPackages(filteredData);
        setLoading(false);
      // },  100);  
      // return () => clearTimeout(timer);
    }, [listingType, subscriptionDuration, packages]); 

  console.log('subscriptionDurations', subscriptionDuration, listingType, packages)
  return (
    <div className="md:flex mx-auto block md:w-full gap-4 justify-center px-5">
    {loading
      ? [1, 2, 3].map((_, i) => <PricingCardLoader key={i} />)
      : filteredPackages.map((pkg, index) => (
          <PriceCard
            key={pkg.id}
            packageName={pkg.packageName}
            packageDescription={pkg.packageDescription}
            price={pkg.price}
            month={month}
            options={optionsDictionary[pkg.subscriptionType]}
            highlight={index === Math.floor(filteredPackages.length / 2)}
          />
        ))}
  </div>
  );
};

export default PricingCards;
