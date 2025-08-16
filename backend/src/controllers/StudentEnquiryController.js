const fs = require('fs').promises;
const path = require('path');
const uploadDir = path.join(__dirname, '../uploads/');


const {
    createStudentEnquiry,
    deleteStudentEnquiryById,
    findStudentEnquiryById,
    getStudentEnquiries,
    updateStudentEnquiryById
} = require("../services/studentEnquiryService");

const { validationResult } = require('express-validator');

// Updated validation schema to match new model
const validateEnquiryData = (data, isUpdate = false) => {
    const requiredFields = [
        'firstName', 'lastName', 'phone', 'email',
        'country', 'educationBackground'
    ];

    // For updates, only validate fields that are being updated
    if (!isUpdate) {
        for (const field of requiredFields) {
            if (!data[field]) {
                return { isValid: false, message: `${field} is required` };
            }
        }
    } else {
        for (const field of requiredFields) {
            if (data[field] !== undefined && !data[field]) {
                return { isValid: false, message: `${field} cannot be empty` };
            }
        }
    }

    // Validate email format if email is provided
    if (data.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return { isValid: false, message: "Invalid email format" };
        }
    }

    // Validate JSON fields
    const jsonFields = [
        'interestedServices', 'educationBackground',
        'englishTestScores', 'documents',
        'emergencyContact', 'passportDetails',
        'visaRefusalDetails'
    ];

    for (const field of jsonFields) {
        if (data[field]) {
            try {
                // If it's already an object (from file upload middleware), skip parsing
                if (typeof data[field] !== 'object') {
                    JSON.parse(data[field]);
                }
            } catch (e) {
                return { isValid: false, message: `${field} must be valid JSON` };
            }
        }
    }

    return { isValid: true };
};

const getAllStudentEnquiries = async (req, res) => {
    try {
        const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'DESC' } = req.query;
        const studentEnquiries = await getStudentEnquiries({
            page: parseInt(page),
            limit: parseInt(limit),
            sortBy,
            sortOrder
        });

        res.status(200).json({
            success: true,
            data: studentEnquiries.data,
            pagination: {
                page: studentEnquiries.page,
                limit: studentEnquiries.limit,
                total: studentEnquiries.total
            }
        });
    } catch (error) {
        console.error('Error fetching student enquiries:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error while fetching student enquiries",
            error: error.message
        });
    }
};

const getStudentEnquiryById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "ID parameter is required"
            });
        }

        const studentEnquiry = await findStudentEnquiryById(id);
        if (!studentEnquiry) {
            return res.status(404).json({
                success: false,
                message: "Student enquiry not found"
            });
        }

        res.status(200).json({
            success: true,
            data: studentEnquiry
        });
    } catch (error) {
        console.error('Error fetching student enquiry:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error while fetching student enquiry",
            error: error.message
        });
    }
};

const createNewStudentEnquiry = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Clean up uploaded files if validation fails
            if (req.files && req.files.length > 0) {
                req.files.forEach(file => {
                    fs.unlinkSync(file.path); // Delete the uploaded files
                });
            }
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const validation = validateEnquiryData(req.body);
        if (!validation.isValid) {
            // Clean up uploaded files if validation fails
            if (req.files && req.files.length > 0) {
                req.files.forEach(file => {
                    fs.unlinkSync(file.path); // Delete the uploaded files
                });
            }
            return res.status(400).json({
                success: false,
                message: validation.message
            });
        }

        // Process file uploads
        let documents = [];
        if (req.files && req.files.length > 0) {
            documents = req.files.map(file => ({
                filename: file.filename, // The stored filename
                originalname: file.originalname, // Original filename
                path: file.path, // Path where file is stored
                mimetype: file.mimetype, // File type
                size: file.size // File size in bytes
            }));
        }

        // Process JSON fields and include documents
        const enquiryData = {
            ...req.body,
            documents, // Add the documents array
            dateOfBirth: req.body.dateOfBirth ? new Date(req.body.dateOfBirth) : null,
            visaExpiryDate: req.body.visaExpiryDate ? new Date(req.body.visaExpiryDate) : null
        };

        const newStudentEnquiry = await createStudentEnquiry(enquiryData);

        res.status(201).json({
            success: true,
            data: newStudentEnquiry
        });
    } catch (error) {
        console.error('Error creating student enquiry:', error);

        // Clean up uploaded files if error occurs
        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                fs.unlinkSync(file.path); // Delete the uploaded files
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal server error while creating student enquiry",
            error: error.message
        });
    }
};


const updateStudentEnquiry = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "ID parameter is required"
            });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        // Use isUpdate flag for validation
        const validation = validateEnquiryData(req.body, true);
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                message: validation.message
            });
        }

        // Process JSON fields and dates
        const updateData = {
            ...req.body,
            dateOfBirth: req.body.dateOfBirth ? new Date(req.body.dateOfBirth) : null,
            visaExpiryDate: req.body.visaExpiryDate ? new Date(req.body.visaExpiryDate) : null
        };

        // Handle file uploads if any
        if (req.files && req.files.length > 0) {
            const newDocuments = req.files.map(file => ({
                filename: file.filename,
                originalname: file.originalname,
                path: file.path,
                mimetype: file.mimetype,
                size: file.size
            }));

            // Get existing documents and merge with new ones
            const existingEnquiry = await findStudentEnquiryById(id);
            const existingDocuments = existingEnquiry.documents || [];
            updateData.documents = [...existingDocuments, ...newDocuments];
        }

        const updatedEnquiry = await updateStudentEnquiryById(id, updateData);
        if (!updatedEnquiry) {
            return res.status(404).json({
                success: false,
                message: "Student enquiry not found"
            });
        }

        res.status(200).json({
            success: true,
            data: updatedEnquiry
        });
    } catch (error) {
        console.error('Error updating student enquiry:', error);
        // Clean up uploaded files if error occurs
        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                fs.unlinkSync(file.path);
            });
        }
        res.status(500).json({
            success: false,
            message: "Internal server error while updating student enquiry",
            error: error.message
        });
    }
};

const deleteStudentEnquiry = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "ID parameter is required"
            });
        }

        // First get the enquiry to delete associated files
        const enquiry = await findStudentEnquiryById(id);
        if (!enquiry) {
            return res.status(404).json({
                success: false,
                message: "Student enquiry not found"
            });
        }

        // Delete associated files
        if (enquiry.documents && enquiry.documents.length > 0) {
            for (const doc of enquiry.documents) {
                const filePath = doc.path
                    ? path.resolve(doc.path)
                    : path.join(__dirname, "../src/uploads", doc.filename);

                try {
                    await fs.access(filePath); // check if file exists
                    await fs.unlink(filePath); // delete it
                } catch (err) {
                    console.warn(`File not found or cannot delete: ${filePath}`);
                }
            }
        }

        const deleted = await deleteStudentEnquiryById(id);
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Student enquiry not found"
            });
        }

        res.status(200).json({
            success: true,
            message: 'Student Enquiry deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting student enquiry:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error while deleting student enquiry",
            error: error.message
        });
    }
};

module.exports = {
    getAllStudentEnquiries,
    getStudentEnquiryById,
    createNewStudentEnquiry,
    updateStudentEnquiry,
    deleteStudentEnquiry,
    validateEnquiryData
};