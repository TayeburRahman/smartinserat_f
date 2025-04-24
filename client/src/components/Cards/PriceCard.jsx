import React from "react";
import { Card, CardBody } from "@windmill/react-ui";
import { CheckIcon, DeleteIcon } from "../../icons";
import { Link } from "react-router-dom";

const PriceCard = ({
  packageName,
  packageDescription,
  price,
  month,
  options,
  highlight,
}) => {
  return (
    <Card className="md:-mt-2 w-full mt-0 mb-2">
      <div className="flex w-full items-center justify-end">
        <span
          className={`py-4 rounded-sm  text-center text-gray-100 text-sm w-full ${
            highlight ? "bg-royalPurple" : "bg-gray-600"
          }`}
          type="success"
        >
          {packageDescription}
        </span>
      </div>
      <CardBody>
        <div className="w-full py-2 justify-center flex-grow">
          <div className="block">
            <p className="text-center text-gray-900 font-bold text-base uppercase mb-1">
              {packageName}
            </p>
            <p className="text-center text-gray-900  font-bold text-4xl lg:text-5xl">
              {price}€
            </p>
            <p className="text-center text-gray-900  font-regular text-sm mb-5">
              {month}
            </p>
          </div>
          <ul className="text-sm mx-auto w-3/4 md:w-full md:ml-3 mt-4 h-auto mb-4">
            {options.map((option) => (
              <li
                className={`flex   items-center ml-0 leading-tight mb-1 ${
                  option.available ? "text-gray-900" : "text-gray-400"
                }`}
              >
                <i className="mr-1 text-gray-900 ">
                  {option.available ? <CheckIcon /> : <DeleteIcon />}
                </i>{" "}
                {option.label}
              </li>
            ))}
          </ul>
          <div className="flex justify-center">
            <Link
              className="hover:text-white bg-royalPurple text-white text-sm font-bold px-6 py-2 rounded-lg uppercase"
              style={
                {
                  // fontFamily: 'Filicudi Solid',
                }
              }
            >
              IMMOBILIE INSERIEREN
            </Link>
          </div>

          <p className="text-xs text-gray-400 text-center mt-2">
            <small>* Inkl. 19% MwSt. + immer kündbar.</small>
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default PriceCard;
