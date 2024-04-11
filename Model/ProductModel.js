const mongoose = require('mongoose')
const joi = require('joi')

let productSchema=mongoose.Schema({
    ProductName:String,
    ProductImage:String,
    ProductDes:String,
    Quantity:Number,
    Price:Number,
    MaxDiscount:Number,
    isDeleted:{
        type:Boolean,
        default:false
    }
})

let productJoi=joi.object({
    ProductName:joi.string().required(),
    ProductImage:joi.string().required(),
    ProductDes:joi.string().required(),
    Qty:joi.number(),
    Price:joi.number().required(),
    MaxDiscount:joi.number().required()
})

let productUpdateJoi=joi.object({
    ProductName:joi.string(),
    ProductImage:joi.string(),
    ProductDes:joi.string(),
    Qty:joi.number(),
    Price:joi.number(),
    MaxDiscount:joi.number()
})

let product = mongoose.model('Product', productSchema)

module.exports = {product, productJoi, productUpdateJoi}