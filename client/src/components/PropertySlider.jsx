import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import AdCard from "./Ads/AdCard";

const PropertySlider = ({ title, topMargin = false }) => {
  const [recentImmobilien, setRecentImmobilien] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      const ads1 = (await import("../assets/images/demo/ads1.png")).default;
      const ads2 = (await import("../assets/images/demo/ads2.png")).default;
      const ads3 = (await import("../assets/images/demo/ads3.png")).default;
      const ads4 = (await import("../assets/images/demo/ads4.png")).default;
      const ads5 = (await import("../assets/images/demo/ads5.png")).default;
      const ads6 = (await import("../assets/images/demo/ads5.png")).default;

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

        {recentImmobilien.length === 0 ? (
          <p>Loading ads...</p>
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
            {recentImmobilien.map((ad, i) => (
              <SwiperSlide key={i}>
                <AdCard
                  entityId={ad.entityId}
                  id={ad._id}
                  location={ad.city}
                  postalCode={ad.zip}
                  price={ad.listingPrice}
                  title={ad.listingTitle}
                  objectCode={ad.uniqId}
                  img={ad.img}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div className="flex justify-center items-center pt-7">
          <Link
            to="/ads"
            className="bg-royalPurple text-white text-center text-base sm:text-lg py-3 px-10 rounded-lg w-full sm:w-auto hover:text-white font-bold font-extrabold uppercase"
            style={
              {
                // fontFamily: 'Filicudi Solid',
              }
            }
          >
            ALLE IMMOBILIEN ANZEIGEN
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertySlider;
