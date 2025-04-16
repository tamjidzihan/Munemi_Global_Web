const flightLocationService = require('../services/flightLocationService');

const getAllLocations = async (req, res) => {
    try {
        const flightLocations = await flightLocationService.getFlightLocations();
        res.status(200).json(flightLocations);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching locations', error });
    }
};

const createNewLocation = async (req, res) => {
    try {
        const { cityName, airportCode, airportName } = req.body;

        // Validate required fields
        if (!airportCode || !airportName) {
            return res.status(400).json({ message: "airport-Code and airport Name fields are required" });
        }

        const newFlightLocation = await flightLocationService.createFlightLocation({
            cityName,
            airportCode,
            airportName

        });

        res.status(201).json(newFlightLocation);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating location', error });
    }
};

const updateLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const { cityName, airportCode, airportName } = req.body;

        // Validate required fields
        if (!airportCode || !airportName) {
            return res.status(400).json({ message: "airport-Code and airport Name fields are required" });
        }

        const updatedLocation = await flightLocationService.updateFlightLocationById(id, {
            cityName,
            airportCode,
            airportName
        });

        if (!updatedLocation) {
            return res.status(404).json({ message: 'Location not found' });
        }

        res.status(200).json(updatedLocation);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating location', error });
    }
};

const deleteLocation = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await flightLocationService.deleteFlightLocationById(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Location not found' });
        }

        res.status(200).json({ message: 'Location deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error deleting location', error });
    }
};

module.exports = {
    getAllLocations,
    createNewLocation,
    updateLocation,
    deleteLocation
};