const express = require('express');
const router = express.Router();
const { getAllProducts, getAProducts, addProduct } = require('../controllers/product')



router.get('/demo/getallproducts', getAllProducts);
router.get('/demo/getaproducts/:proId', getAProducts);


router.post('/demo/createproduct', addProduct);

module.exports = router;