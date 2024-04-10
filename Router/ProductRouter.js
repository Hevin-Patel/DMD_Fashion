const express = require('express')
const {createProduct, readProduct, updateProduct, deleteProduct} = require('../Controller/ProductController')
const MiddleWare = require('./MiddleWare')

const router = express.Router()

router.post('/createProduct', createProduct)
router.get('/readProduct', readProduct)
router.post('/updateProduct', updateProduct)
router.post('/deleteProduct', deleteProduct)

module.exports = router