const cartSchema = require('../Model/CartModel')

const createCart = (req, res) =>{
    const cart = new cartSchema(req.body)
    cart.save()
    .then(()=>{
        res.send({message: 'Cart created successfully'})
    })
    .catch((err)=>{
        console.log(err)
        res.send({message: 'Error Occur In Creating Cart'})
    })
}

const readCart = (req, res) =>{
    cartSchema.find()
    .then((cart)=>{
        res.send(cart)
    })
    .catch((err)=>{
        console.log(err)
        res.send({message: 'Error Occur In Getting Cart'})
    })
}

const updateCart = (req, res) =>{
    const id = req.params.id
    cartSchema.findByIdAndUpdate(id, req.body)
    .then(()=>{
        res.send({message: 'Cart updated successfully'})
    })
    .catch((err)=>{
        console.log(err)
        res.send({message: 'Error Occur In Updating Cart'})
    })
}

const deleteCart = (req, res) =>{
    const id = req.params.id
    cartSchema.findByIdAndDelete(id)
    .then(()=>{
        res.send({message: 'Cart deleted successfully'})
    })
    .catch((err)=>{
        console.log(err)
        res.send({message: 'Error Occur In Deleting Cart'})
    })
}

module.exports = {createCart, readCart, updateCart, deleteCart}