const universityController = require('../controllers/universityController')
const upload = require("../middlewares/multerConfig")

module.exports = (router) => {
    router.get('/university', universityController.getAllUniversities)
    router.get('/university/:id', universityController.getUniversityById)
    router.post('/university',
        upload.fields([
            { name: 'logo', maxCount: 1 }
        ])
        , universityController.createNewUniversity);
}