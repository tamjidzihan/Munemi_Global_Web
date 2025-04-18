const packageService = require('../services/packageService');
const fs = require('fs').promises;
const path = require('path');

const uploadDir = path.join(__dirname, '../uploads/');

const getAllPackage = async (req, res) => {
    try {
        const packages = await packageService.getPackage();
        res.status(200).json(packages);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching Offers', error });
    }
};

const getPackagesById = async (req, res) => {
    try {
        const { id } = req.params;
        const package = await packageService.findPackageById(id);
        if (!package) return res.status(404).json({ message: 'Packag not found' });
        res.status(200).json(package);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching Package', error });
    }
};

const createNewPackage = async (req, res) => {
    try {
        const { title, type, price, duration, description, startDate, endDate, termsAndConditions, isActive } = req.body;

        if (!title || !type || !description) {
            return res.status(400).json({ message: "Please fill out all the required fields" });
        }

        const image = req.files['image'] ? req.files['image'][0].filename : null;

        const newPackage = await packageService.createPackage({
            title,
            type,
            price,
            duration,
            description,
            startDate,
            endDate,
            termsAndConditions,
            image,
            isActive
        });

        res.status(201).json(newPackage);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error creating Package', error: error });
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

        // Handle image update
        const newImage = req.files && req.files['image'] ? req.files['image'][0].filename : null;
        if (newImage) {
            // Delete old image if exists
            if (package.image) {
                try {
                    await fs.unlink(path.join(uploadDir, package.image));
                } catch (err) {
                    console.error(`Error deleting old image ${package.image}:`, err);
                }
            }
            updateData.image = newImage;
        }

        const updatedPackage = await packageService.updatePackageById(id, updateData);
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

        // Collect files to delete
        const filesToDelete = [];
        if (package.image) filesToDelete.push(package.image);

        const deleted = await packageService.deletePackageById(id);
        if (!deleted) {
            return res.status(404).json({ message: ' Package not found' });
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