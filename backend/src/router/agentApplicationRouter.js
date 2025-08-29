// src/router/agentApplicationRouter.js
const agentApplicationController = require('../controllers/agentApplicationController');

module.exports = (router) => {
    router.get('/agent-applications', agentApplicationController.getAllAgentApplications);
    router.get('/agent-applications/:id', agentApplicationController.getAgentApplicationById);
    router.post('/agent-applications', agentApplicationController.createNewAgentApplication);
    router.put('/agent-applications/:id', agentApplicationController.updateAgentApplication);
    router.delete('/agent-applications/:id', agentApplicationController.deleteAgentApplication);
    router.patch('/agent-applications/:id/approve', agentApplicationController.approveAgentApplication);
    router.patch('/agent-applications/:id/reject', agentApplicationController.rejectAgentApplication);
    router.get('/agent-applications-stats', agentApplicationController.getApplicationStats);
    router.get('/agent-applications-status/:status', agentApplicationController.getApplicationsByStatus);
};