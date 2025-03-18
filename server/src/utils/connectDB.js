const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

let isConnected = false;
const date = new Date();
const MONGO_URI = process.env.MONGO_URI;
const MONGO_OPTIONS = {};

const connectDB = async () => {
    if (isConnected) return;
    try {
        const db = await mongoose.connect(MONGO_URI, MONGO_OPTIONS);
        const connection = db.connection;

        isConnected = connection.readyState === 1;
        if (isConnected) console.log(`✅ MongoDB connected at ${date.toLocaleTimeString()}`);

        connection.on('connected', () => console.log('✅ MongoDB connected'));
        connection.on('disconnected', () => console.log('❌ MongoDB disconnected'));
        connection.on('error', (error) => console.log('❌ MongoDB connection error', error));
    } catch (error) {
        console.log('❌ MongoDB connection error:', error.message || error);
    }
};

module.exports = { connectDB };
