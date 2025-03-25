const express = require("express");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const ORIGINS = process.env.ORIGINS;

const app = express();

app.use(cors({
    origin: [ORIGINS],
    credentials: true,
    methods: "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
}));

// Middleware
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Error handling
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send();
    next();
});

module.exports = app;