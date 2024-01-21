import { Genre, type PrismaClient } from '@prisma/client'
import { type SaveSearchRepository } from '../../../data/protocols/SaveSearchRepository'

export class SaveSearchPrismaRepository implements SaveSearchRepository {
  constructor (
    private readonly prismaClient: PrismaClient
  ) { }

  async save (search: SaveSearchRepository.Params[]): Promise<SaveSearchRepository.Result[]> {
    const musicsOnDB = await this.prismaClient.music.findMany()
    const results: SaveSearchRepository.Result[] = []
    const searchRefatored = search.map((music) => {
      const genre = Genre[music.genre as keyof typeof Genre] ? music.genre as keyof typeof Genre : 'OUTROS'
      return {
        partnerId: music.partnerId,
        title: music.title,
        artist: music.artist,
        album: music.album,
        year: music.year,
        genre,
        thumbnail: music.thumbnail
      }
    }).filter((music) => !musicsOnDB.find((musicOnDB) => musicOnDB.partnerId === music.partnerId))

    for (const result of searchRefatored) {
      const musics = await this.prismaClient.music.create({
        data: result
      })
      results.push(
        {
          title: musics.title,
          artist: musics.artist,
          album: musics.album,
          year: musics.year,
          genre: musics.genre,
          createdAt: musics.createdAt,
          id: musics.id,
          updatedAt: musics.updatedAt
        }
      )
    }
    return results
  }
}
