'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('institution_partners', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      fullNameOfInstitute: {
        type: Sequelize.STRING,
        allowNull: false
      },
      category: {
        type: Sequelize.ENUM('University', 'Institute', 'Professional Year Provider', 'RPL Provider'),
        allowNull: false
      },
      coursesProviding: {
        type: Sequelize.TEXT, // Changed from ARRAY to TEXT
        allowNull: false
      },
      otherCourses: {
        type: Sequelize.STRING,
        allowNull: true
      },
      businessRegistrationNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      countryLocated: {
        type: Sequelize.STRING,
        allowNull: false
      },
      campusLocations: {
        type: Sequelize.TEXT, // Changed from ARRAY to TEXT
        allowNull: false
      },
      primaryEmailAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { isEmail: true }
      },
      website: {
        type: Sequelize.STRING,
        allowNull: true
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      position: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contactEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { isEmail: true }
      },
      countryCode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('institution_partners');
  }
};