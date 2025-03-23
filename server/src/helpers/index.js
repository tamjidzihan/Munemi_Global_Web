const crypto = require("crypto");
const dotenv = require("dotenv");
const fetch = require("node-fetch").default;

dotenv.config();

const SECRET = process.env.AUTH_SECRET || "MEGA-MART-ECOM";

const random = () => crypto.randomBytes(128).toString('base64');
const authentication = (salt, password) => {
    return crypto.createHmac(
        "sha256",
        [salt, password].join('/')
    ).update(SECRET).digest('hex');
};

module.exports = {
    random,
    authentication
};