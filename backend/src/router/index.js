const express = require("express");
const careerRouter = require("./careerRoutes");
const studentEnquiryRouter = require("./studentEnquiryRouter")

const router = express.Router();

module.exports = () => {
    careerRouter(router);
    studentEnquiryRouter(router)
    return router;
};