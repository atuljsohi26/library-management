import { Sequelize, DataTypes, Op } from 'sequelize';
import { sequelize } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';
import { encryptPassword,checkPassword } from '../utils/helper.js';
import { Codes, CONSTANTS } from '../utils/site-config.js';
import { sendEmail } from '../utils/email_sender.js';
import {Roles} from "./mstRolesModel.js";
import {MstEmailTemplate} from "./mstEmailTemplateModel.js";
const transaction = await sequelize.transaction(); // Start the transaction

const User = sequelize.define(
  'users',
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
      allowNull: true,
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
      comment: '0=Not verified, 1=Verified',
    },
    is_onboarding_completed: {
      type: DataTypes.TINYINT(2),
      defaultValue: 1,
      comment: '0=Not completed, 1=Completed',
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'mst_roles',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.TINYINT(4),
      allowNull: false,
      defaultValue: 0,
      comment: '0=inactive,1=active,2=deleted',
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
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'id' }],
      },
    ],
  }
);

User.createUser = async req => {
  console.log('req***ds',req.password);
  const transaction = await sequelize.transaction();
  try {
    // throw new Error(error.message);
    const email_otp=  uuidv4().replace(/\D/g, '').substring(0, 4);
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
          code:email_otp
        };
        sendEmail(emailTemplate, mailData);
      }
    }
    return { user: newUser};
  
  } catch (error) {
    // Rollback the transaction in case of an error
    await transaction.rollback();
    console.log('Error creating user:'+ error.message);
    throw new Error(error.message);
  }
};

User.findByEmail = async email => {
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

User.userLogin = async req => {
  
  try {
    const isUserExist = await User.findByEmail(req.email);
    if(!isUserExist){
     throw Object.assign(new Error(CONSTANTS.USER_NOT_EXIST), { status: 404 });
    }
    const checkPass = checkPassword(req.password, isUserExist.password);
    if (!checkPass) {
      throw Object.assign(new Error(CONSTANTS.INVALID_EMAIL_PASSWORD), { status: 401 });
     }
    
    return { user: isUserExist};
  
  } catch (error) {
    
    throw Object.assign(new Error(error.message), { status: error.status });
  }
};

User.userOtpMatch = async (req) => {
  try {
    const userData = await User.findOne({
      attributes: ['id', 'email', 'email_otp'],
      where: {
        email: req.email,
        email_otp: req.otp,
        status: { [Op.ne]: 2 },
      },
    });
    if (!userData) {
      throw Object.assign(new Error(CONSTANTS.EMAIL_OTP_NOT_MATCH), {
        status: Codes.UNAUTHORIZED,
      });
    }
    userData.is_email_verified = 1; // Update the field
    await userData.save();
    return { user: userData };
  } catch (error) {
    throw Object.assign(new Error(error.message), { status: error.status });
  }
};

User.resendOtp = async (req) => {
  try {
    const userData = await User.findOne({
      attributes: ['id', 'email', 'email_otp'],
      where: {
        email: req.email,
        status: { [Op.ne]: 2 },
      },
    });
    if (!userData) {
      throw Object.assign(new Error(CONSTANTS.USER_NOT_EXIST), {
        status: Codes.NOT_FOUND,
      });
    }
    const email_otp=  uuidv4().replace(/\D/g, '').substring(0, 4);
    userData.email_otp = email_otp; // Update the field
    await userData.save();
    if (userData) {
      //----------OTP Send On Mail------------//
      const emailTemplate = await MstEmailTemplate.findByPk(
        CONSTANTS.SIGNUP_PIN_GENERATE_TEMPLATE
      );
     // console.log("emailTemplate*",emailTemplate);
      if (emailTemplate) {
        let mailData = {
          to: userData.email,
          userName: userData.name,
          code:email_otp
        };
        sendEmail(emailTemplate, mailData);
      }
    }
    return { user: userData };
  } catch (error) {
    throw Object.assign(new Error(error.message), { status: error.status });
  }
};


User.setPassword = async (req) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.email,
        status: { [Op.ne]: 2 },
      },
      transaction, // Pass the transaction object
    });

    if (!userData) {
      throw Object.assign(new Error(CONSTANTS.USER_NOT_EXIST), {
        status: Codes.NOT_FOUND,
      });
    }
  // Update fields
    userData.password = encryptPassword(req.password);

    await userData.save({ transaction }); // Save changes within the transaction

    await transaction.commit(); // Commit the transaction if successful

    return { user: userData };
  } catch (error) {
    await transaction.rollback(); // Rollback the transaction in case of an error

    throw Object.assign(new Error(error.message), { status: error.status });
  }
};

User.onBorading = async (req) => {
 
  try {
    const userData = await User.findOne({
      attributes: ['id', 'name', 'company', 'email', 'is_email_verified', 'is_onboarding_completed', 'role_id', 'status'],
      where: {
        id: req.id,
        status: { [Op.ne]: 2 },
      },
      transaction, // Pass the transaction object
    });

    if (!userData) {
      throw Object.assign(new Error(CONSTANTS.USER_NOT_EXIST), {
        status: Codes.NOT_FOUND,
      });
    }
  // Update fields
    userData.is_onboarding_completed = 1;

    await userData.save({ transaction }); // Save changes within the transaction

    await transaction.commit(); // Commit the transaction if successful

    return { user: userData };
  } catch (error) {
    await transaction.rollback(); // Rollback the transaction in case of an error

    throw Object.assign(new Error(error.message), { status: error.status });
  }
};

User.belongsTo(Roles, { foreignKey: "role_id", as: "role" });
export { User };
