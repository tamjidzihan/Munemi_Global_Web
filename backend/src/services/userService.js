const User = require('../models/UserModel'); // Adjust the path as necessary

const getUsers = () => User.findAll(); // Fetch all users
const getUserByEmail = (email) => User.findOne({ where: { email } }); // Find user by email
const getUserByEmailWithAuth = (email) => User.findOne({
    where: { email },
    attributes: { include: ['password', 'salt', 'sessionToken'] } // Include specific fields
});
const getUserByFirstName = (firstName) => User.findOne({ where: { firstName } }); // Find user by first name
const getUserByLastName = (lastName) => User.findOne({ where: { lastName } }); // Find user by last name
const getUserById = (id) => User.findByPk(id); // Find user by ID
const getUserBySessionToken = (sessionToken) => User.findOne({ where: { sessionToken } }); // Find user by session token
const getUserByRole = (role) => User.findOne({ where: { role } }); // Find user by role
const createUser = (values) => User.create(values); // Create a new user
const updateUserById = (id, values) => User.update(values, { where: { id }, returning: true }); // Update user by ID
const deleteUserById = (id) => User.destroy({ where: { id } }); // Delete user by ID

module.exports = {
    getUsers,
    getUserByEmail,
    getUserByEmailWithAuth,
    getUserByFirstName,
    getUserByLastName,
    getUserById,
    getUserBySessionToken,
    getUserByRole,
    createUser,
    updateUserById,
    deleteUserById
};