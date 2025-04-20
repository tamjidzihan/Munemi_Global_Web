const Package = require('../models/PackageModel');
const Image = require('../models/ImageModel'); // Import the Image model

// Define the one-to-many relationship
Package.hasMany(Image, { foreignKey: 'packageId', as: 'images' });
Image.belongsTo(Package, { foreignKey: 'packageId', as: 'package' });


// Get all packages with their associated images
const getPackage = () => Package.findAll({
    include: [{ model: Image, as: 'images' }] // Include associated images
});


// Find a package by ID with its associated images
const findPackageById = (id) => Package.findByPk(id, {
    include: [{ model: Image, as: 'images' }] // Include associated images
});


// Create a new package and its associated images
const createPackage = async (values, imageUrls) => {
    try {
        // Create the package
        const package = await Package.create(values);

        // If images are uploaded, create image records and link them to the package
        if (imageUrls && imageUrls.length > 0) {
            const images = imageUrls.map(url => ({
                url,
                packageId: package.id // Link the image to the package
            }));
            await Image.bulkCreate(images); // Create multiple images
        }
        // Fetch the package with its associated images
        const createdPackage = await Package.findByPk(package.id, {
            include: [{ model: Image, as: 'images' }] // Include associated images
        });

        return createdPackage;
    } catch (error) {
        console.error(error);
        throw new Error('Error creating package');
    }
};

// Update a package and its associated images
const updatePackageById = async (id, values, imageUrls) => {
    const [updateCount] = await Package.update(values, {
        where: { id }
    });

    if (updateCount === 0) return null;

    if (imageUrls && imageUrls.length > 0) {
        // Delete existing images for the package
        await Image.destroy({ where: { packageId: id } });

        // Create new images
        const images = imageUrls.map(url => ({ url, packageId: id }));
        await Image.bulkCreate(images);
    }

    return Package.findByPk(id, {
        include: [{ model: Image, as: 'images' }] // Include updated images
    });
};

// Delete a package and its associated images
const deletePackageById = async (id) => {
    // Delete associated images first
    await Image.destroy({ where: { packageId: id } });

    // Delete the package
    return Package.destroy({ where: { id } });
};

module.exports = {
    getPackage,
    findPackageById,
    createPackage,
    updatePackageById,
    deletePackageById
};