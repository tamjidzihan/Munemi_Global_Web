const express = require("express");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const ORIGINS1 = process.env.ORIGINS1;
const ORIGINS2 = process.env.ORIGINS2;

const app = express();

app.use(cors({
    origin: [ORIGINS1, ORIGINS2],
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