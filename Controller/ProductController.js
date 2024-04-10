const {product, productJoi} = require('../Model/ProductModel')

const createProduct = (req,res) =>{
    const {error, value}=productJoi.validate(req.body)
    if(error){
        console.log(error)
        res.send({message:"Error In Validating Product Info"})
    }
    else{
        let Data = new product(value)

        Data.save()
        .then(() => {
            res.send({message:"Product created successfully"})
        })
        .catch((err) => {
            console.log(err)
            res.send({message:"Error Occur In Creating Product"})
         })
    }
}

const readProduct = (req,res) =>{
    product.find({isDelete:false})
    .then((products) => {
        res.send({message:"User Read Successfully",products})
    })
    .catch((err) => {
        console.log(err)
        res.send({message:"Error Occur"})
    })
}

const updateProduct = (req,res) =>{
    product.findOne({ProductName:req.body.ProductName})
    .then((value) => {
        if(value){
            product.updateOne({ProductName:req.body.ProductName}, req.body)
            .then(() => {
                 res.send({message:"Product Updated Successfully"})
             })
            .catch((err) => {
                 console.log(err)
                 res.send({message:"Error Occur In Updating Product"})
             })
        }
        else{
            res.send({message:"Product Not Found"})
        }
    })
}

const deleteProduct = (req,res) =>{
    product.findOne({ProductName:req.body.ProductName})
    .then((value) => {
        if(value){
            product.updateOne({ProductName:req.body.ProductName}, {isDelete:true})
            .then(() => {
                 res.send({message:"Product Deleted Successfully"})
             })
            .catch((err) => {
                 console.log(err)
                 res.send({message:"Error Occur In Deleting Product"})
             })
        }
        else{
            res.send({message:"Product Not Found"})
        }
    })
}

module.exports = {createProduct, readProduct, updateProduct, deleteProduct}