// models/BookingModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tripType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true, // Optional for one-way trips
    },
    travelers: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'bookings',
    timestamps: true,
});

module.exports = Booking;