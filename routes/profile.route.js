const Router = require('express');
const router = new Router()
const profileController = require('../controllers/profile.controller');

router.get('/profile/:id', profileController.getProfile);
router.get('/profile/:id/cards', profileController.getCards);
router.get('/favorites/:id', profileController.getFavorites);
router.get('/favorites/:id/check', profileController.getFavoritesCheck);
router.get('/shopping_cart/:id', profileController.getShopping_cart);
router.get('/shopping_cart/:id/check', profileController.getShopping_cartCheck);
router.get('/orders/:id', profileController.getOrders);
router.get('/order/:code', profileController.getOrder);
router.get('/card/:id', profileController.getCard);
router.post('/card', profileController.postCard);
router.patch('/card/:id', profileController.patchCard);
router.delete('/card/:id', profileController.deleteCard);
router.patch('/profile/:id', profileController.patchProfile);
router.delete('/profile/:id', profileController.deleteProfile);
router.delete('/profile/:id/full', profileController.deleteProfileFull);

module.exports = router