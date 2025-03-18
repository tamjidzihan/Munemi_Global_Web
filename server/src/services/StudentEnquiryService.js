const { StudentEnquiryModel } = require("../db/StudentEnquiryModel");

const getStudentEnquiries = () => StudentEnquiryModel.find();
const findStudentEnquiryById = (id) => StudentEnquiryModel.findById(id);
const createStudentEnquiry = (values) =>
    new StudentEnquiryModel(values).save().then((enquiry) => enquiry.toObject());
const updateStudentEnquiry = (id, values) =>
    StudentEnquiryModel.findByIdAndUpdate(id, values, { new: true, runValidators: true });
const deleteStudentEnquiryById = (id) => StudentEnquiryModel.findByIdAndDelete(id);

module.exports = {
    getStudentEnquiries,
    findStudentEnquiryById,
    createStudentEnquiry,
    updateStudentEnquiry,
    deleteStudentEnquiryById
};