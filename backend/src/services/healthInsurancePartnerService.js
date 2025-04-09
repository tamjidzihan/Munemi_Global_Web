const HealthInsurancePartner = require('../models/HealthInsurancePartnerModel');

const getHealthInsurancePartners = () => HealthInsurancePartner.findAll();
const findHealthInsurancePartnerById = (id) => HealthInsurancePartner.findByPk(id);
const createHealthInsurancePartner = (values) => HealthInsurancePartner.create(values);
const updateHealthInsurancePartnerById = async (id, values) => {
    const [updateCount] = await HealthInsurancePartner.update(values, {
        where: { id }
    });
    return updateCount === 0 ? null : HealthInsurancePartner.findByPk(id);
};
const deleteHealthInsurancePartnerById = (id) => HealthInsurancePartner.destroy({ where: { id } });

module.exports = {
    getHealthInsurancePartners,
    findHealthInsurancePartnerById,
    createHealthInsurancePartner,
    updateHealthInsurancePartnerById,
    deleteHealthInsurancePartnerById
};