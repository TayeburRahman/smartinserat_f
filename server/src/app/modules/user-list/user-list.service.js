const ApiError = require("../../../errors/ApiError");
const User = require("../user/user.model");
const httpStatus = require("http-status");
const Auth = require("../auth/auth.model");
const UserList = require("./user-list.model");
const { UserService } = require("../user/user.service"); 
const axios = require('axios');
const cron = require("node-cron");
const moment = require("moment");
const { createPropstackProperties } = require("../flowfact/postpack.service");
 

const createList = async (req) => {
  const { email } = req.body; 

  if (!email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email is required');
  }
 
  const user = await UserService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }  
  const lists = req.body  
  
  try {
 
    const createPt = await createPropstackProperties(req.body)
     console.log("createPt?.images", createPt?.images)
    if(!createPt.status && !createPt?.propertyId || !createPt?.images.length){
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong while saving the list. Please try again later!');
    } 

    const listsWithImages = {
      ...lists,
      unitsId: createPt?.propertyId,
      imgCollection: createPt?.images || [],  
    };
   
    const savedList = await UserList.create(listsWithImages);
    // console.log('List saved successfully:', savedList);
    return savedList;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error saving list', error);
  }
};

const getLatestUserList = async (req) => { 
  const lists = await UserList.find({
    subscriptionPause: false,
    subscriptionExpire: false
  })
    .sort({ createdAt: -1 }) // Sort by creation date, descending
    .limit(10); // Limit the results to 10

  return lists;
};

const getUserList = async (req) => {
  const { adType, buildingType, location, postalCode, price, search, page = 1, limit = 12 } = req.query;

  // Build the query object
  let query = {
    subscriptionPause: false,
    subscriptionExpire: false
  };
 
  const fixedAdType = adType === "rent" ? "For Rent" : "For Sale";

  if (adType) query.listingType = fixedAdType;
  if (buildingType) query.buildingType = buildingType;
  if (location) query.location = new RegExp(location, 'i');  
  if (postalCode) query.zip = postalCode;
  if (price) query.listingPrice = { $lte: price };  
  if (search) query.listingTitle = new RegExp(search, 'i');  

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

const deleteUserList = async (req) => {
  let uniqId = req.params.uniqId;

  try { 
    const data = await UserList.findById(uniqId);
    if (!data) {
      throw new ApiError(400, "No list found");
    } 

    // Perform the delete operation
    await axios.delete(`https://api.propstack.de/v1/units/${data.unitsId}`, {
       headers: {
      "X-API-KEY": "VuovV2F1EXBaZ9JUMalFy1E5gHL90Ji6-rkYracX",
    },
    }); 
    const resultDb = await UserList.findByIdAndDelete(uniqId);

    return resultDb;

  } catch (err) { 
    throw new ApiError(400, err.message || "An error occurred");
  }
};

// const getImageUrlById = async (unitId) => {
//   const response = await axios.get(`https://api.propstack.de/v1/units`, {
//     headers: {
//       "X-API-KEY": "VuovV2F1EXBaZ9JUMalFy1E5gHL90Ji6-rkYracX",
//     },
//   });
//   console.log(response.data)
//   return response.data;
// };

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
    const now = new Date();

    const lists  = await UserList.find({
      subscriptionExpire: false,
      status : "active",
      activeUntil: { $lte: now },
    });

    for (const list of lists) {
      try {
        await UserList.findByIdAndUpdate(list._id, {
          subscriptionExpire: true,
          status: "inactive",
          subscriptionUpdatedAt: new Date(),
        });

        if (list.unitsId) {
          const unitData = {
            property: {
              archived: false,
            },
          };

          const response = await axios.put(
            `https://api.propstack.de/v1/units/${list.unitsId}`,
            unitData,
            {
              headers: {
                "X-API-KEY": "VuovV2F1EXBaZ9JUMalFy1E5gHL90Ji6-rkYracX",
                "Content-Type": "application/json",
              },
            }
          );

          if (!response?.data) {
            throw new ApiError(httpStatus.BAD_GATEWAY, "Failed to update unit status in Propstack");
          }

          console.log("✅ Propstack update:", response.data);
        }
      } catch (err ) {
        console.error(new Date(), "⚠️ Error in unpublishing list:", list._id);
        console.error(err.message);
      }
    }
  } catch (error ) {
    console.error(new Date(), "❌ Critical Error in unpublishExpiredLists");
    console.error(error.message);
  }
};


cron.schedule("* * * * *", unpublishExpiredLists);


const UserListService = {
  createList,
  getMyList,
  updateList, 
  deleteUserList,
  queryUserLists,
  getUserList,
  getUserListById,
  getLatestUserList,
};

module.exports = { UserListService };