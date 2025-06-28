const express = require("express");
const auth = require("../../middlewares/auth");
const { ENUM_USER_ROLE } = require("../../../utils/enums");
const { uploadFile } = require("../../middlewares/fileUploader"); 
const { UserListController } = require("./user-list.controller");
const bodyParser = require("body-parser");

const router = express.Router();

router.use(bodyParser.json({ limit: '200mb' }));
router.use(bodyParser.urlencoded({ extended: true, limit: '200mb' }));

// User routes
router.post(
  "/create",
  // uploadFile(),
  auth(ENUM_USER_ROLE.USER),
  UserListController.createList
);
router.get(
  "/", 
  // auth(ENUM_USER_ROLE.USER),
  UserListController.getUserList
);
router.get(
  "/latest",
  UserListController.getLatestUserList
);
router.get(
  "/details/:id",
  // uploadFile(),
  // auth(ENUM_USER_ROLE.USER),
  UserListController.getUserListById
);
// User routes
router.patch(
  "/update/:uniqId",
  uploadFile(),
  auth(ENUM_USER_ROLE.USER),
  UserListController.updateList
); 
 
router.get(
  "/my-properties",
  auth(ENUM_USER_ROLE.USER),
  UserListController.getMyList
);

router.delete(
  "/deleteList/:uniqId",
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  UserListController.deleteUserList
);
 

router.get('/t-d-t', UserListController.cognitoToken);
router.get('/crete_prostact_token', UserListController.creteProstactToken);
 


// router.delete(
//   "/delete-account",
//   auth(ENUM_USER_ROLE.USER),
//   UserController.deleteMyAccount
// ); 
 
// // IDS Work routes
// router.get(
//   "/profile",
//   auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
//   UserController.getProfile
// ); 
 

 

module.exports = router;
