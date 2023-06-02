const db = require('../db');

class accessoryProductController {
    async getProduct(req, res){
        const category = req.query.category;
        const subcategory = req.query.subcategory;
        const manufacturer = req.query.manufacturer;

        if(category){
            const product = await db.query("SELECT id, name, (SELECT name FROM manufacturer WHERE manufacturer.id = product.manufacturer_id) AS manufacturer, price, image, count, badge_novelty, badge_discount, badge_sales_leder, (SELECT discount_amount FROM discount WHERE discount.id = product.discount_id) AS discount, (SELECT SUM(evaluation)/COUNT(*) FROM review WHERE review.product_id = product.id) AS review FROM product WHERE category_id = $1 ORDER BY RANDOM() LIMIT 12", [category]);
            res.json(product.rows);
        }
        if(subcategory){
            const product = await db.query("SELECT id, name, (SELECT name FROM manufacturer WHERE manufacturer.id = product.manufacturer_id) AS manufacturer, price, image, count, badge_novelty, badge_discount, badge_sales_leder, (SELECT discount_amount FROM discount WHERE discount.id = product.discount_id) AS discount, (SELECT SUM(evaluation)/COUNT(*) FROM review WHERE review.product_id = product.id) AS review FROM product WHERE subcategory_id = $1 ORDER BY RANDOM() LIMIT 12", [subcategory]);
            res.json(product.rows);
        }
        if(manufacturer){
            const product = await db.query("SELECT id, name, (SELECT name FROM manufacturer WHERE manufacturer.id = product.manufacturer_id) AS manufacturer, price, image, count, badge_novelty, badge_discount, badge_sales_leder, (SELECT discount_amount FROM discount WHERE discount.id = product.discount_id) AS discount, (SELECT SUM(evaluation)/COUNT(*) FROM review WHERE review.product_id = product.id) AS review FROM product WHERE manufacturer_id = $1 ORDER BY RANDOM() LIMIT 12", [manufacturer]);
            res.json(product.rows);
        }
    }
    async getProductMin(req, res){
        const category = req.query.category;
        const product = await db.query("SELECT id, name, (SELECT name FROM manufacturer WHERE manufacturer.id = product.manufacturer_id) AS manufacturer, price, image, count, badge_novelty, badge_discount, badge_sales_leder, (SELECT discount_amount FROM discount WHERE discount.id = product.discount_id) AS discount, (SELECT SUM(evaluation)/COUNT(*) FROM review WHERE review.product_id = product.id) AS review FROM product WHERE category_id = $1 ORDER BY RANDOM() LIMIT 10", [category]);
        res.json(product.rows);
    }
    async getProductList(req, res){

        const limit = req.query.limit;
        const page = req.query.page;

        const sort = req.query.sort;

        const category = req.query.category;
        const subcategory = req.query.subcategory;

        const discount = req.query.discount;
        const sales_leader = req.query.sales_leader;
        const novelty = req.query.novelty;

        const manufacturer = req.query.manufacturer;

        const min_price = req.query.min_price;
        const max_price = req.query.max_price;


        let tx_query_resp = "SELECT id, name, (SELECT name FROM manufacturer WHERE manufacturer.id = product.manufacturer_id) AS manufacturer, price, image, count, badge_novelty, badge_discount, badge_sales_leder, (SELECT discount_amount FROM discount WHERE discount.id = product.discount_id) AS discount, (SELECT SUM(evaluation)/COUNT(*) FROM review WHERE review.product_id = product.id) AS review FROM product WHERE";
        let tx_query_count = "SELECT COUNT(*) FROM product WHERE";

        let tx_query = "";

        if(category){
            tx_query += " category_id = " + category;
        }
        if(subcategory){
            tx_query += " subcategory_id = " + subcategory;
        }
        if(discount){
            tx_query += " AND badge_discount = true";
        }
        if(sales_leader){
            tx_query += " AND badge_sales_leder = true";
        }
        if(novelty){
            tx_query += " AND badge_novelty = true";
        }

        if(manufacturer){
            tx_query += " AND manufacturer_id = " + manufacturer;
        }

        if(min_price && max_price){
            tx_query += " AND price BETWEEN " + min_price + " AND " + max_price;
        }

        tx_query_count += tx_query;

        if(sort){
            switch (key) {
                case 2:
                    tx_query += " ORDER BY name ASC";
                    break;
                case 3:
                    tx_query += " ORDER BY name DESC";
                    break;
                case 4:
                    tx_query += " ORDER BY year_of_publication ASC";
                    break;
                case 5:
                    tx_query += " ORDER BY year_of_publication DESC";
                    break;
                case 6:
                    tx_query += " ORDER BY price ASC";
                    break;
                case 7:
                    tx_query += " ORDER BY price DESC"
                    break;
                default:
                    tx_query += ""
                    break;
            }
        }

        tx_query += " LIMIT "+ limit +" OFFSET " + (page - 1)*limit;

        tx_query_resp += tx_query;

        const product = await db.query(tx_query_resp);
        const count_product = await db.query(tx_query_count);
        res.setHeader('x-total-count', count_product.rows[0].count);
        res.json(product.rows);
    }

    async getProductOne(req, res){
        const id = req.params.id;
        const product = await db.query("SELECT id, name, (SELECT name FROM manufacturer WHERE manufacturer.id = product.manufacturer_id) AS manufacturer, manufacturer_id, price, image, count, badge_novelty, badge_discount, badge_sales_leder, (SELECT discount_amount FROM discount WHERE discount.id = product.discount_id) AS discount, (SELECT SUM(evaluation)/COUNT(*) FROM review WHERE review.product_id = product.id) AS review, size, description, weight, FROM product WHERE id = $1", [id]);
        res.json(product.rows);
    }

    async getProductOneImages(req, res){
        const id = req.params.id;
        const product = await db.query("SELECT id, image FROM product_image WHERE id IN (SELECT image_id FROM image_product WHERE product_id = $1)", [id]);
        res.json(product.rows);
    }

    async getProductOneReviews(req, res){
        const id = req.params.id;
        const product = await db.query("SELECT id, header, review_text, evaluation, (SELECT name FROM account WHERE account.id = review.account_id) AS user_name FROM review WHERE product_id = $1", [id]);
        res.json(product.rows);
    }
}

module.exports = new accessoryProductController()