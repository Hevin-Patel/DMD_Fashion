const WishList = require('../Model/WishListModel')

const createWishList = (req, res) =>{
    let Data = new WishList(req.body)
    Data.save()
    .then(()=>{
        res.send({message : "Wish List saved successfully"})
    })
    .catch((err)=>{
        console.log(err)
        res.send({message :"Error saving wish list"})
    })
}

const readWishList = (req, res) =>{
    WishList.find().populate("ProductId")
   .then((resp) => {
        res.send(resp)
   })
   .catch((err) => {
        console.log(err)
        res.send({message :"Error reading wish list"})
    })
}

const deleteWishList = (req, res) =>{
    let _id = req.params.id
    WishList.findById(_id)
    .then((resp) => {
        if(resp){
            WishList.findByIdAndDelete(_id)
            .then(()=>{
                res.send({message : "Wish List deleted successfully"})
            })
            .catch((err)=>{
                console.log(err)
                res.send({message :"Error deleting wish list"})
            })
        }
        else{
            res.send({message : "Wish List does not exist"})
        }
    })
    .catch((err) => {
        console.log(err)
        res.send({message :"Error deleting wish list"})
    })
}

module.exports = {createWishList, readWishList, deleteWishList}