import UserGame from "../../models/usergame.js";
import Board from '../../models/board.js'
import Game from '../../models/game.js';
import Element from '../../models/element.js'
export const createGame = async (req, res) => {

  const { boardId, createdBy, numberOfPlayers, userId, color } = req.body;
  let status = "pending"
  let lastTurn = null
  const board = await Board.findOne({
    where: {
      id: boardId
    }
  });

  if (!board) {
    return res.status(400).json({ Message: "Board is not found " })
  }

  const games = await Game.create({ boardId, createdBy, status, lastTurn, numberOfPlayers });
  status = "active"
  let position = 0;
  let gameId = games.id;

  await UserGame.create({ userId, gameId, position, status, color });


  res.status(200).json({ games, board });
};

export const joinGame = async (req, res) => {
  let { userId, gameId, color } = req.body;
  let position = 0;
  let status = "active";

  const gameFound = await Game.findOne({
    where: {
      id: gameId,
    },
  });

  if (!gameFound) {
    return res.status(400).send("Game Not Found");
  }

  const playersJoined = await UserGame.findAll({
    where: {
      gameId: gameId,
    },
  });

  console.log("Max Number of Players for this Game: ", gameFound.numberOfPlayers);
  if (playersJoined.length == gameFound.numberOfPlayers) {
    return res.status(400).send("Game has reached the number of players required");
  } else if (playersJoined.length == gameFound.numberOfPlayers - 1) {
    await UserGame.create({ userId, gameId, position, status, color });
    await Game.update(
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
    await UserGame.create({ userId, gameId, position, status, color });
    return res.status(200).send("Succesfuly Joined")
  }

};

export const move = async (req, res) => {
  const { userId, gameId } = req.body;

  const game = await Game.findOne({
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

  const playersList = await UserGame.findAll({
    where: {
      gameId: gameId,
    },
  });

  const elements = await Element.findAll({
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
    await Game.update(
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

  await UserGame.update(
    { status: "active", position: newPosition },
    {
      where: {
        id: userGameId,
      },
    }
  );

  await Game.update(
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


  const game = await Game.findOne({
    where: {
      id: gameId,
    },
  });

  if (!game) {
    return res.status(400).send("Game Not Found");
  }

  const players = await UserGame.findAll({
    where: {
      gameId: gameId,
    },
  });

  const player = players.find(player => player.userId == userId)
  console.log("Player: ", player)

  if (!player) {
    return res.status(400).send("Player not found in game");
  }

  const board = await Board.findOne({
    where: {
      id: game.boardId
    }
  })

  const elements = await Element.findAll({
    where: {
      boardId: game.boardId
    }
  })

  return res.status(200).json({ players, elements, game, board })

};
