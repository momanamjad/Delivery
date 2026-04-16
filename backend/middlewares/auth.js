import jwt from "jsonwebtoken"

  const authMiddleware = async(req,res,next)=>{
    const {token} = req.headers;
    if(!token){
        return res.status(401).json({message:"Unauthorized, login again"})
    }
    try {
        const token_decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = token_decoded;
        if (!req.body) req.body = {};
        req.body.userid = token_decoded.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({success:false,message:"error"})
    }
}


export default authMiddleware;