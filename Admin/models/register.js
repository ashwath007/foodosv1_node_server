const mongoose = require('mongoose');


const restaurantRegister = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        maxlength: 32
    },

    logo: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});



module.exports = mongoose.model("Restaurant", restaurantRegister);