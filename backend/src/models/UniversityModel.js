const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');


const University = sequelize.define('University', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4 // Automatically generate a UUID
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    country: {
        type: DataTypes.ENUM('Australia', 'United States', 'Canada', 'United Kingdom', 'Hungary', 'France', 'Saudi Arabia', 'Spain'),
        allowNull: false
    }
}, {
    tableName: 'universities',
    timestamps: true
});

module.exports = University;