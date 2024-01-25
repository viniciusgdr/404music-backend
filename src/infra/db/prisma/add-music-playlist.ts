import { type AddMusicPlaylistRepository } from '../../../data/protocols/AddMusicPlaylistRepository'
import { type PrismaClient } from '@prisma/client'

export class AddMusicPlaylistPrismaRepository implements AddMusicPlaylistRepository {
  constructor (
    private readonly prismaClient: PrismaClient
  ) { }

  async addMusic (params: AddMusicPlaylistRepository.Params): Promise<AddMusicPlaylistRepository.Result> {
    const { playlistId, musicId } = params
    const music = await this.prismaClient.playlistMusic.create({
      data: {
        playlistId,
        musicId
      }
    })
    return music
  }
}
