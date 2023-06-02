const Router = require('express');
const router = new Router()
const ReviewController = require('../controllers/review.controller');

router.post('/review', ReviewController.PostReview);
router.patch('/review/:id', ReviewController.PatchReview);
router.delete('/review/:id', ReviewController.DeleteReview);

module.exports = router
