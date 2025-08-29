'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('agents', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      applicationId: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: 'agents_applications',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      // Copy relevant fields from application
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
      // Additional fields for active agents
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      commissionRate: {
        type: Sequelize.DECIMAL(5, 2),
        defaultValue: 0.0
      },
      totalStudentsReferred: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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
    await queryInterface.addIndex('agents', ['applicationId']);
    await queryInterface.addIndex('agents', ['emailAddress']);
    await queryInterface.addIndex('agents', ['isActive']);
    await queryInterface.addIndex('agents', ['tradingName']);
    await queryInterface.addIndex('agents', ['applyingAs']);
  },

  async down(queryInterface, Sequelize) {
    // Remove indexes
    await queryInterface.removeIndex('agents', ['applicationId']);
    await queryInterface.removeIndex('agents', ['emailAddress']);
    await queryInterface.removeIndex('agents', ['isActive']);
    await queryInterface.removeIndex('agents', ['tradingName']);
    await queryInterface.removeIndex('agents', ['applyingAs']);

    await queryInterface.dropTable('agents');
  }
};