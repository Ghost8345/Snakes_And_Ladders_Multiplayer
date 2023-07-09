import { gameSchema } from "../../models/game.js";
import { userGameSchema } from "../../models/usergame.js";


export const createGame = async (req, res) => {
  // TODO
  let { ownerId, boardId } = req.body;
  console.log(
    "CREATE GAME REQUEST, CREATING GAME for ",
    ownerId,
    " board:",
    boardId
  );
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
      let players= []
      playersJoined.map((player)=>{
        players.push(player.userId)
      })
      players.push(parseInt(userId));
      res.send(players)
      console.log("Last Player");
    } else {
      await userGameSchema.create({ userId, gameId, position, status, color });
    }
    console.log(playersJoined.length);
  }
};
