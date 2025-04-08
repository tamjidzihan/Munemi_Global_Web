const agentService = require('../services/agentService');


const getAllAgentApplications = async (req, res) => {
    try {
        const applications = await agentService.getAgentApplications();
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching agent applications', error });
    }
};

const getAgentApplicationById = async (req, res) => {
    try {
        const { id } = req.params;
        const application = await agentService.findAgentApplicationById(id);
        if (!application) return res.status(404).json({ message: 'Agent application not found' });
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching agent application', error });
    }
};

const createNewAgentApplication = async (req, res) => {
    try {
        const {
            tradingName,
            businessRegistrationNumber,
            companyPhone,
            country,
            emailAddress,
            applyingAs,
            primaryOfficeLocation,
            currentAddress,
            website,
            firstName,
            position,
            lastName,
            personalPhone,
            personalEmail
        } = req.body;

        if (!tradingName || !businessRegistrationNumber || !companyPhone || !country || !emailAddress || !applyingAs || !primaryOfficeLocation || !currentAddress || !firstName || !position || !lastName || !personalPhone || !personalEmail) {
            return res.status(400).json({ message: "Please fill out all required fields" });
        }

        if (!["Sub-Agent", "Super-Agent"].includes(applyingAs)) {
            return res.status(400).json({ message: "Invalid Applying Post type" });
        }


        const newApplication = await agentService.createAgentApplication({
            tradingName,
            businessRegistrationNumber,
            companyPhone,
            country,
            emailAddress,
            applyingAs,
            primaryOfficeLocation,
            currentAddress,
            website,
            firstName,
            position,
            lastName,
            personalPhone,
            personalEmail
        });

        res.status(201).json(newApplication);
    } catch (error) {
        res.status(500).json({ message: 'Error creating agent application', error });
    }
};

const updateAgentApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const {
            tradingName,
            businessRegistrationNumber,
            companyPhone,
            country,
            emailAddress,
            applyingAs,
            primaryOfficeLocation,
            currentAddress,
            firstName,
            position,
            lastName,
            personalPhone,
            personalEmail
        } = updateData;

        // Check for required fields
        if (
            !tradingName ||
            !businessRegistrationNumber ||
            !companyPhone ||
            !country ||
            !emailAddress ||
            !applyingAs ||
            !primaryOfficeLocation ||
            !currentAddress ||
            !firstName ||
            !position ||
            !lastName ||
            !personalPhone ||
            !personalEmail
        ) {
            return res.status(400).json({ message: "Please fill out all required fields" });
        }

        // Validate 'applyingAs'
        if (!["Sub-Agent", "Super-Agent"].includes(applyingAs)) {
            return res.status(400).json({ message: "Invalid Applying Post type" });
        }

        const application = await agentService.findAgentApplicationById(id);
        if (!application) {
            return res.status(404).json({ message: 'Agent application not found' });
        }

        const updatedApplication = await agentService.updateAgentApplicationById(id, updateData);
        if (!updatedApplication) {
            return res.status(400).json({ message: 'No changes made to the application' });
        }

        res.status(200).json(updatedApplication);
    } catch (error) {
        res.status(500).json({ message: 'Error updating agent application', error });
    }
};

const deleteAgentApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const application = await agentService.findAgentApplicationById(id);

        if (!application) {
            return res.status(404).json({ message: 'Agent application not found' });
        }

        const deleted = await agentService.deleteAgentApplicationById(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Agent application not found' });
        }

        res.status(200).json({ message: 'Agent application deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting agent application', error });
    }
};

module.exports = {
    getAllAgentApplications,
    getAgentApplicationById,
    createNewAgentApplication,
    updateAgentApplication,
    deleteAgentApplication
};