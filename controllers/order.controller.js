const db = require('../db');

class OrderController {
    async postOrder(req, res){
        const {product_id, account_id, order_date, order_code, price} = req.body; 
        const order = await db.query("INSERT INTO order_list (product_id, account_id, order_date, order_code, price) VALUES ($1, $2, $3, $4, $5) RETURNING *", [product_id, account_id, order_date, order_code, price]);
        res.json(order.rows);
    }
}

module.exports = new OrderController()