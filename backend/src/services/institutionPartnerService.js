const InstitutionPartner = require('../models/InstitutionPartnerModel');

const getInstitutionPartners = () => InstitutionPartner.findAll();
const findInstitutionPartnerById = (id) => InstitutionPartner.findByPk(id);
const createInstitutionPartner = (values) => InstitutionPartner.create(values);
const updateInstitutionPartnerById = async (id, values) => {
    const [updateCount] = await InstitutionPartner.update(values, {
        where: { id }
    });
    return updateCount === 0 ? null : InstitutionPartner.findByPk(id);
};
const deleteInstitutionPartnerById = (id) => InstitutionPartner.destroy({ where: { id } });

module.exports = {
    getInstitutionPartners,
    findInstitutionPartnerById,
    createInstitutionPartner,
    updateInstitutionPartnerById,
    deleteInstitutionPartnerById
};