const express = require("express");
const {
    createNewAppointmentBooking,
    deleteAppointmentBookingData,
    getAllAppointmentBookings,
    getAppointmentBookingById,
    updateAppointmentBookingData
} = require("../controllers/appointmentBookingController");

module.exports = (router) => {
    router.get("/appointments", getAllAppointmentBookings);
    router.post("/appointments", createNewAppointmentBooking);
    router.get("/appointments/:id", getAppointmentBookingById);
    router.patch("/appointments/:id", updateAppointmentBookingData);
    router.delete("/appointments/:id", deleteAppointmentBookingData);
};