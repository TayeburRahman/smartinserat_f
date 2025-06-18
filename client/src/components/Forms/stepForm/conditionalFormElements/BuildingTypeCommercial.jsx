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
    totalarea,
  } = formData;
  const { t } = useTranslation();

  return (
    <div>
      <Label className="mt-4">
        <span>
          {t("Gewerblicher Typ")}:<span style={{ color: "red" }}>*</span>
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
          <option value="">{t("Wähle eine Option")}</option>
          <option value="05A">{t("Ausstellungsfläche")}</option>
          <option value="05E1">{t("Einkaufszentrum")}</option>
          <option value="05">{t("Einzelhandelsfläche")}</option>
          <option value="05E2">{t("Kaufhaus")}</option>
          <option value="05K">{t("Kiosk")}</option>
          <option value="05L">{t("Laden")}</option>
          <option value="05E">{t("SB-Markt")}</option>
          <option value="05LV">{t("Verkaufsfläche")}</option>
          <option value="05F">{t("Verkaufshalle")}</option>
          <option value="08B">{t("Bar")}</option>
          <option value="08C">{t("Café")}</option>
          <option value="08D">{t("Diskothek")}</option>
          <option value="08F">{t("Ferienimmobilie")}</option>
          <option value="08GAHS">{t("Gästehaus")}</option>
          <option value="08GAE">{t("Gaststätte")}</option>
          <option value="08HOT">{t("Hotel")}</option>
          <option value="08PENS">{t("Pension")}</option>
          <option value="08REST">{t("Restaurant")}</option>
          <option value="07H">{t("Halle")}</option>
          <option value="07LKÜ">{t("Kühlhaus")}</option>
          <option value="07L">{t("Lagerfläche")}</option>
          <option value="07LH">{t("Lagerhalle")}</option>
          <option value="07HI">{t("Produktionsfläche")}</option>
          <option value="07W">{t("Werkstattfläche")}</option>
          <option value="06A">{t("Atelier")}</option>
          <option value="06BUGE">{t("Büro- / Geschäftsgebäude")}</option>
          <option value="06BE">{t("Büroetage")}</option>
          <option value="06B">{t("Bürofläche")}</option>
          <option value="06">{t("Gewerbefläche")}</option>
          <option value="06G">{t("Gewerbezentrum")}</option>
          <option value="06P">{t("Praxis")}</option>
          <option value="06WOGE">{t("Wohn- / Geschäftsgebäude")}</option>
        </Select>
      </Label>
      <Label radio>
        <span>{t("Besondere Merkmale")}: </span>
        <div className="block md:flex ml-3">
          <div className="block md:flex items-center">
            <Input type="checkbox" name="newBuilding" onChange={setForm} />
            <span className="ml-2 mr-3">{t("Neubau")}</span>
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
        <span>{t("Anzahl der Stockwerke")}:</span>
        <Input
          className="mb-4 mt-1"
          label="Number Of Floors"
          placeholder={t("Anzahl der Stockwerke..")}
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
        <span>
          {t("Gesamtfläche")}(m<sup>2</sup>):
          <span style={{ color: "red" }}>*</span>
        </span>
        <Input
          className="mb-4 mt-1"
          placeholder={t("Gesamtfläche")}
          name="totalarea"
          value={totalarea}
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