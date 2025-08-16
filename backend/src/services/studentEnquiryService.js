const StudentEnquiry = require("../models/StudentEnquiryModel");

const getStudentEnquiries = async (options = {}) => {
    const {
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'DESC',
        ...filters
    } = options;

    const offset = (page - 1) * limit;

    const { count, rows } = await StudentEnquiry.findAndCountAll({
        where: filters,
        order: [[sortBy, sortOrder]],
        limit: parseInt(limit),
        offset: offset
    });

    return {
        data: rows.map(enquiry => enquiry.toJSON()),
        total: count,
        page: parseInt(page),
        limit: parseInt(limit)
    };
};

const findStudentEnquiryById = async (id) => {
    const enquiry = await StudentEnquiry.findByPk(id);
    if (!enquiry) return null;

    return enquiry.toJSON();
};

const createStudentEnquiry = async (values) => {
    // Process JSON fields if they're strings
    const processedValues = processJsonFields(values);
    const enquiry = await StudentEnquiry.create(processedValues);
    return enquiry.toJSON();
};

const updateStudentEnquiryById = async (id, values) => {
    // Process JSON fields if they're strings
    const processedValues = processJsonFields(values);

    const enquiry = await StudentEnquiry.findByPk(id);
    if (!enquiry) return null;

    await enquiry.update(processedValues);
    return enquiry.toJSON();
};

const deleteStudentEnquiryById = async (id) => {
    const result = await StudentEnquiry.destroy({ where: { id } });
    return result > 0;
};

// Helper function to process JSON fields
const processJsonFields = (values) => {
    const jsonFields = [
        'interestedServices', 'educationBackground',
        'englishTestScores', 'documents',
        'emergencyContact', 'passportDetails',
        'visaRefusalDetails'
    ];

    const processed = { ...values };

    jsonFields.forEach(field => {
        if (processed[field] && typeof processed[field] === 'string') {
            try {
                processed[field] = JSON.parse(processed[field]);
            } catch (e) {
                // If parsing fails, keep the original value
                console.error(`Failed to parse ${field} field`);
            }
        }
    });

    return processed;
};

module.exports = {
    getStudentEnquiries,
    findStudentEnquiryById,
    createStudentEnquiry,
    updateStudentEnquiryById,
    deleteStudentEnquiryById
};