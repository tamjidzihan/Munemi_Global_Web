const express = require("express");
const {
    createAppointmentBooking,
    deleteAppointmentBookingById,
    findAppointmentBookingById,
    getAppointmentBookings
} = require("../services/AppointmentBookingService");

const getAllAppointmentBookings = async (req, res) => {
    try {
        const appointmentBookings = await getAppointmentBookings();
        res.status(200).json(appointmentBookings);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

const createNewAppointmentBooking = async (req, res) => {
    try {
        const { firstName, lastName, phone, email, city, appointmentOffice, message } = req.body;

        if (!firstName || !lastName || !phone || !email || !city || !appointmentOffice) {
            return res.status(400).json({ message: "Please fill out all required fields" });
        }

        if (!["Bangladesh"].includes(appointmentOffice)) {
            return res.status(400).json({
                message: "Invalid Appointment Office. Only 'Bangladesh' is allowed."
            });
        }

        const newAppointmentBooking = await createAppointmentBooking({
            firstName,
            lastName,
            phone,
            email,
            city,
            appointmentOffice,
            message
        });

        res.status(201).json(newAppointmentBooking);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

const updateAppointmentBookingData = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, phone, email, city, appointmentOffice, message } = req.body;

        if (!firstName || !lastName || !phone || !email || !city || !appointmentOffice) {
            return res.status(400).json({ message: "Please fill out all required fields" });
        }

        if (!["Bangladesh"].includes(appointmentOffice)) {
            return res.status(400).json({
                message: "Invalid Appointment Office. Only 'Bangladesh' is allowed."
            });
        }

        const appointmentBooking = await findAppointmentBookingById(id);
        if (!appointmentBooking) {
            return res.status(404).json({ message: "Appointment Booking not found" });
        }

        // Update fields
        appointmentBooking.firstName = firstName;
        appointmentBooking.lastName = lastName;
        appointmentBooking.phone = phone;
        appointmentBooking.email = email;
        appointmentBooking.city = city;
        appointmentBooking.appointmentOffice = appointmentOffice;
        appointmentBooking.message = message;

        await appointmentBooking.save();
        res.status(200).json(appointmentBooking);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

const deleteAppointmentBookingData = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBooking = await deleteAppointmentBookingById(id);

        if (!deletedBooking) {
            return res.status(404).json({ message: "Appointment Booking not found" });
        }

        res.status(204).json({ message: "Appointment Booking  Deleted Successfully" });
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

const getAppointmentBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const appointmentBooking = await findAppointmentBookingById(id);

        if (!appointmentBooking) {
            return res.status(404).json({ message: "Appointment Booking not found" });
        }

        res.status(200).json(appointmentBooking);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

module.exports = {
    getAllAppointmentBookings,
    createNewAppointmentBooking,
    updateAppointmentBookingData,
    deleteAppointmentBookingData,
    getAppointmentBookingById
};