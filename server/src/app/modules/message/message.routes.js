const express = require("express");
const auth = require("../../middlewares/auth");
const { ENUM_USER_ROLE } = require("../../../utils/enums");
const { uploadFile } = require("../../middlewares/fileUploader"); 
const { MessageController } = require("./message.controller");
const bodyParser = require("body-parser");

const router = express.Router();


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// User routes
router.post(
  "/",
  uploadFile(),
  MessageController.createMessage
);
router.get(
  "/all",
  MessageController.getAllMessages
);
router.get(
  "/",
  MessageController.getMessages
);

router.delete(
  "/:uniqId",
  auth(ENUM_USER_ROLE.ADMIN),
  MessageController.deleteMessage
);

module.exports = router;
