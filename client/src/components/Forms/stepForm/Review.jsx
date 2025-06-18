import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@windmill/react-ui';
import { EditIcon, DropdownIcon } from '../../../icons';
import axios from 'axios';
import { config } from '../../../assets/config/config';
import { AuthContext } from '../../../context/AuthContext';
import {  useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { flowFactService } from '../../../services/flowfact.service';
import { SnackbarContext } from '../../../context/SnackbarContext';
import * as LottiePlayer from '@lottiefiles/lottie-player';
import Loading from '../../../assets/animation/loading.txt';
import { Box, LinearProgress, Typography } from '@mui/material';
import UploadImageToCloudinary from '../../CloudinaryUpload/ImageUpload';

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
    flowFactData,
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

  function buildFormData(formData, data, parentKey) {
    if (
      data &&
      typeof data === 'object' &&
      !(data instanceof Date) &&
      !(data instanceof File)
    ) {
      Object.keys(data).forEach((key) => {
        buildFormData(
          formData,
          data[key],
          parentKey ? `${parentKey}[${key}]` : key
        );
      });
    } else {
      const value = data == null ? '' : data;
      if (value === '') {
        delete parentKey.value;
      } else {
        formData.append(parentKey, value);
      }
    }
  }

  const handleSubmit = async () => {
    openSnackbar(t('Creating UserList'));
    setIsSnackbarOpen(true);

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

    //request uniqId
    let reqUniqId = await axios.post(
      `${apiUrl}/userList/create?uniqId=true`,
      {
        email,
      }
    );
    let uniqId = reqUniqId.data.data.uniqId;
    let listNumber = reqUniqId.data.data.listNumber;
    const data = { ...formData, email, uniqId, listNumber };

    if (formData.energy === 'true') {
      data.energy = true;
    } else {
      data.energy = false;
    }
    // let oldDate = Date.now();

    let info = flowFactData?.flowFactInfo;

    if (!info) {
      info = await flowFactService.publishImagesToFlowFact(
        Object.assign(data, { phone }),
        imgMultiStepForm,
        planMultiStepForm,
        openSnackbar,
        t,
        setLoadingTitle,
        setCurrentImgIdx,
        setCurrentImgForm,
        setProgressValue
      );
    }

    data.entityId = info.entityId;
    data.schema_name = info.schema_name;
    data.flowfactContactId = info.contactId;
    data.listingPrice = data.listingPrice.replace(/\./g, '');
    data.rentPrice = data.rentPrice.replace(/\./g, '');
    data.newBuilding = data.newBuilding === "" ? false : data.newBuilding === "true" ? true : false;
    data.monumentProtection = data.monumentProtection === "" ? false : data.monumentProtection === "true" ? true : false;

    const sendData = new FormData();
    await buildFormData(
      sendData,
      Object.assign(data, { phone })
    );

    axios
      .post(`${apiUrl}/userList/create`, sendData)
      .then((response) => {
        console.log('response', response);
        setListData(response.data.data);
        // openSnackbar(t('List Is Created'), 'success', 3000);
        setLoading(false);
        // setEnabled(true);

        setIsSnackbarOpen(false)
        my_swiper.slideNext();
        go('submit');
        return;
      })
      .catch((error) => {
        console.log(error);
        openSnackbar(
          t(error.message || 'Something Went Very Wrong!'),
          'danger',
          2000
        );
      })
      .finally(() => {
        console.log("I was in finally block in Review.js handleSubmit")
        localStorage.removeItem('formData');
        localStorage.removeItem('entityId');
        // localStorage.removeItem('imgMultiStepForm');
        // localStorage.removeItem('planMultiStepForm');

        setTimeout(() => {
          localStorage.removeItem('imgMultiStepForm');
          localStorage.removeItem('planMultiStepForm');
        }, 100); 
        console.log("After clearing local in Review.js handleSubmit");
      });
  };

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
            go={go}
            details={[
              { 'Listing Title': listingTitle ? listingTitle : '' },
              { 'Listing Type': listingType ? t(listingType) : '' },
              { 'Building Type': buildingType ? t(buildingType) : '' },
              `${listingType}` === 'For Sale'
                ? {
                  listingPrice: listingPrice
                    ? numberWithCommas(listingPrice) + ' €'
                    : '',
                }
                : {
                  rentPrice: rentPrice
                    ? numberWithCommas(rentPrice) + ' €'
                    : '',
                },
              { 'Contact Type': contactType ? t(contactType) : '' },
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
                {buildingType === 'House' && (
                  <div>
                    <li className=''>
                      {t('Haustyp')}:{' '}
                      {t(
                        (() => {
                          let info;
                          switch (specificBuildingType) {
                            case '02EFH':
                              info = 'Detached House';
                              break;
                            case '02DHH':
                              info = 'Semi Detached House';
                              break;
                            case '02REH':
                              info = 'Town House';
                              break;
                            case '02MFH':
                              info = 'Multi Family House';
                              break;
                            case '02ZB':
                              info = 'Holiday House';
                              break;
                            case '02BNG':
                              info = 'Bungalow';
                              break;
                          }
                          return info;
                        })()
                      )}
                    </li>
                    <li>
                      {t('Year Of Building')}: {t(yearOfBuilding)}
                    </li>
                    <li>
                      {t('Special Features')}:{' '}
                      {newBuilding && t('New Building')}
                      {monumentProtection && t(', Monument Protection')}
                    </li>
                    <li>
                      {t('Living Area')}: {t(livingArea)}
                    </li>
                    <li>
                      {t('Usable Area')}: {t(usableArea)}
                    </li>
                    <li>
                      {t('Plot Area')}: {t(plotArea)}
                    </li>
                    <li>
                      {t('Number of Floors')}: {t(numberOfFloors)}
                    </li>
                    <li>
                      {t('Number of Rooms')}: {t(numberOfBathrooms)}
                    </li>
                    <li>
                      {t('Number of Bedrooms')}: {t(numberOfBedrooms)}
                    </li>
                    <li>
                      {t('Number of Bathrooms')}: {t(numberOfBathrooms)}
                    </li>
                    <li>
                      {t('Number of Garages')}: {t(numberOfGarages)}
                    </li>
                    <li>
                      {t('Type Of Parking Space')}:{' '}
                      {t(
                        (() => {
                          let info;
                          switch (typeOfParkingSpace) {
                            case '1':
                              info = 'Not specified';
                              break;
                            case '2':
                              info = 'Garage';
                              break;
                            case '3':
                              info = 'outdoor parking space';
                              break;
                            case '4':
                              info = 'Carport';
                              break;
                            case '6':
                              info = 'parking garage';
                              break;
                            case '7':
                              info = 'underground car park';
                              break;
                          }
                          return info;
                        })()
                      )}
                    </li>
                    <li>
                      {t('Number Of Parking Space')}: {t(numberOfParkingSpaces)}
                    </li>
                    {energy === 'true' && (
                      <>
                        <li>
                          {t('Energy Pass Available')}: {t('Energy')}
                        </li>
                        <li>
                          {t('Energy Pass')}: {t(energyPass)}
                        </li>
                        <li>
                          {t('Energy Efficiency Class')}:{' '}
                          {t(
                            (() => {
                              let info;
                              switch (energyEfficiencyClass) {
                                case '00':
                                  info = '--please choose--';
                                  break;
                                case '01':
                                  info = 'A';
                                  break;
                                case '02':
                                  info = 'A+';
                                  break;
                                case '03':
                                  info = 'B';
                                  break;
                                case '04':
                                  info = 'C';
                                  break;
                                case '05':
                                  info = 'D';
                                  break;
                                case '06':
                                  info = 'E';
                                  break;
                                case '07':
                                  info = 'F';
                                  break;
                                case '08':
                                  info = 'G';
                                  break;
                                case '09':
                                  info = 'H';
                                  break;
                              }
                              return info;
                            })()
                          )}
                        </li>
                        <li>
                          {t('energy Pass Creation Date')}:{' '}
                          {t(energyPassCreationDate)}
                        </li>
                        <li>
                          {t('Type Of Heating')}:{' '}
                          {t(
                            (() => {
                              let info;
                              switch (typeOfHeating) {
                                case '02':
                                  info = t('Furnace heating');
                                  break;
                                case '03':
                                  info = t('Central heating');
                                  break;
                                case '01':
                                  info = t('Floor heating');
                                  break;
                                case 'FUS':
                                  info = t('Underfloor heating');
                                  break;
                              }
                              return info;
                            })()
                          )}
                        </li>
                        <li>
                          {t('Type Of Energypass')}:{' '}
                          {t(
                            (() => {
                              let info;
                              switch (typeOfEnergyPass) {
                                case '1':
                                  info = '--please choose--';
                                  break;
                                case '3':
                                  info = t('consumption pass');
                                  break;
                                case '2':
                                  info = t('require pass');
                                  break;
                              }
                              return info;
                            })()
                          )}
                        </li>
                        {listingType === 'For Rent' && (
                          <>
                            <li>
                              {t('additionalCost')}: {t(additionalCost)}
                            </li>
                            <li>
                              {t('heating cost in details')}:{' '}
                              {t(heatingCostinDetails)}
                            </li>
                            <li>
                              {t('security cost')} {t(secuirityCost)}
                            </li>
                          </>
                        )}
                      </>
                    )}
                  </div>
                )}
                {buildingType === 'Flat' && (
                  <div>
                    <li className=''>
                      {t('Specific Flat Type')}:{' '}
                      {t(
                        (() => {
                          let info;
                          switch (specificBuildingType) {
                            case '01ETAG':
                              info = 'Floor';
                              break;
                            case '01SOUT':
                              info = 'Basement';
                              break;
                            case '01GERD':
                              info = 'Ground Floor';
                              break;
                            case '01DACH':
                              info = 'Top Floor';
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
                    <li>
                      {t('Year Of Building')}: {t(yearOfBuilding)}
                    </li>
                    <li>
                      {t('Living Area')}: {t(livingArea)}
                    </li>
                    <li>
                      {t('Special Features')}:{' '}
                      {newBuilding && t('New Building')}
                      {monumentProtection && t(', Monument Protection')}
                    </li>
                    <li>
                      {t('Number of Rooms')}: {t(numberOfRooms)}
                    </li>
                    <li>
                      {t('Number of Bathrooms')}: {t(numberOfBathrooms)}
                    </li>
                    <li>
                      {t('Number of Bedrooms')}: {t(numberOfBedrooms)}
                    </li>
                    <li>
                      {t('Floor')}: {t(floor)}
                    </li>
                    <li>
                      {t('Monthly Housepayment')}: {t(monthlyHousepayment)}
                    </li>
                    <li>
                      {t('Type Of Parking Space')}:{' '}
                      {t(
                        (() => {
                          let info;
                          switch (typeOfParkingSpace) {
                            case '1':
                              info = 'Not specified';
                              break;
                            case '2':
                              info = 'Garage';
                              break;
                            case '3':
                              info = 'outdoor parking space';
                              break;
                            case '4':
                              info = 'Carport';
                              break;
                            case '6':
                              info = 'parking garage';
                              break;
                            case '7':
                              info = 'underground car park';
                              break;
                          }
                          return info;
                        })()
                      )}
                    </li>
                    <li>
                      {t('Parking Space Price')}: {t(parkingSpacePrice)}
                    </li>
                    {energy === 'true' && (
                      <>
                        <li>
                          {t('Energy')}: {t('Energy')}
                        </li>
                        <li>
                          {t('Energy Pass')}: {t(energyPass)}
                        </li>
                        <li>
                          {t('Energy Efficiency Class')}:{' '}
                          {t(energyEfficiencyClass)}
                        </li>
                        <li>
                          {t('energy Pass Creation Date')}:{' '}
                          {t(energyPassCreationDate)}
                        </li>
                        <li>
                          {t('Type Of Heating')}: {t(typeOfHeating)}
                        </li>
                        <li>
                          {t('Type Of Energypass')}:{' '}
                          {t(
                            (() => {
                              let info;
                              switch (typeOfEnergyPass) {
                                case '1':
                                  info = '--please choose--';
                                  break;
                                case '3':
                                  info = 'consumption pass';
                                  break;
                                case '2':
                                  info = 'require pass';
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
                        <li>
                          {t('additionalCost')}: {t(additionalCost)}
                        </li>
                        <li>
                          {t('heating cost in details')}:{' '}
                          {t(heatingCostinDetails)}
                        </li>
                        <li>
                          {t('security cost')} {t(secuirityCost)}
                        </li>
                      </>
                    )}
                  </div>
                )}
                {buildingType === 'Land' && (
                  <div>
                    <li>
                      {t('Specific Land Type')}:{' '}
                      {t(
                        (() => {
                          let info;
                          switch (specificBuildingType) {
                            case '0':
                              info = 'Building Land';
                              break;
                            case '1':
                              info = 'Acre Land';
                              break;
                            case '2':
                              info = 'Forrest';
                              break;
                          }
                          return info;
                        })()
                      )}
                    </li>
                    <li>
                      {t('Land Area')}: {t(landArea)}
                    </li>
                    <li>
                      {t('State of Development')}:{' '}
                      {t(
                        (() => {
                          let info;
                          switch (stateOfDevelopment) {
                            case 'NE':
                              info = 'Not developed';
                              break;
                            case 'TE':
                              info = 'Partially developed';
                              break;
                            case 'VE':
                              info = 'Fully developed';
                              break;
                          }
                          return info;
                        })()
                      )}
                    </li>
                    {energy === 'true' && (
                      <>
                        <li>
                          {t('Energy')}: {t('Energy')}
                        </li>
                        <li>
                          {t('Energy Pass')}: {t(energyPass)}
                        </li>
                        <li>
                          {t('Energy Efficiency Class')}:{' '}
                          {t(energyEfficiencyClass)}
                        </li>
                        <li>
                          {t('energy Pass Creation Date')}:{' '}
                          {t(energyPassCreationDate)}
                        </li>
                        <li>
                          {t('Type Of Heating')}: {t(typeOfHeating)}
                        </li>
                        <li>
                          {t('Type Of Energypass')}:{' '}
                          {t(
                            (() => {
                              let info;
                              switch (typeOfEnergyPass) {
                                case '1':
                                  info = '--please choose--';
                                  break;
                                case '3':
                                  info = 'consumption pass';
                                  break;
                                case '2':
                                  info = 'require pass';
                                  break;
                              }
                              return info;
                            })()
                          )}
                        </li>
                        {listingType === 'For Rent' && (
                          <>
                            <li>
                              {t('Additional Cost')}: {t(additionalCost)}
                            </li>
                            <li>
                              {t('Heating Cost in Details')}:{' '}
                              {t(heatingCostinDetails)}
                            </li>
                            <li>
                              {t('Secuirity Cost')}: {t(secuirityCost)}
                            </li>
                          </>
                        )}
                      </>
                    )}
                  </div>
                )}
                {buildingType === 'Commercial' && (
                  <div>
                    <li>
                      {t('Estate Type')}:{' '}
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
                    <li>
                      {t('Year Of Building')}: {t(yearOfBuilding)}
                    </li>
                    <li>
                      {t('Special Features')}:{' '}
                      {newBuilding && t('New Building')}
                      {monumentProtection && t(', Monument Protection')}
                    </li>
                    <li>
                      {t('Number of Floors')}: {t(numberOfFloors)}
                    </li>
                    <li>
                      {t('Total Area')}: {t(totalarea)}
                    </li>
                    <li>
                      {t('Number of Rooms')}: {t(numberOfBathrooms)}
                    </li>
                    <li>
                      {t('Number of Bedrooms')}: {t(numberOfBedrooms)}
                    </li>
                    <li>
                      {t('Number of Bathrooms')}: {t(numberOfBathrooms)}
                    </li>
                    <li>
                      {t('Usable Area')}: {t(usableArea)}
                    </li>
                    <li>
                      {t('Plot Area')} : {t(plotArea)}
                    </li>
                    <li>
                      {t('Number of Garages')}: {t(numberOfGarages)}
                    </li>
                    <li>
                      {t('Number of Parking Spaces')}:{' '}
                      {t(numberOfParkingSpaces)}
                    </li>
                    {energy === 'true' && (
                      <>
                        <li>
                          {t('Energy')}: {t('Energy')}
                        </li>
                        <li>
                          {t('Energy Pass')}: {t(energyPass)}
                        </li>
                        <li>
                          {t('Energy Efficiency Class')}:{' '}
                          {t(energyEfficiencyClass)}
                        </li>
                        <li>
                          {t('energy Pass Creation Date')}:{' '}
                          {t(energyPassCreationDate)}
                        </li>
                        <li>
                          {t('Type Of Heating')}: {t(typeOfHeating)}
                        </li>
                        <li>
                          {t('Type Of Energypass')}:{' '}
                          {t(
                            (() => {
                              let info;
                              switch (typeOfEnergyPass) {
                                case '1':
                                  info = '--please choose--';
                                  break;
                                case '3':
                                  info = 'consumption pass';
                                  break;
                                case '2':
                                  info = 'require pass';
                                  break;
                              }
                              return info;
                            })()
                          )}
                        </li>
                        {listingType === 'For Rent' && (
                          <>
                            <li>
                              {t('Additional Cost')}: {t(additionalCost)}
                            </li>
                            <li>
                              {t('Heating Cost in Details')}:{' '}
                              {t(heatingCostinDetails)}
                            </li>
                            <li>
                              {t('Secuirity Cost')}: {t(secuirityCost)}
                            </li>
                          </>
                        )}
                      </>
                    )}
                  </div>
                )}
                {buildingType === 'Investment' && (
                  <div>
                    <li>
                      {t('Estate Type')}:{' '}
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
                              info =
                                'Industrie- und Gewerbeimmobilien (Invest.)';
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
                    <li>
                      {t('Year Of Building')}: {t(yearOfBuilding)}
                    </li>
                    <li>
                      {t('Special Features')}:{' '}
                      {newBuilding && t('New Building')}
                      {monumentProtection && t(', Monument Protection')}
                    </li>
                    <li>
                      {t('Leasable Area')}: {t(leasablearea)}
                    </li>
                    <li>
                      {t('Number of Floors')}: {t(numberOfFloors)}
                    </li>
                    <li>
                      {t('Number of Rooms')}: {t(numberOfRooms)}
                    </li>
                    <li>
                      {t('Number of Bedrooms')}: {t(numberOfBedrooms)}
                    </li>
                    <li>
                      {t('Number of Bathrooms')}: {t(numberOfBathrooms)}
                    </li>
                    <li>
                      {t('Usable Area')}: {t(usableArea)}
                    </li>
                    <li>
                      {t('Plot Area')}: {t(plotArea)}
                    </li>
                    <li>
                      {t('Number of Garages')}: {t(numberOfGarages)}
                    </li>
                    <li>
                      {t('Type Of Parking Space')}:{' '}
                      {t(
                        (() => {
                          let info;
                          switch (typeOfParkingSpace) {
                            case '1':
                              info = 'Not specified';
                              break;
                            case '2':
                              info = 'Garage';
                              break;
                            case '3':
                              info = 'outdoor parking space';
                              break;
                            case '4':
                              info = 'Carport';
                              break;
                            case '6':
                              info = 'parking garage';
                              break;
                            case '7':
                              info = 'underground car park';
                              break;
                          }
                          return info;
                        })()
                      )}
                    </li>
                    <li>
                      {t('Number of Parking Spaces')}:{' '}
                      {t(numberOfParkingSpaces)}
                    </li>
                    {energy === 'true' && (
                      <>
                        <li>
                          {t('Energy')}: {t('Energy')}
                        </li>
                        <li>
                          {t('Energy Pass')}: {t(energyPass)}
                        </li>
                        <li>
                          {t('Energy Efficiency Class')}:{' '}
                          {t(energyEfficiencyClass)}
                        </li>
                        <li>
                          {t('energy Pass Creation Date')}:{' '}
                          {t(energyPassCreationDate)}
                        </li>
                        <li>
                          {t('Type Of Heating')}:{' '}
                          {t(
                            (() => {
                              let info;
                              switch (typeOfHeating) {
                                case '':
                                  info = '--please choose--';
                                  break;
                                case '02':
                                  info = 'Furnace heating';
                                  break;
                                case '03':
                                  info = 'Central heating';
                                  break;
                                case '01':
                                  info = 'Floor heating';
                                  break;
                                case 'FUS':
                                  info = 'Underfloor heating';
                                  break;
                              }
                              return info;
                            })()
                          )}
                        </li>
                        <li>
                          {t('Type Of Energypass')}:{' '}
                          {t(
                            (() => {
                              let info;
                              switch (typeOfEnergyPass) {
                                case '1':
                                  info = '--please choose--';
                                  break;
                                case '3':
                                  info = 'consumption pass';
                                  break;
                                case '2':
                                  info = 'require pass';
                                  break;
                              }
                              return info;
                            })()
                          )}
                        </li>
                        {listingType === 'For Rent' && (
                          <>
                            <li>
                              {t('Additional Cost')}: {t(additionalCost)}
                            </li>
                            <li>
                              {t('Heating Cost in Details')}:{' '}
                              {t(heatingCostinDetails)}
                            </li>
                            <li>
                              {t('Secuirity Cost')}: {t(secuirityCost)}
                            </li>
                          </>
                        )}
                      </>
                    )}
                  </div>
                )}
                {(!energy || energy === 'false') && (
                  <li>
                    {t('Energy Pass Available')}: {t('No Energy')}
                  </li>
                )}
                <li>
                  {t('energySource')}:{' '}
                  {t(
                    (() => {
                      let info;
                      switch (energySource) {
                        case 'ol':
                          info = 'oil';
                          break;
                        case 'ga':
                          info = 'Gas';
                          break;
                        case 'er':
                          info = 'Geothermal energy';
                          break;
                        case 'fe':
                          info = 'District heating';
                          break;
                        case 'so':
                          info = 'Solar';
                          break;
                        case 'HO2':
                          info = 'Wood pellets';
                          break;
                        case 'st':
                          info = 'Strom';
                          break;
                        case 'ko':
                          info = 'money';
                          break;
                        case 'HO1':
                          info = 'wood';
                          break;
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
                {t('click to edit')}
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
            go={go}
            details={[
              { Description: description },
              { Features: features },
              { Loaction: location },
              { 'additional Description': additionalDescription },
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
                {t('click to edit')}
              </Button>
            </div>
          )}
        </div>
        <div className='block mb-4'>
          <RenderAccordion
            setReviewMode={setReviewMode}
            serial='5'
            summary='Ansprechpartner'
            go={go}
            details={[
              { 'Contact Name': contactName },
              { 'Last Name': lastName },
              { 'Name Hide': nameHide },
              { Email: formEmail },
              { Phone: phone },
            ]}
          />
        </div>
        <div className='block'>
          <RenderAccordion
            setReviewMode={setReviewMode}
            serial='6'
            summary='Adresse'
            go={go}
            details={[
              { Address: address },
              { Zip: zip },
              { City: city },
              { HideAddress: hideAddress },
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
              navigation.previous();
              my_swiper.slidePrev();
            }}
          >
            {t('back')}
          </Button>
          <Button
            variant='contained'
            style={{ marginTop: '1.5rem' }}
            onClick={handleSubmit}
          >
            {t('save and proceed')}
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

const RenderAccordion = ({ summary, details, go, setReviewMode, serial }) => {
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
              go(`${summary.toLowerCase()}`);
              setReviewMode(true);
            }}
          >
            {t('click to edit')}
          </Button>
        </div>
      )}
    </>
  );
};