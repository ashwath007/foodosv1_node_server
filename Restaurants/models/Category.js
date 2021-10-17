const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    },
    logo: {
        type: String,
        required: true,
        unique: true
    },
    sub: {
        type: [ObjectId],
        ref: "Sub",
        required: true
    }

}, { timestamps: true });


module.exports = mongoose.model("Category", categorySchema);