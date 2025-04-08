const agentController = require('../controllers/agentController');


module.exports = (router) => {
    router.get('/agent_applications', agentController.getAllAgentApplications);
    router.get('/agent_applications/:id', agentController.getAgentApplicationById);
    router.post('/agent_applications', agentController.createNewAgentApplication);
    router.put('/agent_applications/:id', agentController.updateAgentApplication);
    router.delete('/agent_applications/:id', agentController.deleteAgentApplication)
}