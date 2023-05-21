const express = require('express')
const multer = require('multer')
const { getAllOrder, getAllProduct, addProduct, addCategory, getAllCategory, getSingleCategory, updateCategory, deleteCategory } = require('../handler/service.handler')
const { isAdmin } = require('../handler/authHelper')
const { getSingleArticle } = require('../handler/article.handler')
const upload = require('../handler/uploadHandler')
const router = express.Router()

router.get('/getAllOrder', isAdmin, getAllOrder)
router.get('/getAllCategory', isAdmin, getAllCategory)
router.get('/getAllProduct', isAdmin, getAllProduct)
router.get('/categories/:id', isAdmin, getSingleCategory);
router.get('/single_product/:_id', isAdmin, getSingleArticle);
router.post('/addProduct', isAdmin, addProduct)
router.post('/addCategory', upload.single('image'), addCategory)

// router.get('/categories/edit/:id', isAdmin, getAllCategory);

router.put('/updateCategory/:id', upload.single('image'), updateCategory);
router.delete('/deleteCategory/:id', upload.single('image'), deleteCategory);


module.exports = {
    productRoute: router,
}