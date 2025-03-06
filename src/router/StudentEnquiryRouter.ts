import express from "express";
import { getAllStudentEnquiries, createNewStudentEnquiry, deleteStudentEnquiry, updateStudentEnquiry, getStudentEnquirieyById } from "../controllers/StudentEnquiryController";

export default (router: express.Router) => {
    router.get('/studentenquiry', getAllStudentEnquiries);
    router.get('/studentenquiry/:id', getStudentEnquirieyById);
    router.post('/studentenquiry', createNewStudentEnquiry);
    router.patch('/studentenquiry/:id', updateStudentEnquiry);
    router.delete('/studentenquiry/:id', deleteStudentEnquiry);
};
