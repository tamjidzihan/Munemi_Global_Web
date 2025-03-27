const University = require('../models/UniversityModel');

const getUniversity = () => University.findAll();
const findUniversityById = (id) => University.findByPk(id);
const createUniversity = (valuse) => University.create(valuse);
const updateUniversity = (id, valuse) => University.update(valuse, { where: { id }, returning: true });
const deleteUniversity = (id) => University.destroy({ where: { id } })

module.exports = {
    getUniversity,
    findUniversityById,
    createUniversity,
    updateUniversity,
    deleteUniversity
}