import express from 'express';
import { userRouter } from './modules/routes/user.routes.js'
import { gameRouter } from './modules/routes/game.routes.js'
import { verifyToken } from './modules/middleware/auth.js';
import { Server } from 'socket.io'
import http from 'http';

const app = express()
const port = 4000
const server = http.createServer(app);
export const io = new Server(server)

app.use(express.json())


app.use('/user',userRouter);
app.use('/game',verifyToken,gameRouter);


io.on('connection', (socket) => {
    console.log('A user connected, user socket id = ',socket.id)
  });

server.listen(port, () => console.log(`Server is listening on port ${port}!`))

  
    // // Custom event handler
    // socket.on('message', (data) => {
    //     console.log('Received message:', data, "from: ", socket.id);
    //     io.emit('message', data); // Broadcast the message to all connected clients
    //   });
    
      
    //   socket.on('roomMessage', ({room, message}) => {
    //       console.log('Received message from Room:', room, "from: ", socket.id);
    //       console.log('message is ',message );
    //       io.to(room).emit('roomMessage', message); // Broadcast the message to all connected clients
    //     });
  
    //   socket.on('joinRoom', (roomnum) => {
    //       console.log('joined room:', roomnum);
    //       socket.join(roomnum);
  
    //       // Emit event to all sockets in a room
    //       io.to(roomnum).emit('message', "welcome to the room");
    //     });
  
    //   // Disconnect event handler
    //   socket.on('disconnect', () => {
    //     console.log('A user disconnected');
    //   });