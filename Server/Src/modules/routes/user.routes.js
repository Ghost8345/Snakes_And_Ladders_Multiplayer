import express from 'express';
export const userRouter = express.Router();
import { createUser, logIn } from '../controller/user.controller.js';
import { userSchema } from '../../models/user.js';
userRouter.use(express.json());

userRouter.get("/", async (req, res) => {
    try {
        const users = await userSchema.findAll({});
        res.status(200).json({users});
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

userRouter.post("/createUser", createUser);
userRouter.post("/login", logIn);
