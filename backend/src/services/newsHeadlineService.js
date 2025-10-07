const NewsHeadline = require('../models/NewsHeadlineModel');

const getAllNewsHeadlines = (options = {}) => NewsHeadline.findAll(options);
const findNewsHeadlineById = (id) => NewsHeadline.findByPk(id);
const createNewsHeadline = (values) => NewsHeadline.create(values);
const updateNewsHeadline = (id, values) => NewsHeadline.update(values, {
    where: { id },
    returning: true
});
const deleteNewsHeadline = (id) => NewsHeadline.destroy({ where: { id } });

module.exports = {
    getAllNewsHeadlines,
    findNewsHeadlineById,
    createNewsHeadline,
    updateNewsHeadline,
    deleteNewsHeadline
};