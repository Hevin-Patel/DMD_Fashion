const mongoose = require('mongoose')

let cartSchema=mongoose.Schema({
    ProductId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    UserId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Quantity : {
        type: Number,
        default: 1
    }
})

module.exports = cartSchema