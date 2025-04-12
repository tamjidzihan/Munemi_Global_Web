// models/InstitutionPartner.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const InstitutionPartner = sequelize.define('InstitutionPartner', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    fullNameOfInstitute: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.ENUM('University', 'Institute', 'Professional Year Provider', 'RPL Provider'),
        allowNull: false
    },
    coursesProviding: {
        type: DataTypes.STRING, // Changed to STRING for MariaDB compatibility
        allowNull: false,
        validate: {
            isValidCourses(value) {
                const validCourses = [
                    'English Courses', 'Certificate III', 'Pathway Program', 'RPL Course',
                    'Year 12', 'Certificate IV', 'Bachelor\'s Degree', 'Others',
                    'International Year One', 'Diploma', 'Master\'s Degree', 'Foundation',
                    'Advance Diploma', 'Post Graduate Diploma'
                ];

                const coursesArray = value.split(',');
                if (!coursesArray.every(course => validCourses.includes(course.trim()))) {
                    throw new Error('Invalid course type provided');
                }
            }
        }
    },
    otherCourses: {
        type: DataTypes.STRING,
        allowNull: true
    },
    businessRegistrationNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    countryLocated: {
        type: DataTypes.STRING,
        allowNull: false
    },
    campusLocations: {
        type: DataTypes.STRING,
        allowNull: false
    },
    primaryEmailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true }
    },
    website: {
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
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'institution_partners',
    timestamps: true
});

module.exports = InstitutionPartner;