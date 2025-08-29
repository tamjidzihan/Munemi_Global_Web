const Address = require('../models/AddressModel');
const StudentEnquiry = require('../models/StudentEnquiryModel');

const getAddressesByEnquiryId = async (studentEnquiryId) => {
    return Address.findAll({
        where: { studentEnquiryId },
        order: [['addressType', 'ASC']]
    });
};

const getAddressById = async (id) => {
    return Address.findByPk(id, {
        include: [{
            model: StudentEnquiry,
            as: 'studentEnquiry',
            attributes: ['id', 'givenName', 'surName', 'email']
        }]
    });
};

const createAddress = async (addressData) => {
    // Verify the student enquiry exists
    const enquiry = await StudentEnquiry.findByPk(addressData.studentEnquiryId);
    if (!enquiry) {
        throw new Error('Student enquiry not found');
    }

    // Check if address type already exists for this enquiry
    const existingAddress = await Address.findOne({
        where: {
            studentEnquiryId: addressData.studentEnquiryId,
            addressType: addressData.addressType
        }
    });

    if (existingAddress) {
        throw new Error(`${addressData.addressType} address already exists for this enquiry`);
    }

    return Address.create(addressData);
};

const createBulkAddresses = async (addressesData) => {
    // Verify all student enquiries exist
    const enquiryIds = [...new Set(addressesData.map(addr => addr.studentEnquiryId))];
    const enquiries = await StudentEnquiry.findAll({
        where: { id: enquiryIds },
        attributes: ['id']
    });

    if (enquiries.length !== enquiryIds.length) {
        throw new Error('One or more student enquiries not found');
    }

    // Check for duplicate address types per enquiry
    const addressTypeMap = {};
    addressesData.forEach(addr => {
        const key = `${addr.studentEnquiryId}-${addr.addressType}`;
        if (addressTypeMap[key]) {
            throw new Error(`Duplicate address type for enquiry ${addr.studentEnquiryId}`);
        }
        addressTypeMap[key] = true;
    });

    return Address.bulkCreate(addressesData, {
        validate: true,
        individualHooks: true
    });
};

const updateAddressById = async (id, updateData) => {
    const address = await Address.findByPk(id);
    if (!address) {
        throw new Error('Address not found');
    }

    // If addressType is being changed, check for conflicts
    if (updateData.addressType && updateData.addressType !== address.addressType) {
        const conflictingAddress = await Address.findOne({
            where: {
                studentEnquiryId: address.studentEnquiryId,
                addressType: updateData.addressType,
                id: { [Op.ne]: id }
            }
        });

        if (conflictingAddress) {
            throw new Error(`${updateData.addressType} address already exists for this enquiry`);
        }
    }

    const [updateCount] = await Address.update(updateData, {
        where: { id }
    });

    if (updateCount === 0) return null;

    return Address.findByPk(id);
};

const deleteAddressById = async (id) => {
    const address = await Address.findByPk(id);
    if (!address) {
        throw new Error('Address not found');
    }

    const result = await Address.destroy({ where: { id } });
    return result > 0;
};

const deleteAddressesByEnquiryId = async (studentEnquiryId) => {
    const result = await Address.destroy({
        where: { studentEnquiryId }
    });
    return result;
};

const getAddressByType = async (studentEnquiryId, addressType) => {
    return Address.findOne({
        where: {
            studentEnquiryId,
            addressType
        }
    });
};

const validateAddress = (addressData) => {
    const errors = [];

    if (!addressData.street || addressData.street.trim().length === 0) {
        errors.push('Street address is required');
    }

    if (!addressData.city || addressData.city.trim().length === 0) {
        errors.push('City is required');
    }

    if (!addressData.country || addressData.country.trim().length === 0) {
        errors.push('Country is required');
    }

    if (!addressData.addressType) {
        errors.push('Address type is required');
    }

    if (addressData.zipCode && addressData.zipCode.length > 20) {
        errors.push('Zip code must be less than 20 characters');
    }

    return errors;
};

const getAddressStats = async (studentEnquiryId = null) => {
    const whereClause = studentEnquiryId ? { studentEnquiryId } : {};

    const totalAddresses = await Address.count({ where: whereClause });

    const permanentAddresses = await Address.count({
        where: { ...whereClause, addressType: 'Permanent' }
    });

    const presentAddresses = await Address.count({
        where: { ...whereClause, addressType: 'Present' }
    });

    const countries = await Address.findAll({
        where: whereClause,
        attributes: [
            'country',
            [sequelize.fn('COUNT', sequelize.col('id')), 'count']
        ],
        group: ['country'],
        order: [[sequelize.fn('COUNT', sequelize.col('id')), 'DESC']],
        limit: 10
    });

    return {
        totalAddresses,
        permanentAddresses,
        presentAddresses,
        topCountries: countries
    };
};

const searchAddresses = async (searchCriteria) => {
    const {
        country,
        city,
        state,
        addressType,
        studentEnquiryId,
        page = 1,
        limit = 10
    } = searchCriteria;

    const offset = (page - 1) * limit;
    const whereClause = {};

    if (country) whereClause.country = { [Op.iLike]: `%${country}%` };
    if (city) whereClause.city = { [Op.iLike]: `%${city}%` };
    if (state) whereClause.state = { [Op.iLike]: `%${state}%` };
    if (addressType) whereClause.addressType = addressType;
    if (studentEnquiryId) whereClause.studentEnquiryId = studentEnquiryId;

    const { count, rows } = await Address.findAndCountAll({
        where: whereClause,
        order: [['createdAt', 'DESC']],
        limit: parseInt(limit),
        offset: offset,
        include: [{
            model: StudentEnquiry,
            as: 'studentEnquiry',
            attributes: ['id', 'givenName', 'surName', 'email']
        }]
    });

    return {
        data: rows,
        total: count,
        page: parseInt(page),
        totalPages: Math.ceil(count / limit),
        limit: parseInt(limit)
    };
};

const updateOrCreateAddress = async (studentEnquiryId, addressType, addressData) => {
    const existingAddress = await Address.findOne({
        where: {
            studentEnquiryId,
            addressType
        }
    });

    if (existingAddress) {
        return Address.update(addressData, {
            where: {
                studentEnquiryId,
                addressType
            }
        });
    } else {
        return Address.create({
            ...addressData,
            studentEnquiryId,
            addressType
        });
    }
};

module.exports = {
    getAddressesByEnquiryId,
    getAddressById,
    createAddress,
    createBulkAddresses,
    updateAddressById,
    deleteAddressById,
    deleteAddressesByEnquiryId,
    getAddressByType,
    validateAddress,
    getAddressStats,
    searchAddresses,
    updateOrCreateAddress
};