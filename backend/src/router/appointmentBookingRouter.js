const appointmentBookingController = require("../controllers/appointmentBookingController")

module.exports = (router) => {
    router.get('/appointments', appointmentBookingController.getAlltAppointmentBooking)
}