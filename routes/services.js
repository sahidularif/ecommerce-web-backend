const express = require('express')
const { getAllOrder } = require('../handler/service.handler')
const { isAdmin } = require('../handler/authHelper')
const router = express.Router()

router.get('/getAllOrder', isAdmin, getAllOrder)



module.exports = {
    productRoute: router,
}