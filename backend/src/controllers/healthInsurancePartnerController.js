// controllers/healthInsurancePartnerController.js
const healthInsurancePartnerService = require('../services/healthInsurancePartnerService')
const getAllHealthInsurancePartners = async (req, res) => {
    try {
        const partners = await healthInsurancePartnerService.getHealthInsurancePartners();
        res.status(200).json(partners);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching health insurance partners', error });
    }
};

const getHealthInsurancePartnerById = async (req, res) => {
    try {
        const { id } = req.params;
        const partner = await healthInsurancePartnerService.findHealthInsurancePartnerById(id);
        if (!partner) return res.status(404).json({ message: 'Health insurance partner not found' });
        res.status(200).json(partner);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching health insurance partner', error });
    }
};

const createNewHealthInsurancePartner = async (req, res) => {
    try {
        const requiredFields = [
            'tradingName', 'businessRegistrationNumber', 'officePhoneNumber',
            'countryLocated', 'primaryOfficeLocation', 'applyingAs',
            'firstName', 'lastName', 'position', 'contactEmail',
            'contactCountryCode', 'contactPhoneNumber'
        ];

        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        if (req.body.applyingAs === 'Other' && !req.body.otherInsuranceType) {
            return res.status(400).json({
                message: 'Other insurance type is required when selecting "Other"'
            });
        }

        const newPartner = await healthInsurancePartnerService.createHealthInsurancePartner(req.body);
        res.status(201).json(newPartner);
    } catch (error) {
        res.status(500).json({ message: 'Error creating health insurance partner', error });
    }
};

const updateHealthInsurancePartner = async (req, res) => {
    try {
        const { id } = req.params;
        const partner = await healthInsurancePartnerService.findHealthInsurancePartnerById(id);
        if (!partner) return res.status(404).json({ message: 'Health insurance partner not found' });

        if (req.body.applyingAs === 'Other' && !req.body.otherInsuranceType) {
            return res.status(400).json({
                message: 'Other insurance type is required when selecting "Other"'
            });
        }

        const updatedPartner = await healthInsurancePartnerService.updateHealthInsurancePartnerById(id, req.body);
        if (!updatedPartner) return res.status(400).json({ message: 'No changes made' });

        res.status(200).json(updatedPartner);
    } catch (error) {
        res.status(500).json({ message: 'Error updating health insurance partner', error });
    }
};

const deleteHealthInsurancePartner = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await healthInsurancePartnerService.deleteHealthInsurancePartnerById(id);
        if (!deleted) return res.status(404).json({ message: 'Health insurance partner not found' });
        res.status(200).json({ message: 'Health insurance partner deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting health insurance partner', error });
    }
};

module.exports = {
    getAllHealthInsurancePartners,
    getHealthInsurancePartnerById,
    createNewHealthInsurancePartner,
    updateHealthInsurancePartner,
    deleteHealthInsurancePartner
};