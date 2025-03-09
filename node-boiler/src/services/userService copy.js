import { User } from "../models/userModel.js";

export const getAllUsersService = async () => {
  return await User.findAll();
};

export const getUserByIdService = async (id) => {
  return await User.findByPk(id);
};

export const createUserService = async (userDTO) => {
  return await User.createUser(userDTO);
};

export const userLoginService = async (userDTO) => {
  console.log("inisde user loghin service");
  try {
    console.log("check first")

    const data = await User.userLogin(userDTO);
    console.log("user service login method call", { data });

    console.log("error in user service login method data", data);
return data;
  } catch (error) {
    return error;
    console.log("error in user service login method", { error });

  }
};

// Check if email already exists
export const isEmailExists = async (email) => {
  const user = await User.findByEmail(email);
  return user; // Returns true if user exists, false otherwise
};
