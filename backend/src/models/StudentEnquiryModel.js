const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const StudentEnquiry = sequelize.define('studentEnquiry', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },

    // --- Reference Agent model instead ---
    agentId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'agents',
            key: 'id'
        },
        validate: {
            async isValidAgent(value) {
                const agent = await sequelize.models.Agent.findByPk(value);
                if (!agent || !agent.isActive) {
                    throw new Error('Only active agents can create student enquiries');
                }
            }
        }
    },

    // --- Personal Details ---
    givenName: { type: DataTypes.STRING, allowNull: false },
    surName: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.ENUM('Male', 'Female') },
    currentOccupation: { type: DataTypes.STRING, allowNull: false },
    dateOfBirth: { type: DataTypes.DATEONLY },
    nidNumber: { type: DataTypes.STRING, allowNull: false },

    // --- Contact Details ---
    phone: { type: DataTypes.STRING, allowNull: false },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true }
    },

    // --- family Details ---
    fathersName: { type: DataTypes.STRING, allowNull: false },
    fathersNid: { type: DataTypes.STRING, allowNull: false },
    fathersPhone: { type: DataTypes.STRING },
    mothersName: { type: DataTypes.STRING, allowNull: false },
    mothersNid: { type: DataTypes.STRING, allowNull: false },
    mothersPhone: { type: DataTypes.STRING },
    spouseName: { type: DataTypes.STRING },
    spouseNid: { type: DataTypes.STRING },
    spousePhone: { type: DataTypes.STRING },
    numberOfChildren: { type: DataTypes.STRING },
    numberOfBrother: { type: DataTypes.STRING },
    numberOfSister: { type: DataTypes.STRING },


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
    passportDocument: {
        type: DataTypes.TEXT,
        allowNull: false,
        get() {
            const value = this.getDataValue('passportDocument');
            return value ? JSON.parse(value) : {};
        },
        set(value) {
            this.setDataValue('passportDocument', JSON.stringify(value));
        }
    },
    cvDocument: {
        type: DataTypes.TEXT,
        allowNull: false,
        get() {
            const value = this.getDataValue('cvDocument');
            return value ? JSON.parse(value) : {};
        },
        set(value) {
            this.setDataValue('cvDocument', JSON.stringify(value));
        }
    },

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
    hasPreviousPassport: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    previousPassportNumbers: {
        type: DataTypes.TEXT,
        get() {
            const value = this.getDataValue('previousPassportNumbers');
            return value ? JSON.parse(value) : [];
        },
        set(value) {
            this.setDataValue('previousPassportNumbers', JSON.stringify(value));
        }
    },
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

    // --- Travel History ---
    travelHistory: {
        type: DataTypes.TEXT,
        get() {
            const value = this.getDataValue('travelHistory')
            return value ? JSON.parse(value) : []
        },
        set(value) {
            this.setDataValue('travelHistory', JSON.stringify(value))
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
    timestamps: true,
    tableName: 'studentEnquiries'
});


module.exports = StudentEnquiry;
