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

      // --- Personal Details ---
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { notEmpty: true }
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { notEmpty: true }
      },
      dateOfBirth: {
        type: Sequelize.DATEONLY,
        validate: { isDate: true }
      },

      // --- Contact Details ---
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { notEmpty: true }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          notEmpty: true
        }
      },

      // --- Address ---
      street: { type: Sequelize.STRING },
      city: { type: Sequelize.STRING },
      state: { type: Sequelize.STRING },
      zipCode: { type: Sequelize.STRING },
      country: { type: Sequelize.STRING },

      // --- Visa Information ---
      visaType: { type: Sequelize.STRING },
      visaExpiryDate: {
        type: Sequelize.DATEONLY,
        validate: { isDate: true }
      },
      passportCountry: { type: Sequelize.STRING },

      // --- Other Details ---
      preferredIntake: { type: Sequelize.STRING },

      // --- Interested Services (array as JSON) ---
      interestedServices: {
        type: Sequelize.TEXT,
        validate: {
          isJSON: true
        }
      },

      // --- Education Background (array of objects) ---
      educationBackground: {
        type: Sequelize.TEXT,
        validate: {
          isJSON: true
        }
      },

      // --- English Test Scores (store as JSON) ---
      englishTestScores: {
        type: Sequelize.TEXT,
        validate: {
          isJSON: true
        }
      },

      // --- File Uploads ---
      documents: {
        type: Sequelize.TEXT,
        validate: {
          isJSON: true
        }
      },

      // --- Comments ---
      comments: { type: Sequelize.TEXT },

      // --- Emergency Contact ---
      emergencyContact: {
        type: Sequelize.TEXT,
        validate: {
          isJSON: true
        }
      },

      // --- Passport Details ---
      passportDetails: {
        type: Sequelize.TEXT,
        validate: {
          isJSON: true
        }
      },

      // --- Visa Refusal Details ---
      visaRefusalDetails: {
        type: Sequelize.TEXT,
        validate: {
          isJSON: true
        }
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
    await queryInterface.addIndex('StudentEnquiries', ['email']);
    await queryInterface.addIndex('StudentEnquiries', ['createdAt']);
    await queryInterface.addIndex('StudentEnquiries', ['lastName']);
    await queryInterface.addIndex('StudentEnquiries', ['country']);
  },

  async down(queryInterface, Sequelize) {
    // Remove indexes first
    await queryInterface.removeIndex('StudentEnquiries', ['email']);
    await queryInterface.removeIndex('StudentEnquiries', ['createdAt']);
    await queryInterface.removeIndex('StudentEnquiries', ['lastName']);
    await queryInterface.removeIndex('StudentEnquiries', ['country']);

    // Then drop the table
    await queryInterface.dropTable('StudentEnquiries');
  }
};