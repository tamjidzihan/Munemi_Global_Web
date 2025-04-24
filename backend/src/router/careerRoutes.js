const careerController = require('../controllers/careerController');
const upload = require("../middlewares/multerConfig")
const { isAuthenticated } = require("../middlewares")


module.exports = (router) => {
    router.get('/careers', isAuthenticated, careerController.getAllCareers);
    router.get('/careers/:id', isAuthenticated, careerController.getCareerById);
    router.post(
        '/careers',
        upload.fields([
            { name: 'idCard', maxCount: 1 },
            { name: 'resume', maxCount: 1 }
        ]),
        careerController.createNewCareer
    );
    router.put(
        '/careers/:id', isAuthenticated,
        upload.fields([
            { name: 'idCard', maxCount: 1 },
            { name: 'resume', maxCount: 1 }
        ]),
        careerController.updateCareerById
    );
    router.delete('/careers/:id', isAuthenticated, careerController.deleteCareer);
};