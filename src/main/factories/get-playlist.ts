t (#2)import { DbGetPlaylist } from '@/data/usecases/db-get-playlist/db-get-playlist'
import { LoadPlaylistPrismaRepository } from '@/infra/db/prisma/load-playlist'
import { GetPlaylistController } from '@/presentation/controllers/playlist/get'
import { type Controller } from '@/presentation/protocols'
import { type PrismaClient } from '@prisma/client'

export const makeGetPlaylistController = (prismaClient: PrismaClient): Controller => {
  const loadPlaylistRepository = new LoadPlaylistPrismaRepository(prismaClient)
  const getPlaylist = new DbGetPlaylist(loadPlaylistRepository)
  return new GetPlaylistController(getPlaylist)
}
