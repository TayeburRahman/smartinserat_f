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
          {t("Haustyp")}:
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
          <option value="">{t("Wähl eine Option")}</option>
          <option value="02EFH">{t("Einfamilienhaus")}</option>
          <option value="02DHH">{t("Doppelhaushälfte")}</option>
          <option value="02REH">{t("Reihenhaus")}</option>
          <option value="02MFH">{t("Mehrfamilienhaus")}</option>
          <option value="02ZB">{t("Ferienhaus")}</option>
          <option value="02BNG">{t("Bungalow")}</option>
        </Select>
      </Label>
      <Label radio>
        <span>{t("Besonderheiten")}: </span>
        <div className="block md:flex ml-3">
          <div className="block md:flex items-center">
          <Input type="checkbox" name="newBuilding" onChange={setForm} />
          <span className="ml-2 mr-3">{t("Neubau")}</span>
          </div>
          <div className="block md:flex items-center">
          <Input type="checkbox" name="monumentProtection" onChange={setForm} />
          <span className="ml-2">{t("Denkmalschutz")}</span>
        </div>
        </div>
      </Label>
      <Label className="mt-4">
        <span>
          {t("Wohnfläche")} (m<sup>2</sup>):
          <span style={{color: "red"}}>*</span>
        </span>
        <Input
          className="mb-4 mt-1"
          label="Living Area"
          placeholder={t("Wohnfläche...")}
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
          {t("Nutzfläche")} (m<sup>2</sup>):
        </span>
        <Input
          className="mb-4 mt-1"
          label="Usable Area"
          placeholder={t("Nutzfläche...")}
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
          {t("Grundstücksfläche")} (m<sup>2</sup>):
          <span style={{color: "red"}}>*</span>
        </span>
        <Input
          className="mb-4 mt-1"
          label="Plot Area"
          placeholder={t("Grundstücksfläche...")}
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
        <span>{t("Etagenanzahl")}:</span>
        <Input
          className="mb-4 mt-1"
          label="Number Of Floors"
          placeholder={t("Etagenanzahl...")}
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
          {t("Zimme")}:
          <span style={{color: "red"}}>*</span>
        </span>
        <Input
          className="mb-4 mt-1"
          label="Number Of Rooms"
          placeholder={t("Zimme...")}
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
        <span>{t("Anzahl Schlafzimmer")}:</span>
        <Input
          className="mb-4 mt-1"
          label="Number Of Bedrooms"
          placeholder={t("Anzahl Schlafzimmer...")}
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
        <span>{t("Anzahl Bäder")}:</span>
        <Input
          className="mb-4 mt-1"
          label="Number Of Bathrooms"
          placeholder={t("Anzahl Bäder...")}
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
        <span>{t("Anzahl Garagen")}:</span>
        <Input
          className="mb-4 mt-1"
          label="Number Of Garages"
          placeholder={t("Anzahl Garagen...")}
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
          <span>{t("Art des Parkplatzes")}:</span>
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
            <option value="">{t("Wähl eine Option")}</option>
            <option value="3">{t("Außenstellplatz")}</option>
            <option value="4">{t("Carport")}</option>
            <option value="2">{t("Garage")}</option>
            <option value="1">{t("Nicht angegeben")}</option>
            <option value="6">{t("Parkhaus")}</option>
            <option value="7">{t("Tiefgarage")}</option>
          </Select>
      </Label>
      <Label className="mt-4">
        <span>{t("Anzahl der Parkplätze")}:</span>
        <Input
          className="mb-4 mt-1"
          label="Number Of Parking Spaces"
          placeholder={t("Anzahl der Parkplätze...")}
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