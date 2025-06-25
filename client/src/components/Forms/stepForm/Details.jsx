import React from "react";
import { Button, Label, Input, Select } from "@windmill/react-ui";
import BuildingTypeHouse from "./conditionalFormElements/BuildingTypeHouse";
import BuildingTypeFlat from "./conditionalFormElements/BuildingTypeFlat";
import BuildingTypeLand from "./conditionalFormElements/BuildingTypeLand";
import BuildingTypeCommercial from "./conditionalFormElements/BuildingTypeCommercial";
import BuildingTypeInvestment from "./conditionalFormElements/BuildingTypeInvestment";
import { useTranslation } from "react-i18next";
import { dictionary } from "../../../resources/multiLanguages";

export const Details = ({ formData, setForm, navigation, isReviewMode,
   my_swiper, fRequired, setFRequired,
   energy, setEnergy,  testEnergy, setTestEnergy}) => {
  const { go } = navigation;
  const {
    buildingType,
    listingType,
    energyPassCreationDate,
    energySource,
    contactType,
    commission,
    energyEfficiencyClass,
    additionalCost,
    secuirityCost,
    energyPass,
    typeOfEnergyPass,
    typeOfHeating,
    heatingCostinDetails,
    yearOfBuilding,
    buildingphase,
    totalarea
  } = formData;
  const buildingTypeProps = { formData, setForm };
  const { t } = useTranslation();
  const languageReducer = "de";
  return (
    <div className="container mx-auto px-4">
      {buildingType === "HOUSE" && <BuildingTypeHouse {...buildingTypeProps} />}
{buildingType === "APARTMENT" && <BuildingTypeFlat {...buildingTypeProps} />}
{buildingType === "SPECIAL_PURPOSE" && <BuildingTypeLand {...buildingTypeProps} />}
{buildingType === "TRADE_SITE" && (
  <BuildingTypeCommercial {...buildingTypeProps} />
)}
{buildingType === "INVESTMENT" && (
  <BuildingTypeInvestment {...buildingTypeProps} />
)}

      {contactType === "business" && <Label className="mt-4">
        <span>{dictionary["createAds"][languageReducer]["details"]["amountOfCommission"]}:</span>
        <Input
          type="text"
          className="mb-4 mt-1"
          label="Commission"
          placeholder={dictionary["createAds"][languageReducer]["details"]["enterAmountOfCommision"]}
          name="commission"
          value={commission}
          onChange={setForm}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          fullwidth='true'
        />
      </Label>}
      <Label className="lg:flex">
        <span>{dictionary["createAds"][languageReducer]["details"]["energy"]}:</span>
        <div className="ml-3 mt-3 sm:mt-0 block md:flex">
          <div className="block md:flex items-center">
            <Input
              readOnly={true}
              type="radio"
              value={true}
              checked={testEnergy === "with energy"}
              onClick={() => {
                setFRequired(false);
                setTestEnergy("with energy");
                setEnergy(true);
              }}
              onChange={setForm}
              name="energy"
            />
            <span className="ml-2">{dictionary["createAds"][languageReducer]["details"]["energy"]}</span>
          </div>
          <div className="block md:flex md:mt-0 mt-1 items-center">
            <Input
              readOnly={true}
              className="ml-0 md:ml-2"
              type="radio"
              value={false}
              checked={testEnergy === "no energy"}
              onClick={() => {
                setFRequired(false);
                setTestEnergy("no energy");
                setEnergy(false);
              }}
              onChange={setForm}
              name="energy"
            />
            <span className="ml-2">{dictionary["createAds"][languageReducer]["details"]["noEnergy"]}</span>
          </div>
        </div>
      </Label>
      {
        energy &&
        <>
          <Label className="mt-4">
            <span>{dictionary["createAds"][languageReducer]["details"]["energyPass"]}:</span>
            <span style={{color: "red"}}>*</span>
            <Input
              type="number"
              className="mb-4 mt-1"
              label="Energy Pass"
              placeholder={dictionary["createAds"][languageReducer]["details"]["enterEnergyPass"]}
              name="energyPass"             
              value={energyPass}
              onChange={setForm}
              margin="normal"
              variant="outlined"
              autoComplete="off"
              fullwidth='true'
            />
          </Label>
          <Label className="mt-4">
            <span>{dictionary["createAds"][languageReducer]["details"]["energyEfficiencyClass"]}:</span>
            <span style={{color: "red"}}>*</span>
            <Select
              className="mb-4 mt-1"
              label="Energy Efficiency Class"
              name="energyEfficiencyClass"
              value={energyEfficiencyClass}
              onChange={setForm}
              margin="normal"
              variant="outlined"
              autoComplete="off"
              fullwidth='true'
              readOnly={true}
            >
              <option value="00">{dictionary["createAds"][languageReducer]["details"]["chooseAnOption"]}</option>
              <option value="01">{dictionary["createAds"][languageReducer]["details"]["a"]}</option>
              <option value="02">{dictionary["createAds"][languageReducer]["details"]["aplus"]}</option>
              <option value="03">{dictionary["createAds"][languageReducer]["details"]["b"]}</option>
              <option value="04">{dictionary["createAds"][languageReducer]["details"]["c"]}</option>
              <option value="05">{dictionary["createAds"][languageReducer]["details"]["d"]}</option>
              <option value="06">{dictionary["createAds"][languageReducer]["details"]["e"]}</option>
              <option value="07">{dictionary["createAds"][languageReducer]["details"]["f"]}</option>
              <option value="08">{dictionary["createAds"][languageReducer]["details"]["g"]}</option>
              <option value="09">{dictionary["createAds"][languageReducer]["details"]["h"]}</option>
            </Select>
          </Label>
          <Label className="mt-4">
            <span>{dictionary["createAds"][languageReducer]["details"]["energyPassCreationDate"]}:</span>
            <span style={{ color: "red" }}>* </span>
            {fRequired && 
            <span style={{ color: "red" }}>{t("(dd.mm.yyyy)")}</span>
            }
            <Input
              type="text"
              className="mb-4 mt-1"
              label="Energy Pass Creation Date"
              placeholder={dictionary["createAds"][languageReducer]["details"]["energyPassCreationDateExample"]}
              name="energyPassCreationDate"
              value={energyPassCreationDate}
              onChange={setForm}
              margin="normal"
              variant="outlined"
              autoComplete="off"
              fullwidth='true'
            />
          </Label>
          <Label className="mt-4">
            <span>{dictionary["createAds"][languageReducer]["details"]["typeOfHeating"]}:</span>
            <span style={{color: "red"}}>*</span>
            <Select
              className="mb-4 mt-1"
              label="Type Of Heating"
              name="typeOfHeating"
              value={typeOfHeating}
              onChange={setForm}
              margin="normal"
              variant="outlined"
              autoComplete="off"
              fullwidth='true'
              readOnly={true}
            >
              <option value="">{dictionary["createAds"][languageReducer]["details"]["chooseAnOption"]}</option>
              <option value="02">{dictionary["createAds"][languageReducer]["details"]["furnaceHeating"]}</option>
              <option value="03">{dictionary["createAds"][languageReducer]["details"]["centralHeating"]}</option>
              <option value="01">{dictionary["createAds"][languageReducer]["details"]["floorHeating"]}</option>
              <option value="FUS">{dictionary["createAds"][languageReducer]["details"]["underfloorHeating"]}</option>
            </Select>
          </Label>
          <Label className="mt-4">
            <span>{dictionary["createAds"][languageReducer]["details"]["typeOfEnergyPass"]}</span>
            <span style={{color: "red"}}>*</span>
            <Select
              className="mb-4 mt-1"
              label="Type Of Energypass"
              name="typeOfEnergyPass"
              value={typeOfEnergyPass}
              onChange={setForm}
              margin="normal"
              variant="outlined"
              autoComplete="off"
              fullwidth='true'
              readOnly={true}
            >
              <option value="1">{dictionary["createAds"][languageReducer]["details"]["chooseAnOption"]}</option>
              <option value="3">{dictionary["createAds"][languageReducer]["details"]["consumptionPass"]}</option>
              <option value="2">{dictionary["createAds"][languageReducer]["details"]["requirePass"]}</option>
            </Select>
          </Label>
        </>
      }
      <Label className="mt-4">
        <span>{dictionary["createAds"][languageReducer]["details"]["energySource"]}:</span>
        <Select
          className="mb-4 mt-1"
          label="Energy Source"
          name="energySource"
          value={energySource}
          onChange={setForm}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          fullwidth='true'
          readOnly={true}
        > 
          <option value="">{dictionary["createAds"][languageReducer]["details"]["choose"]}</option>

          <option value="ol">{dictionary["createAds"][languageReducer]["details"]["oil"]}</option>
          <option value="ga">{dictionary["createAds"][languageReducer]["details"]["gas"]}</option>
          <option value="er">{dictionary["createAds"][languageReducer]["details"]["geothermalEnergy"]}</option>
          <option value="fe">{dictionary["createAds"][languageReducer]["details"]["districtHeating"]}</option>
          <option value="so">{dictionary["createAds"][languageReducer]["details"]["solar"]}</option>
          <option value="HO2">{dictionary["createAds"][languageReducer]["details"]["woodPellets"]}</option>
          <option value="st">{dictionary["createAds"][languageReducer]["details"]["electricity"]}</option>
          <option value="ko">{t("money")}</option>
          <option value="HO1">{dictionary["createAds"][languageReducer]["details"]["wood"]}</option>
        </Select>
      </Label>
      {buildingType !== 'LAND' &&
      <Label className="mt-4">
        <span>
          {dictionary["createAds"][languageReducer]["details"]["yearOfBuilding"]}:
          <span style={{color: "red"}}>*</span>
        </span>
        <Input
          type="number"
          className="mb-4 mt-1"
          label="Year Of Building"
          placeholder={dictionary["createAds"][languageReducer]["details"]["enterYearOfBuilding"]}
          name="yearOfBuilding"
          value={yearOfBuilding}
          onChange={setForm}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          fullwidth='true'
        />
      </Label> }
      {buildingType === 'HOUSE' &&
          <Label className="mt-4">
            <span>
              {dictionary["createAds"][languageReducer]["details"]["buildingPhase"]}:
              <span style={{color: "red"}}>*</span>
            </span>
            <Select
              className="mb-4 mt-1"
              name="buildingphase"
              value={buildingphase}
              onChange={setForm}
              margin="normal"
              variant="outlined"
              autoComplete="off"
              fullwidth='true'
              readOnly={true}
            > 
              <option value="">{dictionary["createAds"][languageReducer]["details"]["chooseAnOption"]}</option>
              <option value="no_information">{dictionary["createAds"][languageReducer]["details"]["noInformation"]}</option>
              <option value="completed">{dictionary["createAds"][languageReducer]["details"]["completed"]}</option>
              <option value="in_planning">{dictionary["createAds"][languageReducer]["details"]["inPlanning"]}</option>
              <option value="under_construction">{dictionary["createAds"][languageReducer]["details"]["underConstruction"]}</option>
            </Select>
          </Label>
      }
      {/* Conditional form elements */}
      {listingType === "For Rent" && (
        <div>
          <Label className="mt-4">
            <span>{dictionary["createAds"][languageReducer]["details"]["additionalCostsWithoutHeating"]}</span>
            <Input
              type="text"
              className="mb-4 mt-1"
              label="Additional Cost"
              placeholder={dictionary["createAds"][languageReducer]["details"]["enterAdditionalCostsWithoutHeating"]}
              name="additionalCost"
              value={additionalCost}
              onChange={setForm}
              margin="normal"
              variant="outlined"
              autoComplete="off"
              fullwidth='true'
            />
          </Label>
          <Label className="mt-4">
            <span>{dictionary["createAds"][languageReducer]["details"]["heatingCost"]}</span>
            <Input
              type="text"
              className="mb-4 mt-1"
              label="Heating Cost in Details"
              placeholder={dictionary["createAds"][languageReducer]["details"]["enterHeatingCost"]}
              name="heatingCostinDetails"
              value={heatingCostinDetails}
              onChange={setForm}
              margin="normal"
              variant="outlined"
              autoComplete="off"
              fullwidth='true'
            />
          </Label>
          <Label className="mt-4">
            <span>{dictionary["createAds"][languageReducer]["details"]["securityCost"]}</span>
            <Input
              type="number"
              className="mb-4 mt-1"
              label="Secuirity Cost"
              placeholder={dictionary["createAds"][languageReducer]["details"]["enterSecurityCost"]}
              name="secuirityCost"
              value={secuirityCost}
              onChange={setForm}
              margin="normal"
              variant="outlined"
              autoComplete="off"
              fullwidth='true'
            />
          </Label>
        </div>
      )}
        <>
          {fRequired ? <div style={{color: "red"}}>{dictionary["createAds"][languageReducer]["details"]["pleaseFillInRequiredFields"]}</div> : false}
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
              {dictionary["createAds"][languageReducer]["details"]["back"]}
            </Button>
            <Button
  variant="contained"
  fullWidth
  color="primary"
  style={{ marginTop: "1rem" }}
  onClick={() => {
    // Regex test for date dd.mm.yyyy (with escaped dot)
    if (energy && !/\d{2}\.\d{2}\.\d{4}/.test(formData.energyPassCreationDate)) {
      setFRequired(true);
      return;
    }

    if (
      (formData.yearOfBuilding === "" ||
        formData.yearOfBuilding.length !== 4 ||
        +formData.yearOfBuilding < 1500) &&
      buildingType !== "SPECIAL_PURPOSE" &&
      buildingType !== "TRADE_SITE"
    ) {
      setFRequired(true);
      return;
    }

    if (
      formData.numberOfRooms === "" &&
      buildingType !== "SPECIAL_PURPOSE" &&
      buildingType !== "TRADE_SITE" &&
      buildingType !== "INVESTMENT"
    ) {
      setFRequired(true);
      return;
    }

    if (
      formData.specificBuildingType === "" &&
      buildingType !== "TRADE_SITE" &&
      buildingType !== "INVESTMENT"
    ) {
      setFRequired(true);
      return;
    }

    if (formData.buildingphase === "" && buildingType === "HOUSE") {
      setFRequired(true);
      return;
    }

    if (
      formData.estatetype === "" &&
      (buildingType === "TRADE_SITE" || buildingType === "INVESTMENT")
    ) {
      setFRequired(true);
      return;
    }

    if (formData.totalarea === "" && buildingType === "TRADE_SITE") {
      setFRequired(true);
      return;
    }

    if (formData.leasablearea === "" && buildingType === "INVESTMENT") {
      setFRequired(true);
      return;
    }

    if (
      buildingType === "HOUSE" &&
      (!formData.livingArea || formData.livingArea === "")
    ) {
      setFRequired(true);
      return;
    }

    if (
      buildingType === "HOUSE" &&
      (!formData.plotArea || formData.plotArea === "")
    ) {
      setFRequired(true);
      return;
    }

    if (buildingType === "HOUSE" && (!formData.buildingphase || formData.buildingphase === "")) {
      setFRequired(true);
      return;
    }

    if (
      buildingType === "FLAT" &&
      (!formData.livingArea || formData.livingArea.length === 0)
    ) {
      setFRequired(true);
      return;
    }

    if (
      buildingType === "SPECIAL_PURPOSE" &&
      (!formData.plotArea || formData.plotArea === "")
    ) {
      setFRequired(true);
      return;
    }

    if (energy && (!formData.energyPass || formData.energyPass.length === 0)) {
      setFRequired(true);
      return;
    }

    if (energy && (!formData.typeOfHeating || formData.typeOfHeating.length === 0)) {
      setFRequired(true);
      return;
    }

    if (energy && (!formData.typeOfEnergyPass || formData.typeOfEnergyPass.length === 0)) {
      setFRequired(true);
      return;
    }

    setFRequired(false);
    my_swiper.slideNext();
    return navigation.next();
  }}
>
  {dictionary["createAds"][languageReducer]["details"]["next"]}
</Button>

          </>
        </>
    </div>
  );
};