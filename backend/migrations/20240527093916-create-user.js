'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      }, 
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      profile_pic: {
        type: Sequelize.STRING,
        allowNull: true,
      }, 
      interprice: {
        type: Sequelize.STRING,
        allowNull: true,
      }, 
      otp: {
        type: Sequelize.STRING,
        allowNull: true,
      }, 
      is_profile_flag: {
        type: Sequelize.ENUM('0','1'),
        allowNull: false,
        defaultValue: '0',
      },
      status: {
        type: Sequelize.ENUM('worker','staff_manager'),
        allowNull: false,
        defaultValue: 'staff_manager',
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};