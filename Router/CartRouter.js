const express = require('express')

const {createCart, readCart, updateCart, deleteCart} = require('../Controller/CartController')
const MiddleWare = require('./MiddleWare')

const router = express.Router()

router.post('/createCart', createCart)
router.get('/readCart', readCart)
router.post('/updateCart', updateCart)
router.post('/deleteCart', deleteCart)

module.exports = router