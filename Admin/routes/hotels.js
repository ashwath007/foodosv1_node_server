const express = require('express');
const router = express.Router();
const { getAllHotels, getAHotels, addHotel, getAllProductsFromHotel, addProductToHotel, getAllHotelsFromProduct } = require("../controllers/hotels");



router.get('/hotel/getallhotels', getAllHotels);
router.get('/hotel/getahotels/:hotId', getAHotels);

router.post('/hotel/createhotel', addHotel);



// router.post('/hotel/:hotelId/product', addProductToHotel);
router.get('/hotel/:hotelId/allproducts', getAllProductsFromHotel);
router.get('/hotel/:foodName/allHotels', getAllHotelsFromProduct);

module.exports = router;