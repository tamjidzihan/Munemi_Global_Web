const express = require("express");
const careerRouter = require("./careerRoutes");
const studentEnquiryRouter = require("./studentEnquiryRouter")
const authenticationRouter = require("./authenticationRouter")
const appointmentBookingRouter = require("./appointmentBookingRouter")
const universityRouter = require('./universityRouter')
const offerRouter = require('./offerRouter')
const agentApplicationRouter = require('./agentApplicationRouter')
const agentRouter = require('./agentRouter')
const institutionPartnerRouter = require('./institutionPartnerRouter')
const healthInsurancePartnerRouter = require('./healthInsurancePartnerRouter')
const flightLocationRouter = require('./flightLocationRouter')
const bookingRoutes = require('./bookingRoutes')
const packageRouter = require('./packageRouter')
const packageBookingRouter = require('./packageBookingRouter')
const blogRouter = require('./blogRouter')
const newsHeadlineRouter = require('./newsHeadlineRouter')


const router = express.Router();

module.exports = () => {
    careerRouter(router);
    studentEnquiryRouter(router)
    authenticationRouter(router)
    appointmentBookingRouter(router)
    universityRouter(router)
    offerRouter(router)
    agentApplicationRouter(router)
    agentRouter(router)
    institutionPartnerRouter(router)
    healthInsurancePartnerRouter(router)
    flightLocationRouter(router)
    bookingRoutes(router)
    packageRouter(router)
    packageBookingRouter(router)
    blogRouter(router)
    newsHeadlineRouter(router)

    return router;
};