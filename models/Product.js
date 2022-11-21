const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({
    title: String,
    description: String,
    price: Number,
    size: {
        xs: Boolean,
        s: Boolean,
        m: Boolean,
        l: Boolean,
        xl: Boolean,
        xxl: Boolean,
    },
    color: {
        color1: String,
        color2: String,
        color3: String,
    },
    img_url: String,
}, { timestamps: false });

module.exports = mongoose.model('Product', product)
