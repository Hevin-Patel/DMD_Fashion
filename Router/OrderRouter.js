const express = require('express')

const {createOrder, readOrder}= require('../Controller/OrderController')
const MiddleWare = require('./MiddleWare')

const router = express.Router()

router.post('/createOrder', createOrder)
router.get('/readOrder', readOrder)

module.exports = router