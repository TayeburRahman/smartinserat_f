
const ApiError = require("../../../errors/ApiError");
const User = require("../user/user.model");
const httpStatus = require("http-status");
const Auth = require("../auth/auth.model");
const UserList = require("./user-list.model");
const { UserService } = require("../user/user.service");
const { generateCognitoToken } = require("../flowfact/flowfact.service");
const axios = require('axios');
const cron = require("node-cron");
const moment = require("moment");

const createList = async (req) => {
  const { email } = req.body;

  console.log("createList");
  console.log("===========");
  console.log("req.body", req.body);
  console.log("email", email);
  //check the user
  const user = await UserService.getUserByEmail(email);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'user not found');

  if (req.query.uniqId) {
    console.log("Was in uniqId true")
    //lets create unique id for the new list
    const userList = await UserList.aggregate([{ "$match": { email } }]);
    const listNumber = ++(userList.length);
    const uniqId = `${user.customerId}-${listNumber}`;

    console.log("Returning uniqID and listNumber");
    console.log("uniqID ", uniqId);
    console.log("listNumber ", listNumber);
    return {
      uniqId,
      listNumber
    }
  }

  console.log("After uniqId")

  const lists = new UserList({
    ...req.body,
  });
  //   lists.save((error, list) => {
  //     if (error) {
  //       return res.status(400).json({ error });
  //     }
  //     if (list) {

  //       return list;
  //     }
  //   });

  try {
    const savedList = await lists.save(); // Use async/await instead of callback
    console.log('List saved successfully:', savedList);
    return savedList;
  } catch (error) {
    console.error('Error saving list:', error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error saving list');
  }

};

const getLatestUserList = async (req) => {
  // Fetch the latest 10 ads with specific conditions
  const lists = await UserList.find({
    subscriptionPause: false,
    subscriptionExpire: true
  })
    .sort({ createdAt: -1 }) // Sort by creation date, descending
    .limit(10); // Limit the results to 10

  return lists;
};


const getUserList = async (req) => {
  const { adType, propertyType, location, postalCode, price, search, page = 1, limit = 12 } = req.query;

  // Build the query object
  let query = {
    subscriptionPause: false,
    subscriptionExpire: true
  };

  const fixedAdType = adType === "rent" ? "For Rent" : "For Sale";

  if (adType) query.listingType = fixedAdType;
  if (propertyType) query.schema_name = propertyType;
  if (location) query.location = new RegExp(location, 'i'); // Case-insensitive search
  if (postalCode) query.zip = postalCode;
  if (price) query.listingPrice = { $lte: price }; // Search for price <= specified value
  if (search) query.listingTitle = new RegExp(search, 'i'); // Case-insensitive title search

  // Convert page and limit to integers
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 12;
  const skip = (pageNum - 1) * limitNum;

  // Fetch ads with pagination
  const lists = await UserList.find(query)
    .skip(skip)      // Skip the previous pages
    .limit(limitNum) // Limit the results
    .exec();

  // Get the total count of ads that match the filters
  const totalLists = await UserList.countDocuments(query);

  // Send response with pagination info
  return {
    lists,
    totalPages: Math.ceil(totalLists / limitNum),
    currentPage: pageNum
  }
};

const getUserListById = async (req) => {
  const { id } = req.params;

  //lets create unique id for the new list
  const userList = await UserList.findById(id);

  return userList;
};

const getMyList = async (req) => {
  const { userId, authId } = req.user;

  const checkUser = await User.findById(userId);

  if (!checkUser) {
    throw new ApiError(404, "User not found!");
  }

  const checkAuth = await Auth.findById(authId);
  if (!checkAuth) {
    throw new ApiError(404, "You are not authorized");
  }


  //lets create unique id for the new list
  const myUserList = await UserList.find({ email: checkUser.email });

  return myUserList;
};
const updateList = async (req) => {
  const { userId, authId } = req.user;
  const { uniqId } = req.params;

  const data = req.body;

  const checkUser = await User.findById(userId);

  if (!checkUser) {
    throw new ApiError(404, "User not found!");
  }

  const checkAuth = await Auth.findById(authId);
  if (!checkAuth) {
    throw new ApiError(404, "You are not authorized");
  }

  const listToUpdate = await UserList.findOne({ uniqId });


  if (!listToUpdate) {
    throw new ApiError(404, "List not found");
  }

  console.log("listToUpdate.email", listToUpdate.email);
  console.log("checkUser.email", checkUser.email);

  if (listToUpdate.email !== checkUser.email) {
    throw new ApiError(403, "Unauthorized");
  }


  console.log("--------------------------");
  console.log(data);
  //lets create unique id for the new list
  const updatedList = await UserList.findByIdAndUpdate(listToUpdate._id, data, {
    new: true
  });

  return updatedList;
};

const deleteImage = async (req) => {
  let id = req.body.id;
  let uniqId = req.body.uniqId;
  const cognitoToken = await generateCognitoToken();

  if (req.query.title) {
    try {
      UserList.findOne({ uniqId }, async (err, data) => {
        if (err) {
          throw new ApiError(404, "No list found");
        }
        if (data) {
          await axios.patch(`https://api.production.cloudios.flowfact-prod.cloud/multimedia-service/items/${id}`, [
            {

              "op": "replace",

              "path": "/title",

              "value": req.body.title

            }
          ], {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              cognitoToken
            }
          });
          return { mesaage: 'success' };
        }
      });
    } catch (er) {
      console.log(er.message, 150);
    }
    return
  }

  try {
    await axios.delete(`https://api.production.cloudios.flowfact-prod.cloud/multimedia-service/items/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        cognitoToken
      }
    });
    return { mesaage: 'success' };
  } catch (er) {
    throw new ApiError(404, "Failed");
  }
};

const deleteUserList = async (req) => {
  let uniqId = req.params.uniqId;

  try {
    const data = await UserList.findOne({ uniqId });

    if (!data) {
      throw new ApiError(400, "No list found");
    }

    const cognitoToken = await generateCognitoToken();

    // Perform the delete operation
    const response = await axios.delete(`https://api.production.cloudios.flowfact-prod.cloud/entity-service/schemas/${data.schema_name}/entities/${data.entityId}`, {
      headers: {
        "Content-Type": "application/json",
        cognitoToken
      }
    });

    // Check if the delete operation with FlowFact was successful
    if (response.status === 200) {
      // Delete the document from the database
      await UserList.deleteOne({ uniqId });
      return { message: 'success' };
    } else {
      console.log("Failed to delete from external API");
      throw new ApiError(400, "Failed to delete from external service");
    }

  } catch (err) {
    // Handle errors, possibly log or rethrow them
    throw new ApiError(400, err.message || "An error occurred");
  }
};

const queryUserLists = async (filter, options) => {
  // const users = await User.paginate(filter, options);
  const userLists = await UserList.paginate(
    filter,
    {
      ...options,
    }
  );

  return userLists;
};


const unpublishExpiredLists = async () => {
  try {
    // find records with subscriptionExpire - true
    let lists = await UserList.find({ subscriptionExpire: true, subscriptionExpired: false, activeUntil: { $ne: null } });


    for (let index = 0; index < lists.length; index++) {
      try {
        const list = lists[index];
        list.status = false;

        console.log('in cron')
        const currentTime = moment().format()
        // check if record expires or not
        const checkExpiryTime = moment(list.activeUntil).isBefore(currentTime);


        if (checkExpiryTime) {

          //we unpablish from portals and set unpablished to true
          switch (list.subscription.type) {
            case 'BASIC':
              await publishTo4Platforms(list, true, true, false, false);
              break;
            case 'MEDIUM':
              await publishTo4Platforms(list, true, true, true, false);
              break;
            case 'PREMIUM':
              await publishTo4Platforms(list, true, true, true, false);
              break;
          }
          await UserList.findByIdAndUpdate(list._id, {
            subscription: {
              subscriptionType: 'free',
            },
            subscriptionExpire: false,
            subscriptionExpired: true
          })
        }

        console.log('new Date(): Checked for expired sub and action taken')
      } catch (er) {
        console.log(new Date(), 'UserList Controller unpublishExpiredLists Err!');
        console.log(er.message);
      }
    }
  } catch (error) {
    console.log(new Date(), 'UserList Controller unpublishExpiredLists Err!');
  }
};


// cron.schedule("0 0 0 * * *", unpublishExpiredLists);
cron.schedule("* * * * *", unpublishExpiredLists);


const UserListService = {
  createList,
  getMyList,
  updateList,
  deleteImage,
  deleteUserList,
  queryUserLists,
  getUserList,
  getUserListById,
  getLatestUserList,
};

module.exports = { UserListService };