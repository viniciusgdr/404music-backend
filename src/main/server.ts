import { PrismaClient } from '@prisma/client'
import express from 'express'
import setupMiddlewares from './middleware'
import setupRoutes from './routes'
import * as redis from 'redis'

const PORT = process.env.PORT ?? 3000

export const prismaClient = new PrismaClient()
export const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
  readonly: false,
  name: process.env.REDIS_NAME,
  database: 0
})

void (async () => {
  await prismaClient.$connect()
  await redisClient.connect()
  console.log('Redis connected')

  const app = express()
  setupMiddlewares(app)
  setupRoutes(app)

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
  })
})()
