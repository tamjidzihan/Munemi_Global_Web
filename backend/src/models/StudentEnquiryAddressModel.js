// models/Address.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const Address = sequelize.define('studentEnquiryAddress', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    studentEnquiryId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'studentEnquiries', // Make sure this matches the table name
            key: 'id'
        },
        onDelete: 'CASCADE', // Add cascade delete
        onUpdate: 'CASCADE'
    },
    addressType: {
        type: DataTypes.ENUM('Permanent', 'Present'),
        allowNull: false
    },
    street: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING },
    zipCode: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING, allowNull: false }
}, {
    timestamps: true,
    tableName: 'studentEnquiryAddresses' // Explicit table name
});

module.exports = Address;