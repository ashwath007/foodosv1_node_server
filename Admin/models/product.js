const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32
    },
    product_img: {
        type: String,
        required: true
    },
    hotels: {
        type: String
    },
    product_id: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    cousin: {
        type: String
    },
    food_type: {
        type: String
    },
    product_desc: {
        type: String,
        required: true
    },





});


module.exports = mongoose.model('Product', productSchema);