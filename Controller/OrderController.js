const orderSchema = require('../Model/OrderModel')

const createOrder = (req,res) => {
    let order = new orderSchema(req.body)

    order.save()
   .then(() => {
        res.send({message:"Order Created Successfully"})
    })
    .catch((err) => {
        console.log(err)
        res.send({message:"Error Occur"})
    })
}

const readOrder = (req, res) => {
    orderSchema.find()
   .then((value) => {
        res.send(value)
   })
   .catch((err) => {
        console.log(err)
        res.send({message:"Error Occur"})
    })
}

module.exports = {createOrder, readOrder}