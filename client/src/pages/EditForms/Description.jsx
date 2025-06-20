import React, { useContext, useEffect, useState } from "react";
import { Label, Textarea } from "@windmill/react-ui";
import { Button } from "@windmill/react-ui";
import {   useNavigate } from "react-router-dom";
import { useForm } from "react-hooks-helper";
import defaultData from "./DefaultData";
import { userListService } from "../../services";
import { useTranslation } from "react-i18next";
import { flowFactService } from "../../services/flowfact.service";
import { LimitedTextarea } from "../../components/Forms/stepForm/LimitedText";
import { SnackbarContext } from "../../context/SnackbarContext";
export const Description = ({ data }) => {
  const history = useNavigate();
  const { _id: uniqId } = data;
  const { t } = useTranslation();
  Object.assign(defaultData, data);
  const [formData, setForm] = useForm(defaultData);
  const { openSnackbar, closeSnackbar } = useContext(SnackbarContext);
  const [enabled, setEnabled] = useState(true);
  useEffect(() => {
    if (enabled) {
      closeSnackbar();
    } else {
      openSnackbar(t("Updating Please Wait..."));
    }
  }, [enabled, openSnackbar, closeSnackbar]);
  const allDescription = [
    {value: formData.description, text: 'description'},
    {value: formData.features, text: 'features'},
    {value: formData.location, text: 'location'},
    {value: formData.additionalDescription, text: 'additionalDescription'} ];

  const handleUpdateList = async (uniqId) => {
    setEnabled(false)
    await flowFactService.updateFlowFactListDetails(formData);
    await userListService
      .updateUserListDetails(uniqId, formData)
      .then(async (res) => {
        setEnabled(true)
        history("/app");
        history("/app/userLists");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container mx-auto px-4">
      {allDescription.map((a,i) => (
        <Label className="mt-4" key={i}>
          <span>{t(a.text)}</span>
          <LimitedTextarea
            rows="3"
            limit={3800}
            setForm={setForm}
            value={a.value}
            name={a.text}
            t={t}
            />
        </Label>
      ))}

      <div style={{ marginTop: "1rem" }}>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          style={{ marginTop: "1rem" }}
          onClick={() => handleUpdateList(uniqId)}
        >
          {t("update listing")}
        </Button>
      </div>
    </div>
  );
};