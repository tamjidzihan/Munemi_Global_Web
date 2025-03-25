const { merge, get } = require("lodash");
const { getUserBySessionToken } = require("../services/userService");
const dotenv = require("dotenv");

dotenv.config();

const isAuthenticated = async (req, res, next) => {
    try {
        const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME;

        const sessionToken = req.cookies[SESSION_COOKIE_NAME];
        if (!sessionToken) {
            res.status(403).json({ message: "Bad Request" });
            return;
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) {
            res.status(403).json({ message: "No credentials" });
            return;
        }
        merge(req, { identity: existingUser });

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

const isOwner = async (req, res, next) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, "identity._id");

        if (!currentUserId) {
            res.sendStatus(403);
            return;
        }

        if (currentUserId.toString() !== id) {
            res.sendStatus(403);
            return;
        }

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const currentUserRole = get(req, "identity.role");

        if (currentUserRole <= 1) {
            res.status(403).json({ message: "Permission Denied" });
            return;
        }

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

module.exports = {
    isAuthenticated,
    isOwner,
    isAdmin,
};