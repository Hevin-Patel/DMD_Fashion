const express = require('express')

const {createWishList, readWishList, deleteWishList} = require('../Controller/WishListController')
const MiddleWare = require('./MiddleWare')

const router = express.Router()

router.post('/createWishList', createWishList)
router.get('/readWishList', readWishList)
router.post('/deleteWishList/:id', deleteWishList)

module.exports = router