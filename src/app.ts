import express, { Request, Response } from 'express'

const PORT = process.env.port || 8080
const app = express()

app.get('/', (req: Request, res: Response) => {
  res.send('Hello')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
