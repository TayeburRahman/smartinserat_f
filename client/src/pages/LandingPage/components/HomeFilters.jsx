import { Button, Label, Select, Input } from "@windmill/react-ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, createSearchParams } from "react-router-dom";

const HomeFilters = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [adType, setAdType] = useState("");
  const [buildingType, setBuildingType] = useState("");
  const [location, setLocation] = useState("");

  const handleFilterSubmit = () => {
    const params  = {
      adType,
      buildingType,
      location,
    };

    Object.keys(params).forEach((key) => {
      if (!params[key]) delete params[key]; // remove empty
    });

    navigate({
      pathname: "/ads",
      search: `?${createSearchParams(params)}`,
    });
  };

  return (
    <div className="z-10 absolute -bottom-12 hidden sm:flex w-full">
      <div className="max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto flex flex-row justify-between items-center gap-5 bg-white rounded-md w-full px-5 py-5 shadow-lg">
        <span className="bg-green-300 text-green-800 px-4 py-1 rounded-full text-sm font-semibold">
           Online
        </span>
        <div className="flex flex-row gap-5 items-center justify-between">
          <Label>
            <span className="text-sm font-semibold">{t("Art der Anzeige")}</span>
            <Select className="mt-1" value={adType} onChange={(e) => setAdType(e.target.value)}>
              <option value="">{t("Hier auswählen")}</option>
              <option value="sale">{t("Verkauf")}</option>
              <option value="rent">{t("Vermietung")}</option>
            </Select>
          </Label>

          <Label>
            <span className="text-sm font-semibold">{t("Immobilienart")}</span>
            <Select className="mt-1" value={buildingType} onChange={(e) => setBuildingType(e.target.value)}>
              <option value="">{t("Hier auswählen")}</option>
              <option value="APARTMENT">{t("Wohnung")}</option>
              <option value="SPECIAL_PURPOSE">{t("Land")}</option>
              <option value="TRADE_SITE">{t("Gewerblich")}</option>
              <option value="INVESTMENT">{t("Investition")}</option>
              <option value="HOUSE">{t("Haus")}</option>
            </Select>
          </Label>

          <Label>
            <span className="text-sm font-semibold">{t("Ort")}</span>
            <Input
              className="w-full text-black"
              type="text"
              placeholder={t("Ort")}
              size="small"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Label>
        </div>

        <Button className="mt-5" onClick={handleFilterSubmit}>
          {t("Suchen")}
        </Button>
      </div>
    </div>
  );
};

export default HomeFilters;
