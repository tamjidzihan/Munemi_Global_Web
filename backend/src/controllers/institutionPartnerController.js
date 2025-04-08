// controllers/institutionPartnerController.js
const institutionPartnerService = require('../services/institutionPartnerService');

const getAllInstitutionPartners = async (req, res) => {
    try {
        const partners = await institutionPartnerService.getInstitutionPartners();
        res.status(200).json(partners);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching institution partners', error });
    }
};

const getInstitutionPartnerById = async (req, res) => {
    try {
        const { id } = req.params;
        const partner = await institutionPartnerService.findInstitutionPartnerById(id);
        if (!partner) return res.status(404).json({ message: 'Institution partner not found' });
        res.status(200).json(partner);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching institution partner', error });
    }
};

// controllers/institutionPartnerController.js
const createNewInstitutionPartner = async (req, res) => {
    try {
        const requiredFields = [
            'fullNameOfInstitute', 'category', 'coursesProviding',
            'businessRegistrationNumber', 'countryLocated', 'campusLocations',
            'primaryEmailAddress', 'firstName', 'lastName', 'position',
            'contactEmail', 'countryCode', 'phoneNumber'
        ];

        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        // Convert arrays to comma-separated strings
        const processedData = {
            ...req.body,
            coursesProviding: Array.isArray(req.body.coursesProviding)
                ? req.body.coursesProviding.join(',')
                : req.body.coursesProviding,
            campusLocations: Array.isArray(req.body.campusLocations)
                ? req.body.campusLocations.join(',')
                : req.body.campusLocations
        };

        if (processedData.coursesProviding.includes('Others') && !processedData.otherCourses) {
            return res.status(400).json({
                message: 'Other courses description is required when selecting "Others"'
            });
        }

        const newPartner = await institutionPartnerService.createInstitutionPartner(processedData);
        res.status(201).json(newPartner);
    } catch (error) {
        res.status(500).json({ message: 'Error creating institution partner', error });
    }
};

const updateInstitutionPartner = async (req, res) => {
    try {
        const { id } = req.params;
        const partner = await institutionPartnerService.findInstitutionPartnerById(id);
        if (!partner) return res.status(404).json({ message: 'Institution partner not found' });

        // Convert arrays to comma-separated strings
        const processedData = {
            ...req.body,
            coursesProviding: Array.isArray(req.body.coursesProviding)
                ? req.body.coursesProviding.join(',')
                : req.body.coursesProviding,
            campusLocations: Array.isArray(req.body.campusLocations)
                ? req.body.campusLocations.join(',')
                : req.body.campusLocations
        };

        if (processedData.coursesProviding?.includes('Others') && !processedData.otherCourses) {
            return res.status(400).json({
                message: 'Other courses description is required when selecting "Others"'
            });
        }

        const updatedPartner = await institutionPartnerService.updateInstitutionPartnerById(id, processedData);
        if (!updatedPartner) return res.status(400).json({ message: 'No changes made' });

        res.status(200).json(updatedPartner);
    } catch (error) {
        res.status(500).json({ message: 'Error updating institution partner', error });
    }
};

const deleteInstitutionPartner = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await institutionPartnerService.deleteInstitutionPartnerById(id);
        if (!deleted) return res.status(404).json({ message: 'Institution partner not found' });
        res.status(200).json({ message: 'Institution partner deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting institution partner', error });
    }
};

module.exports = {
    getAllInstitutionPartners,
    getInstitutionPartnerById,
    createNewInstitutionPartner,
    updateInstitutionPartner,
    deleteInstitutionPartner
};