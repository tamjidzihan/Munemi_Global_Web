const express = require("express");
const {
    getAllCareers,
    createNewCareer,
    updateCareerById,
    deleteCareer,
    getCareerById
} = require("../controllers/CareerController");

module.exports = (router) => {
    router.get('/careers', getAllCareers);
    router.get('/careers/:id', getCareerById);
    router.post('/careers', createNewCareer);
    router.patch('/careers/:id', updateCareerById);
    router.delete('/careers/:id', deleteCareer);
};