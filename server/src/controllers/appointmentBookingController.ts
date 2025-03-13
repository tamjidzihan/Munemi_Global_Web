import express from "express"
import { createAppointmentBooking, deleteAppointmentBookingById, findAppointmentBookingById, getAppointmentBookings } from "../services/AppointmentBookingService"


export const getAllAppointmentBookings = async (req: Express.Request, res: express.Response) => {
    try {
        const appointmentBookings = await getAppointmentBookings()
        res.status(200).json(appointmentBookings)
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
        return
    }
}


export const createNewAppointmentBooking = async (req: express.Request, res: express.Response) => {
    try {
        const { firstName, lastName, phone, email, city, appointmentOffice, message } = req.body

        if (!firstName || !lastName || !phone || !email || !city || !appointmentOffice) {
            res.status(400).json({ message: "Please fill out all the required fields" })
            return
        }
        if (!["Bangladesh"].includes(appointmentOffice)) {
            res.status(400).json({ message: "Invalid Appointment Office type. Only 'Bangladesh' is allowed." });
            return
        }
        const newAppointmentBooking = await createAppointmentBooking({
            firstName, lastName, phone, email, city, appointmentOffice, message
        })

        res.status(200).json(newAppointmentBooking)

    } catch (error) {
        console.log(error)
        res.sendStatus(400)
        return
    }
}


export const updateAppointmentBookingData = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, phone, email, city, appointmentOffice, message } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !phone || !email || !city || !appointmentOffice) {
            res.status(400).json({ message: "Please fill out all the required fields" });
            return;
        }
        if (!["Bangladesh"].includes(appointmentOffice)) {
            res.status(400).json({ message: "Invalid Appointment Office type. Only 'Bangladesh' is allowed." });
            return;
        }

        // Find existing appointment booking by ID
        const appointmentBooking = await findAppointmentBookingById(id);
        if (!appointmentBooking) {
            res.status(404).json({ message: "Appointment Booking not found" });
            return;
        }

        // Update the appointment booking details
        appointmentBooking.firstName = firstName;
        appointmentBooking.lastName = lastName;
        appointmentBooking.phone = phone;
        appointmentBooking.email = email;
        appointmentBooking.city = city;
        appointmentBooking.appointmentOffice = appointmentOffice;
        appointmentBooking.message = message;

        // Save the updated appointment booking
        await appointmentBooking.save();

        // Return the updated appointment booking
        res.status(200).json(appointmentBooking);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

export const deleteAppointmentBookingData = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deletedAppointmentBooking = await deleteAppointmentBookingById(id);
        if (!deletedAppointmentBooking) {
            res.status(404).json({ message: "Appointment Booking not found" });
            return;
        }

        res.status(202).json(deletedAppointmentBooking);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

export const getAppointmentBookingById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const appointmentBooking = await findAppointmentBookingById(id);
        if (!appointmentBooking) {
            res.status(404).json({ message: "Appointment Booking not found" });
            return;
        }

        res.status(200).json(appointmentBooking);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};


