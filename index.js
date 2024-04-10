const express = require('express')
const cors= require('cors')
require('dotenv').config()
const user=require('./Router/UserRouter')
const product=require('./Router/ProductRouter')
const wishList=require('./Router/WishListRouter')
const cart=require('./Router/CartRouter')
const order=require('./Router/OrderRouter')
let port=process.env.PORT

require('./dbconfig')

let app = express()

app.use(cors())
app.use(express.json())
app.use('/user', user)
app.use('/products', product)
app.use('/wishlist', wishList)
app.use('/cart', cart)
app.use('/order', order)

app.listen(port,()=>{
    console.log("listening on ", port)
})