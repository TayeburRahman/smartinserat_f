// import { Button, FormControl, InputLabel, option, Select, Input } from '@mui/material';
import React, { useEffect } from "react";
import AdCard from "./AdCard";
import { useState } from "react";
// import DemoImg from '../../assets/img/image-not-found.png'
import { DesktopNavbar } from "../HeaderLanding";
import { MobileNavbar } from "../HeaderLanding";
import { Button, Input, Select } from "@windmill/react-ui";
import axios from "axios";
import { config } from "../../assets/config/config";
import { dictionary } from "../../resources/multiLanguages";
import ThemedSuspense from "../ThemedSuspense";
import Footer from "../Footer";
import HomeNavbar from "../../pages/LandingPage/components/HomeNavbar";

const AdsContainer = () => {
  const [recentImmobilien, setRecentImmobilien] = useState([]);
  useEffect(() => {
    const loadImages = async () => {
      const ads1 = (await import("../../assets/images/demo/ads1.png")).default;
      const ads2 = (await import("../../assets/images/demo/ads2.png")).default;
      const ads3 = (await import("../../assets/images/demo/ads3.png")).default;
      const ads4 = (await import("../../assets/images/demo/ads4.png")).default;
      const ads5 = (await import("../../assets/images/demo/ads5.png")).default;
      const ads6 = (await import("../../assets/images/demo/ads5.png")).default;

      setRecentImmobilien([
        {
          entityId: "12345",
          _id: "ad1",
          city: "Berlin",
          zip: "10115",
          listingPrice: 250000,
          listingTitle: "Modern Apartment in Berlin",
          uniqId: "DE-BER-001",
          img: ads1,
        },
        {
          entityId: "67890",
          _id: "ad2",
          city: "Munich",
          zip: "80331",
          listingPrice: 350000,
          listingTitle: "Luxury Condo in Munich",
          uniqId: "DE-MUN-002",
          img: ads2,
        },
        {
          entityId: "54321",
          _id: "ad3",
          city: "Hamburg",
          zip: "20095",
          listingPrice: 180000,
          listingTitle: "Cozy Studio in Hamburg",
          uniqId: "DE-HAM-003",
          img: ads3,
        },
        {
          entityId: "98765",
          _id: "ad4",
          city: "Frankfurt",
          zip: "60311",
          listingPrice: 275000,
          listingTitle: "Spacious Loft in Frankfurt",
          uniqId: "DE-FRA-004",
          img: ads4,
        },
        {
          entityId: "54321",
          _id: "ad5",
          city: "Hamburg",
          zip: "20095",
          listingPrice: 180000,
          listingTitle: "Cozy Studio in Hamburg",
          uniqId: "DE-HAM-005",
          img: ads5,
        },
        {
          entityId: "98765",
          _id: "ad6",
          city: "Frankfurt",
          zip: "60311",
          listingPrice: 275000,
          listingTitle: "Spacious Loft in Frankfurt",
          uniqId: "DE-FRA-006",
          img: ads6,
        },
      ]);
    };

    loadImages();
  }, []);

  // ======================================
  const languageReducer = "de";

  const [adType, setAdType] = useState();
  const [propertyType, setPropertyType] = useState();
  const [location, setLocation] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [price, setPrice] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages

  const [ads, setAds] = useState([]); // State to store ads from API
  const [loading, setLoading] = useState(false); // Loading state for API requests

  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  }

  const debouncedSearch = useDebounce(search, 500);

  // Function to fetch ads based on filter criteria
  const fetchAds = async (page = 1, limit = 12) => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.api.url}/userList`, {
        params: {
          adType, // Filters to be sent as query params
          propertyType,
          location,
          postalCode,
          price,
          search: debouncedSearch,
          page,
          limit,
        },
      });
      console.log(response.data.data.lists); 
      setAds(response.data.data.lists);
      setTotalPages(response.data.data.totalPages);
      setCurrentPage(response.data.data.currentPage);
    } catch (error) {
      console.error("Error fetching ads:", error);
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    fetchAds();
  }, [debouncedSearch, adType, propertyType, location, postalCode, price]); // Include dependencies to trigger API calls
 
  const handleSearch = () => {
    fetchAds(currentPage); // Call API when search button is clicked
  };

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchAds(newPage); // Fetch ads for the new page
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <HomeNavbar /> 
      <main>
        <div className="flex justify-center items-center bg-gray-50">
          <div className="w-full max-w-7xl px-5 xl:px-0 flex flex-col gap-10 py-10">
            <h1 className="text-left text-xl md:text-2xl lg:text-3xl text-gray-900 font-bold">
              Immobilien
            </h1>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 ">
                <Select
                  id="select-ad-ic"
                  labelId="select-ad-id-label"
                  label="Art der Anzeige"
                  value={adType || ""}
                  onChange={(event) => setAdType(event.target.value)}
                >
                  <option value="">Art der Anzeige</option>
                  <option value={"sale"}>Verkauf</option>
                  <option value={"rent"}>Vermietung</option>
                </Select>

                {adType === "rent" ? (
                  <Select
                    id="select-property-id"
                    labelId="select-property-id-label"
                    label="Immoilienart"
                    value={propertyType | ""}
                    onChange={(event) => setPropertyType(event.target.value)}
                  >
                    <option value={""}>Immoilienart</option>
                    <option value={"house_rent"}>Haus</option>
                    <option value={"flat_rent"}>Wohnung</option>
                    <option value={"land_rent"}>Grundstuck</option>
                  </Select>
                ) : (
                  <Select
                    id="select-property-id"
                    labelId="select-property-id-label"
                    label="Immoilienart"
                    value={propertyType | ""}
                    onChange={(event) => setPropertyType(event.target.value)}
                  >
                    <option value={""}>Immoilienart</option>
                    <option value={"house_purchase"}>Haus</option>
                    <option value={"flat_purchase"}>Wohnung</option>
                    <option value={"land_purchase"}>Grundstuck</option>
                  </Select>
                )}

                <Input
                  className="w-full"
                  type="text"
                  placeholder="Ort"
                  size="small"
                  onChange={(event) => setLocation(event.target.value)}
                  value={location}
                />
                <Input
                  className="w-full"
                  type="text"
                  placeholder="Postleitzahl"
                  size="small"
                  onChange={(event) => setPostalCode(event.target.value)}
                  value={postalCode}
                />
                <Input
                  className="w-full"
                  type="text"
                  placeholder="Preis"
                  size="small"
                  onChange={(event) => setPrice(event.target.value)}
                  value={price}
                />
              </div>
              <div className="flex flex-row gap-2 justify-between">
                <Input
                  type="text"
                  placeholder={dictionary["ads"][languageReducer]["search"]}
                  className="w-full"
                  size="small"
                  onChange={(event) => setSearch(event.target.value)}
                  value={search}
                />

                <Button onClick={handleSearch} variant="contained">
                  {dictionary["ads"][languageReducer]["search"]}
                </Button>
              </div>
            </div>

            {loading ? (
              <ThemedSuspense />
            ) : ads.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
                {ads.map((ad) => (
                  <AdCard
                    key={ad._id}
                    id={ad._id}
                    entityId={ad.entityId}
                    title={ad.listingTitle}
                    objectCode={ad.uniqId}
                    postalCode={ad.zip}
                    location={ad.location}
                    price={ad.listingPrice}
                    img={ad?.imgCollection.length && ad?.imgCollection[0]}  
                  />
                ))}
              </div>
            ) : (
              <p>{dictionary["ads"][languageReducer]["noadsfound"]}</p> 
            )}

            <div className="flex justify-center mt-5">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="mr-2 px-4 py-2 bg-gray-200 rounded"
              >
                {dictionary["ads"][languageReducer]["previous"]}
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`mx-1 px-4 py-2 ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="ml-2 px-4 py-2 bg-gray-200 rounded"
              >
                {dictionary["ads"][languageReducer]["next"]}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default AdsContainer;
