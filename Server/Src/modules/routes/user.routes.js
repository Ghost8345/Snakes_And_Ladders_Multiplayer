import express from 'express';
export const userRouter = express.Router();
import { createUser, logIn } from '../controller/user.controller.js';
userRouter.use(express.json());

userRouter.get("/", async (req, res) => {

    res.send("hello from the other side ");
})



userRouter.post("/createUser", createUser);

userRouter.post("/login", logIn);

