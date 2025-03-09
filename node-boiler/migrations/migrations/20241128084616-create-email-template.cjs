'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('email_template', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      subject: {
        type: Sequelize.DataTypes.STRING(191),
        allowNull: false,
      },
      content: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: Sequelize.DataTypes.STRING(191),
        allowNull: false,
      },
      status: {
        type: Sequelize.TINYINT,
        defaultValue: 0,
        comment: "0=Inactive, 1=Active, 2=Deleted",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('email_template');
  },
};
