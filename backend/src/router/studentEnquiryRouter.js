const express = require("express");
const studentEnquiryController = require('../controllers/StudentEnquiryController')
module.exports = (router) => {
    router.get('/student-enquiries', studentEnquiryController.getAllStudentEnquiries);
    router.get('/student-enquiries/:id', studentEnquiryController.getStudentEnquiryById);
    router.post('/student-enquiries', studentEnquiryController.createNewStudentEnquiry);
    router.patch('/student-enquiries/:id', studentEnquiryController.updateStudentEnquiry);
    router.delete('/student-enquiries/:id', studentEnquiryController.deleteStudentEnquiry);
};