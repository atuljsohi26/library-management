import Joi from "joi";
import { Codes, CONSTANTS } from '../utils/site-config.js';

/**
 * Validates user input data against the schema
 * @param {Object} data - The user input data
 * @returns {Object} - The validated data
 * @throws {Error} - Throws an error if validation fails
 */
export const validateCreateUserData = (data) => {
  // Define Joi schema for validation
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    company: Joi.string().min(8).max(150).optional().allow(''),
    role_id: Joi.number().integer().min(1).max(4).required(), // role_id as integer
    //project_id: Joi.string().required(), // project_id is optional
  });

  // Validate the input data
  const { error, value } = schema.validate(data, { abortEarly: false });

  if (error) {
    throw Object.assign(new Error(`Validation failed: ${error.details.map((x) => x.message).join("", "")}`), {
      status: Codes.BAD_REQUEST,
    });
    // throw new Error(
    //   `Validation failed: ${error.details.map((x) => x.message).join("", "")}`
    // );
  }
  // const errorMessages = error.details.reduce((acc, curr) => {
  //   acc[curr.context.key] = curr.message; // Map the key to its error message
  //   return acc;
  // }, {});

  // throw new Error(JSON.stringify({ success: false, errors: errorMessages }));

  // Return the validated values
  return value;
};
export const validateUserLoginData = (data) => {
  // Define Joi schema for validation
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required(),
  });

  // Validate the input data
  const { error, value } = schema.validate(data, { abortEarly: false });

  if (error) {
    // throw new Error(
    //   `Validation failed: ${error.details.map((x) => x.message).join("", "")}`
    // );
    throw Object.assign(new Error(`Validation failed: ${error.details.map((x) => x.message).join("", "")}`), {
      status: Codes.BAD_REQUEST,
    });
  }

  // Return the validated values
  return value;
};
export const validateOtpMatchData = (data) => {
  // Define Joi schema for validation
  const schema = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().required(),
  });

  // Validate the input data
  const { error, value } = schema.validate(data, { abortEarly: false });
  if (error) {
    throw Object.assign(new Error(`Validation failed: ${error.details.map((x) => x.message).join("", "")}`), {
      status: Codes.BAD_REQUEST,
    });
    // throw new Error(
    //   `Validation failed: ${error.details.map((x) => x.message).join("", "")}`
    // );
  }
  // Return the validated values
  return value;
};

export const validateResendOtpData = (data) => {
  // Define Joi schema for validation
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  // Validate the input data
  const { error, value } = schema.validate(data, { abortEarly: false });
  if (error) {
    throw Object.assign(new Error(`Validation failed: ${error.details.map((x) => x.message).join("", "")}`), {
      status: Codes.BAD_REQUEST,
    });
    // throw new Error(
    //   `Validation failed: ${error.details.map((x) => x.message).join("", "")}`
    // );
  }
  // Return the validated values
  return value;
};

/**
 * Asynchronously checks if the email already exists
 * @param {string} email - The email to check
 * @param {Function} emailExistsCheck - The function to check email existence
 * @throws {Error} - Throws an error if the email already exists
 */
export const validateEmailUniqueness = async (email, emailExistsCheck) => {
  const user = await emailExistsCheck(email);
  if (user) {
    throw Object.assign(new Error("The email address " + email + " is already associated with an " + user.role.name + ". Please use a different email address."), {
      status: Codes.ALREADY_EXIST,
    });
    // throw new Error(
    //   "The email address " +
    //     email +
    //     " is already associated with an " +
    //     user.role.name +
    //     ". Please use a different email address."
    // );
  }
};
