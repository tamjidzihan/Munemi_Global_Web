const NewsHeadline = require('../models/NewsHeadlineModel')

const getAllNewsHeadlines = (options = {}) => NewsHeadline.findAll(options)
const findNewsHeadlineById = (id) => NewsHeadline.findByPk(id)
const createNewsHeadline = (valuse) => NewsHeadline.create(valuse)
const updateNewsHeadline = (id, valuse) => NewsHeadline.update(valuse, { where: { id }, returning: true });
const deleteNewsHeadline = (id) => NewsHeadline.destroy({ where: { id } })


module.exports = {
    getAllNewsHeadlines,
    findNewsHeadlineById,
    createNewsHeadline,
    updateNewsHeadline,
    deleteNewsHeadline
}