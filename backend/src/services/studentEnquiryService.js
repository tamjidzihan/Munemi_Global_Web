const StudentEnquiry = require("../models/StudentEnquiryModel"); // Adjust the path as necessary

const getStudentEnquiries = () => StudentEnquiry.findAll(); // Fetch all student enquiries
const findStudentEnquiryById = (id) => StudentEnquiry.findByPk(id); // Find student enquiry by ID
const createStudentEnquiry = (values) => StudentEnquiry.create(values); // Create a new student enquiry
const updateStudentEnquiry = (id, values) =>
    StudentEnquiry.update(values, { where: { id }, returning: true }) // Update student enquiry by ID
        .then(([rowsUpdate, [updatedEnquiry]]) => updatedEnquiry); // Return the updated enquiry
const deleteStudentEnquiryById = (id) => StudentEnquiry.destroy({ where: { id } }); // Delete student enquiry by ID

module.exports = {
    getStudentEnquiries,
    findStudentEnquiryById,
    createStudentEnquiry,
    updateStudentEnquiry,
    deleteStudentEnquiryById
};