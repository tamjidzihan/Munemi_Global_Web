const crypto = require("crypto");
const dotenv = require("dotenv");


dotenv.config();

const SECRET = process.env.AUTH_SECRET || "MUNEMI-GLOBAL";

const random = () => crypto.randomBytes(128).toString('base64');
const authentication = (salt, password) => {
    return crypto.createHmac(
        "sha256",
        [salt, password].join('/')
    ).update(SECRET).digest('hex');
};


// Helper function to parse JSON fields
const parseJSONField = (field) => {
    if (!field) return undefined;

    if (typeof field === 'string') {
        try {
            return JSON.parse(field);
        } catch (e) {
            console.warn('Failed to parse JSON field:', e.message);
            return undefined;
        }
    }

    return field;
};

module.exports = {
    parseJSONField,
    random,
    authentication
};


