const ApiError = require("../../../errors/ApiError");
const httpStatus = require("http-status");
const Auth = require("../auth/auth.model");
const Admin = require("./admin.model");
const User = require("../user/user.model");
const { UserService } = require("../user/user.service");
const pick = require("../../../utils/pick.js");
const { registrationSuccessEmailBody } = require("../../../mails/email.register.js");
const { ENUM_USER_ROLE } = require("../../../utils/enums.js");
const { sendEmail } = require("../../../utils/sendEmail.js");
const { UserListService } = require("../user-list/user-list.service.js");
const { PackageService } = require("../packages/packages.service.js");
const Packages = require("../packages/packages.model.js");

// Create activation token -done
const createActivationToken = () => {
  const activationCode = Math.floor(100000 + Math.random() * 900000).toString();
  return { activationCode };
};

// Update profile
const createUser = async (req) => {
  const { userId, authId } = req.user;

  const { role, password, confirmPassword, email, ...other } = req.body;
  if (!req.body) {
    throw new ApiError(400, "Data is missing in the request body!");
  }

  const checkUser = await User.findById(userId);
  if (!checkUser) {
    throw new ApiError(404, "User not found!");
  }

  const checkAuth = await Auth.findById(authId);
  if (!checkAuth) {
    throw new ApiError(403, "You are not authorized");
  }


  if (checkAuth.role !== "ADMIN") {
    throw new ApiError(403, "You are not authorized");
  }

  console.log("ROle", role);

  if (!role || !Object.values(ENUM_USER_ROLE).includes(role)) {
    throw new ApiError(400, "Valid Role is required!");
  }

  const existingAuth = await Auth.findOne({ email }).lean();
  if (existingAuth?.isActive) {
    throw new ApiError(400, "Email already exists");
  }

  if (existingAuth && !existingAuth.isActive) {
    await Promise.all([
      User.deleteOne({ authId: existingAuth._id }),
      Auth.deleteOne({ email }),
    ]);
  }

  const { activationCode } = createActivationToken();
  const auth = {
    role,
    name: other.name,
    lastname: other.lastname,
    email: email,
    activationCode,
    password: password,
    expirationTime: Date.now() + 3 * 60 * 1000,
  };

  if (auth.role !== "ADMIN") {
    const emailPromise = sendEmail({
      email: auth.email,
      subject: "Activate Your Account",
      html: registrationSuccessEmailBody({ user: { name: auth.name }, activationCode }),
    }).catch(error => console.error("Failed to send email:", error.message));
  }

  // Create auth record
  const createAuth = await Auth.create(auth);

  if (!createAuth) {
    throw new ApiError(500, "Failed to create auth account");
  }
  other.authId = createAuth._id;
  other.email = email;

  // let result;
  // switch (role) {
  //   case ENUM_USER_ROLE.USER:
  //     result = await User.create(other);
  //     break;
  //   case ENUM_USER_ROLE.ADMIN:
  //     result = await Admin.create(other);
  //     break;
  //   default:
  //     throw new ApiError(400, "Invalid role provided!");
  // }
  const result = await User.create(other);
  return { result };

};


// Update profile
const updateProfile = async (req) => {
  const { files } = req;
  const { userId, authId } = req.user;

  const data = req.body;
  if (!data) {
    throw new ApiError(400, "Data is missing in the request body!");
  }

  const checkUser = await Admin.findById(userId);
  if (!checkUser) {
    throw new ApiError(404, "User not found!");
  }

  const checkAuth = await Auth.findById(authId);
  if (!checkAuth) {
    throw new ApiError(403, "You are not authorized");
  }

  let profile_image;
  if (files?.profile_image) {
    profile_image = `/images/image/${files.profile_image[0].filename}`;
  }

  let cover_image;
  if (files?.cover_image) {
    cover_image = `/images/image/${files.cover_image[0].filename}`;
  }

  const updatedData = {
    ...data,
    ...(profile_image && { profile_image }),
    ...(cover_image && { cover_image }),
  };

  await Auth.findOneAndUpdate(
    { _id: authId },
    { name: updatedData.name },
    { new: true }
  );

  const updateUser = await Admin.findOneAndUpdate(
    { authId },
    updatedData,
    { new: true }
  ).populate('authId');

  return updateUser;
};


// Get single user
const myProfile = async (req) => {
  const { userId } = req.user;
  const result = await Admin.findById(userId).populate('authId');
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }

  return result;
};

// approve Admin - done
const approveAdmins = async (email) => {

  if (!email) {
    throw new ApiError(400, "Email is required!");
  }
  const existUser = await Auth.findOne({ email });
  if (!existUser) {
    throw new ApiError(400, "User not found");
  }

  const active = await Auth.findOneAndUpdate(
    { email },
    { isActive: true },
    {
      new: true,
      runValidators: true,
    }
  );

  return active;
};

// Delete my account
const deleteMyAccount = async (payload) => {
  const { email, password } = payload;

  const isUserExist = await Auth.isAuthExist(email);
  if (!isUserExist) {
    throw new ApiError(404, "User does not exist");
  }

  if (
    isUserExist.password &&
    !(await Auth.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(402, "Password is incorrect");
  }
  await Admin.deleteOne({ authId: isUserExist._id })
  return await Auth.deleteOne({ email });
};

// Delete admin account
const deleteAdmin = async (email) => {
  const isUserExist = await Auth.isAuthExist(email);
  if (!isUserExist) {
    throw new ApiError(404, "User does not exist");
  }

  if (
    isUserExist.password &&
    !(await Auth.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(402, "Password is incorrect");
  }
  await Admin.deleteOne({ authId: isUserExist._id })
  return await Auth.deleteOne({ email });
};

// Delete admin account
const deleteUser = async (req) => {
  const { userId, authId } = req.user;
  const userToDeleteId = req.params.userId;

  const checkUser = await User.findById(userId);
  if (!checkUser) {
    throw new ApiError(404, "User not found!");
  }

  const checkAuth = await Auth.findById(authId);
  if (!checkAuth) {
    throw new ApiError(403, "You are not authorized");
  }

  if (checkAuth.role !== "ADMIN") {
    throw new
      ApiError(403, "You are not authorized");
  }
  if (checkUser._id.toString() === userToDeleteId) {
    throw new ApiError(403, "Can't delete own account");
  }
  const deletedUser = await User.findByIdAndDelete(userToDeleteId)
  const deletedAuth = await Auth.findByIdAndDelete(deletedUser.authId);

  return deletedAuth;
};

// Get all user Complete By Antareep
const getAllUsers = async (req) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);


  // options.populate === "authId"

  options.populate = {
    path: 'authId',
    match: req.query.role ? { role: req.query.role } : {}, // Apply role filter if provided
    select: 'name lastname email role isActive',  // Select necessary fields from Auth schema
  };

  const result = await UserService.queryUsers(filter, options);
  return result;
};


// Get all user list Complete By Antareep
const getUserLists = async (req) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);


  // options.populate === "authId"

  // options.populate = {
  //   path: 'authId',
  //   match: req.query.role ? { role: req.query.role } : {}, // Apply role filter if provided
  //   select: 'name lastname email role isActive',  // Select necessary fields from Auth schema
  // };

  const result = await UserListService.queryUserLists(filter, options);
  return result;
};

const getPackages = async (req) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const result = await PackageService.queryPackages(filter, options);
  return result;
};

const createPackage = async (req) => {
  try {
    const pkg = new Packages(req.body);
    await pkg.save();
    return pkg;
  } catch (error) {
    console.log(error)
    throw new ApiError(500, "Something went wrong")
  }
};
const deletePackage = async (req) => {
  try {
    const { id } = req.params; // Assuming the package ID is passed as a URL parameter
    const updatedData = req.body;

    // Find the package by its ID and update it with the new data
    const pkg = await Packages.findByIdAndDelete(id);

    if (!pkg) {
      throw new ApiError(httpStatus.NOT_FOUND, "Package not found");
    }

    return pkg;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Something went wrong");
  }
};
const updatePackage = async (req) => {
  try {
    const { id } = req.params; // Assuming the package ID is passed as a URL parameter
    const updatedData = req.body;

    // Find the package by its ID and update it with the new data
    const pkg = await Packages.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated package after update
      runValidators: true, // Ensure the update respects validation rules
    });

    if (!pkg) {
      throw new ApiError(httpStatus.NOT_FOUND, "Package not found");
    }

    return pkg;
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Something went wrong");
  }
};


// Get all admin
const getAllAdmin = async () => {
  const result = await Admin.find({}).populate('authId');
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  return result;
};

// Get all driver
// const getAllDriver = async (user) => {
//   const result = await Admin.findOne({authId: user.userId}).populate('authId');
//   if (!result) {
//     throw new ApiError(httpStatus.NOT_FOUND, "User not found");
//   } 
//   return result;
// }; 

const AdminService = {
  updateProfile,
  myProfile,
  deleteAdmin,
  deleteUser,
  approveAdmins,
  deleteMyAccount,
  getAllUsers,
  getAllAdmin,
  createUser,
  getUserLists,
  getPackages,
  createPackage,
  updatePackage,
  deletePackage
};

module.exports = { AdminService };
