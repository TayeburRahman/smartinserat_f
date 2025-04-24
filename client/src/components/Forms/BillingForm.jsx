import React, { useState, useContext } from 'react';
import {
  CardElement,
  useStripe,
  useElements,
  // IbanElement,
} from '@stripe/react-stripe-js';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import {
  Input,
  HelperText,
  Label,
  Textarea,
  Button,
  // Select,
} from '@windmill/react-ui';
import { stripeService } from '../../services';
// import Paypal from '../Paypal/paypal';
// import SEPA_Payment_Form from "./SEPA_Payment_Form";
// import SEPA_Checkout from './SEPA_Checkout';
import { AuthContext } from '../../context/AuthContext';
import { SnackbarContext } from '../../context/SnackbarContext';

// const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });

function BillingForm({ callback, uniqId, value, type, paypalId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState(null);
  const [consent, setConsent] = useState(false);
  const [required, setRequired] = useState(false);
  const [formError, setFormError] = useState(null);
  // const [option, setOption] = useState('Paypal');
  // const [sepaPaymentId, setSepaPaymentId] = useState();
  const { user } = useContext(AuthContext);
  const { openSnackbar } = useContext(SnackbarContext);
  const { t } = useTranslation();
  // const sepaClientSecret = localStorage.getItem('sepaClientSecret');

  // const createOrder = (data, actions) => {
  //   return actions.order.create({
  //     purchase_units: [
  //       {
  //         amount: {
  //           value: '0.01',
  //         },
  //       },
  //     ],
  //   });
  // };

  // const handleOption = (e) => {
  //   setOption(e.target.value);
  // };
  // const onApprove = (data, actions) => {
  //   return actions.order.capture();
  // };


  const handleSubmit = async (username, address, country) => {
    if (!consent) {
      setRequired(true);
      return;
    }
    setRequired(false);
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    return stripe
      .createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: user.name,
          address: {
            line1: address,
            country: country,
          },
        },
      })
      .then(({ error, paymentMethod }) => {
        console.log('here2');

        if (error) {
          console.log('here3', error);

          throw error;
        } else {
          console.log('here4');

          return stripeService
            .updatePaymentMethod(
              paymentMethod.id,
              { line1: address, country: country },
              uniqId
            )
            .then((user) => {
              console.log('user');

              return user;
            })
            .catch((err) => {
              console.log('err', err);
              throw err;
            });
        }
      })
      .catch((err) => {
        console.log('err', err);
        throw err;
      });
  };

  return (
    <>
      <div className='mb-4 py-3 bg-white rounded-lg dark:bg-gray-800'>
        <Formik
          initialValues={{
            username: user.name,
            address: '',
            country: 'DE',
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string().required('Name is required'),
            address: Yup.string().required('Address is required'),
            country: Yup.string().required('Country is required'),
          })}
          onSubmit={(
            { username, address, country },
            { setStatus, setSubmitting }
          ) => {
            setSubmitting(true);
            setFormError(null);
            setStatus();
            handleSubmit(username, address, country)
              .then((user) => {
                if (!user) {
                  openSnackbar(t('Payment Failed!'), 'danger', 3000);
                  setSubmitting(false);
                  return;
                }
                setSubmitting(false);
                callback(user);
              })
              .catch((err) => {
                setSubmitting(false);
                openSnackbar(t('Payment Failed!'), 'danger', 3000);
                if (err.response && err.response.data.message) {
                  setFormError(err.response.data.message);
                } else {
                  setFormError('Some error occured!');
                }
              });
          }}
        >
          {({ errors, status, touched, isSubmitting }) => (
            <Form>

                <>
                  <Label className='mt-4'>
                    <span>{t('Your Name')}:</span>
                    <Field
                      className='mt-1'
                      as={Input}
                      name='username'
                      type='text'
                      placeholder={t('enter your name')}
                    />
                    {errors.username && touched.username ? (
                      <HelperText valid={false}>{errors.username}</HelperText>
                    ) : null}
                  </Label>

                  <Label className='mt-4'>
                    <span>{t('Billing Address')}:</span>
                    <Field
                      className='mt-1'
                      as={Textarea}
                      rows='3'
                      name='address'
                      placeholder={t('Enter Billing Address')}
                    />
                    {errors.address && touched.address ? (
                      <HelperText valid={false}>{errors.address}</HelperText>
                    ) : null}
                  </Label>

                  <Label className='mt-4'>
                    <span>{t('Card Details')}:</span>
                    <CardElement
                      onChange={(res) => {
                        setCardError(res.error);
                      }}
                      className='mt-1 p-3 bg-white block w-full dark:text-gray-300 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700'
                    />
                    {cardError ? (
                      <HelperText valid={false}>{cardError.message}</HelperText>
                    ) : null}
                  </Label>
                  <div className='flex'>
                    <Input
                      value={consent}
                      onChange={() => setConsent(!consent) & setRequired(false)}
                      className='mt-6'
                      type='checkbox'
                    ></Input>
                    <span className='ml-2 mt-6 text-xs leading-4'>
                      Hiermit bestätige ich, die{' '}
                      <a target='_blank' href='/agb'>
                        Allgemeinen Geschäftsbedingungen
                      </a>{' '}
                      {'/'}{' '}
                      <a target='_blank' href='/widerrufsbelehrung'>
                        Widerrufsbelehrung
                      </a>{' '}
                      gelesen zu haben und akzeptiere diese.
                    </span>
                  </div>
                  {required && (
                    <HelperText className='mt-2' valid={false}>
                      {t('Required')}
                    </HelperText>
                  )}
                  {/* {<HelperText valid={true}>
                    Use any stripe test card, eg: 4242 4242 4242 4242
                  </HelperText>} */}

                  <Button
                    className='mt-6'
                    block
                    type='submit'
                    value='submit'
                    disabled={!stripe || isSubmitting}
                  >
                    {t('Complete Payment')}
                  </Button>
                </>
              
              {status && (
                <HelperText valid={false}>{status.message}</HelperText>
              )}
              {formError && <HelperText valid={false}>{formError}</HelperText>}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default BillingForm;
// import React, { useState, useContext } from 'react';
// import {
//   CardElement,
//   useStripe,
//   useElements,
//   IbanElement,
// } from '@stripe/react-stripe-js';
// import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';
// import { useTranslation } from 'react-i18next';
// import {
//   Input,
//   HelperText,
//   Label,
//   Textarea,
//   Button,
//   Select,
// } from '@windmill/react-ui';
// import { stripeService } from '../../services';
// import Paypal from '../Paypal/paypal';
// // import SEPA_Payment_Form from "./SEPA_Payment_Form";
// import SEPA_Checkout from './SEPA_Checkout';
// import { AuthContext } from '../../context/AuthContext';
// import { SnackbarContext } from '../../context/SnackbarContext';

// // const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });

// function BillingForm({ callback, uniqId, value, type, paypalId }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [cardError, setCardError] = useState(null);
//   const [consent, setConsent] = useState(false);
//   const [required, setRequired] = useState(false);
//   const [formError, setFormError] = useState(null);
//   const [option, setOption] = useState('Paypal');
//   const [sepaPaymentId, setSepaPaymentId] = useState();
//   const { user } = useContext(AuthContext);
//   const { openSnackbar } = useContext(SnackbarContext);
//   const { t } = useTranslation();
//   const sepaClientSecret = localStorage.getItem('sepaClientSecret');

//   const createOrder = (data, actions) => {
//     return actions.order.create({
//       purchase_units: [
//         {
//           amount: {
//             value: '0.01',
//           },
//         },
//       ],
//     });
//   };

//   const handleOption = (e) => {
//     setOption(e.target.value);
//   };
//   const onApprove = (data, actions) => {
//     return actions.order.capture();
//   };

//   const handleSubmitSEPA = async (pmMethod, address) => {
//     return stripeService
//       .updatePaymentMethod(
//         pmMethod,
//         { line1: address, country: 'DE' },
//         uniqId,
//         true
//       )
//       .then((user) => {
//         return user;
//       });
//   };

//   const handleSubmit = async (username, address, country) => {
//     if (!consent) {
//       setRequired(true);
//       return;
//     }
//     setRequired(false);
//     if (!stripe || !elements) {
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);
//     if (option === 'SEPA-Lastschrift') {
//       console.log('SEPA-Lastschrift');
//       const iban = elements.getElement(IbanElement);

//       try {
//         const result = await stripe.confirmSepaDebitSetup(sepaClientSecret, {
//           payment_method: {
//             sepa_debit: iban,
//           },
//         });
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     console.log('here');
//     return stripe
//       .createPaymentMethod({
//         type: 'card',
//         card: cardElement,
//         billing_details: {
//           name: user.name,
//           address: {
//             line1: address,
//             country: country,
//           },
//         },
//       })
//       .then(({ error, paymentMethod }) => {
//         console.log('here2');

//         if (error) {
//           console.log('here3', error);

//           throw error;
//         } else {
//           console.log('here4');

//           return stripeService
//             .updatePaymentMethod(
//               paymentMethod.id,
//               { line1: address, country: country },
//               uniqId
//             )
//             .then((user) => {
//               console.log('user');

//               return user;
//             })
//             .catch((err) => {
//               console.log('err', err);
//               throw err;
//             });
//         }
//       })
//       .catch((err) => {
//         console.log('err', err);
//         throw err;
//       });
//   };

//   return (
//     <>
//       <div className='mb-4 py-3 bg-white rounded-lg dark:bg-gray-800'>
//         <Formik
//           initialValues={{
//             username: user.name,
//             address: '',
//             country: 'DE',
//           }}
//           validationSchema={Yup.object().shape({
//             username: Yup.string().required('Name is required'),
//             address: Yup.string().required('Address is required'),
//             country: Yup.string().required('Country is required'),
//           })}
//           onSubmit={(
//             { username, address, country },
//             { setStatus, setSubmitting }
//           ) => {
//             setSubmitting(true);
//             setFormError(null);
//             setStatus();
//             handleSubmit(username, address, country)
//               .then((user) => {
//                 if (!user) {
//                   openSnackbar(t('Payment Failed!'), 'danger', 3000);
//                   setSubmitting(false);
//                   return;
//                 }
//                 setSubmitting(false);
//                 callback(user);
//               })
//               .catch((err) => {
//                 setSubmitting(false);
//                 openSnackbar(t('Payment Failed!'), 'danger', 3000);
//                 if (err.response && err.response.data.message) {
//                   setFormError(err.response.data.message);
//                 } else {
//                   setFormError('Some error occured!');
//                 }
//               });
//           }}
//         >
//           {({ errors, status, touched, isSubmitting }) => (
//             <Form>
//               <Label className=''>
//                 <span>{t('Payment method')}:</span>
//               </Label>
//               <Select
//                 className='mb-4 mt-1'
//                 label='payment method'
//                 name='paymentmethod'
//                 margin='normal'
//                 variant='outlined'
//                 autoComplete='off'
//                 onChange={(e) => handleOption(e)}
//                 fullwidth='true'
//               >
//                 <option>{t('Paypal')}</option>
//                 <option value='Credit Card'>{t('Credit Card')}</option>
//                 <option>{t('SEPA-Lastschrift')}</option>
//                 {/* <option>{t("Apple Pay")}</option> */}
//               </Select>
//               {option === 'Credit Card' ? (
//                 <>
//                   <Label className='mt-4'>
//                     <span>{t('Your Name')}:</span>
//                     <Field
//                       className='mt-1'
//                       as={Input}
//                       name='username'
//                       type='text'
//                       placeholder={t('enter your name')}
//                     />
//                     {errors.username && touched.username ? (
//                       <HelperText valid={false}>{errors.username}</HelperText>
//                     ) : null}
//                   </Label>

//                   <Label className='mt-4'>
//                     <span>{t('Billing Address')}:</span>
//                     <Field
//                       className='mt-1'
//                       as={Textarea}
//                       rows='3'
//                       name='address'
//                       placeholder={t('Enter Billing Address')}
//                     />
//                     {errors.address && touched.address ? (
//                       <HelperText valid={false}>{errors.address}</HelperText>
//                     ) : null}
//                   </Label>

//                   <Label className='mt-4'>
//                     <span>{t('Card Details')}:</span>
//                     <CardElement
//                       onChange={(res) => {
//                         setCardError(res.error);
//                       }}
//                       className='mt-1 p-3 bg-white block w-full dark:text-gray-300 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700'
//                     />
//                     {cardError ? (
//                       <HelperText valid={false}>{cardError.message}</HelperText>
//                     ) : null}
//                   </Label>
//                   <div className='flex'>
//                     <Input
//                       value={consent}
//                       onChange={() => setConsent(!consent) & setRequired(false)}
//                       className='mt-6'
//                       type='checkbox'
//                     ></Input>
//                     <span className='ml-2 mt-6 text-xs leading-4'>
//                       Hiermit bestätige ich, die{' '}
//                       <a target='_blank' href='/agb'>
//                         Allgemeinen Geschäftsbedingungen
//                       </a>{' '}
//                       {'/'}{' '}
//                       <a target='_blank' href='/widerrufsbelehrung'>
//                         Widerrufsbelehrung
//                       </a>{' '}
//                       gelesen zu haben und akzeptiere diese.
//                     </span>
//                   </div>
//                   {required && (
//                     <HelperText className='mt-2' valid={false}>
//                       {t('Required')}
//                     </HelperText>
//                   )}
//                   {/* {<HelperText valid={true}>
//                     Use any stripe test card, eg: 4242 4242 4242 4242
//                   </HelperText>} */}

//                   <Button
//                     className='mt-6'
//                     block
//                     type='submit'
//                     value='submit'
//                     disabled={!stripe || isSubmitting}
//                   >
//                     {t('Complete Payment')}
//                   </Button>
//                 </>
//               ) : option === 'Paypal' ? (
//                 <Paypal
//                   value={value}
//                   uniqId={uniqId}
//                   type={type}
//                   paypalId={paypalId}
//                 />
//               ) : option === 'SEPA-Lastschrift' ? (
//                 // eslint-disable-next-line react/jsx-pascal-case
//                 <SEPA_Checkout
//                   setSepaPaymentId={setSepaPaymentId}
//                   handleSubmitSEPA={handleSubmitSEPA}
//                   callback={callback}
//                   userEmail={user.email}
//                 />
//               ) : null}
//               {status && (
//                 <HelperText valid={false}>{status.message}</HelperText>
//               )}
//               {formError && <HelperText valid={false}>{formError}</HelperText>}
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </>
//   );
// }

// export default BillingForm;