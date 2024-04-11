const mongoose = require('mongoose')

let wishListSchema=mongoose.Schema({
    ProductId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    UserId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('WishList', wishListSchema)