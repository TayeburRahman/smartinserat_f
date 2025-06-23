const axios = require('axios');
const FormData = require('form-data');
// const UserList = require('../models/userList.model');

// const bucketName = 'smartinserat-bucket';

// const AWS = require('aws-sdk');
const ApiError = require('../../../errors/ApiError');
// const s3 = new AWS.S3();

const createPropstackProject = async () => {
  try {
   

    const projectData = {
      project: {
        name: "Living Home Berlin",
        status: "SALES",
        // broker_id: 66,
        title: "Modern Apartment Project",
        for_rent: false,
        street: "Friedrichstraße",
        house_number: "101",
        zip_code: "10117",
        city: "Berlin",
        // lat: 52.5200,
        // lng: 13.4050, 
        // brokerage_note: "Including VAT",
        description_note: "Newly built apartment project in the center of Berlin.",
        construction_year: 2020
      }
    };
    // const username= "info@smartinserat.com"
    // const password = "cemkuerekli123"

    // const response = await axios.post('https://api.propstack.de/v1/auth/login', {
    //   username,
    //   password,
    // });
    // // The API should respond with a JSON containing the token
    // return response.data.cognitoToken;

    const response = await axios.post("https://api.propstack.de/v1/projects", projectData, {
      headers: {
        "X-API-KEY": "VuovV2F1EXBaZ9JUMalFy1E5gHL90Ji6-rkYracX",
        "Content-Type": "application/json"
      }
    });
    return response.data;

  } catch (error) {
    console.error("❌ Error creating project:", error.response?.data || error.message);
  }
};

const createPropstackProperties = async (image_id) => {
  try {
   

    const unitData = {
      property: {
        title: "Beautiful 3-Room Apartment",
        unit_id: "Test data with image 2", 
        street: "Friedrichstraße",
        house_number: "101",
        zip_code: "10117",
        city: "Berlin",
        country: "DE",
        living_space: 77,
        number_of_rooms: 3,
        number_of_bed_rooms: 2,
        number_of_bath_rooms: 1,
        base_rent: 1200,
        price: 360000,
        marketing_type: "RENT", // or "RENT"
        rs_type: "APARTMENT",
        rs_category: "PENTHOUSE",
        construction_year: 2020,
        description_note: "Spacious and bright 3-room apartment in Berlin center.",
        furnishing_note: "Modern kitchen, wood flooring, elevator",
        other_note: "Ready to move in immediately"
      }
    };

    const response = await axios.post("https://api.propstack.de/v1/units", unitData, {
      headers: {
        "X-API-KEY": "VuovV2F1EXBaZ9JUMalFy1E5gHL90Ji6-rkYracX",
        "Content-Type": "application/json"
      }
    });

    console.log("response.data.id", response.data)

    const propertyId = response.data.id;

    const imageRes = await uploadPropstackImage({propertyId, image_id});
    return {data:response.data,imageRes}

  } catch (error) {
    console.error("❌ Error creating project:", error.response?.data || error.message);
  }
};


const uploadPropstackImage = async ({propertyId, image_id}) => {
  try {
   
    console.log("=======",  propertyId)

    const imagePayload = {
      image: {
        imageable_id: propertyId,
        imageable_type: "Property",
        photo: image_id,
        title: "Test Image",
        is_private: false
      }
    };

    const response = await axios.post("https://api.propstack.de/v1/images", imagePayload, {
      headers: {  
        "X-API-KEY": "VuovV2F1EXBaZ9JUMalFy1E5gHL90Ji6-rkYracX",
        "Content-Type": "application/json"
      }
    });
    return response.data;

  } catch (error) {
    console.error("❌ Error upload iamge:", error.response?.data || error.message);
  }
};
 


  

const generateCognitoToken = async () => {
    try{
      console.log("Flow fact token: ",process.env.FLOWFACT_TOKEN);
      let req = await axios.get(`https://api.production.cloudios.flowfact-prod.cloud/admin-token-service/public/adminUser/authenticate` , {
        headers: {
          token: process.env.FLOWFACT_TOKEN
        }
      });
      return req.data;
    }catch(er){
      // throw new ApiError(404, er.message);
      console.log(er.message);
    }
};
const flowfactMultiMedia= async (pic, schema_name, entityId, title, cognitoToken) => {
    try{
      let formdata = new FormData();
      formdata.append("file", pic);
      axios
      .post(`https://api.production.cloudios.flowfact-prod.cloud/multimedia-service/items/schemas/${schema_name}/entities/${entityId}?title=${title}`, formdata,{
        headers: {
          cognitoToken,
          "Content-Type": "multipart/form-data",
        }
      });
    }catch(er){
      throw new ApiError(404, er.message);
    }
};

const formData = (data, contactId) => {
  return JSON.stringify({
      rooms: {
        values: [ +data.numberOfRooms ],
      },
      addresses: {
        values: [
          {
            city: data.city,
            state: null,
            street: data.address,
            country: null,
            zipcode: data.zip,
            district: null,
          },
        ],
      },
      textEnvironment: {
        values: [ data.features],
      },
  
      location: {
        value: data.location,
      },
      contact: {
        values: [contactId],
      },
      landlord: {
        values: [data.contactName],
      },
      identifier: {
        values: [data.uniqId],
      },
      textEstate: {
        values: [ data.description],
      },
      status: {
        values: ["active"],
      },
      headline: {
        values: [ data.listingTitle],
      },
      livingarea: {
        values: [ +data.livingArea],
      },
      plotarea: {
        values: [ +data.plotArea],
      },
      purchaseprice: {
        values: [ +data.listingPrice],
      },
      yearofconstruction: {
        values: [data.yearOfBuilding],
      },
      no_of_floors: {
        values: [data.numberOfFloors],
      },
      estatetype: {
        values: [data.listingType],
      },
    });
}

const publishToFlowFact = async (data, files) => {
    //cognitoToken
    try{
      const cognitoToken = await generateCognitoToken();
      //test if we have contact
      let contact = await axios.get(`https://api.production.cloudios.flowfact-prod.cloud/contact-service/contact?email=${data.formEmail}` , {
        headers: {
          cognitoToken
        }
      });
      if(contact.data == ''){
        const createFlowfactContact = JSON.stringify({
          firstName: data.contactName,
          lastName: '',
          emails: [data.formEmail],
          phones: [data.phone],
          addresses: [
            {
              city: data.city,
              street: data.address,
              zipcode: data.zip
            }
          ]
        });
        //lets create the contact
        let contactId = await axios.post(`https://api.production.cloudios.flowfact-prod.cloud/contact-service/contact`, createFlowfactContact, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            cognitoToken
          }
        });
        contactId = contactId.data;
        const getFormData = formData(data, contactId);
        //lets test the schemanale
        let schema_name;
        if (data.listingType === "For Rent") {
          if (data.buildingType === "Flat") {
            schema_name = "flat_rent";
          }
          if (data.buildingType === "House") {
            schema_name = "house_rent";
          }
          if (data.buildingType === "Investment") {
            schema_name = "investment";
          }
          if (data.buildingType === "Land") {
            schema_name = "land_lease";
          }
          if (data.buildingType === "Commercial") {
            schema_name = "other_commercial_estates_rent";
          }
        }
        if (data.listingType === "For Sale") {
          if (data.buildingType === "Flat") {
            schema_name = "flat_purchase";
          }
          if (data.buildingType === "House") {
            schema_name = "house_purchase";
          }
          if (data.buildingType === "Investment") {
            schema_name = "investment";
          }
          if (data.buildingType === "Land") {
            schema_name = "land_purchase";
          }
          if (data.buildingType === "Commercial") {
            schema_name = "other_commercial_estates_purchase";
          }
        }
        const createEntitie = await axios.post(`https://api.production.cloudios.flowfact-prod.cloud/entity-service/latest/schemas/${schema_name}`,getFormData, {
          headers: {
            "Content-Type": "application/json",
            cognitoToken
          }
        });
        let entityId = createEntitie.data;
        return entityId;
      }
    }catch(er){
      console.log(er);
    }
};


const publishToPortal = async (data) => {

};

module.exports = {
  publishToFlowFact,
  publishToPortal,
  generateCognitoToken,
  createPropstackProject,
  createPropstackProperties
};
