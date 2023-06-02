const db = require('../db');

class ApmController {
    async getAuthor(req, res){
        const id = req.params.id;
        const user = await db.query("SELECT * FROM autor WHERE id = $1", [id]);
        res.json(user.rows);
    }
    async getAuthorSlides(req, res){
        const id = req.params.id;
        const user = await db.query("SELECT * FROM slide WHERE id IN (SELECT slide_id FROM autor_slide WHERE autor_id = $1)", [id]);
        res.json(user.rows);
    }
    async getPublisher(req, res){
        const id = req.params.id;
        const user = await db.query("SELECT * FROM publisher WHERE id = $1", [id]);
        res.json(user.rows);
    }
    async getPublisherSlides(req, res){
        const id = req.params.id;
        const user = await db.query("SELECT * FROM slide WHERE id IN (SELECT slide_id FROM publisher_slide WHERE publisher_id = $1)", [id]);
        res.json(user.rows);
    }
    async getManufacturer(req, res){
        const id = req.params.id;
        const user = await db.query("SELECT * FROM manufacturer WHERE id = $1", [id]);
        res.json(user.rows);
    }
    async getManufacturerSlides(req, res){
        const id = req.params.id;
        const user = await db.query("SELECT * FROM slide WHERE id IN (SELECT slide_id FROM manufacturer_slide WHERE manufacturer_id = $1)", [id]);
        res.json(user.rows);
    }
}

module.exports = new ApmController()