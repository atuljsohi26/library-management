'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('projects', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        comment:"Project Create By User"
      },
      project_type: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        comment:"Project Type"
      },
      logo: {
        type: Sequelize.STRING(191),
        allowNull: true,
      },
      business_name: {
        type: Sequelize.STRING(191),
        allowNull: false,
      },
      project_name: {
        type: Sequelize.STRING(191),
        allowNull: false,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      latitude: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      longitude: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
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
    await queryInterface.addConstraint('projects', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fk_projects_user_id',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    await queryInterface.addConstraint('projects', {
      fields: ['project_type'],
      type: 'foreign key',
      name: 'fk_projects_project_type',
      references: {
        table: 'mst_project_type',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('projects');
  },
};
