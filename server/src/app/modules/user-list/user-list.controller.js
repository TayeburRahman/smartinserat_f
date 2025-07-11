const { UserListService } = require("./user-list.service");
const sendResponse = require("../../../shared/sendResponse");
const catchAsync = require("../../../shared/catchasync");
const { generateCognitoToken, createPropstackProject, createPropstackPropartis} = require("../flowfact/flowfact.service");


const createList = catchAsync(async (req, res) => {
  const result = await UserListService.createList(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "List created successfully",
    data: result,
  });
});
const getUserList = catchAsync(async (req, res) => {
  const result = await UserListService.getUserList(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Retrieved user listing successfully",
    data: result,
  });
});
const getLatestUserList = catchAsync(async (req, res) => {
  const result = await UserListService.getLatestUserList(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Retrieved  latest listing successfully",
    data: result,
  });
});


const getUserListById = catchAsync(async (req, res) => {
  const result = await UserListService.getUserListById(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Userlist fetched successfully",
    data: result,
  });
});

const getMyList = catchAsync(async (req, res) => {
  const result = await UserListService.getMyList(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Userlist fetched successfully",
    data: result,
  });
});

const updateList = catchAsync(async (req, res) => {
  const result = await UserListService.updateList(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Userlist updated successfully",
    data: result,
  });
}); 

const deleteUserList = catchAsync(async (req, res) => {
  const result = await UserListService.deleteUserList(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Userlist deleted successfully",
    data: result,
  });
});

const cognitoToken = catchAsync(async (req, res) => {
  console.log("I was in user lis const")
  const cognitoToken = await generateCognitoToken();

  return res.status(200).json({ cognitoToken });
});

const creteProstactToken = catchAsync(async (req, res) => {
  console.log("I was in user lis const")
  const image_id = req.body.image_id
  // console.log("ooo", image_id)
  const cognitoToken = await createPropstackPropartis(image_id);

  return res.status(200).json({ cognitoToken });
});

const UserListController = {
  createList,
  cognitoToken,
  getMyList,
  deleteUserList,
  updateList, 
  getUserList,
  getUserListById,
  getLatestUserList,
  creteProstactToken
};

module.exports = { UserListController };
