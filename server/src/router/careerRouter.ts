import express from "express"
import { getAllCareers, createNewCareer, updateCareerById, deleteCareer, getCareerById } from "../controllers/CareerController";

export default (router: express.Router) => {
    router.get('/careers', getAllCareers);
    router.get('/careers/:id', getCareerById);
    router.post('/careers', createNewCareer);
    router.patch('/careers/:id', updateCareerById);
    router.delete('/careers/:id', deleteCareer);
};
