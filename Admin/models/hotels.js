const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const hotelSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    logo: {
        type: String,
        required: true
    },

    products: {
        type: [String],
    },

    location: {
        type: String,
        required: true
    },

    offers: {
        type: Number
    },
    rating: {
        type: Number
    },
    avg_time_delivery: {
        type: String,
        required: true
    }

}, { timestamps: true })



module.exports = mongoose.model("Hotels", hotelSchema);