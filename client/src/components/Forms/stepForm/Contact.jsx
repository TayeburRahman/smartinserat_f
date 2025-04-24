import React, { useEffect, useState } from "react";
import { Input, Label } from "@windmill/react-ui";
import { Button } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import "./style.module.css"
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input';
import { dictionary } from "../../../resources/multiLanguages";
export const Contact = ({ formData, setForm, navigation, isReviewMode, my_swiper, fRequired, setFRequired, setPhone, phone }) => {
  const { go } = navigation;
  const { formEmail, contactName, nameHide, lastName } = formData;
  const { t } = useTranslation();
  const languageReducer = "de";
  const [lastNameRequired, setLastNameRequired] = useState(false);


  function normalizePhoneNumber1(input, defaultCountry = null) {
    const parsedPhone = parsePhoneNumber(input, defaultCountry)
    console.log(input, 'parsed as:', parsedPhone)
    if (parsedPhone) {
      return parsedPhone.number
    } else {
      return input
    }
  }

  useEffect(() => {
    if (formData.phone) {
      const normalizedPhoneNumber = normalizePhoneNumber1(formData.phone);
      setPhone(normalizedPhoneNumber);
    }
  
  }, [])

  const handleContactNext = () => {

    console.log("formdata.phone", formData.phone);
    console.log("phone", phone);


    if (lastName?.length === 0) {
      setLastNameRequired(true);
      return;
    }
    if (contactName?.length === 0 || formEmail?.length === 0 || lastName?.length === 0) {
      setFRequired(true);
      return;
    }

    if(!phone) {
      setFRequired(true);
      return;
    }

    const isValid = isValidPhoneNumber(phone);
    if (!isValid) {
      setFRequired(true);
      return;
    }
    setFRequired(false);
    my_swiper.slideNext();

    return navigation.next()
  }



  return (
    <div className="container mx-auto px-4">
      <Label className="mt-4">
        <span>{dictionary["createAds"][languageReducer]["contact"]["contactName"]}:</span>
        <span style={{ color: "red" }}>*</span>
        <div className="flex gap-4">
          <Input
            className="w-1/2 mb-4 mt-1"
            placeholder={dictionary["createAds"][languageReducer]["contact"]["enterFirstName"]}
            name="contactName"
            value={formData.contactName}
            onChange={setForm}
            margin="normal"
            variant="outlined"
            autoComplete="off"
            type="text"
            fullwidth='false'
          />

        </div>
      </Label>

      <Label>
        <span>{dictionary["createAds"][languageReducer]["contact"]["lastName"]}:</span>
        <span style={{ color: "red" }}>*</span>
        {lastNameRequired && <span style={{ color: "red" }}>{dictionary["createAds"][languageReducer]["contact"]["pleaseProvideValidLastName"]}</span>}
        <Input
          className="w-1/2 mb-4 mt-1"
          placeholder={dictionary["createAds"][languageReducer]["contact"]["enterLastName"]}
          name="lastName"
          value={formData.lastName}
          onChange={setForm}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          type="text"
          fullwidth='false'
        />
      </Label>

      <div className="flex items-center">
        <Input
          className="mr-2"
          type="checkbox"
          name="nameHide"
          value={nameHide}
          onChange={setForm}
        />
        <span>{t("hide name")}</span>
      </div>

      <Label className="mt-4">
        <span>{dictionary["createAds"][languageReducer]["contact"]["email"]}:</span>
        <span style={{ color: "red" }}>*</span>
        <div>
          <Input
            className="mb-4 mt-1"
            label="E-Mail"
            name="formEmail"
            value={formEmail}
            onChange={setForm}
            margin="normal"
            variant="outlined"
            autoComplete="off"
            placeholder={dictionary["createAds"][languageReducer]["contact"]["enterEmail"]}
            fullwidth='true'
            type="email"
          />
        </div>
      </Label>
      <Label className="mt-4">
        <span>{t("phone number")}:</span>
        {fRequired && <span style={{ color: "red" }}>{dictionary["createAds"][languageReducer]["contact"]["pleaseProvideValidPhone"]}</span>}
        <div>
          <PhoneInput
            className="mb-4 mt-1 "
            label="Phone Number"
            margin="normal"
            variant="outlined"
            autoComplete="off"
            fullwidth='true'
            name="phone"
            international
            countryCallingCodeEditable={false}
            defaultCountry="DE"
            value={phone}
            onChange={setPhone}
          />
        </div>
      </Label>
      <div style={{ marginTop: "1rem" }}>
        <>
          {fRequired && <div style={{ color: "red" }}>{dictionary["createAds"][languageReducer]["contact"]["pleaseFillRequiredFields"]}</div>}

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
              {t("back")}
            </Button>
            <Button
              variant="contained"
              fullwidth='true'
              color="primary"
              style={{ marginTop: "1rem" }}
              onClick={handleContactNext}
            >
              {t("next")}
            </Button>
          </>
        </>
      </div>
    </div>
  );
};