const AgentApplication = require('../models/AgentModel');

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

module.exports = {
    getAgentApplications,
    findAgentApplicationById,
    createAgentApplication,
    updateAgentApplicationById,
    deleteAgentApplicationById
};
