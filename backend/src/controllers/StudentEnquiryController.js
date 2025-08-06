const {
    createStudentEnquiry,
    deleteStudentEnquiryById,
    findStudentEnquiryById,
    getStudentEnquiries,
    updateStudentEnquiryById
} = require("../services/studentEnquiryService");

const { validationResult } = require('express-validator');

// Validation schema could be moved to a separate file
const validateEnquiryData = (data) => {
    const requiredFields = [
        'studentName', 'email', 'phone', 'address',
        'englishProficiencyTest', 'testResult',
        'academicQualification', 'que1', 'que2', 'que3'
    ];

    for (const field of requiredFields) {
        if (!data[field]) {
            return { isValid: false, message: `${field} is required` };
        }
    }

    if (!["IELTS", "PTE", "TOEFL", "Duolingo"].includes(data.englishProficiencyTest)) {
        return { isValid: false, message: "Invalid English Proficiency Test type" };
    }

    return { isValid: true };
};

const getAllStudentEnquiries = async (req, res) => {
    try {
        const studentEnquiries = await getStudentEnquiries();
        res.status(200).json({
            success: true,
            data: studentEnquiries
        });
    } catch (error) {
        console.error('Error fetching student enquiries:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error while fetching student enquiries"
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
            message: "Internal server error while fetching student enquiry"
        });
    }
};

const createNewStudentEnquiry = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const validation = validateEnquiryData(req.body);
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                message: validation.message
            });
        }

        const newStudentEnquiry = await createStudentEnquiry(req.body);

        res.status(201).json({
            success: true,
            data: newStudentEnquiry
        });
    } catch (error) {
        console.error('Error creating student enquiry:', error);
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

        const validation = validateEnquiryData(req.body);
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                message: validation.message
            });
        }

        const updatedEnquiry = await updateStudentEnquiryById(id, req.body);
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

        const deleted = await deleteStudentEnquiryById(id);
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Student enquiry not found"
            });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting student enquiry:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error while deleting student enquiry"
        });
    }
};

module.exports = {
    getAllStudentEnquiries,
    getStudentEnquiryById,
    createNewStudentEnquiry,
    updateStudentEnquiry,
    deleteStudentEnquiry,
    validateEnquiryData // Optional: export if needed elsewhere
};