const { sequelize } = require('../utils/database');
const AgentApplication = require('../models/AgentApplicationModel');
const Agent = require('../models/AgentModel');
const { Op } = require('sequelize');

// AgentApplication -> Agent (One-to-One)
AgentApplication.hasOne(Agent, {
    foreignKey: 'applicationId',
    as: 'agentProfile',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Agent.belongsTo(AgentApplication, {
    foreignKey: 'applicationId',
    as: 'application'
});


const getAgentApplications = () => AgentApplication.findAll();
const findAgentApplicationById = (id) => AgentApplication.findByPk(id);
const createAgentApplication = (values) => AgentApplication.create(values);

const updateAgentApplicationById = async (id, values) => {
    const [updateCount] = await AgentApplication.update(values, {
        where: { id }
    });
    if (updateCount === 0) return null;
    return AgentApplication.findByPk(id);
};

const deleteAgentApplicationById = (id) =>
    AgentApplication.destroy({ where: { id } });

// New function to approve agent application and create Agent record
const approveAgentApplicationAdmin = async (applicationId, approvedBy) => {
    const transaction = await sequelize.transaction();

    try {
        // 1. Update the application status
        const application = await AgentApplication.findByPk(applicationId, { transaction });
        if (!application) {
            throw new Error('Application not found');
        }

        if (application.status === 'approved') {
            throw new Error('Application is already approved');
        }

        application.status = 'approved';
        application.approvedAt = new Date();
        application.approvedBy = approvedBy;
        application.rejectionReason = ''
        await application.save({ transaction });

        // 2. Create Agent record
        const agentData = {
            applicationId: application.id,
            tradingName: application.tradingName,
            businessRegistrationNumber: application.businessRegistrationNumber,
            companyPhone: application.companyPhone,
            country: application.country,
            emailAddress: application.emailAddress,
            applyingAs: application.applyingAs,
            primaryOfficeLocation: application.primaryOfficeLocation,
            currentAddress: application.currentAddress,
            website: application.website,
            firstName: application.firstName,
            position: application.position,
            lastName: application.lastName,
            personalPhone: application.personalPhone,
            personalEmail: application.personalEmail
        };

        const agent = await Agent.create(agentData, { transaction });

        await transaction.commit();
        return { application, agent };

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// New function to reject agent application
const rejectAgentApplicationAdmin = async (applicationId, rejectedBy, reason) => {
    const application = await AgentApplication.findByPk(applicationId);
    if (!application) {
        throw new Error('Application not found');
    }

    if (application.status === 'rejected') {
        throw new Error('Application is already rejected');
    }

    await Agent.destroy({
        where: {
            applicationId: applicationId
        }
    })



    application.rejectionReason = reason
    application.status = 'rejected';
    await application.save();

    return application;
};

// New function to get applications by Business Registration Number
const getAgentApplicationsByBusinessRegistrationNumber = (businessRegistrationNumber) =>
    AgentApplication.findOne({
        where: {
            businessRegistrationNumber,
            status: {
                [Op.in]: ['pending', 'rejected']
            }
        }
    });


// New function to get applications by status
const getAgentApplicationsByStatus = (status) =>
    AgentApplication.findAll({ where: { status } });

// New function to check if agent exists by application ID
const getAgentByApplicationId = async (applicationId) => {
    const application = await AgentApplication.findByPk(applicationId);
    if (!application || application.status !== 'approved') {
        return null;
    }

    return Agent.findOne({ where: { applicationId } });
};

// New function to get all approved agents
const getAllApprovedAgents = () =>
    Agent.findAll({
        include: [{
            model: AgentApplication,
            as: 'application',
            where: { status: 'approved' }
        }]
    });

// New function to get agent by ID with application details
const getAgentWithApplication = (agentId) =>
    Agent.findByPk(agentId, {
        include: [{
            model: AgentApplication,
            as: 'application'
        }]
    });

module.exports = {
    getAgentApplications,
    findAgentApplicationById,
    createAgentApplication,
    updateAgentApplicationById,
    deleteAgentApplicationById,
    approveAgentApplicationAdmin,
    rejectAgentApplicationAdmin,
    getAgentApplicationsByStatus,
    getAgentByApplicationId,
    getAllApprovedAgents,
    getAgentWithApplication,
    getAgentApplicationsByBusinessRegistrationNumber
};