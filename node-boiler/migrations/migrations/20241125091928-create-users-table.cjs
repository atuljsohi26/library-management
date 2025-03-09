'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        //unique: true,
      },
      company: {
        type: Sequelize.STRING(191),
        allowNull: true,
      },
      email_otp: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      is_email_verified: {
        type: Sequelize.TINYINT,
        defaultValue: 0,
        comment: "0=Not verified, 1=Verified",
      },
      password: {
        type: Sequelize.STRING(191),
        allowNull: true,
      },
      is_onboarding_completed: {
        type: Sequelize.TINYINT,
        defaultValue: 0,
        comment: "0=Not completed, 1=Completed",
      },
      status: {
        type: Sequelize.TINYINT,
        defaultValue: 0,
        comment: "0=Inactive, 1=Active, 2=Deleted",
      },
      role_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
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
    await queryInterface.addConstraint('users', {
      fields: ['role_id'],
      type: 'foreign key',
      name: 'fk_user_roles_role_id',
      references: {
        table: 'mst_roles',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};
