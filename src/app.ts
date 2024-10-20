import cors from 'cors'
import express from 'express'
import mainRouter from './routes/router'
const app = express()

app.use(
  cors({
    origin: '*'
  })
)
express.json()

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to Video2Audio',
    online: Date.now(),
    status: 200
  })
})

export default app

app.use('/', mainRouter)
