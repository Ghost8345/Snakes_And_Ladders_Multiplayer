import express from 'express';
export const gameRouter = express.Router();
import { createGame, joinGame, move, updateBoard } from '../controller/game.controller.js';
import { gameSchema } from '../../models/game.js';
gameRouter.use(express.json());

gameRouter.get("/", async (req, res) => {
    const { userId } = req.body;

    try {
        const games = await gameSchema.findAll({});
        res.status(200).json({ games });
    } catch (error) {
        console.error('Error retrieving games:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})



gameRouter.post("/createGame", createGame);

gameRouter.post("/joinGame", joinGame);

gameRouter.post("/move", move)

gameRouter.get("/updateBoard/:gameId", updateBoard)