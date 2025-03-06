import express from "express"
import { getAllAppointmentBookings, createNewAppointmentBooking } from "../controllers/AppointmentBookingController"

export default (router: express.Router) => {
    router.get('/appointmentbooking', getAllAppointmentBookings)
    router.post('/appointmentbooking', createNewAppointmentBooking)
}