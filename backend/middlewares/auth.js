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
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Session expired, please login again" });
        }
        console.error("Auth Error:", error.message);
        res.status(401).json({ success: false, message: "Invalid token" });
    }
}


export default authMiddleware;