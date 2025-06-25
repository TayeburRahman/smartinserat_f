import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import AdCard from "./Ads/AdCard";
import { config } from "../assets/config/config";

const PropertySlider = ({ title, topMargin = false }) => {
  const [recentImmobilien, setRecentImmobilien] = useState([]);
  const [loading, setLoading] = useState(false);

  // Your API fetch function with no filters, page 1, limit 12 by default
  const fetchAds = async (page = 1, limit = 12) => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.api.url}/userList`, {
        params: {
          page,
          limit,
          // add filters here if needed, e.g. adType, propertyType, etc.
        },
      });
      setRecentImmobilien(response.data.data.lists);
    } catch (error) {
      console.error("Error fetching ads:", error);
      setRecentImmobilien([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <div
      className="flex justify-center items-center bg-white w-full pb-5"
      id="Leistungen"
    >
      <div
        className={`w-full max-w-7xl px-5 xl:px-0 ${
          topMargin ? "pb-4 pt-8 sm:pt-20" : "py-8"
        }`}
      >
        <div className="w-full flex flex-row justify-between text-center items-center pb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-700 text-center">
            {title}
          </h1>
        </div>

        {loading ? (
          <p>Loading ads...</p>
        ) : recentImmobilien.length === 0 ? (
          <p>Keine Immobilienanzeigen gefunden.</p>
        ) : (
          <Swiper
            className="w-full"
            slidesPerView={1}
            centeredSlides={false}
            spaceBetween={30}
            grabCursor={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              1530: { slidesPerView: 4 },
              780: { slidesPerView: 3 },
              500: { slidesPerView: 2 },
              50: { slidesPerView: 1 },
            }}
            modules={[Autoplay, Navigation]}
          >
            {recentImmobilien.map((ad) => (
              <SwiperSlide key={ad._id}>
                <AdCard
                  entityId={ad.entityId}
                  id={ad._id}
                  location={ad.city}
                  postalCode={ad.zip}
                  price={ad.listingPrice}
                  title={ad.listingTitle}
                  objectCode={ad.uniqId}
                  img={ad?.imgCollection.length && ad?.imgCollection[0]}  
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div className="flex justify-center items-center pt-7">
          <Link
            to="/ads"
            className="bg-royalPurple text-white text-center text-base sm:text-lg py-3 px-10 rounded-lg w-full sm:w-auto hover:text-white font-bold font-extrabold uppercase"
          >
            ALLE IMMOBILIEN ANZEIGEN
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertySlider;
