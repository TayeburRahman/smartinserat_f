import { Button } from '@windmill/react-ui';
import { useTranslation } from 'react-i18next';
import Img from './Img';
import ImageType from './imageType';
import React, { useContext, useEffect, useState } from 'react';
// import { flowFactService } from '../../../services';
import { SnackbarContext } from '../../../context/SnackbarContext';
import { Box } from '@mui/material';
import axios from 'axios';
import { config } from '../../../assets/config/config';
import { AuthContext } from '../../../context/AuthContext';
import { LinearProgress, Typography } from '@mui/material';
import { dictionary } from '../../../resources/multiLanguages';

const apiUrl = config.api.url;

export const renderType = (MultiStepForm, t) => {
  return MultiStepForm.showType.map((photo, index, key) => {
    const file = MultiStepForm.selectedType[index];
    const element = MultiStepForm.formValuesType[index];
    return (
      <Img
        key={index}
        file={file}
        element={element}
        index={index}
        photo={photo}
        t={t}
        handleChange={MultiStepForm.handleChange}
        removeImage={MultiStepForm.removeType}
      />
    );
  });
};
export const Images = (props) => {
  const {
    imgMultiStepForm,
    planMultiStepForm,
    navigation,
    isReviewMode,
    my_swiper,
    formData,
    phone,
    loading,
    setLoading, 
  } = props;
  const { go } = navigation;
  const [maxFiles, setMaxFiles] = useState(false);
  const [maxCharacters, setMaxCharacters] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const { openSnackbar, closeSnackbar } = useContext(SnackbarContext);

  const { user } = useContext(AuthContext);
  const email = user.email;
  const [loadingTitle, setLoadingTitle] = useState('');
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [currentImgForm, setCurrentImgForm] = useState('imgMultiStepForm');
  const [progressValue, setProgressValue] = useState(0);

  const { t } = useTranslation();

  const languageReducer = "de";
  useEffect(() => {
    if (enabled) {
      closeSnackbar();
    } else {
      openSnackbar(dictionary["createAds"][languageReducer]["images"]["Saving_please_wait"]);
    }
  }, [enabled, openSnackbar, closeSnackbar]);

  const handleNext = async () => {
    if (
      !imgMultiStepForm.selectedType.length &&
      !planMultiStepForm.selectedType.length
    ) {
      my_swiper.slideNext();
      navigation.next();
      return;
    }

    const isBelowMax = (f) => String(f).length < 3800;
    const isBelowMaxF = (f) => f.size < 200000000;
    let fields = Object.values(formData);
    if (
      imgMultiStepForm.selectedType.length > 50
      // || !imgMultiStepForm.selectedType.every(isBelowMaxF)
    ) {
      setMaxFiles(true);
      return;
    }
    if (
      planMultiStepForm.selectedType.length > 10
      // || !planMultiStepForm.selectedType.every(isBelowMaxF)
    ) {
      setMaxFiles(true);
      return;
    }
    if (!fields.every(isBelowMax)) {
      setMaxCharacters(true);
      return;
    }
    // setEnabled(false);
    setLoading(true);
    const sendData = new FormData();
    //request uniqId
    // let reqUniqId =
    //  await axios.post(
    //   `${apiUrl}/userList/create?uniqId=true`,
    //   {
    //     email,
    //   }
    // );
    // let uniqId = reqUniqId.data.uniqId;
    // let listNumber = reqUniqId.data.listNumber;
 
    // =================
    // let oldDate = Date.now();
    
    // let flowFactInfo = await flowFactService.publishImagesToFlowFact(
    //   Object.assign(data, { phone }),
    //   imgMultiStepForm,
    //   planMultiStepForm,
    //   openSnackbar,
    //   t,
    //   setLoadingTitle,
    //   setCurrentImgIdx,
    //   setCurrentImgForm,
    //   setProgressValue
    // );


    // ==Need Changes=======================
    // ==============================================

    const data = { ...formData, email}; 
    if (formData.energy === 'true') {
      data.energy = true;
    } else {
      data.energy = false;
    }  
    setTimeout(() => {
      my_swiper.slideNext();

      setLoading(false);

      return navigation.next();
    }, 500);
  };


  return (
    <div className='container mx-auto px-4 mt-4'>
      {loading ? (
        <Box
          style={{
            width: 300,
            height: 350,
            textAlign: 'center',
            margin: 'auto',
          }}
        >
          <img
            style={{
              height: '80%',
              width: '100%',
              objectFit: 'cover',
              marginBottom: '10px',
            }}
            src={props[currentImgForm].showType[currentImgIdx]}
            alt={`Image ${currentImgIdx}`}
          />
          <Typography variant='h6'>

            {dictionary["createAds"][languageReducer]["images"]["uploading_image"]}{' '}

            {currentImgForm === 'imgMultiStepForm'

              ? dictionary["createAds"][languageReducer]["images"]["uploading_image"]

              : dictionary["createAds"][languageReducer]["images"]["uploading_floorplan"]}{' '}
            {currentImgIdx + 1} / {props[currentImgForm].selectedType.length}
          </Typography>
          <LinearProgress variant='determinate' value={progressValue} />
        </Box>
      ) : (
        <div className='flex flex-col md:flex-row'>
          <ImageType
            className='flex-wrap'
            MultiStepForm={imgMultiStepForm}
            renderPhotos={() => renderType(imgMultiStepForm, t)}
            title={dictionary["createAds"][languageReducer]["images"]["Images"]}
            selectMessage={dictionary["imageTypes"][languageReducer]["selectImages"]}
          />
          <ImageType
            className='flex-wrap'
            MultiStepForm={planMultiStepForm}
            renderPhotos={() => renderType(planMultiStepForm, t)}
            title={dictionary["createAds"][languageReducer]["images"]["Floorplans"]}
            selectMessage={dictionary["imageTypes"][languageReducer]["selectFloorPlans"]}
          />
          {/* <UploadWidget /> */}

        </div>
      )}
      {!loading && (
        <>
          <div className='text-sm py-2'>
            Max. 20 Bilder / 10 Grundrisse / 20MB pro Bild
          </div>
          <div style={{ marginTop: '1rem' }}>
            <>
              {maxCharacters && (
                <div style={{ color: 'red' }}>
                  {dictionary["createAds"][languageReducer]["images"]["Max_characters_on_every_field"]}
                </div>
              )}
              {maxFiles && (
                <div style={{ color: 'red' }}>
                  {dictionary["createAds"][languageReducer]["images"]["Max_files"]}
                </div>
              )}
              <Button
                layout='link'
                color='secondary'
                variant='contained'
                style={{ marginRight: '1rem' }}
                onClick={() => {
                  my_swiper.slidePrev();
                  return navigation.previous();
                }}
              >
                {dictionary["createAds"][languageReducer]["images"]["back"]}
              </Button>
              <Button
                variant='contained'
                fullwidth='true'
                color='primary'
                style={{ marginTop: '1rem' }}
                onClick={handleNext}
              >
                {dictionary["createAds"][languageReducer]["images"]["next"]}
              </Button>
            </>
          </div>
        </>
      )}
    </div>
  );
};