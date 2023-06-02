const Router = require('express');
const router = new Router()
const APMController = require('../controllers/apm.controller');

router.get('/author/:id', APMController.getAuthor);
router.get('/author/:id/slides', APMController.getAuthorSlides);
router.get('/publisher/:id', APMController.getPublisher);
router.get('/publisher/:id/slides', APMController.getPublisherSlides);
router.get('/manufacturer/:id', APMController.getManufacturer);
router.get('/manufacturer/:id/slides', APMController.getManufacturerSlides);

module.exports = router