const Router = require('express');
const router = new Router()
const MongoController = require('../controllers/mongo.controller');

router.get('/promo', MongoController.getPromo);
router.get('/phrases', MongoController.getPhrases);

module.exports = router