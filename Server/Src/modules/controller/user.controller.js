import { userSchema } from "../../models/user.js";

export const createUser = async (req, res) => {
    let { userName, password } = req.body;

    try {
        let users = await userSchema.create({ userName, password });
        res.json({ message: "user created", users });
    } catch (error) {
        console.log(error, "----------");
        res.json({ message: "user already exist " });
    }
};

export const logIn = async (req, res) => {
    let { userName, password } = req.body;

    const user = await userSchema.findAll({
        where: {
            userName: userName,
            password: password,
        },
    });

    user.length && res.send({ message: "founded", user });
    !user.length && res.send({ message: "notFounded" });
};

