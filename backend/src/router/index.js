const express = require("express");
const careerRouter = require("./careerRoutes");
const studentEnquiryRouter = require("./studentEnquiryRouter")
const authenticationRouter = require("./authenticationRouter")

const router = express.Router();

module.exports = () => {
    careerRouter(router);
    studentEnquiryRouter(router)
    authenticationRouter(router)
    return router;
};