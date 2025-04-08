const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

const Career = sequelize.define('Career', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
    currentAddress: { type: DataTypes.STRING, allowNull: false },
    idCard: { type: DataTypes.STRING, allowNull: true },
    resume: { type: DataTypes.STRING, allowNull: true },
    jobType: {
        type: DataTypes.ENUM('Full Time', 'Part Time', 'Casual', 'Internship'),
        allowNull: false
    }
}, {
    tableName: 'careers',
    timestamps: true
});

module.exports = Career;