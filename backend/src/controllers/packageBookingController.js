const packageBookingService = require('../services/packageBookingService');
const { sendMail } = require('../helpers/sendMail');
const { format } = require('date-fns');

const getAllPackageBookings = async (req, res) => {
    try {
        const packageBookings = await packageBookingService.getPackageBookings()
        res.status(200).json(packageBookings)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching bookings', error })
    }
}

const getpackageBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const packageBooking = await packageBookingService.findPackageBookingById(id)
        if (!packageBooking) return res.status(404).json({ message: 'Package Booking not found' });
        res.status(200).json(packageBooking)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching packageBooking', error });
    }
}

const createNewPackageBooking = async (req, res) => {
    try {
        const {
            packageId,
            fullName,
            email,
            mobile,
            title
        } = req.body;

        // Validate required fields
        if (!packageId || !fullName || !email || !mobile || !title) {
            return res.status(400).json({
                message: 'Please fill out all required fields: packageId, fullName, email, mobile, title'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: 'Please provide a valid email address'
            });
        }

        // Create the new package booking
        const newPackageBooking = await packageBookingService.createPackageBooking({
            packageId,
            fullName,
            email,
            mobile,
            title
        });

        res.status(201).json(newPackageBooking);
    } catch (error) {
        console.error('Error creating package booking:', error);
        res.status(500).json({
            message: 'Error creating package booking',
            error: error.message
        });
    }
};


const updatePackageBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            packageId,
            fullName,
            email,
            mobile,
            title
        } = req.body;

        // Validate required fields
        if (!packageId || !fullName || !email || !mobile || !title) {
            return res.status(400).json({
                message: 'Please fill out all required fields: packageId, fullName, email, mobile, title'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: 'Please provide a valid email address'
            });
        }

        // Check if booking exists
        const existingBooking = await packageBookingService.findPackageBookingById(id);
        if (!existingBooking) {
            return res.status(404).json({ message: 'Package booking not found' });
        }

        // Update booking
        const updatedBooking = await packageBookingService.updatePackageBookingById(id, {
            packageId,
            fullName,
            email,
            mobile,
            title
        });

        res.status(200).json({
            message: 'Package booking updated successfully',
            booking: updatedBooking
        });
    } catch (error) {
        console.error('Error updating package booking:', error);
        res.status(500).json({
            message: 'Error updating package booking',
            error: error.message
        });
    }
};

const deletePackageBooking = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if booking exists
        const existingBooking = await packageBookingService.findPackageBookingById(id);
        if (!existingBooking) {
            return res.status(404).json({ message: 'Package booking not found' });
        }

        // Delete booking
        await packageBookingService.deletePackageBookingById(id);

        res.status(200).json({
            message: 'Package booking deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting package booking:', error);
        res.status(500).json({
            message: 'Error deleting package booking',
            error: error.message
        });
    }
};


module.exports = {
    getAllPackageBookings,
    getpackageBookingById,
    createNewPackageBooking,
    updatePackageBooking,
    deletePackageBooking
}