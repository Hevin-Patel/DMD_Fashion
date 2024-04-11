const jwt=require('jsonwebtoken')

let MW=(req,res,next)=>{
    let token=req.headers.authorization.split(" ")[1]
    if(token!=null){
        try{
            let correctToken=jwt.verify(token,'heveen')
            if(correctToken){
                next()
            }
            else{
                res.send({message: "User Not Logged In"})
            }
        }
        catch(err){
            res.send({err:err})
        }
    }        
    else{
        res.send({message:"Token Not Available."})
    }
}

module.exports=MW