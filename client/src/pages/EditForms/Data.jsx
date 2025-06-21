// import React, { useContext, useEffect, useState } from "react";
// import { Input, Label, Select, Button } from "@windmill/react-ui";
// import { userListService } from "../../services";
// import { useForm } from "react-hooks-helper";
// import defaultData from "./DefaultData";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { EuroIcon } from "./../../icons";
// import { LimitedInput } from "./../../components/Forms/stepForm/LimitedText";
// // import { flowFactService } from "../../services/flowfact.service";
// import { SnackbarContext } from "../../context/SnackbarContext";
// export const Data = ({ data, fRequired, setFRequired }) => {
//   const history = useNavigate();
//   const { _id: uniqId } = data;
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
//   function numberWithCommas(x) {
//     x = String(x).replace(/\./g, "");
//     x = String(x).replace(/\./g, "");
//     var parts = x.toString().split(".");
//     parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
//     return parts.join(",");
//     }
//   const handleUpdateList = async (uniqId) => {
//     setEnabled(false)
//     // await flowFactService.updateFlowFactListDetails(formData);
//     let data = formData;
//     data.listingPrice = data.listingPrice?.replace(/\./g, "");
//     data.rentPrice = data.rentPrice?.replace(/\./g, "");
//     await userListService
//       .updateUserListDetails(uniqId, data)
//       .then(async (res) => {
//         setEnabled(true)
//         history("/app");
//         history("/app/userLists");
//       })
//       .catch((err) => console.log(err));
//   };
//   return (
//     <div className="container mx-auto px-4">
//       <Label className="mt-4">
//         <span>{t("listing title")}:</span>
//         <span style={{color: "red"}}>*</span>
//         <LimitedInput
//         limit={100}
//         setForm={setForm}
//         value={formData.listingTitle}
//         name="listingTitle"
//         t={t}
//         />
//       </Label>
//       <Label className="lg:flex">
//         <span>{t("listing type")}:</span>
//         <div className="ml-3 mt-3 sm:mt-0 sm:block">
//           <Input
//             readOnly={true}
//             type="radio"
//             value="For Sale"
//             checked={formData.listingType === "For Sale"}
//             disabled
//             name="listingType"
//           />
//           <span className="ml-2">{t("for sale")}</span>
//           <Input
//             readOnly={true}
//             className="ml-2"
//             type="radio"
//             value="For Rent"
//             checked={formData.listingType === "For Rent"}
//             disabled
//             name="listingType"
//           />
//           <span className="ml-2">{t("for rent")}</span>
//         </div>
//       </Label>
//       <Label className="mt-4">
//         <span>{t("building type")}:</span>
//         <Select
//           className="mb-4 mt-1"
//           label="Building Type"
//           name="buildingType"
//           value={formData.buildingType}
//           margin="normal"
//           variant="outlined"
//           autoComplete="off"
//           fullwidth='true'
//           disabled
//         >
//           <option value="House">{t("house")}</option>
//           <option value="Flat">{t("flat")}</option>
//           <option value="Land">{t("land")}</option>
//           <option value="Commercial">{t("commercial")}</option>
//           <option value="Investment">{t("investment")}</option>
//         </Select>
//       </Label>
//       {formData.listingType === "For Sale" && (
//         <Label className="mt-4">
//           <span>{t("listing price")}:</span>
//           <span style={{color: "red"}}>*</span>
//           <div className="relative w-full focus-within:text-green-400">
//             <div className="absolute inset-y-0 right-0 flex items-center pr-3">
//               <EuroIcon className="w-4 h-4" aria-hidden="true" />
//             </div>
//             <Input
//               className="mb-4 mt-1 focus-within:text-gray-700"
//               label="Listing Price"
//               placeholder={t("enter the price")}
//               inputMode="numeric"
//               name="listingPrice"
//               value={numberWithCommas(formData.listingPrice)}
//               onChange={setForm}
//               onKeyDown={(e)=> !/^\d+$/.test(e.key) && e.key !== 'Backspace' ? e.preventDefault() : true }
//               margin="normal"
//               type="text"
//               variant="outlined"
//               autoComplete="off"
//               fullwidth='true'
//             />
//           </div>
//         </Label>
//       )}
//       {formData.listingType === "For Rent" && (
//         <Label className="mt-4">
//           <span>{t("rent price")}</span>
//           <span style={{color: "red"}}>*</span>
//           <div className="relative w-full focus-within:text-green-400">
//             <div className="absolute inset-y-0 right-0 flex items-center pr-3">
//               <EuroIcon className="w-4 h-4" aria-hidden="true" />
//             </div>
//             <Input
//               className="mb-4 mt-1 focus-within:text-gray-700"
//               label="Rent Price"
//               placeholder={t("enter rent price")}
//               name="rentPrice"
//               inputMode="numeric"
//               value={numberWithCommas(formData.rentPrice)}
//               onChange={setForm}
//               onKeyDown={(e)=> !/^\d+$/.test(e.key) && e.key !== 'Backspace' ? e.preventDefault() : true }
//               margin="normal"
//               type="text"
//               variant="outlined"
//               autoComplete="off"
//               fullwidth='true'
//             />
//           </div>
//         </Label>
//       )}
//       <Label className="lg:flex mb-4 mt-1">
//         <span className="w-1/2">{t("Is it a private or business listing?")}</span>
//         <div className="ml-3 mt-3 sm:mt-0 sm:block">
//           <Input
//             readOnly={true}
//             type="radio"
//             value="private person"
//             checked={formData.contactType === "private person"}
//             onClick={setForm}
//             name="contactType"
//           />
//           <span className="ml-2">{t("private person")}</span>
//           <Input
//             readOnly={true}
//             className="ml-2"
//             type="radio"
//             value="business"
//             checked={formData.contactType === "business"}
//             onClick={setForm}
//             name="contactType"
//           />
//           <span className="ml-2">{t("business")}</span>
//         </div>
//       </Label>
//       {fRequired && <div style={{color: "red"}}>{t("Please fill in the required fields *")}</div>}
//       <Button
//         variant="contained"
//         fullwidth='true'
//         color="primary"
//         style={{ marginTop: "1rem" }}
//         onClick={() => {
//           if(formData.listingType === "For Sale" && formData.listingPrice.length === 0){
//             setFRequired(true);
//             return;
//           }
//           if(formData.listingType === "For Rent" && formData.rentPrice.length === 0){
//             setFRequired(true);
//             return;
//           }
//           if(formData.listingTitle.length === 0){
//             setFRequired(true);
//             return;
//           }
//           setFRequired(false);
//           handleUpdateList(uniqId)
//         }}
//       >
//         {t("update listing")}
//       </Button>
//     </div>
//   );
// };