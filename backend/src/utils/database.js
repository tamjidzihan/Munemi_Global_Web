const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    "munemi_global",
    "admin",
    "admin1234",
    {
        host: "localhost",
        dialect: 'mysql',
        logging: false
    }
);


const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ MySQL connected successfully');
    } catch (error) {
        console.error('❌ MySQL connection error:', error);
    }
};

module.exports = { sequelize, connectDB };