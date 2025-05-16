const packageService = require('../services/packageService');
const fs = require('fs').promises;
const path = require('path');

const uploadDir = path.join(__dirname, '../uploads/');

const getAllPackage = async (req, res) => {
    try {
        const packages = await packageService.getPackage();
        res.status(200).json(packages);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching Packages', error });
    }
};

const getPackagesById = async (req, res) => {
    try {
        const { id } = req.params;
        const package = await packageService.findPackageById(id);
        if (!package) return res.status(404).json({ message: 'Package not found' });
        res.status(200).json(package);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching Package', error });
    }
};

const createNewPackage = async (req, res) => {
    try {
        const { title, type, price, destination, numberOftraveller, duration, description, startDate, endDate, termsAndConditions, isActive } = req.body;

        if (!title || !type || !description || !destination || !numberOftraveller) {
            return res.status(400).json({ message: "Please fill out all the required fields" });
        }

        // Validate 'Package Type'
        if (!["International", "Domestic"].includes(type)) {
            return res.status(400).json({ message: "Invalid Package type" })
        }

        // Get uploaded image filenames
        const imageUrls = req.files['image'] ? req.files['image'].map(file => file.filename) : [];

        const newPackage = await packageService.createPackage(
            {
                title,
                type,
                price,
                destination,
                numberOftraveller,
                duration,
                description,
                startDate,
                endDate,
                termsAndConditions,
                isActive
            },
            imageUrls // Pass image URLs to the service
        );

        res.status(201).json(newPackage);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating Package', error });
    }
};

const updatePackage = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const package = await packageService.findPackageById(id);
        if (!package) {
            return res.status(404).json({ message: 'Package not found' });
        }

        // Get new uploaded image filenames
        const newImageUrls = req.files['images'] ? req.files['images'].map(file => file.filename) : [];

        const updatedPackage = await packageService.updatePackageById(
            id,
            updateData,
            newImageUrls // Pass new image URLs to the service
        );

        if (!updatedPackage) {
            return res.status(400).json({ message: 'No changes made to the package' });
        }

        res.status(200).json(updatedPackage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating package', error });
    }
};

const deletePackage = async (req, res) => {
    try {
        const { id } = req.params;
        const package = await packageService.findPackageById(id);

        if (!package) {
            return res.status(404).json({ message: 'Package not found' });
        }

        // Collect files to delete (images associated with the package)
        const filesToDelete = package.images ? package.images.map(image => image.url) : [];

        // Delete database record
        const deleted = await packageService.deletePackageById(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Package not found' });
        }

        // Delete associated image files from the uploads directory
        await Promise.all(
            filesToDelete.map(async (filename) => {
                try {
                    await fs.unlink(path.join(uploadDir, filename));
                } catch (err) {
                    console.error(`Error deleting image ${filename}:`, err);
                }
            })
        );

        res.status(200).json({ message: 'Package deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting Package', error });
    }
};

module.exports = {
    getAllPackage,
    getPackagesById,
    createNewPackage,
    updatePackage,
    deletePackage
};