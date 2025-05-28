const packageBookingController = require('../controllers/packageBookingController')

module.exports = (router) => {
    router.get('/packagebooking', packageBookingController.getAllPackageBookings);
    router.get('/packagebooking/:id', packageBookingController.getpackageBookingById);
    router.post('/packagebooking', packageBookingController.createNewPackageBooking);
    router.put('/packagebooking/:id', packageBookingController.updatePackageBooking);
    router.delete('/packagebooking/:id', packageBookingController.deletePackageBooking);
};