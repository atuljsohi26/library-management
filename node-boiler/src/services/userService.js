import { User } from '../models/userModel.js';

export const getAllUsersService = async () => {
  return await User.findAll();
};

export const getUserByIdService = async id => {
  return await User.findByPk(id);
};

export const createUserService = async userDTO => {
   
  return await User.createUser(userDTO);
};

export const userLoginService = async userDTO => {
   console.log("inisde user loghin service");
   const user = await User.userLogin(userDTO);
   return user.user;
};
export const userOtpMatchService = async userDTO => {
  const user = await User.userOtpMatch(userDTO);
  return user.user;
};
export const setPasswordService = async userDTO => {
  const user = await User.setPassword(userDTO);
  return user.user;
};
export const onBoradingService = async req => {
  const user = await User.onBorading(req);
  return user.user;
};

export const resendOtpService = async userDTO => {
  const user = await User.resendOtp(userDTO);
  return user.user;
};

// Check if email already exists
export const isEmailExists =  (async email => {
  const user = await User.findByEmail(email);
  return user; // Returns true if user exists, false otherwise
})
