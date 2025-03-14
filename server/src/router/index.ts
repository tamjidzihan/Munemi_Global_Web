import express from "express";
import authenticationRouter from "./authenticationRouter";
import careerRouter from "./careerRouter";
import StudentEnquiryRouter from "./StudentEnquiryRouter";
import AppointmentBookingRouter from "./appointmentBookingRouter";
import ReferRoutes from "./ReferRoutes";
import offerRoutes from "./offerRoutes";


const router = express.Router()
export default (): express.Router => {
    authenticationRouter(router)
    AppointmentBookingRouter(router)
    careerRouter(router)
    StudentEnquiryRouter(router)
    ReferRoutes(router)
    offerRoutes(router)
    return router
}