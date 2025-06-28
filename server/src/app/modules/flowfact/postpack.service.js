const axios = require('axios');
const ApiError = require('../../../errors/ApiError');
const httpStatus = require('http-status');

const createPropstackProperties = async (userData) => {
  try {
    const toFloat = (val) => {
      const f = parseFloat(val);
      return isNaN(f) ? undefined : f;
    };
    const toInt = (val) => {
      const i = parseInt(val);
      return isNaN(i) ? undefined : i;
    };

    // Build payload for property creation
    const unitData = {
      property: {
        title: userData.listingTitle,
       marketing_type:
        userData.listingType === "For Rent"
          ? "RENT"
          : userData.listingType === "For Sale"
          ? "BUY"
          : "BUY",
        object_type: "LIVING",
        rs_type: userData.buildingType?.toUpperCase() || "APARTMENT",
        rs_category: userData.flatType?.toUpperCase() || "OTHER",

        street: userData.address || undefined,
        city: userData.city || undefined,
        zip_code: userData.zip || undefined,
        address: `${userData.address || ""}, ${userData.zip || ""} ${userData.city || ""}`,

        number_of_rooms: toFloat(userData.numberOfRooms),
        number_of_bed_rooms: toFloat(userData.numberOfBedrooms),
        number_of_bath_rooms: toFloat(userData.numberOfBathrooms),
        living_space: toFloat(userData.livingArea),
        plot_area: toFloat(userData.plotArea),
        floor: toInt(userData.floor),
        price: toFloat(userData.listingPrice),
        base_rent: toFloat(userData.rentPrice),
        total_rent:
          userData.rentPrice && userData.additionalCost
            ? toFloat(userData.rentPrice) + toFloat(userData.additionalCost)
            : undefined,
        construction_year: toInt(userData.yearOfBuilding),

        description_note: userData.description,
        furnishing_note: userData.features,
        location_note: userData.location,
        other_note: userData.additionalDescription,
        // commission: userData.commission,
        courtage_note: `Provision: ${userData.commission || "k.A"}`, 
        archived: true, 
        partial_custom_fields: {
          monthlyHousePayment: userData.monthlyHousepayment,
          energyEfficiencyClass: userData.energyEfficiencyClass,
          heatingDetails: userData.heatingCostinDetails,
        },
      },
    };

    // Create the property/unit
    const response = await axios.post("https://api.propstack.de/v1/units", unitData, {
      headers: {
        "X-API-KEY": "VuovV2F1EXBaZ9JUMalFy1E5gHL90Ji6-rkYracX",
        "Content-Type": "application/json",
      },
    });

    const propertyId = response.data.id; 
    // Upload images if any
    if (userData.imgCollection?.length) {
      await uploadMultipleImages(propertyId, userData.imgCollection);
    }

    // Fetch property with images for URLs
    const propertyData = await getImageUrlById(propertyId);

    // Extract large image URLs
    const largeImageUrls = (propertyData?.images || []).map((img) => img.big_url); 

    return { status: true, images: largeImageUrls, propertyId };
  } catch (error) {
    console.error("❌ Error creating property in Propstack:", error.response?.data || error.message);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create property in Propstack");
  }
};

// Upload images sequentially
const uploadMultipleImages = async (propertyId, images) => {
  for (const base64Img of images) {
    const imagePayload = {
      image: {
        imageable_id: propertyId,
        imageable_type: "Property",
        photo: base64Img,
        title: "Test Image",
        is_private: false,
      },
    };
   console.log("bodybodybodybodybodybodybodybodybodybodybodybody")
    try {
      const response = await axios.post("https://api.propstack.de/v1/images", imagePayload, {
        headers: {
          "X-API-KEY": "VuovV2F1EXBaZ9JUMalFy1E5gHL90Ji6-rkYracX",
          "Content-Type": "application/json",
        },
      });
      console.log("Uploaded image ID:", response.data.id);
    } catch (err) {
      console.error("❌ Image upload failed:", err.response?.data || err.message);
      // You can decide whether to throw here or continue uploading other images
    }
  }
};

const getImageUrlById = async (unitId) => {
  const response = await axios.get(`https://api.propstack.de/v1/units/${unitId}`, {
    headers: {
      "X-API-KEY": "VuovV2F1EXBaZ9JUMalFy1E5gHL90Ji6-rkYracX",
    },
  });
  return response.data;
};

module.exports = {
  createPropstackProperties,
};
