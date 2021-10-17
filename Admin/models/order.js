const mongoose = require('mongoose');



const orderSchema = new mongoose.Schema({
    orderId: {
        type: Number,
        required: true
    },

    productData: {
        type: [Object],
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    },

    delivery_loaction: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
        }
    },

    payment_method: {
        type: String
    },

    order_status: {
        type: Number
    },






}, { timestamps: true })


module.exports = mongoose.model('Order', orderSchema);