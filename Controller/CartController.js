const Cart = require('../Model/CartModel')

const createCart = (req, res) =>{
    let Data = new Cart(req.body)
    Data.save()
    .then(()=>{
        res.send({message: 'Cart created successfully'})
    })
    .catch((err)=>{
        console.log(err)
        res.send({message: 'Error Occur In Creating Cart'})
    })
}

const readCart = (req, res) =>{
    Cart.find().populate("ProductId")
    .then((cart)=>{
        res.send(cart)
    })
    .catch((err)=>{
        console.log(err)
        res.send({message: 'Error Occur In Getting Cart'})
    })
}

const updateCart = (req, res) =>{
    const _id = req.params.id
    Cart.findByIdAndUpdate(_id, req.body)
    .then(()=>{
        res.send({message: 'Cart updated successfully'})
    })
    .catch((err)=>{
        console.log(err)
        res.send({message: 'Error Occur In Updating Cart'})
    })
}

const deleteCart = (req, res) =>{
    const _id = req.params.id
    Cart.findByIdAndDelete(_id)
    .then(()=>{
        res.send({message: 'Cart deleted successfully'})
    })
    .catch((err)=>{
        console.log(err)
        res.send({message: 'Error Occur In Deleting Cart'})
    })
}

module.exports = {createCart, readCart, updateCart, deleteCart}