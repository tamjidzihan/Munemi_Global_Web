const {
    getAppointmentBooking,
    findAppointmentBooking,
    createAppointmentBooking,
    updateAppointmentBooking,
    deleteAppointmentBooking
} = require("../services/AppointmentBookingService")


const getAlltAppointmentBooking = async (req, res) => {
    try {
        const appointmentBooking = await getAppointmentBooking()
        res.status(200).json(appointmentBooking)
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error fetching Appointment Booking" });
    }
}

module.exports = {
    getAlltAppointmentBooking
}