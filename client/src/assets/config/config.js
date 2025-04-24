// const Joi = require("joi");
import Joi from "joi";

const envVarsSchema = Joi.object()
  .keys({
    VITE_API_URL: Joi.string().default("").description("backend server url"),
    VITE_STRIPE_PUBLIC_KEY: Joi.string()
      .required()
      .description("Stripe public key"),
    VITE_USERS_PER_PAGE: Joi.number()
      .default(10)
      .description("number of users per page in users table"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(import.meta.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  api: {
    url: envVars.VITE_API_URL || "http://64.23.243.67:5001",
  },
  stripe: {
    publicKey: envVars.VITE_STRIPE_PUBLIC_KEY,
  },
  users: {
    resultsPerPage: envVars.VITE_USERS_PER_PAGE,
  },
};
