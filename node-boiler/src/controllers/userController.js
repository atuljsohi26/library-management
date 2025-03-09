import { Codes, CONSTANTS } from "../utils/site-config.js";
import {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  isEmailExists,
  userLoginService,
  userOtpMatchService,
  setPasswordService,
  onBoradingService,
  resendOtpService
} from "../services/userService.js";
import {
  validateCreateUserData,
  validateEmailUniqueness,
  validateUserLoginData,
  validateOtpMatchData,
  validateResendOtpData,
} from "../dtos/createUserDTO.js";
import { generateJwtToken } from "../utils/helper.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await getUserByIdService(req.params.id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    // const userDTO = new CreateUserDTO(req.body, async (email) => {
    //     console.log("email",email);
    //     return await isEmailExists(email);
    // });
    const userDTO = validateCreateUserData(req.body); // Validate input
    await validateEmailUniqueness(userDTO.email, isEmailExists);
    const createdUser = await createUserService(userDTO);
    res.status(Codes.OK).json({
      statusCode: Codes.OK,
      message: CONSTANTS.PIN_GENERATE_EMAIL_SEND,
      //data: createdUser
    });
  } catch (error) {
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const userDTO = validateUserLoginData(req.body); // Validate input
    const getUserResult = await userLoginService(userDTO);

    const tokenData = {
      id: getUserResult?.dataValues?.id,
      email: getUserResult?.dataValues?.email,
      role_id: getUserResult?.dataValues?.role_id,
    };

    const token = generateJwtToken(tokenData, process.env.ACCESS_TOKEN_EXPIRY);
    const refreshToken = generateJwtToken(
      tokenData,
      process.env.REFRESH_TOKEN_EXPIRY
    );
    getUserResult.dataValues.token = token;
    getUserResult.dataValues.refreshToken = refreshToken;
    delete getUserResult?.dataValues?.password;
    res.status(Codes.OK).json({
      success: true,
      statusCode: Codes.OK,
      message: CONSTANTS.LOGIN_SUCCESS,
      data: getUserResult,
    });
  } catch (error) {
    next(error);
  }
};

export const otpMatch = async (req, res, next) => {
  try {
    const userDTO = validateOtpMatchData(req.body); // Validate input
    const getUserResult = await userOtpMatchService(userDTO);
    delete getUserResult?.dataValues?.email_otp;
    res.status(Codes.OK).json({
      success: true,
      statusCode: Codes.OK,
      message: CONSTANTS.EMAIL_OTP_MATCH_SUCCESS,
      data: getUserResult,
    });
  } catch (error) {
    next(error);
  }
};
export const setPassword = async (req, res, next) => {
  try {
    const userDTO = validateUserLoginData(req.body); // Validate input
    const getUserResult = await setPasswordService(userDTO);
    const tokenData = {
      id: getUserResult?.dataValues?.id,
      email: getUserResult?.dataValues?.email,
      role_id: getUserResult?.dataValues?.role_id,
    };

    const token = generateJwtToken(tokenData, process.env.ACCESS_TOKEN_EXPIRY);
    const refreshToken = generateJwtToken(
      tokenData,
      process.env.REFRESH_TOKEN_EXPIRY
    );
    getUserResult.dataValues.token = token;
    getUserResult.dataValues.refreshToken = refreshToken;
    delete getUserResult?.dataValues?.password;
    delete getUserResult?.dataValues?.email_otp;
    res.status(Codes.OK).json({
      success: true,
      statusCode: Codes.OK,
      message: CONSTANTS.PASSWORD_SET_SUCCESS,
      data: getUserResult,
    });
    
  } catch (error) {
    next(error);
  }
};
export const onBorading = async (req, res, next) => {
  try {
   const getUserResult = await onBoradingService(req.user);
    res.status(Codes.OK).json({
      success: true,
      statusCode: Codes.OK,
      message: CONSTANTS.ONBOARDING_COMPLETED_SUCCESS,
      data: getUserResult,
    });
    
  } catch (error) {
    next(error);
  }
};
export const resendOtp = async (req, res, next) => {
  try {
    const userDTO = validateResendOtpData(req.body); // Validate input
     const createdUser = await resendOtpService(userDTO);
    res.status(Codes.OK).json({
      statusCode: Codes.OK,
      message: CONSTANTS.PIN_GENERATE_EMAIL_SEND,
     });
  } catch (error) {
    next(error);
  }
};


