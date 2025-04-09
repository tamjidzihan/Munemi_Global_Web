'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('health_insurance_partners', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      tradingName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      businessRegistrationNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      officePhoneNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      countryLocated: {
        type: Sequelize.STRING,
        allowNull: false
      },
      primaryOfficeLocation: {
        type: Sequelize.STRING,
        allowNull: false
      },
      website: {
        type: Sequelize.STRING,
        allowNull: true
      },
      applyingAs: {
        type: Sequelize.ENUM('Singles', 'Single Couples', 'Overseas Visitors', 'Overseas Student', 'Other'),
        allowNull: false
      },
      otherInsuranceType: {
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
      contactCountryCode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contactPhoneNumber: {
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
    await queryInterface.dropTable('health_insurance_partners');
  }
};