import React from "react";
import { Button, Card, CardBody } from "@windmill/react-ui";
import { CheckIcon, DeleteIcon } from "../../icons";
import { useTranslation } from "react-i18next";

function PricingCardSale({
  packageId,
  title,
  type,
  listData,
  value,
  active,
  enabled,
  callback,
  month
}) {
  const { t } = useTranslation();
  const packages = [
    { title: "ImmoScout24", allowedIn: ["BASIC", "MEDIUM", "PREMIUM"] },
    { title: "Kleinanzeigen", allowedIn: ["BASIC", "MEDIUM", "PREMIUM"] },
    { title: "Immowelt", allowedIn: ["MEDIUM", "PREMIUM"] },
    { title: "Immonet", allowedIn: ["MEDIUM", "PREMIUM"] },
    { title: "Premium Platzierung", allowedIn: ["PREMIUM"] },
  ];



  const handlePaymentClick = (e) => {
      e.preventDefault();
      callback(packageId, listData._id);
  }

  return (
    <>
      <div>
        <Card className="pt-0 mb-2">
        {title === "Basic" && (
            <div className="flex w-full items-center justify-end">
            <span
              className="py-4 px-2 rounded-sm bg-gray-600 text-center text-gray-100 text-xs w-full"
              type="success"
            >
              Erhöhte Sichtbarkeit
            </span>
          </div>
          ) }
          {title === "Medium" && (
            <div className="z-50 flex w-full items-center justify-end">
              <span
                className="py-4 px-2  rounded-sm bg-blue-600 text-center text-gray-100 text-xs w-full"
                type="success"
              >
                Unsere Empfehlung & Bestseller
              </span>
            </div>
          ) }
           {title === "Premium" && (
           <div className="flex w-full items-center justify-end">
            <span
              className="py-4 px-2  rounded-sm bg-gray-600 text-center text-gray-100 text-xs w-full"
              type="success"
            >
              Maximale Sichtbarkeit
            </span>
          </div>
          ) }
          <CardBody>
            <div className="w-full pt-0 md:py-2 py-0 justify-center flex-grow">
              <div className="flex md:gap-0 gap-4 md:block justify-start md:justify-center items-start mb-0">
                <div className="block">
                  <p className="text-left md:text-center font-bold text-sm uppercase mb-1">
                    {title}
                  </p>
                  <p className="text-left md:text-center font-bold text-3xl md:text-4xl">
                    {value}
                  </p>
                  <p className="text-left md:text-center font-regular text-xs mb-5">
                    {month}
                  </p>
                </div>
                <ul className="justify-start text-sm md:ml-0 md:mt-4 mt-0 h-12 md:h-auto md:mb-4">
                  <div className="block">
                    {packages.map((x,i) => (
                      <div key={i}>
                        {x.allowedIn.includes(type) ? (
                          <li className="flex ml-0 leading-tight mb-0 md:mb-1">
                            <i className="mr-1">
                              <CheckIcon />
                            </i>{" "}
                            {x.title}
                          </li>
                        ) : (
                          <li className="flex ml-0 text-gray-400 items-center leading-tight mb-0 md:mb-1">
                            <i className="mr-1">
                              <DeleteIcon />
                            </i>{" "}
                            {x.title}
                          </li>
                        )}
                      </div>
                    ))}

                    {/* <li className="flex items-center leading-tight mb-0 md:mb-1">
                      <i className="mr-1">
                        <CheckIcon />
                      </i>{" "}
                      Ebay Kleinanzeigen
                    </li> */}
                  </div>
                  {/* <div className="flex md:block">
                    <li className="flex ml-0 text-gray-400 items-center leading-tight mb-0 md:mb-1">
                      <i className="mr-1">
                        <DeleteIcon />
                      </i>{" "}
                      Immowelt
                    </li>
                    <li className="flex ml-3 md:ml-0 text-gray-400 items-center leading-tight mb-0 md:mb-1">
                      <i className="mr-1">
                        <DeleteIcon />
                      </i>{" "}
                      Immonet
                    </li>
                  </div>
                  <li className="flex md:ml-0 text-gray-400 items-center leading-tight mb-0 md:mb-1">
                    <i className="mr-1">
                      <DeleteIcon />
                    </i>{" "}
                    Premium Platzierung
                  </li> */}
                </ul>
              </div>
              <Button
                block
                className="md:mt-0 mt-5"
                disabled={active || !enabled}
                onClick={handlePaymentClick}
              >
                {active && <span>{t("Active plan")}</span>}
                {!active && <span>{t("Choose")}</span>}
              </Button>
              <p className="text-xs text-gray-400 text-center mt-2">
                <small>* Inkl. 19% MwSt. + immer kündbar.</small>
              </p>
            </div>
          </CardBody>
        </Card>
        {/* <Card className="pt-0 md:-mt-6 mb-2">
        <div className="z-50 flex w-full items-center justify-end">
              <span className="py-1 rounded-sm bg-blue-600 text-center text-gray-100 text-xs w-full" type="success">
                Bestseller
              </span>
            </div>
            <CardBody>
              <div className="w-full pt-0 md:py-2 py-0 justify-center flex-grow">
                <div className="flex md:gap-0 gap-4 md:block justify-start md:justify-center items-start mb-0">
                  <div className="block">
                    <p className="text-left md:text-center font-bold text-sm uppercase mb-1">
                      MEDIUM
                    </p>
                    <p className="text-left md:text-center font-bold text-3xl md:text-4xl">
                      119€
                    </p>
                    <p className="text-left md:text-center font-regular text-xs mb-5">
                      pro Monat
                    </p>
                  </div>
                  <ul className="justify-start text-sm md:ml-0 md:mt-4 mt-0 h-12 md:h-auto md:mb-4">
                    <div className="block">
                      <li className="flex ml-0 leading-tight mb-0 md:mb-1">
                        <i className="mr-1">
                          <CheckIcon />
                        </i>{" "}
                        ImmoScout24
                      </li>
                      <li className="flex items-center leading-tight mb-0 md:mb-1">
                        <i className="mr-1">
                          <CheckIcon />
                        </i>{" "}
                        Ebay Kleinanzeigen
                      </li>
                    </div>
                    <div className="flex md:block">
                      <li className="flex ml-0 text-gray-400 items-center leading-tight mb-0 md:mb-1">
                        <i className="mr-1">
                          <DeleteIcon />
                        </i>{" "}
                        Immowelt
                      </li>
                      <li className="flex ml-3 md:ml-0 text-gray-400 items-center leading-tight mb-0 md:mb-1">
                        <i className="mr-1">
                          <DeleteIcon />
                        </i>{" "}
                        Immonet
                      </li>
                    </div>
                    <li className="flex md:ml-0 text-gray-400 items-center leading-tight mb-0 md:mb-1">
                        <i className="mr-1">
                          <DeleteIcon />
                        </i>{" "}
                        Premium Platzierung
                      </li>
                  </ul>
                </div>
                <Button
                  block
                  disabled={active || !enabled}
                  onClick={(e) => {
                    e.preventDefault();
                    callback(type, uniqId);
                  }}
                >
                  {active && <span>{t("Active plan")}</span>}
                  {!active && <span>{t("Choose")}</span>}
                </Button>
                <p className="text-xs text-gray-400 text-center mt-2">
                  <small>* Inkl. 19% MwSt. + immer kündbar.</small>
                </p>
              </div>
            </CardBody>
          </Card> */}
        {/* <Card className="pt-0 mb-2">
            <CardBody>
              <div className="w-full pt-0 md:py-2 py-0 justify-center flex-grow">
                <div className="flex md:gap-0 gap-4 md:block justify-start md:justify-center items-start mb-0">
                  <div className="block">
                    <p className="text-left md:text-center font-bold text-sm uppercase mb-1">
                      PREMIUM
                    </p>
                    <p className="text-left md:text-center font-bold text-3xl md:text-4xl">
                      159€
                    </p>
                    <p className="text-left md:text-center font-regular text-xs mb-5">
                      pro Monat
                    </p>
                  </div>
                  <ul className="justify-start text-sm md:ml-0 md:mt-4 mt-0 h-12 md:h-auto md:mb-4">
                    <div className="block">
                      <li className="flex ml-0 leading-tight mb-0 md:mb-1">
                        <i className="mr-1">
                          <CheckIcon />
                        </i>{" "}
                        ImmoScout24
                      </li>
                      <li className="flex items-center leading-tight mb-0 md:mb-1">
                        <i className="mr-1">
                          <CheckIcon />
                        </i>{" "}
                        Ebay Kleinanzeigen
                      </li>
                    </div>
                    <div className="flex md:block">
                      <li className="flex ml-0 text-gray-400 items-center leading-tight mb-0 md:mb-1">
                        <i className="mr-1">
                          <DeleteIcon />
                        </i>{" "}
                        Immowelt
                      </li>
                      <li className="flex ml-3 md:ml-0 text-gray-400 items-center leading-tight mb-0 md:mb-1">
                        <i className="mr-1">
                          <DeleteIcon />
                        </i>{" "}
                        Immonet
                      </li>
                    </div>
                    <li className="flex md:ml-0 text-gray-400 items-center leading-tight mb-0 md:mb-1">
                        <i className="mr-1">
                          <DeleteIcon />
                        </i>{" "}
                        Premium Platzierung
                      </li>
                  </ul>
                </div>
                <Button
                  block
                  disabled={active || !enabled}
                  onClick={(e) => {
                    e.preventDefault();
                    callback(type, uniqId);
                  }}
                >
                  {active && <span>{t("Active plan")}</span>}
                  {!active && <span>{t("Choose")}</span>}
                </Button>
                <p className="text-xs text-gray-400 text-center mt-2">
                  <small>* Inkl. 19% MwSt. + immer kündbar.</small>
                </p>
              </div>
            </CardBody>
          </Card> */}
      </div>
    </>
  );
}

function PricingCardRent({
  title,
  uniqId,
  type,
  value,
  active,
  enabled,
  callback,
}) {
  const { t } = useTranslation();

  return (
    <>
      <div className="grid w-full md:w-8/12 gap-3 mb-8 grid-cols-1 md:grid-cols-3">
        <Card className="pt-0 mb-2">
          <CardBody>
            <div className="w-full pt-0 md:py-2 py-0 justify-center flex-grow">
              <div className="flex md:gap-0 gap-4 md:block justify-start md:justify-center items-start mb-0">
                <div className="block">
                  <p className="text-left md:text-center font-bold text-sm uppercase mb-1">
                    BASIC
                  </p>
                  <p className="text-left md:text-center font-bold text-3xl md:text-4xl">
                    69€
                  </p>
                  <p className="text-left md:text-center font-regular text-xs mb-5">
                    pro Monat
                  </p>
                </div>
                <ul className="justify-start text-sm md:ml-0 md:mt-4 mt-0 h-12 md:h-auto md:mb-4">
                  <div className="block">
                    <li className="flex ml-0 leading-tight mb-0 md:mb-1">
                      <i className="mr-1">
                        <CheckIcon />
                      </i>{" "}
                      ImmoScout24
                    </li>
                    <li className="flex items-center leading-tight mb-0 md:mb-1">
                      <i className="mr-1">
                        <CheckIcon />
                      </i>{" "}
                      Ebay Kleinanzeigen
                    </li>
                  </div>
                  <div className="flex md:block">
                    <li className="flex ml-0 text-gray-400 items-center leading-tight mb-0 md:mb-1">
                      <i className="mr-1">
                        <DeleteIcon />
                      </i>{" "}
                      Immowelt
                    </li>
                    <li className="flex ml-3 md:ml-0 text-gray-400 items-center leading-tight mb-0 md:mb-1">
                      <i className="mr-1">
                        <DeleteIcon />
                      </i>{" "}
                      Immonet
                    </li>
                  </div>
                  <li className="flex md:ml-0 text-gray-400 items-center leading-tight mb-0 md:mb-1">
                    <i className="mr-1">
                      <DeleteIcon />
                    </i>{" "}
                    Premium Platzierung
                  </li>
                </ul>
              </div>
              <Button
                block
                disabled={active || !enabled}
                onClick={(e) => {
                  e.preventDefault();
                  callback(type, uniqId);
                }}
              >
                {active && <span>{t("Active plan")}</span>}
                {!active && <span>{t("Choose")}</span>}
              </Button>
              <p className="text-xs text-gray-400 text-center mt-2">
                <small>* Inkl. 19% MwSt. + immer kündbar.</small>
              </p>
            </div>
          </CardBody>
        </Card>
        <Card className="pt-0 md:-mt-6 mb-2">
          <div className="z-50 flex w-full items-center justify-end">
            <span
              className="py-1 rounded-sm bg-blue-600 text-center text-gray-100 text-xs w-full"
              type="success"
            >
              Bestseller
            </span>
          </div>
          <CardBody>
            <div className="w-full pt-0 md:py-2 py-0 justify-center flex-grow">
              <div className="flex md:gap-0 gap-4 md:block justify-start md:justify-center items-start mb-0">
                <div className="block">
                  <p className="text-left md:text-center font-bold text-sm uppercase mb-1">
                    MEDIUM
                  </p>
                  <p className="text-left md:text-center font-bold text-3xl md:text-4xl">
                    79€
                  </p>
                  <p className="text-left md:text-center font-regular text-xs mb-5">
                    pro Monat
                  </p>
                </div>
                <ul className="justify-start text-sm md:ml-0 md:mt-4 mt-0 h-12 md:h-auto md:mb-4">
                  <div className="block">
                    <li className="flex ml-0 leading-tight mb-0 md:mb-1">
                      <i className="mr-1">
                        <CheckIcon />
                      </i>{" "}
                      ImmoScout24
                    </li>
                    <li className="flex items-center leading-tight mb-0 md:mb-1">
                      <i className="mr-1">
                        <CheckIcon />
                      </i>{" "}
                      Ebay Kleinanzeigen
                    </li>
                  </div>
                  <div className="flex md:block">
                    <li className="flex ml-0 items-center leading-tight mb-0 md:mb-1">
                      <i className="mr-1">
                        <CheckIcon />
                      </i>{" "}
                      Immowelt
                    </li>
                    <li className="flex ml-3 md:ml-0 items-center leading-tight mb-0 md:mb-1">
                      <i className="mr-1">
                        <CheckIcon />
                      </i>{" "}
                      Immonet
                    </li>
                  </div>
                  <li className="flex md:ml-0 text-gray-400 items-center leading-tight mb-0 md:mb-1">
                    <i className="mr-1">
                      <DeleteIcon />
                    </i>{" "}
                    Premium Platzierung
                  </li>
                </ul>
              </div>
              <Button
                block
                disabled={active || !enabled}
                onClick={(e) => {
                  e.preventDefault();
                  callback(type, uniqId);
                }}
              >
                {active && <span>{t("Active plan")}</span>}
                {!active && <span>{t("Choose")}</span>}
              </Button>
              <p className="text-xs text-gray-400 text-center mt-2">
                <small>* Inkl. 19% MwSt. + immer kündbar.</small>
              </p>
            </div>
          </CardBody>
        </Card>
        <Card className="pt-0 mb-2">
          <CardBody>
            <div className="w-full pt-0 md:py-2 py-0 justify-center flex-grow">
              <div className="flex md:gap-0 gap-4 md:block justify-start md:justify-center items-start mb-0">
                <div className="block">
                  <p className="text-left md:text-center font-bold text-sm uppercase mb-1">
                    PREMIUM
                  </p>
                  <p className="text-left md:text-center font-bold text-3xl md:text-4xl">
                    109€
                  </p>
                  <p className="text-left md:text-center font-regular text-xs mb-5">
                    pro Monat
                  </p>
                </div>
                <ul className="justify-start text-sm md:ml-0 md:mt-4 mt-0 h-12 md:h-auto md:mb-4">
                  <div className="block">
                    <li className="flex ml-0 leading-tight mb-0 md:mb-1">
                      <i className="mr-1">
                        <CheckIcon />
                      </i>{" "}
                      ImmoScout24
                    </li>
                    <li className="flex items-center leading-tight mb-0 md:mb-1">
                      <i className="mr-1">
                        <CheckIcon />
                      </i>{" "}
                      Ebay Kleinanzeigen
                    </li>
                  </div>
                  <div className="flex md:block">
                    <li className="flex ml-0 items-center leading-tight mb-0 md:mb-1">
                      <i className="mr-1">
                        <CheckIcon />
                      </i>{" "}
                      Immowelt
                    </li>
                    <li className="flex ml-3 md:ml-0 items-center leading-tight mb-0 md:mb-1">
                      <i className="mr-1">
                        <CheckIcon />
                      </i>{" "}
                      Immonet
                    </li>
                  </div>
                  <li className="flex md:ml-0 items-center leading-tight mb-0 md:mb-1">
                    <i className="mr-1">
                      <CheckIcon />
                    </i>{" "}
                    Premium Platzierung
                  </li>
                </ul>
              </div>
              <Button
                block
                disabled={active || !enabled}
                onClick={(e) => {
                  e.preventDefault();
                  callback(type, uniqId);
                }}
              >
                {active && <span>{t("Active plan")}</span>}
                {!active && <span>{t("Choose")}</span>}
              </Button>
              <p className="text-xs text-gray-400 text-center mt-2">
                <small>* Inkl. 19% MwSt. + immer kündbar.</small>
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export { PricingCardSale, PricingCardRent };