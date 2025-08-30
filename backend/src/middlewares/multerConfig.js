const multer = require('multer');

// Define storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.fieldname}-${file.originalname}`);
    }
});

// File type filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'image/jpeg',
        'image/png',
        'application/pdf'
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only .jpg, .png, and .pdf files are allowed!'), false);
    }
};

// Initialize Multer
const upload = multer({ storage, fileFilter });

module.exports = upload;
