import React from "react";
import { Avatar, CardBody } from "@windmill/react-ui";
import { StarIcon } from "../icons";

import { dictionary } from "../resources/multiLanguages";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

function ReviewCard({ customer, quote, review }) {
  return (
    <CardBody className="px-5 shadow-md h-64 bg-white flex justify-center items-center my-2 rounded-lg">
      <div className="flex flex-col justify-start items-start gap-5 w-full h-full">
        <div className="flex flex-row gap-2 items-center">
          {/* Display first character of the customer in uppercase */}
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold text-xl">
            {customer?.charAt(0).toUpperCase()}
          </div>

          <div className="flex flex-col gap-1 items-start justify-center">
            <h6 className="text-gray-900 font-semibold">{customer}</h6>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon
                  key={index}
                  className="fill-current text-yellow-300 w-5 h-5"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 items-start justify-center">
          <p className="font-medium text-gray-900 text-xl text-left">
            "{quote}"
          </p>
          <p className=" text-gray-800 text-md text-left">{review}</p>
        </div>
      </div>
    </CardBody>
  );
}

function TestimonialsSlider() {
  const languageReducer = "de";

  return (
    <div
      className=" flex flex-col justify-center text-center items-center pb-6 pt-10"
      id="Rezensionen"
    >
      <h3 className="text-royalPurple text-1xl sm:text-2xl font-extrabold uppercase mt-14 p-2">
        REZENSIONEN
      </h3>
      <h2 className="text-black text-2xl sm:text-3xl font-extrabold p-2">
        WAS SAGEN BISHERIGE KUNDEN ?
      </h2>

      <div className="flex justify-center items-center bg-gray-50 w-full rounded-lg mt-10">
        <div className="w-full max-w-sm md:max-w-3xl lg:max-w-5xl  xl:max-w-7xl pt-8 pb-8 px-5">
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
              1530: {
                slidesPerView: 3,
              },
              800: {
                slidesPerView: 2,
              },
              600: {
                slidesPerView: 1,
              },
            }}
            modules={[Autoplay, Navigation]}
          >
            <SwiperSlide className="w-full">
              <ReviewCard
                customer={
                  dictionary["testimonials"][languageReducer]["tile1"]["name"]
                }
                review={
                  dictionary["testimonials"][languageReducer]["tile1"][
                    "message"
                  ]
                }
                quote={
                  dictionary["testimonials"][languageReducer]["tile1"]["title"]
                }
              />
            </SwiperSlide>
            <SwiperSlide className="w-full">
              <ReviewCard
                customer={
                  dictionary["testimonials"][languageReducer]["tile2"]["name"]
                }
                review={
                  dictionary["testimonials"][languageReducer]["tile2"][
                    "message"
                  ]
                }
                quote={
                  dictionary["testimonials"][languageReducer]["tile2"]["title"]
                }
              />
            </SwiperSlide>
            <SwiperSlide className="w-full">
              <ReviewCard
                customer={
                  dictionary["testimonials"][languageReducer]["tile3"]["name"]
                }
                review={
                  dictionary["testimonials"][languageReducer]["tile3"][
                    "message"
                  ]
                }
                quote={
                  dictionary["testimonials"][languageReducer]["tile3"]["title"]
                }
              />
            </SwiperSlide>
            <SwiperSlide className="w-full">
              <ReviewCard
                customer={
                  dictionary["testimonials"][languageReducer]["tile4"]["name"]
                }
                review={
                  dictionary["testimonials"][languageReducer]["tile4"][
                    "message"
                  ]
                }
                quote={
                  dictionary["testimonials"][languageReducer]["tile4"]["title"]
                }
              />
            </SwiperSlide>
            <SwiperSlide className="w-full">
              <ReviewCard
                customer={
                  dictionary["testimonials"][languageReducer]["tile5"]["name"]
                }
                review={
                  dictionary["testimonials"][languageReducer]["tile5"][
                    "message"
                  ]
                }
                quote={
                  dictionary["testimonials"][languageReducer]["tile5"]["title"]
                }
              />
            </SwiperSlide>
            <SwiperSlide className="w-full">
              <ReviewCard
                customer={
                  dictionary["testimonials"][languageReducer]["tile6"]["name"]
                }
                review={
                  dictionary["testimonials"][languageReducer]["tile6"][
                    "message"
                  ]
                }
                quote={
                  dictionary["testimonials"][languageReducer]["tile6"]["title"]
                }
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default TestimonialsSlider;
