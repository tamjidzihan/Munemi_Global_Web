const packageController = require('../controllers/packageController')
const upload = require("../middlewares/multerConfig")

module.exports = (router) => {
    router.get('/package', packageController.getAllPackage);
    router.get('/package/:id', packageController.getPackagesById);
    router.post('/package',
        upload.fields([
            { name: 'image', maxCount: 1 }
        ])
        , packageController.createNewPackage);
    router.put('/package/:id',
        upload.fields([
            { name: 'image', maxCount: 1 }
        ])
        , packageController.updatePackage);
    router.delete('/package/:id', packageController.deletePackage)

}