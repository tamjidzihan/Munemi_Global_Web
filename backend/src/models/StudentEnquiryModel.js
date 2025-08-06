const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const StudentEnquiry = sequelize.define('StudentEnquiry', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    studentName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
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
        type: DataTypes.TEXT, // Store as string
        allowNull: false,
        get() {
            const value = this.getDataValue('testResult');
            return value ? JSON.parse(value) : null;
        },
        set(value) {
            this.setDataValue('testResult', JSON.stringify(value));
        }
    },
    academicQualification: {
        type: DataTypes.TEXT, // Store as string
        allowNull: false,
        get() {
            const value = this.getDataValue('academicQualification');
            return value ? JSON.parse(value) : null;
        },
        set(value) {
            this.setDataValue('academicQualification', JSON.stringify(value));
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
        type: DataTypes.TEXT, // Store as string
        allowNull: false,
        get() {
            const value = this.getDataValue('visaHistory');
            return value ? JSON.parse(value) : null;
        },
        set(value) {
            this.setDataValue('visaHistory', JSON.stringify(value));
        }
    }
}, {
    timestamps: true
});

module.exports = StudentEnquiry;