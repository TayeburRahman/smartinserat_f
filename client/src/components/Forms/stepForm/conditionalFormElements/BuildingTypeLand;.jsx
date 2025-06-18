import React from "react";
import { Input, Label, Select } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";

const BuildingTypeLand = ({ formData, setForm }) => {
  const { plotArea, stateOfDevelopment, specificBuildingType } = formData;
  const { t } = useTranslation();

  return (
    <div>
      <Label className="mt-4">
        <span>
          {t("Specific Land Type")} :<span style={{ color: "red" }}>*</span>
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
          <option value="">{t("Wähle eine Option")}</option>
          <option value="0">{t("Bauland")}</option>
          <option value="1">{t("Land in Acres")}</option>
          <option value="2">{t("Forstland")}</option>
        </Select>
      </Label>
      <Label className="mt-4">
        <span>
          {t("Grundstücksfläche")} (m<sup>2</sup>):
          <span style={{ color: "red" }}>*</span>
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
        <span>{t("Erschließungszustand")}:</span>
        <Select
          className="mb-4 mt-1"
          label="Sate of Development"
          placeholder={t("Erschließungszustand...")}
          name="stateOfDevelopment"
          value={stateOfDevelopment}
          onChange={setForm}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          fullwidth="true"
        >
          <option value="">{t("Wählen Sie eine Option")}</option>
          <option value="NE">{t("Nicht erschlossen")}</option>
          <option value="TE">{t("Teilweise erschlossen")}</option>
          <option value="VE">{t("Voll erschlossen")}</option>
        </Select>
      </Label>
    </div>
  );
};

export default BuildingTypeLand;