import { type Playlist } from '../models/playlist'

export interface CreatePlaylist {
  create: (params: CreatePlaylist.Params) => Promise<CreatePlaylist.Result>
}

export namespace CreatePlaylist {
  export interface Params {
    userId: string
  }
  export type Result = Playlist
}
