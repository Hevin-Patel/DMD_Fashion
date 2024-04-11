const order = require('../Model/OrderModel')
const {product} = require('../Model/ProductModel')

const createOrder = async(req,res) => {
    let TotalPrice = 0
    let Order = req.body.Order
    for (let i of Order) {
        let ProductId=i.ProductId
        let Quantity = i.Quantity

        await product.findOne({_id:ProductId})
        .then((resp)=>{
            TotalPrice = TotalPrice + (resp.Price * Quantity)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    req.body.TotalPrice = TotalPrice
    let Data = new order(req.body)

    Data.save()
   .then(() => {
        res.send({message:"Order Created Successfully"})
    })
    .catch((err) => {
        console.log(err)
        res.send({message:"Error Occur"})
    })
}

const readOrder = (req, res) => {
    order.find()
   .then((resp) => {
        res.send(resp)
   })
   .catch((err) => {
        console.log(err)
        res.send({message:"Error Occur"})
    })
}

module.exports = {createOrder, readOrder}