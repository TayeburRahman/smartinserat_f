// import React, { useContext, useEffect, useState } from "react";
// import { Input, Label } from "@windmill/react-ui";
// import { Button } from "@windmill/react-ui";
// import { useNavigate } from "react-router-dom";
// import defaultData from "./DefaultData";
// import { useForm } from "react-hooks-helper";
// import { userListService } from "../../services/index";
// import { useTranslation } from "react-i18next";
// // import { flowFactService } from "../../services/flowfact.service";
// import { SnackbarContext } from "../../context/SnackbarContext";
// import 'react-phone-number-input/style.css';
// import PhoneInput, { isValidPhoneNumber }  from 'react-phone-number-input';
// export const Contact = ({ data, fRequired, setFRequired }) => {
//   const history = useNavigate();
//   const { uniqId } = data;
//   const [phoneNumber, setPhone] = useState(data.phone);
//   const { t } = useTranslation();
//   Object.assign(defaultData, data);
//   const [formData, setForm] = useForm(defaultData);
//   const { openSnackbar, closeSnackbar } = useContext(SnackbarContext);
//   const [enabled, setEnabled] = useState(true);
//   useEffect(() => {
//     if (enabled) {
//       closeSnackbar();
//     } else {
//       openSnackbar(t("Updating Please Wait..."));
//     }
//   }, [enabled, openSnackbar, closeSnackbar]);
//   const handleUpdateList = async (uniqId) => {
//     setEnabled(false)
//     // await flowFactService.updateFlowFactContact(Object.assign(formData, { phoneNumber }));
//     await userListService
//       .updateUserListDetails(uniqId, Object.assign(formData, { phone: phoneNumber?.length > 8 ? phoneNumber : "" }) )
//       .then(async (res) => {
//         setEnabled(true)
//         history.push("/app");
//         history.replace("/app/userLists");
//       })
//       .catch((err) => console.log(err));
//   };
  
//   return (
//     <div className="container mx-auto px-4">
//       <Label className="mt-4">
//         <span>{t("contact name")}</span>
//         <span style={{color: "red"}}>*</span>
//         <div>
//           <Input
//             className="w-1/2 mb-4 mt-1"
//             placeholder={t("enter first name")}
//             name="contactName"
//             value={formData.contactName}
//             onChange={setForm}
//             margin="normal"
//             variant="outlined"
//             autoComplete="off"
//             type="text"
//             fullwidth='false'
//           />
//            <Input
//             className="w-1/2 mb-4 mt-1"
//             placeholder={t("enter last name")}
//             name="lastName"
//             value={formData.lastName}
//             onChange={setForm}
//             margin="normal"
//             variant="outlined"
//             autoComplete="off"
//             type="text"
//             fullwidth='false'
//           />
//         </div>
//         <div>
//           <Input
//             className="mr-2"
//             type="checkbox"
//             name="nameHide"
//             value={formData.nameHide}
//             onChange={setForm}
//           />
//           <span>{t("hide name")}</span>
//         </div>
//       </Label>
//       <Label className="mt-4">
//         <span>{t("e-mail")}</span>
//         <span style={{color: "red"}}>*</span>
//         <div>
//           <Input
//             className="mb-4 mt-1"
//             label="E-Mail"
//             name="formEmail"
//             value={formData.formEmail}
//             onChange={setForm}
//             margin="normal"
//             variant="outlined"
//             autoComplete="off"
//             placeholder={t("enter e-mail")}
//             fullwidth='true'
//             type="email"
//           />
//         </div>
//       </Label>
//       <Label className="mt-4">
//         <span>{t("phone number")}</span>
//         <span>{" : "}</span>
//         { fRequired && <span style={{color: "red"}}>{t("Please Provide A Valid Phone Number!")}</span> }
//         <div>
//           <PhoneInput
//             className="mb-4 mt-1"
//             label="Phone Number"
//             margin="normal"
//             variant="outlined"
//             autoComplete="off"
//             fullwidth='true'
//             name="phone"
//             international
//             countryCallingCodeEditable={false}
//             defaultCountry="DE"
//             value={phoneNumber}
//             onChange={setPhone}
//           />
//         </div>
//       </Label>
//       {fRequired && <div style={{color: "red"}}>{t("Please fill in the required fields *")}</div>}
//       <div style={{ marginTop: "1rem" }}>
//         <Button
//           variant="contained"
//           fullWidth
//           color="primary"
//           style={{ marginTop: "1rem" }}
//           // onClick={() => handleUpdateList(uniqId)}
//           onClick={() => {
//             if(formData.contactName.length === 0 || formData.formEmail.length === 0){
//               setFRequired(true);
//               return;
//             }
//             if(phoneNumber && phoneNumber.length >= 4 && !isValidPhoneNumber(phoneNumber)){
//               setFRequired(true);
//               return;
//             }
//             setFRequired(false);
//             handleUpdateList(uniqId)
//           }}
//         >
//           {t("update listing")}
//         </Button>
//       </div>
//     </div>
//   );
// };