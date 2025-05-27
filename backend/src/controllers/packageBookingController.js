const packageBookingService = require('../services/packageBookingService');


const getAllPackageBookings = async (req, res) => {
    try {
        const packageBookings = await packageBookingService.getPackageBookings()
        res.status(200).json(packageBookings)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching bookings', error })
    }
}



module.exports = {
    getAllPackageBookings
}