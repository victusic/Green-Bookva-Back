const express = require('express');
const MongoController = require('./routes/mongo.route');
const Main_PageController = require('./routes/main_page.route');
const bookProductController = require('./routes/book.product.route');
const accessoryProductController = require('./routes/accessory.product.route');
const profileController = require('./routes/profile.route');
const APMController = require('./routes/apm.route');
const ReviewController = require('./routes/review.route');
const Types_ProductsController = require('./routes/types_products.route');
const OrderController = require('./routes/order.route');
const FindController = require('./routes/find.route');
const CheckController = require('./routes/check.route');

const PORT = process.env.PORT || 443;

const app = express();
app.use(express.json());
app.use('/', 
    MongoController, 
    Main_PageController,
    profileController,
    APMController,
    ReviewController,
    Types_ProductsController,
    OrderController,
    FindController,
    CheckController
);

app.use('/book', bookProductController);
app.use('/accessory', accessoryProductController);

app.listen(PORT, ()=> console.log`server start on port ${PORT}`);

