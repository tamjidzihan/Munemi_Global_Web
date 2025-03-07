import express from "express";
import { getRefers, createNewRefer, updateReferData, deleteReferData, getReferById } from "../controllers/ReferController";

export default (router: express.Router) => {
    router.get('/refer', getRefers);
    router.get('/refer/:id', getReferById);
    router.post('/refer', createNewRefer);
    router.patch('/refer/:id', updateReferData);
    router.delete('/refer/:id', deleteReferData);
};