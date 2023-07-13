
import { io } from "../../index.js"
import UserGame from "../../models/usergame.js";
import Board from "../../models/board.js";
import Game from "../../models/game.js";
import Element from "../../models/element.js";
import User from "../../models/user.js";
import {QueryTypes} from "sequelize";


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

  const date1 = new Date('January 1, 2020');
  const timestamp1 = date1.getTime();
  const timestamp2 = Date.now()

  const timestamp = timestamp2 - timestamp1
  const roomIdbase = "room-" + timestamp + "-" + createdBy
  const roomId = btoa(roomIdbase);

  const games = await Game.create({ roomId, boardId, createdBy, status, lastTurn, numberOfPlayers });
  status = "active"

  let position = 0;
  let gameId = games.id;
  const color = colors[0];

  await UserGame.create({ userId, gameId, position, status, color });
  res.status(200).json({ game:games, board });
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

    // fire event for the rest of the room that player joined
    const roomId = gameFound.roomId
    io.to(roomId).emit('playerjoined',{message:'user joined', players:players, game:gameFound })
    return res.status(200).json({message:'user joined', players:players,game:gameFound })
  } else { // general case
    const color = colors[playersJoined.length]
    const roomId = gameFound.roomId
    const players = playersJoined.map((player) => {
      return player.userId
    })


    await UserGame.create({ userId, gameId, position, status, color });
    io.to(roomId).emit('playerjoined',{message:'user joined', players:players, game:gameFound })
    return res.status(200).json({message:'user joined', players:players,game:gameFound })

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

  // fail checks
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

  if (!lastTurn) { // the first player turn 
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
  )

  const movement = playerPostion !== newPosition ? "Move Successful" : "Move Failed (overflow)"
  // fire update for the room id 
  const roomId = game.roomId
  

  //get updated at

  
  const gameBefore = await Game.findOne({
    where: {
      id: gameId,
    },
  });

  setTimeout( timer,10000,gameBefore);



  // emit to socket listeners
  io.to(roomId).emit('update',{
    status: movement,
    positions: positions,
    dice: dice
  })

  return res.status(200).json({
    status: movement,
    positions: positions,
    dice: dice
  });
};



const timer =async (gameBefore)=>{
  const gameAfter = await Game.findOne({
    where: {
      id: gameBefore.gameId,
    },
  });

  if(gameAfter.updatedAt === gameBefore.updatedAt && gameAfter.gameId === gameAfter.gameId){
    
 
    const playersList = await UserGame.findAll({
      where: {
        gameId: gameBefore.gameId,
      },
    });
  
    const playerIds = playersList.map((player) => {
      return player.userId;
    });

    const lastTurn = gameBefore.lastTurn;
    const indexOfLastPlayer = playerIds.indexOf(lastTurn);
    const indexOfCurrentPlayer = (indexOfLastPlayer + 1) % playersList.length;
    const toBeKickedId = playerIds[indexOfCurrentPlayer]
    io.to(gameBefore.roomId).emit('timeout',{
      userId:toBeKickedId
     })
    leaveGameLogic(toBeKickedId,gameBefore.gameId)
  }
}



const rollDice = () => { return Math.floor(Math.random() * (6)) + 1 }





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


const leaveGameLogic =async(userId,gameId)=>{
  const row = await UserGame.findOne({
    where: { userId: userId, gameId: gameId },
  });
  const player = await User.findOne({
    where: { id: userId },
  });
  if (row) {
    console.log(await row.destroy()); // deletes the row
  }
}


export const leaveGame = async (req, res) => {
  const { userId, gameId } = req.body;
  leaveGameLogic(userId,gameId)
  return res.status(200).json({ Message: player.userName + " Left" });
};


export const deleteGame = async (req, res) => {
  const { userId, gameId } = req.body;
  const game = await Game.findOne({
    where: { id: gameId },
  });

  if (!game) {
    return res.status(400).json({ message: "Game Not Found" });
  }

  console.log(await game.destroy()); // deletes the row

  res.status(200).json({ Message: " Game " + gameId + " is deleted" });
};

export const getPlayersNames = async (req, res) => {
  const { userId, gameId } = req.body;

  const players = await UserGame.findAll({
    include: User,
    where: {gameId: gameId}
  })

  if(!players){
    return res.status(400).json({ message: "ERR" });
  }

  console.log(players)

  const playerNames = players.map((player) => {
    return player.user.userName
  })

  console.log(playerNames)

  return res.status(200).json(playerNames)
  

};
