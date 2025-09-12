const fs = require('fs').promises;

const {
    createStudentEnquiry,
    deleteStudentEnquiryById,
    findStudentEnquiryById,
    getStudentEnquiries,
    updateStudentEnquiryById,
} = require("../services/studentEnquiryService");

const { validationResult } = require('express-validator');

// validation schema to match new model
const validateEnquiryData = (data, files, isUpdate = false) => {
    const requiredFields = [
        'givenName', 'surName', 'phone', 'email', 'nidNumber', 'agentId',
        'fathersName', 'fathersNid', 'mothersName', 'mothersNid',
        'currentOccupation'
    ];

    if (!isUpdate) {
        // Validate required text fields
        for (const field of requiredFields) {
            if (!data[field]) {
                return { isValid: false, message: `${field} is required` };
            }
        }

        // Validate required documents for new enquiries
        if (!files?.passport || !files.passport[0]) {
            return { isValid: false, message: "Passport document is required" };
        }
        if (!files?.cv || !files.cv[0]) {
            return { isValid: false, message: "CV document is required" };
        }
    } else {
        // On update, only validate provided fields
        for (const field of requiredFields) {
            if (data[field] !== undefined && !data[field]) {
                return { isValid: false, message: `${field} cannot be empty` };
            }
        }
    }

    if (!data.agentId) {
        cleanupUploadedFiles(req);
        return res.status(400).json({
            success: false,
            message: "Agent ID is required"
        });
    }

    // Validate email format if provided
    if (data.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return { isValid: false, message: "Invalid email format" };
        }
    }

    // Validate JSON fields
    const jsonFields = [
        'interestedServices', 'educationBackground',
        'englishTestScores', 'emergencyContact',
        'passportDetails', 'visaRefusalDetails',
        'previousPassportNumbers', 'travelHistory',
    ];

    for (const field of jsonFields) {
        if (data[field]) {
            try {
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
        const { page = 1, limit = 10000, sortBy = 'createdAt', sortOrder = 'DESC' } = req.query;
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
                total: studentEnquiries.total,
                totalPages: studentEnquiries.totalPages
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
            cleanupUploadedFiles(req);
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const validation = validateEnquiryData(req.body, req.files);
        if (!validation.isValid) {
            cleanupUploadedFiles(req);
            return res.status(400).json({
                success: false,
                message: validation.message
            });
        }

        // Process file uploads for passport and CV
        let passportDocument = null;
        let cvDocument = null;

        if (req.files) {
            // Handle passport document
            if (req.files.passport && req.files.passport[0]) {
                const file = req.files.passport[0];
                passportDocument = {
                    filename: file.filename,
                    originalname: file.originalname,
                    path: file.path,
                    mimetype: file.mimetype,
                    size: file.size,
                    uploadDate: new Date().toISOString()
                };
            }

            // Handle CV document
            if (req.files.cv && req.files.cv[0]) {
                const file = req.files.cv[0];
                cvDocument = {
                    filename: file.filename,
                    originalname: file.originalname,
                    path: file.path,
                    mimetype: file.mimetype,
                    size: file.size,
                    uploadDate: new Date().toISOString()
                };
            }
        }

        // Validate that both documents are provided
        if (!passportDocument) {
            await cleanupUploadedFiles(req);
            return res.status(400).json({
                success: false,
                message: "Passport document is required"
            });
        }

        if (!cvDocument) {
            await cleanupUploadedFiles(req);
            return res.status(400).json({
                success: false,
                message: "CV document is required"
            });
        }

        // Process enquiry data with the new document structure
        const enquiryData = {
            ...req.body,
            passportDocument,
            cvDocument,
            dateOfBirth: req.body.dateOfBirth ? new Date(req.body.dateOfBirth) : null,
            visaExpiryDate: req.body.visaExpiryDate ? new Date(req.body.visaExpiryDate) : null
        };

        const newStudentEnquiry = await createStudentEnquiry(enquiryData, req.body.agentId);

        res.status(201).json({
            success: true,
            data: newStudentEnquiry
        });
    } catch (error) {
        // Clean up uploaded files if error occurs
        cleanupUploadedFiles(req);

        res.status(500).json({
            success: false,
            message: error.message
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
            cleanupUploadedFiles(req);
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        // Use isUpdate flag for validation
        const validation = validateEnquiryData(req.body, true);
        if (!validation.isValid) {
            cleanupUploadedFiles(req);
            return res.status(400).json({
                success: false,
                message: validation.message
            });
        }

        // Get existing enquiry to preserve existing documents if not updating
        const existingEnquiry = await findStudentEnquiryById(id);
        if (!existingEnquiry) {
            cleanupUploadedFiles(req);
            return res.status(404).json({
                success: false,
                message: "Student enquiry not found"
            });
        }

        // Process file uploads for passport and CV
        let passportDocument = existingEnquiry.passportDocument;
        let cvDocument = existingEnquiry.cvDocument;

        if (req.files) {
            // Handle passport document update
            if (req.files.passport && req.files.passport[0]) {
                // Delete old passport file if exists
                if (passportDocument && passportDocument.path) {
                    try {
                        await fs.unlink(passportDocument.path);
                    } catch (err) {
                        console.warn('Could not delete old passport file:', err.message);
                    }
                }

                const file = req.files.passport[0];
                passportDocument = {
                    filename: file.filename,
                    originalname: file.originalname,
                    path: file.path,
                    mimetype: file.mimetype,
                    size: file.size,
                    uploadDate: new Date().toISOString()
                };
            }

            // Handle CV document update
            if (req.files.cv && req.files.cv[0]) {
                // Delete old CV file if exists
                if (cvDocument && cvDocument.path) {
                    try {
                        await fs.unlink(cvDocument.path);
                    } catch (err) {
                        console.warn('Could not delete old CV file:', err.message);
                    }
                }

                const file = req.files.cv[0];
                cvDocument = {
                    filename: file.filename,
                    originalname: file.originalname,
                    path: file.path,
                    mimetype: file.mimetype,
                    size: file.size,
                    uploadDate: new Date().toISOString()
                };
            }
        }

        // Process enquiry data with the new document structure
        const updateData = {
            ...req.body,
            passportDocument,
            cvDocument,
            dateOfBirth: req.body.dateOfBirth ? new Date(req.body.dateOfBirth) : null,
            visaExpiryDate: req.body.visaExpiryDate ? new Date(req.body.visaExpiryDate) : null
        };

        // Get agent ID for authorization
        const agentId = req.user?.id;

        const updatedEnquiry = await updateStudentEnquiryById(id, updateData, agentId);
        if (!updatedEnquiry) {
            cleanupUploadedFiles(req);
            return res.status(404).json({
                success: false,
                message: "Student enquiry not found or unauthorized"
            });
        }

        res.status(200).json({
            success: true,
            data: updatedEnquiry
        });
    } catch (error) {
        console.error('Error updating student enquiry:', error);
        // Clean up uploaded files if error occurs
        cleanupUploadedFiles(req);
        res.status(500).json({
            success: false,
            message: error.message
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
        if (enquiry.passportDocument && enquiry.passportDocument.path) {
            try {
                await fs.unlink(enquiry.passportDocument.path);
            } catch (err) {
                console.warn('Could not delete passport file:', err.message);
            }
        }

        if (enquiry.cvDocument && enquiry.cvDocument.path) {
            try {
                await fs.unlink(enquiry.cvDocument.path);
            } catch (err) {
                console.warn('Could not delete CV file:', err.message);
            }
        }

        // Get agent ID for authorization
        const agentId = req.user?.id;

        const deleted = await deleteStudentEnquiryById(id, agentId);
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Student enquiry not found or unauthorized"
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
            message: error.message
        });
    }
};

// Helper function to clean up uploaded files
const cleanupUploadedFiles = async (req) => {
    if (req.files) {
        for (const fileArray of Object.values(req.files)) {
            if (Array.isArray(fileArray)) {
                for (const file of fileArray) {
                    try {
                        await fs.unlink(file.path);
                    } catch (err) {
                        console.warn('Could not delete uploaded file:', err.message);
                    }
                }
            }
        }
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