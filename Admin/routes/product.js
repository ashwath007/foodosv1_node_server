const express = require('express');
const router = express.Router();
const { getAllProducts, getAProducts, addProduct } = require('../controllers/product')



router.get('/product/getallproducts', getAllProducts);
router.get('/product/getaproducts/:proId', getAProducts);


router.post('/product/createproduct', addProduct);

module.exports = router;