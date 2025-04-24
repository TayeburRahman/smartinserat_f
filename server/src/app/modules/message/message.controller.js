
const sendResponse = require("../../../shared/sendResponse");
const catchAsync = require("../../../shared/catchasync");
const pick = require("../../../utils/pick.js");
const { MessageService } = require("./message.service");


const createMessage = catchAsync(async (req, res) => {
    const result = await MessageService.createMessage(req);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Message created successfully",
        data: result,
    });
});
const getAllMessages = catchAsync(async (req, res) => {
    const result = await MessageService.getAllMessages(req);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Retrieved messages successfully",
        data: result,
    });
});

const getMessages = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await MessageService.getMessages(filter, options);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Retrieved messages successfully",
        data: result,
    });
});


const deleteMessage = catchAsync(async (req, res) => {
    const result = await MessageService.deleteMessage(req);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Messag deleted successfully",
        data: result,
    });
});



const MessageController = {
    createMessage,
    getMessages,
    deleteMessage,
    getAllMessages
};

module.exports = { MessageController };
