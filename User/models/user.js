const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32
    },
    age: {
        type: String
    },
    sex: {
        type: String
    },
    education: {
        type: String
    },
    profile_completed: {
        type: Boolean,
        required: true
    },
    user_rasa_id: {
        type: String,
    },
    wa_chatId: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
        }
    },
    nick_name: {
        type: String,
        required: true,
        maxlength: 32
    },


    // Here we are dealing with cart and Orders

    cart: {
        type: [Object]
    },

    order_active: {
        type: [String]
    },

    order_history: {
        type: [String]
    }

});



module.exports = mongoose.model("User", userSchema);