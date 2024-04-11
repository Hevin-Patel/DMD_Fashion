const {user, userCreateJoi, userUpdateJoi} = require('../Model/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async (req,res) => {
    const existEmail= await user.findOne({Email:req.body.Email})
    if(existEmail){
        res.send({message:"Email Already Exist"})
    }
    else{
        let encryptedPass=bcrypt.hashSync(req.body.Password,10)
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
}

const loginUser = (req,res) => {
    let Pass=req.body.Password
    user.findOne({Email:req.body.Email})
    .then((resp)=>{
        let decryptedPassword = bcrypt.compareSync(Pass, resp.Password)
        if(decryptedPassword){
            let token=jwt.sign({Email:resp.Email, Password:Pass},'heveen',{expiresIn:'30m'})
            res.send({message:"User Logged In Successfully",token})
        }
        else{
            res.send({message:"Invalid Password"})
        }
    })
    .catch((err) =>{
        console.log(err)
        res.send({message:"Invalid Email, Enter Valid Email"})
    })
}

const updateUser = (req,res) => {
    if(req.body.Password){
        let encryptedPass=bcrypt.hashSync(req.body.Password,10)
        req.body.Password=encryptedPass
    }    
    const {error,value}=userUpdateJoi.validate(req.body)
    if(error){
        console.log(error)
        res.send({message:"Enter Correct Data..."})
    }
    else{
        user.findOne({Email:req.query.Email, isDeleted:false})
        .then((resp)=>{
            if(resp){
                user.updateOne(resp, value)
                .then(()=>{
                    res.send({message:"User Updated Successfully"})
                })
                .catch((err)=>{
                    console.log(err)
                    res.send({message:"Error Occur In Update User"})
                })
            }
            else{
                res.send({message:"User Not Found"})
            }
        })
        .catch((err)=>{
            console.log(err)
            res.send({message:"Error Occur In Finding User"})
        })
    }
}

const deleteUser = (req,res) => {
    user.findOne({Email:req.query.Email, isDeleted:false})
    .then((resp)=>{
        if(resp){
            user.updateOne(resp, {isDeleted:true})
            .then(()=>{
                 res.send({message:"User Deleted Successfully"})
            })
            .catch((err)=>{
                 console.log(err)
                 res.send({message:"Error Occur In Delete User"})
             })
        }
        else{
            res.send({message:"User Not Found"})
        }
    })
    .catch((err)=>{
         console.log(err)
         res.send({message:"Error Occur In Finding User"})
     })
}

const readUser = (req,res) =>{
    user.find({isDeleted:false})
    .then((users) => {
        res.send({message:"User Read Successfully",users})
    })
    .catch((err) => {
        console.log(err)
        res.send({message:"Error Occur"})
    })
}

const forgotPassword = (req,res) => {
    user.findOne({Email:req.query.Email})
    .then((resp) => {
        if(resp){
        let resetPass = resp.UserName+Math.floor(Math.random()*1000)
        user.updateOne(resp, {Password:resetPass})
        .then(() => {
            res.send({message:"Password Send Successfully, Reset Password After Login...",resetPass})
         })
        .catch((err) => {
            console.log(err)
            res.send({message:"Error Occur In Updating Password"})
        })
        }
        else{
            res.send({message:"No Such User Found"})
        }
    })
    .catch((err) => {
        console.log(err)
        res.send({message:"Error Occur In No Such User Found"})
    })
}

module.exports={registerUser, loginUser, updateUser, deleteUser, readUser, forgotPassword}