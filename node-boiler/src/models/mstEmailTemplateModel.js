import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
const MstEmailTemplate = sequelize.define(
  "email_template",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    subject: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(45),
      allowNull: true,
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
    tableName: "email_template",
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }],
      },
    ],
  },
);

export { MstEmailTemplate };