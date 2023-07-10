import jwt from "jsonwebtoken"
import { userSchema } from "../../models/user.js"
import { secret } from "../../../config.js"


export const verifyToken = async (req,res, next) => {
    let token = req.headers["authorization"]
    const {userId} = req.body;
    if(!token){
        return res.status(403).send("No token passed")
    }
    try {
        token = token.split(' ')[1]
    } catch (error) {
        return res.status(401).send("Token not correct format")

    }

    try {
        console.log("token before verify:", token)
        const decodedPayload = jwt.verify(token,secret)
        console.log("Decoded Payload after verify:", decodedPayload)
        req.body = {
            ...req.body, // Keep existing properties
            userId: decodedPayload.userId// Add a new property
          };
    } catch (error) {
        return res.status(401).send("Invalid token")
    }
    return next()
}