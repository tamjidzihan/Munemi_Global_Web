const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const StudentEnquiry = sequelize.define('StudentEnquiry', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },

    // --- Personal Details ---
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    dateOfBirth: { type: DataTypes.DATEONLY },

    // --- Contact Details ---
    phone: { type: DataTypes.STRING, allowNull: false },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true }
    },

    // --- Address ---
    street: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    state: { type: DataTypes.STRING },
    zipCode: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING },

    // --- Visa Information ---
    visaType: { type: DataTypes.STRING },
    visaExpiryDate: { type: DataTypes.DATEONLY },
    passportCountry: { type: DataTypes.STRING },

    // --- Other Details ---
    preferredIntake: { type: DataTypes.STRING },

    // --- Interested Services (array as JSON) ---
    interestedServices: {
        type: DataTypes.TEXT,
        get() {
            const value = this.getDataValue('interestedServices');
            return value ? JSON.parse(value) : [];
        },
        set(value) {
            this.setDataValue('interestedServices', JSON.stringify(value));
        }
    },

    // --- Education Background (array of objects) ---
    educationBackground: {
        type: DataTypes.TEXT,
        get() {
            const value = this.getDataValue('educationBackground');
            return value ? JSON.parse(value) : [];
        },
        set(value) {
            this.setDataValue('educationBackground', JSON.stringify(value));
        }
    },

    // --- English Test Scores (store as JSON) ---
    englishTestScores: {
        type: DataTypes.TEXT,
        get() {
            const value = this.getDataValue('englishTestScores');
            return value ? JSON.parse(value) : {};
        },
        set(value) {
            this.setDataValue('englishTestScores', JSON.stringify(value));
        }
    },

    // --- File Uploads ---
    documents: {
        type: DataTypes.TEXT,
        get() {
            const value = this.getDataValue('documents');
            return value ? JSON.parse(value) : [];
        },
        set(value) {
            this.setDataValue('documents', JSON.stringify(value));
        }
    },

    // --- Comments ---
    comments: { type: DataTypes.TEXT },

    // --- Emergency Contact ---
    emergencyContact: {
        type: DataTypes.TEXT,
        get() {
            const value = this.getDataValue('emergencyContact');
            return value ? JSON.parse(value) : {};
        },
        set(value) {
            this.setDataValue('emergencyContact', JSON.stringify(value));
        }
    },

    // --- Passport Details ---
    passportDetails: {
        type: DataTypes.TEXT,
        get() {
            const value = this.getDataValue('passportDetails');
            return value ? JSON.parse(value) : {};
        },
        set(value) {
            this.setDataValue('passportDetails', JSON.stringify(value));
        }
    },

    // --- Visa Refusal Details ---
    visaRefusalDetails: {
        type: DataTypes.TEXT,
        get() {
            const value = this.getDataValue('visaRefusalDetails');
            return value ? JSON.parse(value) : {};
        },
        set(value) {
            this.setDataValue('visaRefusalDetails', JSON.stringify(value));
        }
    }

}, {
    timestamps: true
});

module.exports = StudentEnquiry;
