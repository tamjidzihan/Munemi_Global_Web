import express from "express";
import { authentication, random } from "../helpers";
import * as dotenv from "dotenv";
import { createUser, getUserByEmail } from "../services/userService";

dotenv.config()

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body
        const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME
        const DOMAIN_NAME = process.env.DOMAIN_NAME

        if (!email || !password) {
            res.status(400).json({ message: "Please fill out all the required fields" });
            return
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password')
        if (!user) {
            res.status(404).json({ message: "User Not found" });
            return
        }

        const expectedHash = authentication(user.authentication.salt, password)
        if (user.authentication.password !== expectedHash) {
            res.status(403).json({ message: "Wrong Password" });
            return
        }

        const salt = random()
        user.authentication.sessionToken = authentication(salt, user._id.toString())
        await user.save()

        res.cookie(SESSION_COOKIE_NAME, user.authentication.sessionToken, {
            domain: DOMAIN_NAME,
            path: '/'
        })
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error." });
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { firstName, lastName, email, password, role } = req.body
        if (!firstName || !lastName || !email || !password || !role) {
            res.status(400).json({ message: "Please fill out all the required fields" });
            return
        }
        const existingUser = await getUserByEmail(email)

        if (existingUser) {
            res.status(400).json({ message: "Email already exists" });
            return
        }

        const salt = random();
        const user = await createUser({
            firstName,
            lastName,
            email,
            authentication: {
                salt,
                password: authentication(salt, password)
            },
            role
        });

        res.status(200).json(user).end()

    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }
}
