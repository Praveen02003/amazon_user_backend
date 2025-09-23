import jwt from "jsonwebtoken";
const JWT_SECRET = "92297557";
export const verifytoken=(req,res,next)=>{
    //console.log("====>",req.headers["authorization"]);
    var token=""
    token=req.headers["authorization"].split(" ")[1]
    //console.log(token);
    
    try 
    {
       
        if (token) 
        {
            //console.log("===>",token);
            const decoded = jwt.verify(token, JWT_SECRET);
            // console.log(decoded)            
            req.id=decoded.id
            //console.log(req.id)
            next()
            
        }
        
    } 
    catch (error) 
    {
        res.json({message:error.message})
        //console.log(error.message);
        
    }
}