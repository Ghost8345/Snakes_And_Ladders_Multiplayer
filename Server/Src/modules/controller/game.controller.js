import { gameSchema } from "../../models/game.js";
import { userGameSchema } from "../../models/usergame.js";
let count = 0;

export const createGame = async (req, res) => {
    const { boardId, createdBy, status, lastTurn, numberOfPlayers } = req.body;
    const games = await gameSchema.create({ boardId, createdBy, status, lastTurn, numberOfPlayers });
    res.json(games);
};

// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Im1lbmEiLCJwYXNzd29yZCI6IiQyYSQxMCRETXFWOXdTc3Blay5XNHlQUFBlRW91dUJ1cVl0cWE5S09lVXdPbTd4MDJVSEdMLjhIZjFMLiIsImlhdCI6MTY4ODkwNjMyN30.zh_W9ogqPRawME7yUjlh8aVKF2aa-ElcF9mElPvZ5i8
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
        console.log(playersJoined.length);
    }
};
