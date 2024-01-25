import { type AddMusicPlaylistRepository } from '@/data/protocols/AddMusicPlaylistRepository'
import { type PrismaClient } from '@prisma/client'

export class AddMusicPlaylistPrismaRepository implements AddMusicPlaylistRepository {
  constructor (
    private readonly prismaClient: PrismaClient
  ) { }

  async addMusic (params: AddMusicPlaylistRepository.Params): Promise<AddMusicPlaylistRepository.Result> {
    const { playlistId, musicId, userId } = params
    await this.prismaClient.playlist.update({
      where: {
        id: playlistId,
        userId
      },
      data: {
        musics: {
          connect: {
            id: musicId
          }
        }
      }
    })
    return true
  }
}
