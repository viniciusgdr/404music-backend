export interface AddMusicPlaylist {
  addMusic: (data: AddMusicPlaylist.Params) => Promise<AddMusicPlaylist.Result>
}

export namespace AddMusicPlaylist {
  export interface Params {
    playlistId: string
    musicId: string
    userId: string
  }

  export type Result = boolean
}
