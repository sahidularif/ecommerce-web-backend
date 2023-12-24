const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({
    title: String,
    description: String,
    price: Number,
    color: {
        color1: String,
        color2: String,
        color3: String,
    },
    size: [String],
    images: [String],
}, { timestamps: false });

module.exports = mongoose.model('Product', product)
