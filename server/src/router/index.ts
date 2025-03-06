import express from "express";
import AppointmentBookingRouter from "./AppointmentBookingRouter";
import authenticationRouter from "./authenticationRouter";
import careerRouter from "./careerRouter";
import StudentEnquiryRouter from "./StudentEnquiryRouter";


const router = express.Router()
export default (): express.Router => {
    authenticationRouter(router)
    AppointmentBookingRouter(router)
    careerRouter(router)
    StudentEnquiryRouter(router)
    return router
}