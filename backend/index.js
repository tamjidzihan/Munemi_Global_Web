const express = require("express");
const dotenv = require("dotenv");
const app = require("./src/utils/app");
const { connectDB } = require("./src/utils/database");
const router = require("./src/router");

dotenv.config();
const PORT = 3000;

// Routes
app.get("/", (req, res) => {
    res.status(200).json({
        "message": "Welcome to MUNEMI GLOBAL API"
    });
});

app.use('/uploads', express.static('src/uploads'));
app.use('/', router());

// Connecting Database 
connectDB();

// Initializing Server
app.listen(PORT, () => {
    console.log(`✅ Server is listening on http://localhost:${PORT}`);
});
