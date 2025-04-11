const agentController = require('../controllers/agentController');

module.exports = (router) => {
    router.get('/agent-applications', agentController.getAllAgentApplications);
    router.get('/agent-applications/:id', agentController.getAgentApplicationById);
    router.post('/agent-applications', agentController.createNewAgentApplication);
    router.put('/agent-applications/:id', agentController.updateAgentApplication);
    router.delete('/agent-applications/:id', agentController.deleteAgentApplication)
}