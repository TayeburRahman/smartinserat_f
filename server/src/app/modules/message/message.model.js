const mongoose = require('mongoose');
const { paginate } = require("../../../plugins");

const { Schema, model } = mongoose;

const MessageSchema = new Schema(
    {
        name: {
            type: String,
            unique: true
        },
        email: {
            type: String,
        },
        telephone: {
            type: String,
        },
        message: {
            type: String,
        },
        uniqId: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);
MessageSchema.plugin(paginate);
const Message = model('Message', MessageSchema);

module.exports = Message;
