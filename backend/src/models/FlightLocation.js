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
        allowNull: false,
        field: 'city_name' // Optional: specify the database column name
    },
    airportCode: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'airport_code' // Optional: specify the database column name
    },
    airportName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'airport_name' // Optional: specify the database column name
    },
    countryName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'country_name' // Optional: specify the database column name
    },
    countryAbbrev: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'country_abbrev' // Optional: specify the database column name
    },
    worldAreaCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'world_area_code' // Optional: specify the database column name
    }
}, {
    tableName: 'flight_location',
    timestamps: true
});

module.exports = FlightLocation;