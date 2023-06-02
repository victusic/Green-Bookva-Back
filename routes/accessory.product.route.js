const Router = require('express');
const router = new Router()
const bookProductController = require('../controllers/book.product.controller');

router.get('/product/new', bookProductController.getProductNew);
router.get('/product/bestseller', bookProductController.getProductBestseller);
router.get('/product/best', bookProductController.getProductBest);
router.get('/product', bookProductController.getProduct);
router.get('/min/product', bookProductController.getProductMin);
router.get('/list/product', bookProductController.getProductList);
router.get('/one/product/:id', bookProductController.getProductOne);
router.get('/one/product/:id/images', bookProductController.getProductOneImages);
router.get('/one/product/:id/reviews', bookProductController.getProductOneReviews);

module.exports = router