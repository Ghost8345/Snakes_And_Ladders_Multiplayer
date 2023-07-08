import express from 'express';
export const router = express.Router();
import { createUser, logIn } from '../controller/user.controller.js';
router.use(express.json());

router.get("/", async (req, res) => {

    res.send("hello from the other side ");
})



router.post("/createUser", createUser);

router.post("/login", logIn);