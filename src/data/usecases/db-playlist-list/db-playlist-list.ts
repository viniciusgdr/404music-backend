import { type PlaylistList } from '../../../domain/usecases/playlist-list'
import { type CacheRepository } from '../../protocols/CacheRepository'
import { type LoadAllPlaylistRepository } from '../../protocols/LoadAllPlaylistRepository'

export class DbPlaylistList implements PlaylistList {
  constructor (
    private readonly playlistListRepository: LoadAllPlaylistRepository,
    private readonly cacheRepository: CacheRepository
  ) {}

  async load (params: PlaylistList.Params): Promise<PlaylistList.Result> {
    const cache = await this.cacheRepository.get(`playlist-list:${params.id}`)
    if (cache) {
      return JSON.parse(cache)
    }
    const playlist = await this.playlistListRepository.loadAll(params)
    await this.cacheRepository.set(`playlist-list:${params.id}`, JSON.stringify(playlist))
    return playlist
  }
}
