import jwt from "jsonwebtoken"
import User from "../../models/user.js"

export const verifyToken = async (req, res, next) => {

    let token = req.headers["authorization"]
    const { userId } = req.body;
    if (!token) {
        return res.status(403).send("No token passed")
    }
    try {
        token = token.split(' ')[1]
    } catch (error) {
        return res.status(401).send("Token not correct format")

    }

    try {
        console.log("token before verify:", token)
        const decodedPayload = jwt.verify(token, "fdsoiuhrjiuhiuegrS")
        console.log("Decoded Payload after verify:", decodedPayload)

        const user = await User.findOne({
            where: {
                userName: decodedPayload.userName
            }
        });

        console.log(user)

        if (user.id !== userId) {
            return res.status(401).send("Invalid token")
        }

        req.user = decodedPayload
    } catch (error) {
        return res.status(401).send("Invalid token")
    }
    return next()
}