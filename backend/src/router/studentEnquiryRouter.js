const studentEnquiryController = require('../controllers/StudentEnquiryController')
const { isAuthenticated } = require("../middlewares")

module.exports = (router) => {
    router.get('/student-enquiries', isAuthenticated, studentEnquiryController.getAllStudentEnquiries);
    router.get('/student-enquiries/:id', studentEnquiryController.getStudentEnquiryById);
    router.post('/student-enquiries', isAuthenticated, studentEnquiryController.createNewStudentEnquiry);
    router.patch('/student-enquiries/:id', isAuthenticated, studentEnquiryController.updateStudentEnquiry);
    router.delete('/student-enquiries/:id', isAuthenticated, studentEnquiryController.deleteStudentEnquiry);
};