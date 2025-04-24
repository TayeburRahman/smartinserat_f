const sendResponse = require("../../../shared/sendResponse");
const { AdminService } = require("./admin.service");
const catchAsync = require("../../../shared/catchasync");
const config = require("../../../config");
const shortid = require("shortid");
const { PackageService } = require("../packages/packages.service");

 

const createUser = catchAsync(async (req, res) => {
  req.body.customerId = shortid.generate();
  const result = await AdminService.createUser(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User created successfully",
    data: result,
  });
});
const updateProfile = catchAsync(async (req, res) => {
  const result = await AdminService.updateProfile(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile updated successfully",
    data: result,
  });
});

const myProfile = catchAsync(async (req, res) => {
  
  const result = await AdminService.myProfile(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successful!",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await AdminService.getAllUsers(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
}); 

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await AdminService.getAllAdmin();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successful!",
    data: result,
  });
});

const getUserLists = catchAsync(async (req, res) => {
  const result = await AdminService.getUserLists(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User lists retrieved successfully",
    data: result,
  });
}); 

const getPackages = catchAsync(async (req, res) => {
  const result = await AdminService.getPackages(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Packages retrieved successfully",
    data: result,
  });
}); 
 
const createPackage = catchAsync(async (req, res) => {
  const result = await AdminService.createPackage(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Package created successfully",
    data: result,
  });
}); 
const updatePackage = catchAsync(async (req, res) => {
  const result = await AdminService.updatePackage(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Package updated successfully",
    data: result,
  });
}); 
 
const deletePackage = catchAsync(async (req, res) => {
  const result = await AdminService.deletePackage(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Package deleted successfully",
    data: result,
  });
}); 
 
 

const approveAdmins = catchAsync(async (req, res) => {
  const email = req.params.email;
  const result = await AdminService.approveAdmins(email);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin approve successfully",
    data: result,
  });
}); 
 
const deleteAdmin = catchAsync(async (req, res) => {
  const email = req.params.email;
  const result = await AdminService.deleteAdmin(email);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin deleted successfully",
    data: result,
  });
}); 

const deleteUser = catchAsync(async (req, res) => {
  const result = await AdminService.deleteUser(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
});


// const deleteDriver = catchAsync(async (req, res) => {
//   const email = req.params.email;
//   const result = await AdminService.deleteDriver(email);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: "Driver deleted successfully",
//     data: result,
//   });
// });
 

const AdminController = {
  updateProfile,
  getAllUsers, 
  deleteUser, 
  getAllAdmins,
  myProfile, 
  deleteAdmin, 
  approveAdmins,
  createUser,
  getUserLists,
  getPackages,
  updatePackage,
  deletePackage,
  createPackage
};

module.exports = { AdminController };
