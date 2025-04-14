const FlightLocation = require('../models/FlightLocation');

const getFlightLocations = () => FlightLocation.findAll();
const findFlightLocationById = (id) => FlightLocation.findByPk(id);
const createFlightLocation = (values) => FlightLocation.create(values);
const updateFlightLocationById = async (id, values) => {
    const [updateCount] = await FlightLocation.update(values, {
        where: { id }
    });
    if (updateCount === 0) return null;
    return FlightLocation.findByPk(id);
};
const deleteFlightLocationById = (id) => FlightLocation.destroy({ where: { id } });

module.exports = {
    getFlightLocations,
    findFlightLocationById,
    createFlightLocation,
    updateFlightLocationById,
    deleteFlightLocationById
};