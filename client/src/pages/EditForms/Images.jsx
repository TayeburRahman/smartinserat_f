// import React, {
//     useCallback,
//     useContext,
//     useEffect,
//     useRef,
//     useState,
//   } from 'react';
//   import { Button, Input } from '@windmill/react-ui';
//   import { DeleteIcon, EditIcon } from '../../icons';
//   import { useForm } from 'react-hooks-helper';
//   import defaultData from './DefaultData';
//   import { useNavigate } from 'react-router-dom';
//   import axios from 'axios';
//   import { config } from '../../assets/config/config';
//   import { useTranslation } from 'react-i18next';
//   import { useMultiStepForm } from '../../components/Forms/MultiStepForm';
//   import { renderType } from '../../components/Forms/stepForm/Images';
//   import ImageType from '../../components/Forms/stepForm/imageType';
//   import { BsPencil } from 'react-icons/bs';
// //   import { flowFactService } from '../../services/flowfact.service';
//   import { SnackbarContext } from '../../context/SnackbarContext';
//   const apiUrl = config.api.url;
//   const Inpt = ({ init, type, uniqId, t, setEnabled }) => {
//     const [value, setValue] = useState(init.title);
//     const refInput = useRef();
//     const [read, setRead] = useState(true);
//     const updateText = async () => {
//       read ? refInput.current.focus() : refInput.current.blur();
//       read ? refInput.current.select() : refInput.current.blur();
//       if (read) {
//         setRead(!read);
//       } else {
//         setEnabled(false);
//         setRead(!read);
//         let data = {
//           id: init.id,
//           uniqId,
//           title: value,
//         };
//         axios
//           .patch(`${apiUrl}/v1/userList/image?title=true`, data)
//           .then(() => setEnabled(true))
//           .catch((error) => console.log(error));
//       }
//     };
//     return (
//       <>
//         <Input
//           className={`mt-4 text-center border-0 bg-transparent`}
//           readOnly={read}
//           type='text'
//           name='imgDetails'
//           value={value}
//           onChange={(e) => {
//             // setDisabled(false)
//             if (read) return;
//             setValue(e.target.value);
//           }}
//           ref={refInput}
//         />
//         <Button
//           layout=''
//           onClick={updateText}
//           className={`${
//             !read
//               ? 'bg-green-500 hover:bg-green-600 text-white'
//               : 'text-gray hover:bg-gray-300'
//           }  mt-1 w-full px-0`}
//           size='small'
//         >
//           {read && <EditIcon className='w-4 mr-1' />}
//           {read ? t('edit title') : t('save title')}
//         </Button>
//       </>
//     );
//   };
//   export const Images = ({ data, imagesList }) => {
//     const { uniqId } = data;
//     const history = useNavigate();
//     const imgMultiStepForm = useMultiStepForm('img');
//     const planMultiStepForm = useMultiStepForm('plan');
//     const { openSnackbar, closeSnackbar } = useContext(SnackbarContext);
//     const [enabled, setEnabled] = useState(true);
//     useEffect(() => {
//       if (enabled) {
//         closeSnackbar();
//       } else {
//         openSnackbar(t('Updating Please Wait...'));
//       }
//     }, [enabled, openSnackbar, closeSnackbar]);
//     const { t } = useTranslation();
//     //now we have renderType
  
//     const renderPhotosFromDb = (imagesList, remove, type) => {
//       return imagesList.map((photo, key) => {
//         return (
//           <div key={photo.id}>
//             <img
//               src={photo.fileReference}
//               alt={photo.title}
//               className='mx-2 object-cover'
//             />
//             <Inpt init={photo} uniqId={uniqId} t={t} setEnabled={setEnabled} />
//             <Button
//               layout=''
//               iconLeft={DeleteIcon}
//               onClick={() => remove(photo, uniqId)}
//               className='w-full mx-auto mt-1 bg-red-600 hover:bg-red-600 text-white hover:text-white'
//               size='small'
//             >
//               {t('remove')}
//             </Button>
//           </div>
//         );
//       });
//     };
  
//     Object.assign(defaultData, data);
//     const [images, setImages] = useState(imagesList);
//     const [maxFiles, setMaxFiles] = useState(false);
//     //lets remove image
//     const removeImage = (photo, uniqId) => {
//       //send the image details to backend
//       setEnabled(false);
//       let data = {
//         id: photo.id,
//         uniqId,
//       };
//       axios
//         .patch(`${apiUrl}/v1/userList/image`, data)
//         .then((response) => {
//           const newImages = images.filter((item) => item.id !== photo.id);
//           setImages(newImages);
//           // if (type == "plan") {
//           //   setDbPlans(x);
//           // } else {
//           //   const x = dbImages.filter((item) => item._id !== photo._id);
//           //   setDbImages(x);
//           // }
//           setEnabled(true);
//         })
//         .catch((error) => console.log(error));
//     };
  
//     const handleUpdateList = async (uniqId) => {
//       const sendData = new FormData();
//       const isBelowMaxF = (f) => f.size < 21000000;
//       if (
//         imgMultiStepForm.selectedType.length > 50 ||
//         !imgMultiStepForm.selectedType.every(isBelowMaxF)
//       ) {
//         setMaxFiles(true);
//         return;
//       }
//       if (
//         planMultiStepForm.selectedType.length > 10 ||
//         !planMultiStepForm.selectedType.every(isBelowMaxF)
//       ) {
//         setMaxFiles(true);
//         return;
//       }
//       setMaxFiles(false);
//       setEnabled(false);
//       //update images
//       try {
//         //{ imgMultiStepForm, planMultiStepForm }
//         // await flowFactService.updateFlowFactListDetails(
//         //   data,
//         //   imgMultiStepForm,
//         //   planMultiStepForm,
//         //   true,
//         //   openSnackbar,
//         //   t
//         // );
//         // for (let pic of imgMultiStepForm.selectedType) {
//         //   sendData.append("imgCollection", pic);
//         // }
//         // for (let pic of planMultiStepForm.selectedType) {
//         //   sendData.append("planCollection", pic);
//         // }
//         // for (let details of imgMultiStepForm.formValuesType) {
//         //   sendData.append("imgDetails", JSON.stringify(details));
//         // }
//         // for (let details of planMultiStepForm.formValuesType) {
//         //   sendData.append("planDetails", JSON.stringify(details));
//         // }
//         history('/app');
//         history('/app/userLists');
//         setEnabled(true);
//       } catch (er) {
//         console.log(er);
//       }
//     };
//     return (
//       <div className='container mt-4 mx-auto px-4'>
//         <ImageType
//           MultiStepForm={imgMultiStepForm}
//           renderPhotos={() => renderType(imgMultiStepForm, t)}
//           title={t('Images')}
//         />
//         <ImageType
//           MultiStepForm={planMultiStepForm}
//           renderPhotos={() => renderType(planMultiStepForm, t)}
//           title={t('Floorplans')}
//         />
//         {maxFiles && (
//           <div style={{ color: 'red' }}>
//             Max 50 pictures / 10 floorplans / 20MB
//           </div>
//         )}
//         <div style={{ marginTop: '1rem' }}>
//           <Button
//             variant='contained'
//             fullwidth='true'
//             color='primary'
//             style={{ marginTop: '1rem' }}
//             onClick={() => handleUpdateList(uniqId)}
//           >
//             {t('Upload Images')}
//           </Button>
//         </div>
//         <div className='grid grid-cols-2 gap-5 my-5 center-center flex-wrap'>
//           {images.length !== 0 && renderPhotosFromDb(images, removeImage)}
//         </div>
//         {/* <div className="grid grid-cols-3 gap-5 my-5 center-center flex-wrap">
//           {renderPhotosFromDb(dbPlans, removeImage, "plan")}
//         </div> */}
//       </div>
//     );
//   };