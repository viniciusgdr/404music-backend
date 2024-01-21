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
    const savedContents = await this.saveSearchRepository.save(result)
    await this.cacheRepository.set(`search:${query}:${skip ?? 0}:${take ?? 20}`, JSON.stringify(savedContents), 60 * 60 * 24)
    return savedContents
  }
}
