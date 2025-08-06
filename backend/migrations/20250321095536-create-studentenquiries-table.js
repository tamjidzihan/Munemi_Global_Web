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
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          notEmpty: true
        }
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      englishProficiencyTest: {
        type: Sequelize.ENUM("IELTS", "PTE", "TOEFL", "Duolingo"),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      testResult: {
        type: Sequelize.TEXT, // Changed from JSON to TEXT
        allowNull: false,
        validate: {
          notEmpty: true,
          isJSON: true // Add validation to ensure it's valid JSON
        }
      },
      academicQualification: {
        type: Sequelize.TEXT, // Changed from JSON to TEXT
        allowNull: false,
        validate: {
          notEmpty: true,
          isJSON: true // Add validation to ensure it's valid JSON
        }
      },
      que1: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      que2: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      que3: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      visaHistory: {
        type: Sequelize.TEXT, // Changed from JSON to TEXT
        allowNull: false,
        validate: {
          notEmpty: true,
          isJSON: true // Add validation to ensure it's valid JSON
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
  },

  async down(queryInterface, Sequelize) {
    // Remove indexes first
    await queryInterface.removeIndex('StudentEnquiries', ['email']);
    await queryInterface.removeIndex('StudentEnquiries', ['createdAt']);

    // Then drop the table
    await queryInterface.dropTable('StudentEnquiries');
  }
};