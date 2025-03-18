import express from "express";
import { getAllStudentEnquiries, createNewStudentEnquiry, deleteStudentEnquiry, updateStudentEnquiry, getStudentEnquirieyById } from "../controllers/StudentEnquiryController";

export default (router: express.Router) => {
    router.get('/student-enquiries', getAllStudentEnquiries);
    router.get('/student-enquiries/:id', getStudentEnquirieyById);
    router.post('/student-enquiries', createNewStudentEnquiry);
    router.patch('/student-enquiries/:id', updateStudentEnquiry);
    router.delete('/student-enquiries/:id', deleteStudentEnquiry);
};
