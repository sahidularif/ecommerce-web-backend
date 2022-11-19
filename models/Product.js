const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newProduct = new Schema({
    id: String,
    title: String,
    description: String,
    price: Number,
    img_url: String,
}, { timestamps: false });

module.exports = mongoose.model('Product', newProduct)
