const { Router } = require("express");
const PaymentController = require("../payment/payment.controller");
const auth = require("../../middlewares/auth");
const { ENUM_USER_ROLE } = require("../../../utils/enums");

const bodyParser = require("body-parser");

const router = Router();
router.post("/stripe/webhook", bodyParser.raw({ type: 'application/json' }), PaymentController.checkAndUpdateStatusByWebhook);

router.post("/stripe/create-checkout-session",
    bodyParser.json(),
    auth(ENUM_USER_ROLE.USER),
    PaymentController.createCheckoutSession);

router.post('/pause-subscription',bodyParser.json(), auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN), PaymentController.pauseSubscription);
router.post('/unpause-subscription',bodyParser.json(), auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN), PaymentController.unpauseSubscription);



// router.post(
//   "/user/save-payment-update-spending",
//   PaymentController.savePaymentUpdateSpending
// );

// router.patch(
//   "/driver/update-total-earning",
//   PaymentController.updateTotalEarning
// );

module.exports = router;
