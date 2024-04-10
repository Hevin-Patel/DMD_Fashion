const wishListSchema = require('../Model/WishListModel')

const createWishList = (req, res) =>{
    const newWishList=new wishListSchema(req.body)
    newWishList.save()
    .then(()=>{
        res.send({message : "Wish List saved successfully"})
    })
    .catch((err)=>{
        console.log(err)
        res.send({message :"Error saving wish list"})
    })
}

const readWishList = (req, res) =>{
    wishListSchema.find().populate("ProductId")
   .then((product) => {
        res.send(product)
   })
   .catch((err) => {
        console.log(err)
        res.send({message :"Error reading wish list"})
    })
}

const deleteWishList = (req, res) =>{
    wishListSchema.findOne({_id:req.params.id})
    .then((product) => {
        if(product){
            wishListSchema.deleteOne({_id:req.params.id})
            .then(()=>{
                res.send({message : "Wish List deleted successfully"})
            })
            .catch((err)=>{
                console.log(err)
                res.send({message :"Error deleting wish list"})
            })
        }
    })
}

module.exports = {createWishList, readWishList, deleteWishList}