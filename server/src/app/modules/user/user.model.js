const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const config = require("../../../config");
const validator = require("validator");
const { paginate } = require("../../../plugins");

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    authId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Auth",
    }, 
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    customerId: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    profile_image: {
      type: String,
      default:
        "https://res.cloudinary.com/arafatleo/image/upload/v1720600946/images_1_dz5srb.png",
    }, 
    cover_image:{
      type: String,
      default:
        "https://res.cloudinary.com/arafatleo/image/upload/v1720600946/images_1_dz5srb.png",
    },
    phone_number: {
      type: String,
      // unique: true,
    }, 
    address: {
      type: String,
    }, 
    gender: {
      type: String, 
    },
    age: {
      type: String,
    }, 
    location: {
      type: String,
    },
    date_of_birth: {
      type: Date,
    },   
    amount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
); 

UserSchema.plugin(paginate);
// Model
const User = model("User", UserSchema);

module.exports = User;
