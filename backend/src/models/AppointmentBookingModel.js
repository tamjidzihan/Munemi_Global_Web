const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database'); // Adjust the path as necessary

const AppointmentBooking = sequelize.define('AppointmentBooking', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4 // Automatically generate a UUID
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    appointmentOffice: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['Bangladesh']]
        }
    },
    message: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'appointmentbookings',
    timestamps: true
});

// Export the AppointmentBooking model
module.exports = AppointmentBooking;