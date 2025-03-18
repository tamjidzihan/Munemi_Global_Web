const express = require("express");
const authenticationRouter = require("./authenticationRouter");
const StudentEnquiryRouter = require("./StudentEnquiryRouter");
const careerRouter = require("./careerRouter");
const AppointmentBookingRouter = require("./appointmentBookingRouter");
// const ReferRoutes = require("./ReferRoutes");
const offerRoutes = require("./offerRoutes");

const router = express.Router();

module.exports = () => {
    authenticationRouter(router);
    StudentEnquiryRouter(router);
    AppointmentBookingRouter(router);
    careerRouter(router);
    // ReferRoutes(router);
    offerRoutes(router);
    return router;
};