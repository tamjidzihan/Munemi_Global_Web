const appointmentBookingController = require("../controllers/appointmentBookingController")

module.exports = (router) => {
    router.get('/appointments', appointmentBookingController.getAllAppointmentBooking)
    router.get('/appointments/:id', appointmentBookingController.getAppointmentBookingById)
    router.post('/appointments', appointmentBookingController.createAppointmentBooking)
    router.patch('/appointments/:id', appointmentBookingController.updateAppointmentBooking)
    router.delete('/appointments/:id', appointmentBookingController.deleteAppointmentBooking)
}