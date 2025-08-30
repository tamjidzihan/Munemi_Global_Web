const Agent = require('../models/AgentModel');
const AgentApplication = require('../models/AgentApplicationModel');
const StudentEnquiry = require('../models/StudentEnquiryModel')
const { Op } = require('sequelize');

Agent.hasMany(StudentEnquiry, {
    foreignKey: 'agentId',
    as: 'studentEnquiries',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

StudentEnquiry.belongsTo(Agent, {
    foreignKey: 'agentId',
    as: 'agent'
});

const getAllAgents = (options = {}) =>
    Agent.findAll({
        ...options,
        include: [{
            model: AgentApplication,
            as: 'application',
            attributes: ['status', 'approvedAt', 'approvedBy']
        }]
    });

const getAgentById = (id, options = {}) =>
    Agent.findByPk(id, {
        ...options,
        include: [{
            model: AgentApplication,
            as: 'application'
        }]
    });

const getAgentByApplicationId = (applicationId) =>
    Agent.findOne({
        where: { applicationId },
        include: [{
            model: AgentApplication,
            as: 'application'
        }]
    });

const getActiveAgents = () =>
    Agent.findAll({
        where: { isActive: true },
        include: [{
            model: AgentApplication,
            as: 'application',
            where: { status: 'approved' }
        }]
    });

const getAgentBybusinessRegistrationNumber = (businessRegistrationNumber) =>
    Agent.findOne({
        where: { businessRegistrationNumber }
    })

const createAgent = async (agentData) => {
    // Check if application already has an agent
    const existingAgent = await Agent.findOne({
        where: { applicationId: agentData.applicationId }
    });

    if (existingAgent) {
        throw new Error('An agent already exists for this application');
    }

    // Verify the application is approved
    const application = await AgentApplication.findByPk(agentData.applicationId);
    if (!application || application.status !== 'approved') {
        throw new Error('Cannot create agent for non-approved application');
    }

    return Agent.create(agentData);
};

const updateAgentById = async (id, values) => {
    const [updateCount] = await Agent.update(values, {
        where: { id }
    });

    if (updateCount === 0) return null;

    return Agent.findByPk(id);
};

const deactivateAgent = async (id) => {
    const [updateCount] = await Agent.update(
        { isActive: false },
        { where: { id, isActive: true } }
    );

    if (updateCount === 0) return null;

    return Agent.findByPk(id);
};

const activateAgent = async (id) => {
    const [updateCount] = await Agent.update(
        { isActive: true },
        { where: { id, isActive: false } }
    );

    if (updateCount === 0) return null;

    return Agent.findByPk(id);
};

const deleteAgentById = async (id) => {
    // Check if agent has any student enquiries before deletion
    const agent = await Agent.findByPk(id, {
        include: [{
            association: 'studentEnquiries',
            attributes: ['id']
        }]
    });

    if (agent && agent.studentEnquiries && agent.studentEnquiries.length > 0) {
        throw new Error('Cannot delete agent with existing student enquiries');
    }

    return Agent.destroy({ where: { id } });
};

const updateCommissionRate = async (id, commissionRate) => {
    if (commissionRate < 0 || commissionRate > 100) {
        throw new Error('Commission rate must be between 0 and 100');
    }

    const [updateCount] = await Agent.update(
        { commissionRate },
        { where: { id } }
    );

    if (updateCount === 0) return null;

    return Agent.findByPk(id);
};

const incrementStudentsReferred = async (id, count = 1) => {
    const agent = await Agent.findByPk(id);
    if (!agent) {
        throw new Error('Agent not found');
    }

    const newCount = agent.totalStudentsReferred + count;
    const [updateCount] = await Agent.update(
        { totalStudentsReferred: newCount },
        { where: { id } }
    );

    if (updateCount === 0) return null;

    return Agent.findByPk(id);
};

const searchAgents = async (searchCriteria) => {
    const {
        tradingName,
        emailAddress,
        country,
        applyingAs,
        isActive
    } = searchCriteria;

    const whereClause = {};

    // Convert search terms to lowercase for case-insensitive search
    if (tradingName) whereClause.tradingName = {
        [Op.like]: `%${tradingName.toLowerCase()}%`
    };
    if (emailAddress) whereClause.emailAddress = {
        [Op.like]: `%${emailAddress.toLowerCase()}%`
    };
    if (country) whereClause.country = {
        [Op.like]: `%${country.toLowerCase()}%`
    };
    if (applyingAs) whereClause.applyingAs = applyingAs;
    if (isActive !== undefined) whereClause.isActive = isActive;

    return Agent.findAll({
        where: whereClause,
        order: [['createdAt', 'DESC']]
    });
};

const getAgentStats = async () => {
    const totalAgents = await Agent.count();
    const activeAgents = await Agent.count({ where: { isActive: true } });
    const superAgents = await Agent.count({ where: { applyingAs: 'Super-Agent' } });
    const subAgents = await Agent.count({ where: { applyingAs: 'Sub-Agent' } });

    const totalStudents = await Agent.sum('totalStudentsReferred');

    return {
        totalAgents,
        activeAgents,
        inactiveAgents: totalAgents - activeAgents,
        superAgents,
        subAgents,
        totalStudentsReferred: totalStudents || 0
    };
};

const getTopPerformingAgents = async (limit = 10) => {
    return Agent.findAll({
        where: { isActive: true },
        order: [['totalStudentsReferred', 'DESC']],
        limit: limit,
        include: [{
            model: AgentApplication,
            as: 'application',
            attributes: ['approvedAt']
        }]
    });
};

module.exports = {
    getAllAgents,
    getAgentById,
    getAgentByApplicationId,
    getActiveAgents,
    getAgentBybusinessRegistrationNumber,
    createAgent,
    updateAgentById,
    deactivateAgent,
    activateAgent,
    deleteAgentById,
    updateCommissionRate,
    incrementStudentsReferred,
    searchAgents,
    getAgentStats,
    getTopPerformingAgents
};