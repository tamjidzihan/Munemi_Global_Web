const StudentEnquiry = require("../models/StudentEnquiryModel");

const getStudentEnquiries = async () => {
    const enquiries = await StudentEnquiry.findAll();
    return enquiries.map(enquiry => enquiry.toJSON());
};

const findStudentEnquiryById = async (id) => {
    const enquiry = await StudentEnquiry.findByPk(id);
    return enquiry ? enquiry.toJSON() : null;
};

const createStudentEnquiry = async (values) => {
    const enquiry = await StudentEnquiry.create(values);
    return enquiry.toJSON();
};

const updateStudentEnquiryById = async (id, values) => {
    const [rowsUpdated, [updatedEnquiry]] = await StudentEnquiry.update(values, {
        where: { id },
        returning: true
    });
    return updatedEnquiry ? updatedEnquiry.toJSON() : null;
};

const deleteStudentEnquiryById = async (id) => {
    return await StudentEnquiry.destroy({ where: { id } });
};

module.exports = {
    getStudentEnquiries,
    findStudentEnquiryById,
    createStudentEnquiry,
    updateStudentEnquiryById,
    deleteStudentEnquiryById
};