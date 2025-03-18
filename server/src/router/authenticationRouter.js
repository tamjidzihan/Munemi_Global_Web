const express = require("express");
const { login, register } = require("../controllers/authenticationController");

module.exports = (router) => {
    router.post('/auth/register', register);
    router.post('/auth/login', login);
};