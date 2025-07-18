import React from "react";
import { Input, Label, Select, Button } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { EuroIcon } from "../../../icons";
import { LimitedInput } from "./LimitedText";
import { dictionary } from "../../../resources/multiLanguages";
export const Data = ({ formData, setForm, navigation,
  isReviewMode, my_swiper, fRequired, setFRequired, defaultData }) => {
  const { go } = navigation;
  const { listingTitle, listingType, buildingType, rentPrice, listingPrice, contactType, nebenkostenPrice, gesamtmietePrice } =
    formData;
  function numberWithCommas(x) {
    x = x.replace(/\./g, "");
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(",");
  }
  const { t } = useTranslation();
  useEffect(() => {
    let current = { listingTitle, listingType, buildingType, rentPrice, listingPrice, contactType };
    Object.assign(formData, defaultData, current);
  }, [buildingType]);

  const languageReducer = "de";

  console.log("====buildingType1", buildingType)
  return (
    <div className="container mx-auto px-4">
      <Label className="mt-4">
        <span>{dictionary["createAds"][languageReducer]["data"]["listingTitle"]}:</span>
        <span style={{ color: "red" }}>*</span>
        <LimitedInput
          limit={100}
          setForm={setForm}
          value={listingTitle}
          name="listingTitle"
          t={t}
        />
      </Label>
      <Label className="lg:flex">
        <span>{dictionary["createAds"][languageReducer]["data"]["listingType"]}:</span>
        <div className="ml-3 mt-3 sm:mt-0 sm:block">
          <Input
            readOnly={true}
            type="radio"
            value="For Sale"
            checked={listingType === "For Sale"}
            onClick={setForm}
            name="listingType"
          />
          <span className="ml-2">{dictionary["createAds"][languageReducer]["data"]["forSale"]}</span>
          <Input
            readOnly={true}
            className="ml-2"
            type="radio"
            value="For Rent"
            checked={listingType === "For Rent"}
            onClick={setForm}
            name="listingType"
          />
          <span className="ml-2">{dictionary["createAds"][languageReducer]["data"]["forRent"]}</span>
        </div>
      </Label>
      <Label className="mt-4">
  <span>{dictionary["createAds"][languageReducer]["data"]["buildingType"]}:</span>
  <Select
    className="mb-4 mt-1"
    label={dictionary["createAds"][languageReducer]["data"]["buildingType"]}
    name="buildingType"
    value={buildingType}
    onChange={setForm}
    margin="normal"
    variant="outlined"
    autoComplete="off"
    fullWidth
  >
    <option value="APARTMENT">{dictionary["createAds"][languageReducer]["data"]["APARTMENT"]}</option>
  <option value="HOUSE">{dictionary["createAds"][languageReducer]["data"]["HOUSE"]}</option>
  <option value="TRADE_SITE">{dictionary["createAds"][languageReducer]["data"]["TRADE_SITE"]}</option>
  <option value="GARAGE">{dictionary["createAds"][languageReducer]["data"]["GARAGE"]}</option>
  <option value="SHORT_TERM_ACCOMODATION">{dictionary["createAds"][languageReducer]["data"]["SHORT_TERM_ACCOMODATION"]}</option>
  <option value="OFFICE">{dictionary["createAds"][languageReducer]["data"]["OFFICE"]}</option>
  <option value="GASTRONOMY">{dictionary["createAds"][languageReducer]["data"]["GASTRONOMY"]}</option>
  <option value="INDUSTRY">{dictionary["createAds"][languageReducer]["data"]["INDUSTRY"]}</option>
  <option value="STORE">{dictionary["createAds"][languageReducer]["data"]["STORE"]}</option>
  <option value="SPECIAL_PURPOSE">{dictionary["createAds"][languageReducer]["data"]["SPECIAL_PURPOSE"]}</option>
  <option value="INVESTMENT">{dictionary["createAds"][languageReducer]["data"]["INVESTMENT"]}</option>
  </Select>
</Label>

      {listingType === "For Sale" && (
        <Label className="mt-4">
          <span>{dictionary["createAds"][languageReducer]["data"]["listingPrice"]}:</span>
          <span style={{ color: "red" }}>*</span>
          <div className="relative w-full focus-within:text-blue-400">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <EuroIcon className="w-4 h-4" aria-hidden="true" />
            </div>
            <Input
              className="mb-4 mt-1 p-2 pl-3 border border-solid border-gray-300 focus-within:text-gray-700 background_white"
              label="Listing Price"
              placeholder={dictionary["createAds"][languageReducer]["data"]["enterThePrice"]}
              name="listingPrice"
              value={numberWithCommas(listingPrice)}
              onChange={setForm}
              onKeyDown={(e) => !/^\d+$/.test(e.key) && e.key !== 'Backspace' ? e.preventDefault() : true}
              margin="normal"
              type="String"
              variant="outlined"
              autoComplete="off"
              fullwidth='true'
            />
          </div>
        </Label>
      )}
      {listingType === "For Rent" && (
        <Label className="mt-4">
          <span>{dictionary["createAds"][languageReducer]["data"]["rentPrice"]}:</span>
          <span style={{ color: "red" }}>*</span>
          <div className="relative w-full focus-within:text-blue-400">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <EuroIcon className="w-4 h-4" aria-hidden="true" />
            </div>
            <Input
              className="mb-4 mt-1 p-2 pl-3 border border-solid border-gray-300 focus-within:text-gray-700 background_white"
              label="Rent Price"
              placeholder={dictionary["createAds"][languageReducer]["data"]["enterRentPrice"]}
              name="rentPrice"
              value={numberWithCommas(rentPrice)}
              onChange={setForm}
              onKeyDown={(e) => !/^\d+$/.test(e.key) && e.key !== 'Backspace' ? e.preventDefault() : true}
              margin="normal"
              type="String"
              variant="outlined"
              autoComplete="off"
              fullwidth='true'
            /> 
          </div>

          <span>{dictionary["createAds"][languageReducer]["data"]["nebenkostenPrice"]}:</span>
          <span style={{ color: "red" }}> </span>
          <div className="relative w-full focus-within:text-blue-400">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <EuroIcon className="w-4 h-4" aria-hidden="true" />
            </div>
            <Input
              className="mb-4 mt-1 p-2 pl-3 border border-solid border-gray-300 focus-within:text-gray-700 background_white"
              label="Nebenkosten Price"
              placeholder={dictionary["createAds"][languageReducer]["data"]["enterNebenkostenPrice"]}
              name="nebenkostenPrice"
              value={numberWithCommas(nebenkostenPrice)}
              onChange={setForm}
              onKeyDown={(e) => !/^\d+$/.test(e.key) && e.key !== 'Backspace' ? e.preventDefault() : true}
              margin="normal"
              type="String"
              variant="outlined"
              autoComplete="off"
              fullwidth='true'
            /> 
          </div>

          <span>{dictionary["createAds"][languageReducer]["data"]["gesamtmietePrice"]}:</span>
          <span style={{ color: "red" }}> </span>
          <div className="relative w-full focus-within:text-blue-400">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <EuroIcon className="w-4 h-4" aria-hidden="true" />
            </div>
            <Input
              className="mb-4 mt-1 p-2 pl-3 border border-solid border-gray-300 focus-within:text-gray-700 background_white"
              label="Gesamtmiete Price"
              placeholder={dictionary["createAds"][languageReducer]["data"]["enterGesamtmietePrice"]}
              name="gesamtmietePrice"
              value={numberWithCommas(gesamtmietePrice)}
              onChange={setForm}
              onKeyDown={(e) => !/^\d+$/.test(e.key) && e.key !== 'Backspace' ? e.preventDefault() : true}
              margin="normal"
              type="String"
              variant="outlined"
              autoComplete="off"
              fullwidth='true'
            />
            
          </div>
        </Label>
      )}
   <Label className="lg:flex mb-4 mt-1">
  <span>{dictionary["createAds"][languageReducer]["data"]["istItaPrivateOrBusinessListing"]}</span>
  <div className="ml-3 mt-3 sm:mt-0 sm:block">
    <Input
      readOnly={true}
      type="radio"
      value="private person"
      checked={contactType === "private person"}
      onClick={setForm}
      name="contactType"
    />
    <span className="ml-2">
      {dictionary["createAds"][languageReducer]["data"]["privatePerson"]}
    </span>

    <Input
      readOnly={true}
      className="ml-2"
      type="radio"
      value="business"
      checked={contactType === "business"}
      onClick={setForm}
      name="contactType"
    />
    <span className="ml-2">
      {dictionary["createAds"][languageReducer]["data"]["business"]}
    </span>
  </div>
</Label>

      <>
        {fRequired && <div style={{ color: "red" }}>{dictionary["createAds"][languageReducer]["data"]["pleaseFillInTheRequiredFields"]}</div>}
        <Button
          variant="contained"
          fullwidth='true'
          color="primary"
          style={{ marginTop: "1rem" }}
          onClick={() => {
            if (listingType === "For Sale" && Number(listingPrice.replaceAll(".", "")) <= 50) {
              setFRequired(true);
              return;
            }
            if (listingType === "For Rent" && Number(rentPrice.replaceAll(".", "")) <= 50) {
              setFRequired(true);
              return;
            }
            if (listingTitle.length === 0) {
              setFRequired(true);
              return;
            }
            setFRequired(false);
            my_swiper.slideNext();
            return navigation.next()
          }}
        >
          {dictionary["createAds"][languageReducer]["data"]["next"]}
        </Button>
      </>
    </div>
  );
};