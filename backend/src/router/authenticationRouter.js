const authenticationController = require('../controllers/authenticationController')

module.exports = (router) => {
    router.post('/auth/register', authenticationController.register);
    router.post('/auth/login', authenticationController.login);
}