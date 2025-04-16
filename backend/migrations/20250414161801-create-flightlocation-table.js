'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('flight_location', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      cityName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'city_name' // Optional: specify the database column name
      },
      airportCode: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'airport_code' // Optional: specify the database column name
      },
      airportName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'airport_name' // Optional: specify the database column name
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('flight_location');
  }
};