import { type PrismaClient } from '@prisma/client'
import { DbSearch } from '../../data/usecases/db-search/db-search'
import { SaveSearchPrismaRepository } from '../../infra/db/prisma/save-search-repository'
import { RedisCacheRepository } from '../../infra/db/redis/cacheRepository'
import { YoutubeSearchRepository } from '../../infra/youtube/search'
import { SearchController } from '../../presentation/controllers/search/search'
import { type Controller } from '../../presentation/protocols'
import { type RedisClientType, type RedisFunctions, type RedisModules, type RedisScripts } from 'redis'

export const makeSearchController = (
  prismaClient: PrismaClient, redisClient: RedisClientType<RedisModules, RedisFunctions, RedisScripts>
): Controller => {
  const cacheRepository = new RedisCacheRepository(redisClient)
  const searchRepository = new YoutubeSearchRepository()
  const saveSearchRepository = new SaveSearchPrismaRepository(prismaClient)
  const search = new DbSearch(cacheRepository, searchRepository, saveSearchRepository)
  return new SearchController(search)
}
