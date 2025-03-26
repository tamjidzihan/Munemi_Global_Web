const appointmentBookingService = require('../services/AppointmentBookingService')


const getAllAppointmentBooking = async (req, res) => {
    try {
        const appointmentBooking = await appointmentBookingService.getAppointmentBooking()
        res.status(200).json(appointmentBooking)
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error fetching Appointment Bookings" });
    }
}


const getAppointmentBookingById = async (req, res) => {
    try {
        const { id } = req.params
        const appointmentBooking = await appointmentBookingService.findAppointmentBookingById(id)
        if (!appointmentBooking) {
            return res.status(404).json({ message: "Appointment Bookings Not found" });
        }
        res.status(200).json(appointmentBooking)
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error fetching Appointment Bookings" })
    }
}

const createAppointmentBooking = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            phone,
            email,
            city,
            appointmentOffice,
            message
        } = req.body

        if (!firstName || !lastName || !phone || !email || !city || !appointmentOffice) {
            return res.status(400).json({ message: "Please fill out all the required fields" });
        }
        if (!["Bangladesh"].includes(appointmentOffice)) {
            return res.status(400).json({ message: "Invalid appointment office type" });
        }

        const newAppointment = await appointmentBookingService.createAppointmentBooking({
            firstName,
            lastName,
            phone,
            email,
            city,
            appointmentOffice,
            message
        })
        res.status(201).json(newAppointment)
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error creating Appointment Bookings" });
    }
}


const updateAppointmentBooking = async (req, res) => {
    try {

        const { id } = req.params
        const {
            firstName,
            lastName,
            phone,
            email,
            city,
            appointmentOffice,
            message
        } = req.body

        if (!firstName || !lastName || !phone || !email || !city || !appointmentOffice) {
            return res.status(400).json({ message: "Please fill out all the required fields" });
        }
        if (!["Bangladesh"].includes(appointmentOffice)) {
            return res.status(400).json({ message: "Invalid appointment office type" });
        }

        // Find the appointment
        const appointment = await appointmentBookingService.findAppointmentBookingById(id);

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" }); // ✅ Return here
        }

        await appointment.update({
            firstName,
            lastName,
            phone,
            email,
            city,
            appointmentOffice,
            message
        });

        res.status(200).json(appointment);
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error updating Appointment Booking" })
        return
    }
}

const deleteAppointmentBooking = async (req, res) => {
    try {
        const { id } = req.params
        const deleteAppointments = await appointmentBookingService.deleteAppointmentBooking(id)
        if (deleteAppointments) {
            res.sendStatus(204); // No Content
        } else {
            res.status(404).json({ message: "Appointment not found" });
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Error deleting Appointment Booking" })
    }
}



module.exports = {
    getAllAppointmentBooking,
    getAppointmentBookingById,
    createAppointmentBooking,
    updateAppointmentBooking,
    deleteAppointmentBooking
}