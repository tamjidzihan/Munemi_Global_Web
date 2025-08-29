'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('agents_applications', {
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
      companyPhone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      emailAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      applyingAs: {
        type: Sequelize.ENUM('Sub-Agent', 'Super-Agent'),
        allowNull: false
      },
      primaryOfficeLocation: {
        type: Sequelize.STRING,
        allowNull: false
      },
      currentAddress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      website: {
        type: Sequelize.STRING,
        allowNull: true
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      position: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      personalPhone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      personalEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      // Add approval status fields
      status: {
        type: Sequelize.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending',
        allowNull: false
      },
      approvedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      approvedBy: {
        type: Sequelize.UUID,
        allowNull: true
      },
      rejectionReason: {
        type: Sequelize.TEXT,
        allowNull: true
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

    // Add indexes
    await queryInterface.addIndex('agents_applications', ['emailAddress']);
    await queryInterface.addIndex('agents_applications', ['personalEmail']);
    await queryInterface.addIndex('agents_applications', ['status']);
    await queryInterface.addIndex('agents_applications', ['tradingName']);
  },

  async down(queryInterface, Sequelize) {
    // Remove indexes
    await queryInterface.removeIndex('agents_applications', ['emailAddress']);
    await queryInterface.removeIndex('agents_applications', ['personalEmail']);
    await queryInterface.removeIndex('agents_applications', ['status']);
    await queryInterface.removeIndex('agents_applications', ['tradingName']);

    await queryInterface.dropTable('agents_applications');
  }
};