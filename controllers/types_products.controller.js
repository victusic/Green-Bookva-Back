const db = require('../db');

class Types_ProductsController {
    async getCategory(req, res){
        const id = req.query.type;
        const users = await db.query("SELECT * FROM category WHERE id IN (SELECT category_id FROM type_category_subcategory WHERE type_id = $1)", [id]);
        res.json(users.rows);
    }
    async getSubcategory(req, res){
        const id = req.query.category;
        const users = await db.query("SELECT * FROM subcategory WHERE id IN (SELECT subcategory_id FROM type_category_subcategory WHERE category_id = $1)", [id]);
        res.json(users.rows);
    }
}

module.exports = new Types_ProductsController()