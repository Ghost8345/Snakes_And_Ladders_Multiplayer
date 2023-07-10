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
    res.status(200).json(games);
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
    return res.status(400).send("Game Not Found");
  }

  const playersJoined = await userGameSchema.findAll({
    where: {
      gameId: gameId,
    },
  });

  console.log("Max Number of Players for this Game: ", gameFound.numberOfPlayers);
  if (playersJoined.length == gameFound.numberOfPlayers) {
    return res.status(400).send("Game Not Found");
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
    const players = playersJoined.map( (player) => {
      return player.userId
    })

    players.push(userId)

    console.log(players)
    return res.status(200).json(players)
  } else {
    await userGameSchema.create({ userId, gameId, position, status, color });
    return res.status(200).send("Succesfuly Joined")
  }
  
};

export const move = async (req, res) => {
    const { userId, gameId } = req.body;

    const game = await gameSchema.findOne({
      where: {
        id: gameId,
      },
    });

    if (!game) {
      return res.status(400).send("Game Not Found");
    }

    const playersList = await userGameSchema.findAll({
        where: {
            gameId: gameId,
        },
    });


    const playerIds = playersList.map( (player) => {
      return player.userId
    })

    console.log("Player Id List: ", playerIds)



    if (!playerIds.includes(userId)){
        return res.status(400).send("Player Not in Players List")
    }


    const lastTurn = game.lastTurn;
    const indexOfLastPlayer = playerIds.indexOf(lastTurn)
    const indexOfCurrentPlayer = ( indexOfLastPlayer + 1 ) % game.numberOfPlayers


    if (!lastTurn){
        if (playerIds[0] != userId){
            return res.status(400).send("Wrong Turn")
        }
    }
    else {
        
        if (playerIds[indexOfCurrentPlayer] != userId){
            return res.status(400).send("Wrong Turn")
        }
    }




};
