import express from 'express';
import { gameRouter } from './modules/routes/game.routes.js';
import { userRouter } from './modules/routes/user.routes.js';
import { verifyToken } from './modules/middleware/auth.js';
import sequelizeCli from './sequelize-cli.js';

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());

// Routes
app.use('/game', verifyToken, gameRouter);
app.use('/user', userRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
