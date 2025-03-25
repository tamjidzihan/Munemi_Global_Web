const express = require("express");
const careerRouter = require("./careerRoutes");
const studentEnquiryRouter = require("./studentEnquiryRouter")
const authenticationRouter = require("./authenticationRouter")
const appointmentBookingRouter = require("./appointmentBookingRouter")


const router = express.Router();

module.exports = () => {
    careerRouter(router);
    studentEnquiryRouter(router)
    authenticationRouter(router)
    appointmentBookingRouter(router)
    return router;
};