const packageBookingController = require('../controllers/packageBookingController')

module.exports = (router) => {
    router.get('/packagebooking', packageBookingController.getAllPackageBookings)
};