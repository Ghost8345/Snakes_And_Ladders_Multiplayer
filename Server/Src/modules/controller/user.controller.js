import { userSchema } from "../../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { secret } from "../../../config.js";
export const createUser = async (req, res) => {
    let { userName, password } = req.body;
    if (!userName || !password) {
        res.status(400).json({message:"Username and/or password missing"});
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    console.log(encryptedPassword);
    password = encryptedPassword
    try {
        await userSchema.create({ userName, password });
        res.status(200).json({message: "success"});
    } catch (error) {
        res.status(400).json({ message: "error " });
    }
};

export const logIn = async (req, res) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        res.status(400).json({message:"Username and/or password missing"});
    }
    console.log(req.body);

    const user = await userSchema.findOne({
        where: {
            userName: userName
        }
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({message:"invalid credentials"});
    }

    const payload = {
        userName: userName,
        password: user.password,
        userId: user.id
    };
    const token  = jwt.sign(payload, secret);

    return res.status(200).json({ message:"success",token: token});
};
