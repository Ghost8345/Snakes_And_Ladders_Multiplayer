import express from 'express';
const app = express()
const port = 4000
import { router } from './modules/routes/user.routes.js'

app.use(express.json())


app.use(router);


app.listen(port, () => console.log(`Server is listening on port ${port}!`))