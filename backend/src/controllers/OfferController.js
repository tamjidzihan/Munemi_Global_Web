const offerService = require('../services/offerService');
const fs = require('fs').promises;
const path = require('path');

const uploadDir = path.join(__dirname, '../uploads/');

const getAllOffers = async (req, res) => {
    try {
        const offers = await offerService.getOffer();
        res.status(200).json(offers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Offers', error });
    }
};

const getOfferById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const offer = await offerService.findOfferById(id);
        if (!offer) return res.status(404).json({ message: 'Offer not found' });
        res.status(200).json(offer);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Offer', error });
    }
};

const createNewOffer = async (req, res) => {
    try {
        const { title, description, startDate, endDate, termsAndConditions } = req.body;

        if (!title || !description || !startDate || !endDate) {
            return res.status(400).json({ message: "Please fill out all required fields" });
        }

        const image = req.files['image'] ? req.files['image'][0].filename : null;

        const newOffer = await offerService.createOffer({
            title,
            description,
            startDate,
            endDate,
            termsAndConditions,
            image,
            isActive: true
        });

        res.status(201).json(newOffer);
    } catch (error) {
        res.status(500).json({ message: 'Error creating Offer', error });
    }
};

const updateOffer = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const offer = await offerService.findOfferById(id);
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }

        // Handle image update
        const newImage = req.files && req.files['image'] ? req.files['image'][0].filename : null;
        if (newImage) {
            // Delete old image if exists
            if (offer.image) {
                try {
                    await fs.unlink(path.join(uploadDir, offer.image));
                } catch (err) {
                    console.error(`Error deleting old image ${offer.image}:`, err);
                }
            }
            updateData.image = newImage;
        }

        const updatedOffer = await offerService.updateOfferById(id, updateData);
        if (!updatedOffer) {
            return res.status(400).json({ message: 'No changes made to the offer' });
        }

        res.status(200).json(updatedOffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating offer', error });
    }
};

const deleteOffer = async (req, res) => {
    try {
        const { id } = req.params;
        const offer = await offerService.findOfferById(id);

        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }

        // Collect files to delete
        const filesToDelete = [];
        if (offer.image) filesToDelete.push(offer.image);

        const deleted = await offerService.deleteOfferById(id);
        if (!deleted) {
            return res.status(404).json({ message: ' Offer not found' });
        }

        await Promise.all(
            filesToDelete.map(async (filename) => {
                try {
                    await fs.unlink(path.join(uploadDir, filename));
                } catch (err) {
                    console.error(`Error deleting image ${filename}:`, err);
                }
            })
        );

        res.status(200).json({ message: 'Offer deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting Offer', error });
    }
};

module.exports = {
    getAllOffers,
    getOfferById,
    createNewOffer,
    updateOffer,
    deleteOffer
};