const jwt=require('jsonwebtoken')

let AdminMW=(req,res,next)=>{
    let token=req.headers.authorization.split(" ")[1]
    if(token!=null){
        try{
            let correctToken=jwt.verify(token,'heveen')
            if(req.body.isAdmin && correctToken){
                next()
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

module.exports=AdminMW