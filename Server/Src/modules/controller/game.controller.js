import { gameSchema } from "../../models/game.js";
import { userGameSchema } from "../../models/usergame.js";



export const createGame =
    async (req, res) => {

        const { boardId, createdBy, status, lastTurn, NoOfPlayers } = req.body
        const games = await gameSchema.create({ boardId, createdBy, status, lastTurn, NoOfPlayers })
        res.json(games);
    }





export const joinGame = async (req, res) => {

};

