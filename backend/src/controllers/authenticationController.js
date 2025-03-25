const { authentication, random } = require("../helpers");
const dotenv = require("dotenv");
const { createUser, getUserByEmail, getUserByEmailWithAuth } = require("../services/userService");

dotenv.config();

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME;
        const DOMAIN_NAME = process.env.DOMAIN_NAME;

        if (!email || !password) {
            res.status(400).json({ message: "Please fill out all the required fields" });
            return;
        }

        const user = await getUserByEmailWithAuth(email);
        if (!user) {
            res.status(404).json({ message: "User Not found" });
            return;
        }

        const expectedHash = authentication(user.salt, password);

        if (user.password !== expectedHash) {
            res.status(403).json({ message: "Wrong Password" });
            return;
        }

        const sessionToken = random();
        user.sessionToken = authentication(sessionToken, user.id.toString());
        await user.save();

        res.cookie(SESSION_COOKIE_NAME, user.sessionToken, {
            domain: DOMAIN_NAME,
            path: '/'
        });
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error." });
        return
    }
};

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;
        if (!firstName || !lastName || !email || !password || !role) {
            res.status(400).json({ message: "Please fill out all the required fields" });
            return;
        }

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            res.status(400).json({ message: "Email already exists" });
            return;
        }

        const salt = random();
        const user = await createUser({
            firstName,
            lastName,
            email,
            salt: salt,
            password: authentication(salt, password),
            role
        });

        res.status(200).json(user).end();

    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        return
    }
};

module.exports = {
    login,
    register
};