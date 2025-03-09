import { Sequelize, DataTypes, Op } from "sequelize";
import { sequelize } from "../config/database.js";
import { v4 as uuidv4 } from "uuid";
import { encryptPassword, checkPassword } from "../utils/helper.js";
import { Codes, CONSTANTS } from "../utils/site-config.js";
import { sendEmail } from "../utils/email_sender.js";
import { Roles } from "./mstRolesModel.js";
import { MstEmailTemplate } from "./mstEmailTemplateModel.js";
//import { CustomError } from "../utils/customError.js";
const User = sequelize.define(
  "users",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(191),
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING(191),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(191),
      allowNull: true,
    },
    email_otp: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    is_email_verified: {
      type: DataTypes.TINYINT(2),
      defaultValue: 0,
      comment: "0=Not verified, 1=Verified",
    },
    is_onboarding_completed: {
      type: DataTypes.TINYINT(2),
      defaultValue: 0,
      comment: "0=Not completed, 1=Completed",
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "mst_roles",
        key: "id",
      },
    },
    status: {
      type: DataTypes.TINYINT(4),
      allowNull: false,
      defaultValue: 0,
      comment: "0=inactive,1=active,2=deleted",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }],
      },
    ],
  }
);

User.createUser = async (req) => {
  console.log("req***ds", req.password);
  const transaction = await sequelize.transaction();
  try {
    // throw new Error(error.message);
    const email_otp = uuidv4().replace(/\D/g, "").substring(0, 6);
    const newUser = await User.create(
      {
        name: req.name,
        email: req.email,
        company: req.company,
        email_otp: email_otp,
        role_id: req.role_id,
        //password: encryptPassword(req.password),
      },
      { transaction } // Pass the transaction object
    );
    // Commit the transaction if everything succeeds
    await transaction.commit();
    // Return the created user and role data
    if (newUser) {
      //----------OTP Send On Mail------------//
      const emailTemplate = await MstEmailTemplate.findByPk(
        CONSTANTS.SIGNUP_PIN_GENERATE_TEMPLATE
      );
      // console.log("emailTemplate*",emailTemplate);
      if (emailTemplate) {
        let mailData = {
          to: newUser.email,
          userName: newUser.name,
          code: email_otp,
        };
        sendEmail(emailTemplate, mailData);
      }
    }
    return { user: newUser };
  } catch (error) {
    // Rollback the transaction in case of an error
    await transaction.rollback();
    console.log("Error creating user:" + error.message);
    throw new Error(error.message);
  }
};

User.findByEmail = async (email) => {
  return await User.findOne({
    where: {
      email,
      status: { [Op.ne]: 2 },
    },
    include: [
      {
        model: Roles,
        as: "role",
        attributes: ["name"], // Fetch only the role name
      },
    ],
  });
};

// const createCustomError = (message, statusCode = 500) => {
//   console.log("custom error ", { message, statusCode });
//   // const error = new Error(message);
//   let error = {};
//   error.statusCode = statusCode;
//   error.message = message;
//   return { error };
// };

User.userLogin = async (req) => {
  console.log("check one");

  try {
    const isUserExist = await User.findByEmail(req.email);
    console.log("check");
    if (!isUserExist) {
      console.log("check to");
      console.log("retunn error due to user already exist", { isUserExist });
      throw new (CONSTANTS.INVALID_EMAIL_PASSWORD);
      // throw new Error(CONSTANTS.USER_NOT_EXIST, 401);
      // return createCustomError(CONSTANTS.USER_NOT_EXIST, 401);
      let error = { statusCode: 402, message: CONSTANTS.USER_NOT_EXIST, status: false };
      return  error;
    }
    const checkPass = checkPassword(req.password, isUserExist.password);
    if (!checkPass) {
      console.log("** incorrect password **");

      throw new Error(CONSTANTS.INVALID_EMAIL_PASSWORD);
    }

    return { user: isUserExist };
  } catch (error) {
    // Rollback the transaction in case of an error
    console.log("Error creating user:" + error.message);
    throw new Error(error.message, 401);
  }
};

User.belongsTo(Roles, { foreignKey: "role_id", as: "role" });
export { User };
