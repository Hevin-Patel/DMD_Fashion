const mongoose = require('mongoose')

let orderSchema=mongoose.Schema({
    Order: Object,
    UserId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    TotalPrice: Number,
})

module.exports = mongoose.model('order', orderSchema)