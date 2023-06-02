const Router = require('express');
const router = new Router()
const Types_ProductsController = require('../controllers/types_products.controller');

router.get('/category', Types_ProductsController.getCategory);
router.get('/subcategory', Types_ProductsController.getSubcategory);

module.exports = router