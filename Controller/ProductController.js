const {product, productJoi, productUpdateJoi} = require('../Model/ProductModel')

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
    product.find({isDeleted:false})
    .then((resp) => {
        res.send({message:"Products Read Successfully",resp})
    })
    .catch((err) => {
        console.log(err)
        res.send({message:"Error Occur"})
    })
}

const updateProduct = (req,res) =>{
    const {error, value}=productUpdateJoi.validate(req.body)
    if(error){
        console.log(error)
        res.send({message:"Error In Validating Product Info"})
    }
    else{
        product.findOne({ProductName:req.query.ProductName, isDeleted:false})
        .then((resp) => {
            if(resp){
                product.updateOne(resp, value)
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
        .catch((err) => {
            console.log(err)
            res.send({message:"No Such Product Found"})
        })
    }
}

const deleteProduct = (req,res) =>{
    product.findOne({ProductName:req.query.ProductName, isDeleted:false})
    .then((resp) => {
        if(resp){
            product.updateOne(resp, {isDeleted:true})
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