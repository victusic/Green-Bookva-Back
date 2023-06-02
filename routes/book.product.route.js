const Router = require('express');
const router = new Router()
const accessoryProductController = require('../controllers/accessory.product.controller');

router.get('/product', accessoryProductController.getProduct);
router.get('/min/product', accessoryProductController.getProductMin);
router.get('/list/product', accessoryProductController.getProductList);
router.get('/one/product/:id', accessoryProductController.getProductOne);
router.get('/one/product/:id/images', accessoryProductController.getProductOneImages);
router.get('/one/product/:id/reviews', accessoryProductController.getProductOneReviews);

module.exports = router