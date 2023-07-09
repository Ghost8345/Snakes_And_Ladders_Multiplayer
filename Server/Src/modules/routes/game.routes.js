import express from 'express';
export const gameRouter = express.Router();
import { createGame, joinGame } from '../controller/game.controller.js';
gameRouter.use(express.json());

gameRouter.get("/", async (req, res) => {

    res.send("hello from the other side ");
})



gameRouter.post("/createGame", createGame);

gameRouter.post("/joinGame", joinGame);