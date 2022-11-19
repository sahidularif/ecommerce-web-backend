const express = require('express')
const { addArticle, getAllArticle, getSingleArticle } = require('../handler/article.handler')
const { isAdmin } = require('../handler/authHelper')
const router = express.Router()

router.post('/addArticle', isAdmin, addArticle)
router.get('/articles', isAdmin, getAllArticle)
router.get('/article/:_id', isAdmin, getSingleArticle);



module.exports = {
    articleRoute: router,
}