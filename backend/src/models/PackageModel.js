const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database'); // Adjust the path as necessary

const Package = sequelize.define('Package', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM("International", "Domestic"),
        allowNull: false
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numberOftraveller: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    termsAndConditions: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'packages',
    timestamps: true
});

module.exports = Package;