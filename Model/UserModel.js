const mongoose = require('mongoose')
const joi = require('joi')

let userSchema=mongoose.Schema({
    UserName:String,
    Email:String,
    ContactNo:Number,
    Password:String,
    isDeleted:{
        type:Boolean,
        default:false
    }
})

let userCreateJoi=joi.object({
    UserName:joi.string().required(),
    Email:joi.string().required(),
    ContactNo:joi.number().required(),
    Password:joi.string().required()
})

let user = mongoose.model('User',userSchema)

module.exports = {user, userCreateJoi}