import { Request, Response } from "express";
import * as dotenv from "dotenv";
import app from "./utils/app";
import { connectDB } from "./utils/connectDB";
import router from "./router";

dotenv.config();
const PORT = process.env.PORT || 3000;

// Routes
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        "message": "Welcome to MUNEMI GLOBAL API"
    });
});
app.use('/', router())


// Connecting DataBase 
connectDB()

// Initializing Server
app.listen(PORT, () => {
    console.log(`✅ Server is listening on http://localhost:${PORT}`);
});