const mongoose = require('mongoose');
const { paginate } = require('../../../plugins');


const { Schema, model } = mongoose;


const PackagesSchema = Schema(
  {
    packageName: {
      type: String,
      required: true,
      trim: true,
    },
    packageDescription: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    listingType: {
      type: String,
      enum: ['rent', 'sale'],
    },
    subscriptionType: {
      type: String,
      enum: ["BASIC", "MEDIUM", "PREMIUM"]
    },
    subscriptionDuration: {
      type: Number,
      enum: [1,2,3,4,5,6,7,8,9,10,11,12]
    },
  },
  {
    timestamps: true,
  }
);

PackagesSchema.plugin(paginate);

/**
 * @typedef User
 */
const Packages = model('Packages', PackagesSchema);

module.exports = Packages;
