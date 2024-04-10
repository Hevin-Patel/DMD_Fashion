const {user, userCreateJoi} = require('../Model/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = (req,res) => {
    let pass=req.body.Password
    let encryptedPass=bcrypt.hashSync(pass,10)
    req.body.Password=encryptedPass
    const {error, value}=userCreateJoi.validate(req.body)
    if(error){
        console.log(error)
        res.send({message:"Error In Validating User Info"})
    }
    else{
        let Data = new user(value)

        Data.save()
        .then(() => {
            res.send({message:"User created successfully"})
        })
        .catch((err) => {
            console.log(err)
            res.send({message:"Error Occur In Creating User"})
         })
    }
}

const loginUser = (req,res) => {
    let Pass=req.body.Password
    user.findOne({Email:value.email})
    .then((value) => {
        let decryptedPass=bcrypt.compareSync(Pass,value.Password)
        if(decryptedPass){
            let token=jwt.sign({Email:value.Email, Password:value.Password},'heveen',{expiresIn:'30m'})
            res.send({message:"User Logged In Successfully",token})
        }
        else{
            res.send({message:"Invalid Password"})
        }
    })
    .catch((err) => {
        console.log(err)
        res.send({message:"Invalid Email, Enter Valid Email"})
    })
}

const updateUser = (req,res) => {
    user.findOne({Email:req.body.Email})
    .then((value)=>{
        if(value){
            user.updateOne({Email:req.body.Email}, req.body)
            .then(()=>{
                 res.send({message:"User Updated Successfully"})
            })
            .catch((err)=>{
                 console.log(err)
                 res.send({message:"Error Occur In Update User"})
             })
        }
    })
    .catch((err)=>{
         console.log(err)
         res.send({message:"Error Occur In Finding User"})
     })
}

const deleteUser = (req,res) => {
    user.findOne({Email:req.body.Email})
    .then((value)=>{
        if(value){
            user.updateOne({Email:req.body.Email},{isDelete:true})
            .then(()=>{
                 res.send({message:"User Deleted Successfully"})
            })
            .catch((err)=>{
                 console.log(err)
                 res.send({message:"Error Occur In Delete User"})
             })
        }
    })
    .catch((err)=>{
         console.log(err)
         res.send({message:"Error Occur In Finding User"})
     })
}

const readUser = (req,res) =>{
    user.find({isDelete:false})
    .then((users) => {
        res.send({message:"User Read Successfully",users})
    })
    .catch((err) => {
        console.log(err)
        res.send({message:"Error Occur"})
    })
}

const forgotPassword = (req,res) => {
    let resetPass = Math.floor(Math.random()*1000)
    user.findOne({Email:req.body.Email})
    .then((value) => {
        if(value){
        user.updateOne({Email:req.body.Email}, {Password:resetPass})
        .then(() => {
            res.send({message:"Password Send Successfully",resetPass})
         })
        .catch((err) => {
            console.log(err)
            res.send({message:"Error Occur In Updating Password"})
        })
        }
    })
    .catch((err) => {
        console.log(err)
        res.send({message:"Error Occur In No Such User Found"})
    })
}

module.exports={registerUser, loginUser, updateUser, deleteUser, readUser, forgotPassword}