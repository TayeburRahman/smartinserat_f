const httpStatus = require("http-status");
const ApiError = require("../../../errors/ApiError");
const User = require("../auth/auth.model");
const QueryBuilder = require("../../../builder/queryBuilder"); 
const UserList = require("../user-list/user-list.model");
const Message = require("../message/message.model");
const Payment = require("../payment/payment.model");

const getYearRange = (year) => {
  const startDate = new Date(`${year}-01-01`);
  const endDate = new Date(`${year}-12-31`);
  return { startDate, endDate };
};

// --- user ---
const totalCount = async () => {

  const totalIncome = await Payment.aggregate([
      {
          $group: {
              _id: null,
              total: { $sum: '$amount' },
          },
      },
  ]);

  const totalUsers = await User.countDocuments();
  const totalListing = await UserList.countDocuments();
  const unseenMessagesCount = await Message.countDocuments({ isSeen: false });

  return {
     totalIncome: totalIncome.length > 0 ? totalIncome[0].total : 0,
      totalUsers,
      totalListing,
      unseenMessagesCount
  };
};

const getMonthlyUserGrowth = async (year) => {
  try {
      const currentYear = new Date().getFullYear();
      const selectedYear = year || currentYear;

      const { startDate, endDate } = getYearRange(selectedYear);

      const monthlyUserGrowth = await User.aggregate([
          {
              $match: {
                  createdAt: {
                      $gte: startDate,
                      $lt: endDate,
                  },
              },
          },
          {
              $group: {
                  _id: {
                      month: { $month: '$createdAt' },
                      year: { $year: '$createdAt' },
                  },
                  count: { $sum: 1 },
              },
          },
          {
              $project: {
                  _id: 0,
                  month: '$_id.month',
                  year: '$_id.year',
                  count: 1,
              },
          },
          {
              $sort: { month: 1 },
          },
      ]);

      const months = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
      ];

      const result = [];
      for (let i = 1; i <= 12; i++) {
          const monthData = monthlyUserGrowth.find(data => data.month === i) || {
              month: i,
              count: 0,
              year: selectedYear,
          };
          result.push({
              ...monthData,
              month: months[i - 1],
          });
      }

      return {
          year: selectedYear,
          data: result,
      };
  } catch (error) {
      logger.error('Error in getMonthlyUserGrowth function: ', error);
      throw error;
  }
};

const getAllUsers = async (query) => {
  const usersQuery = new QueryBuilder(User.find(), query)
    .search(["name"])
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await usersQuery.modelQuery;
  const meta = await usersQuery.countTotal();

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "No users found");
  }
  return { meta, result };
};

const getSingleUser = async (payload) => {
  const { email } = payload;
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};

const blockUnblockUser = async (payload) => {
  const { email, is_block } = payload;
  const existingUser = await User.findOne({ email: email });

  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  return await User.findOneAndUpdate(
    { email: email },
    { $set: { is_block } },
    {
      new: true,
      runValidators: true,
    }
  );
};
 
const getAllTransactions = async (query) => {
  const { page, limit, searchTerm } = query;

  if (query?.searchTerm) {
      delete query.page;
  }
  const transationQuery = new QueryBuilder(Payment.find() 
      .populate({
        path: "user",
        select: "name email profile_image",
      })
      .populate({
        path: "listingId", 
        select: "name",
      })
      , query)
      .search(["transactionId" ])
      .filter()
      .sort()
      .paginate()
      .fields()

  const result = await transationQuery.modelQuery;
  const meta = await transationQuery.countTotal();
  // console.log(result)
  return { result, meta };

};

const DashboardServices = {
  totalCount,
  getAllUsers,
  getSingleUser,
  blockUnblockUser, 
  getMonthlyUserGrowth,
  getAllTransactions
};

module.exports = DashboardServices;
