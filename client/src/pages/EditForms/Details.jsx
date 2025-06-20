import React, { useContext, useEffect, useState } from "react";
import { Button, Label, Input, Select } from "@windmill/react-ui";
import BuildingTypeHouse from "./../../components/Forms/stepForm/conditionalFormElements/BuildingTypeHouse";
import BuildingTypeFlat from "./../../components/Forms/stepForm/conditionalFormElements/BuildingTypeFlat";
import BuildingTypeLand from "./../../components/Forms/stepForm/conditionalFormElements/BuildingTypeLand";
import BuildingTypeCommercial from "./../../components/Forms/stepForm/conditionalFormElements/BuildingTypeCommercial";
import BuildingTypeInvestment from "./../../components/Forms/stepForm/conditionalFormElements/BuildingTypeInvestment";
// import BuildingTypeInvestment from "./ConditionalForms/BuildingTypeInvestment";
import { useNavigate } from "react-router-dom";
import defaultData from "./DefaultData";
import { useForm } from "react-hooks-helper";
import { userListService } from "../../services";
import { useTranslation } from "react-i18next";
// import { flowFactService } from "../../services/flowfact.service";
import { SnackbarContext } from "../../context/SnackbarContext";
export const Details = ({ data, fRequired, setFRequired }) => {
  const history = useNavigate();
  const { _id: uniqId } = data;
  const { t } = useTranslation();
  Object.assign(defaultData, data);
  const [formData, setForm] = useForm(defaultData);
  const buildingTypeProps = { formData, setForm };
  // let data = formData.energyPass == 'false' ? false : true;
  const [energy, setEnergy] = useState(formData.energy);
  const [testEnergy, setTestEnergy] = useState(
    `${!formData.energy ? "no energy" : "with energy"}`
  );
  const { openSnackbar, closeSnackbar } = useContext(SnackbarContext);
  const [enabled, setEnabled] = useState(true);
  useEffect(() => {
    if (enabled) {
      closeSnackbar();
    } else {
      openSnackbar(t("Updating Please Wait..."));
    }
  }, [enabled, openSnackbar, closeSnackbar]);
  const handleUpdateList = async (uniqId) => {
    setEnabled(false);
    // await flowFactService.updateFlowFactListDetails(formData);
    await userListService
      .updateUserListDetails(uniqId, formData)
      .then(async (res) => {
        setEnabled(true);
        history("/app");
        history("/app/userLists");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container mx-auto px-4">
      {formData.buildingType === "House" && (
        <BuildingTypeHouse {...buildingTypeProps} />
      )}
      {formData.buildingType === "Flat" && (
        <BuildingTypeFlat {...buildingTypeProps} />
      )}
      {formData.buildingType === "Land" && (
        <BuildingTypeLand {...buildingTypeProps} />
      )}
      {formData.buildingType === "Commercial" && (
        <BuildingTypeCommercial {...buildingTypeProps} />
      )}
      {formData.buildingType === "Investment" && (
        <BuildingTypeInvestment {...buildingTypeProps} />
      )}
      {formData.contactType === "business" && (
        <Label className="mt-4">
          <span>{t("Commission")}</span>
          <Input
            type="text"
            className="mb-4 mt-1"
            label="Commission"
            placeholder={t("Commission")}
            name="commission"
            value={formData.commission}
            onChange={setForm}
            margin="normal"
            variant="outlined"
            autoComplete="off"
            fullwidth="true"
          />
        </Label>
      )}
      <Label className="lg:flex">
        <span>{t("Energy")}:</span>
        <div className="ml-3 mt-3 sm:mt-0 sm:block">
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
          <span className="ml-2">{t("Energy")}</span>
          <Input
            readOnly={true}
            className="ml-2"
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
          <span className="ml-2">{t("No Energy")}</span>
        </div>
      </Label>
      {energy && (
        <>
          <Label className="mt-4">
            <span>{t("energy pass")}:</span>
            <span style={{ color: "red" }}>*</span>
            <Input
              type="text"
              className="mb-4 mt-1"
              label="Energy Pass"
              placeholder={t("enter energy pass")}
              name="energyPass"
              value={formData.energyPass}
              onChange={setForm}
              margin="normal"
              variant="outlined"
              autoComplete="off"
              fullwidth="true"
            />
          </Label>
          <Label className="mt-4">
            <span>{t("Energy Efficiency Class")}:</span>
            <span style={{ color: "red" }}>*</span>
            <Select
              className="mb-4 mt-1"
              label="Energy Efficiency Class"
              name="energyEfficiencyClass"
              value={formData.energyEfficiencyClass}
              onChange={setForm}
              margin="normal"
              variant="outlined"
              autoComplete="off"
              fullwidth="true"
              readOnly={true}
            >
              <option value="00">{t("Choose an option")}</option>
              <option value="01">{t("A")}</option>
              <option value="02">{t("A+")}</option>
              <option value="03">{t("B")}</option>
              <option value="04">{t("C")}</option>
              <option value="05">{t("D")}</option>
              <option value="06">{t("E")}</option>
              <option value="07">{t("F")}</option>
              <option value="08">{t("G")}</option>
              <option value="09">{t("H")}</option>
            </Select>
          </Label>
          <Label className="mt-4">
            <span>{t("energy Pass Creation Date")}:</span>
            <span style={{ color: "red" }}>* </span>
            {fRequired && 
            <span style={{ color: "red" }}>{t("(dd.mm.yyyy)")}</span>
            }
            <Input
              type="text"
              className="mb-4 mt-1"
              label="energy Pass Creation Date"
              placeholder={t(
                "enter energy pass creation date | exemple: z.B. 13.01.2012"
              )}
              name="energyPassCreationDate"
              value={formData.energyPassCreationDate}
              onChange={setForm}
              margin="normal"
              variant="outlined"
              autoComplete="off"
              fullwidth="true"
            />
          </Label>
          <Label className="mt-4">
            <span>{t("type of heating")}:</span>
            <span style={{ color: "red" }}>*</span>
            <Select
              className="mb-4 mt-1"
              label="Type Of Heating"
              name="typeOfHeating"
              value={formData.typeOfHeating}
              onChange={setForm}
              margin="normal"
              variant="outlined"
              autoComplete="off"
              fullwidth="true"
              readOnly={true}
            >
              <option value="">{t("Choose an option")}</option>
              <option value="02">{t("Furnace heating")}</option>
              <option value="03">{t("Central heating")}</option>
              <option value="01">{t("Floor heating")}</option>
              <option value="FUS">{t("Underfloor heating")}</option>
            </Select>
          </Label>
          <Label className="mt-4">
            <span>{t("type of energypass")}:</span>
            <span style={{ color: "red" }}>*</span>
            <Select
              className="mb-4 mt-1"
              label="Type Of Energypass"
              name="typeOfEnergyPass"
              value={formData.typeOfEnergyPass}
              onChange={setForm}
              margin="normal"
              variant="outlined"
              autoComplete="off"
              fullwidth="true"
              readOnly={true}
            >
              <option value="1">{t("Choose an option")}</option>
              <option value="3">{t("consumption pass")}</option>
              <option value="2">{t("require pass")}</option>
            </Select>
          </Label>
        </>
      )}
      <Label className="mt-4">
        <span>{t("Energy Source")}:</span>
        <Select
          className="mb-4 mt-1"
          label="Energy Source"
          name="energySource"
          value={formData.energySource}
          onChange={setForm}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          fullwidth="true"
          readOnly={true}
        >
          <option value="">{t("Choose an option")}</option>
          <option value="ol">{t("oil")}</option>
          <option value="ga">{t("Gas")}</option>
          <option value="er">{t("Geothermal energy")}</option>
          <option value="fe">{t("District heating")}</option>
          <option value="so">{t("Solar")}</option>
          <option value="HO2">{t("Wood pellets")}</option>
          <option value="st">{t("Strom")}</option>
          <option value="ko">{t("money")}</option>
          <option value="HO1">{t("wood")}</option>
        </Select>
      </Label>
      {formData.buildingType === "House" && (
        <Label className="mt-4">
          <span>
            {t("Building Phase")}:<span style={{ color: "red" }}>*</span>
          </span>
          <Select
            className="mb-4 mt-1"
            name="buildingphase"
            value={formData.buildingphase}
            onChange={setForm}
            margin="normal"
            variant="outlined"
            autoComplete="off"
            fullwidth="true"
            readOnly={true}
          >
            <option value="">{t("Choose an option")}</option>
            <option value="no_information">{t("No information")}</option>
            <option value="completed">{t("Completed")}</option>
            <option value="in_planning">{t("In planning")}</option>
            <option value="under_construction">
              {t("Under construction")}
            </option>
          </Select>
        </Label>
      )}
      <Label className="mt-4">
        <span>
          {t("year of building")}:<span style={{ color: "red" }}>*</span>
        </span>
        <Input
          type="text"
          className="mb-4 mt-1"
          label="Year Of Building"
          placeholder={t("enter year of building")}
          name="yearOfBuilding"
          value={formData.yearOfBuilding}
          onChange={setForm}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          fullwidth="true"
        />
      </Label>
      {/* Conditional form elements */}
      {formData.listingType === "For Rent" && (
        <div>
          <Label className="mt-4">
            <span>{t("additional costs without heating")}</span>
            <Input
              type="text"
              className="mb-4 mt-1"
              label="Additional Cost"
              placeholder={t("enter additional costs without heating")}
              name="additionalCost"
              value={formData.additionalCost}
              onChange={setForm}
              margin="normal"
              variant="outlined"
              autoComplete="off"
              fullwidth="true"
            />
          </Label>
          <Label className="mt-4">
            <span>{t("heating cost")}</span>
            <Input
              type="text"
              className="mb-4 mt-1"
              label="Heating Cost in Details"
              placeholder={t("enter heating cost")}
              name="heatingCostinDetails"
              value={formData.heatingCostinDetails}
              onChange={setForm}
              margin="normal"
              variant="outlined"
              autoComplete="off"
              fullwidth="true"
            />
          </Label>
          <Label className="mt-4">
            <span>{t("security cost")}</span>
            <Input
              type="number"
              className="mb-4 mt-1"
              label="Secuirity Cost"
              placeholder={t("enter security cost")}
              name="secuirityCost"
              value={formData.secuirityCost}
              onChange={setForm}
              margin="normal"
              variant="outlined"
              autoComplete="off"
              fullwidth="true"
            />
          </Label>
        </div>
      )}
      {fRequired ? (
        <div style={{ color: "red" }}>
          {t("Please fill in the required fields *")}
        </div>
      ) : (
        false
      )}
      <Button
        variant="contained"
        fullwidth="true"
        color="primary"
        style={{ marginTop: "1rem" }}
        // onClick={() => handleUpdateList(uniqId)}
        onClick={() => {
          if(energy && !/\d{2}.\d{2}.\d{4}/.test(formData.energyPassCreationDate)){
            setFRequired(true);
            return;
          }
          if (
            (formData.yearOfBuilding == "" ||
              !formData.yearOfBuilding.length == 4 ||
              +formData.yearOfBuilding < 1500) &&
            formData.buildingType != "Land"
          ) {
            setFRequired(true);
            return;
          }
          if (
            formData.numberOfRooms == "" &&
            formData.buildingType != "Land" &&
            formData.buildingType != "Commercial" &&
            formData.buildingType != "Investment"
          ) {
            setFRequired(true);
            return;
          }
          if (
            formData.specificBuildingType == "" &&
            formData.buildingType != "Commercial" &&
            formData.buildingType != "Investment"
          ) {
            setFRequired(true);
            return;
          }
          if (
            formData.estatetype == "" &&
            (formData.buildingType == "Commercial" ||
              formData.buildingType == "Investment")
          ) {
            setFRequired(true);
            return;
          }
          if (
            formData.leasablearea == "" &&
            formData.buildingType == "Investment"
          ) {
            setFRequired(true);
            return;
          }
          if (
            (formData.buildingType == "House" &&
              formData.livingArea.length === 0) ||
            (formData.buildingType == "House" && formData.plotArea.length === 0)
          ) {
            setFRequired(true);
            return;
          }
          if (
            formData.buildingType == "House" &&
            formData.buildingphase.length == ""
          ) {
            setFRequired(true);
            return;
          }
          if (
            formData.buildingType == "Flat" &&
            formData.livingArea.length === 0
          ) {
            setFRequired(true);
            return;
          }
          if (
            formData.buildingType == "Land" &&
            formData.plotArea.length === 0
          ) {
            setFRequired(true);
            return;
          }
          if (energy && formData.energyPass.length == 0) {
            setFRequired(true);
            return;
          }
          if (energy && formData.typeOfHeating.length == 0) {
            setFRequired(true);
            return;
          }
          if (energy && formData.typeOfEnergyPass.length == 0) {
            setFRequired(true);
            return;
          }
          setFRequired(false);
          handleUpdateList(uniqId);
        }}
      >
        {t("update listing")}
      </Button>
    </div>
  );
};