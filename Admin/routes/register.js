const express = require('express');
const router = express.Router();

const { getAllRestaurants, getARestaurant, registerRestaurant } = require("../controllers/register");

router.get('/restaurant/all', getAllRestaurants);
router.get('/restaurant/all/:resId', getARestaurant)

router.post('/restaurant/register', registerRestaurant);



module.exports = router;