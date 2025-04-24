import React, { useState, useContext, useEffect } from "react";
import PageError from "./Error";
import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import BillingForm from "../components/Forms/BillingForm";
import PricingCard from "../components/Cards/PricingCard";
import BillingDetailsCard from "../components/Cards/BillingDetailsCard";
import { SnackbarContext } from "../context/SnackbarContext";
import { StripeContext } from "../context/StripeContext";
import { stripeService } from "../services";
import { HelperText } from "@windmill/react-ui";
import { useStripe } from "@stripe/react-stripe-js";

function Products({ listData, uniqId, enabled, PricingCardCallback }) {
  const { products } = useContext(StripeContext);

  return (
    <div className="grid gap-6 mb-8 md:grid-cols-3">
      {products &&
        products.map(function (product, i) {
          if (
            !product.product.active &&
            listData.subscription.subscriptionType !==
              product.product.metadata.type
          ) {
            return null;
          }
          return (
            <PricingCard
              key={i}
              title={product.product.name}
              type={product.product.metadata.type}
              value={
                product.price.currency_symbol +
                product.price.unit_amount / 100 +
                " / " +
                product.price.recurring.interval
              }
              active={
                listData.subscription.subscriptionType ===
                product.product.metadata.type
              }
              enabled={enabled}
              listData={listData}
              uniqId={uniqId}
              callback={PricingCardCallback}
            />
          );
        })}
    </div>
  );
}

// const Billing = ({ listData, setListData }) => {
//   const stripe = useStripe();
//   const { openSnackbar, closeSnackbar } = useContext(SnackbarContext);
//   // const { user, setUser } = useContext(AuthContext)
//   const [editBillingDetails, setEditBillingDetails] = useState(false);
//   const [enabled, setEnabled] = useState(true);
//   const [error, setError] = useState(null);
//   useEffect(() => {
//     if (enabled) {
//       closeSnackbar();
//     } else {
//       openSnackbar("Updating subscription..");
//     }
//   }, [enabled, openSnackbar, closeSnackbar]);

//   const handlePaymentThatRequiresCustomerAction = (subscription) => {
//     if (!subscription) {
//       return;
//     }
//     if (subscription && subscription.status === "active") {
//       return subscription;
//     }
//     const paymentIntent = subscription.latest_invoice.payment_intent;
//     if (paymentIntent.status === "requires_action") {
//       return stripe
//         .confirmCardPayment(paymentIntent.client_secret, {
//           payment_method: listData.stripePaymentMethod.id,
//         })
//         .then((result) => {
//           if (result.error) {
//             throw Object.assign(new Error(result.error.message), {
//               response: { data: { message: result.error.message } },
//             });
//           } else {
//             if (result.paymentIntent.status === "succeeded") {
//               return subscription;
//             } else {
//               throw Object.assign(new Error("Some error occured"));
//             }
//           }
//         })
//         .catch((error) => {
//           stripeService.deleteSubscription(subscription.id);
//           throw error;
//         });
//     } else {
//       return subscription;
//     }
//   };

//   const onSubscriptionComplete = (subscription, uniqId) => {
//     if (!subscription) return;
//     if (subscription.status === "active") {
//       return stripeService.completeSubscription(
//         subscription.id,
//         subscription.items.data[0].price.product,
//         uniqId
//       );
//     } else {
//       throw Object.assign(new Error("Some error occured"));
//     }
//   };
//   const [paymentDetails, setpaymentDetails] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(false);
//   const handleSubscription = (type, uniqId, stripeId) => {
//     if (paymentDetails) {
//       setErrorMessage(false);
//       setEnabled(false);
//       setError(null);
//       stripeService
//         .createSubscription(type, uniqId, stripeId)
//         .then(handlePaymentThatRequiresCustomerAction)
//         .then((subscription) => onSubscriptionComplete(subscription, uniqId))
//         .then(() => {
//           setListData((listData) => {
//             const newUser = {
//               ...listData,
//               subscription: { subscriptionType: type },
//             };
//             setEnabled(true);
//             return newUser;
//           });
//         })
//         .catch((error) => {
//           console.log(error);
//           if (error.response) setError(error.response.data.message);
//           else setError("Some error occured.");
//           setEnabled(true);
//         });
//     } else {
//       setErrorMessage(true);
//     }
//   };

//   const billingFormCallback = (userList) => {
//     setpaymentDetails(true);
//     setErrorMessage(false);
//     setListData(userList);
//     setEditBillingDetails(false);
//   };
//   const BillingDetailsCardCallback = () => {
//     setEditBillingDetails(true);
//   };

//   const PricingCardCallback = (type, uniqId, stripeId) => {
//     handleSubscription(type, uniqId, stripeId);
//   };

//   if (!listData) {
//     return <PageError message="Some error occured : please try again." />;
//   }

//   return (
//     <>
//       <SectionTitle>Billing Details</SectionTitle>
//       {listData.stripePaymentMethod && !editBillingDetails && (
//         <BillingDetailsCard
//           listData={listData}
//           callback={BillingDetailsCardCallback}
//         />
//       )}
//       {(!listData.stripePaymentMethod || editBillingDetails) && (
//         <BillingForm uniqId={listData.uniqId} callback={billingFormCallback} />
//       )}
//       {listData.stripePaymentMethod && !editBillingDetails && (
//         <div>
//           <PageTitle>Billing</PageTitle>
//           <SectionTitle>Plans</SectionTitle>
//           <Products
//             listData={listData}
//             uniqId={listData.uniqId}
//             enabled={enabled}
//             PricingCardCallback={PricingCardCallback}
//           />
//           {error && (
//             <HelperText valid={false} className="mb-8 text-sm">
//               {error}
//             </HelperText>
//           )}
//           {errorMessage && (
//             <HelperText valid={false} className="mb-8 text-sm">
//               provide Billing details
//             </HelperText>
//           )}
//         </div>
//       )}
//     </>
//   );
// };
//export default Billing;