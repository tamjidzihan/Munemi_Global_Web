const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const AgentApplication = sequelize.define('AgentApplication', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    tradingName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    businessRegistrationNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    companyPhone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true }
    },
    applyingAs: {
        type: DataTypes.ENUM('Sub-Agent', 'Super-Agent'),
        allowNull: false
    },
    primaryOfficeLocation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    currentAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    website: {
        type: DataTypes.STRING,
        allowNull: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    personalPhone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    personalEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'agents_applications',
    timestamps: true
});

module.exports = AgentApplication;