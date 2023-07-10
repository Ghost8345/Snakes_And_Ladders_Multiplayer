import { gameSchema } from "../../models/game.js";
import { userGameSchema } from "../../models/usergame.js";
import { io } from "../../index.js"
let count = 0;
import { elementSchema } from "../../models/element.js";
import { boardSchema } from "../../models/board.js";


/*
SOCKET 
1/ connect on opening webpage
2/ ask to create or join game
    when creating games : - create new room id,
                          - join player in socket room with that id
                          - store it in db in game table,
                          - store the user socket id in game user table
    when joining games  : - get the room id from db
                          - join player in socket room with that id
                          - store the user socket id in game user table
3/ on playing: in player turn he sends a request to the back for the move
   when the move is over, we emit to that room a json {type: 'update'|'disconnect'|'notifyleave'|'gameover' , response: ''}


*/



export const createGame = async (req, res) => {
    const { boardId, createdBy, lastTurn, numberOfPlayers } = req.body;
    const games = await gameSchema.create({ boardId, createdBy, lastTurn, numberOfPlayers });

    
    res.json(games);

  const { boardId, createdBy, numberOfPlayers, userId, color } = req.body;
  let status = "pending"
  let lastTurn = null
  const board = await boardSchema.findOne({
    where: {
      id: boardId
    }
  });

  if (!board) {
    return res.status(400).json({ Message: "Board is not found " })
  }

  const games = await gameSchema.create({ boardId, createdBy, status, lastTurn, numberOfPlayers });
  status = "active"
  let position = 0;
  let gameId = games.id;

  await userGameSchema.create({ userId, gameId, position, status, color });

  // TODO : assign a unique string as game id and add it to the database. this string will be the room id
  const roomId = "room-"+boardId+"-"+createdBy
    io.on('connection', (socket) => {
        socket.join(roomId);
        console.log("connected inside of create game")
      });
  res.status(200).json({ games, board });
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
    return res.status(400).send("Game has reached the number of players required");
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
    const players = playersJoined.map((player) => {
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

  if (game.status == "Finished") {
    return res.status(400).send("Game is Finished");
  }

  const playersList = await userGameSchema.findAll({
    where: {
      gameId: gameId,
    },
  });

  const elements = await elementSchema.findAll({
    where: {
      boardId: game.boardId
    }
  })

  console.log(elements)


  const playerIds = playersList.map((player) => {
    return player.userId
  })

  console.log("Player Id List: ", playersList)



  if (!playerIds.includes(userId)) {
    return res.status(400).send("Player Not in Players List")
  }


  const lastTurn = game.lastTurn;
  const indexOfLastPlayer = playerIds.indexOf(lastTurn)
  const indexOfCurrentPlayer = (indexOfLastPlayer + 1) % game.numberOfPlayers


  if (!lastTurn) {
    if (playerIds[0] != userId) {
      return res.status(400).send("Wrong Turn")
    }
  }
  else {

    if (playerIds[indexOfCurrentPlayer] != userId) {
      return res.status(400).send("Wrong Turn")
    }
  }

  const dice = rollDice()
  console.log(dice)

  const playerPostion = playersList.find(player => player.userId === userId).position
  console.log(playerPostion)

  let newPosition = playerPostion + dice;
  const elementAtNewPosition = elements.find(element => element.goFrom === (newPosition))

  if (elementAtNewPosition) {
    newPosition = elementAtNewPosition.goTo
  }
  console.log(newPosition)

  if (newPosition > 20) {
    newPosition = playerPostion
  }

  if (newPosition === 20) {
    await gameSchema.update(
      { status: "Finished" },
      {
        where: {
          id: gameId,
        },
      }
    )
  }



  const userGameId = playersList.find(player => player.userId === userId).id
  console.log(userGameId)

  await userGameSchema.update(
    { status: "active", position: newPosition },
    {
      where: {
        id: userGameId,
      },
    }
  );

  await gameSchema.update(
    { lastTurn: userId },
    {
      where: {
        id: gameId,
      },
    }
  )

  const movement = playerPostion !== newPosition ? "Move Successful" : "Move Failed (overflow)"

  return res.status(200).json({
    status: movement,
    position: newPosition
  })
};

const rollDice = () => { return Math.floor(Math.random() * (6)) + 1 }

export const updateBoard = async (req, res) => {

  const { userId } = req.body;
  const { gameId } = req.params


  const game = await gameSchema.findOne({
    where: {
      id: gameId,
    },
  });

  if (!game) {
    return res.status(400).send("Game Not Found");
  }

  const players = await userGameSchema.findAll({
    where: {
      gameId: gameId,
    },
  });

  const player = players.find(player => player.userId == userId)
  console.log("Player: ", player)

  if (!player) {
    return res.status(400).send("Player not found in game");
  }

  const board = await boardSchema.findOne({
    where: {
      id: game.boardId
    }
  })

  const elements = await elementSchema.findAll({
    where: {
      boardId: game.boardId
    }
  })

  return res.status(200).json({ players, elements, game, board })

};
