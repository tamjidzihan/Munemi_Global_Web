// routes/bookingRoutes.js
const bookingController = require('../controllers/bookingController');

module.exports = (router) => {
    router.get('/bookings', bookingController.getAllBookings);
    router.get('/bookings/:id', bookingController.getBookingById);
    router.post('/bookings', bookingController.createNewBooking);
    router.put('/bookings/:id', bookingController.updateBooking);
    router.delete('/bookings/:id', bookingController.deleteBooking);
};