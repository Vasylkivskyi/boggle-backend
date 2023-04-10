import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const PORT = process.env.port || 8080
const app = express()
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello')
})

app.post('/question', async (req, res) => {
  const { email, password, name } = req.body
  const user = await prisma.user.create({
    data: {
      email,
      password,
      name,
    },
  })
  res.json(user)
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
