const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const PackageBooking = sequelize.define('PackageBooking', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    packageId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'packages',
            key: 'id'
        }
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
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'packagebookings',
    timestamps: true,
});

// Define associations (this should be in your model setup file)
// PackageBooking.belongsTo(Package, { foreignKey: 'packageId' });

module.exports = PackageBooking;