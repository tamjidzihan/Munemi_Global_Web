const express = require("express");
const {
    createOffer,
    deleteOfferById,
    findOfferById,
    getOffers,
    updateOffer,
} = require("../services/OfferService");
const { deleteImageFromCloudinary } = require("../helpers");

exports.getAllOffers = async (req, res) => {
    try {
        const offers = await getOffers();
        res.status(200).json(offers);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

exports.createNewOffer = async (req, res) => {
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
            isActive: isActive ?? true,
        });

        res.status(201).json(newOffer);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

exports.updateOfferData = async (req, res) => {
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
    }
};

exports.deleteOfferData = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the offer and get its publicId
        const offer = await findOfferById(id);
        if (!offer) {
            res.status(404).json({ message: 'Offer not found' });
            return;
        }

        const publicId = offer.image.publicId;

        // Delete the image from Cloudinary
        const imageDeleted = await deleteImageFromCloudinary(publicId);
        if (!imageDeleted) {
            res.status(500).json({ message: 'Failed to delete image from Cloudinary' });
            return;
        }

        // Delete the offer from the database
        const deletedOffer = await deleteOfferById(id);
        if (!deletedOffer) {
            res.status(404).json({ message: 'Offer not found' });
            return;
        }

        res.status(202).json(deletedOffer);
    } catch (error) {
        console.error('Error deleting offer:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getOfferById = async (req, res) => {
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
    }
};
