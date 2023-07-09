import express from 'express';
const app = express()
const port = 4000
import { userRouter } from './modules/routes/user.routes.js'
import { gameRouter } from './modules/routes/game.routes.js'
import { verifyToken } from './modules/middleware/auth.js';

app.use(express.json())


app.use('/user',userRouter);
app.use('/game',verifyToken,gameRouter);

app.listen(port, () => console.log(`Server is listening on port ${port}!`)) 