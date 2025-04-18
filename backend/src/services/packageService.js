const Package = require('../models/PackageModel')

const getPackage = () => Package.findAll();
const findPackageById = (id) => Package.findByPk(id);
const createPackage = (valuse) => Package.create(valuse);
const updatePackageById = async (id, valuse) => {
    const [updateCount] = await Package.update(valuse, {
        where: { id }
    });
    if (updateCount === 0) return null;
    return Package.findByPk(id)
};
const deletePackageById = (id) => Package.destroy({ where: { id } });

module.exports = {
    getPackage,
    findPackageById,
    createPackage,
    updatePackageById,
    deletePackageById
}