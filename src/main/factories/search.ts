import { DbSearch } from '../../data/usecases/db-search/db-search'
import { SaveSearchPrismaRepository } from '../../infra/db/prisma/save-search-repository'
import { RedisCacheRepository } from '../../infra/db/redis/cacheRepository'
import { YoutubeSearchRepository } from '../../infra/youtube/search'
import { SearchController } from '../../presentation/controllers/search/search'
import { type Controller } from '../../presentation/protocols'
import { RedisHelper } from '../redisClient'
import { prismaClient } from '../server'

export const makeSearchController = (): Controller => {
  const cacheRepository = new RedisCacheRepository(RedisHelper.client)
  const searchRepository = new YoutubeSearchRepository()
  const saveSearchRepository = new SaveSearchPrismaRepository(prismaClient)
  const search = new DbSearch(cacheRepository, searchRepository, saveSearchRepository)
  return new SearchController(search)
}
