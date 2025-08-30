// src/router/agentRouter.js
const {
    getAllAgents,
    getAgentById,
    getAgentByApplicationId,
    getActiveAgents,
    updateAgent,
    deactivateAgent,
    activateAgent,
    deleteAgent,
    updateCommissionRate,
    incrementStudentsReferred,
    getAgentBybusinessRegistrationNumber,
    searchAgents,
    getAgentStats,
    getTopPerformingAgents,
    getAgentWithApplication
} = require('../controllers/agentController');

module.exports = (router) => {
    // Get all agents with optional filtering
    router.get('/agents', getAllAgents);

    // Get active agents
    router.get('/agents/active', getActiveAgents);

    // Get agent statistics
    router.get('/agents/stats', getAgentStats);

    // Get top performing agents
    router.get('/agents/top-performing', getTopPerformingAgents);

    // Search agents
    router.get('/agents/search', searchAgents);

    // Get agent by ID
    router.get('/agents/:id', getAgentById);

    // Get agent by BybusinessRegistrationNumber
    router.get('/agents-registration-number/:registrationnumber', getAgentBybusinessRegistrationNumber);

    // Get agent by application ID
    router.get('/agents/application/:applicationId', getAgentByApplicationId);

    // Get agent with full application details
    router.get('/agents/:id/full', getAgentWithApplication);

    // Update agent details
    router.put('/agents/:id', updateAgent);

    // Update agent commission rate
    router.put('/agents/:id/commission', updateCommissionRate);

    // Increment students referred count
    router.put('/agents/:id/increment-students', incrementStudentsReferred);

    // Deactivate agent
    router.put('/agents/:id/deactivate', deactivateAgent);

    // Activate agent
    router.put('/agents/:id/activate', activateAgent);

    // Delete agent
    router.delete('/agents/:id', deleteAgent);
};