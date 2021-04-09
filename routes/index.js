const router = require('express').Router();
const productRouter = require('./products.route');

router.use('/products', productRouter);

module.exports = router;
