const auth = require("../../middlewares/auth");
const express = require("express");
const { ENUM_USER_ROLE } = require("../../../utils/enums");
const { uploadFile } = require("../../middlewares/fileUploader");
const { AdminController } = require("../admin/admin.controller");
const bodyParser = require("body-parser");

const router = express.Router();
 

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//! Admin Update
router.patch(
  "/edit-profile/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  uploadFile(),
  AdminController.updateProfile
);
router.get(
  "/profile",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.myProfile
);

router.delete(
  "/delete_account",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.deleteAdmin
);

router.delete(
  "/delete_user/:email",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.deleteUser
); 

router.delete(
  "/delete_admin/:email",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.deleteAdmin
);
 
router.get(
  "/users",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.getAllUsers
); 
router.post(
  "/users",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.createUser
); 
router.delete(
  "/users/:userId",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.deleteUser
); 


router.get(
  "/userlists",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.getUserLists
); 

router.get(
  "/packages",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.getPackages
); 
router.post(
  "/packages",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.createPackage
)
router.patch(
  "/packages/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.updatePackage
); 

router.delete(
  "/packages/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.deletePackage
); 


router.get(
  "/get_all_admin",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.getAllAdmins
);

router.patch(
  "/approve/:email",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.approveAdmins
);

module.exports = router;
