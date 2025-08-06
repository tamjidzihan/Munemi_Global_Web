const studentEnquiryController = require('../controllers/StudentEnquiryController');
const { isAuthenticated } = require("../middlewares");

module.exports = (router) => {
    // Public routes (if any)
    router.get('/student-enquiries/:id', studentEnquiryController.getStudentEnquiryById);

    // Authenticated routes
    router.get('/student-enquiries',
        // isAuthenticated,
        studentEnquiryController.getAllStudentEnquiries
    );

    router.post('/student-enquiries',
        // isAuthenticated,
        studentEnquiryController.createNewStudentEnquiry
    );

    router.patch('/student-enquiries/:id',
        // isAuthenticated,
        studentEnquiryController.updateStudentEnquiry
    );

    router.delete('/student-enquiries/:id',
        isAuthenticated,
        studentEnquiryController.deleteStudentEnquiry
    );

    // Alternative RESTful route naming convention option:
    /*
    router.route('/student-enquiries')
        .get(isAuthenticated, studentEnquiryController.getAllStudentEnquiries)
        .post(isAuthenticated, studentEnquiryValidations.create, validate, studentEnquiryController.createNewStudentEnquiry);
    
    router.route('/student-enquiries/:id')
        .get(studentEnquiryController.getStudentEnquiryById)
        .patch(isAuthenticated, studentEnquiryValidations.update, validate, studentEnquiryController.updateStudentEnquiry)
        .delete(isAuthenticated, studentEnquiryController.deleteStudentEnquiry);
    */
};