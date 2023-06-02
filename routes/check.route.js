const Router = require('express');
const router = new Router()
const CheckController = require('../controllers/check.controller');

router.get('/check/:id', CheckController.getCheck);
router.post('/check', CheckController.postCheck);
router.get('/sign', CheckController.getSign);
router.post('/sign', CheckController.postSign);
router.post('/signUp', CheckController.postSignUp);

module.exports = router