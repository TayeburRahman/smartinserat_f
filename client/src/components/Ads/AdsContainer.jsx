import React, { useEffect, useState } from "react";
import { Input, Select, Button } from "@windmill/react-ui";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { config } from "../../assets/config/config";
import { dictionary } from "../../resources/multiLanguages";
import AdCard from "./AdCard";
import ThemedSuspense from "../ThemedSuspense";
import Footer from "../Footer";
import HomeNavbar from "../../pages/LandingPage/components/HomeNavbar";
import { useTranslation } from "react-i18next";

const AdsContainer = () => {
  const { t } = useTranslation();
  const languageReducer = "de";
  const locationHook = useLocation();
  const queryParams = new URLSearchParams(locationHook.search);

  const [adType, setAdType] = useState(queryParams.get("adType") || "");
  const [buildingType, setBuildingType] = useState(queryParams.get("buildingType") || "");
  const [location, setLocation] = useState(queryParams.get("location") || "");
  const [postalCode, setPostalCode] = useState("");
  const [price, setPrice] = useState("");
  const [search, setSearch] = useState("");
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAds = async (page = 1, limit = 12) => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.api.url}/userList`, {
        params: {
          adType,
          buildingType,
          location,
          postalCode,
          price,
          search,
          page,
          limit,
        },
      });
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
  }, [adType, buildingType, location, postalCode, price, search]);

  const handleSearch = () => {
    fetchAds(currentPage);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchAds(newPage);
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

            {/* Filters */}
            <div className="flex flex-col gap-4 text-black">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                <Select className="text-black" value={adType} onChange={(e) => setAdType(e.target.value)}>
                  <option value="">{t("Art der Anzeige")}</option>
                  <option value="sale">{t("Verkauf")}</option>
                  <option value="rent">{t("Vermietung")}</option>
                </Select>

                <Select className="text-black" value={buildingType} onChange={(e) => setBuildingType(e.target.value)}>
                  <option value="">{t("Immobilienart")}</option>
                  <option value="APARTMENT">{t("Wohnung")}</option>
                  <option value="SPECIAL_PURPOSE">{t("Land")}</option>
                  <option value="TRADE_SITE">{t("Gewerblich")}</option>
                  <option value="INVESTMENT">{t("Investition")}</option>
                  <option value="HOUSE">{t("Haus")}</option>
                </Select>

                <Input
                  className="w-full text-black"
                  type="text"
                  placeholder={t("Ort")}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />

                <Input
                  className="w-full text-black"
                  type="text"
                  placeholder="Postleitzahl"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />

                <Input
                  className="w-full text-black"
                  type="text"
                  placeholder="Preis"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="flex flex-row gap-2 justify-between text-black">
                <Input
                  type="text"
                  placeholder={dictionary["ads"][languageReducer]["search"]}
                  className="w-full text-black"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={handleSearch} className="text-white bg-blue-500">
                  {dictionary["ads"][languageReducer]["search"]}
                </Button>
              </div>
            </div>

            {/* Ads */}
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
                    img={ad?.imgCollection?.[0]}
                  />
                ))}
              </div>
            ) : (
              <p>{dictionary["ads"][languageReducer]["noadsfound"]}</p>
            )}

            {/* Pagination */}
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
                  className={`mx-1 px-4 py-2 ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
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
      <Footer />
    </div>
  );
};

export default AdsContainer;
