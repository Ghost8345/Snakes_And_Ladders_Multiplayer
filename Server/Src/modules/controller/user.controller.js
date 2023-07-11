import { userSchema } from "../../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
    let { userName, password } = req.body;
    if (!userName || !password) {
        res.status(400).send("Username and/or password missing");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    console.log(encryptedPassword);
    password = encryptedPassword
    try {
        let users = await userSchema.create({ userName, password });
        const payload = {
            userName: userName,
            password: encryptedPassword
        };
        const token = jwt.sign(payload, "fdsoiuhrjiuhiuegrS");

        res.json({ token: token, payload: payload });
    } catch (error) {
        console.log(error, "----------");
        res.json({ message: "error " });
    }
};

export const logIn = async (req, res) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        res.status(400).send("Username and/or password missing");
    }
    console.log(req.body);

    const user = await userSchema.findOne({
        where: {
            userName: userName
        }
    });
    console.log(user.password, " ", password)
    console.log(">>", await bcrypt.compare(password, user.password))
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).send("invalid credentials");
    }
    console.log(user);

    const payload = {
        userName: userName,
        password: user.password
    };
    const token = jwt.sign(payload, "fdsoiuhrjiuhiuegrS");

    return res.status(200).json({ token: token, payload: payload });
};
