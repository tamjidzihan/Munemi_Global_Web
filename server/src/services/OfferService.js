const { OfferModel } = require("../db/OfferModel");

const getOffers = () => OfferModel.find();
const findOfferById = (id) => OfferModel.findById(id);
const createOffer = (values) => new OfferModel(values).save().then((offer) => offer.toObject());
const updateOffer = (id, values) => OfferModel.findByIdAndUpdate(id, values, { new: true });
const deleteOfferById = (id) => OfferModel.findByIdAndDelete(id);

module.exports = {
    getOffers,
    findOfferById,
    createOffer,
    updateOffer,
    deleteOfferById,
};
