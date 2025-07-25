const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const paymentSchema = new Schema(
  {
    paymentMethod: {
      type: String,
      enum: ["card"],
      required: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    listingId: {
      type: ObjectId,
      ref: "UserList",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    status: {
      type: String,
    },
    note: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

const Payment = model("Payment", paymentSchema);

module.exports = Payment;
