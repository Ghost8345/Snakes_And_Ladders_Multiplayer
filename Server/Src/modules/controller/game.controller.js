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
