import mongoose, { Connection, ConnectOptions, Error } from "mongoose"
import dotenv from "dotenv";

dotenv.config();

let isConnected = false;
const date = new Date
const MONGO_URI = process.env.MONGO_URI;
const MONGO_OPTIONS: ConnectOptions = {};

export const connectDB = async () => {
    if (isConnected) return;
    try {
        const db = await mongoose.connect(MONGO_URI, MONGO_OPTIONS);
        const connection: Connection = db.connection;

        isConnected = connection.readyState === 1;
        if (isConnected) console.log(`✅ MongoDB connected at ${date.toLocaleTimeString()}`);

        connection.on('connected', () => console.log('✅ MongoDB connected'))
        connection.on('disconnected', () => console.log('❌ MongoDB disconnected'))
        connection.on('error', (error: Error) => console.log('❌ MongoDB connection error', error))
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log('❌ MongoDB connection error:', error.message);
        } else {
            console.log('❌ Unknown MongoDB connection error',);
        }
    }
}