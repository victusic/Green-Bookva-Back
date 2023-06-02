const Router = require('express');
const router = new Router()
const OrderController = require('../controllers/order.controller');

router.post('/order', OrderController.postOrder);

module.exports = router