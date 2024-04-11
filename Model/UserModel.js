const mongoose = require('mongoose')
const joi = require('joi')

let userSchema=mongoose.Schema({
    UserName:String,
    Email:String,
    ContactNo:String,
    Password:String,
    isDeleted:{
        type:Boolean,
        default:false
    }
})

let userCreateJoi=joi.object({
    UserName:joi.string().pattern(new RegExp('^[a-zA-Z ]{1,30}$')).required(),
    Email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    ContactNo:joi.string().length(10).regex(/^\d+$/).required(),
    Password:joi.string().required()
})

let userUpdateJoi=joi.object({
    UserName:joi.string().pattern(new RegExp('^[a-zA-Z ]{1,30}$')),
    ContactNo:joi.string().length(10).regex(/^\d+$/),
    Password:joi.string()
})

let user = mongoose.model('User',userSchema)

module.exports = {user, userCreateJoi, userUpdateJoi}