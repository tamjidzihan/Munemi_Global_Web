const StudentEnquiry = require('./StudentEnquiryModel');
const Address = require('./StudentEnquiryAddressModel');
const Agent = require('./AgentModel');
const AgentApplication = require('./AgentApplicationModel');

const setupAssociations = () => {
    try {
        // StudentEnquiry -> Address (One-to-Many)
        StudentEnquiry.hasMany(Address, {
            foreignKey: 'studentEnquiryId',
            as: 'addresses',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        Address.belongsTo(StudentEnquiry, {
            foreignKey: 'studentEnquiryId',
            as: 'studentEnquiry'
        });

        // Agent -> StudentEnquiry (One-to-Many)
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

        console.log('Database associations have been set up successfully.');
        return true;
    } catch (error) {
        console.error('Error setting up associations:', error);
        return false;
    }
};

module.exports = setupAssociations;