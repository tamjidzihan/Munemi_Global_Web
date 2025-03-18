const express = require("express");
const {
    getAllStudentEnquiries,
    createNewStudentEnquiry,
    deleteStudentEnquiry,
    updateStudentEnquiry,
    getStudentEnquirieyById
} = require("../controllers/StudentEnquiryController");

module.exports = (router) => {
    router.get('/student-enquiries', getAllStudentEnquiries);
    router.get('/student-enquiries/:id', getStudentEnquirieyById);
    router.post('/student-enquiries', createNewStudentEnquiry);
    router.patch('/student-enquiries/:id', updateStudentEnquiry);
    router.delete('/student-enquiries/:id', deleteStudentEnquiry);
};