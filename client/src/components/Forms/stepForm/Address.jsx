import React from "react";
import { Input, Label } from '@windmill/react-ui'
import SectionTitle from "../../Typography/SectionTitle";
import { Button } from '@windmill/react-ui'
import { useTranslation } from "react-i18next"
import { dictionary } from "../../../resources/multiLanguages";


export const Address = ({ formData, setForm, navigation, isReviewMode, my_swiper, fRequired, setFRequired }) => {
  const { go } = navigation;
  const { address, city, state, zip, hideAddress } = formData;
  const { t } = useTranslation();
  const languageReducer = "de";
  return (
    <div className="container mx-auto px-4 mt-4">
      <h2 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">{dictionary["createAds"][languageReducer]["address"]["Address_of_the_listing"]}</h2>
      <Label className="mt-4">
        <span>{dictionary["createAds"][languageReducer]["address"]["street_and_number"]}</span>
        <span style={{color: "red"}}>*</span>
          <Input
            label="Address"
            name="address"
            value={address}
            onChange={setForm}
            placeholder={dictionary["createAds"][languageReducer]["address"]["enter_street_and_number"]}
            margin="normal"
            variant="outlined"
            autoComplete="off"
            className="mt-1"
            fullwidth='true'
            type="text"
          />
      </Label>
      <div className="flex gap-4 mb-4">
      <Label className="mt-4 w-2/5">
        <span>{dictionary["createAds"][languageReducer]["address"]["zip"]}:</span>
        <span style={{color: "red"}}>*</span>
          <Input
            label="Zip"
            name="zip"
            type="number"
            placeholder={dictionary["createAds"][languageReducer]["address"]["enter_zip_code"]}
            value={zip}
            onChange={setForm}
            margin="normal"
            variant="outlined"
            autoComplete="off"
            className="w-25 mt-1"
          />
      </Label>
      <Label className="mt-4 w-3/5">
        <span>{dictionary["createAds"][languageReducer]["address"]["city"]}:</span>
        <span style={{color: "red"}}>*</span>
          <Input
            label="City"
            name="city"
            value={city}
            placeholder={dictionary["createAds"][languageReducer]["address"]["enter_city"]}
            onChange={setForm}
            margin="normal"
            variant="outlined"
            autoComplete="off"
            className="mt-1"
          />
      </Label>
      </div>
      <div className="flex items-center">
          <Input
            className="mr-2"
            type="checkbox"
            name="hideAddress"
            onChange={setForm}
            value={hideAddress}
            checked={hideAddress}
          />
          <span className="text-sm">{dictionary["createAds"][languageReducer]["address"]["hide_address"]}</span>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <>
          {fRequired && <div style={{color: "red"}}>{dictionary["createAds"][languageReducer]["address"]["Please_fill_in_the_required_fields"]}</div>}
          <>
          <Button
              layout="link"
              color="secondary"
              variant="contained"
              style={{ marginRight: "1rem" }}
              onClick={() => {
                my_swiper.slidePrev();
                return navigation.previous()
              }}
            >
              {dictionary["createAds"][languageReducer]["address"]["back"]}
            </Button>
            <Button
              variant="contained"
              fullwidth='true'
              color="primary"
              style={{ marginTop: "1rem" }}
              onClick={() => {
                if(city.length === 0 || zip.length === 0 || address.length === 0){
                  setFRequired(true);
                  return;
                }
                setFRequired(false);
                my_swiper.slideNext();
                return navigation.next()
              }}
            >
              {dictionary["createAds"][languageReducer]["address"]["next"]}
            </Button>
          </>
        </>
      </div>
      </div>
  );
};