const flightLocationController = require('../controllers/flightLocationController');

module.exports = (router) => {
    router.get('/flightLocation', flightLocationController.getAllLocations);
    router.post('/flightLocation', flightLocationController.createNewLocation);
    router.put('/flightLocation/:id', flightLocationController.updateLocation);
    router.delete('/flightLocation/:id', flightLocationController.deleteLocation);
}

