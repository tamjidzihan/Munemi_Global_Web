const PackageBooking = require('../models/PackageBookingModel');

const getPackageBookings = () => PackageBooking.findAll();
const findPackageBookingById = (id) => PackageBooking.findByPk(id);
const createPackageBooking = (values) => PackageBooking.create(values);
const updatePackageBookingById = async (id, values) => {
    const [updateCount] = await PackageBooking.update(values, {
        where: { id },
    })
    if (updateCount === 0) return null;
    return Booking.findByPk(id)
};
const deletePackageBookingById = (id) => PackageBooking.destroy({ where: { id } });

module.exports = {
    getPackageBookings,
    findPackageBookingById,
    createPackageBooking,
    updatePackageBookingById,
    deletePackageBookingById
}