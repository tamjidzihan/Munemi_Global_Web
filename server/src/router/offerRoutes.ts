import express from "express";
import {
    createNewOffer,
    deleteOfferData,
    getAllOffers,
    getOfferById,
    updateOfferData,
} from "../controllers/offerController";

export default (router: express.Router) => {
    router.get("/offers", getAllOffers);
    router.post("/offers", createNewOffer);
    router.get("/offers/:id", getOfferById);
    router.patch("/offers/:id", updateOfferData);
    router.delete("/offers/:id", deleteOfferData);
};
