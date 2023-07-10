import { gameSchema } from "../../models/game.js";
import { userGameSchema } from "../../models/usergame.js";
import { io } from "../../index.js"
let count = 0;


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
    // TODO : assign a unique string as game id and add it to the database. this string will be the room id
    const roomId = "room-"+boardId+"-"+createdBy
    io.on('connection', (socket) => {
        socket.join(roomId);
        console.log("connected inside of create game")
      });
    
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
