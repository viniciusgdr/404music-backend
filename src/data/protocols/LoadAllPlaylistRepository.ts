import { type Playlist } from '@prisma/client'

export interface LoadAllPlaylistRepository {
  loadAll: (params: LoadAllPlaylistRepository.Params) => Promise<LoadAllPlaylistRepository.Result>
}

export namespace LoadAllPlaylistRepository {
  export interface Params {
    id: string
  }

  export type Result = Playlist[]
}
