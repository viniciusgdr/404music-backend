import { type AddMusicPlaylistRepository } from '../../../data/protocols/AddMusicPlaylistRepository'
import { type PrismaClient } from '@prisma/client'
import { type DelMusicPlaylistRepository } from '../../../data/protocols/DelMusicPlaylistRepository'

export class MusicPlaylistPrismaRepository implements AddMusicPlaylistRepository, DelMusicPlaylistRepository {
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

  async delMusic (params: DelMusicPlaylistRepository.Params): Promise<DelMusicPlaylistRepository.Result> {
    const { playlistId, musicId } = params
    await this.prismaClient.playlistMusic.delete({
      where: {
        playlistId,
        id: musicId
      }
    })
    return true
  }
}
