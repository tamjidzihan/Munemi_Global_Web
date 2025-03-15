import express from "express";
import {
    createOffer,
    deleteOfferById,
    findOfferById,
    getOffers,
    updateOffer,
} from "../services/OfferService";

export const getAllOffers = async (req: express.Request, res: express.Response) => {
    try {
        const offers = await getOffers();
        res.status(200).json(offers);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        return
    }
};

export const createNewOffer = async (req: express.Request, res: express.Response) => {
    try {
        const { title, description, startDate, endDate, termsAndConditions, image, isActive } = req.body;
        if (!title || !description || !startDate || !endDate) {
            res.status(400).json({ message: "Please fill out all required fields" });
            return;
        }

        const newOffer = await createOffer({
            title,
            description,
            startDate,
            endDate,
            termsAndConditions,
            image: image ? { publicId: image.publicId, imageUrl: image.imageUrl } : null,
            isActive: isActive ?? true, // Default to true
        });

        res.status(201).json(newOffer);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        return

    }
};



export const updateOfferData = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { title, description, startDate, endDate, termsAndConditions, image, isActive } = req.body;

        const updatedOffer = await updateOffer(id, {
            title,
            description,
            startDate,
            endDate,
            termsAndConditions,
            image: image ? { publicId: image.publicId, imageUrl: image.imageUrl } : null,
            isActive,
        });

        if (!updatedOffer) {
            res.status(404).json({ message: "Offer not found" });
            return;
        }

        res.status(200).json(updatedOffer);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        return

    }
};

export const deleteOfferData = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deletedOffer = await deleteOfferById(id);
        if (!deletedOffer) {
            res.status(404).json({ message: "Offer not found" });
            return;
        }

        res.status(202).json(deletedOffer);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        return

    }
};

export const getOfferById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const offer = await findOfferById(id);
        if (!offer) {
            res.status(404).json({ message: "Offer not found" });
            return;
        }

        res.status(200).json(offer);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
        return

    }
};
