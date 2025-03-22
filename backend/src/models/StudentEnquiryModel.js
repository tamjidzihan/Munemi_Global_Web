const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const StudentEnquiry = sequelize.define('StudentEnquiry', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4 // Automatically generate a UUID
    },
    studentName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    englishProficiencyTest: {
        type: DataTypes.ENUM("IELTS", "PTE", "TOEFL", "Duolingo"),
        allowNull: false
    },
    testResult: {
        type: DataTypes.JSON, // Store test results as a JSON object
        allowNull: false,
        get() {
            const value = this.getDataValue('testResult');
            return typeof value === 'string' ? JSON.parse(value) : value;
        }
    },
    academicQualification: {
        type: DataTypes.JSON, // Store academic qualifications as a JSON array
        allowNull: false,
        get() {
            const value = this.getDataValue('academicQualification');
            return typeof value === 'string' ? JSON.parse(value) : value;
        }
    },
    que1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    que2: {
        type: DataTypes.STRING,
        allowNull: false
    },
    que3: {
        type: DataTypes.STRING,
        allowNull: false
    },
    visaHistory: {
        type: DataTypes.JSON, // Store visa history as a JSON object
        allowNull: false,
        get() {
            const value = this.getDataValue('visaHistory');
            return typeof value === 'string' ? JSON.parse(value) : value;
        }
    }
}, {
    timestamps: true
});

// Export the StudentEnquiry model
module.exports = StudentEnquiry;