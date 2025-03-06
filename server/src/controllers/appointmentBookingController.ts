import express from "express"
import { createAppointmentBooking, getAppointmentBookings } from "../services/AppointmentBookingService"


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