import { DbPlaylistList } from '../../data/usecases/db-playlist-list/db-playlist-list'
import { LoadAllPlaylistByUserIdPrismaRepository } from '../../infra/db/prisma/load-all-playlist-by-user-id'
import { PlaylistListController } from '../../presentation/controllers/playlist/list'
import { type Controller } from '../../presentation/protocols'
import { prismaClient } from '../server'

export const makePlaylistListController = (): Controller => {
  const playlistListRepository = new LoadAllPlaylistByUserIdPrismaRepository(prismaClient)
  const playlistList = new DbPlaylistList(playlistListRepository)
  return new PlaylistListController(playlistList)
}
