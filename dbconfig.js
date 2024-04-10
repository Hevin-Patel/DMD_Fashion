const mongoose = require('mongoose')
require('dotenv').config()

let url=process.env.URL
mongoose.connect(url)
.then(()=>{
    console.log("Database connection established")
})
.catch(err=>{
    console.log("Error :",err)
})