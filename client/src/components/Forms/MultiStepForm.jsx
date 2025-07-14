import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useForm, useStep } from 'react-hooks-helper';
import { Data } from './stepForm/Data';
import { Details } from './stepForm/Details';
import { Description } from './stepForm/Description';
import { Images } from './stepForm/Images';
import { Address } from './stepForm/Address';
import { Contact } from './stepForm/Contact';
import { Review } from './stepForm/Review';
import { Submit } from './stepForm/Submit';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../context/AuthContext'; 
import "swiper/css";
import "swiper/css/navigation";
//import styled componets
import styled from 'styled-components';
//import swiper & css
import { Swiper, SwiperSlide } from 'swiper/react';

//swiper core & required module
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
// install Swiper modules
SwiperCore.use([Navigation]);
//styled swiper
const StyledSwiper = styled.div`
  position: relative;
  pointer-events: none;
  .swiper-button-next,
  .swiper-button-prev {
    display: none;
    top: 50%;
    background-color: var(--hblue);
    color: var(--b);
    z-index: 999999999;
    position: absolute;
    transform: translateY(-50%);
    margin: 0;
    background-color: #fff;
    &:after {
      font-size: 25px;
      font-weight: bold;
    }
  }
  .swiper-button-prev {
    left: -5px;
  }
  .swiper-button-next {
    z-index: 99;
    right: 0px;
  }
  .swiper-container {
    position: relative;
  }
  .swiper-wrapper {
    z-index: -1;
    text-align: center;
  }
  .mySwiper {
    padding: 10px 15px;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      width: 40px;
      background-color: #fff;
      bottom: 0;
      z-index: 9;
    }
  }
  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 18px;
  }
`;
export const useMultiStepForm = (type) => {
  const [showType, setShowType] = useState(
    JSON.parse(window.localStorage.getItem(type))?.showType || []
  );
  const [selectedType, setSelectedType] = useState(
    JSON.parse(window.localStorage.getItem(type))?.selectedType || []
  );
  const [formValuesType, setFormValuesType] = useState(
    JSON.parse(window.localStorage.getItem(type))?.formValuesType || []
  );

  const [showTypeId, setShowTypeId] = useState(
    JSON.parse(window.localStorage.getItem(`${type}`))?.showTypeId || []
  );

  useEffect(() => {
    console.log(
      'window.localStorage.getItem(type)',
      window.localStorage.getItem(type)
    );
    console.log(
      'showType',
      JSON.parse(window.localStorage.getItem(type))?.showType
    );
    console.log(
      'selectedType',
      JSON.parse(window.localStorage.getItem(type))?.selectedType
    );
    console.log(
      'formValuesType',
      JSON.parse(window.localStorage.getItem(type))?.formValuesType
    );
  }, []);

  const onDropType = useCallback((accFiles, rejectFiles) => {
    const mappAcc = accFiles.map((file) => {
      setFormValuesType((curr) => [...curr, { imgDetails: '' }]);
      return file;
    });
    setSelectedType((curr) => [...curr, ...mappAcc]);
    if (accFiles) {
      const filesArray = Array.from(accFiles).map((file) =>
        URL.createObjectURL(file)
      );
      setShowType((prevImages) => prevImages.concat(filesArray));
      Array.from(accFiles).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  }, []);

  const removeType = (photo, file, i) => {
    const files = showType.filter((file) => file !== photo);
    setShowType(files);

    selectedType.splice(selectedType.indexOf(file), 1);

    let newFormValues = [...formValuesType];
    newFormValues.splice(i, 1);
    setFormValuesType(newFormValues);
  };
  let handleChange = (i, e) => {
    let newFormValues = [...formValuesType];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValuesType(newFormValues);
  };
  return {
    showType,
    selectedType,
    formValuesType,
    onDropType,
    removeType,
    handleChange,
    showTypeId,
    setShowTypeId,
  };
};

export const MultiStepForm = () => {
  const { user } = useContext(AuthContext); 


  const defaultData = {
    listingTitle: '',
    listingType: 'For Sale',
    buildingType: 'APARTMENT',
    contactType: 'private person',
    lastName: user?.lastname,
    specificBuildingType: '',
    newBuilding: '',
    monumentProtection: '',
    numberOfFloors: '',
    numberOfRooms: '',
    numberOfBedrooms: '',
    numberOfBathrooms: '',
    livingSpace: '',
    livingArea: '',
    usableArea: '',
    plotArea: '',
    numberOfGarages: '',
    numberOfParkingSpaces: '',
    flatType: '',
    floor: '',
    monthlyHousepayment: '',
    parkingSpacePrice: '',
    numberOfParkingLots: '',
    landArea: '',
    stateOfDevelopment: '',
    description: '',
    features: '',
    location: '',
    additionalDescription: '',
    listingPrice: '',
    rentPrice: '',
    nebenkostenPrice: '',
    gesamtmietePrice: '',
    nickName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    contactName: user?.name,
    phone: user?.phone_number,
    formEmail: user?.email,
    nameHide: '',
    carPlacement: '',
    phoneNumberHide: '',
    emailHide: '',
    additionalCost: '',
    secuirityCost: '',
    summaryAdditionalCost: '',
    heatingCostinDetails: '',
    energyPass: '',
    energySource: '',
    energyPassCreationDate: '',
    typeOfHeating: '',
    typeOfEnergyPass: '',
    yearOfBuilding: '',
    commission: '',
    energyEfficiencyClass: '',
    hideAddress: true,
    typeOfParkingSpace: '',
    energy: false,
    buildingphase: '',
    estatetype: '',
    leasablearea: '',
    ...JSON.parse(localStorage.getItem('formData')),
  };
  
  const steps = [
    { id: 'data', Component: Data },
    { id: 'details', Component: Details },
    { id: 'description', Component: Description },
    { id: 'contact', Component: Contact },
    { id: 'address', Component: Address },
    { id: 'images', Component: Images },
    { id: 'review', Component: Review },
    { id: 'submit', Component: Submit },
  ];

  const [formData, setForm] = useForm(defaultData);
  const { step, navigation } = useStep({
    steps,
    initialStep: 0,
  });
  const { Component } = step;
  const [isReviewMode, setReviewMode] = useState(false);
  const [listData, setListData] = useState(null);
  const [phone, setPhone] = useState(null);
  const imgMultiStepForm = useMultiStepForm('imgMultiStepForm');
  const planMultiStepForm = useMultiStepForm('planMultiStepForm');
  const [fRequired, setFRequired] = useState(false);
  const [energy, setEnergy] = useState(false);
  const [testEnergy, setTestEnergy] = useState('no energy');
  const [loading, setLoading] = useState(false);
  const props = { 
    imgMultiStepForm,
    planMultiStepForm,
    setListData,
    listData,
    formData,
    setForm,
    navigation,
    isReviewMode,
    setReviewMode,
    fRequired,
    setFRequired,
    defaultData,
    energy,
    setEnergy,
    testEnergy,
    setTestEnergy,
    phone,
    setPhone,
    loading,
    setLoading,
  };

  const stepColor = {
    color: 'blue',
  };
  const { go } = navigation;
  const { t } = useTranslation();
  const [my_swiper, set_my_swiper] = useState({});

  useEffect(() => {
    window.localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    // console.log('imgMultiStepForm', imgMultiStepForm);
    window.localStorage.setItem(
      'imgMultiStepForm',
      JSON.stringify(imgMultiStepForm)
    );
  }, [imgMultiStepForm]);
  useEffect(() => {
    // console.log('planMultiStepForm', planMultiStepForm);
    window.localStorage.setItem(
      'planMultiStepForm',
      JSON.stringify(planMultiStepForm)
    );
  }, [planMultiStepForm]);

  return (
    <div className='grid'>
      <StyledSwiper className='text-xs h-10 overflow-x-auto content-center mx-1 font-semibold tracking-wide text-left text-gray-500 uppercase justify-start gap-24 mt-2 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800 custom-scrollbar'>
        <Swiper
          navigation={true}
          simulateTouch={false}
          noSwiping={true}
          spaceBetween={0}
          slidesPerView={1}
          className='mySwiper'
          breakpoints={{
            900: {
              slidesPerView: 3,
            },
            600: {
              slidesPerView: 1,
            },
          }}
          onInit={(ev) => {
            set_my_swiper(ev);
          }}
        >
          {/* {!loading && ( */}
          {true && (
            <>
              <SwiperSlide
                className='menu-item cursor-pointer mySwiper-item'
                key={'data'}
                onClick={() => go('data')}
                style={step.id === 'data' ? stepColor : null}
              >
                {t('Allgemein')}
              </SwiperSlide>
              <SwiperSlide
                className='menu-item cursor-pointer mySwiper-item'
                key={'details'}
                onClick={() => go('details')}
                style={step.id === 'details' ? stepColor : null}
              >
                {t('Details')}
              </SwiperSlide>
              <SwiperSlide
                className='menu-item cursor-pointer mySwiper-item'
                key={'description'}
                onClick={() => go('description')}
                style={step.id === 'description' ? stepColor : null}
              >
                {t('Beschreibung')}
              </SwiperSlide>

              <SwiperSlide
                className='menu-item cursor-pointer mySwiper-item'
                key={'contact'}
                onClick={() => go('contact')}
                style={step.id === 'contact' ? stepColor : null}
              >
                {t('Ansprechpartner')}
              </SwiperSlide>
              <SwiperSlide
                className='menu-item cursor-pointer mySwiper-item'
                key={'address'}
                onClick={() => go('address')}
                style={step.id === 'address' ? stepColor : null}
              >
                {t('Adresse')}
              </SwiperSlide>
              <SwiperSlide
                className='menu-item cursor-pointer mySwiper-item'
                key={'images'}
                onClick={() => go('images')}
                style={step.id === 'images' ? stepColor : null}
              >
                {t('Bilder')}
              </SwiperSlide>
              <SwiperSlide
                className='menu-item cursor-pointer mySwiper-item'
                key={'review'}
                onClick={() => go('review')}
                style={step.id === 'review' ? stepColor : null}
              >
                {t('Bewertung')}
              </SwiperSlide>
              <SwiperSlide
                className='menu-item cursor-pointer mySwiper-item'
                key={'submit'}
                onClick={() => go('submit')}
                style={step.id === 'submit' ? stepColor : null}
              >
                {t('Einreichen')}
              </SwiperSlide>
            </>
          )}
        </Swiper>
      </StyledSwiper>
      <Component {...props} key={step.id} my_swiper={my_swiper} />
    </div>
  );
};