const Offer = require('../models/OfferModel')

const getOffer = () => Offer.findAll();
const findOfferById = (id) => Offer.findByPk(id);
const createOffer = (valuse) => Offer.create(valuse);
const updateOfferById = async (id, valuse) => {
    const [updateCount] = await Offer.update(valuse, {
        where: { id }
    });
    if (updateCount === 0) return null;
    return Offer.findByPk(id)
};
const deleteOfferById = (id) => Offer.destroy({ where: { id } });

module.exports = {
    getOffer,
    findOfferById,
    createOffer,
    updateOfferById,
    deleteOfferById
}