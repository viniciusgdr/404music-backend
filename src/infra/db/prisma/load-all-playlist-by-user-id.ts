import { type PrismaClient } from '@prisma/client'
import { type LoadAllPlaylistRepository } from '../../../data/protocols/LoadAllPlaylistRepository'

export class LoadAllPlaylistByUserIdPrismaRepository implements LoadAllPlaylistRepository {
  constructor (
    private readonly prismaClient: PrismaClient
  ) { }

  async loadAll (params: LoadAllPlaylistRepository.Params): Promise<LoadAllPlaylistRepository.Result> {
    const playlist = await this.prismaClient.playlist.findMany({
      where: {
        userId: params.id
      }
    })
    return playlist
  }
}
