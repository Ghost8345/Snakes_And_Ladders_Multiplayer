import { io } from "../../index.js"
import UserGame from "../../models/usergame.js";
import Board from "../../models/board.js";
import Game from "../../models/game.js";
import Element from "../../models/element.js";
import User from "../../models/user.js";

const colors = [
  "#FF0000", // Red
  "#0000FF", // Blue
  "#00FF00", // Green
  "#FFFF00", // Yellow
  "#FFA500", // Orange
  "#800080", // Purple
  "#FFC0CB", // Pink
  "#808080", // Gray
  "#008080", // Teal
  "#A52A2A", // Brown
];

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

export const getAllGames = async (req, res) => {
  const { userId } = req.body;

  try {
    const games = await Game.findAll({
      where: {
        status: "pending",
      },
    });
    res.status(200).json({ games });
  } catch (error) {
    console.error("Error retrieving games:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createGame = async (req, res) => {
  const { boardId, numberOfPlayers, userId } = req.body;
  let status = "pending";
  let lastTurn = null;
  const board = await Board.findOne({
    where: {
      id: boardId,
    },
  });

  if (!board) {
    return res.status(400).json({ message: "Board is not found " })
  }

  const createdBy = userId;

  const games = await Game.create({
    boardId,
    createdBy,
    status,
    lastTurn,
    numberOfPlayers,
  });
  status = "active";
  let position = 0;
  let gameId = games.id;
  const color = colors[0];

  await UserGame.create({ userId, gameId, position, status, color });

  // TODO : assign a unique string as game id and add it to the database. this string will be the room id
  const roomId = "room-" + boardId + "-" + createdBy;
  io.on("connection", (socket) => {
    socket.join(roomId);
    console.log("connected inside of create game");
  });
  res.status(200).json({ games, board });
};

export const joinGame = async (req, res) => {
  let { userId, gameId } = req.body;
  let position = 0;
  let status = "active";

  const gameFound = await Game.findOne({
    where: {
      id: gameId,
    },
  });

  if (!gameFound) {
    return res.status(400).json({ message: "Game Not Found" });
  }

  const playersJoined = await UserGame.findAll({
    where: {
      gameId: gameId,
    },
  });

  const playerFound = playersJoined.find(player => player.userId === userId)
  if (playerFound) {
    return res.status(400).json({ message: "User Already Joined" });
  }

  console.log("Max Number of Players for this Game: ", gameFound.numberOfPlayers);
  if (playersJoined.length == gameFound.numberOfPlayers) {
    return res
      .status(400)
      .json({ message: "Game has reached the number of players required" });
  } else if (playersJoined.length == gameFound.numberOfPlayers - 1) {
    const color = colors[playersJoined.length];

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
      return player.userId;
    });

    players.push(userId);

    console.log(players);

    return res.status(200).json({ message: "success", players: players });
  } else {
    const color = colors[playersJoined.length];

    await UserGame.create({ userId, gameId, position, status, color });

    return res.status(200).json({ message: "success" });
  }
};

export const move = async (req, res) => {
  const { userId, gameId } = req.body;
  console.log("userID: ", userId, "gameId : ", gameId)

  const game = await Game.findOne({
    where: {
      id: gameId,
    },
  });

  if (!game) {
    return res.status(400).json({ message: "Game Not Found" });
  }

  if (game.status == "Finished") {
    return res.status(400).json({ message: "Game is Finished" });
  }

  const playersList = await UserGame.findAll({
    where: {
      gameId: gameId,
    },
  });

  const elements = await Element.findAll({
    where: {
      boardId: game.boardId,
    },
  });

  console.log(elements);

  const playerIds = playersList.map((player) => {
    return player.userId;
  });

  console.log("Player Id List: ", playersList);

  if (!playerIds.includes(userId)) {
    return res.status(400).json({ message: "Player Not in Players List" });
  }

  const lastTurn = game.lastTurn;
  const indexOfLastPlayer = playerIds.indexOf(lastTurn);
  const indexOfCurrentPlayer = (indexOfLastPlayer + 1) % playersList.length;

  if (!lastTurn) {
    if (playerIds[0] != userId) {
      return res.status(400).json({ message: "Wrong Turn" });
    }
  } else {
    if (playerIds[indexOfCurrentPlayer] != userId) {
      return res.status(400).json({ message: "Wrong Turn" });
    }
  }

  const dice = rollDice();
  console.log(dice);

  const playerPostion = playersList.find(
    (player) => player.userId === userId
  ).position;
  console.log(playerPostion);

  let positions = [];
  positions.push(playerPostion);
  let newPosition = playerPostion + dice;
  positions.push(newPosition);
  const elementAtNewPosition = elements.find(
    (element) => element.goFrom === newPosition
  );

  if (elementAtNewPosition) {
    newPosition = elementAtNewPosition.goTo;
    positions.push(newPosition);
  }
  console.log(newPosition);

  if (newPosition > 100) {
    newPosition = playerPostion;
    positions = [newPosition];
  }

  if (newPosition === 100) {
    await Game.update(
      { status: "Finished" },
      {
        where: {
          id: gameId,
        },
      }
    );
  }

  const userGameId = playersList.find((player) => player.userId === userId).id;
  console.log(userGameId);

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
  );
  await Game.update(
    { updatedAt: new Date() },
    {
      where: {
        id: gameId,
      },
    }
  );
  const movement =
    playerPostion !== newPosition
      ? "Move Successful"
      : "Move Failed (overflow)";

  return res.status(200).json({
    status: movement,
    positions: positions,
    dice: dice,
    date: new Date()
  });
};

const rollDice = () => {
  return Math.floor(Math.random() * 6) + 1;
};

export const updateBoard = async (req, res) => {
  const { userId } = req.body;
  const { gameId } = req.params;

  const game = await Game.findOne({
    where: {
      id: gameId,
    },
  });

  if (!game) {
    return res.status(400).json({ message: "Game Not Found" });
  }

  const players = await UserGame.findAll({
    where: {
      gameId: gameId,
    },
  });

  const player = players.find((player) => player.userId == userId);
  console.log("Player: ", player);

  if (!player) {
    return res.status(400).json({ message: "Player not found in game" });
  }

  const board = await Board.findOne({
    where: {
      id: game.boardId,
    },
  });

  const elements = await Element.findAll({
    where: {
      boardId: game.boardId,
    },
  });

  return res
    .status(200)
    .json({ message: "success", players, elements, game, board });
};
export const leaveGame = async (req, res) => {
  const { userId, gameId } = req.body;
  const row = await UserGame.findOne({
    where: { userId: userId, gameId: gameId },
  });
  const player = await User.findOne({
    where: { id: userId },
  });
  if (row) {
    console.log(await row.destroy()); // deletes the row
  }
  res.status(200).json({ Message: player.userName + " Left" });
};
export const deleteGame = async (req, res) => {
  const { userId, gameId } = req.body;
  const row = await Game.findOne({
    where: { id: gameId },
  });

  if (row) {
    console.log(await row.destroy()); // deletes the row
  }
  res.status(200).json({ Message: " Game " + gameId + " is deleted" });
};
