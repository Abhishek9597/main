import jwt from "jsonwebtoken";


const secretKey = process.env.JWT_SECRET;
export const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization')
        if(!token){
            return res.status(401).json({message: "Authorization token is missing"})
        }
        jwt.verify(token,secretKey, async (err, decoded) => {
            if(err){
                if(err.name === "TokenExpiredError"){
                    return res.status(498).json({message: "Token is expired"})
                }
                console.log(err.message);
                return res.status(700).json({message:"invalid token"})                
            }
            if(!decoded.userId){
                console.log(decoded.userId);
                return res.status(700).json({message: "Token is invalid : ID not found"})
            }
            req.user = decoded
            next()
        })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}