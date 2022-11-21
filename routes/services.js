const express = require('express')
const { getAllOrder, getAllProduct, addProduct } = require('../handler/service.handler')
const { isAdmin } = require('../handler/authHelper')
const { getSingleArticle } = require('../handler/article.handler')
const router = express.Router()

router.get('/getAllOrder', isAdmin, getAllOrder)
router.get('/getAllProduct', getAllProduct)
router.post('/addProduct', isAdmin, addProduct)
router.get('/single_product/:_id', isAdmin, getSingleArticle);



module.exports = {
    productRoute: router,
}