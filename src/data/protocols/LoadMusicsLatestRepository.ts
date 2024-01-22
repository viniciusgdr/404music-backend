import { type Music } from '../../domain/models/music'

export interface LoadMusicsLatestRepository {
  load: (params: LoadMusicsLatestRepository.Params) => Promise<LoadMusicsLatestRepository.Result>
}

export namespace LoadMusicsLatestRepository {
  export interface Params {
    limit: number
  }
  export type Result = Music[]
}
