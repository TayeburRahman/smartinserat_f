// import axios from 'axios';
// import piexif from 'piexifjs';
// import imageToBlob from 'image-to-blob';
// import { config } from './../assets/config/config';
// import { formatPhoneNumberIntl } from 'react-phone-number-input';
// import { WindmillContext } from '@windmill/react-ui';
// const apiUrl = config.api.url;
// // const UserList = require('../models/userList.model');
// const generateCognitoToken = async () => {
//   try {
//     let requestCognitoToken = await axios.get(`${apiUrl}/userList/t-d-t`);
//     return requestCognitoToken.data.cognitoToken;
//   } catch (er) {
//     throw new Error(404, er.message);
//   }
// };
// // function appendBlob(resolve, file) {
// //   return function (err, blob) {
// //     if (err) {
// //       console.error(err);
// //       return;
// //     }
// //     resolve(new File([blob], file.name, { type: file.type }));
// //   };
// // }
// // function fixImage(file) {
// //   try {
// //     return new Promise((resolve, reject) => {
// //       var reader = new FileReader();
// //       reader.onload = function (e) {
// //         var image = new Image();
// //         image.src = e.target.result;
// //         image.width = 1920;
// //         image.height = 1080;
// //         let result = e.target.result;
// //         result = result.replace('jpeg', 'jpg');
// //         result = result.replace('png', 'jpg');
// //         var exifObj = piexif.load(result);
// //         exifObj['0th'][piexif.ImageIFD.Orientation] = 1;
// //         var inserted = piexif.insert(piexif.dump(exifObj), e.target.result);
// //         var image2 = new Image();
// //         image2.src = inserted;
// //         image2.width = e.target.width;
// //         image2.height = e.target.height;
// //         imageToBlob(image2, appendBlob(resolve, file));
// //       };
// //       reader.readAsDataURL(file);
// //     });
// //   } catch (er) {
// //     console.log(er);
// //   }
// // }
// // const resizeFile = (file) => {
// //     return new Promise((resolve, reject) => { // Create a new FileReader
// //         const reader = new FileReader();

// //         // When the FileReader is ready
// //         reader.onload = (e) => { // Create a new image instance
// //             const img = new Image();
// //             img.src = e.target.result;
// //             img.name = e.target.name;
// //             img.size = e.target.size;

// //             // When the image is ready
// //             img.onload = (el) => { // Create a new canvas
// //                 const canvas = document.createElement("canvas");
// //                 const ctx = canvas.getContext("2d");
// //                 const imageWidth = el.target.width;
// //                 const imageHeight = el.target.height;

// //                 if (imageWidth > imageHeight) {
// //                     canvas.width = imageWidth;
// //                     canvas.height = imageHeight;
// //                 } else {
// //                     canvas.width = imageWidth * 2;
// //                     canvas.height = imageHeight;
// //                 } ctx.fillStyle = "#000";
// //                 ctx.fillRect(0, 0, canvas.width, canvas.height);

// //                 // Draw the image to the canvas with the new sizes
// //                 ctx.drawImage(el.target, imageWidth > imageHeight ? 0 : imageWidth / 2, 0, imageWidth, imageHeight);

// //                 // Build and return the resized image as an image file
// //                 canvas.toBlob((blob) => {
// //                     resolve(new File([blob], file.name, {type: file.type}));
// //                 });
// //             };
// //         };

// //         // Begin to load the file to the FileReader
// //         reader.readAsDataURL(file);
// //     });
// // };

// const assignMediaItems = async (
//   cognitoToken,
//   entityId,
//   schema_name,
//   albumName,
//   categories,
//   sorting,
//   multimediaItemIds
// ) => {
//   try {
//     await axios.put(
//       `https://api.production.cloudios.flowfact-prod.cloud/multimedia-service/assigned/schemas/${schema_name}/entities/${entityId}/items`,
//       {
//         albumName,
//         multimediaItemIds,
//         categories,
//         // sorting
//       },
//       {
//         headers: {
//           cognitoToken,
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//   } catch (er) {
//     throw new Error(404, er.message);
//   }
// };

// const formData = (data, contactId) => {
//   let newData = {
//     parking: {
//       values: [data.typeOfParkingSpace],
//     }, // Number of Parking Spaces:
//     rooms: {
//       values: [data.numberOfRooms],
//     }, // Number of Rooms:
//     addresses: {
//       values: [
//         {
//           city: data.city,
//           state: null,
//           street: data.address,
//           country: null,
//           zipcode: data.zip,
//           district: null,
//         },
//       ],
//     },
//     textEnvironment: {
//       values: [data.features],
//     }, // Features:
//     numberbathrooms: {
//       values: [data.numberOfBathrooms],
//     }, // Number of Bathrooms:
//     no_of_floors: {
//       values: [data.numberOfFloors],
//     }, // Number of Floors:
//     contact: {
//       values: [contactId],
//     }, // Contact
//     numberbedrooms: {
//       values: [data.numberOfBedrooms],
//     }, // Number of Bedrooms:
//     identifier: {
//       values: [data.uniqId],
//     }, // Listing ID
//     textEstate: {
//       values: [data.description],
//     },
//     textFree: {
//       values: [data.additionalDescription],
//     },
//     carportnum: {
//       values: [data.numberOfParkingSpaces],
//     },
//     priority: {
//       values: [0],
//     },
//     estatetype: {
//       values: [data.buildingType === 'Land' ? '03' : data.specificBuildingType],
//     },
//     numgarages: {
//       values: [data.numberOfGarages],
//     },
//     development: {
//       values: [data.stateOfDevelopment],
//     },
//     // commissioninclvat: {
//     //     values: [true]
//     // },
//     status: {
//       values: ['active'],
//     },
//     usablearea: {
//       values: [data.usableArea],
//     },
//     textLocation: {
//       values: [data.location],
//     },
//     oldnewbuilding: {
//       values: [`${data.newBuilding ? '1' : ''}`],
//     }, // Special Features: New Building
//     department: {
//       values: ['0'],
//     },
//     headline: {
//       values: [data.listingTitle],
//     }, // Listing Title:
//     internaldescription: {
//       values: [data.listingTitle],
//     }, // Listing Title:
//     livingarea: {
//       values: [data.livingArea],
//     }, // Living Area:
//     monument: {
//       values: [data.monumentProtection ? 'true' : ''],
//     },
//     purchaseprice: {
//       values: [String(data.listingPrice).replaceAll('.', '')],
//     }, // Listing Price:
//     rent: {
//       values: [String(data.rentPrice).replaceAll('.', '')],
//     },
//     buildingphase: {
//       values: [data.buildingphase],
//     }, // energy pass:
//     plotarea: {
//       values: [data.plotArea],
//     }, // Plot Area:
//     typeofheating: {
//       values: [data.typeOfHeating],
//     }, // Type of heating
//     heatingcosts: {
//       values: [data.heatingCostinDetails],
//     },
//     yearofconstruction: {
//       values: [data.yearOfBuilding],
//     }, // Year of construction:
//     service_charge: {
//       values: [data.monthlyHousepayment],
//     },
//     carportpurchaseprice: {
//       values: [data.parkingSpacePrice],
//     },
//     additionalexpenses: {
//       values: [data.additionalCost],
//     },
//     securitydeposit: {
//       values: [data.secuirityCost],
//     },
//     heating_costs_in_ac: {
//       values: [false],
//     },
//   };
//   if (data.commission) {
//     Object.assign(newData, {
//       commissionProspect: {
//         values: [data.commission],
//       },
//     });
//   }
//   // else {
//   //     Object.assign(newData, {
//   //         commissionProspect: {
//   //             values: ["0%"]
//   //         }
//   //     });
//   // }
//   if (data.buildingType === 'Investment') {
//     Object.assign(newData, {
//       leasablearea: {
//         values: [data.leasablearea],
//       },
//       estatetype: {
//         values: [data.estatetype],
//       },
//     });
//   }
//   if (data.buildingType === 'Commercial') {
//     Object.assign(newData, {
//       estatetype: {
//         values: [data.estatetype],
//       },
//       totalarea: {
//         values: [data.totalarea],
//       },
//     });
//   }
//   if (data.energy) {
//     Object.assign(newData, {
//       energy_certificate_availability: {
//         values: ['A'],
//       },
//       // energidentificationdate: {
//       //     values: [data.energyPassCreationDate]
//       // },
//       pass_valid_till: {
//         values: [
//           data.energyPassCreationDate
//             .split('.')
//             .map((n) => (String(n).length > 3 ? +n + 10 : n))
//             .join('.'),
//         ],
//       },
//       energyefficienceclass: {
//         values: [data.energyEfficiencyClass],
//       },
//       energyidentificationtype: {
//         values: [data.typeOfEnergyPass],
//       },
//       energyusagevalue: {
//         values: [
//           data.energyPass === ''
//             ? ''
//             : +String(data.energyPass).replaceAll(',', '.'),
//         ],
//       }, // energy pass:
//       fuelenergy_type: {
//         values: [data.energySource],
//       }, // Energy Source:
//     });
//   } else {
//     Object.assign(newData, {
//       energy_certificate_availability: {
//         values: ['E'],
//       },
//       textFree: {
//         values: [
//           `${data.additionalDescription} Energieausweis liegt zur Besichtigung vor.`,
//         ],
//       },
//     });
//   }
//   return JSON.stringify(newData);
// };

// const publishImagesToFlowFact = async (
//   data,
//   imgMultiStepForm,
//   planMultiStepForm,
//   openSnackbar,
//   t,
//   setLoadingTitle,
//   setCurrentImgIdx,
//   setCurrentImgForm,
//   setProgressValue
// ) => {
//   // cognitoToken
//   try {
//     console.log('data from flowfact publishimage funtion', data);
//     const cognitoToken = await generateCognitoToken();
//     // test if we have contact
//     let contact = await axios.get(
//       `https://api.production.cloudios.flowfact-prod.cloud/contact-service/contact?email=${data.formEmail}`,
//       {
//         headers: {
//           cognitoToken,
//         },
//       }
//     );
//     let shops_commerce = [
//       '05A',
//       '05E1',
//       '05',
//       '05E2',
//       '05K',
//       '05L',
//       '05E',
//       '05LV',
//       '05F',
//     ];
//     let catering_accommodation = [
//       '08B',
//       '08C',
//       '08D',
//       '08F',
//       '08GAHS',
//       '08GAE',
//       '08HOT',
//       '08PENS',
//       '08REST',
//     ];
//     let production_halls = ['07H', '07LKÜ', '07L', '07LH', '07HI', '07W'];
//     let office_surgery = [
//       '06A',
//       '06BUGE',
//       '06BE',
//       '06B',
//       '06',
//       '06G',
//       '06P',
//       '06WOGE',
//     ];

//     if (contact.data === '') {
//       const newData = {
//         firstName: data.nameHide ? 'Privater' : data.contactName,
//         lastName: data.nameHide ? 'Anbieter' : data.lastName,
//         emails: [data.formEmail],
//         company: 'Smartinserat',
//         homepage: ['https://smartinserat.net'],
//       };
//       let phone = data.phoneNumber || data.phone;
//       if (phone?.length > 5) {
//         Object.assign(newData, {
//           phones: [
//             {
//               type: 'office',
//               number: formatPhoneNumberIntl(phone),
//             },
//           ],
//         });
//       } else {
//         Object.assign(newData, { phones: null });
//       }
//       const createFlowfactContact = JSON.stringify(newData);
//       // lets create the contact
//       let contactId = await axios.post(
//         `https://api.production.cloudios.flowfact-prod.cloud/contact-service/contact`,
//         createFlowfactContact,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Accept: 'application/json',
//             cognitoToken,
//           },
//         }
//       );
//       contactId = contactId.data;
//       const getFormData = formData(data, contactId);
//       // lets test the schemanale
//       let schema_name;
//       if (data.listingType === 'For Rent') {
//         if (data.buildingType === 'Flat') {
//           schema_name = 'flat_rent';
//         }
//         if (data.buildingType === 'House') {
//           schema_name = 'house_rent';
//         }
//         if (data.buildingType === 'Investment') {
//           schema_name = 'investment';
//         }
//         if (data.buildingType === 'Land') {
//           schema_name = 'land_lease';
//         }
//         if (data.buildingType === 'Commercial') {
//           if (shops_commerce.includes(data.estatetype)) {
//             schema_name = 'shops_commerce_rent';
//           } else if (catering_accommodation.includes(data.estatetype)) {
//             schema_name = 'catering_accommodation_rent';
//           } else if (production_halls.includes(data.estatetype)) {
//             schema_name = 'production_halls_rent';
//           } else if (office_surgery.includes(data.estatetype)) {
//             schema_name = 'office_surgery_rent';
//           }
//         }
//       }
//       if (data.listingType === 'For Sale') {
//         if (data.buildingType === 'Flat') {
//           schema_name = 'flat_purchase';
//         }
//         if (data.buildingType === 'House') {
//           schema_name = 'house_purchase';
//         }
//         if (data.buildingType === 'Investment') {
//           schema_name = 'investment';
//         }
//         if (data.buildingType === 'Land') {
//           schema_name = 'land_purchase';
//         }
//         if (data.buildingType === 'Commercial') {
//           if (shops_commerce.includes(data.estatetype)) {
//             schema_name = 'shops_commerce_purchase';
//           } else if (catering_accommodation.includes(data.estatetype)) {
//             schema_name = 'catering_accommodation_purchase';
//           } else if (production_halls.includes(data.estatetype)) {
//             schema_name = 'production_halls_purchase';
//           } else if (office_surgery.includes(data.estatetype)) {
//             schema_name = 'office_surgery_purchase';
//           }
//         }
//       }
//       let entityId = window.localStorage.getItem('entityId');
//       if (!entityId) {
//         const createEntitie = await axios.post(
//           `https://api.production.cloudios.flowfact-prod.cloud/entity-service/latest/schemas/${schema_name}`,
//           getFormData,
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               cognitoToken,
//             },
//           }
//         );
//         entityId = createEntitie.data;
//         window.localStorage.setItem('entityId', entityId);
//       }
//       for (let [i, pic] of imgMultiStepForm.selectedType.entries()) {
//         setProgressValue(0);
//         console.log('i', i);
//         setCurrentImgForm('imgMultiStepForm');
//         setCurrentImgIdx(i);
//         // openSnackbar(
//         //   `Bild ${i + 1} von ${
//         //     imgMultiStepForm.selectedType.length
//         //   } hochgeladen`,
//         //   'success'
//         // );
//         let title = imgMultiStepForm.formValuesType[i].imgDetails;
//         let formdata = new FormData();

//         let resizedImage;
//         try {
//           // resizedImage = await fixImage(pic);
//           resizedImage = pic;
//         } catch (e) {
//           resizedImage = pic;
//         }

//         formdata.append('file', resizedImage);
//         let id;
//         try {
//           if (!imgMultiStepForm.showTypeId[i]) {
//             let img = await axios.post(
//               `https://api.production.cloudios.flowfact-prod.cloud/multimedia-service/items/schemas/${schema_name}/entities/${entityId}?title=${title}`,
//               formdata,
//               {
//                 headers: {
//                   cognitoToken,
//                   'Content-Type': 'multipart/form-data',
//                 },
//                 onUploadProgress: (progressEvent) => {
//                   const { loaded, total } = progressEvent;
//                   let percent = Math.floor((loaded * 100) / total);
//                   console.log(`${loaded}kb of ${total}kb | ${percent}%`);

//                   if (true) {
//                     setProgressValue(percent);
//                     // this.setState({ uploadPercentage: percent })
//                   }
//                 },
//               }
//             );

//             imgMultiStepForm.showType[i] =
//               img.data.multimediaItem.fileReference;
//             id = img.data.multimediaItem.id;
//             imgMultiStepForm.setShowTypeId((st) => [...st, id]);
//           } else {
//             id = imgMultiStepForm.showTypeId[i];
//           }
//         } catch (err) {
//           setProgressValue(100);
//           id = imgMultiStepForm.showTypeId[i];
//         }
//         if (i === 0) {
//           await assignMediaItems(
//             cognitoToken,
//             entityId,
//             schema_name,
//             'homepage',
//             ['main_image'],
//             i,
//             [id]
//           );
//           await assignMediaItems(
//             cognitoToken,
//             entityId,
//             schema_name,
//             'portal',
//             ['main_image'],
//             i,
//             [id]
//           );
//           //mychanges
//           await assignMediaItems(
//             cognitoToken,
//             entityId,
//             schema_name,
//             'flowfact_client',
//             ['main_image'],
//             i,
//             [id]
//           );
//         } else {
//           await assignMediaItems(
//             cognitoToken,
//             entityId,
//             schema_name,
//             'homepage',
//             ['pictures'],
//             i,
//             [id]
//           );
//           await assignMediaItems(
//             cognitoToken,
//             entityId,
//             schema_name,
//             'portal',
//             ['pictures'],
//             i,
//             [id]
//           );
//         }
//       }
//       for (let [i, pic] of planMultiStepForm.selectedType.entries()) {
//         setProgressValue(0);

//         setCurrentImgForm('planMultiStepForm');

//         setCurrentImgIdx(i);

//         // openSnackbar(
//         //   `Grundriss ${i + 1} von ${
//         //     planMultiStepForm.selectedType.length
//         //   } hochgeladen`,
//         //   'success'
//         // );
//         let title = planMultiStepForm.formValuesType[i].imgDetails;
//         let formdata = new FormData();
//         let resizedImage;
//         try {
//           // resizedImage = await fixImage(pic);
//           resizedImage = pic;
//         } catch (e) {
//           resizedImage = pic;
//         }

//         formdata.append('file', resizedImage);
//         let id;
//         try {
//           if (!planMultiStepForm.showTypeId[i]) {
//             let img = await axios.post(
//               `https://api.production.cloudios.flowfact-prod.cloud/multimedia-service/items/schemas/${schema_name}/entities/${entityId}?title=${title}`,
//               formdata,
//               {
//                 headers: {
//                   cognitoToken,
//                   'Content-Type': 'multipart/form-data',
//                 },
//                 onUploadProgress: (progressEvent) => {
//                   const { loaded, total } = progressEvent;
//                   let percent = Math.floor((loaded * 100) / total);
//                   console.log(`${loaded}kb of ${total}kb | ${percent}%`);

//                   if (true) {
//                     setProgressValue(percent);
//                     // this.setState({ uploadPercentage: percent })
//                   }
//                 },
//               }
//             );

//             planMultiStepForm.showType[i] =
//               img.data.multimediaItem.fileReference;

//             id = img.data.multimediaItem.id;
//             planMultiStepForm.setShowTypeId((st) => [...st, id]);
//           } else {
//             id = imgMultiStepForm.showTypeId[i];
//           }
//         } catch (err) {
//           id = planMultiStepForm.showTypeId[i];

//           setProgressValue(100);
//         }

//         await assignMediaItems(
//           cognitoToken,
//           entityId,
//           schema_name,
//           'homepage',
//           ['floorplans'],
//           i,
//           [id]
//         );
//         await assignMediaItems(
//           cognitoToken,
//           entityId,
//           schema_name,
//           'portal',
//           ['floorplans'],
//           i,
//           [id]
//         );
//       }
//       return { entityId, schema_name, contactId };
//     }
//     let parseEmail = contact.data;
//     let contactId = parseEmail['entries'][0]['id'];

//     // lets test the schemanale
//     let schema_name;
//     if (data.listingType === 'For Rent') {
//       if (data.buildingType === 'Flat') {
//         schema_name = 'flat_rent';
//       }
//       if (data.buildingType === 'House') {
//         schema_name = 'houses_rent';
//       }
//       if (data.buildingType === 'Investment') {
//         schema_name = 'investment';
//       }
//       if (data.buildingType === 'Land') {
//         schema_name = 'land_lease';
//       }
//       if (data.buildingType === 'Commercial') {
//         if (shops_commerce.includes(data.estatetype)) {
//           schema_name = 'shops_commerce_rent';
//         } else if (catering_accommodation.includes(data.estatetype)) {
//           schema_name = 'catering_accommodation_rent';
//         } else if (production_halls.includes(data.estatetype)) {
//           schema_name = 'production_halls_rent';
//         } else if (office_surgery.includes(data.estatetype)) {
//           schema_name = 'office_surgery_rent';
//         }
//       }
//     }
//     if (data.listingType === 'For Sale') {
//       if (data.buildingType === 'Flat') {
//         schema_name = 'flat_purchase';
//       }
//       if (data.buildingType === 'House') {
//         schema_name = 'house_purchase';
//       }
//       if (data.buildingType === 'Investment') {
//         schema_name = 'investment';
//       }
//       if (data.buildingType === 'Land') {
//         schema_name = 'land_purchase';
//       }
//       if (data.buildingType === 'Commercial') {
//         if (shops_commerce.includes(data.estatetype)) {
//           schema_name = 'shops_commerce_purchase';
//         } else if (catering_accommodation.includes(data.estatetype)) {
//           schema_name = 'catering_accommodation_purchase';
//         } else if (production_halls.includes(data.estatetype)) {
//           schema_name = 'production_halls_purchase';
//         } else if (office_surgery.includes(data.estatetype)) {
//           schema_name = 'office_surgery_purchase';
//         }
//       }
//     }
//     // buildFormData
//     const getFormData = formData(data, contactId, schema_name);
//     let entityId = window.localStorage.getItem('entityId');
//     if (!entityId) {
//       const createEntitie = await axios.post(
//         `https://api.production.cloudios.flowfact-prod.cloud/entity-service/latest/schemas/${schema_name}`,
//         getFormData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             cognitoToken,
//           },
//         }
//       );
//       entityId = createEntitie.data;
//       window.localStorage.setItem('entityId', entityId);
//     }

//     for (let [i, pic] of imgMultiStepForm.selectedType.entries()) {
//       setProgressValue(0);

//       setCurrentImgForm('imgMultiStepForm');

//       setCurrentImgIdx(i);

//       // openSnackbar(
//       //   `Bild ${i + 1} von ${imgMultiStepForm.selectedType.length} hochgeladen`,
//       //   'success'
//       // );
//       let title = imgMultiStepForm.formValuesType[i].imgDetails;
//       let formdata = new FormData();
//       let resizedImage;
//       try {
//         // resizedImage = await fixImage(pic);
//         resizedImage = pic;
//       } catch (e) {
//         resizedImage = pic;
//       }

//       formdata.append('file', resizedImage);
//       let id;
//       try {
//         if (!imgMultiStepForm.showTypeId[i]) {
//           let img = await axios.post(
//             `https://api.production.cloudios.flowfact-prod.cloud/multimedia-service/items/schemas/${schema_name}/entities/${entityId}?title=${title}`,
//             formdata,
//             {
//               headers: {
//                 cognitoToken,
//                 'Content-Type': 'multipart/form-data',
//               },
//               onUploadProgress: (progressEvent) => {
//                 const { loaded, total } = progressEvent;
//                 let percent = Math.floor((loaded * 100) / total);
//                 console.log(`${loaded}kb of ${total}kb | ${percent}%`);

//                 if (true) {
//                   setProgressValue(percent);
//                   // this.setState({ uploadPercentage: percent })
//                 }
//               },
//             }
//           );

//           imgMultiStepForm.showType[i] = img.data.multimediaItem.fileReference;

//           id = img.data.multimediaItem.id;
//           imgMultiStepForm.setShowTypeId((st) => [...st, id]);
//         } else {
//           id = imgMultiStepForm.showTypeId[i];
//         }
//       } catch (err) {
//         setProgressValue(100);
//         id = imgMultiStepForm.showTypeId[i];
//       }
//       if (i === 0) {
//         await assignMediaItems(
//           cognitoToken,
//           entityId,
//           schema_name,
//           'homepage',
//           ['main_image'],
//           i,
//           [id]
//         );
//         await assignMediaItems(
//           cognitoToken,
//           entityId,
//           schema_name,
//           'portal',
//           ['main_image'],
//           i,
//           [id]
//         );
//         //mychanges
//         await assignMediaItems(
//           cognitoToken,
//           entityId,
//           schema_name,
//           'flowfact_client',
//           ['main_image'],
//           i,
//           [id]
//         );
//       } else {
//         await assignMediaItems(
//           cognitoToken,
//           entityId,
//           schema_name,
//           'homepage',
//           ['pictures'],
//           i,
//           [id]
//         );
//         await assignMediaItems(
//           cognitoToken,
//           entityId,
//           schema_name,
//           'portal',
//           ['pictures'],
//           i,
//           [id]
//         );
//       }
//       imgMultiStepForm.formValuesType[i].flowFactId = id;
//     }
//     for (let [i, pic] of planMultiStepForm.selectedType.entries()) {
//       setProgressValue(0);

//       setCurrentImgForm('planMultiStepForm');

//       setCurrentImgIdx(i);

//       // openSnackbar(
//       //   `Grundriss ${i + 1} von ${
//       //     planMultiStepForm.selectedType.length
//       //   } hochgeladen`,
//       //   'success'
//       // );
//       let title = planMultiStepForm.formValuesType[i].imgDetails;
//       let formdata = new FormData();

//       let resizedImage;
//       try {
//         // resizedImage = await fixImage(pic);
//         resizedImage = pic;
//       } catch (e) {
//         resizedImage = pic;
//       }

//       formdata.append('file', resizedImage);
//       let id;
//       try {
//         if (!imgMultiStepForm.showTypeId[i]) {
//           let img = await axios.post(
//             `https://api.production.cloudios.flowfact-prod.cloud/multimedia-service/items/schemas/${schema_name}/entities/${entityId}?title=${title}`,
//             formdata,
//             {
//               headers: {
//                 cognitoToken,
//                 'Content-Type': 'multipart/form-data',
//               },
//               onUploadProgress: (progressEvent) => {
//                 const { loaded, total } = progressEvent;
//                 let percent = Math.floor((loaded * 100) / total);
//                 console.log(`${loaded}kb of ${total}kb | ${percent}%`);

//                 if (true) {
//                   setProgressValue(percent);
//                   // this.setState({ uploadPercentage: percent })
//                 }
//               },
//             }
//           );

//           planMultiStepForm.showType[i] = img.data.multimediaItem.fileReference;
//           id = img.data.multimediaItem.id;
//           planMultiStepForm.setShowTypeId((st) => [...st, id]);
//         } else {
//           id = imgMultiStepForm.showTypeId[i];
//         }
//       } catch (err) {
//         id = imgMultiStepForm.showTypeId[i];

//         setProgressValue(100);
//       }
//       await assignMediaItems(
//         cognitoToken,
//         entityId,
//         schema_name,
//         'homepage',
//         ['floorplans'],
//         i,
//         [id]
//       );
//       await assignMediaItems(
//         cognitoToken,
//         entityId,
//         schema_name,
//         'portal',
//         ['floorplans'],
//         i,
//         [id]
//       );
//       planMultiStepForm.formValuesType[i].flowFactId = id;
//     }
//     return {
//       entityId,
//       schema_name,
//       contactId,
//       imgMultiStepForm,
//       planMultiStepForm,
//     };
//   } catch (er) {
//     console.log(er);
//   }
// };
// const publishToFlowFact = async (
//   data,
//   imgMultiStepForm,
//   planMultiStepForm,
//   openSnackbar,
//   t,
//   setLoadingTitle,
//   setCurrentImgIdx,
//   setCurrentImgForm,
//   setProgressValue
// ) => {
//   // cognitoToken
//   try {
//     console.log('data', data);
//     const cognitoToken = await generateCognitoToken();
//     // test if we have contact
//     let contact = await axios.get(
//       `https://api.production.cloudios.flowfact-prod.cloud/contact-service/contact?email=${data.formEmail}`,
//       {
//         headers: {
//           cognitoToken,
//         },
//       }
//     );
//     let shops_commerce = [
//       '05A',
//       '05E1',
//       '05',
//       '05E2',
//       '05K',
//       '05L',
//       '05E',
//       '05LV',
//       '05F',
//     ];
//     let catering_accommodation = [
//       '08B',
//       '08C',
//       '08D',
//       '08F',
//       '08GAHS',
//       '08GAE',
//       '08HOT',
//       '08PENS',
//       '08REST',
//     ];
//     let production_halls = ['07H', '07LKÜ', '07L', '07LH', '07HI', '07W'];
//     let office_surgery = [
//       '06A',
//       '06BUGE',
//       '06BE',
//       '06B',
//       '06',
//       '06G',
//       '06P',
//       '06WOGE',
//     ];

//     if (contact.data === '') {
//       const newData = {
//         firstName: data.nameHide ? 'Privater' : data.contactName,
//         lastName: data.nameHide ? 'Anbieter' : data.lastName,
//         emails: [data.formEmail],
//         company: 'Smartinserat',
//         homepage: ['https://smartinserat.net'],
//       };
//       let phone = data.phoneNumber || data.phone;
//       if (phone?.length > 5) {
//         Object.assign(newData, {
//           phones: [
//             {
//               type: 'office',
//               number: formatPhoneNumberIntl(phone),
//             },
//           ],
//         });
//       } else {
//         Object.assign(newData, { phones: null });
//       }
//       const createFlowfactContact = JSON.stringify(newData);
//       // lets create the contact
//       let contactId = await axios.post(
//         `https://api.production.cloudios.flowfact-prod.cloud/contact-service/contact`,
//         createFlowfactContact,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Accept: 'application/json',
//             cognitoToken,
//           },
//         }
//       );
//       contactId = contactId.data;
//       const getFormData = formData(data, contactId);
//       // lets test the schemanale
//       let schema_name;
//       if (data.listingType === 'For Rent') {
//         if (data.buildingType === 'Flat') {
//           schema_name = 'flat_rent';
//         }
//         if (data.buildingType === 'House') {
//           schema_name = 'house_rent';
//         }
//         if (data.buildingType === 'Investment') {
//           schema_name = 'investment';
//         }
//         if (data.buildingType === 'Land') {
//           schema_name = 'land_lease';
//         }
//         if (data.buildingType === 'Commercial') {
//           if (shops_commerce.includes(data.estatetype)) {
//             schema_name = 'shops_commerce_rent';
//           } else if (catering_accommodation.includes(data.estatetype)) {
//             schema_name = 'catering_accommodation_rent';
//           } else if (production_halls.includes(data.estatetype)) {
//             schema_name = 'production_halls_rent';
//           } else if (office_surgery.includes(data.estatetype)) {
//             schema_name = 'office_surgery_rent';
//           }
//         }
//       }
//       if (data.listingType === 'For Sale') {
//         if (data.buildingType === 'Flat') {
//           schema_name = 'flat_purchase';
//         }
//         if (data.buildingType === 'House') {
//           schema_name = 'house_purchase';
//         }
//         if (data.buildingType === 'Investment') {
//           schema_name = 'investment';
//         }
//         if (data.buildingType === 'Land') {
//           schema_name = 'land_purchase';
//         }
//         if (data.buildingType === 'Commercial') {
//           if (shops_commerce.includes(data.estatetype)) {
//             schema_name = 'shops_commerce_purchase';
//           } else if (catering_accommodation.includes(data.estatetype)) {
//             schema_name = 'catering_accommodation_purchase';
//           } else if (production_halls.includes(data.estatetype)) {
//             schema_name = 'production_halls_purchase';
//           } else if (office_surgery.includes(data.estatetype)) {
//             schema_name = 'office_surgery_purchase';
//           }
//         }
//       }
//       let entityId = window.localStorage.getItem('entityId');
//       if (!entityId) {
//         const createEntitie = await axios.post(
//           `https://api.production.cloudios.flowfact-prod.cloud/entity-service/latest/schemas/${schema_name}`,
//           getFormData,
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               cognitoToken,
//             },
//           }
//         );
//         entityId = createEntitie.data;
//         window.localStorage.setItem('entityId', entityId);
//       }
//       for (let [i, pic] of imgMultiStepForm.selectedType.entries()) {
//         setProgressValue(0);
//         console.log('i', i);
//         setCurrentImgForm('imgMultiStepForm');
//         setCurrentImgIdx(i);
//         openSnackbar(
//           `Bild ${i + 1} von ${imgMultiStepForm.selectedType.length
//           } hochgeladen`,
//           'success'
//         );
//         let title = imgMultiStepForm.formValuesType[i].imgDetails;
//         let formdata = new FormData();

//         let resizedImage;
//         try {
//           // resizedImage = await fixImage(pic);
//           resizedImage = pic;
//         } catch (e) {
//           resizedImage = pic;
//         }

//         formdata.append('file', resizedImage);
//         let img = await axios.post(
//           `https://api.production.cloudios.flowfact-prod.cloud/multimedia-service/items/schemas/${schema_name}/entities/${entityId}?title=${title}`,
//           formdata,
//           {
//             headers: {
//               cognitoToken,
//               'Content-Type': 'multipart/form-data',
//             },
//             onUploadProgress: (progressEvent) => {
//               const { loaded, total } = progressEvent;
//               let percent = Math.floor((loaded * 100) / total);
//               console.log(`${loaded}kb of ${total}kb | ${percent}%`);

//               if (true) {
//                 setProgressValue(percent);
//                 // this.setState({ uploadPercentage: percent })
//               }
//             },
//           }
//         );
//         let id = img.data.multimediaItem.id;
//         if (i === 0) {
//           await assignMediaItems(
//             cognitoToken,
//             entityId,
//             schema_name,
//             'homepage',
//             ['main_image'],
//             i,
//             [id]
//           );
//           await assignMediaItems(
//             cognitoToken,
//             entityId,
//             schema_name,
//             'portal',
//             ['main_image'],
//             i,
//             [id]
//           );
//         } else {
//           await assignMediaItems(
//             cognitoToken,
//             entityId,
//             schema_name,
//             'homepage',
//             ['pictures'],
//             i,
//             [id]
//           );
//           await assignMediaItems(
//             cognitoToken,
//             entityId,
//             schema_name,
//             'portal',
//             ['pictures'],
//             i,
//             [id]
//           );
//         }
//       }
//       for (let [i, pic] of planMultiStepForm.selectedType.entries()) {
//         setProgressValue(0);

//         setCurrentImgForm('planMultiStepForm');

//         setCurrentImgIdx(i);

//         openSnackbar(
//           `Grundriss ${i + 1} von ${planMultiStepForm.selectedType.length
//           } hochgeladen`,
//           'success'
//         );
//         let title = planMultiStepForm.formValuesType[i].imgDetails;
//         let formdata = new FormData();
//         let resizedImage;
//         try {
//           // resizedImage = await fixImage(pic);
//           resizedImage = pic;
//         } catch (e) {
//           resizedImage = pic;
//         }

//         formdata.append('file', resizedImage);
//         let img = await axios.post(
//           `https://api.production.cloudios.flowfact-prod.cloud/multimedia-service/items/schemas/${schema_name}/entities/${entityId}?title=${title}`,
//           formdata,
//           {
//             headers: {
//               cognitoToken,
//               'Content-Type': 'multipart/form-data',
//             },
//             onUploadProgress: (progressEvent) => {
//               const { loaded, total } = progressEvent;
//               let percent = Math.floor((loaded * 100) / total);
//               console.log(`${loaded}kb of ${total}kb | ${percent}%`);

//               if (true) {
//                 setProgressValue(percent);
//                 // this.setState({ uploadPercentage: percent })
//               }
//             },
//           }
//         );
//         let id = img.data.multimediaItem.id;
//         await assignMediaItems(
//           cognitoToken,
//           entityId,
//           schema_name,
//           'homepage',
//           ['floorplans'],
//           i,
//           [id]
//         );
//         await assignMediaItems(
//           cognitoToken,
//           entityId,
//           schema_name,
//           'portal',
//           ['floorplans'],
//           i,
//           [id]
//         );
//       }
//       return { entityId, schema_name, contactId };
//     }
//     let parseEmail = contact.data;
//     let contactId = parseEmail['entries'][0]['id'];

//     // lets test the schemanale
//     let schema_name;
//     if (data.listingType === 'For Rent') {
//       if (data.buildingType === 'Flat') {
//         schema_name = 'flat_rent';
//       }
//       if (data.buildingType === 'House') {
//         schema_name = 'houses_rent';
//       }
//       if (data.buildingType === 'Investment') {
//         schema_name = 'investment';
//       }
//       if (data.buildingType === 'Land') {
//         schema_name = 'land_lease';
//       }
//       if (data.buildingType === 'Commercial') {
//         if (shops_commerce.includes(data.estatetype)) {
//           schema_name = 'shops_commerce_rent';
//         } else if (catering_accommodation.includes(data.estatetype)) {
//           schema_name = 'catering_accommodation_rent';
//         } else if (production_halls.includes(data.estatetype)) {
//           schema_name = 'production_halls_rent';
//         } else if (office_surgery.includes(data.estatetype)) {
//           schema_name = 'office_surgery_rent';
//         }
//       }
//     }
//     if (data.listingType === 'For Sale') {
//       if (data.buildingType === 'Flat') {
//         schema_name = 'flat_purchase';
//       }
//       if (data.buildingType === 'House') {
//         schema_name = 'house_purchase';
//       }
//       if (data.buildingType === 'Investment') {
//         schema_name = 'investment';
//       }
//       if (data.buildingType === 'Land') {
//         schema_name = 'land_purchase';
//       }
//       if (data.buildingType === 'Commercial') {
//         if (shops_commerce.includes(data.estatetype)) {
//           schema_name = 'shops_commerce_purchase';
//         } else if (catering_accommodation.includes(data.estatetype)) {
//           schema_name = 'catering_accommodation_purchase';
//         } else if (production_halls.includes(data.estatetype)) {
//           schema_name = 'production_halls_purchase';
//         } else if (office_surgery.includes(data.estatetype)) {
//           schema_name = 'office_surgery_purchase';
//         }
//       }
//     }
//     // buildFormData
//     const getFormData = formData(data, contactId, schema_name);
//     let entityId = window.localStorage.getItem('entityId');
//     if (!entityId) {
//       const createEntitie = await axios.post(
//         `https://api.production.cloudios.flowfact-prod.cloud/entity-service/latest/schemas/${schema_name}`,
//         getFormData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             cognitoToken,
//           },
//         }
//       );

//       entityId = createEntitie.data;
//       window.localStorage.setItem('entityId', entityId);
//     }
//     for (let [i, pic] of imgMultiStepForm.selectedType.entries()) {
//       setProgressValue(0);

//       setCurrentImgForm('imgMultiStepForm');

//       setCurrentImgIdx(i);

//       openSnackbar(
//         `Bild ${i + 1} von ${imgMultiStepForm.selectedType.length} hochgeladen`,
//         'success'
//       );
//       let title = imgMultiStepForm.formValuesType[i].imgDetails;
//       let formdata = new FormData();
//       let resizedImage;
//       try {
//         // resizedImage = await fixImage(pic);
//         resizedImage = pic;
//       } catch (e) {
//         resizedImage = pic;
//       }

//       formdata.append('file', resizedImage);
//       let img = await axios.post(
//         `https://api.production.cloudios.flowfact-prod.cloud/multimedia-service/items/schemas/${schema_name}/entities/${entityId}?title=${title}`,
//         formdata,
//         {
//           headers: {
//             cognitoToken,
//             'Content-Type': 'multipart/form-data',
//           },
//           onUploadProgress: (progressEvent) => {
//             const { loaded, total } = progressEvent;
//             let percent = Math.floor((loaded * 100) / total);
//             console.log(`${loaded}kb of ${total}kb | ${percent}%`);

//             if (true) {
//               setProgressValue(percent);
//               // this.setState({ uploadPercentage: percent })
//             }
//           },
//         }
//       );
//       let id = img.data.multimediaItem.id;
//       if (i === 0) {
//         await assignMediaItems(
//           cognitoToken,
//           entityId,
//           schema_name,
//           'homepage',
//           ['main_image'],
//           i,
//           [id]
//         );
//         await assignMediaItems(
//           cognitoToken,
//           entityId,
//           schema_name,
//           'portal',
//           ['main_image'],
//           i,
//           [id]
//         );
//       } else {
//         await assignMediaItems(
//           cognitoToken,
//           entityId,
//           schema_name,
//           'homepage',
//           ['pictures'],
//           i,
//           [id]
//         );
//         await assignMediaItems(
//           cognitoToken,
//           entityId,
//           schema_name,
//           'portal',
//           ['pictures'],
//           i,
//           [id]
//         );
//       }
//       imgMultiStepForm.formValuesType[i].flowFactId = id;
//     }
//     for (let [i, pic] of planMultiStepForm.selectedType.entries()) {
//       setProgressValue(0);

//       setCurrentImgForm('planMultiStepForm');

//       setCurrentImgIdx(i);

//       openSnackbar(
//         `Grundriss ${i + 1} von ${planMultiStepForm.selectedType.length
//         } hochgeladen`,
//         'success'
//       );
//       let title = planMultiStepForm.formValuesType[i].imgDetails;
//       let formdata = new FormData();

//       let resizedImage;
//       try {
//         // resizedImage = await fixImage(pic);
//         resizedImage = pic;
//       } catch (e) {
//         resizedImage = pic;
//       }

//       formdata.append('file', resizedImage);
//       let img = await axios.post(
//         `https://api.production.cloudios.flowfact-prod.cloud/multimedia-service/items/schemas/${schema_name}/entities/${entityId}?title=${title}`,
//         formdata,
//         {
//           headers: {
//             cognitoToken,
//             'Content-Type': 'multipart/form-data',
//           },
//           onUploadProgress: (progressEvent) => {
//             const { loaded, total } = progressEvent;
//             let percent = Math.floor((loaded * 100) / total);
//             console.log(`${loaded}kb of ${total}kb | ${percent}%`);

//             if (true) {
//               setProgressValue(percent);
//               // this.setState({ uploadPercentage: percent })
//             }
//           },
//         }
//       );
//       let id = img.data.multimediaItem.id;
//       await assignMediaItems(
//         cognitoToken,
//         entityId,
//         schema_name,
//         'homepage',
//         ['floorplans'],
//         i,
//         [id]
//       );
//       await assignMediaItems(
//         cognitoToken,
//         entityId,
//         schema_name,
//         'portal',
//         ['floorplans'],
//         i,
//         [id]
//       );
//       planMultiStepForm.formValuesType[i].flowFactId = id;
//     }
//     return {
//       entityId,
//       schema_name,
//       contactId,
//       imgMultiStepForm,
//       planMultiStepForm,
//     };
//   } catch (er) {
//     console.log(er);
//   }
// };

// const updateFlowFactListDetails = async (
//   data,
//   imgMultiStepForm,
//   planMultiStepForm,
//   uploadImages,
//   openSnackbar,
//   t
// ) => {
//   // cognitoToken
//   try {
//     const cognitoToken = await generateCognitoToken();
//     if (uploadImages) {
//       for (let [i, pic] of imgMultiStepForm.selectedType.entries()) {
//         openSnackbar(
//           `Bild ${i + 1} von ${imgMultiStepForm.selectedType.length
//           } hochgeladen`,
//           'success'
//         );
//         let title = imgMultiStepForm.formValuesType[i].imgDetails;
//         let formdata = new FormData();
//         let resizedImage;
//         try {
//           // resizedImage = await fixImage(pic);
//           resizedImage = pic;
//         } catch (e) {
//           resizedImage = pic;
//         }

//         formdata.append('file', resizedImage);
//         let img = await axios.post(
//           `https://api.production.cloudios.flowfact-prod.cloud/multimedia-service/items/schemas/${data.schema_name}/entities/${data.entityId}?title=${title}`,
//           formdata,
//           {
//             headers: {
//               cognitoToken,
//               'Content-Type': 'multipart/form-data',
//             },
//           }
//         );
//         let id = img.data.multimediaItem.id;
//         if (i === 0) {
//           await assignMediaItems(
//             cognitoToken,
//             data.entityId,
//             data.schema_name,
//             'homepage',
//             ['main_image'],
//             i,
//             [id]
//           );
//           await assignMediaItems(
//             cognitoToken,
//             data.entityId,
//             data.schema_name,
//             'portal',
//             ['main_image'],
//             i,
//             [id]
//           );
//           //mychanges
//           await assignMediaItems(
//             cognitoToken,
//             data.entityId,
//             data.schema_name,
//             'flowfact_client',
//             ['main_image'],
//             i,
//             [id]
//           );
//         } else {
//           await assignMediaItems(
//             cognitoToken,
//             data.entityId,
//             data.schema_name,
//             'homepage',
//             ['pictures'],
//             i,
//             [id]
//           );
//           await assignMediaItems(
//             cognitoToken,
//             data.entityId,
//             data.schema_name,
//             'portal',
//             ['pictures'],
//             i,
//             [id]
//           );
//         }
//         imgMultiStepForm.formValuesType[i].flowFactId = id;
//       }
//       for (let [i, pic] of planMultiStepForm.selectedType.entries()) {
//         openSnackbar(
//           `Grundriss ${i + 1} von ${planMultiStepForm.selectedType.length
//           } hochgeladen`,
//           'success'
//         );
//         let title = planMultiStepForm.formValuesType[i].imgDetails;
//         let formdata = new FormData();
//         let resizedImage;
//         try {
//           // resizedImage = await fixImage(pic);
//           resizedImage = pic;
//         } catch (e) {
//           resizedImage = pic;
//         }

//         formdata.append('file', resizedImage);
//         let img = await axios.post(
//           `https://api.production.cloudios.flowfact-prod.cloud/multimedia-service/items/schemas/${data.schema_name}/entities/${data.entityId}?title=${title}`,
//           formdata,
//           {
//             headers: {
//               cognitoToken,
//               'Content-Type': 'multipart/form-data',
//             },
//           }
//         );
//         let id = img.data.multimediaItem.id;
//         await assignMediaItems(
//           cognitoToken,
//           data.entityId,
//           data.schema_name,
//           'homepage',
//           ['floorplans'],
//           i,
//           [id]
//         );
//         await assignMediaItems(
//           cognitoToken,
//           data.entityId,
//           data.schema_name,
//           'portal',
//           ['floorplans'],
//           i,
//           [id]
//         );
//         planMultiStepForm.formValuesType[i].flowFactId = id;
//       }
//       return { imgMultiStepForm, planMultiStepForm };
//     }
//     // buildFormData
//     const getFormData = formData(data, data.flowfactContactId);

//     const updateEntitie = await axios.put(
//       `https://api.production.cloudios.flowfact-prod.cloud/entity-service/schemas/${data.schema_name}/entities/${data.entityId}`,
//       getFormData,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           cognitoToken,
//         },
//       }
//     );
//     return updateEntitie.data;
//   } catch (er) {
//     console.log(er);
//   }
// };

// const updateFlowFactContact = async (data) => {
//   // cognitoToken

//   try {
//     const cognitoToken = await generateCognitoToken();
//     const newData = {
//       firstName: data.nameHide ? 'Privater' : data.contactName,
//       lastName: data.nameHide ? 'Anbieter' : data.lastName,
//       emails: [data.formEmail],
//       company: 'Smartinserat',
//       homepage: ['https://smartinserat.net'],
//     };
//     if (data.phoneNumber?.length > 5) {
//       Object.assign(newData, {
//         phones: [
//           {
//             type: 'office',
//             number: formatPhoneNumberIntl(data.phoneNumber),
//           },
//         ],
//       });
//     } else {
//       Object.assign(newData, { phones: null });
//     }
//     const updatesData = JSON.stringify(newData);
//     const updateEntitie = await axios.put(
//       `https://api.production.cloudios.flowfact-prod.cloud/contact-service/contact/${data.flowfactContactId}`,
//       updatesData,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//           cognitoToken,
//         },
//       }
//     );
//     return updateEntitie.data;
//   } catch (er) {
//     console.log(er);
//   }
// };

// export const flowFactService = {
//   publishToFlowFact,
//   generateCognitoToken,
//   updateFlowFactContact,
//   updateFlowFactListDetails,
//   publishImagesToFlowFact,
// };