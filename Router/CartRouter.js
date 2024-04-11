const express = require('express')

const {createCart, readCart, updateCart, deleteCart} = require('../Controller/CartController')
const MiddleWare = require('./MiddleWare')

const router = express.Router()

router.post('/createCart', createCart)
router.get('/readCart', readCart)
router.post('/updateCart/:id', updateCart)
router.post('/deleteCart/:id', deleteCart)

module.exports = router