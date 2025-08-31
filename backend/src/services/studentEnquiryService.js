const StudentEnquiry = require("../models/StudentEnquiryModel");
const Agent = require("../models/AgentModel");
const Address = require("../models/StudentEnquiryAddressModel");
const { Op } = require('sequelize');

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



const getStudentEnquiries = async (options = {}) => {
    const {
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'DESC',
        agentId,
        ...filters
    } = options;

    const offset = (page - 1) * limit;

    const whereClause = { ...filters };
    if (agentId) {
        whereClause.agentId = agentId;
    }

    const { count, rows } = await StudentEnquiry.findAndCountAll({
        where: whereClause,
        order: [[sortBy, sortOrder]],
        limit: parseInt(limit),
        offset: offset,
        include: [
            {
                model: Agent,
                as: 'agent',
                attributes: ['id', 'tradingName', 'firstName', 'lastName', 'emailAddress']
            },
            {
                model: Address,
                as: 'addresses',
                attributes: ['id', 'addressType', 'city', 'country']
            }
        ]
    });

    return {
        data: rows.map(enquiry => enquiry.toJSON()),
        total: count,
        page: parseInt(page),
        totalPages: Math.ceil(count / limit),
        limit: parseInt(limit)
    };
};

const findStudentEnquiryById = async (id) => {
    const enquiry = await StudentEnquiry.findByPk(id, {
        include: [
            {
                model: Agent,
                as: 'agent',
                include: [{
                    model: require('../models/AgentApplicationModel'),
                    as: 'application',
                    attributes: ['businessRegistrationNumber', 'companyPhone', 'country']
                }]
            },
            {
                model: Address,
                as: 'addresses'
            }
        ]
    });

    if (!enquiry) return null;
    return enquiry.toJSON();
};

const createStudentEnquiry = async (values, agentId) => {
    // Verify agent exists and is active
    const agent = await Agent.findByPk(agentId);
    if (!agent || !agent.isActive) {
        throw new Error('Only active agents can create student enquiries');
    }

    // Process JSON fields if they're strings
    const processedValues = processJsonFields(values);
    processedValues.agentId = agentId;

    const enquiry = await StudentEnquiry.create(processedValues);

    // If addresses are provided, create them
    if (values.addresses && Array.isArray(values.addresses)) {
        const addressData = values.addresses.map(address => ({
            ...address,
            studentEnquiryId: enquiry.id
        }));
        await Address.bulkCreate(addressData);
    }

    const fullEnquiry = await StudentEnquiry.findByPk(enquiry.id, {
        include: [
            {
                model: Agent,
                as: 'agent',
                attributes: ['id', 'tradingName', 'firstName', 'lastName']
            },
            {
                model: Address,
                as: 'addresses'
            }
        ]
    });

    return fullEnquiry.toJSON();
};

const updateStudentEnquiryById = async (id, values, agentId = null) => {
    const enquiry = await StudentEnquiry.findByPk(id);
    if (!enquiry) return null;

    // If agentId is provided, verify the agent can update this enquiry
    if (agentId && enquiry.agentId !== agentId) {
        throw new Error('You can only update your own student enquiries');
    }

    // Process JSON fields if they're strings
    const processedValues = processJsonFields(values);

    await enquiry.update(processedValues);

    // Update addresses if provided
    if (values.addresses && Array.isArray(values.addresses)) {
        // Remove existing addresses
        await Address.destroy({ where: { studentEnquiryId: id } });

        // Create new addresses
        const addressData = values.addresses.map(address => ({
            ...address,
            studentEnquiryId: id
        }));
        await Address.bulkCreate(addressData);
    }

    const updatedEnquiry = await StudentEnquiry.findByPk(id, {
        include: [
            {
                model: Agent,
                as: 'agent',
                attributes: ['id', 'tradingName', 'firstName', 'lastName']
            },
            {
                model: Address,
                as: 'addresses'
            }
        ]
    });

    return updatedEnquiry.toJSON();
};

const deleteStudentEnquiryById = async (id, agentId = null) => {
    const enquiry = await StudentEnquiry.findByPk(id);
    if (!enquiry) return false;

    // If agentId is provided, verify the agent can delete this enquiry
    if (agentId && enquiry.agentId !== agentId) {
        throw new Error('You can only delete your own student enquiries');
    }

    const result = await StudentEnquiry.destroy({ where: { id } });
    return result > 0;
};

const getEnquiriesByAgent = async (agentId, options = {}) => {
    const {
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'DESC',
        ...filters
    } = options;

    const offset = (page - 1) * limit;

    const { count, rows } = await StudentEnquiry.findAndCountAll({
        where: { ...filters, agentId },
        order: [[sortBy, sortOrder]],
        limit: parseInt(limit),
        offset: offset,
        include: [
            {
                model: Address,
                as: 'addresses',
                attributes: ['id', 'addressType', 'city', 'country']
            }
        ]
    });

    return {
        data: rows.map(enquiry => enquiry.toJSON()),
        total: count,
        page: parseInt(page),
        totalPages: Math.ceil(count / limit),
        limit: parseInt(limit)
    };
};

const getEnquiryStats = async (agentId = null) => {
    const whereClause = agentId ? { agentId } : {};

    const total = await StudentEnquiry.count({ where: whereClause });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = await StudentEnquiry.count({
        where: {
            ...whereClause,
            createdAt: {
                [Op.gte]: today
            }
        }
    });

    const thisWeek = new Date();
    thisWeek.setDate(thisWeek.getDate() - 7);
    const thisWeekCount = await StudentEnquiry.count({
        where: {
            ...whereClause,
            createdAt: {
                [Op.gte]: thisWeek
            }
        }
    });

    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);
    const thisMonthCount = await StudentEnquiry.count({
        where: {
            ...whereClause,
            createdAt: {
                [Op.gte]: thisMonth
            }
        }
    });

    return {
        total,
        today: todayCount,
        thisWeek: thisWeekCount,
        thisMonth: thisMonthCount
    };
};


// Helper function to process JSON fields - UPDATED
const processJsonFields = (values) => {
    const jsonFields = [
        'interestedServices', 'educationBackground',
        'englishTestScores', 'emergencyContact',
        'passportDetails', 'visaRefusalDetails',
        'previousPassportNumbers',
        'passportDocument', 'cvDocument' // Added new document fields
    ];

    const processed = { ...values };

    jsonFields.forEach(field => {
        if (processed[field] && typeof processed[field] === 'string') {
            try {
                processed[field] = JSON.parse(processed[field]);
            } catch (e) {
                // If parsing fails, keep the original value
                console.error(`Failed to parse ${field} field`);
            }
        }
    });

    return processed;
};

module.exports = {
    getStudentEnquiries,
    findStudentEnquiryById,
    createStudentEnquiry,
    updateStudentEnquiryById,
    deleteStudentEnquiryById,
    getEnquiriesByAgent,
    getEnquiryStats
};