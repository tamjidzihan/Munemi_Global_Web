const healthInsurancePartnerController = require('../controllers/healthInsurancePartnerController');

module.exports = (router) => {
    router.get('/health-insurance-partners', healthInsurancePartnerController.getAllHealthInsurancePartners);
    router.get('/health-insurance-partners/:id', healthInsurancePartnerController.getHealthInsurancePartnerById);
    router.post('/health-insurance-partners', healthInsurancePartnerController.createNewHealthInsurancePartner);
    router.put('/health-insurance-partners/:id', healthInsurancePartnerController.updateHealthInsurancePartner);
    router.delete('/health-insurance-partners/:id', healthInsurancePartnerController.deleteHealthInsurancePartner);
};