const bookingService = require('../services/bookingService');
const { sendMail } = require('../helpers/sendMail');
const { format } = require('date-fns');

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
            adult,
            children,
            infants,
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
            !adult
        ) {
            return res.status(400).json({ message: 'Please fill out all required fields' });
        }

        await sendMail(email, "Your Flight Booking Confirmation - Munemi Global", {
            fullName,
            tripType,
            origin,
            destination,
            startDate: startDate ? format(new Date(startDate), 'dd/MM/yyyy') : 'N/A',
            endDate: endDate ? format(new Date(endDate), 'dd/MM/yyyy') : 'N/A',
            adult,
            children,
            infants,
        });


        // Prepare the email for the team
        const teamEmailSubject = `New Flight Booking - for ${fullName} || From: ${origin} | To: ${destination}`;
        const teamEmailHtml = `
            <h1>Flight Booking Details : </h1>
            <p><strong>Name :</strong> ${fullName}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Mobile :</strong> ${mobile}</p>
            <p><strong>Trip Type :</strong> ${tripType}</p>
            <p><strong>From :</strong> ${origin}</p>
            <p><strong>To :</strong> ${destination}</p>
            <p><strong>Start Date :</strong> ${startDate}</p>
            <p><strong>End Date :</strong> ${endDate}</p>
            <p><strong>Passengers :</strong> ${adult} Adult(s), ${children || 0} Child(ren), ${infants || 0} Infant(s)</p>
        `;

        // Send email to the team
        await sendMail("ticket@munemiglobal.com", teamEmailSubject, {
            fullName,
            email,
            mobile,
            tripType,
            origin,
            destination,
            startDate,
            endDate,
            adult,
            children,
            infants,
        }, teamEmailHtml); // Pass the custom HTML directly


        const newBooking = await bookingService.createBooking({
            fullName,
            email,
            mobile,
            tripType,
            origin,
            destination,
            startDate,
            endDate,
            adult,
            children,
            infants,
        });

        res.status(201).json(newBooking);
    } catch (error) {
        console.log(error)
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