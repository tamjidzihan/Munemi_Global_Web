'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('studentEnquiryAddresses', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      studentEnquiryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'studentEnquiries',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      addressType: {
        type: Sequelize.ENUM('Permanent', 'Present'),
        allowNull: false
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true
      },
      zipCode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      country: {
        type: Sequelize.STRING,
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

    // Add indexes
    await queryInterface.addIndex('studentEnquiryAddresses', ['studentEnquiryId']);
    await queryInterface.addIndex('studentEnquiryAddresses', ['addressType']);
    await queryInterface.addIndex('studentEnquiryAddresses', ['country']);
  },

  async down(queryInterface, Sequelize) {
    // Remove indexes
    await queryInterface.removeIndex('studentEnquiryAddresses', ['studentEnquiryId']);
    await queryInterface.removeIndex('studentEnquiryAddresses', ['addressType']);
    await queryInterface.removeIndex('studentEnquiryAddresses', ['country']);

    await queryInterface.dropTable('studentEnquiryAddresses');
  }
};