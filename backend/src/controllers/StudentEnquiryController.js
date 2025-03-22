const {
    createStudentEnquiry,
    deleteStudentEnquiryById,
    findStudentEnquiryById,
    getStudentEnquiries
} = require("../services/StudentEnquiryService");

const getAllStudentEnquiries = async (req, res) => {
    try {
        const studentEnquiries = await getStudentEnquiries();
        res.status(200).json(studentEnquiries);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error fetching student enquiries" });
    }
};

const getStudentEnquiryById = async (req, res) => {
    try {
        const { id } = req.params;
        const studentEnquiry = await findStudentEnquiryById(id);
        if (!studentEnquiry) {
            return res.status(404).json({ message: "Student Enquiry Not found" });
        }
        res.status(200).json(studentEnquiry);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error fetching student enquiry" });
    }
};

const createNewStudentEnquiry = async (req, res) => {
    try {
        const {
            studentName,
            email,
            phone,
            address,
            englishProficiencyTest,
            testResult,
            academicQualification,
            que1,
            que2,
            que3,
            visaHistory
        } = req.body;

        // Validate required fields
        if (!studentName || !email || !phone || !address ||
            !englishProficiencyTest || !testResult ||
            !academicQualification || !que1 || !que2 || !que3) {
            return res.status(400).json({ message: "Please fill out all the required fields" });
        }

        // Validate English Proficiency Test type
        if (!["IELTS", "PTE", "TOEFL", "Duolingo"].includes(englishProficiencyTest)) {
            return res.status(400).json({ message: "Invalid English Proficiency Test type" });
        }

        const newStudentEnquiry = await createStudentEnquiry({
            studentName,
            email,
            phone,
            address,
            englishProficiencyTest,
            testResult,
            academicQualification,
            que1,
            que2,
            que3,
            visaHistory
        });

        res.status(201).json(newStudentEnquiry);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error creating student enquiry" });
    }
};

const updateStudentEnquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            studentName,
            email,
            phone,
            address,
            englishProficiencyTest,
            testResult,
            academicQualification,
            que1,
            que2,
            que3,
            visaHistory
        } = req.body;

        // Validate required fields
        if (!studentName || !email || !phone || !address ||
            !englishProficiencyTest || !testResult ||
            !academicQualification || !que1 || !que2 || !que3) {
            return res.status(400).json({ message: "Please fill out all the required fields" });
        }

        const enquiry = await findStudentEnquiryById(id);

        if (enquiry) {
            // Update the enquiry fields
            await enquiry.update({
                studentName,
                email,
                phone,
                address,
                englishProficiencyTest,
                testResult,
                academicQualification,
                que1,
                que2,
                que3,
                visaHistory
            });

            res.status(200).json(enquiry);
        } else {
            res.status(404).json({ message: "Student Enquiry not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error updating student enquiry" });
    }
};

const deleteStudentEnquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await deleteStudentEnquiryById(id);
        if (deleted) {
            res.sendStatus(204); // No Content
        } else {
            res.status(404).json({ message: "Student Enquiry not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error deleting student enquiry" });
    }
};

module.exports = {
    getAllStudentEnquiries,
    getStudentEnquiryById,
    createNewStudentEnquiry,
    updateStudentEnquiry,
    deleteStudentEnquiry
};