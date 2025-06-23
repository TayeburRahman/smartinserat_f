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

    let session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}app/payment/stripe-webhooks/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}app/userLists?canceled=true`,
      customer_email: `${user.email}`,
      client_reference_id: listingId,
      metadata: { packageId: package._id.toString(), listingId },
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

    return session;

  } catch (error) {
    throw new ApiError(400, error);
  }
};


const checkAndUpdateStatusByWebhook = async (req) => {
  // const sig = req.headers['stripe-signature'];
  // let event;
  // try {
  //   event = stripe.webhooks.constructEvent(req.body, sig, config.stripe.endpoint_secret);
  //   // event = stripe.webhooks.constructEvent(req.body, sig, 'whsec_9d3f294e767ee851892730c440f5bc9936aee58afb59ef536aaf6de952698b7e');
  // } catch (err) {
  //   console.error(`Webhook signature verification failed: ${err.message}`);
  //   throw new ApiError(400, `Webhook Error: ${err.message}`);
  // }
  // console.log("createCheckoutSession",event, sig)
  // ===========================================
  const sessionId = req.query.session_id;  

  if (!sessionId) {
    return { status: "failed", message: "Missing session ID in the request." };
  }
   const session = await stripe.checkout.sessions.retrieve(sessionId);

   console.log('session=========================',session) 

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
            subscriptionExpire: true,
            inactive: false,
            status: "active"
          },
        },
        { new: true }
      );

      if (!data) {
        throw new ApiError(404, 'UserList entry not found');
      }

      // const 

      data.status = true; 
      console.log(`Order updated successfully: ${data}`);
       return data
    } catch (err) {
      console.error(`Error updating UserList: ${err.message}`);
      throw new ApiError(500, `Database Error: ${err.message}`);
    }
  } else {
    console.log(`Unhandled event type: ${event.type}`);
  }
}

async function flowFactPlatform(id, data, cognitoToken) {
  try {
    await axios.post(
      `https://api.production.cloudios.flowfact-prod.cloud/portal-management-service/publish`,
      {
        entries: [
          {
            entityId: data.entityId,
            showAddress: data.hideAddress ? false : true,
            targetStatus: data.status ? 'ONLINE' : 'OFFLINE',
            publishChannels:
              id === process.env.IMMOSCOUT24_ID
                ? [
                  { type: 'SCOUT', channelIdentifier: '10000' },
                  { type: 'HOMEPAGE', channelIdentifier: '10001' },
                ]
                : [],
          },
        ],
        portalId: id,
      },
      {
        headers: {
          cognitoToken,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (er) {
    console.log(er, 'flowFactPlatform error:');
  }
}


async function publishTo4Platforms(data, immoscot, ebay, immowelt, wordpress) {
  try {
    const cognitoToken = await generateCognitoToken();
    //process.env.IMMOSCOUT24_ID
    if (immoscot) {
      await flowFactPlatform(process.env.IMMOSCOUT24_ID, data, cognitoToken);
    }
    if (ebay) {
      await flowFactPlatform(process.env.EBAY_KLEINANZEIGEN_ID, data, cognitoToken);
    }
    if (immowelt) {
      await flowFactPlatform(process.env.IMMOWELT_IMMONET_ID, data, cognitoToken);
    }
    if (wordpress) {
      await flowFactPlatform(process.env.WORDPRESS, data, cognitoToken);
    }
  } catch (er) {
    console.log(er);
    return true;
  }
}



//pause subs
const pauseSubscription = async (req) => {
  const uniqId = req.body.uniqId;

  // Check if the list belongs to the user or not
  const userId = req.user.userId;

  try {
    // Find the user list with the specified uniqId
    const data = await UserList.findOne({ uniqId });

    if (!data) {
      throw new ApiError(400, "List not found");
    }
    const currentUser = await User.findById(userId).populate("authId");

    // Authorization check (assuming currentUser is available in req.user)
    if (currentUser?.authId?.role !== "ADMIN" && data.email !== currentUser?.email) {
      throw new ApiError(403, "Unauthorized");
    }

    // Update the list properties for pausing
    const updateBody = { subscriptionPause: true };
    data.set(updateBody); // Use set() for immutability
    data.status = false;

    // Publish to platforms based on subscription type (use a mapping for efficiency)
    const publishMapping = {
      BASIC: () => publishTo4Platforms(data, true, true, false, false),
      MEDIUM: () => publishTo4Platforms(data, true, true, true, false),
      PREMIUM: () => publishTo4Platforms(data, true, true, true, true),
    };

    await publishMapping[data.subscription.type]();

    // Save the updated list
    await data.save();

    return data;
  } catch (error) {
    // Handle errors appropriately, e.g., log the error and return a suitable response
    console.error(error);
    throw new ApiError(500, "Something went wrong")
  }
};

const unpauseSubscription = async (req) => {
  const uniqId = req.body.uniqId;
  const userId = req.user.userId;
  try {
    // Find the user list with the specified uniqId
    const data = await UserList.findOne({ uniqId });

    if (!data) {
      throw new ApiError(400, "List not found");
    }

    const currentUser = await User.findById(userId).populate("authId");

    // Authorization check (assuming currentUser is available in req.user)
    if (currentUser?.authId?.role !== "ADMIN" && data.email !== currentUser?.email) {
      throw new ApiError(403, "Unauthorized");
    }

    // Update the list properties for unpausing
    const updateBody = { subscriptionPause: false };
    data.set(updateBody); // Use set() for immutability
    data.status = true;

    // Publish to platforms based on subscription type (use a mapping for efficiency)
    const publishMapping = {
      BASIC: () => publishTo4Platforms(data, true, true, false, false),
      MEDIUM: () => publishTo4Platforms(data, true, true, true, false),
      PREMIUM: () => publishTo4Platforms(data, true, true, true, false)
    };

    await publishMapping[data.subscription.type](); // Use toLowerCase() for case-insensitive mapping

    // Save the updated list
    await data.save();

    // Send response with the updated data
    return data;
  } catch (error) {
    // Handle errors appropriately, e.g., log the error and return a suitable response
    console.error(error);
    throw new ApiError(500, "Something went wrong")
  }
};


const PaymentService = {
  createCheckoutSession,
  checkAndUpdateStatusByWebhook,
  pauseSubscription,
  unpauseSubscription
};

module.exports = PaymentService;
