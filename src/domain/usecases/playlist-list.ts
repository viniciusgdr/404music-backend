import { type Playlist } from '../models/playlist'

export interface PlaylistList {
  load: (params: PlaylistList.Params) => Promise<PlaylistList.Result>
}

export namespace PlaylistList {
  export interface Params {
    id: string
  }

  export type Result = Playlist[]
}
