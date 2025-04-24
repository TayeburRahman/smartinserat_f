const mongoose = require('mongoose');
const { paginate } = require("../../../plugins");

const { Schema, model } = mongoose;

const UserListSchema = new Schema(
    {
        uniqId: {
            type: String,
            unique: true
        },
        email: {
            type: String,
        },
        schema_name: {
            type: String,
        },
        entityId: {
            type: String,
        },
        portalIds: {
            type: Array,
        },
        paymentIntentId: {
            type: String,
        },
        subscription: {
            type: {
                type: String,
                enum: ['BASIC', 'MEDIUM', 'PREMIUM', "FREE"],
                default: "FREE" // Default to null, indicating no subscription
            },
            // startDate: { type: Date, default: null },   // Can be null if no subscription
            // endDate: { type: Date, default: null },     // Can be null if no subscription
            // isActive: { type: Boolean, default: false } // False when no active subscription
        },
        // paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
        // subscriptionPause: {
        //     type: Boolean,
        //     default: false,
        // },
        subscriptionPause: {
            type: Boolean,
            default: false,
        },
        activeUntil: {
            type: Date,
            default: null
        },
        subscriptionUpdatedAt: {
            type: Date
        },
        subscriptionExpire: {
            type: Boolean,
            require: true,
            default: false,
        },
        subscriptionExpired: {
            type: Boolean,
            require: true,
            default: false,
        },
        inactive: {
            type: Boolean,
            default: false,
        },
        pending: {
            type: Boolean,
            default: false,
        },
        deleted: {
            type: Boolean,
            default: false
        },

        listNumber: { type: Number },
        listingTitle: {
            type: String,
        },
        listingType: {
            type: String,
        },
        buildingType: {
            type: String,
        },
        specificBuildingType: {
            type: String,
        },
        newBuilding: {
            type: Boolean,
            default: false
        },
        monumentProtection: {
            type: Boolean,
            default: false
        },
        numberOfFloors: {
            type: String,
        },
        numberOfRooms: {
            type: String,
        },
        numberOfBedrooms: {
            type: String,
        },
        numberOfBathrooms: {
            type: String,
        },
        livingArea: {
            type: String,
        },
        usableArea: {
            type: String,
        },
        plotArea: {
            type: String,
        },
        numberOfGarages: {
            type: String,
        },
        typeOfParkingSpace: {
            type: String,
        },
        numberOfParkingSpaces: {
            type: String,
        },
        flatType: {
            type: String,
        },
        pass_valid_till: {
            type: String,
        },
        floor: {
            type: String,
        },
        monthlyHousepayment: {
            type: String,
        },
        parkingSpacePrice: {
            type: String,
        },
        landArea: {
            type: String,
        },
        stateOfDevelopment: {
            type: String,
        },
        description: {
            type: String,
        },
        features: {
            type: String,
        },
        location: {
            type: String,
        },
        additionalDescription: {
            type: String,
        },
        listingPrice: {
            type: Number,
        },
        rentPrice: {
            type: Number,
        },
        nickName: {
            type: String,
        },
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        zip: {
            type: String,
        },
        contactName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        flowfactContactId: {
            type: String,
        },
        phone: {
            type: String,
        },
        formEmail: {
            type: String,
        },
        nameHide: {
            type: String,
        },
        phoneNumberHide: {
            type: String,
        },
        emailHide: {
            type: String,
        },
        additionalCost: {
            type: String,
        },
        secuirityCost: {
            type: String,
        },
        heatingCostinDetails: {
            type: String,
        },
        energySource: {
            type: String,
        },
        energy: {
            type: Boolean
        },
        energyPass: {
            type: String
        },
        energyPassCreationDate: {
            type: String,
        },
        typeOfHeating: {
            type: String,
        },
        typeOfEnergyPass: {
            type: String,
        },
        yearOfBuilding: {
            type: String,
        },
        imgCollection: {
            type: [String],
            required: false,  // if required, set to true
        },
        planCollection: {
            type: [String],
            required: false,  // if required, set to true
        },
        hideAddress: {
            type: Boolean,
            default: true
        },
        contactType: {
            type: String
        },
        commission: {
            type: String
        },
        buildingphase: {
            type: String
        },
        energyEfficiencyClass: {
            type: String
        },
        leasablearea: {
            type: String
        },
        totalarea: {
            type: String
        },
        paymentIsSepa: {
            type: Boolean,
            default: false
        },
        estatetype: {
            type: String
        },
    },
    {
        timestamps: true,
    }
);
UserListSchema.plugin(paginate);
const UserList = model('UserList', UserListSchema);

module.exports = UserList;
