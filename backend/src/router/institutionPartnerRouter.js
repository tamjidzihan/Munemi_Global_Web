const institutionPartnerController = require('../controllers/institutionPartnerController');

module.exports = (router) => {
    router.get('/institution-partners', institutionPartnerController.getAllInstitutionPartners);
    router.get('/institution-partners/:id', institutionPartnerController.getInstitutionPartnerById);
    router.post('/institution-partners', institutionPartnerController.createNewInstitutionPartner);
    router.put('/institution-partners/:id', institutionPartnerController.updateInstitutionPartner);
    router.delete('/institution-partners/:id', institutionPartnerController.deleteInstitutionPartner);
};