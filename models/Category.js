const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    // uid: String,
    categoryName: String,
    categoryType: String,
    parentCategory: String,
    status: {
        type: Boolean,
        default: false
    },
    image: String,
}, {timestamps: false});

module.exports  = mongoose.model('Category', categorySchema)
