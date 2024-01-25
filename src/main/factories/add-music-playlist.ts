import { DbAddMusicPlaylist } from '@/data/usecases/db-add-music-playlist/db-add-music-playlist'
import { AddMusicPlaylistPrismaRepository } from '@/infra/db/prisma/add-music-playlist'
import { LoadPlaylistPrismaRepository } from '@/infra/db/prisma/load-playlist'
import { LoadUserByIdPrismaRepository } from '@/infra/db/prisma/load-user-by-id'
import { AddMusicPlaylistController } from '@/presentation/controllers/playlist/add-music'
import { type Controller } from '@/presentation/protocols'
import { type PrismaClient } from '@prisma/client'

export const makeAddMusicPlaylistRepository = (prismaClient: PrismaClient): Controller => {
  const loadUserByIdRepository = new LoadUserByIdPrismaRepository(prismaClient)
  const loadPlaylistRepository = new LoadPlaylistPrismaRepository(prismaClient)
  const addMusicPlaylistRepository = new AddMusicPlaylistPrismaRepository(prismaClient)
  const addMusicPlaylist = new DbAddMusicPlaylist(loadUserByIdRepository, loadPlaylistRepository, addMusicPlaylistRepository)
  const addMusicPlaylistController = new AddMusicPlaylistController(addMusicPlaylist)
  return addMusicPlaylistController
}
