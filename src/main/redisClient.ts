import { type RedisClientType, type RedisDefaultModules, type RedisFunctions, type RedisScripts } from 'redis'
import * as redis from 'redis'

export const RedisHelper = {
  client: null as unknown as RedisClientType<RedisDefaultModules, RedisFunctions, RedisScripts>,
  async connect () {
    if (this.client) {
      return
    }
    this.client = redis.createClient({
      url: process.env.REDIS_URL,
      password: process.env.REDIS_PASSWORD,
      readonly: false,
      name: process.env.REDIS_NAME,
      database: 0
    })
    await this.client.connect()
    console.log('Redis connected')
  },
  async disconnect () {
    await this.client.disconnect()
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.client = null!
  }
}
