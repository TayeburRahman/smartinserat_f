const catchAsync = require("../../../shared/catchasync");
const sendResponse = require("../../../shared/sendResponse");
const PaymentService = require("../payment/payment.service");

const createCheckoutSession = catchAsync(async (req, res) => {
  const result = await PaymentService.createCheckoutSession(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get url for check-out success",
    data: result,
  });
});
const checkAndUpdateStatusByWebhook = catchAsync(async (req, res) => {
  const result = await PaymentService.checkAndUpdateStatusByWebhook(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Payment verified successfully",
    data: result,
  });
});
const pauseSubscription  = catchAsync(async (req, res) => {
  const result = await PaymentService.pauseSubscription(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Subscription paused successfully",
    data: result,
  });
});
const unpauseSubscription  = catchAsync(async (req, res) => {
  const result = await PaymentService.unpauseSubscription(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Subscription unpaused successfully",
    data: result,
  });
});


const PaymentController = {
  createCheckoutSession,
  checkAndUpdateStatusByWebhook,
  pauseSubscription,
  unpauseSubscription
};

module.exports = PaymentController;
