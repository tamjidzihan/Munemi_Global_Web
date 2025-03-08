import express from "express"
import { createNewAppointmentBooking, deleteAppointmentBookingData, getAllAppointmentBookings, getAppointmentBookingById, updateAppointmentBookingData } from "../controllers/appointmentBookingController"


export default (router: express.Router) => {
    router.get("/appointments", getAllAppointmentBookings);
    router.post("/appointments", createNewAppointmentBooking);
    router.get("/appointments/:id", getAppointmentBookingById);
    router.patch("/appointments/:id", updateAppointmentBookingData);
    router.delete("/appointments/:id", deleteAppointmentBookingData);
}