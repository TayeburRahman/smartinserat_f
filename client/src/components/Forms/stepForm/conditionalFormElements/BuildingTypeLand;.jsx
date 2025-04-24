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
          <option value="">{t("Choose an option")}</option>
          <option value="0">{t("Building Land")}</option>
          <option value="1">{t("Acre Land")}</option>
          <option value="2">{t("Forrest")}</option>
        </Select>
      </Label>
      <Label className="mt-4">
        <span>
          {t("Plot Area")} (m<sup>2</sup>):
          <span style={{ color: "red" }}>*</span>
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
        <span>{t("State of Development")}:</span>
        <Select
          className="mb-4 mt-1"
          label="Sate of Development"
          placeholder={t("State of Development...")}
          name="stateOfDevelopment"
          value={stateOfDevelopment}
          onChange={setForm}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          fullwidth="true"
        >
          <option value="">{t("Choose an option")}</option>
          <option value="NE">{t("Not developed")}</option>
          <option value="TE">{t("Partially developed")}</option>
          <option value="VE">{t("Fully developed")}</option>
        </Select>
      </Label>
    </div>
  );
};

export default BuildingTypeLand;