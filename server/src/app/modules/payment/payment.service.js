const httpStatus = require("http-status");
const config = require("../../../config");
const ApiError = require("../../../errors/ApiError");
const User = require("../user/user.model");
// const Driver = require("../driver/driver.model");
const Payment = require("./payment.model");
const Packages = require("../packages/packages.model");
const UserList = require("../user-list/user-list.model");
const { generateCognitoToken } = require("../flowfact/flowfact.service");
const stripe = require("stripe")(config.stripe.stripe_secret_key);
const axios = require('axios');
const YOUR_DOMAIN = process.env.RESET_PASS_UI_LINK;

const createCheckoutSession = async (req) => {
  try {
    const { packageId, listingId } = req.body
    const { userId } = req.user

    const user = await User.findById(userId)


    const package = await Packages.findById(packageId)
    if (!package) {
      throw new ApiError(httpStatus.NOT_FOUND, 'invalid package ID.');
    }

    const packagePrice = Number(package.price); // Convert package.price to a number
    const unitAmount = packagePrice * 100; 

    const listing = await UserList.findById(listingId)
    if(!listing?._id){
      throw new ApiError(400, "Server reference error! please try again!");
    }
     
    console.log("config.stripe.stripe_secret_key", config.stripe.stripe_secret_key)
    let session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}app/payment/stripe-webhooks/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}app/userLists?canceled=true`,
      customer_email: `${user.email}`,
      client_reference_id: listingId,
      metadata: { packageId: package._id.toString(), listingId, userId },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: unitAmount,
            product_data: {
              name: package.packageName,
              description: package.packageDescription
            }
          },
          quantity: 1
        }
      ]
    })

    console.log("session", session)

    return session;

  } catch (error) {
    throw new ApiError(400, error);
  }
};

const checkAndUpdateStatusByWebhook = async (req) => {
 
  // ===========================================
  const sessionId = req.query.session_id;  

  if (!sessionId) {
    return { status: "failed", message: "Missing session ID in the request." };
  }
   const session = await stripe.checkout.sessions.retrieve(sessionId); 

  if (session.payment_status === 'paid') {

    // const session = event.data.object;
    const listingId = session.metadata.listingId;
    const paymentIntentId = session.payment_intent;
    const packageId = session.metadata.packageId;

    try {

      const package = await Packages.findById(packageId);
      if (!package) {
        throw new ApiError(404, 'Package not found');
      }

      const subscriptionType = package.subscriptionType;  
      const subscriptionStartDate = new Date();
      const subscriptionEndDate = new Date(subscriptionStartDate);
 
      subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + package.subscriptionDuration);

      const data = await UserList.findByIdAndUpdate(
        listingId,
        {
          $set: {
            paymentIntentId: paymentIntentId,
            paymentStatus: 'completed',
            subscription: {
              type: subscriptionType,
            },
            subscriptionUpdatedAt: subscriptionStartDate,
            activeUntil: subscriptionEndDate,
            subscriptionExpire: false,
            inactive: false,
            status: "active"
          },
        },
        { new: true }
      );

      if (!data) {
        throw new ApiError(404, 'UserList entry not found');
      }

      if (!data.unitsId) {
        console.log('Missing unitsId in UserList');
      } else {
        const unitData = {
          property: {
            archived: false,
          },
        };

        const response = await axios.put(
          `https://api.propstack.de/v1/units/${data.unitsId}`,
          unitData,
          {
            headers: {
              "X-API-KEY": "VuovV2F1EXBaZ9JUMalFy1E5gHL90Ji6-rkYracX",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response?.data) {
          throw new ApiError(httpStatus.BAD_GATEWAY, 'Failed to update unit status in Propstack');
        }

        await Payment.create({
          paymentMethod: 'card',
          user: session.metadata.userId,  
          listingId: listingId,
          amount: session.amount_total / 100,  
          transactionId: session.payment_intent,
          status: 'completed',
          note: `Payment successful for package: ${package.subscriptionType}`,
        });

        console.log(`Unit status updated in Propstack:`, response.data);
      }
 
      data.status = true;  
       return data
    } catch (err) {
      console.error(`Error updating UserList: ${err.message}`);
      throw new ApiError(500, `Database Error: ${err.message}`);
    }
  } else {
    console.log(`Unhandled event type: ${event.type}`);
  }
}
 
 
const pauseSubscription = async (req) => {
  const uniqId = req.body.uniqId;
  const userId = req.user.userId;

  try {
    const data = await UserList.findById(uniqId);

    if (!data) {
      throw new ApiError(400, "List not found");
    }

    const currentUser = await User.findById(userId).populate("authId");

    if (
      currentUser?.authId?.role !== "ADMIN" &&
      data.email !== currentUser?.email
    ) {
      throw new ApiError(403, "Unauthorized");
    }

    data.status = "inactive";
    data.subscriptionPause = true;
    data.subscriptionUpdatedAt = new Date();

    const unitData = {
      property: {
        archived: true,
      },
    };

    const response = await axios.put(
      `https://api.propstack.de/v1/units/${data.unitsId}`,
      unitData,
      {
        headers: {
          "X-API-KEY": "VuovV2F1EXBaZ9JUMalFy1E5gHL90Ji6-rkYracX",
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      throw new ApiError(502, "Failed to update Propstack unit status");
    }

    await data.save();

    console.log('=================', data)

    return data;
  } catch (error) {
    console.error("Pause subscription error:", error);
    throw new ApiError(500, "Something went wrong");
  }
};


const unpauseSubscription = async (req) => {
  const uniqId = req.body.uniqId;
  const userId = req.user.userId;

  try {
    const data = await UserList.findById(uniqId);

    if (!data) {
      throw new ApiError(400, "List not found");
    }

    const currentUser = await User.findById(userId).populate("authId");

    if (currentUser?.authId?.role !== "ADMIN" && data.email !== currentUser?.email) {
      throw new ApiError(403, "Unauthorized");
    }

    // Set fields
    data.subscriptionPause = false;
    data.status = "active";
    data.subscriptionUpdatedAt = new Date(); 

    const unitData = {
      property: {
        archived: false,
      },
    };

    const response = await axios.put(
      `https://api.propstack.de/v1/units/${data.unitsId}`,
      unitData,
      {
        headers: {
          "X-API-KEY": "VuovV2F1EXBaZ9JUMalFy1E5gHL90Ji6-rkYracX",
          "Content-Type": "application/json",
        },
      }
    );


    await data.save();

    return data;
  } catch (error) {
    console.error("Unpause subscription error:", error);
    throw new ApiError(500, "Something went wrong");
  }
};



const PaymentService = {
  createCheckoutSession,
  checkAndUpdateStatusByWebhook,
  pauseSubscription,
  unpauseSubscription
};

module.exports = PaymentService;


// async function publishTo4Platforms(data, immoscot, ebay, immowelt, wordpress) {
//   try {
//     const cognitoToken = await generateCognitoToken();
//     //process.env.IMMOSCOUT24_ID
//     if (immoscot) {
//       await flowFactPlatform(process.env.IMMOSCOUT24_ID, data, cognitoToken);
//     }
//     if (ebay) {
//       await flowFactPlatform(process.env.EBAY_KLEINANZEIGEN_ID, data, cognitoToken);
//     }
//     if (immowelt) {
//       await flowFactPlatform(process.env.IMMOWELT_IMMONET_ID, data, cognitoToken);
//     }
//     if (wordpress) {
//       await flowFactPlatform(process.env.WORDPRESS, data, cognitoToken);
//     }
//   } catch (er) {
//     console.log(er);
//     return true;
//   }
// }

//pause subs

// const publishMapping = {
//   BASIC: () => publishTo4Platforms(data, true, true, false, false),
//   MEDIUM: () => publishTo4Platforms(data, true, true, true, false),
//   PREMIUM: () => publishTo4Platforms(data, true, true, true, false)
// };

// await publishMapping[data.subscription.type](); 