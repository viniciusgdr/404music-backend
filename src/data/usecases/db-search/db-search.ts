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
    // sort by title matches
    savedContents = savedContents.sort((a, b) => {
      const aTitle = a.title.toLowerCase()
      const bTitle = b.title.toLowerCase()
      const aQuery = query.toLowerCase()
      const bQuery = query.toLowerCase()
      const aTitleMatches = aTitle.match(new RegExp(aQuery, 'g'))?.length ?? 0
      const bTitleMatches = bTitle.match(new RegExp(bQuery, 'g'))?.length ?? 0
      return bTitleMatches - aTitleMatches
    })
    savedContents = savedContents.filter((item, index, self) => self.findIndex((i) => i.id === item.id) === index)
    if (savedContents.length > 0) {
      await this.cacheRepository.set(`search:${query}:${skip ?? 0}:${take ?? 20}`, JSON.stringify(savedContents), 60 * 60 * 24)
    }
    return savedContents
  }
}
