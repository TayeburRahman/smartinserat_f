import React from "react";
import { HashLink } from "react-router-hash-link";

const AdCard = ({ id, title, location, price, img }) => {
  return (
    <div className="w-full max-w-sm sm:max-w-full md:max-w-md bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 transform hover:scale-[1.02]">
      <HashLink to={`/ads/${id}/#top`} className="block h-full">
        {/* Image */}
        <div className="aspect-[4/3] w-full bg-gray-100 overflow-hidden">
          <img
            src={img}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-2">
          {/* Title */}
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 line-clamp-1">
            {title}
          </h2>

          {/* Location */}
          <p className="text-sm sm:text-base text-gray-600 truncate">
            <span className="font-medium">Standort: </span>{location}
          </p>

          {/* Price */}
          <p className="text-sm sm:text-base text-gray-600">
            <span className="font-medium">Preis: </span>{price} €
          </p>
        </div>
      </HashLink>
    </div>
  );
};

export default AdCard;
