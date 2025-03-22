'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StudentEnquiries', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      studentName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      englishProficiencyTest: {
        type: Sequelize.ENUM("IELTS", "PTE", "TOEFL", "Duolingo"),
        allowNull: false
      },
      testResult: {
        type: Sequelize.JSON, // Store test results as a JSON object
        allowNull: false
      },
      academicQualification: {
        type: Sequelize.JSON, // Store academic qualifications as a JSON array
        allowNull: false
      },
      que1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      que2: {
        type: Sequelize.STRING,
        allowNull: false
      },
      que3: {
        type: Sequelize.STRING,
        allowNull: false
      },
      visaHistory: {
        type: Sequelize.JSON, // Store visa history as a JSON object
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('StudentEnquiries');
  }
};