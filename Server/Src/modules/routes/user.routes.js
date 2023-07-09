import express from 'express';
export const userRouter = express.Router();
import { createUser, logIn } from '../controller/user.controller.js';
import { userSchema } from '../../models/user.js';
userRouter.use(express.json());

userRouter.get("/", async (req, res) => {
    try {
        const games = await userSchema.findAll({});
        res.json({ games, message: "5" });
    } catch (error) {
        console.error('Error retrieving games:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

userRouter.post("/createUser", createUser);
userRouter.post("/login", logIn);
