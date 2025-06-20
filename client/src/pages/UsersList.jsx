import React, { useState, useContext, useEffect } from 'react';
import { Button, Badge } from '@windmill/react-ui';
import { stripeService } from '../services';
// import PageTitle from '../components/Typography/PageTitle';
// import SectionTitle from '../components/Typography/SectionTitle';
// import BillingForm from '../components/Forms/BillingForm';
// import PricingCard from '../components/Cards/PricingCards';
// import BillingDetailsCard from '../components/Cards/BillingDetailsCard';
import { SnackbarContext } from '../context/SnackbarContext';
import { StripeContext } from '../context/StripeContext';
import { HelperText } from '@windmill/react-ui';
import { useStripe } from '@stripe/react-stripe-js';
import { EditIcon, DropdownIcon, DeleteIcon } from '../icons';
import { useHistory } from 'react-router-dom';
import { Data } from './EditForms/Data';
import { Details } from './EditForms/Details';
import { Description } from './EditForms/Description';
import { Images } from './EditForms/Images';
import { Contact } from './EditForms/Contact';
import { Address } from './EditForms/Address';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import '../components/Forms/style.css';
import { Submit } from './../components/Forms/stepForm/Submit';
// import { flowFactService } from '../services/flowfact.service';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// function Products({ listData, uniqId, enabled, PricingCardCallback }) {
//   const { products } = useContext(StripeContext);

//   return (
//     <div className='grid gap-6 mb-8 md:grid-cols-3'>
//       {products &&
//         products.map(function (product, i) {
//           if (
//             !product.product.active &&
//             listData.subscription.subscriptionType !==
//               product.product.metadata.type
//           ) {
//             return null;
//           }
//           return (
//             <PricingCard
//               key={i}
//               title={product.product.name}
//               type={product.product.metadata.type}
//               value={
//                 product.price.currency_symbol +
//                 product.price.unit_amount / 100 +
//                 ' / ' +
//                 product.price.recurring.interval
//               }
//               active={
//                 listData.subscription.subscriptionType ===
//                 product.product.metadata.type
//               }
//               enabled={enabled}
//               listData={listData}
//               uniqId={uniqId}
//               callback={PricingCardCallback}
//             />
//           );
//         })}{' '}
//     </div>
//   );
// }


const renderPhotos = (imagesList) => {
    return imagesList.map((photo, key) => {
        return (
            <div className="flex mx-1 m-1"
                key={
                    photo.id
            }>
                <div className="mx-2 h-14 object-cover w-14">
                    <a href={
                            photo.fileReference
                        }
                        rel="noreferrer"
                        target="_blank">
                        <img src={
                                photo.fileReference
                            }
                            alt={
                                photo.title
                            }
                            title={
                                photo.title
                            }
                            className="h-full"/>
                    </a>
                </div>
                <p>{
                    photo.title
                }</p>
            </div>
        );
    });
};

// const renderPhotos = (imagesList) => {
  // return imagesList.map((photo, key) => {
  //   return (
  //     <Backdrop
  //       sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  //       open={false}
  //       // onClick={handleClose}
  //     >
  //       <CircularProgress color='inherit' />
  //       <div className='flex mx-1 m-1' key={photo.id}>
  //         <div className='mx-2 h-14 object-cover w-14'>
  //           <a href={photo.fileReference} rel='noreferrer' target='_blank'>
  //             <img
  //               src={photo.fileReference}
  //               alt={photo.title}
  //               title={photo.title}
  //               className='h-full'
  //             />
  //           </a>
  //         </div>
  //         <p>{photo.title}</p>
  //       </div>
  //     </Backdrop>
  //   );
  // });
  
// };
const testMounth = (mounth) => {
  let value = 31;
  switch (mounth) {
    case 1:
      value = 28;
      break;
    case 3:
      value = 30;
      break;
    case 5:
      value = 30;
      break;
    case 8:
      value = 30;
      break;
    case 10:
      value = 30;
      break;
  }
  return value;
};
export default function UserListDetails({ data, handledeleteList }) {
  const {
    entityId,
    listingTitle,
    listingType,
    buildingType,
    buildingphase,
    specificBuildingType,
    newBuilding,
    monumentProtection,
    numberOfFloors,
    numberOfRooms,
    numberOfBedrooms,
    numberOfBathrooms,
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
    phone,
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
    uniqId,
    subscription,
    subscriptionId,
    imgCollection,
    planCollection,
    subscriptionUpdatedAt,
    subscriptionExpire,
    subscriptionPause,
    hideAddress,
    energyEfficiencyClass,
    commission,
    contactType,
    energySource,
    energyPassCreationDate,
    livingArea,
    typeOfParkingSpace,
    energy,
    estatetype,
    leasablearea,
    totalarea,
    pending,
  } = data;
  const [loading, setLoading] = useState(false);

  // Expire Date
  var new_date;
  if (subscriptionUpdatedAt) {
    new_date = new Date(subscriptionUpdatedAt);
  } else {
    new_date = new Date();
  }
  let mounth = new_date.getMonth();
  let days = testMounth(mounth);
  new_date.setDate(new_date.getDate() + days);
  var expire_date = new_date.toISOString();
  let format_expire_date = expire_date.split('T')[0];
  format_expire_date = `${format_expire_date.split('-')[2]}.${
    format_expire_date.split('-')[1]
  }.${format_expire_date.split('-')[0]}`;
  if (new_date.getTime() <= Date.now()) {
    subscription.subscriptionType = 'free';
  }

  const [accordion, setAccordion] = useState(false);
  const [accordionTwo, setAccordionTwo] = useState(false);
  const [accordionThree, setAccordionThree] = useState(false);
  const [accordionFour, setAccordionFour] = useState(false);
  const [accordionFive, setAccordionFive] = useState(false);
  const [accordionSix, setAccordionSix] = useState(false);

  const [listData, setListData] = useState(data);
  const [pauseListen, setPauseListen] = useState(false); // pause
  const [deleteListen, setDeleteListen] = useState(false); // pause
  const [activateListen, setActivateListen] = useState(false); // pause
  const [proceedToPayment, setProceedToPayment] = useState(false); // proceedToPayment
  const [stopAutorenew, setStopAutorenew] = useState(false);
  const [startAutoRenew, setStartAutoRenew] = useState(false);
  const history = useHistory();
  const stripe = useStripe();
  const { openSnackbar, closeSnackbar } = useContext(SnackbarContext);
  // const { user, setUser } = useContext(AuthContext)
  const [editBillingDetails, setEditBillingDetails] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [paused, setPaused] = useState(false);
  const [activate, setActivate] = useState(false);
  const [error, setError] = useState(null);

  const [imagesList, setImagesList] = useState([]);
  // useEffect(() => {
  //   flowFactService.generateCognitoToken().then((cognitoToken) => {
  //     console.log(`cognitoToken for userList ${entityId}`, cognitoToken);
  //     axios
  //       .get(
  //         `https://api.production.cloudios.flowfact-prod.cloud/multimedia-service/items/entities/${entityId}`,
  //         {
  //           headers: {
  //             cognitoToken,
  //           },
  //         }
  //       )
  //       .then((reqData) => {
  //         setImagesList(reqData.data);
  //       });
  //   });
  // }, [entityId]);
  useEffect(() => {
    if (enabled) {
      closeSnackbar();
    } else {
      openSnackbar('Updating subscription...');
    }
    if (!paused) {
      closeSnackbar();
    } else {
      openSnackbar('Pausing subscription...');
    }
    if (!activate) {
      closeSnackbar();
    } else {
      openSnackbar('Pausing subscription...');
    }
  }, [enabled, activate, paused, openSnackbar, closeSnackbar]);

  const handlePaymentThatRequiresCustomerAction = (subscription) => {
    if (!subscription) {
      return;
    }
    if (subscription && subscription.status === 'active') {
      return subscription;
    }
    const paymentIntent = subscription.latest_invoice.payment_intent;
    if (paymentIntent.status === 'requires_action') {
      return stripe
        .confirmCardPayment(paymentIntent.client_secret, {
          payment_method: listData.stripePaymentMethod.id,
        })
        .then((result) => {
          if (result.error) {
            throw Object.assign(new Error(result.error.message), {
              response: {
                data: {
                  message: result.error.message,
                },
              },
            });
          } else {
            if (result.paymentIntent.status === 'succeeded') {
              return subscription;
            } else {
              throw Object.assign(new Error('Some error occured'));
            }
          }
        })
        .catch((error) => {
          stripeService.deleteSubscription(subscription.id);
          throw error;
        });
    } else {
      return subscription;
    }
  };

  const onSubscriptionComplete = (subscription, uniqId) => {
    if (!subscription) return;

    if (subscription.status === 'active') {
      return stripeService.completeSubscription(
        subscription.id,
        subscription.items.data[0].price.product,
        uniqId
      );
    } else {
      throw Object.assign(new Error('Some error occured'));
    }
  };

  const [errorMessage, setErrorMessage] = useState(false);
  // const handleSubscription = (type, uniqId) => {
  // setErrorMessage(false);
  // setEnabled(false);
  // setError(null);
  // stripeService
  //     .createSubscription(type, uniqId)
  //     .then(handlePaymentThatRequiresCustomerAction)
  //     .then((subscription) => onSubscriptionComplete(subscription, uniqId))
  //     .then(() => {
  //       setListData((listData) => {
  //         const newUser = {
  //           ...listData,
  //           subscription: { subscriptionType: type },
  //         };
  //         setEnabled(true);
  //         setStopAutorenew(false);
  //         setStartAutoRenew(false);
  //         return newUser;
  //       });
  //       history.push("/app");
  //       history.replace("/app/userLists");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       if (error.response) setError(error.response.data.message);
  //       else setError("Some error occured.");
  //       setEnabled(true);
  //       setErrorMessage(true);
  //     });
  // };
  const handlePauseListen = (uniqId) => {
    stripeService
      .pauseSubscription(uniqId)
      .then(() => {
        // make this part
        setPaused(true);
        setPauseListen(true);
        history.push('/app');
        history.replace('/app/userLists');
        return uniqId;
      })
      .catch((error) => {
        console.log(error);
        if (error.response) setError(error.response.data.message);
        else setError('Some error occured.');

        setPaused(false);
        setErrorMessage(true);
      });
  };
  const handleUnPauseListen = (uniqId) => {
    stripeService
      .unpauseSubscription(uniqId)
      .then(() => {
        // make this part
        setPaused(false);
        setPauseListen(false);
        history.push('/app');
        history.replace('/app/userLists');
        return uniqId;
      })
      .catch((error) => {
        console.log(error);
        if (error.response) setError(error.response.data.message);
        else setError('Some error occured.');

        setActivate(false);
        setErrorMessage(true);
      });
  };
  const [type, setType] = useState('');
  const billingFormCallback = (userList) => {
    setErrorMessage(false);
    setListData(userList);
    // handleSubscription(type, uniqId);
  };
  const BillingDetailsCardCallback = () => {
    setEditBillingDetails(true);
  };

  const PricingCardCallback = (type, uniqId) => {
    setType(type);
    setEnabled(true);
  };
  const handleCancelAutoRenew = (uniqId) => {
    setErrorMessage(false);
    setEnabled(false);
    setError(null);
    stripeService
      .cancelAutoRenew(uniqId)
      .then(() => {
        setEnabled(true);
        setStopAutorenew(true);
        history.push('/app');
        history.replace('/app/userLists');
        return uniqId;
      })
      .catch((error) => {
        console.log(error);
        if (error.response) setError(error.response.data.message);
        else setError('Some error occured.');

        setStopAutorenew(false);
        setErrorMessage(true);
      });
  };

  const [updateListing, setUpdateListing] = useState(false);
  const [editData, setEditData] = useState(false);
  const [editDetails, setEditDetails] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editImages, setEditImages] = useState(false);
  const [editContact, setEditContact] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [fRequired, setFRequired] = useState(false);
  const { t } = useTranslation();
  function numberWithCommas(x) {
    x = String(x).replace(/\./g, '');
    var parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return parts.join(',');
  }
  return (
    <>
      {' '}
      {!proceedToPayment ? (
        <>
          {' '}
          {!updateListing ? (
            <div className='p-6 mb-4 bg-white rounded-lg shadow-md dark:bg-gray-800'>
              <div className='flex justify-between'>
                <div className='mb-5 mr-5'>
                  <p className='font-medium text-lg break-all'>
                    {listingTitle}{' '}
                  </p>
                  <p className='text-xs mt-1'>
                    {t('listing id')}
                    PF-{uniqId}{' '}
                  </p>
                </div>
                {pending && <div></div>}
                {!pending && (
                  <div className='mb-5'>
                    {subscription.subscriptionType === 'free' ? (
                      <Badge key='inactive' type='neutral'>
                        {t('inactive')}{' '}
                      </Badge>
                    ) : (
                      false
                    )}
                    {subscription.subscriptionType != 'free' &&
                    subscriptionExpire === true &&
                    subscriptionPause === false &&
                    new_date.getTime() >= Date.now() ? (
                      <Badge key='Active-until' className='mt-2' type='success'>
                        <span className='font-semibold pr-1'>
                          {
                            // t("Active")
                            t('Active')
                          }{' '}
                        </span>
                        {
                          // t("until") (" ")
                          t('until')
                        }
                        {' '}{format_expire_date}
                      </Badge>
                    ) : (
                      false
                    )}
                    {subscription.subscriptionType != 'free' &&
                    subscriptionPause === true ? (
                      <Badge key='Active-until' className='mt-2' type='neutral'>
                        {t(`Paused`)}{' '}
                      </Badge>
                    ) : (
                      false
                    )}
                    {subscriptionExpire === false &&
                    subscription.subscriptionType != 'free' ? (
                      <Badge
                        className='activelisting'
                        key='active'
                        type='success'
                      >
                        {t('active')}{' '}
                      </Badge>
                    ) : (
                      false
                    )}{' '}
                  </div>
                )}
                {pending && (
                  <div className='mb-5'>
                    <Badge key='pending' type='warning'>
                      {t('pending')}{' '}
                    </Badge>
                  </div>
                )}{' '}
              </div>
              <div className='block mb-4'>
                <Button
                  layout='link'
                  className='w-full rounded-lg justify-between flex hover:bg-gray-50 py-4 ring-1 ring-black ring-opacity-5 overflow-hidden bg-white dark:bg-gray-800 text-gray-600 text-sm text-left font-medium'
                  size='large'
                  onClick={() => setAccordion(!accordion)}
                >
                  1. {t('Data')}
                  <DropdownIcon className='w-4' />
                </Button>
                {accordion && (
                  <div>
                    <RenderAccordion
                      details={[
                        {
                          'Listing Title': listingTitle ? listingTitle : '',
                        },
                        {
                          'Listing Type': listingType ? listingType : '',
                        },
                        {
                          'Building Type': buildingType ? buildingType : '',
                        },
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
                        {
                          'Contact Type': contactType ? contactType : '',
                        },
                      ]}
                    />
                    <Button
                      layout='outline'
                      onClick={() => {
                        setUpdateListing(!editData);
                        setEditData(!editData);
                      }}
                      iconRight={EditIcon}
                    >
                      {t('click to edit')}{' '}
                    </Button>
                  </div>
                )}{' '}
              </div>
              <div className='block mb-4'>
                <Button
                  layout='link'
                  className='w-full rounded-lg justify-between flex hover:bg-gray-50 py-4 ring-1 ring-black ring-opacity-5 overflow-hidden bg-white dark:bg-gray-800 text-gray-600 text-sm text-left font-medium'
                  size='large'
                  onClick={() => setAccordionTwo(!accordionTwo)}
                >
                  2. {t('Details')}
                  <DropdownIcon className='w-4' />
                </Button>
                {accordionTwo && (
                  <div className='py-5'>
                    <ul>
                      {' '}
                      {buildingType === 'House' && (
                        <div>
                          <li className=''>
                            {t('Specific House Type')}:{' '}
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
                            )}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Year Of Building')}: {t(yearOfBuilding)}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Special Features')}:{' '}
                            {newBuilding && t('New Building')}{' '}
                            {monumentProtection && t('Monument Protection')}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Living Area')}: {t(livingArea)}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Usable Area')}: {t(usableArea)}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Plot Area')}: {t(plotArea)}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Number of Floors')}: {t(numberOfFloors)}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Number of Rooms')}: {t(numberOfRooms)}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Number of Bedrooms')}: {t(numberOfBedrooms)}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Number of Bathrooms')}: {t(numberOfBathrooms)}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Number of Garages')}: {t(numberOfGarages)}{' '}
                          </li>
                          <li>
                            {' '}
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
                            )}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Number Of Parking Space')}:{' '}
                            {t(numberOfParkingSpaces)}{' '}
                          </li>
                          {energy && (
                            <>
                              <li>
                                {' '}
                                {t('Energy Pass Available')}: {t('Energy')}{' '}
                              </li>
                              <li>
                                {' '}
                                {t('Energy Pass')}: {t(energyPass)}{' '}
                              </li>
                              <li>
                                {' '}
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
                                )}{' '}
                              </li>
                              <li>
                                {' '}
                                {t('energy Pass Creation Date')}:{' '}
                                {t(energyPassCreationDate)}{' '}
                              </li>
                              <li>
                                {' '}
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
                                )}{' '}
                              </li>
                              <li>
                                {' '}
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
                                )}{' '}
                              </li>
                              {listingType === 'For Rent' && (
                                <>
                                  <li>
                                    {' '}
                                    {t('additionalCost')}: {t(additionalCost)}{' '}
                                  </li>
                                  <li>
                                    {' '}
                                    {t('heating cost in details')}:{' '}
                                    {t(heatingCostinDetails)}{' '}
                                  </li>
                                  <li>
                                    {' '}
                                    {t('security cost')}
                                    {t(secuirityCost)}{' '}
                                  </li>
                                </>
                              )}{' '}
                            </>
                          )}
                          <li>
                            {' '}
                            {t('Building Phase')}:{' '}
                            {t(
                              (() => {
                                let info;
                                switch (buildingphase) {
                                  case 'no_information':
                                    info = 'No information';
                                    break;
                                  case 'completed':
                                    info = 'Completed';
                                    break;
                                  case 'under_construction':
                                    info = 'Under construction';
                                    break;
                                  case 'in_planning':
                                    info = 'In planning';
                                    break;
                                }
                                return info;
                              })()
                            )}{' '}
                          </li>
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
                            )}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Year Of Building')}: {t(yearOfBuilding)}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Special Features : ')}
                            {newBuilding && t('New Building')}
                            {monumentProtection &&
                              t('Monument Protection')}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Living Area')}: {t(livingArea)}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Number of Rooms')}: {t(numberOfRooms)}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Number of Bathrooms')}: {t(numberOfBathrooms)}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Number of Bedrooms')}: {t(numberOfBedrooms)}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Floor')}: {t(floor)}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Monthly Housepayment')}:{' '}
                            {t(monthlyHousepayment)}{' '}
                          </li>
                          <li>
                            {' '}
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
                            )}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Parking Space Price')}: {t(parkingSpacePrice)}{' '}
                          </li>
                          {energy && (
                            <>
                              <li>
                                {' '}
                                {t('Energy')}: {t('Energy')}{' '}
                              </li>
                              <li>
                                {' '}
                                {t('Energy Pass')}: {t(energyPass)}{' '}
                              </li>
                              <li>
                                {' '}
                                {t('Energy Efficiency Class')}:{' '}
                                {t(energyEfficiencyClass)}{' '}
                              </li>
                              <li>
                                {' '}
                                {t('energy Pass Creation Date')}:{' '}
                                {t(energyPassCreationDate)}{' '}
                              </li>
                              <li>
                                {' '}
                                {t('Type Of Heating')}: {t(typeOfHeating)}{' '}
                              </li>
                              <li>
                                {' '}
                                {t('Type Of Energypass')}:{' '}
                                {t(
                                  (() => {
                                    let info;
                                    switch (typeOfEnergyPass) {
                                      case '1':
                                        info = '--please choose--';
                                        break;
                                      case '2':
                                        info = 'consumption pass';
                                        break;
                                      case '3':
                                        info = 'require pass';
                                        break;
                                    }
                                    return info;
                                  })()
                                )}{' '}
                              </li>
                            </>
                          )}
                          {listingType === 'For Rent' && (
                            <>
                              <li>
                                {' '}
                                {t('additionalCost')}: {t(additionalCost)}{' '}
                              </li>
                              <li>
                                {' '}
                                {t('heating cost in details')}:{' '}
                                {t(heatingCostinDetails)}{' '}
                              </li>
                              <li>
                                {' '}
                                {t('security cost')}
                                {t(secuirityCost)}{' '}
                              </li>
                            </>
                          )}{' '}
                        </div>
                      )}
                      {buildingType === 'Land' && (
                        <div>
                          <li>
                            {' '}
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
                            )}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Land Area')}: {t(plotArea)}{' '}
                          </li>
                          <li className=''>
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
                            )}{' '}
                          </li>
                          {energy && (
                            <>
                              <li>
                                {' '}
                                {t('Energy')}: {t('Energy')}{' '}
                              </li>
                              <li>
                                {' '}
                                {t('Energy Pass')}: {t(energyPass)}{' '}
                              </li>
                              <li>
                                {' '}
                                {t('Energy Efficiency Class')}:{' '}
                                {t(energyEfficiencyClass)}{' '}
                              </li>
                              <li>
                                {' '}
                                {t('energy Pass Creation Date')}:{' '}
                                {t(energyPassCreationDate)}{' '}
                              </li>
                              <li>
                                {' '}
                                {t('Type Of Heating')}: {t(typeOfHeating)}{' '}
                              </li>
                              <li>
                                {' '}
                                {t('Type Of Energypass')}:{' '}
                                {t(
                                  (() => {
                                    let info;
                                    switch (typeOfEnergyPass) {
                                      case '1':
                                        info = '--please choose--';
                                        break;
                                      case '2':
                                        info = 'consumption pass';
                                        break;
                                      case '3':
                                        info = 'require pass';
                                        break;
                                    }
                                    return info;
                                  })()
                                )}{' '}
                              </li>
                            </>
                          )}
                          {listingType === 'For Rent' && (
                            <>
                              <li>
                                {' '}
                                {t('additionalCost')}: {t(additionalCost)}{' '}
                              </li>
                              <li>
                                {' '}
                                {t('heating cost in details')}:{' '}
                                {t(heatingCostinDetails)}{' '}
                              </li>
                              <li>
                                {' '}
                                {t('security cost')}
                                {t(secuirityCost)}{' '}
                              </li>
                            </>
                          )}{' '}
                        </div>
                      )}
                      {buildingType === 'Commercial' && (
                        <div>
                          <li>
                            {' '}
                            {t('Estate Type')}:{' '}
                            {t(
                              (() => {
                                let info;
                                switch (estatetype) {
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
                            )}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Year Of Building')}: {t(yearOfBuilding)}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Special Features')}:{' '}
                            {newBuilding && t('New Building')}
                            {monumentProtection &&
                              t(', Monument Protection')}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Total Area')}: {t(totalarea)}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Number of Floors')}: {t(numberOfFloors)}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Number of Rooms')}: {t(numberOfBathrooms)}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Number of Bedrooms')}: {t(numberOfBedrooms)}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Number of Bathrooms')}: {t(numberOfBathrooms)}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Usable Area')}: {t(usableArea)}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Plot Area')}: {t(plotArea)}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Number of Garages')}: {t(numberOfGarages)}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Number of Parking Spaces')}:{' '}
                            {t(numberOfParkingSpaces)}{' '}
                          </li>
                          {energy && (
                            <>
                              <li>
                                {' '}
                                {t('Energy')}: {t('Energy')}{' '}
                              </li>
                              <li>
                                {' '}
                                {t('Energy Pass')}: {t(energyPass)}{' '}
                              </li>
                              <li>
                                {' '}
                                {t('Energy Efficiency Class')}:{' '}
                                {t(energyEfficiencyClass)}{' '}
                              </li>
                              <li>
                                {' '}
                                {t('energy Pass Creation Date')}:{' '}
                                {t(energyPassCreationDate)}{' '}
                              </li>
                              <li>
                                {' '}
                                {t('Type Of Heating')}: {t(typeOfHeating)}{' '}
                              </li>
                              <li>
                                {' '}
                                {t('Type Of Energypass')}:{' '}
                                {t(
                                  (() => {
                                    let info;
                                    switch (typeOfEnergyPass) {
                                      case '1':
                                        info = '--please choose--';
                                        break;
                                      case '2':
                                        info = 'consumption pass';
                                        break;
                                      case '3':
                                        info = 'require pass';
                                        break;
                                    }
                                    return info;
                                  })()
                                )}{' '}
                              </li>
                              {listingType === 'For Rent' && (
                                <>
                                  <li>
                                    {' '}
                                    {t('Additional Cost')}: {t(additionalCost)}{' '}
                                  </li>
                                  <li>
                                    {' '}
                                    {t('Heating Cost in Details')}:{' '}
                                    {t(heatingCostinDetails)}{' '}
                                  </li>
                                  <li>
                                    {' '}
                                    {t('Secuirity Cost')}: {t(secuirityCost)}{' '}
                                  </li>
                                </>
                              )}{' '}
                            </>
                          )}{' '}
                        </div>
                      )}
                      {buildingType === 'Investment' && (
                        <div>
                          <li>
                            {' '}
                            {t('Special Features : ')}
                            {newBuilding && t('New Building')}{' '}
                            {monumentProtection && t('Monument Protection')}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Estate Type')}:{' '}
                            {t(
                              (() => {
                                let info;
                                switch (estatetype) {
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
                                    info =
                                      'Geschäftshaus, Handel, Büro (Invest.)';
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
                            )}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Year Of Building')}: {t(yearOfBuilding)}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Leasable Area')}: {t(leasablearea)}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Number of Floors')}: {t(numberOfFloors)}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Number of Rooms')}: {t(numberOfRooms)}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Number of Bedrooms')}: {t(numberOfBedrooms)}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Number of Bathrooms')}: {t(numberOfBathrooms)}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Usable Area')}: {t(usableArea)}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Plot Area')}: {t(plotArea)}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Number of Garages')}: {t(numberOfGarages)}{' '}
                          </li>
                          <li>
                            {' '}
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
                            )}{' '}
                          </li>
                          <li>
                            {' '}
                            {t('Number of Parking Spaces')}:{' '}
                            {t(numberOfParkingSpaces)}{' '}
                          </li>
                          {energy && (
                            <>
                              <li>
                                {' '}
                                {t('Energy')}: {t('Energy')}{' '}
                              </li>
                              <li>
                                {' '}
                                {t('Energy Pass')}: {t(energyPass)}{' '}
                              </li>
                              <li>
                                {' '}
                                {t('Energy Efficiency Class')}:{' '}
                                {t(energyEfficiencyClass)}{' '}
                              </li>
                              <li>
                                {' '}
                                {t('energy Pass Creation Date')}:{' '}
                                {t(energyPassCreationDate)}{' '}
                              </li>
                              <li>
                                {' '}
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
                                )}{' '}
                              </li>
                              <li>
                                {' '}
                                {t('Type Of Energypass')}:{' '}
                                {t(
                                  (() => {
                                    let info;
                                    switch (typeOfEnergyPass) {
                                      case '1':
                                        info = '--please choose--';
                                        break;
                                      case '2':
                                        info = 'consumption pass';
                                        break;
                                      case '3':
                                        info = 'require pass';
                                        break;
                                    }
                                    return info;
                                  })()
                                )}{' '}
                              </li>
                              {listingType === 'For Rent' && (
                                <>
                                  <li>
                                    {' '}
                                    {t('Additional Cost')}: {t(additionalCost)}{' '}
                                  </li>
                                  <li>
                                    {' '}
                                    {t('Heating Cost in Details')}:{' '}
                                    {t(heatingCostinDetails)}{' '}
                                  </li>
                                  <li>
                                    {' '}
                                    {t('Secuirity Cost')}: {t(secuirityCost)}{' '}
                                  </li>
                                </>
                              )}{' '}
                            </>
                          )}{' '}
                        </div>
                      )}
                      {!energy && (
                        <li>
                          {' '}
                          {t('Energy Pass Available')}: {t('No Energy')}{' '}
                        </li>
                      )}
                      <li>
                        {' '}
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
                        )}{' '}
                      </li>
                    </ul>
                    <div></div>
                    <Button
                      className='mt-3'
                      layout='outline'
                      onClick={() => {
                        setUpdateListing(!updateListing);
                        setEditDetails(!editDetails);
                      }}
                      iconRight={EditIcon}
                    >
                      {t('click to edit')}{' '}
                    </Button>
                  </div>
                )}{' '}
              </div>
              <div className='block mb-4'>
                <Button
                  layout='link'
                  className='w-full rounded-lg justify-between flex hover:bg-gray-50 py-4 ring-1 ring-black ring-opacity-5 overflow-hidden bg-white dark:bg-gray-800 text-gray-600 text-sm text-left font-medium'
                  size='large'
                  onClick={() => setAccordionThree(!accordionThree)}
                >
                  3. {t('Description')}
                  <DropdownIcon className='w-4' />
                </Button>
                {accordionThree && (
                  <div>
                    <RenderAccordion
                      details={[
                        {
                          Description: description ? description : '',
                        },
                        {
                          Features: features ? features : '',
                        },
                        {
                          Loaction: location ? location : '',
                        },
                        {
                          'additional Description': additionalDescription
                            ? additionalDescription
                            : '',
                        },
                      ]}
                    />
                    <Button
                      className=''
                      layout='outline'
                      onClick={() => {
                        setUpdateListing(!updateListing);
                        setEditDescription(!editDescription);
                      }}
                      iconRight={EditIcon}
                    >
                      {t('click to edit')}{' '}
                    </Button>
                  </div>
                )}{' '}
              </div>
              <div className='block mb-4'>
                <Button
                  layout='link'
                  className='w-full rounded-lg justify-between flex hover:bg-gray-50 py-4 ring-1 ring-black ring-opacity-5 overflow-hidden bg-white dark:bg-gray-800 text-gray-600 text-sm text-left font-medium'
                  size='large'
                  onClick={() => setAccordionFour(!accordionFour)}
                >
                  4. {t('Images')}
                  <DropdownIcon className='w-4' />
                </Button>
                {accordionFour && (
                  <div>
                    <div className='flex my-5 mx-1 flex-wrap'>
                      {
                        // images && plans
                        imagesList.length !== 0 && renderPhotos(imagesList)
                      }{' '}
                    </div>
                    <Button
                      className=''
                      layout='outline'
                      onClick={() => {
                        setUpdateListing(!updateListing);
                        setEditImages(!editImages);
                      }}
                      iconRight={EditIcon}
                    >
                      {t('click to edit')}{' '}
                    </Button>
                  </div>
                )}{' '}
              </div>
              <div className='block mb-4'>
                <Button
                  layout='link'
                  className='w-full rounded-lg justify-between flex hover:bg-gray-50 py-4 ring-1 ring-black ring-opacity-5 overflow-hidden bg-white dark:bg-gray-800 text-gray-600 text-sm text-left font-medium'
                  size='large'
                  onClick={() => setAccordionFive(!accordionFive)}
                >
                  5. {t('Contact')}
                  <DropdownIcon className='w-4' />
                </Button>
                {accordionFive && (
                  <div>
                    <RenderAccordion
                      details={[
                        {
                          'Contact Name': contactName ? contactName : '',
                        },
                        {
                          'Last Name': lastName ? lastName : '',
                        },
                        {
                          'Name Hide': nameHide ? nameHide : '',
                        },
                        {
                          Phone: phone ? phone : '',
                        },
                        {
                          Email: formEmail ? formEmail : '',
                        },
                      ]}
                    />
                    <Button
                      className=''
                      layout='outline'
                      onClick={() => {
                        setUpdateListing(!updateListing);
                        setEditContact(!editContact);
                      }}
                      iconRight={EditIcon}
                    >
                      {t('click to edit')}{' '}
                    </Button>
                  </div>
                )}{' '}
              </div>
              <div className='block mb-5'>
                <Button
                  layout='link'
                  className='w-full rounded-lg justify-between flex hover:bg-gray-50 py-4 ring-1 ring-black ring-opacity-5 overflow-hidden bg-white dark:bg-gray-800 text-gray-600 text-sm text-left font-medium'
                  size='large'
                  onClick={() => setAccordionSix(!accordionSix)}
                >
                  6. {t('Address')}
                  <DropdownIcon className='w-4' />
                </Button>
                {accordionSix && (
                  <div>
                    <RenderAccordion
                      details={[
                        {
                          Address: address ? address : '',
                        },
                        {
                          Zip: zip ? zip : '',
                        },
                        {
                          City: city ? city : '',
                        },
                        {
                          hideAddress: hideAddress ? hideAddress : '',
                        },
                      ]}
                    />
                    <Button
                      className=''
                      layout='outline'
                      onClick={() => {
                        setUpdateListing(!updateListing);
                        setEditAddress(!editAddress);
                      }}
                      iconRight={EditIcon}
                    >
                      {t('click to edit')}{' '}
                    </Button>
                  </div>
                )}{' '}
              </div>
              {!pending && (
                <>
                  <div className='pt-4'>
                    {subscription.subscriptionType === 'free' && (
                      <div className=''>
                        <div className=''>
                          {!deleteListen && (
                            <Button
                              layout=''
                              iconLeft={DeleteIcon}
                              className='float-left bg-red-600 hover:bg-red-600 text-white hover:text-white'
                              size='small'
                              onClick={() => setDeleteListen(!deleteListen)}
                            >
                              {t('delete listing')}{' '}
                            </Button>
                          )}
                          <div className='float-left'>
                            {deleteListen && (
                              <>
                                <p className='mb-2'>
                                  <small>
                                    {' '}
                                    {t('Are you sure you want to delete?')}{' '}
                                  </small>
                                </p>
                                <Button
                                  size='small'
                                  className='text-end mr-2'
                                  onClick={() => handledeleteList(uniqId)}
                                >
                                  {t('Yes')}{' '}
                                </Button>
                                <Button
                                  layout='link'
                                  size='small'
                                  className='text-end mr-2 bg-white-200'
                                  onClick={() => setDeleteListen(!deleteListen)}
                                >
                                  {t('No')}{' '}
                                </Button>
                              </>
                            )}{' '}
                          </div>
                        </div>
                        {!deleteListen && (
                          <Button
                            layout=''
                            className='float-right bg-green-200 hover:bg-green-600 text-green-600 hover:text-white'
                            size='small'
                            onClick={() =>
                              setProceedToPayment(!proceedToPayment)
                            }
                          >
                            {t('Proceed to payment')}{' '}
                          </Button>
                        )}{' '}
                      </div>
                    )}
                    {!stopAutorenew &&
                      subscriptionExpire === false &&
                      subscription.subscriptionType != 'free' && (
                        <div className='w-full flex justify-between'>
                          <p className=''>
                            <small>{t('automatic renewal')} </small>
                          </p>
                          <Button
                            layout=''
                            className='float-left bg-gray-200 hover:bg-gray-100 text-gray-600 hover:text-gray'
                            size='small'
                            onClick={() => setStopAutorenew(!stopAutorenew)}
                          >
                            {t('Cancel Auto Renewal')}{' '}
                          </Button>
                        </div>
                      )}
                    {subscriptionExpire === true &&
                      subscriptionPause === false &&
                      new_date.getTime() >= Date.now() && (
                        <div className=''>
                          {!pauseListen && (
                            <Button
                              layout=''
                              className='float-left bg-gray-200 hover:bg-gray-100 text-gray-600 hover:text-gray'
                              size='small'
                              // onClick={() => handledeleteList(uniqId)}
                              onClick={() => setPauseListen(!pauseListen)}
                            >
                              {t('Pause the listing')}{' '}
                            </Button>
                          )}
                          <div className='float-left'>
                            {pauseListen && (
                              <>
                                <p className='mb-2'>
                                  <small>
                                    {' '}
                                    {t('Are you sure you want to pause?')}{' '}
                                  </small>
                                </p>
                                <Button
                                  size='small'
                                  className='text-end mr-2'
                                  onClick={() => handlePauseListen(uniqId)}
                                >
                                  {t('Yes')}{' '}
                                </Button>
                                <Button
                                  layout='link'
                                  size='small'
                                  className='text-end mr-2 bg-white-200'
                                  onClick={() => setPauseListen(!pauseListen)}
                                >
                                  {t('No')}{' '}
                                </Button>
                              </>
                            )}{' '}
                          </div>
                        </div>
                      )}
                    {subscription.subscriptionType != 'free' &&
                      subscriptionExpire === true &&
                      subscriptionPause === true && (
                        <div className=''>
                          <div className=''>
                            {!deleteListen && (
                              <Button
                                layout=''
                                iconLeft={DeleteIcon}
                                className='float-left bg-red-600 hover:bg-red-600 text-white hover:text-white'
                                size='small'
                                onClick={() => setDeleteListen(!deleteListen)}
                              >
                                {t('delete listing')}{' '}
                              </Button>
                            )}
                            <div className='float-left'>
                              {deleteListen && (
                                <>
                                  <p className='mb-2'>
                                    <small>
                                      {' '}
                                      {t(
                                        'Are you sure you want to delete?'
                                      )}{' '}
                                    </small>
                                  </p>
                                  <Button
                                    size='small'
                                    className='text-end mr-2'
                                    onClick={() => handledeleteList(uniqId)}
                                  >
                                    {t('Yes')}{' '}
                                  </Button>
                                  <Button
                                    layout='link'
                                    size='small'
                                    className='text-end mr-2 bg-white-200'
                                    onClick={() =>
                                      setDeleteListen(!deleteListen)
                                    }
                                  >
                                    {t('No')}{' '}
                                  </Button>
                                </>
                              )}{' '}
                            </div>
                          </div>
                          {!activateListen && (
                            <Button
                              layout=''
                              className='float-right bg-green-200 hover:bg-green-600 text-green-600 hover:text-white'
                              size='small'
                              onClick={() => setActivateListen(!activateListen)}
                            >
                              {t('Activate listing')}{' '}
                            </Button>
                          )}
                          <div className='float-right'>
                            {activateListen && (
                              <>
                                <p className='mb-2'>
                                  <small>
                                    {' '}
                                    {t(
                                      'Are you sure you want to activate?'
                                    )}{' '}
                                  </small>
                                </p>
                                <Button
                                  size='small'
                                  className='text-end mr-2'
                                  onClick={() => handleUnPauseListen(uniqId)}
                                >
                                  {t('Yes')}{' '}
                                </Button>
                                <Button
                                  layout='link'
                                  size='small'
                                  className='text-end mr-2 bg-white-200'
                                  onClick={() =>
                                    setActivateListen(!activateListen)
                                  }
                                >
                                  {t('No')}{' '}
                                </Button>
                              </>
                            )}{' '}
                          </div>
                        </div>
                      )}{' '}
                  </div>
                  <div className='ml-5 float-right'>
                    {stopAutorenew && (
                      <>
                        <p className='mb-2'>
                          <small>
                            {' '}
                            {t('You want to cancel the subscription?')}{' '}
                          </small>
                        </p>
                        <Button
                          size='small'
                          className='text-end mr-2'
                          onClick={() => handleCancelAutoRenew(uniqId)}
                        >
                          {t('Yes')}{' '}
                        </Button>
                        <Button
                          layout='link'
                          size='small'
                          className='text-end bg-gray-200 mr-2'
                          onClick={() => setStopAutorenew(!stopAutorenew)}
                        >
                          {t('No')}{' '}
                        </Button>
                      </>
                    )}{' '}
                  </div>
                </>
              )}{' '}
            </div>
          ) : (
            <div className='p-6 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800'>
              <Badge className='ml-4' type='warning'>
                {t('editing')}{' '}
              </Badge>
              {editData && (
                <Data
                  data={listData}
                  setFRequired={setFRequired}
                  fRequired={fRequired}
                ></Data>
              )}
              {editDetails && (
                <Details
                  data={listData}
                  setFRequired={setFRequired}
                  fRequired={fRequired}
                ></Details>
              )}
              {editDescription && (
                <Description
                  data={listData}
                  setFRequired={setFRequired}
                  fRequired={fRequired}
                ></Description>
              )}
              {editImages && (
                <Images
                  data={listData}
                  imagesList={imagesList}
                  setFRequired={setFRequired}
                  fRequired={fRequired}
                ></Images>
              )}
              {editContact && (
                <Contact
                  data={listData}
                  setFRequired={setFRequired}
                  fRequired={fRequired}
                ></Contact>
              )}
              {editAddress && (
                <Address
                  data={listData}
                  setFRequired={setFRequired}
                  fRequired={fRequired}
                ></Address>
              )}{' '}
            </div>
          )}{' '}
        </>
      ) : (
        <>
          <div className='p-6 mb-4 bg-white rounded-lg shadow-md dark:bg-gray-800'>
            <Submit
              listData={listData}
              setListData={setListData}
              pages={true}
            />
            <Button
              layout=''
              className='mt-6 float-left bg-gray-200 hover:bg-gray-600 text-gray-600 hover:text-white'
              size='small'
              onClick={() => {
                setProceedToPayment(!proceedToPayment);
                // history.go(0);
              }}
            >
              {t('< Back to editing')}{' '}
            </Button>
          </div>
        </>
      )}{' '}
    </>
  );
}

const RenderAccordion = ({ details }) => {
  const { t } = useTranslation();
  return (
    <div>
      <ul className='my-3 break-all'>
        {details.map((data, index) => {
          const objKey = Object.keys(data)[0];
          const objValue = data[Object.keys(data)[0]];

          return (
            <li className='' key={index}>
              {`${t(objKey)}: ${t(objValue)}`}
            </li>
          );
        })}{' '}
      </ul>
    </div>
  );
};