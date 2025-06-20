import React from "react";
import { Select, Input, Label } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";

const BuildingTypeHouse = ({ formData, setForm }) => {

  console.log("formData", formData)
  const {
    numberOfFloors,
    numberOfRooms,
    numberOfBathrooms,
    numberOfBedrooms,
    usableArea,
    plotArea,
    numberOfGarages,
    numberOfParkingSpaces,
    typeOfParkingSpace,
    estatetype,
    leasablearea,
  } = formData;
  const { t } = useTranslation();

  return (
    <div>
      <Label className="mt-4">
        <span>
          {t("Estate Type")}:<span style={{ color: "red" }}>*</span>
        </span>
        <Select
          className="mb-4 mt-1"
          name="estatetype"
          value={estatetype}
          onChange={setForm}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          fullwidth="true"
        >
          <option value="">{t("Choose an option")}</option>
          <option value="04">{t("Anlage-/Investmentobjekte")}</option>
          <option value="04SIB">{t("Betreutes Wohnen (Invest.)")}</option>
          <option value="04GWB">{t("Bürogebäude (Invest.)")}</option>
          <option value="04W01">{t("Eigentumswohnung (Invest.)")}</option>
          <option value="04W02">{t("Einfamilienhaus (Invest.)")}</option>
          <option value="04HIE">{t("Einkaufszentrum (Invest.)")}</option>
          <option value="04HIF">{t("Fachmarktzentrum (Invest.)")}</option>
          <option value="04ZF">{t("Freizeitimmobilie (Invest.)")}</option>
          <option value="04GA">{t("Gaststätte / Gasthaus (Invest.)")}</option>
          <option value="04GWG">
            {t("Geschäftshaus, Handel, Büro (Invest.)")}
          </option>
          <option value="04GWA">{t("Gewerbeanwesen (Invest.)")}</option>
          <option value="04GWE">{t("Gewerbeeinheit (Invest.)")}</option>
          <option value="04GWH">{t("Halle/Lager (Invest.)")}</option>
          <option value="04HI">{t("Handelsimmobilien (Invest.)")}</option>
          <option value="04GAH">{t("Hotel (Invest.)")}</option>
          <option value="04GW">
            {t("Industrie- und Gewerbeimmobilien (Invest.)")}
          </option>
          <option value="04GWI">{t("Industrieanwesen (Invest.)")}</option>
          <option value="04HIK">{t("Kaufhaus (Invest.)")}</option>
          <option value="04SIK">{t("Klinik (Invest.)")}</option>
          <option value="04HIL">{t("Laden/Verkaufsfläche (Invest.)")}</option>
          <option value="04W03">{t("Mehrfamilienhaus (Invest.)")}</option>
          <option value="04ZP">{t("Parkhaus (Invest.)")}</option>
          <option value="04SIP">{t("Pflegeheim (Invest.)")}</option>
          <option value="04GWS">{t("Servicecenter (Invest.)")}</option>
          <option value="04Z">{t("Sonstiges (Invest.)")}</option>
          <option value="04SI">{t("Sozialimmobilien (Invest.)")}</option>
          <option value="04HIS">{t("Supermarkt (Invest.)")}</option>
          <option value="04W05">{t("Wohn-/Geschäftshaus (Invest.)")}</option>
          <option value="04W04">{t("Wohnanlage (Invest.)")}</option>
          <option value="04W">{t("Wohnimmobilien (Invest.)")}</option>
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
            <Input
              type="checkbox"
              name="monumentProtection"
              onChange={setForm}
            />
            <span className="ml-2">{t("Monument Protection")}</span>
          </div>
        </div>
      </Label>
      <Label className="mt-4">
        <span>
          {t("Leasable Area")}:<span style={{ color: "red" }}>*</span>
        </span>
        <Input
          className="mb-4 mt-1"
          placeholder={t("Enter Leasable Area")}
          name="leasablearea"
          value={leasablearea}
          onChange={setForm}
          margin="normal"
          type="text"
          variant="outlined"
          autoComplete="off"
          fullwidth="true"
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
          fullwidth="true"
        />
      </Label>
      <Label className="mt-4">
        <span>{t("Number of Rooms")}:</span>
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
          fullwidth="true"
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
          fullwidth="true"
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
          fullwidth="true"
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
          fullwidth="true"
        />
      </Label>
      <Label className="mt-4">
        <span>
          {t("Plot Area")} (m<sup>2</sup>):
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
          fullwidth="true"
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
          fullwidth="true"
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
          fullwidth="true"
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
        <span>{t("Anzahl der Stellplätze:")}:</span>
        <Input
          className="mb-4 mt-1"
          label="Number Of Parking Spaces"
          placeholder={t("Anzahl der Stellplätze...")}
          name="numberOfParkingSpaces"
          value={numberOfParkingSpaces}
          onChange={setForm}
          margin="normal"
          type="number"
          variant="outlined"
          autoComplete="off"
          fullwidth="true"
        />
      </Label>
    </div>
  );
};

export default BuildingTypeHouse;