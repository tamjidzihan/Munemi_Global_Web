const { CareerModel } = require("../db/CareerModel");

const getCareers = () => CareerModel.find();
const findCareerById = (id) => CareerModel.findById(id);
const createCareer = (values) => new CareerModel(values).save().then((career) => career.toObject());
const updateCareer = (id, values) => CareerModel.findByIdAndUpdate(id, values, { new: true });
const deleteCareerById = (id) => CareerModel.findByIdAndDelete(id);

module.exports = {
    getCareers,
    findCareerById,
    createCareer,
    updateCareer,
    deleteCareerById
};