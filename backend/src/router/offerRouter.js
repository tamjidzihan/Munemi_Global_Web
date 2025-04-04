const offerController = require('../controllers/OfferController')
const upload = require("../middlewares/multerConfig")


module.exports = (router) => {
    router.get('/offers', offerController.getAllOffers);
    router.get('/offers/:id', offerController.getOfferById);
    router.post('/offers',
        upload.fields([
            { name: 'image', maxCount: 1 }
        ])
        , offerController.createNewOffer);
    router.put('/offers/:id',
        upload.fields([
            { name: 'image', maxCount: 1 }
        ])
        , offerController.updateOffer);
    router.delete('/offers/:id', offerController.deleteOffer)

}