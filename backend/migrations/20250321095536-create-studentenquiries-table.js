'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('studentEnquiries', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },

      // --- Add Agent Reference ---
      agentId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'agents',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },

      // --- Personal Details ---
      givenName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      surName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      gender: {
        type: Sequelize.ENUM('Male', 'Female'),
        allowNull: true
      },
      currentOccupation: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dateOfBirth: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      nidNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },

      // --- Contact Details ---
      phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },

      // --- Family Details ---
      fathersName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fathersNid: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fathersPhone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      mothersName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mothersNid: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mothersPhone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      spouseName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      spouseNid: {
        type: Sequelize.STRING,
        allowNull: true
      },
      spousePhone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      numberOfChildren: {
        type: Sequelize.STRING,
        allowNull: true
      },
      numberOfBrother: {
        type: Sequelize.STRING,
        allowNull: true
      },
      numberOfSister: {
        type: Sequelize.STRING,
        allowNull: true
      },

      // --- Interested Services (array as JSON) ---
      interestedServices: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      // --- Education Background (array of objects) ---
      educationBackground: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      // --- English Test Scores (store as JSON) ---
      englishTestScores: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      // --- File Uploads ---
      passportDocument: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      cvDocument: {
        type: Sequelize.TEXT,
        allowNull: false
      },

      // --- Emergency Contact ---
      emergencyContact: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      // --- Passport Details ---
      hasPreviousPassport: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      previousPassportNumbers: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      passportDetails: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      // --- NEW: Added Travel History ---
      travelHistory: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      // --- Visa Refusal Details ---
      visaRefusalDetails: {
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

    // Add indexes for better performance
    await queryInterface.addIndex('studentEnquiries', ['email']);
    await queryInterface.addIndex('studentEnquiries', ['agentId']);
    await queryInterface.addIndex('studentEnquiries', ['createdAt']);
    await queryInterface.addIndex('studentEnquiries', ['givenName']);
    await queryInterface.addIndex('studentEnquiries', ['surName']);
    await queryInterface.addIndex('studentEnquiries', ['phone']);
  },

  async down(queryInterface, Sequelize) {
    // Remove indexes first
    await queryInterface.removeIndex('studentEnquiries', ['email']);
    await queryInterface.removeIndex('studentEnquiries', ['agentId']);
    await queryInterface.removeIndex('studentEnquiries', ['createdAt']);
    await queryInterface.removeIndex('studentEnquiries', ['givenName']);
    await queryInterface.removeIndex('studentEnquiries', ['surName']);
    await queryInterface.removeIndex('studentEnquiries', ['phone']);

    // Then drop the table
    await queryInterface.dropTable('studentEnquiries');
  }
};