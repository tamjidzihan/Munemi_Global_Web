// controllers/bookingController.js
const bookingService = require('../services/bookingService');

const getAllBookings = async (req, res) => {
    try {
        const bookings = await bookingService.getBookings();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
};

const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await bookingService.findBookingById(id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching booking', error });
    }
};

const createNewBooking = async (req, res) => {
    try {
        const {
            fullName,
            email,
            mobile,
            tripType,
            origin,
            destination,
            startDate,
            endDate,
            travelers,
        } = req.body;

        // Validate required fields
        if (
            !fullName ||
            !email ||
            !mobile ||
            !tripType ||
            !origin ||
            !destination ||
            !startDate ||
            !travelers
        ) {
            return res.status(400).json({ message: 'Please fill out all required fields' });
        }

        const newBooking = await bookingService.createBooking({
            fullName,
            email,
            mobile,
            tripType,
            origin,
            destination,
            startDate,
            endDate,
            travelers,
        });

        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error });
    }
};

const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const booking = await bookingService.findBookingById(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const updatedBooking = await bookingService.updateBookingById(id, updateData);
        if (!updatedBooking) {
            return res.status(400).json({ message: 'No changes made to the booking' });
        }

        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: 'Error updating booking', error });
    }
};

const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await bookingService.findBookingById(id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const deleted = await bookingService.deleteBookingById(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting booking', error });
    }
};

module.exports = {
    getAllBookings,
    getBookingById,
    createNewBooking,
    updateBooking,
    deleteBooking,
};