const newsHeadlineController = require('../controllers/NewsHeadlineController')

module.exports = (router) => {
    router.get('/newsheadline', newsHeadlineController.getAllNewsHeadline);
    router.post('/newsheadline', newsHeadlineController.createNewsHeadline);
    router.get('/newsheadline/:id', newsHeadlineController.getNewsHeadlineById);
    router.put('/newsheadline/:id', newsHeadlineController.updateNewsHeadline);
    router.delete('/newsheadline/:id', newsHeadlineController.deleteNewsHeadline);
};