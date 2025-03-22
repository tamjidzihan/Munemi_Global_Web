const Career = require('../models/CareerModel');

const getCareers = () => Career.findAll();
const findCareerById = (id) => Career.findByPk(id);
const createCareer = (values) => Career.create(values);
const updateCareer = (id, values) => Career.update(values, { where: { id }, returning: true });
const deleteCareerById = (id) => Career.destroy({ where: { id } });

module.exports = {
    getCareers,
    findCareerById,
    createCareer,
    updateCareer,
    deleteCareerById
};