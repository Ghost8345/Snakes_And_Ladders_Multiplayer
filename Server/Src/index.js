import express from 'express';
import { exec } from 'child_process';
import { gameRouter } from './modules/routes/game.routes.js';
import { userRouter } from './modules/routes/user.routes.js';
import { verifyToken } from './modules/middleware/auth.js';
import { Server } from 'socket.io'
import http from 'http';
import Element from './models/element.js'
import cors from 'cors';
const app = express() 
const server = http.createServer(app);
export const io = new Server(server);


const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
// Allow all headers
app.use(cors({
    exposedHeaders: '*'
  }));
app.use('/user',userRouter);
app.use('/game',verifyToken,gameRouter);


// Start the migration process
const migrateDatabase = () => {
    return new Promise((resolve, reject) => {
        const migrationCommand = 'npx sequelize-cli db:migrate';

        exec(migrationCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Migration failed: ${error.message}`);
                reject(error);
            } else {
                console.log('Migration completed successfully');
                resolve();
            }
        });
    });
};

// Start the seeder process
const seedDatabase = () => {
    return new Promise(async (resolve, reject) => {
      const seederCommand = 'npx sequelize-cli db:seed:all';
  
      try {
        // Check if data has already been seeded
        const existingData = await Element.findAll();
        if (existingData.length > 0) {
          console.log('Data already seeded, skipping...');
          return resolve();
        }
  
        // Seed the database
        exec(seederCommand, (error, stdout, stderr) => {
          if (error) {
            console.error(`Seeder failed: ${error.message}`);
            reject(error);
          } else {
            console.log('Seeder completed successfully');
            resolve();
          }
        });
      } catch (error) {
        console.error('Failed to seed the database', error);
        reject(error);
      }
    });
  };

// Start the server after running the migration and seeder
const startServer = async () => {
    try {
        await migrateDatabase();
        await seedDatabase();
        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start the server', error);
    }
};

startServer();

io.on('connection', (socket) => {
    console.log('A user connected, user socket id = ',socket.id)
  });


  
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

