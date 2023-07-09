import { gameSchema } from "../../models/game.js";
import { userGameSchema } from "../../models/usergame.js";

export const createGame = async (req, res) => {
    
    const { boardId, createdBy, numberOfPlayers,userId,color } = req.body;
    let status="pending"
    let lastTurn=null
    const games = await gameSchema.create({ boardId, createdBy, status, lastTurn, numberOfPlayers });
    status ="active"
    let position =0;
    let gameId=games.id;
    await userGameSchema.create({ userId, gameId, position, status, color });
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
    res.status(400).send({ message: "Not Found" });
  } else {
    const playersJoined = await userGameSchema.findAll({
      where: {
        gameId: gameId,
      },
    });
    console.log(gameFound.numberOfPlayers);
    if (playersJoined.length == gameFound.numberOfPlayers) {
      console.log("Cannot joiin Full Game");
    } else if (playersJoined.length == gameFound.numberOfPlayers - 1) {
      await userGameSchema.create({ userId, gameId, position, status, color });
      await gameSchema.update(
        { status: "Started" },
        {
          where: {
            id: gameId,
          },
        }
      );
     
      return res.status(200).json(players)
    } else {
      await userGameSchema.create({ userId, gameId, position, status, color });
      return res.status(200)
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

    if (!playerIds.includes(userId)){
        return res.status(400).send("Player Not in Players List")
    }

    const game = await gameSchema.findOne({
        where: {
          id: gameId,
        },
    });






};
