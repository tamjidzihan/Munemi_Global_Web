const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database'); // Adjust the path as necessary

const Image = sequelize.define('Image', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    packageId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'packages', // References the 'packages' table
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}, {
    tableName: 'images',
    timestamps: true
});

module.exports = Image;