const express = require('express')
const { getAllProduct, addProduct, addCategory, getSingleProduct } = require('../handler/service.handler')
const { isAdmin } = require('../handler/authHelper')
const router = express.Router()

router.get('/getAllProduct', getAllProduct);
router.get('/single_product/:_id', isAdmin, getSingleProduct);
router.post('/addProduct', isAdmin, addProduct)

module.exports = {
    productRoute: router,
}