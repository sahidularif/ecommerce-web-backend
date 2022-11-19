const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const article = new Schema({
    title: String,
    article: String,
    image: String,
}, { timestamps: false });

module.exports = mongoose.model('Article', article)
