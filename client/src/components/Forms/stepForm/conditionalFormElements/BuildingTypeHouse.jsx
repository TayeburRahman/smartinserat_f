import React from "react";
import { Select, Input, Label } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";

const BuildingTypeHouse = ({ formData, setForm }) => {
  const {
    numberOfFloors,
    numberOfRooms,
    specificBuildingType,
    numberOfBathrooms,
    numberOfBedrooms,
    usableArea,
    plotArea,
    numberOfGarages,
    numberOfParkingSpaces,
    livingArea,
    typeOfParkingSpace
  } = formData;
  const { t } = useTranslation();

  return (
    <div>
      <Label className="mt-4">
        <span>
          {t("Specific House Type")}:
          <span style={{color: "red"}}>*</span>
        </span>
        <Select
          className="mb-4 mt-1"
          label="Specific Building Type"
          name="specificBuildingType"
          value={specificBuildingType}
          onChange={setForm}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          fullwidth='true'
        >
          <option value="">{t("Choose an option")}</option>
          <option value="02EFH">{t("Detached House")}</option>
          <option value="02DHH">{t("Semi Detached House")}</option>
          <option value="02REH">{t("Town House")}</option>
          <option value="02MFH">{t("Multi Family House")}</option>
          <option value="02ZB">{t("Holiday House")}</option>
          <option value="02BNG">{t("Bungalow")}</option>
        </Select>
      </Label>
      <Label radio>
        <span>{t("Special Features")}: </span>
        <div className="block md:flex ml-3">
          <div className="block md:flex items-center">
          <Input type="checkbox" name="newBuilding" onChange={setForm} />
          <span className="ml-2 mr-3">{t("New Building")}</span>
          </div>
          <div className="block md:flex items-center">
          <Input type="checkbox" name="monumentProtection" onChange={setForm} />
          <span className="ml-2">{t("Monument Protection")}</span>
        </div>
        </div>
      </Label>
      <Label className="mt-4">
        <span>
          {t("Living Area")} (m<sup>2</sup>):
          <span style={{color: "red"}}>*</span>
        </span>
        <Input
          className="mb-4 mt-1"
          label="Living Area"
          placeholder={t("Living Area...")}
          name="livingArea"
          value={livingArea}
          onChange={setForm}
          margin="normal"
          type="number"
          variant="outlined"
          autoComplete="off"
          fullwidth='true'
        />
      </Label>
      <Label className="mt-4">
        <span>
          {t("Usable Area")} (m<sup>2</sup>):
        </span>
        <Input
          className="mb-4 mt-1"
          label="Usable Area"
          placeholder={t("Usable Area...")}
          name="usableArea"
          value={usableArea}
          onChange={setForm}
          margin="normal"
          type="number"
          variant="outlined"
          autoComplete="off"
          fullwidth='true'
        />
      </Label>
      <Label className="mt-4">
        <span>
          {t("Plot Area")} (m<sup>2</sup>):
          <span style={{color: "red"}}>*</span>
        </span>
        <Input
          className="mb-4 mt-1"
          label="Plot Area"
          placeholder={t("Plot Area...")}
          name="plotArea"
          value={plotArea}
          onChange={setForm}
          margin="normal"
          type="number"
          variant="outlined"
          autoComplete="off"
          fullwidth='true'
        />
      </Label>
      <Label className="mt-4">
        <span>{t("Number of Floors")}:</span>
        <Input
          className="mb-4 mt-1"
          label="Number Of Floors"
          placeholder={t("Number of Floors...")}
          name="numberOfFloors"
          value={numberOfFloors}
          onChange={setForm}
          margin="normal"
          type="number"
          variant="outlined"
          autoComplete="off"
          fullwidth='true'
        />
      </Label>
      <Label className="mt-4">
        <span>
          {t("Number of Rooms")}:
          <span style={{color: "red"}}>*</span>
        </span>
        <Input
          className="mb-4 mt-1"
          label="Number Of Rooms"
          placeholder={t("Number of Rooms...")}
          name="numberOfRooms"
          value={numberOfRooms}
          onChange={setForm}
          margin="normal"
          type="number"
          variant="outlined"
          autoComplete="off"
          fullwidth='true'
        />
      </Label>
      <Label className="mt-4">
        <span>{t("Number of Bedrooms")}:</span>
        <Input
          className="mb-4 mt-1"
          label="Number Of Bedrooms"
          placeholder={t("Number of Bedrooms...")}
          name="numberOfBedrooms"
          value={numberOfBedrooms}
          onChange={setForm}
          margin="normal"
          type="number"
          variant="outlined"
          autoComplete="off"
          fullwidth='true'
        />
      </Label>
      <Label className="mt-4">
        <span>{t("Number of Bathrooms")}:</span>
        <Input
          className="mb-4 mt-1"
          label="Number Of Bathrooms"
          placeholder={t("Number of Bathrooms...")}
          name="numberOfBathrooms"
          value={numberOfBathrooms}
          onChange={setForm}
          margin="normal"
          type="number"
          variant="outlined"
          autoComplete="off"
          fullwidth='true'
        />
      </Label>
      <Label className="mt-4">
        <span>{t("Number of Garages")}:</span>
        <Input
          className="mb-4 mt-1"
          label="Number Of Garages"
          placeholder={t("Number of Garages...")}
          name="numberOfGarages"
          value={numberOfGarages}
          onChange={setForm}
          margin="normal"
          type="number"
          variant="outlined"
          autoComplete="off"
          fullwidth='true'
        />
      </Label>
      <Label className="mt-4">
          <span>{t("Type of Parking Space")}:</span>
          <Select
          className="mb-4 mt-1"
          label="Type of Parking Space"
          name="typeOfParkingSpace"
          value={typeOfParkingSpace}
          onChange={setForm}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          fullwidth='true'
          readOnly={true}
          > 
            <option value="">{t("Choose an option")}</option>
            <option value="3">{t("outdoor parking space")}</option>
            <option value="4">{t("Carport")}</option>
            <option value="2">{t("Garage")}</option>
            <option value="1">{t("Not specified")}</option>
            <option value="6">{t("parking garage")}</option>
            <option value="7">{t("underground car park")}</option>
          </Select>
      </Label>
      <Label className="mt-4">
        <span>{t("Number of Parking Spaces")}:</span>
        <Input
          className="mb-4 mt-1"
          label="Number Of Parking Spaces"
          placeholder={t("Number of Parking Spaces...")}
          name="numberOfParkingSpaces"
          value={numberOfParkingSpaces}
          onChange={setForm}
          margin="normal"
          type="number"
          variant="outlined"
          autoComplete="off"
          fullwidth='true'
        />
      </Label>
    </div>
  );
};

export default BuildingTypeHouse;