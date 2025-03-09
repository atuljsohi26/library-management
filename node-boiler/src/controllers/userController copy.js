import { Codes, CONSTANTS } from "../utils/site-config.js";
import {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  isEmailExists,
  userLoginService,
} from "../services/userService.js";
//import UserDTO  from  '../dtos/userDTO';
//import { CreateUserDTO } from '../dtos/createUserDTO.js';
import {
  validateCreateUserData,
  validateEmailUniqueness,
  validateUserLoginData,
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

import { response } from "../utils/customError.js";
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
  console.log("req.body", req.body);
  try {
    // const response = {message:"",status:200,data:[]}
    const userDTO = validateUserLoginData(req.body); // Validate input
    const getUserResult = await userLoginService(userDTO);
    console.log("getUserResult***", getUserResult);
    // console.log("users***",getUserResult?.user?.dataValues?.email);
const res = response(getUserResult)
    res.status(res);

    // const tokenData = {
    //   id: getUserResult?.user?.dataValues?.id,
    //   email: getUserResult?.user?.dataValues?.email,
    //   role_id: getUserResult?.user?.dataValues?.role_id,
    // };
    // console.log("tokenData**",tokenData);

    // const token = generateJwtToken(tokenData, process.env.ACCESS_TOKEN_EXPIRY);
    // const refreshToken = generateJwtToken(
    //   tokenData,
    //   process.env.REFRESH_TOKEN_EXPIRY
    // );
    // getUserResult.user.dataValues.token = token;
    // getUserResult.user.dataValues.refreshToken = refreshToken;
    // delete getUserResult.user?.dataValues?.password;
    // res.status(Codes.OK).json({
    //   statusCode: Codes.OK,
    //   message: CONSTANTS.LOGIN_SUCCESS,
    //   data: getUserResult.user
    // });
  } catch (error) {
    // next(error);
    console.log("error in user login controller", { error });
    res.status(Codes.NOT_FOUND).json({
      statusCode: Codes.NOT_FOUND,
      message: CONSTANTS.INVALID_EMAIL_PASSWORD,
      data: [],
    });
  }
};
