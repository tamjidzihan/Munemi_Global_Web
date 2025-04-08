const express = require("express");
const careerRouter = require("./careerRoutes");
const studentEnquiryRouter = require("./studentEnquiryRouter")
const authenticationRouter = require("./authenticationRouter")
const appointmentBookingRouter = require("./appointmentBookingRouter")
const universityRouter = require('./universityRouter')
const offerRouter = require('./offerRouter')
const agentRouter = require('./agentRouter')
const institutionPartnerRouter = require('./institutionPartnerRouter')


const router = express.Router();

module.exports = () => {
    careerRouter(router);
    studentEnquiryRouter(router)
    authenticationRouter(router)
    appointmentBookingRouter(router)
    universityRouter(router)
    offerRouter(router)
    agentRouter(router)
    institutionPartnerRouter(router)
    return router;
};