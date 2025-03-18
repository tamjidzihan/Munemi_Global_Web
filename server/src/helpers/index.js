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

const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;

/**
 * Deletes an image from Cloudinary.
 * @param {string} publicId - The public ID of the image in Cloudinary.
 * @returns {Promise<boolean>} - Returns true if the image was deleted successfully.
 */
const deleteImageFromCloudinary = async (publicId) => {
    try {
        const timestamp = Math.floor(Date.now() / 1000);
        const signature = crypto
            .createHash('sha1')
            .update(`public_id=${publicId}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`)
            .digest('hex');

        const formData = new URLSearchParams();
        formData.append('public_id', publicId);
        formData.append('api_key', CLOUDINARY_API_KEY);
        formData.append('timestamp', timestamp.toString());
        formData.append('signature', signature);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/destroy`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData.toString(),
            }
        );

        const data = await response.json();
        return response.ok && data.result === 'ok';
    } catch (error) {
        console.error('Cloudinary deletion error:', error);
        return false;
    }
};

module.exports = {
    random,
    authentication,
    deleteImageFromCloudinary
};