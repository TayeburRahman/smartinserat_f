import React, { useContext, useEffect, useState } from "react";
import { Input, Label } from '@windmill/react-ui'
import { Button } from '@windmill/react-ui'
import defaultData from "./DefaultData";
import { useForm } from "react-hooks-helper";
import { userListService } from "../../services";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import { flowFactService } from "../../services/flowfact.service";
import { SnackbarContext } from "../../context/SnackbarContext";
export const Address = ({ data,fRequired, setFRequired}) => {
  const history = useNavigate() 
  const { 
    _id: uniqId
    } = data;
  const { t } = useTranslation();
  const { openSnackbar, closeSnackbar } = useContext(SnackbarContext);
  const [enabled, setEnabled] = useState(true);
  useEffect(() => {
    if (enabled) {
      closeSnackbar();
    } else {
      openSnackbar(t("Updating Please Wait..."));
    }
  }, [enabled, openSnackbar, closeSnackbar]);
  Object.assign(defaultData, data)
   const [formData, setForm] = useForm(defaultData);
  
   const handleUpdateList = async (uniqId)=>{
     try{
       setEnabled(false)
    //    await flowFactService.updateFlowFactListDetails(formData);
       await userListService.updateUserListDetails(uniqId, formData);
       setEnabled(true)
       history('/app');
       history('/app/userLists');
     }catch(er){
       console.log(er);
     }
    }
  return (
    <div className="container mx-auto px-4">
      <Label className="mt-4">
        <span>{t("street and number")}</span>
        <span style={{color: "red"}}>*</span>
          <Input
            label="Address"
            name="address"
            value={formData.address}
            onChange={setForm}
            placeholder={t("enter street and number")}
            margin="normal"
            variant="outlined"
            autoComplete="off"
            className="mt-1"
            fullwidth='true'
            type="text"
          />
      </Label>
      <div className="flex gap-4 mb-4">
      <Label className="mt-4 w-2/5">
        <span>{t("zip")}:</span>
        <span style={{color: "red"}}>*</span>
          <Input
            label="Zip"
            name="zip"
            type="number"
            placeholder={t("enter zip code")}
            value={formData.zip}
            onChange={setForm}
            margin="normal"
            variant="outlined"
            autoComplete="off"
            className="w-25 mt-1"
          />
      </Label>
      <Label className="mt-4 w-3/5">
        <span>{t("city")}:</span>
        <span style={{color: "red"}}>*</span>
          <Input
            label="City"
            name="city"
            value={formData.city}
            placeholder={t("enter city")}
            onChange={setForm}
            margin="normal"
            variant="outlined"
            autoComplete="off"
            className="mt-1"
          />
      </Label>
      </div>
      <div>
          <Input
            className="mr-2"
            type="checkbox"
            name="hideAddress"
            onChange={setForm}
            value={formData.hideAddress}
            checked={formData.hideAddress}
          />
          <span className="text-sm">{t("hide address")}</span>
      </div>
      <div style={{ marginTop: "1rem" }}>
      {fRequired && <div style={{color: "red"}}>{t("Please fill in the required fields *")}</div>}
      <Button
        variant="contained"
        fullwidth='true'
        color="primary"
        style={{ marginTop: "1rem" }}
        onClick={()=>{
          if(formData.city.length === 0 || formData.zip.length === 0 || formData.address.length === 0){
            setFRequired(true);
            return;
          }
          setFRequired(false);
          handleUpdateList(uniqId)}
        }
      >
        {t("update listing")}
      </Button>
      </div>
      </div>
  );
};