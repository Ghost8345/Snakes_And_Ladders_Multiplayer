import jwt from "jsonwebtoken"
export const verifyToken = (req,res, next) => {
    
    let token = req.headers["authorization"]
    if(!token){
        return res.status(403).send("No token passed")
    }
    try {
        token = token.split(' ')[1]
    } catch (error) {
        return res.status(401).send("Token not correct format")

    }

    try {
        const decodedPayload = jwt.verify(token,"fdsoiuhrjiuhiuegrS")
        req.user = decodedPayload
    } catch (error) {
        return res.status(401).send("Invalid token")
    }
    return next()
}