import React from "react";
import { Input, Label, Select } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";

const BuildingTypeFlat = ({ formData, setForm }) => {
  const {
    floor,
    numberOfRooms,
    monthlyHousepayment,
    numberOfBathrooms,
    numberOfBedrooms,
    parkingSpacePrice,
    specificBuildingType,
    livingArea,
    typeOfParkingSpace,
    numberOfParkingSpaces,
  } = formData;

  const { t } = useTranslation();

  return (
    <div>
      <Label className="mt-4">
        <span>
          {t("Spezifischer Gebäudetyp")}:<span style={{ color: "red" }}>*</span>
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
          fullwidth="true"
        >
          <option value="">{t("Wählen Sie eine Option")}</option>
          <option value="01ETAG">{t("Stockwerk")}</option>
          <option value="01SOUT">{t("Keller")}</option>
          <option value="01GERD">{t("Erdgeschoss")}</option>
          <option value="01DACH">{t("Dachgeschoss")}</option>
          <option value="01PENT">{t("Penthouse")}</option>
          <option value="01MAIS">{t("Maisonette")}</option>
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
        <span>
          {t("Wohnfläche")} (m<sup>2</sup>):
          <span style={{ color: "red" }}>*</span>
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
          fullwidth="true"
        />
      </Label>
      <Label className="mt-4">
        <span>
          {t("Anzahl der Zimmer")}:<span style={{ color: "red" }}>*</span>
        </span>
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
        <span>{t("Stockwerk")}:</span>
        <Input
          className="mb-4 mt-1"
          label="Floor"
          placeholder={t("Stockwerk...")}
          name="floor"
          value={floor}
          onChange={setForm}
          margin="normal"
          type="number"
          variant="outlined"
          autoComplete="off"
          fullwidth="true"
        />
      </Label>
      <Label className="mt-4">
        <span>{t("Monatliche Hauszahlung")}:</span>
        <Input
          className="mb-4 mt-1"
          label="Monthly Housepayment"
          placeholder={t("Monatliche Hauszahlung...")}
          name="monthlyHousepayment"
          value={monthlyHousepayment}
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
        <span>{t("Anzahl der Stellplätze")}:</span>
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
      <Label className="mt-4">
        <span>{t("Parkplatzpreis")}:</span>
        <Input
          className="mb-4 mt-1"
          label="Parking Space Price"
          placeholder={t("Parkplatzpreis...")}
          name="parkingSpacePrice"
          value={parkingSpacePrice}
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

export default BuildingTypeFlat;