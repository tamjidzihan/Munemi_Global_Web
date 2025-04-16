const Booking = require('../models/BookingModel');

const getBookings = () => Booking.findAll();
const findBookingById = (id) => Booking.findByPk(id);
const createBooking = (values) => Booking.create(values);
const updateBookingById = async (id, values) => {
    const [updateCount] = await Booking.update(values, {
        where: { id },
    });
    if (updateCount === 0) return null;
    return Booking.findByPk(id);
};
const deleteBookingById = (id) => Booking.destroy({ where: { id } });

module.exports = {
    getBookings,
    findBookingById,
    createBooking,
    updateBookingById,
    deleteBookingById,
};