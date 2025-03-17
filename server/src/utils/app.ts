import express, { Application, Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import * as dotenv from "dotenv";


dotenv.config();

const ORIGINS = process.env.ORIGIN || "http://localhost:5173";

const app: Application = express();

app.use(cors({
    origin: [ORIGINS],
    credentials: true,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
}));

// Middleware
app.use(morgan("tiny")); // log rquest enpoints
app.use(cookieParser());//cookie parser
app.use(compression());
app.use(express.json());// body parser
app.use(express.urlencoded({ extended: false })) // url parser


// error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err)
    res.status(500).send()
    next()
})


export default app