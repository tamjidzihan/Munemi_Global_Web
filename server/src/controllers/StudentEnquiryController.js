const express = require("express");
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
        res.sendStatus(400);
    }
};

const getStudentEnquirieyById = async (req, res) => {
    try {
        const { id } = req.params;
        const studentEnquiry = await findStudentEnquiryById(id);
        if (!studentEnquiry) {
            res.status(404).json({ message: "Student Enquiry Not found" });
            return;
        }
        res.status(200).json(studentEnquiry);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
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

        if (!studentName || !email || !phone || !address ||
            !englishProficiencyTest || !testResult ||
            !academicQualification || !que1 || !que2 || !que3) {
            res.status(400).json({ message: "Please fill out all the required fields" });
            return;
        }

        if (!["IELTS", "PTE", "TOEFl", "Duolingo"].includes(englishProficiencyTest)) {
            res.status(400).json({ message: "Invalid English Proficiency Test type" });
            return;
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
        res.sendStatus(400);
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

        if (!studentName || !email || !phone || !address ||
            !englishProficiencyTest || !testResult ||
            !academicQualification || !que1 || !que2 || !que3) {
            res.status(400).json({ message: "Please fill out all the required fields" });
            return;
        }

        const enquiry = await findStudentEnquiryById(id);

        if (enquiry) {
            enquiry.studentName = studentName;
            enquiry.email = email;
            enquiry.phone = phone;
            enquiry.address = address;
            enquiry.englishProficiencyTest = englishProficiencyTest;
            enquiry.testResult = testResult;
            enquiry.academicQualification = academicQualification;
            enquiry.que1 = que1;
            enquiry.que2 = que2;
            enquiry.que3 = que3;
            enquiry.visaHistory = visaHistory;

            await enquiry.save();
            res.status(200).json(enquiry);
        } else {
            res.status(404).json({ message: "Student Enquiry not found" });
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

const deleteStudentEnquiry = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteStudentEnquiryById(id);
        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

module.exports = {
    getAllStudentEnquiries,
    getStudentEnquirieyById,
    createNewStudentEnquiry,
    updateStudentEnquiry,
    deleteStudentEnquiry
};