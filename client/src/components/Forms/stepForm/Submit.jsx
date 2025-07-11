import React, { useState, useContext, useEffect } from 'react';
 
import { PricingCardSale } from '../../Cards/PricingCardCheckout';
import { SnackbarContext } from '../../../context/SnackbarContext';
import { StripeContext } from '../../../context/StripeContext'; 
import { HelperText } from '@windmill/react-ui';
import { useTranslation } from 'react-i18next';
import { useStripe } from '@stripe/react-stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { config } from '../../../assets/config/config';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { dictionary } from '../../../resources/multiLanguages';
import 'react-tabs/style/react-tabs.css';

// console.log('=========================',process.env.REACT_APP_STRIPE_PUBLIC_KEY);  
const stripePromise = loadStripe('pk_test_51QX5j82MtPL2aPEKFGOOrrMZ1BtMjXtqN00FHmQpuvgIsMk6iromQ67GeTJL7hwca9Jzv5xa2efR4yKiXeS6E3pB0076WqrjSM');

function Products({ products, listData, enabled, PricingCardCallback, pages, subscriptionDuration }) {
  const languageReducer= "de";

  let listingType;
  if (listData.listingType === 'For Rent') {
    listingType = 'rent';
  } else {
    listingType = 'sale';
  }  
  console.log("stripePromise", stripePromise)
  console.log("-------------------------------------ll-", listingType, products, listData, enabled, PricingCardCallback, pages, subscriptionDuration); 
  return (
    <div className={`grid gap-2 lg:gap-3 xl:gap-4 mb-4 grid-cols-1 xl:grid-cols-3`}>
      {products &&
        products.map(function (product, i) {
          console.log(product);
          console.log(product.listingType);
          if (listingType !== product.listingType) {
            return null;
          }
          console.log('listData=================', listData)
          console.log("inside map")

          if (product.subscriptionDuration !== subscriptionDuration) return null;
          console.log(listingType)
          console.log(product.subscriptionDuration)

          const month = product.subscriptionDuration === 1
            ? dictionary["prices"][languageReducer]["month1"]
            : product.subscriptionType === 2
              ? dictionary["prices"][languageReducer]["month2"]
              : dictionary["prices"][languageReducer]["month3"]
          ;
        

          return (
            <PricingCardSale
              packageId={product._id}
              key={i}
              title={product.packageName}
              type={product.subscriptionType}
              value={product.price + ' ' + '€'}
              enabled={enabled}
              listData={listData}
              month={month}
              // uniqId={uniqId}
              callback={PricingCardCallback}
            />
          );
        })}
    </div>
  );
}


const ProductsSection = ({
  pages,
  listData,
  uniqId,
  enabled,
  PricingCardCallback,
}) => {
  const { products } = useContext(StripeContext);

  console.log("Products", products)
  const languageReducer = "de";
  return (
    <div>


      <Tabs className="w-full mb-12">

        <TabList className="flex justify-center gap-0 mb-16">
          <Tab className="cursor-pointer bg-gray-100 text-gray-700 px-5 py-2 rounded-l-lg text-sm font-normal">
            {dictionary["prices"][languageReducer]["month1"]}
          </Tab>
          <Tab className="cursor-pointer bg-gray-100 text-gray-700 px-5 py-2 rounded-l-lg text-sm font-normal">
            {dictionary["prices"][languageReducer]["month2"]}
          </Tab>
          <Tab className="cursor-pointer bg-gray-100 text-gray-700 px-4 py-2 rounded-r-lg text-sm font-normal">
            {dictionary["prices"][languageReducer]["month3"]}
          </Tab>
        </TabList>

        <TabPanel>
          <Products
            products={products}
            subscriptionDuration={1}
            pages={pages}
            listData={listData}
            uniqId={listData.uniqId}
            enabled={enabled}
            PricingCardCallback={PricingCardCallback}
          />
        </TabPanel>
        <TabPanel>
          <Products
            products={products}
            subscriptionDuration={2}
            pages={pages}
            listData={listData}
            uniqId={listData.uniqId}
            enabled={enabled}
            PricingCardCallback={PricingCardCallback}
          />
        </TabPanel>
        <TabPanel>
          <Products
            products={products}
            subscriptionDuration={3}
            pages={pages}
            listData={listData}
            uniqId={listData.uniqId}
            enabled={enabled}
            PricingCardCallback={PricingCardCallback}
          />
        </TabPanel>
      </Tabs>
    </div>

  )
}

export const Submit = ({ listData, setListData, pages }) => {
  const stripe = useStripe();
  const { openSnackbar, closeSnackbar } = useContext(SnackbarContext);
  const [enabled, setEnabled] = useState(true);
  const [error, setError] = useState(null);
  const [type, setType] = useState('');
  const [value, setValue] = useState();
  const [paypalId, setPaypalId] = useState();
  const [stripeId, setStripeId] = useState();
//   const history = useNavigate();
  const { t } = useTranslation();

  const languageReducer = "de";

  useEffect(() => {
    if (enabled) {
      closeSnackbar();
    } else {
      openSnackbar(t('Updating subscription...'));
    }
  }, [enabled, openSnackbar, closeSnackbar]);

  const [errorMessage, setErrorMessage] = useState(false);

  console.log('listData', listData)

  const PricingCardCallback = async (packageId, listingId) => {

    if(!listData?._id){
      openSnackbar(t('Server error, please try again!'));
      return;
    }
    
    try {
      const { data } = await axios.post(`${config.api.url}/payment/stripe/create-checkout-session`, {
        packageId,
        listingId: listData?._id,
      });  
      const stripe = await stripePromise; 

      const { error } = await stripe.redirectToCheckout({
        sessionId: data.data.id,
      });

      // if (error) {
      //   console.error('Error redirecting to checkout:', error);
      // }else{ 
      //   const { data } = await axios.get(`${config.api.url}/payment/stripe-webhooks?session_id={CHECKOUT_SESSION_ID}`); 
      //    if(data){
      //     openSnackbar(t('Payment successful!'), 'success', 3000);
      //    }else{
      //     openSnackbar(t('Payment successful! But not update in Database please contact with admin'), 'error', 400);
      //    } 
      // }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <div className='px-0  mt-4'>
        <h2 className="text-center mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
          {dictionary["submit"][languageReducer]["title"]}
        </h2>

        <ProductsSection
          pages={pages}
          listData={listData}
          uniqId={listData.uniqId}
          enabled={enabled}
          PricingCardCallback={PricingCardCallback}
        />


        {error && (
          <HelperText valid={false} className='mb-8 text-sm'>
            {error}
          </HelperText>
        )}
        {errorMessage && (
          <HelperText valid={false} className='mb-8 text-sm'>
            provide Billing details
          </HelperText>
        )}
      </div>
    </>
  );
};