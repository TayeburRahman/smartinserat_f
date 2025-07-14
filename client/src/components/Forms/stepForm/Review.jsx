import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@windmill/react-ui';
import { EditIcon, DropdownIcon } from '../../../icons';
import axios from 'axios';
import { config } from '../../../assets/config/config';
import { AuthContext } from '../../../context/AuthContext';
import {  useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import { flowFactService } from '../../../services/flowfact.service';
import { SnackbarContext } from '../../../context/SnackbarContext';
import * as LottiePlayer from '@lottiefiles/lottie-player';
import Loading from '../../../assets/animation/loading.txt';
import { Box, LinearProgress, Typography } from '@mui/material';
import UploadImageToCloudinary from '../../CloudinaryUpload/ImageUpload';
import { dictionary } from '../../../resources/multiLanguages';

const apiUrl = config.api.url;

export const Review = (props) => {
  const {
    imgMultiStepForm,
    planMultiStepForm,
    formData,
    navigation,
    setReviewMode,
    setListData,
    my_swiper,
    phone,
    loading,
    setLoading, 
  } = props;
  const { go } = navigation;
  const {
    listingTitle,
    listingType,
    buildingType,
    specificBuildingType,
    newBuilding,
    monumentProtection,
    numberOfFloors,
    numberOfRooms,
    numberOfBedrooms,
    numberOfBathrooms,
    contactType,
    livingSpace,
    usableArea,
    plotArea,
    numberOfGarages,
    numberOfCarports,
    numberOfParkingSpaces,
    floor,
    monthlyHousepayment,
    parkingSpacePrice,
    numberOfParkingLots,
    landArea,
    stateOfDevelopment,
    description,
    features,
    location,
    additionalDescription,
    listingPrice,
    rentPrice,
    nebenkostenPrice,
    gesamtmietePrice,
    nickName,
    address,
    city,
    state,
    zip,
    contactName,
    lastName,
    formEmail,
    nameHide,
    phoneNumberHide,
    emailHide,
    carPlacement,
    additionalCost,
    secuirityCost,
    summaryAdditionalCost,
    heatingCostinDetails,
    energyPass,
    typeOfHeating,
    typeOfEnergyPass,
    yearOfBuilding,
    typeOfParkingSpace,
    energyEfficiencyClass,
    energyPassCreationDate,
    energy,
    energySource,
    livingArea,
    leasablearea,
    hideAddress,
    totalarea,
  } = formData;
  const { user } = useContext(AuthContext);
  const email = user.email;
//   const history = useNavigate();
  const [accordion, setAccordion] = useState(false);
  const [maxCharacters, setMaxCharacters] = useState(false);
  const [maxFiles, setMaxFiles] = useState(false);
  const [accordionTwo, setAccordionTwo] = useState(false);
  const { t } = useTranslation();
  const { openSnackbar, closeSnackbar, setIsSnackbarOpen } =
    useContext(SnackbarContext);
  const [enabled, setEnabled] = useState(true);
  const [loadingTitle, setLoadingTitle] = useState('');
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [currentImgForm, setCurrentImgForm] = useState('imgMultiStepForm');
  const [progressValue, setProgressValue] = useState(0);
  function numberWithCommas(x) {
    x = String(x).replace(/\./g, '');
    var parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return parts.join(',');
  }
  useEffect(() => {
    if (enabled) {
      closeSnackbar();
    } else {
      openSnackbar(t('Saving please wait...'));
    }
  }, [enabled, openSnackbar, closeSnackbar]);
  const renderPhotos = (source, formValues) => {
    return source.map((photo, index) => {
      const element = formValues[index];
      return (
        <div key={index ** Math.random()}>
          <img src={photo} className='mr-5' alt='' key={photo} width='100' />
          <p>{element.imgDetails}</p>
        </div>
      );
    });
  };

  // function buildFormData(formData, data, parentKey) {
  //   if (
  //     data &&
  //     typeof data === 'object' &&
  //     !(data instanceof Date) &&
  //     !(data instanceof File)
  //   ) {
  //     Object.keys(data).forEach((key) => {
  //       buildFormData(
  //         formData,
  //         data[key],
  //         parentKey ? `${parentKey}[${key}]` : key
  //       );
  //     });
  //   } else {
  //     const value = data == null ? '' : data;
  //     if (value === '') {
  //       delete parentKey.value;
  //     } else {
  //       formData(parentKey, value);
  //     }
  //   }
  // }

  function cleanObjectForSubmission(data) {
    if (Array.isArray(data)) {
      const cleanedArray = data
        .map(cleanObjectForSubmission)
        .filter((item) => item !== undefined && item !== null && item !== '');
      return cleanedArray;
    }
  
    if (
      data &&
      typeof data === "object" &&
      !(data instanceof Date) &&
      !(data instanceof File)
    ) {
      const cleaned = {};
      Object.keys(data).forEach((key) => {
        const value = data[key];
  
        if (
          value === null ||
          value === undefined ||
          (typeof value === "string" && value.trim() === "")
        ) {
          return;
        }
  
        const cleanedValue = cleanObjectForSubmission(value);
  
        if (
          cleanedValue !== undefined &&
          cleanedValue !== null &&
          (typeof cleanedValue !== "object" ||
            (Array.isArray(cleanedValue) && cleanedValue.length > 0) ||
            (!Array.isArray(cleanedValue) && Object.keys(cleanedValue).length > 0))
        ) {
          cleaned[key] = cleanedValue;
        }
      });
      return cleaned;
    }
  
    return data;
  }
  
  
 console.log("===", nebenkostenPrice)
  const blobUrlToBase64 = async (blobUrl) => {
    const res = await fetch(blobUrl);
    const blob = await res.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64String = reader.result;
        // Remove the "data:image/...;base64," prefix 
        resolve(base64String);
      };
      reader.onerror = reject;
    });
  };

  const handleSubmit = async () => {
    openSnackbar(t("Creating UserList"));
    setIsSnackbarOpen(true);
  
    const imgMultiStepForm = JSON.parse(localStorage.getItem("imgMultiStepForm")) || {};
    const planMultiStepForm = JSON.parse(localStorage.getItem("planMultiStepForm")) || {};
  
  
    let base64Images = [];
    let base64Plans = [];
  
    if (imgMultiStepForm?.showType?.length) {
      base64Images = await Promise.all(
        imgMultiStepForm.showType.map((url) => blobUrlToBase64(url))
      );
    }
  
    if (planMultiStepForm?.showType?.length) {
      base64Plans = await Promise.all(
        planMultiStepForm.showType.map((url) => blobUrlToBase64(url))
      );
    }
 
    const isBelowMax = (f) => String(f)?.length < 3800;
    let fields = Object.values(formData);
    if (imgMultiStepForm.selectedType?.length > 50) {
      setMaxFiles(true);
      return;
    }
    if (planMultiStepForm.selectedType?.length > 10) {
      setMaxFiles(true);
      return;
    }
    if (!fields.every(isBelowMax)) {
      setMaxCharacters(true);
      return;
    }
  
    setLoading(true);
 
    const imgCollection = [...base64Images, ...base64Plans]; 
    if(!imgCollection?.length){
      openSnackbar(t("Please add the property images!"), "danger", 2000);
      return;
    }

    const rawData = {
      ...formData,
      email,
      phone,
      imgCollection,
      energy: formData.energy === "true",
      newBuilding: formData.newBuilding === "true",
      monumentProtection: formData.monumentProtection === "true",
    };
    
    const data = cleanObjectForSubmission(rawData);

 
    console.log("sendData====", data)
    try { 
      const response = await axios.post(`${apiUrl}/userList/create`, data);
      console.log("response.data.data", response.data.data)
      setListData(response.data.data);
      setLoading(false);
      setIsSnackbarOpen(false); 
      if(response.data){
        localStorage.removeItem("formData");
            localStorage.removeItem("entityId");
            setTimeout(() => {
              localStorage.removeItem("imgMultiStepForm");
              localStorage.removeItem("planMultiStepForm");
            }, 100);
            }
      my_swiper.slideNext();
      go("submit");
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      openSnackbar(
        t(error.status === 500 ?"Please change the image to large": error.message|| "Something Went Very Wrong!"),
        "danger",
        2000
      );
    }  
  };
  console.log('==gesamtmietePrice=', listingType)


  const languageReducer = "de";

  return (
    <div className='container mt-4 mx-auto px-4'>
      <>
        <h2 className='mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300'>
          {t('Bitte überprüfen Sie Ihre Eingaben')}
        </h2>
        <div className='block mb-4'>
          <RenderAccordion
            setReviewMode={setReviewMode}
            serial='1'
            summary='Allgemein' 
            back= "data"
            go={go}
            details={[
              {
                [dictionary["createAds"][languageReducer]["data"]["listingTitle"]]: listingTitle || ''
              },
              {
                [dictionary["createAds"][languageReducer]["data"]["listingType"]]: listingType
                  ? dictionary["createAds"][languageReducer]["data"][
                      listingType === "For Sale" ? "forSale" : "forRent"
                    ]
                  : 'N/A'
              },
              {
                [dictionary["createAds"][languageReducer]["data"]["buildingType"]]:
                  buildingType
                    ? dictionary["createAds"][languageReducer]["data"][buildingType]
                    : 'N/A'
              },
              
            `${listingType}` === 'For Sale'
  ? {
      Listenpreis: listingPrice
        ? numberWithCommas(listingPrice) + ' €'
        : '',
    }
  : {
      Mietpreis: rentPrice
        ? numberWithCommas(rentPrice) + ' €'
        : 'N/A', 
      
    },
 {
      Nebenkosten: nebenkostenPrice
          ? numberWithCommas(nebenkostenPrice)  + ' €'
          : 'N/A',
      } ,
       
     {
      Gesamtmiete: gesamtmietePrice
          ? numberWithCommas(gesamtmietePrice) + ' €'
          : 'N/A',
        } ,

                
                {
                  [dictionary["createAds"][languageReducer]["data"]["contactType"]]:
                    contactType
                      ? dictionary["createAds"][languageReducer]["data"][
                          contactType === "private person" ? "privatePerson" : "business"
                        ]
                      : ""
                }
            ]}
          />
        </div>
        <div className='block mb-4'>
          <Button
            layout='link'
            className='w-full rounded-lg justify-between flex hover:bg-gray-50 py-4 ring-1 ring-black ring-opacity-5 overflow-hidden bg-white dark:bg-gray-800 text-gray-600 text-sm text-left font-medium'
            size='large'
            onClick={() => setAccordion(!accordion)}
          >
            <span>2 .</span>{t('Details')}
            <DropdownIcon className='w-4' />
          </Button>
          {accordion && (
            <div className='my-3'>
              <ul>
                {buildingType === 'HOUSE' && (
                 <div>
                 <li>{t('Haustyp')}: {t('Haustyp')}</li>
                 <li>{t('Baujahr')}: {t(yearOfBuilding)}</li>
                 <li>{t('Besondere Merkmale')}: 
                   {newBuilding && t('Neubau')}
                   {monumentProtection && t(', Denkmalschutz')}
                 </li>
                 <li>{t('Wohnfläche')}: {t(livingArea)}</li>
                 <li>{t('Nutzfläche')}: {t(usableArea)}</li>
                 <li>{t('Grundstücksfläche')}: {t(plotArea)}</li>
                 <li>{t('Anzahl der Etagen')}: {t(numberOfFloors)}</li>
                 <li>{t('Anzahl der Zimmer')}: {t(numberOfBathrooms)}</li>
                 <li>{t('Anzahl der Schlafzimmer')}: {t(numberOfBedrooms)}</li>
                 <li>{t('Anzahl der Badezimmer')}: {t(numberOfBathrooms)}</li>
                 <li>{t('Anzahl Garagen')}: {t(numberOfGarages)}</li>
                 <li>{t('Art des Stellplatzes')}: {t(typeOfParkingSpace)}</li>
                 <li>{t('Anzahl Stellplätze')}: {t(numberOfParkingSpaces)}</li>
               
                 {energy === 'true' && (
                   <>
                     <li>{t('Energieausweis vorhanden')}: {t('Energie')}</li>
                     <li>{t('Energieausweis')}: {t(energyPass)}</li>
                     <li>{t('Energieeffizienzklasse')}: {t(energyEfficiencyClass)}</li>
                     <li>{t('Erstellungsdatum des Energieausweises')}: {t(energyPassCreationDate)}</li>
                     <li>{t('Heizungsart')}: {t(typeOfHeating)}</li>
                     <li>{t('Art des Energieausweises')}: {t(typeOfEnergyPass)}</li>
               
                     {listingType === 'For Rent' && (
                       <>
                         <li>{t('Nebenkosten')}: {t(additionalCost)}</li>
                         <li>{t('Heizkosten im Detail')}: {t(heatingCostinDetails)}</li>
                         <li>{t('Sicherheitskosten')}: {t(secuirityCost)}</li>
                       </>
                     )}
                   </>
                 )}
               </div>
               
                )}
                {buildingType === 'APARTMENT' && (
                <div>
                <li className=''>
                  {t('Wohnungstyp')}:{' '}
                  {t(
                    (() => {
                      let info;
                      switch (specificBuildingType) {
                        case '01ETAG':
                          info = 'Etagenwohnung';
                          break;
                        case '01SOUT':
                          info = 'Souterrainwohnung';
                          break;
                        case '01GERD':
                          info = 'Erdgeschosswohnung';
                          break;
                        case '01DACH':
                          info = 'Dachgeschosswohnung';
                          break;
                        case '01PENT':
                          info = 'Penthouse';
                          break;
                        case '01MAIS':
                          info = 'Maisonette';
                          break;
                      }
                      return info;
                    })()
                  )}
                </li>
                <li>{t('Baujahr')}: {t(yearOfBuilding)}</li>
                <li>{t('Wohnfläche')}: {t(livingArea)}</li>
                <li>
                  {t('Besondere Merkmale')}:{' '}
                  {newBuilding && t('Neubau')}
                  {monumentProtection && t(', Denkmalschutz')}
                </li>
                <li>{t('Zimmeranzahl')}: {t(numberOfRooms)}</li>
                <li>{t('Anzahl Badezimmer')}: {t(numberOfBathrooms)}</li>
                <li>{t('Anzahl Schlafzimmer')}: {t(numberOfBedrooms)}</li>
                <li>{t('Etage')}: {t(floor)}</li>
                <li>{t('Monatliches Hausgeld')}: {t(monthlyHousepayment)}</li>
                <li>
                  {t('Art des Stellplatzes')}:{' '}
                  {t(
                    (() => {
                      let info;
                      switch (typeOfParkingSpace) {
                        case '1':
                          info = 'Nicht angegeben';
                          break;
                        case '2':
                          info = 'Garage';
                          break;
                        case '3':
                          info = 'Außenstellplatz';
                          break;
                        case '4':
                          info = 'Carport';
                          break;
                        case '6':
                          info = 'Parkhaus';
                          break;
                        case '7':
                          info = 'Tiefgarage';
                          break;
                      }
                      return info;
                    })()
                  )}
                </li>
                <li>{t('Stellplatzpreis')}: {t(parkingSpacePrice)}</li>
              
                {energy === 'true' && (
                  <>
                    <li>{t('Energie')}: {t('Energie')}</li>
                    <li>{t('Energieausweis')}: {t(energyPass)}</li>
                    <li>{t('Energieeffizienzklasse')}: {t(energyEfficiencyClass)}</li>
                    <li>{t('Erstellungsdatum Energieausweis')}: {t(energyPassCreationDate)}</li>
                    <li>{t('Heizungsart')}: {t(typeOfHeating)}</li>
                    <li>
                      {t('Art des Energieausweises')}:{' '}
                      {t(
                        (() => {
                          let info;
                          switch (typeOfEnergyPass) {
                            case '1':
                              info = '--bitte wählen--';
                              break;
                            case '3':
                              info = 'Verbrauchsausweis';
                              break;
                            case '2':
                              info = 'Bedarfsausweis';
                              break;
                          }
                          return info;
                        })()
                      )}
                    </li>
                  </>
                )}
              
                {listingType === 'For Rent' && (
                  <>
                    <li>{t('Nebenkosten')}: {t(additionalCost)}</li>
                    <li>{t('Heizkosten im Detail')}: {t(heatingCostinDetails)}</li>
                    <li>{t('Kaution')}: {t(secuirityCost)}</li>
                  </>
                )}
              </div> 
                )}
                  {buildingType === 'STORE' && (
                <div>
                <li className=''>
                  {t('Wohnungstyp')}:{' '}
                  {t(
                    (() => {
                      let info;
                      switch (specificBuildingType) {
                        case '01ETAG':
                          info = 'Etagenwohnung';
                          break;
                        case '01SOUT':
                          info = 'Souterrainwohnung';
                          break;
                        case '01GERD':
                          info = 'Erdgeschosswohnung';
                          break;
                        case '01DACH':
                          info = 'Dachgeschosswohnung';
                          break;
                        case '01PENT':
                          info = 'Penthouse';
                          break;
                        case '01MAIS':
                          info = 'Maisonette';
                          break;
                      }
                      return info;
                    })()
                  )}
                </li>
                <li>{t('Baujahr')}: {t(yearOfBuilding)}</li>
                <li>{t('Wohnfläche')}: {t(livingArea)}</li>
                <li>
                  {t('Besondere Merkmale')}:{' '}
                  {newBuilding && t('Neubau')}
                  {monumentProtection && t(', Denkmalschutz')}
                </li>
                <li>{t('Zimmeranzahl')}: {t(numberOfRooms)}</li>
                <li>{t('Anzahl Badezimmer')}: {t(numberOfBathrooms)}</li>
                <li>{t('Anzahl Schlafzimmer')}: {t(numberOfBedrooms)}</li>
                <li>{t('Etage')}: {t(floor)}</li>
                <li>{t('Monatliches Hausgeld')}: {t(monthlyHousepayment)}</li>
                <li>
                  {t('Art des Stellplatzes')}:{' '}
                  {t(
                    (() => {
                      let info;
                      switch (typeOfParkingSpace) {
                        case '1':
                          info = 'Nicht angegeben';
                          break;
                        case '2':
                          info = 'Garage';
                          break;
                        case '3':
                          info = 'Außenstellplatz';
                          break;
                        case '4':
                          info = 'Carport';
                          break;
                        case '6':
                          info = 'Parkhaus';
                          break;
                        case '7':
                          info = 'Tiefgarage';
                          break;
                      }
                      return info;
                    })()
                  )}
                </li>
                <li>{t('Stellplatzpreis')}: {t(parkingSpacePrice)}</li>
              
                {energy === 'true' && (
                  <>
                    <li>{t('Energie')}: {t('Energie')}</li>
                    <li>{t('Energieausweis')}: {t(energyPass)}</li>
                    <li>{t('Energieeffizienzklasse')}: {t(energyEfficiencyClass)}</li>
                    <li>{t('Erstellungsdatum Energieausweis')}: {t(energyPassCreationDate)}</li>
                    <li>{t('Heizungsart')}: {t(typeOfHeating)}</li>
                    <li>
                      {t('Art des Energieausweises')}:{' '}
                      {t(
                        (() => {
                          let info;
                          switch (typeOfEnergyPass) {
                            case '1':
                              info = '--bitte wählen--';
                              break;
                            case '3':
                              info = 'Verbrauchsausweis';
                              break;
                            case '2':
                              info = 'Bedarfsausweis';
                              break;
                          }
                          return info;
                        })()
                      )}
                    </li>
                  </>
                )}
              
                {listingType === 'For Rent' && (
                  <>
                    <li>{t('Nebenkosten')}: {t(additionalCost)}</li>
                    <li>{t('Heizkosten im Detail')}: {t(heatingCostinDetails)}</li>
                    <li>{t('Kaution')}: {t(secuirityCost)}</li>
                  </>
                )}
              </div> 
                )}
                  {buildingType === 'TRADE_SITE' && (
                <div>
                <li className=''>
                  {t('Wohnungstyp')}:{' '}
                  {t(
                    (() => {
                      let info;
                      switch (specificBuildingType) {
                        case '01ETAG':
                          info = 'Etagenwohnung';
                          break;
                        case '01SOUT':
                          info = 'Souterrainwohnung';
                          break;
                        case '01GERD':
                          info = 'Erdgeschosswohnung';
                          break;
                        case '01DACH':
                          info = 'Dachgeschosswohnung';
                          break;
                        case '01PENT':
                          info = 'Penthouse';
                          break;
                        case '01MAIS':
                          info = 'Maisonette';
                          break;
                      }
                      return info;
                    })()
                  )}
                </li>
                <li>{t('Baujahr')}: {t(yearOfBuilding)}</li>
                <li>{t('Wohnfläche')}: {t(livingArea)}</li>
                <li>
                  {t('Besondere Merkmale')}:{' '}
                  {newBuilding && t('Neubau')}
                  {monumentProtection && t(', Denkmalschutz')}
                </li>
                <li>{t('Zimmeranzahl')}: {t(numberOfRooms)}</li>
                <li>{t('Anzahl Badezimmer')}: {t(numberOfBathrooms)}</li>
                <li>{t('Anzahl Schlafzimmer')}: {t(numberOfBedrooms)}</li>
                <li>{t('Etage')}: {t(floor)}</li>
                <li>{t('Monatliches Hausgeld')}: {t(monthlyHousepayment)}</li>
                <li>
                  {t('Art des Stellplatzes')}:{' '}
                  {t(
                    (() => {
                      let info;
                      switch (typeOfParkingSpace) {
                        case '1':
                          info = 'Nicht angegeben';
                          break;
                        case '2':
                          info = 'Garage';
                          break;
                        case '3':
                          info = 'Außenstellplatz';
                          break;
                        case '4':
                          info = 'Carport';
                          break;
                        case '6':
                          info = 'Parkhaus';
                          break;
                        case '7':
                          info = 'Tiefgarage';
                          break;
                      }
                      return info;
                    })()
                  )}
                </li>
                <li>{t('Stellplatzpreis')}: {t(parkingSpacePrice)}</li>
              
                {energy === 'true' && (
                  <>
                    <li>{t('Energie')}: {t('Energie')}</li>
                    <li>{t('Energieausweis')}: {t(energyPass)}</li>
                    <li>{t('Energieeffizienzklasse')}: {t(energyEfficiencyClass)}</li>
                    <li>{t('Erstellungsdatum Energieausweis')}: {t(energyPassCreationDate)}</li>
                    <li>{t('Heizungsart')}: {t(typeOfHeating)}</li>
                    <li>
                      {t('Art des Energieausweises')}:{' '}
                      {t(
                        (() => {
                          let info;
                          switch (typeOfEnergyPass) {
                            case '1':
                              info = '--bitte wählen--';
                              break;
                            case '3':
                              info = 'Verbrauchsausweis';
                              break;
                            case '2':
                              info = 'Bedarfsausweis';
                              break;
                          }
                          return info;
                        })()
                      )}
                    </li>
                  </>
                )}
              
                {listingType === 'For Rent' && (
                  <>
                    <li>{t('Nebenkosten')}: {t(additionalCost)}</li>
                    <li>{t('Heizkosten im Detail')}: {t(heatingCostinDetails)}</li>
                    <li>{t('Kaution')}: {t(secuirityCost)}</li>
                  </>
                )}
              </div> 
                )}
                  {buildingType === 'INDUSTRY' && (
                  <div>
                  <li>
                    {t('Spezifischer Grundstückstyp')}:{' '}
                    {t(
                      (() => {
                        let info;
                        switch (specificBuildingType) {
                          case '0':
                            info = 'Baugrundstück';
                            break;
                          case '1':
                            info = 'Ackerland';
                            break;
                          case '2':
                            info = 'Waldgrundstück';
                            break;
                        }
                        return info;
                      })()
                    )}
                  </li>
                  <li>{t('Grundstücksfläche')}: {t(landArea)}</li>
                  <li>
                    {t('Erschließungszustand')}:{' '}
                    {t(
                      (() => {
                        let info;
                        switch (stateOfDevelopment) {
                          case 'NE':
                            info = 'Nicht erschlossen';
                            break;
                          case 'TE':
                            info = 'Teilerschlossen';
                            break;
                          case 'VE':
                            info = 'Voll erschlossen';
                            break;
                        }
                        return info;
                      })()
                    )}
                  </li>
                
                  {energy === 'true' && (
                    <>
                      <li>{t('Energie')}: {t('Energie')}</li>
                      <li>{t('Energieausweis')}: {t(energyPass)}</li>
                      <li>{t('Energieeffizienzklasse')}: {t(energyEfficiencyClass)}</li>
                      <li>{t('Erstellungsdatum Energieausweis')}: {t(energyPassCreationDate)}</li>
                      <li>{t('Heizungsart')}: {t(typeOfHeating)}</li>
                      <li>
                        {t('Art des Energieausweises')}:{' '}
                        {t(
                          (() => {
                            let info;
                            switch (typeOfEnergyPass) {
                              case '1':
                                info = '--bitte wählen--';
                                break;
                              case '3':
                                info = 'Verbrauchsausweis';
                                break;
                              case '2':
                                info = 'Bedarfsausweis';
                                break;
                            }
                            return info;
                          })()
                        )}
                      </li>
                
                      {listingType === 'For Rent' && (
                        <>
                          <li>{t('Nebenkosten')}: {t(additionalCost)}</li>
                          <li>{t('Heizkosten im Detail')}: {t(heatingCostinDetails)}</li>
                          <li>{t('Kaution')}: {t(secuirityCost)}</li>
                        </>
                      )}
                    </>
                  )}
                </div>
                
                )}
                  {buildingType === 'GASTRONOMY' && (
                  <div>
                  <li>
                    {t('Spezifischer Grundstückstyp')}:{' '}
                    {t(
                      (() => {
                        let info;
                        switch (specificBuildingType) {
                          case '0':
                            info = 'Baugrundstück';
                            break;
                          case '1':
                            info = 'Ackerland';
                            break;
                          case '2':
                            info = 'Waldgrundstück';
                            break;
                        }
                        return info;
                      })()
                    )}
                  </li>
                  <li>{t('Grundstücksfläche')}: {t(landArea)}</li>
                  <li>
                    {t('Erschließungszustand')}:{' '}
                    {t(
                      (() => {
                        let info;
                        switch (stateOfDevelopment) {
                          case 'NE':
                            info = 'Nicht erschlossen';
                            break;
                          case 'TE':
                            info = 'Teilerschlossen';
                            break;
                          case 'VE':
                            info = 'Voll erschlossen';
                            break;
                        }
                        return info;
                      })()
                    )}
                  </li>
                
                  {energy === 'true' && (
                    <>
                      <li>{t('Energie')}: {t('Energie')}</li>
                      <li>{t('Energieausweis')}: {t(energyPass)}</li>
                      <li>{t('Energieeffizienzklasse')}: {t(energyEfficiencyClass)}</li>
                      <li>{t('Erstellungsdatum Energieausweis')}: {t(energyPassCreationDate)}</li>
                      <li>{t('Heizungsart')}: {t(typeOfHeating)}</li>
                      <li>
                        {t('Art des Energieausweises')}:{' '}
                        {t(
                          (() => {
                            let info;
                            switch (typeOfEnergyPass) {
                              case '1':
                                info = '--bitte wählen--';
                                break;
                              case '3':
                                info = 'Verbrauchsausweis';
                                break;
                              case '2':
                                info = 'Bedarfsausweis';
                                break;
                            }
                            return info;
                          })()
                        )}
                      </li>
                
                      {listingType === 'For Rent' && (
                        <>
                          <li>{t('Nebenkosten')}: {t(additionalCost)}</li>
                          <li>{t('Heizkosten im Detail')}: {t(heatingCostinDetails)}</li>
                          <li>{t('Kaution')}: {t(secuirityCost)}</li>
                        </>
                      )}
                    </>
                  )}
                </div>
                
                )}
                {buildingType === 'GARAGE' && (
                  <div>
                  <li>
                    {t('Spezifischer Grundstückstyp')}:{' '}
                    {t(
                      (() => {
                        let info;
                        switch (specificBuildingType) {
                          case '0':
                            info = 'Baugrundstück';
                            break;
                          case '1':
                            info = 'Ackerland';
                            break;
                          case '2':
                            info = 'Waldgrundstück';
                            break;
                        }
                        return info;
                      })()
                    )}
                  </li>
                  <li>{t('Grundstücksfläche')}: {t(landArea)}</li>
                  <li>
                    {t('Erschließungszustand')}:{' '}
                    {t(
                      (() => {
                        let info;
                        switch (stateOfDevelopment) {
                          case 'NE':
                            info = 'Nicht erschlossen';
                            break;
                          case 'TE':
                            info = 'Teilerschlossen';
                            break;
                          case 'VE':
                            info = 'Voll erschlossen';
                            break;
                        }
                        return info;
                      })()
                    )}
                  </li>
                
                  {energy === 'true' && (
                    <>
                      <li>{t('Energie')}: {t('Energie')}</li>
                      <li>{t('Energieausweis')}: {t(energyPass)}</li>
                      <li>{t('Energieeffizienzklasse')}: {t(energyEfficiencyClass)}</li>
                      <li>{t('Erstellungsdatum Energieausweis')}: {t(energyPassCreationDate)}</li>
                      <li>{t('Heizungsart')}: {t(typeOfHeating)}</li>
                      <li>
                        {t('Art des Energieausweises')}:{' '}
                        {t(
                          (() => {
                            let info;
                            switch (typeOfEnergyPass) {
                              case '1':
                                info = '--bitte wählen--';
                                break;
                              case '3':
                                info = 'Verbrauchsausweis';
                                break;
                              case '2':
                                info = 'Bedarfsausweis';
                                break;
                            }
                            return info;
                          })()
                        )}
                      </li>
                
                      {listingType === 'For Rent' && (
                        <>
                          <li>{t('Nebenkosten')}: {t(additionalCost)}</li>
                          <li>{t('Heizkosten im Detail')}: {t(heatingCostinDetails)}</li>
                          <li>{t('Kaution')}: {t(secuirityCost)}</li>
                        </>
                      )}
                    </>
                  )}
                </div>
                
                )}
                  {buildingType === 'SHORT_TERM_ACCOMODATION' && (
                  <div>
                  <li>
                    {t('Immobilienart')}:{' '}
                    {t(
                      (() => {
                        let info;
                        switch (formData.estatetype) {
                          case '05A':
                            info = 'Ausstellungsfläche';
                            break;
                          case '05E1':
                            info = 'Einkaufszentrum';
                            break;
                          case '05':
                            info = 'Einzelhandelsfläche';
                            break;
                          case '05E2':
                            info = 'Kaufhaus';
                            break;
                          case '05K':
                            info = 'Kiosk';
                            break;
                          case '05L':
                            info = 'Laden';
                            break;
                          case '05E':
                            info = 'SB-Markt';
                            break;
                          case '05LV':
                            info = 'Verkaufsfläche';
                            break;
                          case '05F':
                            info = 'Verkaufshalle';
                            break;
                          case '08B':
                            info = 'Bar';
                            break;
                          case '08C':
                            info = 'Café';
                            break;
                          case '08D':
                            info = 'Diskothek';
                            break;
                          case '08F':
                            info = 'Ferienimmobilie';
                            break;
                          case '08GAHS':
                            info = 'Gästehaus';
                            break;
                          case '08GAE':
                            info = 'Gaststätte';
                            break;
                          case '08HOT':
                            info = 'Hotel';
                            break;
                          case '08PENS':
                            info = 'Pension';
                            break;
                          case '08REST':
                            info = 'Restaurant';
                            break;
                          case '07H':
                            info = 'Halle';
                            break;
                          case '07LKÜ':
                            info = 'Kühlhaus';
                            break;
                          case '07L':
                            info = 'Lagerfläche';
                            break;
                          case '07LH':
                            info = 'Lagerhalle';
                            break;
                          case '07HI':
                            info = 'Produktionsfläche';
                            break;
                          case '07W':
                            info = 'Werkstattfläche';
                            break;
                          case '06A':
                            info = 'Atelier';
                            break;
                          case '06BUGE':
                            info = 'Büro- / Geschäftsgebäude';
                            break;
                          case '06BE':
                            info = 'Büroetage';
                            break;
                          case '06B':
                            info = 'Bürofläche';
                            break;
                          case '06':
                            info = 'Gewerbefläche';
                            break;
                          case '06G':
                            info = 'Gewerbezentrum';
                            break;
                          case '06P':
                            info = 'Praxis';
                            break;
                          case '06WOGE':
                            info = 'Wohn- / Geschäftsgebäude';
                            break;
                        }
                        return info;
                      })()
                    )}
                  </li>
                  <li>{t('Baujahr')}: {t(yearOfBuilding)}</li>
                  <li>
                    {t('Besondere Merkmale')}: {newBuilding && t('Neubau')}
                    {monumentProtection && t(', Denkmalschutz')}
                  </li>
                  <li>{t('Anzahl der Stockwerke')}: {t(numberOfFloors)}</li>
                  <li>{t('Gesamtfläche')}: {t(totalarea)}</li>
                  <li>{t('Anzahl der Zimmer')}: {t(numberOfBathrooms)}</li>
                  <li>{t('Anzahl der Schlafzimmer')}: {t(numberOfBedrooms)}</li>
                  <li>{t('Anzahl der Badezimmer')}: {t(numberOfBathrooms)}</li>
                  <li>{t('Nutzfläche')}: {t(usableArea)}</li>
                  <li>{t('Grundstücksfläche')}: {t(plotArea)}</li>
                  <li>{t('Anzahl der Garagen')}: {t(numberOfGarages)}</li>
                  <li>{t('Anzahl der Parkplätze')}: {t(numberOfParkingSpaces)}</li>
                
                  {energy === 'true' && (
                    <>
                      <li>{t('Energie')}: {t('Energie')}</li>
                      <li>{t('Energieausweis')}: {t(energyPass)}</li>
                      <li>{t('Energieeffizienzklasse')}: {t(energyEfficiencyClass)}</li>
                      <li>{t('Erstellungsdatum Energieausweis')}: {t(energyPassCreationDate)}</li>
                      <li>{t('Heizungsart')}: {t(typeOfHeating)}</li>
                      <li>
                        {t('Art des Energieausweises')}:{' '}
                        {t(
                          (() => {
                            let info;
                            switch (typeOfEnergyPass) {
                              case '1':
                                info = '--bitte wählen--';
                                break;
                              case '3':
                                info = 'Verbrauchsausweis';
                                break;
                              case '2':
                                info = 'Bedarfsausweis';
                                break;
                            }
                            return info;
                          })()
                        )}
                      </li>
                      {listingType === 'For Rent' && (
                        <>
                          <li>{t('Nebenkosten')}: {t(additionalCost)}</li>
                          <li>{t('Heizkosten im Detail')}: {t(heatingCostinDetails)}</li>
                          <li>{t('Sicherheitskosten')}: {t(secuirityCost)}</li>
                        </>
                      )}
                    </>
                  )}
                </div>
                
                )}
                  {buildingType === 'OFFICE' && (
                  <div>
                  <li>
                    {t('Immobilienart')}:{' '}
                    {t(
                      (() => {
                        let info;
                        switch (formData.estatetype) {
                          case '05A':
                            info = 'Ausstellungsfläche';
                            break;
                          case '05E1':
                            info = 'Einkaufszentrum';
                            break;
                          case '05':
                            info = 'Einzelhandelsfläche';
                            break;
                          case '05E2':
                            info = 'Kaufhaus';
                            break;
                          case '05K':
                            info = 'Kiosk';
                            break;
                          case '05L':
                            info = 'Laden';
                            break;
                          case '05E':
                            info = 'SB-Markt';
                            break;
                          case '05LV':
                            info = 'Verkaufsfläche';
                            break;
                          case '05F':
                            info = 'Verkaufshalle';
                            break;
                          case '08B':
                            info = 'Bar';
                            break;
                          case '08C':
                            info = 'Café';
                            break;
                          case '08D':
                            info = 'Diskothek';
                            break;
                          case '08F':
                            info = 'Ferienimmobilie';
                            break;
                          case '08GAHS':
                            info = 'Gästehaus';
                            break;
                          case '08GAE':
                            info = 'Gaststätte';
                            break;
                          case '08HOT':
                            info = 'Hotel';
                            break;
                          case '08PENS':
                            info = 'Pension';
                            break;
                          case '08REST':
                            info = 'Restaurant';
                            break;
                          case '07H':
                            info = 'Halle';
                            break;
                          case '07LKÜ':
                            info = 'Kühlhaus';
                            break;
                          case '07L':
                            info = 'Lagerfläche';
                            break;
                          case '07LH':
                            info = 'Lagerhalle';
                            break;
                          case '07HI':
                            info = 'Produktionsfläche';
                            break;
                          case '07W':
                            info = 'Werkstattfläche';
                            break;
                          case '06A':
                            info = 'Atelier';
                            break;
                          case '06BUGE':
                            info = 'Büro- / Geschäftsgebäude';
                            break;
                          case '06BE':
                            info = 'Büroetage';
                            break;
                          case '06B':
                            info = 'Bürofläche';
                            break;
                          case '06':
                            info = 'Gewerbefläche';
                            break;
                          case '06G':
                            info = 'Gewerbezentrum';
                            break;
                          case '06P':
                            info = 'Praxis';
                            break;
                          case '06WOGE':
                            info = 'Wohn- / Geschäftsgebäude';
                            break;
                        }
                        return info;
                      })()
                    )}
                  </li>
                  <li>{t('Baujahr')}: {t(yearOfBuilding)}</li>
                  <li>
                    {t('Besondere Merkmale')}: {newBuilding && t('Neubau')}
                    {monumentProtection && t(', Denkmalschutz')}
                  </li>
                  <li>{t('Anzahl der Stockwerke')}: {t(numberOfFloors)}</li>
                  <li>{t('Gesamtfläche')}: {t(totalarea)}</li>
                  <li>{t('Anzahl der Zimmer')}: {t(numberOfBathrooms)}</li>
                  <li>{t('Anzahl der Schlafzimmer')}: {t(numberOfBedrooms)}</li>
                  <li>{t('Anzahl der Badezimmer')}: {t(numberOfBathrooms)}</li>
                  <li>{t('Nutzfläche')}: {t(usableArea)}</li>
                  <li>{t('Grundstücksfläche')}: {t(plotArea)}</li>
                  <li>{t('Anzahl der Garagen')}: {t(numberOfGarages)}</li>
                  <li>{t('Anzahl der Parkplätze')}: {t(numberOfParkingSpaces)}</li>
                
                  {energy === 'true' && (
                    <>
                      <li>{t('Energie')}: {t('Energie')}</li>
                      <li>{t('Energieausweis')}: {t(energyPass)}</li>
                      <li>{t('Energieeffizienzklasse')}: {t(energyEfficiencyClass)}</li>
                      <li>{t('Erstellungsdatum Energieausweis')}: {t(energyPassCreationDate)}</li>
                      <li>{t('Heizungsart')}: {t(typeOfHeating)}</li>
                      <li>
                        {t('Art des Energieausweises')}:{' '}
                        {t(
                          (() => {
                            let info;
                            switch (typeOfEnergyPass) {
                              case '1':
                                info = '--bitte wählen--';
                                break;
                              case '3':
                                info = 'Verbrauchsausweis';
                                break;
                              case '2':
                                info = 'Bedarfsausweis';
                                break;
                            }
                            return info;
                          })()
                        )}
                      </li>
                      {listingType === 'For Rent' && (
                        <>
                          <li>{t('Nebenkosten')}: {t(additionalCost)}</li>
                          <li>{t('Heizkosten im Detail')}: {t(heatingCostinDetails)}</li>
                          <li>{t('Sicherheitskosten')}: {t(secuirityCost)}</li>
                        </>
                      )}
                    </>
                  )}
                </div>
                
                )}
                {buildingType === 'SPECIAL_PURPOSE' && (
                  <div>
                  <li>
                    {t('Immobilienart')}:{' '}
                    {t(
                      (() => {
                        let info;
                        switch (formData.estatetype) {
                          case '05A':
                            info = 'Ausstellungsfläche';
                            break;
                          case '05E1':
                            info = 'Einkaufszentrum';
                            break;
                          case '05':
                            info = 'Einzelhandelsfläche';
                            break;
                          case '05E2':
                            info = 'Kaufhaus';
                            break;
                          case '05K':
                            info = 'Kiosk';
                            break;
                          case '05L':
                            info = 'Laden';
                            break;
                          case '05E':
                            info = 'SB-Markt';
                            break;
                          case '05LV':
                            info = 'Verkaufsfläche';
                            break;
                          case '05F':
                            info = 'Verkaufshalle';
                            break;
                          case '08B':
                            info = 'Bar';
                            break;
                          case '08C':
                            info = 'Café';
                            break;
                          case '08D':
                            info = 'Diskothek';
                            break;
                          case '08F':
                            info = 'Ferienimmobilie';
                            break;
                          case '08GAHS':
                            info = 'Gästehaus';
                            break;
                          case '08GAE':
                            info = 'Gaststätte';
                            break;
                          case '08HOT':
                            info = 'Hotel';
                            break;
                          case '08PENS':
                            info = 'Pension';
                            break;
                          case '08REST':
                            info = 'Restaurant';
                            break;
                          case '07H':
                            info = 'Halle';
                            break;
                          case '07LKÜ':
                            info = 'Kühlhaus';
                            break;
                          case '07L':
                            info = 'Lagerfläche';
                            break;
                          case '07LH':
                            info = 'Lagerhalle';
                            break;
                          case '07HI':
                            info = 'Produktionsfläche';
                            break;
                          case '07W':
                            info = 'Werkstattfläche';
                            break;
                          case '06A':
                            info = 'Atelier';
                            break;
                          case '06BUGE':
                            info = 'Büro- / Geschäftsgebäude';
                            break;
                          case '06BE':
                            info = 'Büroetage';
                            break;
                          case '06B':
                            info = 'Bürofläche';
                            break;
                          case '06':
                            info = 'Gewerbefläche';
                            break;
                          case '06G':
                            info = 'Gewerbezentrum';
                            break;
                          case '06P':
                            info = 'Praxis';
                            break;
                          case '06WOGE':
                            info = 'Wohn- / Geschäftsgebäude';
                            break;
                        }
                        return info;
                      })()
                    )}
                  </li>
                  <li>{t('Baujahr')}: {t(yearOfBuilding)}</li>
                  <li>
                    {t('Besondere Merkmale')}: {newBuilding && t('Neubau')}
                    {monumentProtection && t(', Denkmalschutz')}
                  </li>
                  <li>{t('Anzahl der Stockwerke')}: {t(numberOfFloors)}</li>
                  <li>{t('Gesamtfläche')}: {t(totalarea)}</li>
                  <li>{t('Anzahl der Zimmer')}: {t(numberOfBathrooms)}</li>
                  <li>{t('Anzahl der Schlafzimmer')}: {t(numberOfBedrooms)}</li>
                  <li>{t('Anzahl der Badezimmer')}: {t(numberOfBathrooms)}</li>
                  <li>{t('Nutzfläche')}: {t(usableArea)}</li>
                  <li>{t('Grundstücksfläche')}: {t(plotArea)}</li>
                  <li>{t('Anzahl der Garagen')}: {t(numberOfGarages)}</li>
                  <li>{t('Anzahl der Parkplätze')}: {t(numberOfParkingSpaces)}</li>
                
                  {energy === 'true' && (
                    <>
                      <li>{t('Energie')}: {t('Energie')}</li>
                      <li>{t('Energieausweis')}: {t(energyPass)}</li>
                      <li>{t('Energieeffizienzklasse')}: {t(energyEfficiencyClass)}</li>
                      <li>{t('Erstellungsdatum Energieausweis')}: {t(energyPassCreationDate)}</li>
                      <li>{t('Heizungsart')}: {t(typeOfHeating)}</li>
                      <li>
                        {t('Art des Energieausweises')}:{' '}
                        {t(
                          (() => {
                            let info;
                            switch (typeOfEnergyPass) {
                              case '1':
                                info = '--bitte wählen--';
                                break;
                              case '3':
                                info = 'Verbrauchsausweis';
                                break;
                              case '2':
                                info = 'Bedarfsausweis';
                                break;
                            }
                            return info;
                          })()
                        )}
                      </li>
                      {listingType === 'For Rent' && (
                        <>
                          <li>{t('Nebenkosten')}: {t(additionalCost)}</li>
                          <li>{t('Heizkosten im Detail')}: {t(heatingCostinDetails)}</li>
                          <li>{t('Sicherheitskosten')}: {t(secuirityCost)}</li>
                        </>
                      )}
                    </>
                  )}
                </div>
                
                )}
                {buildingType === 'INVESTMENT' && (
                <div>
                <li>
                  {t('Immobilienart')}:{' '}
                  {t(
                    (() => {
                      let info;
                      switch (formData.estatetype) {
                        case '04':
                          info = 'Anlage-/Investmentobjekte';
                          break;
                        case '04SIB':
                          info = 'Betreutes Wohnen (Invest.)';
                          break;
                        case '04GWB':
                          info = 'Bürogebäude (Invest.)';
                          break;
                        case '04W01':
                          info = 'Eigentumswohnung (Invest.)';
                          break;
                        case '04W02':
                          info = 'Einfamilienhaus (Invest.)';
                          break;
                        case '04HIE':
                          info = 'Einkaufszentrum (Invest.)';
                          break;
                        case '04HIF':
                          info = 'Fachmarktzentrum (Invest.)';
                          break;
                        case '04ZF':
                          info = 'Freizeitimmobilie (Invest.)';
                          break;
                        case '04GA':
                          info = 'Gaststätte / Gasthaus (Invest.)';
                          break;
                        case '04GWG':
                          info = 'Geschäftshaus, Handel, Büro (Invest.)';
                          break;
                        case '04GWA':
                          info = 'Gewerbeanwesen (Invest.)';
                          break;
                        case '04GWE':
                          info = 'Gewerbeeinheit (Invest.)';
                          break;
                        case '04GWH':
                          info = 'Halle/Lager (Invest.)';
                          break;
                        case '04HI':
                          info = 'Handelsimmobilien (Invest.)';
                          break;
                        case '04GAH':
                          info = 'Hotel (Invest.)';
                          break;
                        case '04GW':
                          info = 'Industrie- und Gewerbeimmobilien (Invest.)';
                          break;
                        case '04GWI':
                          info = 'Industrieanwesen (Invest.)';
                          break;
                        case '04HIK':
                          info = 'Kaufhaus (Invest.)';
                          break;
                        case '04SIK':
                          info = 'Klinik (Invest.)';
                          break;
                        case '04HIL':
                          info = 'Laden/Verkaufsfläche (Invest.)';
                          break;
                        case '04W03':
                          info = 'Mehrfamilienhaus (Invest.)';
                          break;
                        case '04ZP':
                          info = 'Parkhaus (Invest.)';
                          break;
                        case '04SIP':
                          info = 'Pflegeheim (Invest.)';
                          break;
                        case '04GWS':
                          info = 'Servicecenter (Invest.)';
                          break;
                        case '04Z':
                          info = 'Sonstiges (Invest.)';
                          break;
                        case '04SI':
                          info = 'Sozialimmobilien (Invest.)';
                          break;
                        case '04HIS':
                          info = 'Supermarkt (Invest.)';
                          break;
                        case '04W05':
                          info = 'Wohn-/Geschäftshaus (Invest.)';
                          break;
                        case '04W04':
                          info = 'Wohnanlage (Invest.)';
                          break;
                        case '04W':
                          info = 'Wohnimmobilien (Invest.)';
                          break;
                      }
                      return info;
                    })()
                  )}
                </li>
                <li>{t('Baujahr')}: {t(yearOfBuilding)}</li>
                <li>
                  {t('Besondere Merkmale')}: {newBuilding && t('Neubau')}
                  {monumentProtection && t(', Denkmalschutz')}
                </li>
                <li>{t('Vermietbare Fläche')}: {t(leasablearea)}</li>
                <li>{t('Anzahl der Stockwerke')}: {t(numberOfFloors)}</li>
                <li>{t('Anzahl der Zimmer')}: {t(numberOfRooms)}</li>
                <li>{t('Anzahl der Schlafzimmer')}: {t(numberOfBedrooms)}</li>
                <li>{t('Anzahl der Badezimmer')}: {t(numberOfBathrooms)}</li>
                <li>{t('Nutzfläche')}: {t(usableArea)}</li>
                <li>{t('Grundstücksfläche')}: {t(plotArea)}</li>
                <li>{t('Anzahl der Garagen')}: {t(numberOfGarages)}</li>
                <li>
                  {t('Art des Parkplatzes')}:{' '}
                  {t(
                    (() => {
                      let info;
                      switch (typeOfParkingSpace) {
                        case '1':
                          info = 'Nicht angegeben';
                          break;
                        case '2':
                          info = 'Garage';
                          break;
                        case '3':
                          info = 'Außenstellplatz';
                          break;
                        case '4':
                          info = 'Carport';
                          break;
                        case '6':
                          info = 'Parkgarage';
                          break;
                        case '7':
                          info = 'Tiefgarage';
                          break;
                      }
                      return info;
                    })()
                  )}
                </li>
                <li>{t('Anzahl der Parkplätze')}: {t(numberOfParkingSpaces)}</li>
              
                {energy === 'true' && (
                  <>
                    <li>{t('Energie')}: {t('Energie')}</li>
                    <li>{t('Energieausweis')}: {t(energyPass)}</li>
                    <li>{t('Energieeffizienzklasse')}: {t(energyEfficiencyClass)}</li>
                    <li>{t('Erstellungsdatum Energieausweis')}: {t(energyPassCreationDate)}</li>
                    <li>{t('Heizungsart')}:{' '}
                      {t(
                        (() => {
                          let info;
                          switch (typeOfHeating) {
                            case '':
                              info = '--bitte wählen--';
                              break;
                            case '02':
                              info = 'Ofenheizung';
                              break;
                            case '03':
                              info = 'Zentralheizung';
                              break;
                            case '01':
                              info = 'Fußbodenheizung';
                              break;
                            case 'FUS':
                              info = 'Fußbodenheizung (alt)';
                              break;
                          }
                          return info;
                        })()
                      )}
                    </li>
                    <li>
                      {t('Art des Energieausweises')}:{' '}
                      {t(
                        (() => {
                          let info;
                          switch (typeOfEnergyPass) {
                            case '1':
                              info = '--bitte wählen--';
                              break;
                            case '3':
                              info = 'Verbrauchsausweis';
                              break;
                            case '2':
                              info = 'Bedarfsausweis';
                              break;
                          }
                          return info;
                        })()
                      )}
                    </li>
                    {listingType === 'For Rent' && (
                      <>
                        <li>{t('Nebenkosten')}: {t(additionalCost)}</li>
                        <li>{t('Heizkosten im Detail')}: {t(heatingCostinDetails)}</li>
                        <li>{t('Sicherheitskosten')}: {t(secuirityCost)}</li>
                      </>
                    )}
                  </>
                )}
              </div>
              
                )}
                  {buildingType === 'TRADE_SITE' && (
                 <div>
                 <li>
                   {t('Immobilienart')}:{' '}
                   {t(
                     (() => {
                       let info;
                       switch (formData.estatetype) {
                         case '04':
                           info = 'Anlage-/Investmentobjekte';
                           break;
                         case '04SIB':
                           info = 'Betreutes Wohnen (Invest.)';
                           break;
                         case '04GWB':
                           info = 'Bürogebäude (Invest.)';
                           break;
                         case '04W01':
                           info = 'Eigentumswohnung (Invest.)';
                           break;
                         case '04W02':
                           info = 'Einfamilienhaus (Invest.)';
                           break;
                         case '04HIE':
                           info = 'Einkaufszentrum (Invest.)';
                           break;
                         case '04HIF':
                           info = 'Fachmarktzentrum (Invest.)';
                           break;
                         case '04ZF':
                           info = 'Freizeitimmobilie (Invest.)';
                           break;
                         case '04GA':
                           info = 'Gaststätte / Gasthaus (Invest.)';
                           break;
                         case '04GWG':
                           info = 'Geschäftshaus, Handel, Büro (Invest.)';
                           break;
                         case '04GWA':
                           info = 'Gewerbeanwesen (Invest.)';
                           break;
                         case '04GWE':
                           info = 'Gewerbeeinheit (Invest.)';
                           break;
                         case '04GWH':
                           info = 'Halle/Lager (Invest.)';
                           break;
                         case '04HI':
                           info = 'Handelsimmobilien (Invest.)';
                           break;
                         case '04GAH':
                           info = 'Hotel (Invest.)';
                           break;
                         case '04GW':
                           info = 'Industrie- und Gewerbeimmobilien (Invest.)';
                           break;
                         case '04GWI':
                           info = 'Industrieanwesen (Invest.)';
                           break;
                         case '04HIK':
                           info = 'Kaufhaus (Invest.)';
                           break;
                         case '04SIK':
                           info = 'Klinik (Invest.)';
                           break;
                         case '04HIL':
                           info = 'Laden/Verkaufsfläche (Invest.)';
                           break;
                         case '04W03':
                           info = 'Mehrfamilienhaus (Invest.)';
                           break;
                         case '04ZP':
                           info = 'Parkhaus (Invest.)';
                           break;
                         case '04SIP':
                           info = 'Pflegeheim (Invest.)';
                           break;
                         case '04GWS':
                           info = 'Servicecenter (Invest.)';
                           break;
                         case '04Z':
                           info = 'Sonstiges (Invest.)';
                           break;
                         case '04SI':
                           info = 'Sozialimmobilien (Invest.)';
                           break;
                         case '04HIS':
                           info = 'Supermarkt (Invest.)';
                           break;
                         case '04W05':
                           info = 'Wohn-/Geschäftshaus (Invest.)';
                           break;
                         case '04W04':
                           info = 'Wohnanlage (Invest.)';
                           break;
                         case '04W':
                           info = 'Wohnimmobilien (Invest.)';
                           break;
                       }
                       return info;
                     })()
                   )}
                 </li>
                 <li>{t('Baujahr')}: {t(yearOfBuilding)}</li>
                 <li>
                   {t('Besondere Merkmale')}: {newBuilding && t('Neubau')}
                   {monumentProtection && t(', Denkmalschutz')}
                 </li>
                 <li>{t('Vermietbare Fläche')}: {t(leasablearea)}</li>
                 <li>{t('Anzahl der Stockwerke')}: {t(numberOfFloors)}</li>
                 <li>{t('Anzahl der Zimmer')}: {t(numberOfRooms)}</li>
                 <li>{t('Anzahl der Schlafzimmer')}: {t(numberOfBedrooms)}</li>
                 <li>{t('Anzahl der Badezimmer')}: {t(numberOfBathrooms)}</li>
                 <li>{t('Nutzfläche')}: {t(usableArea)}</li>
                 <li>{t('Grundstücksfläche')}: {t(plotArea)}</li>
                 <li>{t('Anzahl der Garagen')}: {t(numberOfGarages)}</li>
                 <li>
                   {t('Art des Parkplatzes')}:{' '}
                   {t(
                     (() => {
                       let info;
                       switch (typeOfParkingSpace) {
                         case '1':
                           info = 'Nicht angegeben';
                           break;
                         case '2':
                           info = 'Garage';
                           break;
                         case '3':
                           info = 'Außenstellplatz';
                           break;
                         case '4':
                           info = 'Carport';
                           break;
                         case '6':
                           info = 'Parkgarage';
                           break;
                         case '7':
                           info = 'Tiefgarage';
                           break;
                       }
                       return info;
                     })()
                   )}
                 </li>
                 <li>{t('Anzahl der Parkplätze')}: {t(numberOfParkingSpaces)}</li>
               
                 {energy === 'true' && (
                   <>
                     <li>{t('Energie')}: {t('Energie')}</li>
                     <li>{t('Energieausweis')}: {t(energyPass)}</li>
                     <li>{t('Energieeffizienzklasse')}: {t(energyEfficiencyClass)}</li>
                     <li>{t('Erstellungsdatum Energieausweis')}: {t(energyPassCreationDate)}</li>
                     <li>{t('Heizungsart')}:{' '}
                       {t(
                         (() => {
                           let info;
                           switch (typeOfHeating) {
                             case '':
                               info = '--bitte wählen--';
                               break;
                             case '02':
                               info = 'Ofenheizung';
                               break;
                             case '03':
                               info = 'Zentralheizung';
                               break;
                             case '01':
                               info = 'Fußbodenheizung';
                               break;
                             case 'FUS':
                               info = 'Fußbodenheizung (alt)';
                               break;
                           }
                           return info;
                         })()
                       )}
                     </li>
                     <li>
                       {t('Art des Energieausweises')}:{' '}
                       {t(
                         (() => {
                           let info;
                           switch (typeOfEnergyPass) {
                             case '1':
                               info = '--bitte wählen--';
                               break;
                             case '3':
                               info = 'Verbrauchsausweis';
                               break;
                             case '2':
                               info = 'Bedarfsausweis';
                               break;
                           }
                           return info;
                         })()
                       )}
                     </li>
                     {listingType === 'For Rent' && (
                       <>
                         <li>{t('Nebenkosten')}: {t(additionalCost)}</li>
                         <li>{t('Heizkosten im Detail')}: {t(heatingCostinDetails)}</li>
                         <li>{t('Sicherheitskosten')}: {t(secuirityCost)}</li>
                       </>
                     )}
                   </>
                 )}
               </div>
               
                )}
               {(!energy || energy === 'false') && (
  <li>
    {t('Energieausweis vorhanden')}: {t('Kein Energieausweis')}
  </li>
)}

<li>
  {t('Energiequelle')}:{' '}
  {t(
    (() => {
      let info;
      switch (energySource) {
        case 'ol':
          info = 'Öl';
          break;
        case 'ga':
          info = 'Gas';
          break;
        case 'er':
          info = 'Geothermie';
          break;
        case 'fe':
          info = 'Fernwärme';
          break;
        case 'so':
          info = 'Solar';
          break;
        case 'HO2':
          info = 'Holzpellets';
          break;
        case 'st':
          info = 'Strom';
          break;
        case 'ko':
          info = 'Kohle';
          break;
        case 'HO1':
          info = 'Holz';
          break;
        default:
          info = 'Unbekannt';
      }
      return info;
    })()
  )}
</li>

              </ul>
              <Button
                layout='outline'
                iconRight={EditIcon}
                aria-label='Edit'
                className='mt-4'
                component='span'
                onClick={() => {
                  go('details');
                  setReviewMode(true);
                }}
              >
                {t('Zum Bearbeiten klicken')}
              </Button>
              <div></div>
            </div>
          )}
        </div>
        <div className='block mb-4'>
  <RenderAccordion
    setReviewMode={setReviewMode}
    serial='3'
    summary='Beschreibung'  
    back="description" 
    go={go}
    details={[
      { Beschreibung: description },                
      { Merkmale: features },                       
      { Standort: location },                      
      { 'Zusätzliche Beschreibung': additionalDescription },  
    ]}
  />
</div>
        <div className='block mb-4'>
          <Button
            layout='link'
            className='w-full rounded-lg justify-between flex hover:bg-gray-50 py-4 ring-1 ring-black ring-opacity-5 overflow-hidden bg-white dark:bg-gray-800 text-gray-600 text-sm text-left font-medium'
            size='large'
            onClick={() => setAccordionTwo(!accordionTwo)}
          >
            <span>4 .</span> {t('Bilder')}
            <DropdownIcon className='w-4' />
          </Button>
          {accordionTwo && (
            <div>
              <div className='flex flex-wrap my-5'>
                {renderPhotos(
                  imgMultiStepForm.showType,
                  imgMultiStepForm.formValuesType
                )}
              </div>
              <div className='flex flex-wrap my-5'>
                {renderPhotos(
                  planMultiStepForm.showType,
                  planMultiStepForm.formValuesType
                )}
              </div>
              <Button
                layout='outline'
                iconRight={EditIcon}
                aria-label='Edit'
                className='mt-5'
                component='span'
                onClick={() => {
                  go('images');
                  setReviewMode(true);
                }}
              >
                {t('Zum Bearbeiten klicken')}
              </Button>
            </div>
          )}
        </div>
        <div className='block mb-4'>
  <RenderAccordion
    setReviewMode={setReviewMode}
    serial='5'
    summary='Kontakt' 
    back="contact" 
    go={go}
    details={[
      { 'Vorname': contactName },      
      { 'Nachname': lastName },         
      { 'Name verbergen': nameHide },    
      { 'E-Mail': formEmail },           
      { 'Telefon': phone },            
    ]}
  />
</div>

        <div className='block'>
  <RenderAccordion
    setReviewMode={setReviewMode}
    serial='6'
    summary='Adresse'
    back="address"
    go={go}
    details={[
      { 'Adresse': address },
      { 'Postleitzahl': zip },
      { 'Stadt': city },
      { 'Adresse verbergen': hideAddress },
    ]}
  />
</div>

<div className='mt-2'>
          {maxCharacters && (
            <div style={{ color: 'red' }}>
              Max 3800 characters on every field
            </div>
          )}
          {maxFiles && (
            <div style={{ color: 'red' }}>
              Max 50 pictures / 10 floorplans / 20MB
            </div>
          )}
          <Button
            layout='link'
            color='secondary'
            variant='contained'
            style={{ marginRight: '1rem' }}
            onClick={() => {
              navigation.previous(-1);
              my_swiper.slidePrev(-1);
            }}
          >
            {t('Zurück')}
          </Button>
          
          <Button
            variant='contained'
            style={{ marginTop: '1.5rem' }}
            onClick={handleSubmit}
          >
           {t("Speichern und fortfahren")}
          </Button>


          {/* {loading && (
            <lottie-player
              autoplay
              loop
              mode='normal'
              src={Loading}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                background: '#fff',
                zIndex: 30,
              }}
            ></lottie-player>
          )} */}
        </div>
      </>
    </div>
  );
};

const RenderAccordion = ({ summary, back, details, go, setReviewMode, serial }) => {
  const [accordion, setAccordion] = useState(false);
  const { t } = useTranslation();
  return (
    <>
      <Button
        layout='link'
        className='w-full mt-0 rounded-lg justify-between flex hover:bg-gray-50 py-4 ring-1 ring-black ring-opacity-5 overflow-hidden bg-white dark:bg-gray-200 dark:text-gray-500 text-gray-600 text-sm text-left font-medium'
        size='large'
        onClick={() => setAccordion(!accordion)}
      >
        <span>{serial}.</span> {t(summary)} <DropdownIcon className='w-4' />
      </Button>
      {accordion && (
        <div>
          <ul className='my-3 break-all'>
            {details.map((data, index) => {
              const objKey = Object.keys(data)[0];
              const objValue = String(data[Object.keys(data)[0]]);
              return (
                <li className='' key={index}>{`${t(objKey)}: ${objValue}`}</li>
              );
            })}
          </ul>
          <Button
            iconRight={EditIcon}
            layout='outline'
            className=''
            component='span'
            onClick={() => {
              go(`${back.toLowerCase()}`);
              setReviewMode(true);
            }}
          >
            {t('Zum Bearbeiten klicken')}
          </Button>
        </div>
      )}
    </>
  );
};