const express = require('express');
const router = express.Router();

const productCtrl = require('../controllers/product');

router.get('/', productCtrl.getAllProducts);
router.get('/:id', productCtrl.getOneProduct);
//такой путь у поиска по id
// http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926


router.post('/order', productCtrl.orderProducts);

module.exports = router;