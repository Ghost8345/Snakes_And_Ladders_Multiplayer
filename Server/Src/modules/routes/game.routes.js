import express from 'express';
export const gameRouter = express.Router();
import { createGame, joinGame, move, updateBoard, getAllGames } from '../controller/game.controller.js';
gameRouter.use(express.json());

gameRouter.get("/", getAllGames)
gameRouter.post("/createGame", createGame);
gameRouter.post("/joinGame", joinGame);
gameRouter.post("/move", move)
gameRouter.get("/updateBoard/:gameId", updateBoard)
