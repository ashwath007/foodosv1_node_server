const express = require('express');
const router = express.Router();

const { completeUserProfile, isUserExist, addToCart, summaTestWA, userOrderPayment, removeFromCart, getUserData, getAllProductInCart, getallproductDataFromCart, userOrdernow, showUserOrders } = require('../controllers/user');


router.post('/user/create/profile', completeUserProfile);
router.post('/user/create/showOrder', showUserOrders);
router.post('/user/exist', isUserExist);
router.post('/user/getalldata', getUserData);


router.post('/user/:rasauserId/createprofile');
// router.post('/user/:rasauserId/showOrder', showUserOrders);

router.post('/test/trigger', summaTestWA)


// Here we handle Cart and Orders
router.post('/user/addtocart/:userId', addToCart);
router.post('/user/removefromcart/:userId', removeFromCart);
router.get('/user/:userId/getallproductfromcart', getAllProductInCart);
router.get('/user/:userId/getallproductdatafromcart', getallproductDataFromCart);
router.post('/user/:userId/ordernow', userOrdernow);
router.post('/user/:userId/orderpayment/:orderId', userOrderPayment);


module.exports = router;