import express from 'express';
export const userRouter = express.Router();
import { createUser, logIn } from '../controller/user.controller.js';
import User from '../../models/user.js';
userRouter.use(express.json());

userRouter.get("/", async (req, res) => {
    res.status(200).json({message: "Responding from user router"});
});

userRouter.post("/createUser", createUser);
userRouter.post("/login", logIn);
