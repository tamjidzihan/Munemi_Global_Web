const {
    getAllStudentEnquiries,
    getStudentEnquiryById,
    createNewStudentEnquiry,
    updateStudentEnquiry,
    deleteStudentEnquiry
} = require("../controllers/StudentEnquiryController");

const upload = require("../middlewares/multerConfig");

module.exports = (router) => {
    router.get("/student-enquiries", getAllStudentEnquiries);
    router.get("/student-enquiries/:id", getStudentEnquiryById);

    router.post(
        "/student-enquiries",
        upload.fields([
            { name: 'passport', maxCount: 1 },
            { name: 'cv', maxCount: 1 }
        ]),
        createNewStudentEnquiry
    );

    router.patch(
        "/student-enquiries/:id",
        upload.fields([
            { name: 'passport', maxCount: 1 },
            { name: 'cv', maxCount: 1 }
        ]),
        updateStudentEnquiry
    );

    router.delete("/student-enquiries/:id", deleteStudentEnquiry);
};