
const ApiError = require("../../../errors/ApiError");
const httpStatus = require("http-status");
const Message = require("./message.model");


const createMessage = async (req) => {

    const data = req.body;
      try {
        const message = await Message.create(data)

        return message
      
    } catch (error) {
        console.error('Error creatin message:', error);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error creating message');
    }

};


  
  const deleteMessage = async (req) => {
    let uniqId = req.params.uniqId;
    
    try {
        const data = await Message.findOne({ uniqId });
        
        if (!data) {
            throw new ApiError(400, "No message found");
        }
        const message =  await Message.deleteOne({ uniqId });
        
        return message;

    } catch (err) {
        // Handle errors, possibly log or rethrow them
        throw new ApiError(400, err.message || "An error occurred");
    }
};

const getAllMessages = async (req) => {
  const messages = await Message.find({});
  return messages;
};
const getMessages = async (filter, options) => {
  const messages = await Message.paginate(
    filter,
    {
      ...options,
    }
  );
  return messages;
};




const MessageService = {
    createMessage,
    deleteMessage,
    getMessages,
    getAllMessages
};

module.exports = { MessageService };

