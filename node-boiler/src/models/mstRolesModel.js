import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
const Roles = sequelize.define(
  "mst_roles",
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
   status: {
      type: DataTypes.TINYINT(4),
      allowNull: false,
      defaultValue: 1,
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
    tableName: "mst_roles",
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


export { Roles };
