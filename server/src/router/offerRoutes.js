const express = require("express");
const {
    createNewOffer,
    deleteOfferData,
    getAllOffers,
    getOfferById,
    updateOfferData,
} = require("../controllers/offerController");

module.exports = (router) => {
    router.get("/offers", getAllOffers);
    router.post("/offers", createNewOffer);
    router.get("/offers/:id", getOfferById);
    router.patch("/offers/:id", updateOfferData);
    router.delete("/offers/:id", deleteOfferData);
};
