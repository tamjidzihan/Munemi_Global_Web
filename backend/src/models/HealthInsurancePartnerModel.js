// models/HealthInsurancePartner.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const HealthInsurancePartner = sequelize.define('HealthInsurancePartner', {
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
    officePhoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    countryLocated: {
        type: DataTypes.STRING,
        allowNull: false
    },
    primaryOfficeLocation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    website: {
        type: DataTypes.STRING,
        allowNull: true
    },
    applyingAs: {
        type: DataTypes.ENUM('Singles', 'Single Couples', 'Overseas Visitors', 'Overseas Student', 'Other'),
        allowNull: false
    },
    otherInsuranceType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contactEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true }
    },
    contactCountryCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contactPhoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'health_insurance_partners',
    timestamps: true,
    validate: {
        checkOtherInsuranceType() {
            if (this.applyingAs === 'Other' && !this.otherInsuranceType) {
                throw new Error('Other insurance type is required when selecting "Other"');
            }
        }
    }
});

module.exports = HealthInsurancePartner;