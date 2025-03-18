const express = require("express");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const ORIGINS = process.env.ORIGIN || "http://localhost:5174";

const app = express();

app.use(cors({
    origin: [ORIGINS],
    credentials: true,
    methods: "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
}));

// Middleware
app.use(morgan("tiny")); // log request endpoints
app.use(cookieParser()); // cookie parser
app.use(compression());
app.use(express.json()); // body parser
app.use(express.urlencoded({ extended: false })); // URL parser

// Error handling
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send();
    next();
});

module.exports = app;
