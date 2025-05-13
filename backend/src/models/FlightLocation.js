const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const FlightLocation = sequelize.define('FlightLocation', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    cityName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'city_name'
    },
    airportCode: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'airport_code'
    },
    airportName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'airport_name'
    }
}, {
    tableName: 'flight_location',
    timestamps: true
});

module.exports = FlightLocation;