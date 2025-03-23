const careerController = require('../controllers/careerController');
const upload = require("../middlewares/multerConfig")


module.exports = (router) => {
    router.get('/careers', careerController.getAllCareers);
    router.get('/careers/:id', careerController.getCareerById);
    router.post(
        '/careers',
        upload.fields([
            { name: 'idCard', maxCount: 1 },
            { name: 'resume', maxCount: 1 }
        ]),
        careerController.createNewCareer
    );
    router.put(
        '/careers/:id',
        upload.fields([
            { name: 'idCard', maxCount: 1 },
            { name: 'resume', maxCount: 1 }
        ]),
        careerController.updateCareerById
    );
    router.delete('/careers/:id', careerController.deleteCareer);
};