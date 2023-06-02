const Router = require('express');
const router = new Router()
const FindController = require('../controllers/find.controller');

router.get('/find', FindController.getFind);

module.exports = router