const AgentApplicationService = require('../services/agentApplicationService');

const getAllAgentApplications = async (req, res) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;

        let applications;
        if (status) {
            applications = await AgentApplicationService.getAgentApplicationsByStatus(status);
        } else {
            applications = await AgentApplicationService.getAgentApplications();
        }

        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching agent applications', error: error.message });
    }
};

const getAgentApplicationById = async (req, res) => {
    try {
        const { id } = req.params;
        const application = await AgentApplicationService.findAgentApplicationById(id);
        if (!application) return res.status(404).json({ message: 'Agent application not found' });

        // Check if agent profile exists for approved applications
        if (application.status === 'approved') {
            const agentProfile = await AgentApplicationService.getAgentByApplicationId(id);
            application.dataValues.agentProfile = agentProfile;
        }

        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching agent application', error: error.message });
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

        // Validation
        const requiredFields = [
            'tradingName', 'businessRegistrationNumber', 'companyPhone', 'country',
            'emailAddress', 'applyingAs', 'primaryOfficeLocation', 'currentAddress',
            'firstName', 'position', 'lastName', 'personalPhone', 'personalEmail'
        ];

        const missingFields = requiredFields.filter(field => !req.body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({
                message: "Please fill out all required fields",
                missingFields
            });
        }

        if (!["Sub-Agent", "Super-Agent"].includes(applyingAs)) {
            return res.status(400).json({ message: "Invalid Applying Post type" });
        }

        // Check if email already exists in pending or approved applications
        const existingApplication = await AgentApplicationService.getAgentApplicationsByStatus(['pending', 'approved']);
        const businessRegistrationNumberExists = existingApplication.some(app =>
            app.businessRegistrationNumber === businessRegistrationNumber
        );

        if (businessRegistrationNumberExists) {
            return res.status(400).json({ message: "An application with this business Registration Number already exists" });
        }

        const newApplication = await AgentApplicationService.createAgentApplication({
            tradingName,
            businessRegistrationNumber,
            companyPhone,
            country,
            emailAddress,
            applyingAs,
            primaryOfficeLocation,
            currentAddress,
            website: website || null,
            firstName,
            position,
            lastName,
            personalPhone,
            personalEmail
        });

        res.status(201).json({
            message: 'Agent application submitted successfully',
            application: newApplication
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating agent application', error: error.message });
    }
};

const updateAgentApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Check if application exists
        const existingApplication = await AgentApplicationService.findAgentApplicationById(id);
        if (!existingApplication) {
            return res.status(404).json({ message: 'Agent application not found' });
        }

        // Prevent updates to approved applications
        if (existingApplication.status === 'approved') {
            return res.status(400).json({ message: 'Cannot update an approved application' });
        }

        // Validate applyingAs if provided
        if (updateData.applyingAs && !["Sub-Agent", "Super-Agent"].includes(updateData.applyingAs)) {
            return res.status(400).json({ message: "Invalid Applying Post type" });
        }

        const updatedApplication = await AgentApplicationService.updateAgentApplicationById(id, updateData);
        if (!updatedApplication) {
            return res.status(400).json({ message: 'No changes made to the application' });
        }

        res.status(200).json({
            message: 'Agent application updated successfully',
            application: updatedApplication
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating agent application', error: error.message });
    }
};

const deleteAgentApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const application = await AgentApplicationService.findAgentApplicationById(id);

        if (!application) {
            return res.status(404).json({ message: 'Agent application not found' });
        }

        // Prevent deletion of approved applications
        if (application.status === 'approved') {
            return res.status(400).json({ message: 'Cannot delete an approved application. To delete application please first reject the approved application.' });
        }

        const deleted = await AgentApplicationService.deleteAgentApplicationById(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Agent application not found' });
        }

        res.status(200).json({ message: 'Agent application deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting agent application', error: error.message });
    }
};

const approveAgentApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const { approvedBy } = req.body; // Assuming admin user ID from auth middleware

        if (!approvedBy) {
            return res.status(400).json({ message: 'Approver ID is required' });
        }

        const result = await AgentApplicationService.approveAgentApplicationAdmin(id, approvedBy);

        res.status(200).json({
            message: 'Agent application approved successfully',
            application: result.application,
            agent: result.agent
        });
    } catch (error) {
        if (error.message.includes('already approved')) {
            return res.status(400).json({ message: error.message });
        }
        if (error.message.includes('not found')) {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Error approving agent application', error: error.message });
    }
};

const rejectAgentApplication = async (req, res) => {
    try {
        const { id } = req.params;
        const { rejectedBy, reason } = req.body;

        if (!rejectedBy) {
            return res.status(400).json({
                message: 'Rejecter ID and reason are required',
                required: 'rejectedBy'
            });
        }

        const application = await AgentApplicationService.rejectAgentApplicationAdmin(id, rejectedBy, reason);

        res.status(200).json({
            message: 'Agent application rejected successfully',
            application
        });
    } catch (error) {
        if (error.message.includes('already rejected')) {
            return res.status(400).json({ message: error.message });
        }
        if (error.message.includes('not found')) {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Error rejecting agent application', error: error.message });
    }
};

const getApplicationStats = async (req, res) => {
    try {
        const stats = {
            pending: await AgentApplicationService.getAgentApplicationsByStatus('pending').length,
            approved: await AgentApplicationService.getAgentApplicationsByStatus('approved').length,
            rejected: await AgentApplicationService.getAgentApplicationsByStatus('rejected').length,
            total: (await AgentApplicationService.getAgentApplications()).length
        };

        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching application statistics', error: error.message });
    }
};

const getApplicationsByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const { page = 1, limit = 10 } = req.query;
        console.log(status)

        if (!['pending', 'approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status type' });
        }

        const applications = await AgentApplicationService.getAgentApplicationsByStatus(status);

        res.status(200).json({
            status,
            count: applications.length,
            applications
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching applications by status', error: error.message });
    }
};

module.exports = {
    getAllAgentApplications,
    getAgentApplicationById,
    createNewAgentApplication,
    updateAgentApplication,
    deleteAgentApplication,
    approveAgentApplication,
    rejectAgentApplication,
    getApplicationStats,
    getApplicationsByStatus
};