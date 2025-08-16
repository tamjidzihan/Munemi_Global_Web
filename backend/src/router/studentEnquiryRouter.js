const {
    getAllStudentEnquiries,
    getStudentEnquiryById,
    createNewStudentEnquiry,
    updateStudentEnquiry,
    deleteStudentEnquiry
} = require("../controllers/StudentEnquiryController");

const upload = require("../middlewares/multerConfig");

module.exports = (router) => {
    router.get("/student-enquiries", getAllStudentEnquiries); // GET all
    router.get("/student-enquiries/:id", getStudentEnquiryById); // GET by ID
    router.post(
        "/student-enquiries",
        upload.array("documents"), // multiple docs
        createNewStudentEnquiry
    );
    router.put(
        "/student-enquiries/:id",
        upload.array("documents"), // allow updating with new docs
        updateStudentEnquiry
    );
    router.delete("/student-enquiries/:id", deleteStudentEnquiry); // DELETE
};