const Router = require('express');
const router = new Router()
const Main_PageController = require('../controllers/main_page.controller');

router.get('/recommendation_banner', Main_PageController.getBanners);
router.get('/promotions_slider', Main_PageController.getPromotionsSlider);
router.get('/promotions', Main_PageController.getPromotions);
router.get('/promotions/:id', Main_PageController.getPromotion);

module.exports = router