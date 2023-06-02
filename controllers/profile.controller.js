const db = require('../db');

class profileController {
    async getProfile(req, res){
        const id = req.params.id;
        const product = await db.query("SELECT id, name, surname, mail, points, color, image, birthday, (SELECT COUNT( DISTINCT order_code) AS orders FROM order_list WHERE account_id = $1) FROM account WHERE id = $1", [id]);
        res.json(product.rows);
    }
    async getCards(req, res){
        const id = req.params.id;
        const product = await db.query("SELECT id, code, monthyear FROM card WHERE id IN (SELECT card_id FROM payment_option WHERE account_id = $1)", [id]);
        res.json(product.rows);
    }
    async getFavorites(req, res){
        const id = req.params.id;
        const product = await db.query("SELECT id, type_id, name, (SELECT name FROM manufacturer WHERE manufacturer.id = product.manufacturer_id) AS manufacturer, (SELECT name FROM autor WHERE autor.id = product.autor_id) AS autor_name, (SELECT surname FROM autor WHERE autor.id = product.autor_id) AS autor_surname, (SELECT name FROM publisher WHERE publisher.id = product.publisher_id) AS publisher, price, image, count, badge_novelty, badge_discount, badge_sales_leder, (SELECT discount_amount FROM discount WHERE discount.id = product.discount_id) AS discount, (SELECT SUM(evaluation)/COUNT(*) FROM review WHERE review.product_id = product.id) AS review FROM product WHERE id IN (SELECT product_id FROM favorites WHERE account_id = $1)", [id]);
        res.json(product.rows);
    }
    async getFavoritesCheck(req, res){
        const id = req.params.id;
        const product = await db.query("SELECT id FROM product WHERE id IN (SELECT product_id FROM favorites WHERE account_id = $1)", [id]);
        res.json(product.rows);
    }
    async getShopping_cart(req, res){
        const id = req.params.id;
        const product = await db.query("SELECT id, type_id, name, (SELECT name FROM manufacturer WHERE manufacturer.id = product.manufacturer_id) AS manufacturer, (SELECT name FROM autor WHERE autor.id = product.autor_id) AS autor_name, (SELECT surname FROM autor WHERE autor.id = product.autor_id) AS autor_surname, (SELECT name FROM publisher WHERE publisher.id = product.publisher_id) AS publisher, price, image, count, badge_novelty, badge_discount, badge_sales_leder, (SELECT discount_amount FROM discount WHERE discount.id = product.discount_id) AS discount, (SELECT SUM(evaluation)/COUNT(*) FROM review WHERE review.product_id = product.id) AS review FROM product WHERE id IN (SELECT product_id FROM shopping_cart WHERE account_id = $1)", [id]);
        res.json(product.rows);
    }
    async getShopping_cartCheck(req, res){
        const id = req.params.id;
        const product = await db.query("SELECT id FROM product WHERE id IN (SELECT product_id FROM shopping_cart WHERE account_id = $1)", [id]);
        res.json(product.rows);
    }
    async getOrders(req, res){
        const id = req.params.id;
        const product = await db.query("SELECT order_date, product_id, order_code, price, (SELECT image FROM product WHERE product.id = product_id) AS product_image FROM order_list WHERE account_id = $1", [id]);
        res.json(product.rows);
    }
    async getOrder(req, res){
        const code = req.params.code;
        const product = await db.query("SELECT product_id, price, (SELECT image FROM product WHERE product.id = product_id) AS product_image, (SELECT type_id FROM product WHERE product.id = product_id) AS product_type, (SELECT name FROM autor WHERE autor.id = (SELECT autor_id FROM product WHERE product.id = product_id)) AS autor_name, (SELECT surname FROM autor WHERE autor.id = (SELECT autor_id FROM product WHERE product.id = product_id)) AS autor_surname, (SELECT name FROM manufacturer WHERE manufacturer.id = (SELECT manufacturer_id FROM product WHERE product.id = product_id)) AS manufacturer FROM order_list WHERE order_code = $1", [code]);
        res.json(product.rows);
    }
    async getCard(req, res){
        const id = req.params.id;
        const product = await db.query("SELECT * FROM card WHERE id = $1", [id]);
        res.json(product.rows);
    }
    async postCard(req, res){
        const {code, monthyear, account_id} = req.body; 
        const newCard = await db.query("INSERT INTO card (code, monthyear) values ($1, $2) RETURNING *", [code, monthyear]);
        const newReq = await db.query("INSERT INTO payment_option (card_id, account_id) values ($1, $2) RETURNING *", [newCard.rows[0]['id'], account_id]);
        res.status(201).json(newReq.rows[0]);
    }
    async patchCard(req, res){
        const id = req.params.id;
        const {code, monthyear} = req.body; 
        const card = await db.query("UPDATE card SET code = $1, monthyear = $2 WHERE id = $3 RETURNING *", [code, monthyear, id]);
        res.json(card.rows);
    }
    async deleteCard(req, res){
        const id = req.params.id;
        const delReq = await db.query("DELETE FROM payment_option WHERE card_id = $1", [id]);
        const delCard = await db.query("DELETE FROM card WHERE id = $1", [id]);
        res.json(delCard.rows);
    }
    async patchProfile(req, res){
        const id = req.params.id;
        const {name, surname, color, image, birthday} = req.body; 

        if(image !== null){
            const fs = require('fs');
            const path = require('path');

            // Удаление старого изображения
            const img = await db.query("SELECT image FROM account WHERE id = $1", [id]);

            fs.unlink('images/avatar/'+img.rows[0]['image'], (error) => {
                if (error) {
                console.error('Ошибка при удалении файла:', error);
                }
            });

            //Новое изображение
            const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';

            for (let i = 0; i < 20; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                result += characters.charAt(randomIndex);
            }

            result += '.jpg';

            const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
            //Буфер из base64 данных
            const imageBuffer = Buffer.from(base64Data, 'base64');
            const absolutePath = path.resolve('images/avatar/'+result);
            fs.writeFileSync(absolutePath, imageBuffer, 'base64');

            const acc = await db.query("UPDATE account SET name = $1, surname = $2, color = $3, image = $4, birthday = $5 WHERE id = $6 RETURNING *", [name, surname, color, result, birthday, id]);
            res.json(acc.rows);
        }   
        else{
            const acc = await db.query("UPDATE account SET name = $1, surname = $2, color = $3, birthday = $4 WHERE id = $5 RETURNING *", [name, surname, color, birthday, id]);
            res.json(acc.rows);
        }
        
    }
    async deleteProfile(req, res){
        const id = req.params.id;
        const acc = await db.query("UPDATE account SET mail = '[deleted]' WHERE id = $1 RETURNING *", [id]);
        res.json(acc.rows);
    }
    async deleteProfileFull(req, res){
        const id = req.params.id;
        const delReqReview = await db.query("DELETE FROM review WHERE account_id = $1", [id]);

        //удаление средств оплаты
        const cardsid = await db.query("SELECT card_id FROM payment_option WHERE account_id = $1", [id]);
        if(cardsid.rows){
            cardsid.rows.forEach(element => {
                const cardspa = db.query("DELETE FROM payment_option WHERE card_id = $1", [element['card_id']]);
                const cardsde = db.query("DELETE FROM card WHERE id = $1", [element['card_id']]);
            });
        }

        const delReqOrder_list = await db.query("DELETE FROM order_list WHERE account_id = $1", [id]);
        const delReqFavorites = await db.query("DELETE FROM favorites WHERE account_id = $1", [id]);
        const delReqShopping_cart = await db.query("DELETE FROM shopping_cart WHERE account_id = $1", [id]);

        // Удаление старого изображения
        const img = await db.query("SELECT image FROM account WHERE id = $1", [id]);
        const fs = require('fs');
        fs.unlink('images/avatar/'+img.rows[0]['image'], (error) => {
            if (error) {
            console.error('Ошибка при удалении файла:', error);
            }
        });

        const fulldel = await db.query("DELETE FROM account WHERE id = $1", [id]);

        res.json(fulldel.rows);
    }
}

module.exports = new profileController()