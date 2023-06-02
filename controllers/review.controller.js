const db = require('../db');

class ReviewController {
    async PostReview(req, res){
        const {product_id, account_id, review_text, header, evaluation} = req.body; 
        const review = await db.query("INSERT INTO review (product_id, account_id, review_text, header, evaluation) values ($1, $2, $3, $4, $5) RETURNING *", [product_id, account_id, review_text, header, evaluation]);
        res.json(review.rows);
    }
    async PatchReview(req, res){
        const id = req.params.id;
        const {review_text, header, evaluation} = req.body; 
        const review = await db.query("UPDATE review SET review_text = $1, header = $2, evaluation = $3 WHERE id = $4 RETURNING *", [review_text, header, evaluation, id]);
        res.json(review.rows);
    }
    async DeleteReview(req, res){
        const id = req.params.id;
        const review = await db.query("DELETE FROM review WHERE id = $1", [id]);
        res.json(review.rows);
    }
}

module.exports = new ReviewController()