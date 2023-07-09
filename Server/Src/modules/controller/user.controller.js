import { userSchema } from "../../models/user.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const createUser = async (req, res) => {
    let { userName, password } = req.body;
    if(!userName || !password) {
      res.status(400).send("Username and/or password missing")
    }

    const encryptedPassword =await bcrypt.hash(password, 10);
    password = encryptedPassword
    try {
      let users = await userSchema.create({ userName, password });
      const payload = {
        userName: userName,
        password: encryptedPassword
      }
      const token = jwt.sign(payload,"fdsoiuhrjiuhiuegrS")



      res.json({token:token, payload:payload});
    } catch (error) {
        console.log(error, "----------");
        res.json({ message: "error " });
    }

};

export const logIn = async (req, res) => {
  let { userName, password } = req.body;
  if(!userName || !password) {
    res.status(400).send("Username and/or password missing")
  }

  const encryptedPassword =await bcrypt.hash(password, 10);
  password = encryptedPassword


  const user = await userSchema.findAll({
      where: {
          userName: userName,
          password: password,
      },
  });

    user.length && res.send({ message: "founded", user });
    !user.length && res.send({ message: "notFounded" });

    const payload = {
      userName: userName,
      password: encryptedPassword
    }
    const token = jwt.sign(payload,"fdsoiuhrjiuhiuegrS")
};

