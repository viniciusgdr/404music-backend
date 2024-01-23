import { type Search } from '../../../domain/usecases/search'
import { type CacheRepository } from '../../protocols/CacheRepository'
import { type SaveSearchRepository } from '../../protocols/SaveSearchRepository'
import { type SearchRepository } from '../../protocols/SearchRepository'

export class DbSearch implements Search {
  constructor (
    private readonly cacheRepository: CacheRepository,
    private readonly searchRepository: SearchRepository,
    private readonly saveSearchRepository: SaveSearchRepository
  ) {}

  async search (search: Search.Params): Promise<Search.Result> {
    const { query, take, skip } = search
    const cache = await this.cacheRepository.get(`search:${query.trim()}:${skip ?? 0}:${take ?? 20}`)
    if (cache) {
      return JSON.parse(cache)
    }
    const result = await this.searchRepository.search({
      query: query.trim(),
      take: take ?? 20,
      skip: skip ?? 0
    })
    let savedContents = await this.saveSearchRepository.save(result, query)
    if (savedContents.length > 0) {
      await this.cacheRepository.set(`search:${query}:${skip ?? 0}:${take ?? 20}`, JSON.stringify(savedContents), 60 * 60 * 24)
    }

    savedContents = savedContents.sort((a, b) => {
      const splitedTitleA = a.title.split(' ')
      const splitedTitleB = b.title.split(' ')
      const splitedArtistA = a.artist.split(' ')
      const splitedArtistB = b.artist.split(' ')

      if (query.startsWith(a.artist) || query.startsWith(a.title)) {
        return -1
      }
      if (query.startsWith(b.artist) || query.startsWith(b.title)) {
        return 1
      }
      if (splitedTitleA.length > splitedTitleB.length) {
        return -1
      }
      if (splitedTitleA.length < splitedTitleB.length) {
        return 1
      }
      if (splitedArtistA.length > splitedArtistB.length) {
        return -1
      }
      if (splitedArtistA.length < splitedArtistB.length) {
        return 1
      }
      return 0
    })
    savedContents = savedContents.filter((item, index, self) => self.findIndex((i) => i.title === item.title && i.artist === item.artist) === index)
    return savedContents
  }
}
