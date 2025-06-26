const catchAsync = require("../../../shared/catchasync");
const sendResponse = require("../../../shared/sendResponse");
const DashboardServices = require("./dashboard.service");

// --- user ---
const totalCount = catchAsync(
  async (req , res ) => {
    const result = await DashboardServices.totalCount();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Get all count sucess!`,
      data: result,
    });
  },
);

const getMonthlyUserGrowth = catchAsync(
  async (req, res) => {
    const year = req.query.year
      ? parseInt(req.query.year, 10)
      : undefined;
    const result = await DashboardServices.getMonthlyUserGrowth(year);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Get all count sucess!`,
      data: result,
    });
  },
);

const getAllUsers = catchAsync(async (req, res) => {
  const { result, meta } = await DashboardServices.getAllUsers(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User retrieved successfully",
    meta: meta,
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const result = await DashboardServices.getSingleUser(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

const getAllTransactions = catchAsync(async (req, res) => {
  const result = await DashboardServices.getAllTransactions(req.query);

  sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Get Successfully",
      data: result,
  });
});
 

const blockUnblockUser = catchAsync(async (req, res) => {
  const result = await DashboardServices.blockUnblockUser(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});
 
const DashboardController = {
  getAllUsers,
  getSingleUser,
  blockUnblockUser, 
  totalCount,
  getMonthlyUserGrowth,
  getAllTransactions
};

module.exports = DashboardController;
