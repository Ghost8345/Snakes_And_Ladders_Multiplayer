import express from 'express';
export const gameRouter = express.Router();
import { createGame, joinGame, move, updateBoard, getAllGames,leaveGame ,deleteGame, getPlayersNames} from '../controller/game.controller.js';
gameRouter.use(express.json());

gameRouter.get("/", getAllGames)
gameRouter.post("/createGame", createGame);
gameRouter.post("/joinGame", joinGame);
gameRouter.post("/move", move)
gameRouter.get("/updateBoard/:gameId", updateBoard)
gameRouter.post("/leaveGame", leaveGame);
gameRouter.post("/deleteGame", deleteGame);
gameRouter.post("/getPlayers", getPlayersNames)
