import { type PrismaClient } from '@prisma/client'
import { type DeletePlaylistRepository } from '../../../data/protocols/DeletePlaylistRepository'

export class DeletelePlaylistPrismaRepository implements DeletePlaylistRepository {
  constructor (
    private readonly prismaClient: PrismaClient
  ) { }

  async delete (params: DeletePlaylistRepository.Params): Promise<DeletePlaylistRepository.Result> {
    const playlist = await this.prismaClient.playlist.delete({
      where: {
        id: params.playlistId,
        userId: params.userId
      }
    })

    return playlist
  }
}
