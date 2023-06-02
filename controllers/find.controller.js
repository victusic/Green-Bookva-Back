const db = require('../db');

class FindController {
    /*async getFind(req, res){
        const findstring = req.query.findstring;
        const findAuthorName = await db.query("SELECT id, name, type_id, (SELECT name FROM autor WHERE autor.id = product.autor_id) AS autor_name, (SELECT name FROM manufacturer WHERE manufacturer.id = product.manufacturer_id) AS manufacturer, (SELECT surname FROM autor WHERE autor.id = product.autor_id) AS autor_surname, (SELECT name FROM publisher WHERE publisher.id = product.publisher_id) AS publisher, price, image, count, badge_novelty, badge_discount, badge_sales_leder, (SELECT discount_amount FROM discount WHERE discount.id = product.discount_id) AS discount, (SELECT SUM(evaluation)/COUNT(*) FROM review WHERE review.product_id = product.id) AS review FROM product WHERE autor_id IN (SELECT id FROM autor WHERE LOWER(name) LIKE LOWER('%"+findstring+"%'))");
        const findAuthorSurname = await db.query("SELECT id, name, type_id, (SELECT name FROM autor WHERE autor.id = product.autor_id) AS autor_name, (SELECT name FROM manufacturer WHERE manufacturer.id = product.manufacturer_id) AS manufacturer, (SELECT surname FROM autor WHERE autor.id = product.autor_id) AS autor_surname, (SELECT name FROM publisher WHERE publisher.id = product.publisher_id) AS publisher, price, image, count, badge_novelty, badge_discount, badge_sales_leder, (SELECT discount_amount FROM discount WHERE discount.id = product.discount_id) AS discount, (SELECT SUM(evaluation)/COUNT(*) FROM review WHERE review.product_id = product.id) AS review FROM product WHERE autor_id IN (SELECT id FROM autor WHERE LOWER(surname) LIKE LOWER('%"+findstring+"%'))");
        const findAuthorSurnameAll = await db.query("SELECT id, name, type_id, (SELECT name FROM autor WHERE autor.id = product.autor_id) AS autor_name, (SELECT name FROM manufacturer WHERE manufacturer.id = product.manufacturer_id) AS manufacturer, (SELECT surname FROM autor WHERE autor.id = product.autor_id) AS autor_surname, (SELECT name FROM publisher WHERE publisher.id = product.publisher_id) AS publisher, price, image, count, badge_novelty, badge_discount, badge_sales_leder, (SELECT discount_amount FROM discount WHERE discount.id = product.discount_id) AS discount, (SELECT SUM(evaluation)/COUNT(*) FROM review WHERE review.product_id = product.id) AS review FROM product WHERE autor_id IN (SELECT id FROM autor WHERE LOWER(CONCAT(name, ' ', surname)) LIKE LOWER('%"+findstring+"%'))");
        const findAuthorSurnameAllReverse = await db.query("SELECT id, name, type_id, (SELECT name FROM autor WHERE autor.id = product.autor_id) AS autor_name, (SELECT name FROM manufacturer WHERE manufacturer.id = product.manufacturer_id) AS manufacturer, (SELECT surname FROM autor WHERE autor.id = product.autor_id) AS autor_surname, (SELECT name FROM publisher WHERE publisher.id = product.publisher_id) AS publisher, price, image, count, badge_novelty, badge_discount, badge_sales_leder, (SELECT discount_amount FROM discount WHERE discount.id = product.discount_id) AS discount, (SELECT SUM(evaluation)/COUNT(*) FROM review WHERE review.product_id = product.id) AS review FROM product WHERE autor_id IN (SELECT id FROM autor WHERE LOWER(CONCAT(surname, ' ', name)) LIKE LOWER('%"+findstring+"%'))");
        const findPublisher = await db.query("SELECT id, name, type_id, (SELECT name FROM autor WHERE autor.id = product.autor_id) AS autor_name, (SELECT name FROM manufacturer WHERE manufacturer.id = product.manufacturer_id) AS manufacturer, (SELECT surname FROM autor WHERE autor.id = product.autor_id) AS autor_surname, (SELECT name FROM publisher WHERE publisher.id = product.publisher_id) AS publisher, price, image, count, badge_novelty, badge_discount, badge_sales_leder, (SELECT discount_amount FROM discount WHERE discount.id = product.discount_id) AS discount, (SELECT SUM(evaluation)/COUNT(*) FROM review WHERE review.product_id = product.id) AS review FROM product WHERE publisher_id IN (SELECT id FROM publisher WHERE LOWER(name) LIKE LOWER('%"+findstring+"%'))");
        const findManufacturer = await db.query("SELECT id, name, type_id, (SELECT name FROM autor WHERE autor.id = product.autor_id) AS autor_name, (SELECT name FROM manufacturer WHERE manufacturer.id = product.manufacturer_id) AS manufacturer, (SELECT surname FROM autor WHERE autor.id = product.autor_id) AS autor_surname, (SELECT name FROM publisher WHERE publisher.id = product.publisher_id) AS publisher, price, image, count, badge_novelty, badge_discount, badge_sales_leder, (SELECT discount_amount FROM discount WHERE discount.id = product.discount_id) AS discount, (SELECT SUM(evaluation)/COUNT(*) FROM review WHERE review.product_id = product.id) AS review FROM product WHERE manufacturer_id IN (SELECT id FROM manufacturer WHERE LOWER(name) LIKE LOWER('%"+findstring+"%'))");
        const findProduct = await db.query("SELECT id, name, type_id, (SELECT name FROM autor WHERE autor.id = product.autor_id) AS autor_name, (SELECT name FROM manufacturer WHERE manufacturer.id = product.manufacturer_id) AS manufacturer, (SELECT surname FROM autor WHERE autor.id = product.autor_id) AS autor_surname, (SELECT name FROM publisher WHERE publisher.id = product.publisher_id) AS publisher, price, image, count, badge_novelty, badge_discount, badge_sales_leder, (SELECT discount_amount FROM discount WHERE discount.id = product.discount_id) AS discount, (SELECT SUM(evaluation)/COUNT(*) FROM review WHERE review.product_id = product.id) AS review FROM product WHERE LOWER(name) LIKE LOWER('%"+findstring+"%')");
        const mergedResult = [...findAuthorName.rows, ...findAuthorSurname.rows, ...findAuthorSurnameAll.rows, ...findAuthorSurnameAllReverse.rows, ...findPublisher.rows, ...findManufacturer.rows, ...findProduct.rows];
        const uniqueResults = mergedResult.reduce((accumulator, current) => {
            const existingItem = accumulator.find(item => item.id === current.id);
            if (!existingItem) {
              accumulator.push(current);
            }
            return accumulator;
          }, []);
        res.json(uniqueResults);

          скорее на память оставил

    }*/
    async getFind(req, res){
        const findstring = req.query.findstring;

        const limit = req.query.limit;
        const page = req.query.page;

        const sort = req.query.sort;

        const discount = req.query.discount;
        const sales_leader = req.query.sales_leader;
        const novelty = req.query.novelty;

        const author = req.query.author;
        const publisher = req.query.publisher;
        const manufacturer = req.query.manufacturer;

        const binding = req.query.binding;
        const min_price = req.query.min_price;
        const max_price = req.query.max_price;

        let tx_query_resp = "SELECT DISTINCT * FROM ((SELECT id, name, type_id, (SELECT name FROM autor WHERE autor.id = product.autor_id) AS autor_name, (SELECT name FROM manufacturer WHERE manufacturer.id = product.manufacturer_id) AS manufacturer, (SELECT surname FROM autor WHERE autor.id = product.autor_id) AS autor_surname, (SELECT name FROM publisher WHERE publisher.id = product.publisher_id) AS publisher, price, image, count, badge_novelty, badge_discount, badge_sales_leder, (SELECT discount_amount FROM discount WHERE discount.id = product.discount_id) AS discount, (SELECT SUM(evaluation)/COUNT(*) FROM review WHERE review.product_id = product.id) AS review FROM product WHERE autor_id IN (SELECT id FROM autor WHERE LOWER(name) LIKE LOWER('%"+findstring+"%'))) UNION (SELECT id, name, type_id, (SELECT name FROM autor WHERE autor.id = product.autor_id) AS autor_name, (SELECT name FROM manufacturer WHERE manufacturer.id = product.manufacturer_id) AS manufacturer, (SELECT surname FROM autor WHERE autor.id = product.autor_id) AS autor_surname, (SELECT name FROM publisher WHERE publisher.id = product.publisher_id) AS publisher, price, image, count, badge_novelty, badge_discount, badge_sales_leder, (SELECT discount_amount FROM discount WHERE discount.id = product.discount_id) AS discount, (SELECT SUM(evaluation)/COUNT(*) FROM review WHERE review.product_id = product.id) AS review FROM product WHERE autor_id IN (SELECT id FROM autor WHERE LOWER(surname) LIKE LOWER('%"+findstring+"%'))) UNION (SELECT id, name, type_id, (SELECT name FROM autor WHERE autor.id = product.autor_id) AS autor_name, (SELECT name FROM manufacturer WHERE manufacturer.id = product.manufacturer_id) AS manufacturer, (SELECT surname FROM autor WHERE autor.id = product.autor_id) AS autor_surname, (SELECT name FROM publisher WHERE publisher.id = product.publisher_id) AS publisher, price, image, count, badge_novelty, badge_discount, badge_sales_leder, (SELECT discount_amount FROM discount WHERE discount.id = product.discount_id) AS discount, (SELECT SUM(evaluation)/COUNT(*) FROM review WHERE review.product_id = product.id) AS review FROM product WHERE autor_id IN (SELECT id FROM autor WHERE LOWER(CONCAT(name, ' ', surname)) LIKE LOWER('%"+findstring+"%'))) UNION (SELECT id, name, type_id, (SELECT name FROM autor WHERE autor.id = product.autor_id) AS autor_name, (SELECT name FROM manufacturer WHERE manufacturer.id = product.manufacturer_id) AS manufacturer, (SELECT surname FROM autor WHERE autor.id = product.autor_id) AS autor_surname, (SELECT name FROM publisher WHERE publisher.id = product.publisher_id) AS publisher, price, image, count, badge_novelty, badge_discount, badge_sales_leder, (SELECT discount_amount FROM discount WHERE discount.id = product.discount_id) AS discount, (SELECT SUM(evaluation)/COUNT(*) FROM review WHERE review.product_id = product.id) AS review FROM product WHERE autor_id IN (SELECT id FROM autor WHERE LOWER(CONCAT(surname, ' ', name)) LIKE LOWER('%"+findstring+"%'))) UNION (SELECT id, name, type_id, (SELECT name FROM autor WHERE autor.id = product.autor_id) AS autor_name, (SELECT name FROM manufacturer WHERE manufacturer.id = product.manufacturer_id) AS manufacturer, (SELECT surname FROM autor WHERE autor.id = product.autor_id) AS autor_surname, (SELECT name FROM publisher WHERE publisher.id = product.publisher_id) AS publisher, price, image, count, badge_novelty, badge_discount, badge_sales_leder, (SELECT discount_amount FROM discount WHERE discount.id = product.discount_id) AS discount, (SELECT SUM(evaluation)/COUNT(*) FROM review WHERE review.product_id = product.id) AS review FROM product WHERE publisher_id IN (SELECT id FROM publisher WHERE LOWER(name) LIKE LOWER('%"+findstring+"%'))) UNION (SELECT id, name, type_id, (SELECT name FROM autor WHERE autor.id = product.autor_id) AS autor_name, (SELECT name FROM manufacturer WHERE manufacturer.id = product.manufacturer_id) AS manufacturer, (SELECT surname FROM autor WHERE autor.id = product.autor_id) AS autor_surname, (SELECT name FROM publisher WHERE publisher.id = product.publisher_id) AS publisher, price, image, count, badge_novelty, badge_discount, badge_sales_leder, (SELECT discount_amount FROM discount WHERE discount.id = product.discount_id) AS discount, (SELECT SUM(evaluation)/COUNT(*) FROM review WHERE review.product_id = product.id) AS review FROM product WHERE manufacturer_id IN (SELECT id FROM manufacturer WHERE LOWER(name) LIKE LOWER('%"+findstring+"%'))) UNION (SELECT id, name, type_id, (SELECT name FROM autor WHERE autor.id = product.autor_id) AS autor_name, (SELECT name FROM manufacturer WHERE manufacturer.id = product.manufacturer_id) AS manufacturer, (SELECT surname FROM autor WHERE autor.id = product.autor_id) AS autor_surname, (SELECT name FROM publisher WHERE publisher.id = product.publisher_id) AS publisher, price, image, count, badge_novelty, badge_discount, badge_sales_leder, (SELECT discount_amount FROM discount WHERE discount.id = product.discount_id) AS discount, (SELECT SUM(evaluation)/COUNT(*) FROM review WHERE review.product_id = product.id) AS review FROM product WHERE LOWER(name) LIKE LOWER('%"+findstring+"%'))) AS combined_results WHERE type_id != 0";

        let tx_query = "";

        if(discount){
            tx_query += " AND badge_discount = true";
        }
        if(sales_leader){
            tx_query += " AND badge_sales_leder = true";
        }
        if(novelty){
            tx_query += " AND badge_novelty = true";
        }

        if(author){
            tx_query += " AND autor_id = " + author;
        }
        if(publisher){
            tx_query += " AND publisher_id = " + publisher;
        }
        if(manufacturer){
            tx_query += " AND manufacturer_id = " + manufacturer;
        }
        if(binding){
            tx_query += " AND binding_id = " + binding;
        }

        if(min_price && max_price){
            tx_query += " AND price BETWEEN " + min_price + " AND " + max_price;
        }

        const count_query = "SELECT COUNT(*) FROM ("+tx_query_resp+tx_query+") AS f_results";

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


        const find = await db.query(tx_query_resp);
        const count_find = await db.query(count_query);
        res.setHeader('x-total-count', count_find.rows[0].count);

        res.json(find.rows);
    }
}

module.exports = new FindController()