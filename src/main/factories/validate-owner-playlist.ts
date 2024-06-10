import { type Controller } from '../../presentation/protocols'
import { ValidateOwnerPlaylistPrismaRepository } from '../../infra/db/prisma/validate-owner-playlist'
import { DbValidateOwnerPlaylist } from '../../data/usecases/db-validate-owner-playlist/db-validate-owner-playlist'
import { ValidateOwnerPlaylistController } from '../../presentation/controllers/playlist/validate-id'
import { RedisCacheRepository } from '../../infra/db/redis/cacheRepository'
import { prismaClient, redisClient } from '../server'

export const makeValidateOwnerPlaylistController = (): Controller => {
  const validateOwnerPlaylistRepository = new ValidateOwnerPlaylistPrismaRepository(prismaClient)
  const cacheRepository = new RedisCacheRepository(redisClient)
  const validateOwnerPlaylist = new DbValidateOwnerPlaylist(validateOwnerPlaylistRepository, cacheRepository)
  return new ValidateOwnerPlaylistController(validateOwnerPlaylist)
}
