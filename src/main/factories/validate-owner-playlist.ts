import { type PrismaClient } from '@prisma/client'
import { type Controller } from '../../presentation/protocols'
import { ValidateOwnerPlaylistPrismaRepository } from '../../infra/db/prisma/validate-owner-playlist'
import { DbValidateOwnerPlaylist } from '../../data/usecases/db-validate-owner-playlist/db-validate-owner-playlist'
import { ValidateOwnerPlaylistController } from '../../presentation/controllers/playlist/validate-id'
import { type RedisClientType, type RedisFunctions, type RedisModules, type RedisScripts } from 'redis'
import { RedisCacheRepository } from '../../infra/db/redis/cacheRepository'

export const makeValidateOwnerPlaylistController = (
  prismaClient: PrismaClient, redisClient: RedisClientType<RedisModules, RedisFunctions, RedisScripts>
): Controller => {
  const validateOwnerPlaylistRepository = new ValidateOwnerPlaylistPrismaRepository(prismaClient)
  const cacheRepository = new RedisCacheRepository(redisClient)
  const validateOwnerPlaylist = new DbValidateOwnerPlaylist(validateOwnerPlaylistRepository, cacheRepository)
  return new ValidateOwnerPlaylistController(validateOwnerPlaylist)
}
