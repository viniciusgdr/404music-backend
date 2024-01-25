import { type Playlist } from '../models/playlist'

export interface GetPlaylist {
  getPlaylist: (params: GetPlaylist.Params) => Promise<GetPlaylist.Result>
}

export namespace GetPlaylist {
  export interface Params {
    playlistId: string
  }

  export type Result = (Playlist & {
    musics: Playlist.Music[]
  }) | null
}
