import { v4 as uuidv4 } from "uuid";
import { sendEmail } from "../services/emailService.js";
import { getEmailTemplateById } from "../services/commonService.js";
import { Codes, CONSTANTS } from "../utils/site-config.js";
export default (sequelize, DataTypes) => {
  const Users = sequelize.define(
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
        {
          name: "fk_user_roles_role_id",
          using: "BTREE",
          fields: [{ name: "role_id" }],
        },
      ],
    }
  );
  Users.createUser = async (req) => {
    console.log("req***ds",req.password);
    const transaction = await sequelize.transaction();
   try {
       // throw new Error(error.message);
       let email_otp=  uuidv4().replace(/\D/g, '').substring(0, 6);
       const newUser = await Users.create(
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
    if (newUser) {
      //----------OTP Send On Mail------------//
      const emailTemplate = await getEmailTemplateById(
        CONSTANTS.SIGNUP_PIN_GENERATE_TEMPLATE
      );
      if (emailTemplate) {
        let mailData = {
          to: newUser.email,
          userName: newUser.name,
          code:email_otp
        };
        sendEmail(emailTemplate, mailData);
      }
    }
    // Return the created user and role data
    return { user: newUser};
    //return { user: newUser, role: userRole };
  
    } catch (error) {
        // Rollback the transaction in case of an error
        await transaction.rollback();
        console.error('Error creating user:', error.message);
      throw new Error(error.message);
    }
  };
  /** Get All User with filters if any */
  Users.list = async (condition, limit, offset) => {
    const allUserList = await Users.findAndCountAll({
      attributes: ["id", "name", "username","email","user_role","document_file","dob","ssn","address","status","created_at","updated_at"],
      include: [
        // {
        //   model: sequelize.models.user_contact,
        //   attributes: [],
        //   as: "pfa_users",
        //   required: true,
        //   where: {
        //     primary_family_admin: 1,
        //   },
        // },
      ],
      where: condition,
      limit: limit,
      offset: offset,
      order: [["id", "DESC"]],
      distinct: true,
    });
    return allUserList;
  };
  Users.findByEmail= async (email) => {
    return await Users.findOne({ where: { email } }); // Sequelize example
    };

  return Users;
};
