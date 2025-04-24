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
          {t("Commercial Type")}:<span style={{ color: "red" }}>*</span>
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
        <span>
          {t("Total Area")}(m<sup>2</sup>):
          <span style={{ color: "red" }}>*</span>
        </span>
        <Input
          className="mb-4 mt-1"
          placeholder={t("Total Area")}
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
          fullwidth="true"
        />
      </Label>
    </div>
  );
};

export default BuildingTypeHouse;