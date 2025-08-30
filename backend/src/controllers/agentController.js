const AgentService = require('../services/agentService');
const AgentApplicationsService = require('../services/agentApplicationService')

// Get all agents
const getAllAgents = async (req, res) => {
    try {
        const { page = 1, limit = 10, isActive, applyingAs } = req.query;

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            where: {}
        };

        if (isActive !== undefined) {
            options.where.isActive = isActive === 'true';
        }

        if (applyingAs) {
            options.where.applyingAs = applyingAs;
        }

        const agents = await AgentService.getAllAgents(options);

        res.status(200).json({
            success: true,
            data: agents,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: agents.length
            }
        });
    } catch (error) {
        console.error('Error fetching agents:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error while fetching agents",
            error: error.message
        });
    }
};

// Get agent by ID
const getAgentById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Agent ID is required"
            });
        }

        const agent = await AgentService.getAgentById(id);

        if (!agent) {
            return res.status(404).json({
                success: false,
                message: "Agent not found"
            });
        }

        res.status(200).json({
            success: true,
            data: agent
        });
    } catch (error) {
        console.error('Error fetching agent:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error while fetching agent",
            error: error.message
        });
    }
};

const getAgentBybusinessRegistrationNumber = async (req, res) => {
    try {
        const { registrationnumber } = req.params;

        // First check if there's an active agent
        const agent = await AgentService.getAgentBybusinessRegistrationNumber(registrationnumber);

        // If agent exists and is active, return the agent data
        if (agent && agent.isActive) {
            return res.status(200).json({
                success: true,
                message: "Agent is approved and active",
                data: agent
            });
        }

        // Check if there are any pending or rejected applications
        const agentApplication = await AgentApplicationsService.getAgentApplicationsByBusinessRegistrationNumber(registrationnumber);

        if (agentApplication) {
            if (agentApplication.status === 'pending') {
                return res.status(200).json({
                    success: false,
                    message: "Agent application is pending approval",
                    applicationStatus: 'pending'
                });
            } else if (agentApplication.status === 'rejected') {
                return res.status(200).json({
                    success: false,
                    message: `Agent application was rejected. Reason: ${agentApplication.rejectionReason || 'No reason provided'}`,
                    applicationStatus: 'rejected',
                    rejectionReason: agentApplication.rejectionReason
                });
            }
        }
        // If nothing found
        return res.status(404).json({
            success: false,
            message: "No agent or application found for this Registration Number"
        });

    } catch (error) {
        console.error('Error fetching agent:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error while fetching agent",
            error: error.message
        });
    }
}



// Get agent by application ID
const getAgentByApplicationId = async (req, res) => {
    try {
        const { applicationId } = req.params;

        if (!applicationId) {
            return res.status(400).json({
                success: false,
                message: "Application ID is required"
            });
        }

        const agent = await AgentService.getAgentByApplicationId(applicationId);

        if (!agent) {
            return res.status(404).json({
                success: false,
                message: "Agent not found for this application"
            });
        }

        res.status(200).json({
            success: true,
            data: agent
        });
    } catch (error) {
        console.error('Error fetching agent by application:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error while fetching agent",
            error: error.message
        });
    }
};

// Get active agents
const getActiveAgents = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const agents = await AgentService.getActiveAgents();

        // Simple pagination
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedAgents = agents.slice(startIndex, endIndex);

        res.status(200).json({
            success: true,
            data: paginatedAgents,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: agents.length,
                totalPages: Math.ceil(agents.length / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching active agents:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error while fetching active agents",
            error: error.message
        });
    }
};

// Update agent
const updateAgent = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Agent ID is required"
            });
        }

        // Validate commission rate if provided
        if (updateData.commissionRate !== undefined) {
            if (updateData.commissionRate < 0 || updateData.commissionRate > 100) {
                return res.status(400).json({
                    success: false,
                    message: "Commission rate must be between 0 and 100"
                });
            }
        }

        const updatedAgent = await AgentService.updateAgentById(id, updateData);

        if (!updatedAgent) {
            return res.status(404).json({
                success: false,
                message: "Agent not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Agent updated successfully",
            data: updatedAgent
        });
    } catch (error) {
        console.error('Error updating agent:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error while updating agent",
            error: error.message
        });
    }
};

// Deactivate agent
const deactivateAgent = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Agent ID is required"
            });
        }

        const deactivatedAgent = await AgentService.deactivateAgent(id);

        if (!deactivatedAgent) {
            return res.status(404).json({
                success: false,
                message: "Agent not found or already inactive"
            });
        }

        res.status(200).json({
            success: true,
            message: "Agent deactivated successfully",
            data: deactivatedAgent
        });
    } catch (error) {
        console.error('Error deactivating agent:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error while deactivating agent",
            error: error.message
        });
    }
};

// Activate agent
const activateAgent = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Agent ID is required"
            });
        }

        const activatedAgent = await AgentService.activateAgent(id);

        if (!activatedAgent) {
            return res.status(404).json({
                success: false,
                message: "Agent not found or already active"
            });
        }

        res.status(200).json({
            success: true,
            message: "Agent activated successfully",
            data: activatedAgent
        });
    } catch (error) {
        console.error('Error activating agent:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error while activating agent",
            error: error.message
        });
    }
};

// Delete agent
const deleteAgent = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Agent ID is required"
            });
        }

        const result = await AgentService.deleteAgentById(id);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Agent not found or cannot be deleted"
            });
        }

        res.status(200).json({
            success: true,
            message: "Agent deleted successfully"
        });
    } catch (error) {
        console.error('Error deleting agent:', error);

        if (error.message.includes('existing student enquiries')) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal server error while deleting agent",
            error: error.message
        });
    }
};

// Update commission rate
const updateCommissionRate = async (req, res) => {
    try {
        const { id } = req.params;
        const { commissionRate } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Agent ID is required"
            });
        }

        if (commissionRate === undefined) {
            return res.status(400).json({
                success: false,
                message: "Commission rate is required"
            });
        }

        if (commissionRate < 0 || commissionRate > 100) {
            return res.status(400).json({
                success: false,
                message: "Commission rate must be between 0 and 100"
            });
        }

        const updatedAgent = await AgentService.updateCommissionRate(id, commissionRate);

        if (!updatedAgent) {
            return res.status(404).json({
                success: false,
                message: "Agent not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Commission rate updated successfully",
            data: updatedAgent
        });
    } catch (error) {
        console.error('Error updating commission rate:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error while updating commission rate",
            error: error.message
        });
    }
};

// Increment students referred
const incrementStudentsReferred = async (req, res) => {
    try {
        const { id } = req.params;
        const { count = 1 } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Agent ID is required"
            });
        }

        if (count < 1) {
            return res.status(400).json({
                success: false,
                message: "Count must be at least 1"
            });
        }

        const updatedAgent = await AgentService.incrementStudentsReferred(id, count);

        if (!updatedAgent) {
            return res.status(404).json({
                success: false,
                message: "Agent not found"
            });
        }

        res.status(200).json({
            success: true,
            message: `Students referred count incremented by ${count}`,
            data: updatedAgent
        });
    } catch (error) {
        console.error('Error incrementing students referred:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error while updating students referred count",
            error: error.message
        });
    }
};

// Search agents
const searchAgents = async (req, res) => {
    try {
        const {
            tradingName,
            emailAddress,
            country,
            applyingAs,
            isActive,
            page = 1,
            limit = 10
        } = req.query;

        const searchCriteria = {
            tradingName,
            emailAddress,
            country,
            applyingAs,
            isActive: isActive !== undefined ? isActive === 'true' : undefined
        };

        const agents = await AgentService.searchAgents(searchCriteria);

        // Simple pagination
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedAgents = agents.slice(startIndex, endIndex);

        res.status(200).json({
            success: true,
            data: paginatedAgents,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: agents.length,
                totalPages: Math.ceil(agents.length / limit)
            }
        });
    } catch (error) {
        console.error('Error searching agents:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error while searching agents",
            error: error.message
        });
    }
};

// Get agent statistics
const getAgentStats = async (req, res) => {
    try {
        const stats = await AgentService.getAgentStats();

        res.status(200).json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('Error fetching agent statistics:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error while fetching agent statistics",
            error: error.message
        });
    }
};

// Get top performing agents
const getTopPerformingAgents = async (req, res) => {
    try {
        const { limit = 10 } = req.query;

        const topAgents = await AgentService.getTopPerformingAgents(parseInt(limit));

        res.status(200).json({
            success: true,
            data: topAgents
        });
    } catch (error) {
        console.error('Error fetching top performing agents:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error while fetching top performing agents",
            error: error.message
        });
    }
};

// Get agent with application details
const getAgentWithApplication = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Agent ID is required"
            });
        }

        const agent = await AgentService.getAgentWithApplication(id);

        if (!agent) {
            return res.status(404).json({
                success: false,
                message: "Agent not found"
            });
        }

        res.status(200).json({
            success: true,
            data: agent
        });
    } catch (error) {
        console.error('Error fetching agent with application:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error while fetching agent details",
            error: error.message
        });
    }
};

module.exports = {
    getAllAgents,
    getAgentById,
    getAgentByApplicationId,
    getAgentBybusinessRegistrationNumber,
    getActiveAgents,
    updateAgent,
    deactivateAgent,
    activateAgent,
    deleteAgent,
    updateCommissionRate,
    incrementStudentsReferred,
    searchAgents,
    getAgentStats,
    getTopPerformingAgents,
    getAgentWithApplication
};