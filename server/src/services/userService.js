const { UserModel } = require("../db/UserModel");

const getUser = () => UserModel.find();
const getUserByEmail = (email) => UserModel.findOne({ email });
const getUserByFirstName = (firstName) => UserModel.findOne({ firstName });
const getUserByLastName = (lastName) => UserModel.findOne({ lastName });
const getUserById = (id) => UserModel.findById(id);
const getUserBySessionToken = (sessionToken) => UserModel.findOne({ 'authentication.sessionToken': sessionToken });
const getUserByRole = (role) => UserModel.findOne({ role });
const createUser = (valuse) => new UserModel(valuse).save().then((user) => user.toObject());
const updateUserById = (id, valuse) => UserModel.findByIdAndUpdate(id, valuse);
const deleteUserById = (id) => UserModel.findByIdAndDelete({ _id: id });

module.exports = {
    getUser,
    getUserByEmail,
    getUserByFirstName,
    getUserByLastName,
    getUserById,
    getUserBySessionToken,
    getUserByRole,
    createUser,
    updateUserById,
    deleteUserById
};