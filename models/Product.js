const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({
    title: String,
    description: String,
    price: Number,
    size: {
        xs: Boolean,
        sm: Boolean,
        m: Boolean,
        l: Boolean,
        xl: Boolean,
        xxl: Boolean,
    },
    color: {
        color_1: String,
        color_2: String,
        color_3: String,
    },
    img_url: String,
}, { timestamps: false });

module.exports = mongoose.model('Product', product)
