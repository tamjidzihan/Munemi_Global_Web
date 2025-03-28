const University = require('../models/UniversityModel');

const getUniversity = () => University.findAll();
const findUniversityById = (id) => University.findByPk(id);
const createUniversity = (valuse) => University.create(valuse);
const updateUniversityById = async (id, values) => {
    const [updatedCount] = await University.update(values, {
        where: { id },
    });

    if (updatedCount === 0) return null; // If nothing was updated

    return University.findByPk(id); // Fetch the updated university
};
const deleteUniversityById = (id) => University.destroy({ where: { id } })

module.exports = {
    getUniversity,
    findUniversityById,
    createUniversity,
    updateUniversityById,
    deleteUniversityById
}