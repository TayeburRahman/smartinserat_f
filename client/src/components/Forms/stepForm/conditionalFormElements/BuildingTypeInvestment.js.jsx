import React from "react";
import { Select, Input, Label } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";

const BuildingTypeHouse = ({ formData, setForm }) => {
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
          {t("Immobilientyp")}:<span style={{ color: "red" }}>*</span>
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
          <option value="">{t("Wählen Sie eine Option")}</option>
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
        <span>{t("Besondere Merkmale")}: </span>
        <div className="block md:flex ml-3">
          <div className="block md:flex items-center">
            <Input type="checkbox" name="newBuilding" onChange={setForm} />
            <span className="ml-2 mr-3">{t("NNeubau")}</span>
          </div>
          <div className="block md:flex items-center">
            <Input
              type="checkbox"
              name="monumentProtection"
              onChange={setForm}
            />
            <span className="ml-2">{t("Denkmalschutz")}</span>
          </div>
        </div>
      </Label>
      <Label className="mt-4">
        <span>
          {t("Vermietbare Fläche")}:<span style={{ color: "red" }}>*</span>
        </span>
        <Input
          className="mb-4 mt-1"
          placeholder={t("Geben Sie die vermietbare Fläche ein")}
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
        <span>{t("Anzahl der Stockwerke")}:</span>
        <Input
          className="mb-4 mt-1"
          label="Number Of Floors"
          placeholder={t("Anzahl der Stockwerke...")}
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
        <span>{t("Anzahl der Zimmer")}:</span>
        <Input
          className="mb-4 mt-1"
          label="Number Of Rooms"
          placeholder={t("Anzahl der Zimmer...")}
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
        <span>{t("Anzahl der Schlafzimmer")}:</span>
        <Input
          className="mb-4 mt-1"
          label="Number Of Bedrooms"
          placeholder={t("Anzahl der Schlafzimmer...")}
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
        <span>{t("Anzahl der Badezimmer")}:</span>
        <Input
          className="mb-4 mt-1"
          label="Number Of Bathrooms"
          placeholder={t("Anzahl der Badezimmer...")}
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
          fullwidth="true"
        />
      </Label>
      <Label className="mt-4">
        <span>
          {t("Grundstücksfläche")} (m<sup>2</sup>):
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
          fullwidth="true"
        />
      </Label>
      <Label className="mt-4">
        <span>{t("Anzahl der Garagen")}:</span>
        <Input
          className="mb-4 mt-1"
          label="Number Of Garages"
          placeholder={t("Anzahl der Garagen...")}
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
          fullwidth="true"
          readOnly={true}
        >
          <option value="">{t("Wählen Sie eine Option")}</option>
          <option value="3">{t("Parkplatz im Freien")}</option>
          <option value="4">{t("Carport")}</option>
          <option value="2">{t("Garage")}</option>
          <option value="1">{t("Nicht angegeben")}</option>
          <option value="6">{t("Parkhaus")}</option>
          <option value="7">{t("Tiefgarage")}</option> 
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