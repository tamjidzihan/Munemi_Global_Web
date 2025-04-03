const authenticationController = require('../controllers/authenticationController')

module.exports = (router) => {
    router.post('/auth/register', authenticationController.register);
    router.post('/auth/login', authenticationController.login);
    router.post('/auth/logout', authenticationController.logout);
    router.get('/auth/me', authenticationController.getUser);
}