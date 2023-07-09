import { gameSchema } from "../../models/game.js";
import { userGameSchema } from "../../models/usergame.js";

export const createGame = async (req, res) => {
    const { boardId, createdBy, status, lastTurn, numberOfPlayers } = req.body;
    const games = await gameSchema.create({ boardId, createdBy, status, lastTurn, numberOfPlayers });
    res.json(games);
};

export const joinGame = async (req, res) => {
    let { userId, gameId, color } = req.body;
    let position = 0;
    let status = "active";

    const gameFound = await gameSchema.findOne({
        where: {
            id: gameId,
        },
    });
    if (!gameFound) {
        res.send({ message: "notFounded" });
    } else {
        const playersJoined = await userGameSchema.findAll({
            where: {
                gameId: gameId,
            },
        });
        res.json(gameFound.numberOfPlayers);
        if (playersJoined.length === gameFound.numberOfPlayers) {
            res.json("Cannot join Full Game");
        } else if (playersJoined.length === gameFound.numberOfPlayers - 1) {
            await userGameSchema.create({ userId, gameId, position, status, color });
            await gameSchema.update(
                { status: "Started" },
                {
                    where: {
                        id: gameId,
                    },
                }
            );
            res.json("Last Player");
        } else {
            await userGameSchema.create({ userId, gameId, position, status, color });

        }
    }
};

export const move = async (req, res) => {
    const { userId, gameId } = req.body;

    const playersList = await userGameSchema.findAll({
        where: {
            gameId: gameId,
        },
    });

    const playerIds = []

    playersList.map( (player) => {
        playerIds.push(player.userId)
    })

    


};
